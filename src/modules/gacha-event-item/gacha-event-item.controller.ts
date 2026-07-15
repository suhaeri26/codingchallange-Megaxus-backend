import { Request, Response } from "express";
import { sendSuccess } from "../../shared/http/response";
import {
  CreateGachaEventItemRequest,
  UpdateGachaEventItemRequest,
} from "./gacha-event-item.schema";
import { gachaEventItemService } from "./gacha-event-item.service";

export class GachaEventItemController {
  async list(req: Request, res: Response): Promise<void> {
    const items = await gachaEventItemService.list(Number(req.params.eventId));

    sendSuccess(res, items);
  }

  async create(
    req: Request,
    res: Response,
  ): Promise<void> {
    const item = await gachaEventItemService.create(Number(req.params.eventId), req.body);

    sendSuccess(res, item, "Gacha event item created successfully.", 201);
  }

  async update(
    req: Request,
    res: Response,
  ): Promise<void> {
    const item = await gachaEventItemService.update(Number(req.params.id), req.body);

    sendSuccess(res, item, "Gacha event item updated successfully.");
  }

  async remove(req: Request, res: Response): Promise<void> {
    await gachaEventItemService.remove(Number(req.params.id));

    sendSuccess(res, null, "Gacha event item deleted successfully.");
  }
}

export const gachaEventItemController = new GachaEventItemController();
