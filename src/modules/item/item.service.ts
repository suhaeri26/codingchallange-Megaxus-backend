import { Item } from "../../database/models/item.model";
import { AppError } from "../../shared/errors/app-error";
import { CreateItemRequest, UpdateItemRequest } from "./item.schema";

export class ItemService {
  async list(): Promise<Item[]> {
    return Item.findAll({
      order: [["createdAt", "DESC"]],
    });
  }

  async getById(id: number): Promise<Item> {
    const item = await Item.findByPk(id);

    if (!item) {
      throw new AppError("Item not found.", 404);
    }

    return item;
  }

  async create(payload: CreateItemRequest): Promise<Item> {
    return Item.create({
      name: payload.name,
      description: payload.description ?? null,
      imageUrl: payload.imageUrl ?? null,
    });
  }

  async update(id: number, payload: UpdateItemRequest): Promise<Item> {
    const item = await this.getById(id);

    if (payload.name !== undefined) {
      item.name = payload.name;
    }

    if (payload.description !== undefined) {
      item.description = payload.description;
    }

    if (payload.imageUrl !== undefined) {
      item.imageUrl = payload.imageUrl;
    }

    await item.save();

    return item;
  }

  async remove(id: number): Promise<void> {
    const item = await this.getById(id);

    await item.destroy();
  }
}

export const itemService = new ItemService();
