import { container } from 'tsyringe';
import { Request, Response } from 'express';
import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';

export default class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { day, month, year } = request.body;
    const { id: provider_id } = request.user;

    const listAppointmentsProvider = container.resolve(
      ListProviderAppointmentsService,
    );

    const appointments = await listAppointmentsProvider.execute({
      provider_id,
      day,
      month,
      year,
    });

    return response.json(appointments);
  }
}
