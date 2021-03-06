import { container } from 'tsyringe';

import '@modules/Users/providers';
import './providers';

import IUsersRepository from '@modules/Users/repositories/IUsersRepositories';
import UsersRepository from '@modules/Users/infra/typeorm/repositories/UsersRepository';

import IUsersTokenRepository from '@modules/Users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/Users/infra/typeorm/repositories/UserTokensRepository';

import IAppointmentsRepository from '@modules/Appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/Appointments/infra/typeorm/repositories/AppointmentsRepository';

import INotificationsRepository from '@modules/Notifications/repositories/INotificationsRepository';
import NotificationsRepository from '@modules/Notifications/infra/typeorm/repositories/NotificationRepositories';
// passando o <IAppointmentsRepository> garante q a variavel
// passado como segundo parametro vai ter o formato do IAppointmentsRepository
// Singleton:> Intancia a classe apenas uma unica vez, e sempre que os services
// forem utilizar a esse repositorio, vao utilizar a mesma instancia dessa classe
container.registerSingleton<IAppointmentsRepository>(
  // id da injeção de dependencias é o msm nome do repositorio que vai utilizar
  'AppointmentsRepository',
  // o retorno é o repositorio que vai servir para injetar as dependeciais
  AppointmentsRepository
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);

container.registerSingleton<IUsersTokenRepository>(
  'UserTokensRepository',
  UserTokensRepository
);

container.registerSingleton<INotificationsRepository>(
  'NotificationsRepository',
  NotificationsRepository
);
