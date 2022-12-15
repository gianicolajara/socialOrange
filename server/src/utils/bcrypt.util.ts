import { genSaltSync, hashSync, compareSync } from "bcrypt";

// funcion que permite encriptar cualquier string
// devolvera un string con el hash
export const hash = (str: string): string => {
  const salt = genSaltSync(10);
  const hash = hashSync(str, salt);
  return hash;
};

// function que permite validar un hash con un string
// devolvera un boolean
export const validate = (str: string, hash: string): boolean => {
  return compareSync(str, hash);
};
