import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import jwt from 'jsonwebtoken';
import { cardService } from "@/services";
import config from "@/config";

const postBotData = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { card_number, cvv, expiration_month, expiration_year, email } = req.body;
    const pkToken = req.header('Authorization')

    const jwtSecretKey = config.JWT_SECRET;
    const token = jwt.sign({cardNumberString:card_number.toString()}, jwtSecretKey,{ expiresIn: 60 });

    const createCardData = await cardService.createCard({token,data:{
      card_number, cvv, expiration_month, expiration_year, email, pkToken
    }});
    if(createCardData.value === "OK"){
      return res.status(200).json({token});
    }
      return res.status(400).json({ error: "No se pudo guardar la data" });
    
  } catch (error) {
    return next(error);
  }
};

export default postBotData;
