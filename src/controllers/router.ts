import express from "express";
import tokens from "./tokens/tokens.routes";

const router = express.Router();

router.use("/tokens", tokens);

export default router;
