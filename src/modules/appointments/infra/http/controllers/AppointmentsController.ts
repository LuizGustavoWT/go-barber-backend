import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
import { Request, Response } from 'express';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { provider_id, date } = request.body;
    const { id: user_id } = request.user;

    const parsedDate = date;

    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({
      date: parsedDate,
      user_id,
      provider_id,
    });

    return response.json(appointment);
  }
}
