import { de } from 'date-fns/locale';

export default interface ICreateNotificationDTO {
  content: string;
  recipient_id: string;
}
