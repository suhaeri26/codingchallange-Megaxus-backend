import { Request, Response } from "express";
import { sendSuccess } from "../../shared/http/response";
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
}

export const gachaController = new GachaController();
