import "module-alias/register";

import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import router from "@/controllers/router";
import config from "@/config";

const bootstrap = async () => {

  const app = express();
  app.use(cors());
  app.use(helmet());
  app.use(morgan("dev"));
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: false }));

  app.use("/", router);

  app.listen(config.SERVER_PORT, () => {
    console.log(`Server listening at http://localhost:${config.SERVER_PORT}`);
  });
};

bootstrap().catch(console.error);
