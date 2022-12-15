import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

// genera un token firmado a partir de cualquier
// tipo de data
export const generateJWT = (data: any) => {
  const token = jwt.sign(data, JWT_SECRET);
  return token;
};

// verifica la firma de token y ademas
// devuelve su valor
export const decodeAndVerifyJWT = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};
