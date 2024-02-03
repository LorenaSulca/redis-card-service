import express from "express";
import { body, check} from "express-validator";
import postToken from "./postToken.action";
import getData from "./getData.action";
import { verifyCardValues } from './middlewares/verifyCardValues';
import { verifyPKToken,  } from './middlewares/verifyPKToken';

const router = express.Router();

router.post(
  "/",
  body("email").isString().notEmpty(),
  body("card_number").isNumeric().notEmpty(),
  body("cvv").isNumeric().notEmpty(),
  body("expiration_year").isString().notEmpty(),
  body("expiration_month").isString().notEmpty(),
  verifyPKToken,
  verifyCardValues,
  postToken
);

router.get(
  "/",
  check("token").isString().notEmpty(),
  verifyPKToken,
  getData
);

export default router;
