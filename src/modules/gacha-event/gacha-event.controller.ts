import { Request, Response } from "express";
import { sendSuccess } from "../../shared/http/response";
import {
  CreateGachaEventRequest,
  UpdateGachaEventRequest,
} from "./gacha-event.schema";
import { gachaEventService } from "./gacha-event.service";

export class GachaEventController {
  async list(_req: Request, res: Response): Promise<void> {
    const events = await gachaEventService.list();

    sendSuccess(res, events);
  }

  async getById(req: Request, res: Response): Promise<void> {
    const event = await gachaEventService.getById(Number(req.params.id));

    sendSuccess(res, event);
  }

  async create(req: Request<unknown, unknown, CreateGachaEventRequest>, res: Response): Promise<void> {
    const event = await gachaEventService.create(req.user!.id, req.body);

    sendSuccess(res, event, "Gacha event created successfully.", 201);
  }

  async update(
    req: Request,
    res: Response,
  ): Promise<void> {
    const event = await gachaEventService.update(Number(req.params.id), req.body);

    sendSuccess(res, event, "Gacha event updated successfully.");
  }

  async remove(req: Request, res: Response): Promise<void> {
    await gachaEventService.remove(Number(req.params.id));

    sendSuccess(res, null, "Gacha event deleted successfully.");
  }
}

export const gachaEventController = new GachaEventController();
