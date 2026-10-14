import jwt, { SignOptions } from 'jsonwebtoken';

export const generateToken = (userId: string): string => {
  const options: SignOptions = {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  };
  return jwt.sign({ id: userId }, process.env.JWT_SECRET!, options);
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, process.env.JWT_SECRET!);
};
