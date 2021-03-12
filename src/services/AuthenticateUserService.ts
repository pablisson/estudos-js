import { getRepository } from 'typeorm';
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '../models/User';

interface Request{
  email: string;
  password: string;
}

interface Response{ 
  user: User,
  token: string
}

class AuthenticateUserService{
  public async execute({ email, password}:Request): Promise<Response>
  {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if(!user)
    {
      throw new Error('Incorrect email/password combination');
    }
    
    const passwordMatched = await compare(password, user.password != undefined ? user.password : '' )

    if(!passwordMatched)
    {
      throw new Error('Incorrect email/password combination.');
    }

    const token = sign({  },  'c43127587d7c786f11bdc58838613e97', {
      subject: user.id,
      expiresIn: '1d',
    });

    return {
      user,
      token,
    }
  }
}

export default AuthenticateUserService;