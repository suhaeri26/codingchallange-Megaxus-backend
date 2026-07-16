import { Request, Response } from "express";
import { sendPaginatedSuccess, sendSuccess } from "../../shared/http/response";
import { DrawGachaRequest } from "./gacha.schema";
import { gachaService } from "./gacha.service";

export class GachaController {
  async draw(req: Request<unknown, unknown, DrawGachaRequest>, res: Response): Promise<void> {
    const result = await gachaService.draw(req.user!.id, req.body);

    sendSuccess(res, result, "Gacha draw completed successfully.");
  }

  async history(req: Request, res: Response): Promise<void> {
    const history = await gachaService.history(req.user!.id);

    sendSuccess(res, history);
  }

  async adminHistory(req: Request, res: Response): Promise<void> {
    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? 10);
    const result = await gachaService.adminHistory(page, limit);

    sendPaginatedSuccess(res, result.rows, result.meta, "Gacha history fetched successfully.");
  }
}

export const gachaController = new GachaController();
