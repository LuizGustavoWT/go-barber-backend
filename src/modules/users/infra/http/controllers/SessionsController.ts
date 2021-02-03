import { Request, Response } from 'express';

import { container } from 'tsyringe';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import { classToClass } from 'class-transformer';
import ViewSessionUser from '@modules/users/services/ViewSessionUser';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);
    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });

    return response.send({ user: classToClass(user), token });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const viewUserInSession = container.resolve(ViewSessionUser);
    const user = await viewUserInSession.execute({ user_id: id });

    return response.send({ user: classToClass(user) });
  }
}
