import { Request, Response, NextFunction } from 'express';
import { decode, verify } from 'jsonwebtoken';
import authConfig from '../config/auth';

import AppError from '../erros/AppError';

interface TokenPayLoad {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request, 
  response: Response, 
  next:NextFunction):void{

    const authHeader = request.headers.authorization;

    if(!authHeader){
      throw new AppError('JWT token is missing', 401);
    }

    //Bearer suidhasudh

    const [ , token ] = authHeader.split(' ');
    

    try {
      const decoded = verify(token, authConfig.jwt.secret);  

      const { sub } = decoded as TokenPayLoad;
      
      request.user = {  
        id: sub,
      };
      return next();
    } catch (error) {
     throw new AppError('Invalid JWT token', 401); 
    }
}