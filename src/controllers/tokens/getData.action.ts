import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { cardService } from "@/services";
import config from "@/config";

const getCard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { token } = req.query;
    const verified = jwt.verify(token as string, config.JWT_SECRET);
    if (!verified) {
      return res.status(401).send("Token Invalido");
    }

    const foundCard = await cardService.getCard({
      token: token as string
    });
    if (foundCard) {
      return res
        .status(200)
        .json({
          card_number: foundCard.value.card_number,
          expiration_month: foundCard.value.expiration_month,
          expiration_year: foundCard.value.expiration_year
        });
    }
    return res.status(200).json({ error: "No se encontro data o a expirado" });
  } catch (err) {
    const error: any = err;

    if (error.response) {
      console.log(error.response.data);
    }

    return res.status(401).json({
      type: error.name,
      errors: error.errors,
      ...(error.message && { message: error.message }),
    });
  }
};

export default getCard;
