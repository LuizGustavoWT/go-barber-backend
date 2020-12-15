import { container } from 'tsyringe';
import { Request, Response } from 'express';
import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

export default class ProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id: provider_id } = request.params;

    const { month, year } = request.body;

    const listProviderMonthAvailability = container.resolve(
      ListProviderMonthAvailabilityService,
    );

    const availiability = await listProviderMonthAvailability.execute({
      provider_id,
      month,
      year,
    });

    return response.json(availiability);
  }
}
