import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      email: 'jhontre@example.com',
      name: 'Jhon Tre',
    });

    expect(updatedUser.name).toBe('Jhon Tre');
    expect(updatedUser.email).toBe('jhontre@example.com');
  });

  it('should not be able to change the email to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'Test',
      email: 'test@example.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        email: 'jhondoe@example.com',
        name: 'Jhon Tre',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      email: 'jhontre@example.com',
      name: 'Jhon Tre',
      password: '123123',
      old_password: '123456',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        email: 'jhontre@example.com',
        name: 'Jhon Tre',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        email: 'jhontre@example.com',
        name: 'Jhon Tre',
        password: '123123',
        old_password: '123111',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able update the profile from non-existing user', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'non-existing-user',
        email: 'jhondoe@example.com',
        name: 'Jhon Doe',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
