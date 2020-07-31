import { getMongoRepository, MongoRepository } from 'typeorm';

import INotificationsRepository from '@modules/Notifications/repositories/INotificationsRepository';
import ICreateNotificationDTO from '@modules/Notifications/dtos/ICreateNotificationDTO';

import Notification from '../schemas/Notification';

class NotificationsRepository implements INotificationsRepository {
  private ormRepositorie: MongoRepository<Notification>;

  constructor() {
    // sempre q for usar uma segunda conexao, passar o nome da conexao
    this.ormRepositorie = getMongoRepository(Notification, 'mongo');
  }

  public async create({
    content,
    recipient_id,
  }: ICreateNotificationDTO): Promise<Notification> {
    const appointment = this.ormRepositorie.create({
      content,
      recipient_id,
    });

    await this.ormRepositorie.save(appointment);

    return appointment;
  }
}

export default NotificationsRepository;
