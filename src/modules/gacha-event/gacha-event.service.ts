import { GachaEvent } from "../../database/models/gacha-event.model";
import { AppError } from "../../shared/errors/app-error";
import {
  CreateGachaEventRequest,
  UpdateGachaEventRequest,
} from "./gacha-event.schema";

export class GachaEventService {
  async list(): Promise<GachaEvent[]> {
    return GachaEvent.findAll({
      order: [["createdAt", "DESC"]],
    });
  }

  async getById(id: number): Promise<GachaEvent> {
    const event = await GachaEvent.findByPk(id);

    if (!event) {
      throw new AppError("Gacha event not found.", 404);
    }

    return event;
  }

  async create(userId: number, payload: CreateGachaEventRequest): Promise<GachaEvent> {
    return GachaEvent.create({
      name: payload.name,
      description: payload.description ?? null,
      isActive: payload.isActive ?? true,
      createdBy: userId,
    });
  }

  async update(id: number, payload: UpdateGachaEventRequest): Promise<GachaEvent> {
    const event = await this.getById(id);

    if (payload.name !== undefined) {
      event.name = payload.name;
    }

    if (payload.description !== undefined) {
      event.description = payload.description;
    }

    if (payload.isActive !== undefined) {
      event.isActive = payload.isActive;
    }

    await event.save();

    return event;
  }

  async remove(id: number): Promise<void> {
    const event = await this.getById(id);

    if (event.isActive) {
      throw new AppError("Active event cannot be deleted.", 400);
    }

    await event.destroy();
  }
}

export const gachaEventService = new GachaEventService();
