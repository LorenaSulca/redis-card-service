import { NextFunction, Request, Response } from "express";

const VALID_EMAILS_DOMAINS = ["gmail.com", "hotmail.com", "yahoo.es"];
const currentYear = new Date().getFullYear();

function validateCardNumber(cardNumber: number) {
  const arr = Array.from(String(cardNumber), Number);
  const reverseArr = [...arr].reverse();
  let sum = 0;
  for (let i = 0; i < reverseArr.length; i += 2) {
    sum += reverseArr[i];

    if (reverseArr[i + 1]) {
      sum += reverseArr[i + 1] * 2;
      if (reverseArr[i + 1] * 2 > 9) {
        sum -= 9;
      }
    }
  }

  return sum % 10 === 0;
}

function validateEmail(email: string) {
  const substrings = email.split("@");

  const beforeDomain =
    substrings.length === 1
      ? false // delimiter is not part of the string
      : substrings.slice(0, -1).join("@");
  if (!beforeDomain) {
    return false;
  }
  if (beforeDomain.match(/^[a-zA-Z0-9]+$/) === null) {
    return false;
  }
  let valid = false;
  for (const domain of VALID_EMAILS_DOMAINS) {
    if (email.endsWith(domain)) {
      valid = true;
    }
  }
  return valid;
}

export const verifyCardValues = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  ((): any => {
    const {
      card_number,
      cvv,
      expiration_month,
      expiration_year,
      email
    }: {
      card_number: number;
      cvv: number;
      expiration_month: string;
      expiration_year: string;
      email: string;
    } = req.body;
    let cardNumberValidation = true;
    let cvvValidation = true;
    let expirationMonthValidation = true;
    let expirationYearValidation = true;
    let emailValidation = true;
    if (
      !(
        card_number &&
        card_number.toString().length < 17 &&
        card_number.toString().length > 12 &&
        validateCardNumber(card_number)
      )
    ) {
      cardNumberValidation = false;
    }
    if (!(cvv.toString().length > 2 && cvv.toString().length < 5)) {
      cvvValidation = false;
    }
    if (
      !(
        expiration_month &&
        Number(expiration_month) < 13 &&
        Number(expiration_month) > 0
      )
    ) {
      expirationMonthValidation = false;
    }
    if (!(expiration_year && Number(expiration_year) - currentYear < 6)) {
      expirationYearValidation = false;
    }
    if (!(email && validateEmail(email))) {
      emailValidation = false;
    }
    if(!(emailValidation && expirationMonthValidation && expirationYearValidation && cardNumberValidation && cvvValidation)){
        return res.status(401).json({
            type: 'application',
            errors:
              'La validacion de datos fallo',
          });
    }
    return next();
  })();
};
