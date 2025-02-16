/**
 * ROTA: Recebe a requisição, chama outro arquivo, devolve uma resposta
 */
 import { Router } from 'express';
 import multer from 'multer';
 import uploadConfig from '../config/upload';

 import CreateUserService from '../services/CreateUserService';
 import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
 import ensureAuthenticated from '../middlewares/ensureAuthenticated';

 const usersRouter = Router();
 const upload = multer(uploadConfig);


 usersRouter.post('/', async (request, response) => {

    const { name, email, password } = request.body;
    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return response.json(user);
    
    // return response.json();

 });

 usersRouter.patch(
    '/avatar',
    ensureAuthenticated, 
    upload.single('avatar'),
    async (request, response) => 
    {
      const updateUserAvatar = new UpdateUserAvatarService();

      const user = await updateUserAvatar.execute({
        user_id: request.user.id,
        avatarFileName: request.file.filename,
      });

      delete user.password;

      return response.json(user);

    //console.log(request.file);
      
    } 
 );
 
 export default usersRouter; 