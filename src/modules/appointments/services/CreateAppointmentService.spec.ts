import AppError from '@shared/errors/AppError';
import { v4 as uuid } from 'uuid';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: uuid(),
    });

    expect(appointment).toHaveProperty('id');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointmentDate = new Date(2020, 11, 8, 22);

    const appointment = await createAppointment.execute({
      date: appointmentDate,
      provider_id: uuid(),
    });

    expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: uuid(),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
