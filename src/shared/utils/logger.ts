import pino from "pino";

export const logger = pino({
  level: "info",

  transport: {
     target: require.resolve("pino-pretty"), 
    options: {
      colorize: true
    }
  }
});