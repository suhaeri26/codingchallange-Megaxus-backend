import { GachaEventItem } from "../../database/models/gacha-event-item.model";
import { GachaEvent } from "../../database/models/gacha-event.model";
import { Item } from "../../database/models/item.model";
import { AppError } from "../../shared/errors/app-error";
import {
  CreateGachaEventItemRequest,
  UpdateGachaEventItemRequest,
} from "./gacha-event-item.schema";

export class GachaEventItemService {
  async list(eventId: number): Promise<GachaEventItem[]> {
    const event = await GachaEvent.findByPk(eventId);

    if (!event) {
      throw new AppError("Gacha event not found.", 404);
    }

    return GachaEventItem.findAll({
      where: { eventId },
      include: [{ model: Item, as: "item" }],
      order: [["createdAt", "DESC"]],
    });
  }

  async create(eventId: number, payload: CreateGachaEventItemRequest): Promise<GachaEventItem> {
    const event = await GachaEvent.findByPk(eventId);

    if (!event) {
      throw new AppError("Gacha event not found.", 404);
    }

    const item = await Item.findByPk(payload.itemId);

    if (!item) {
      throw new AppError("Item not found.", 404);
    }

    return GachaEventItem.create({
      eventId,
      itemId: payload.itemId,
      dropRate: payload.dropRate,
      stock: payload.stock ?? null,
    });
  }

  async update(id: number, payload: UpdateGachaEventItemRequest): Promise<GachaEventItem> {
    const item = await GachaEventItem.findByPk(id);

    if (!item) {
      throw new AppError("Gacha event item not found.", 404);
    }

    if (payload.itemId !== undefined) {
      const currentItem = await Item.findByPk(payload.itemId);

      if (!currentItem) {
        throw new AppError("Item not found.", 404);
      }

      item.itemId = payload.itemId;
    }

    if (payload.dropRate !== undefined) {
      item.dropRate = payload.dropRate;
    }

    if (payload.stock !== undefined) {
      item.stock = payload.stock;
    }

    await item.save();

    return item;
  }

  async remove(id: number): Promise<void> {
    const item = await GachaEventItem.findByPk(id);

    if (!item) {
      throw new AppError("Gacha event item not found.", 404);
    }

    await item.destroy();
  }
}

export const gachaEventItemService = new GachaEventItemService();
