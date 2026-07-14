import { RequestHandler } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { z } from "zod";

type RequestSchema = {
  body?: z.ZodType;
  params?: z.ZodType;
  query?: z.ZodType;
};

export const validateRequest = (schema: RequestSchema): RequestHandler => {
  return (req, _res, next) => {
    try {
      if (schema.body) {
        req.body = schema.body.parse(req.body) as typeof req.body;
      }

      if (schema.params) {
        req.params = schema.params.parse(req.params) as ParamsDictionary;
      }

      if (schema.query) {
        const parsedQuery = schema.query.parse(req.query);

        Object.keys(req.query).forEach((key) => {
          delete (req.query as any)[key];
        });

        Object.assign(req.query, parsedQuery);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};