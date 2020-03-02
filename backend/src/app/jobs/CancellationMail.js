/* eslint-disable class-methods-use-this */
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  // eslint-disable-next-line class-methods-use-this
  async handle({ data }) {
    const { appointment } = data;

    await Mail.sendMail({
      // passando o from no sendMail pq no default não está funcionando
      from: 'Equipe Gobarber <noreply@gobarber.com>',
      to: `${appointment.provider.name} <${appointment.provider.email}>`,
      subject: 'Agendamento cancelado.',
      template: 'cancellation', // path só identifica se tiver a extenção .handlebars
      context: {
        provider: appointment.provider.name,
        user: appointment.user.name,
        date: format(
          parseISO(appointment.date),
          "'dia' dd 'de' MMMM', às 'H:mm'h'",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new CancellationMail();
