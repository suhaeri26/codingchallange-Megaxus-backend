import { Request, Response } from "express";
import { sendSuccess } from "../../shared/http/response";
import { CreateItemRequest, UpdateItemRequest } from "./item.schema";
import { itemService } from "./item.service";

export class ItemController {
  async list(_req: Request, res: Response): Promise<void> {
    const items = await itemService.list();

    sendSuccess(res, items);
  }

  async getById(req: Request, res: Response): Promise<void> {
    const item = await itemService.getById(Number(req.params.id));

    sendSuccess(res, item);
  }

  async create(req: Request<unknown, unknown, CreateItemRequest>, res: Response): Promise<void> {
    const item = await itemService.create(req.body);

    sendSuccess(res, item, "Item created successfully.", 201);
  }

  async update(req: Request, res: Response): Promise<void> {
    const item = await itemService.update(Number(req.params.id), req.body as UpdateItemRequest);

    sendSuccess(res, item, "Item updated successfully.");
  }

  async remove(req: Request, res: Response): Promise<void> {
    await itemService.remove(Number(req.params.id));

    sendSuccess(res, null, "Item deleted successfully.");
  }
}

export const itemController = new ItemController();
