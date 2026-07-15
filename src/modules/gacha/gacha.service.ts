import { sequelize } from "../../database/sequelize";
import { CoinTransaction, CoinTransactionType } from "../../database/models/coin-transaction.model";
import { GachaEvent } from "../../database/models/gacha-event.model";
import { GachaEventItem } from "../../database/models/gacha-event-item.model";
import { GachaLog } from "../../database/models/gacha-log.model";
import { Item } from "../../database/models/item.model";
import { User } from "../../database/models/user.model";
import { AppError } from "../../shared/errors/app-error";
import { DrawGachaRequest } from "./gacha.schema";

export class GachaService {
  async draw(userId: number, payload: DrawGachaRequest): Promise<{ user: User; event: GachaEvent; item: Item; gachaLog: GachaLog; coinTransaction: CoinTransaction }> {
    const event = await GachaEvent.findByPk(payload.eventId);

    if (!event) {
      throw new AppError("Gacha event not found.", 404);
    }

    if (!event.isActive) {
      throw new AppError("Gacha event is not active.", 400);
    }

    const user = await User.findByPk(userId);

    if (!user) {
      throw new AppError("User not found.", 404);
    }

    if (user.coins < 10) {
      throw new AppError("Insufficient coins.", 400);
    }

    const eventItems = await GachaEventItem.findAll({
      where: { eventId: event.id },
      include: [{ model: Item, as: "item" }],
    });

    if (eventItems.length === 0) {
      throw new AppError("No items available for this event.", 400);
    }

    const totalWeight = eventItems.reduce((sum, entry) => sum + Number(entry.dropRate), 0);
    const pick = Math.random() * totalWeight;
    let cumulative = 0;
    let selectedItem: GachaEventItem | undefined = eventItems[0];

    for (const entry of eventItems) {
      cumulative += Number(entry.dropRate);
      if (pick <= cumulative) {
        selectedItem = entry;
        break;
      }
    }

    if (!selectedItem || !selectedItem.item) {
      throw new AppError("Unable to resolve a winning item.", 400);
    }

    const result = await sequelize.transaction(async (transaction) => {
      const before = user.coins;
      const after = before - 10;

      await User.update(
        { coins: after },
        { where: { id: user.id }, transaction },
      );

      const gachaLog = await GachaLog.create(
        {
          userId: user.id,
          eventId: event.id,
          eventItemId: selectedItem.id,
          cost: 10,
          dropRate: selectedItem.dropRate,
        },
        { transaction },
      );

      const coinTransaction = await CoinTransaction.create(
        {
          userId: user.id,
          type: CoinTransactionType.GACHA_COST,
          amount: -10,
          balanceBefore: before,
          balanceAfter: after,
          gachaLogId: gachaLog.id,
        },
        { transaction },
      );

      return { user: { ...user.get(), coins: after } as User, event, item: selectedItem.item!, gachaLog, coinTransaction };
    });

    return result;
  }

  async history(userId: number): Promise<GachaLog[]> {
    return GachaLog.findAll({
      where: { userId },
      include: [
        { model: GachaEvent, as: "event" },
        { model: GachaEventItem, as: "eventItem", include: [{ model: Item, as: "item" }] },
      ],
      order: [["createdAt", "DESC"]],
    });
  }
}

export const gachaService = new GachaService();
