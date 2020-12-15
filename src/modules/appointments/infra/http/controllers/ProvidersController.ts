import { container } from 'tsyringe';
import { Request, Response } from 'express';
import ListProvidersService from '@modules/appointments/services/ListProvidersService';

export default class AppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;

    const listProviders = container.resolve(ListProvidersService);

    const providers = await listProviders.execute({
      user_id,
    });

    return response.json(providers);
  }
}
