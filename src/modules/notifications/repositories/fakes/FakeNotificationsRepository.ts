import { ObjectId } from 'mongodb';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import Notification from '../../infra/typeorm/schemas/Notification';

class FakeNotificationsRepository implements INotificationsRepository {
  private notification: Notification[] = [];

  public async create({
    content,
    recipient_id,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = new Notification();

    Object.assign(notification, { id: new ObjectId(), content, recipient_id });

    return notification;
  }
}

export default FakeNotificationsRepository;
