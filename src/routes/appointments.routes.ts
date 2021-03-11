/**
 * ROTA: Recebe a requisição, chama outro arquivo, devolve uma resposta
 */
import { response, Router } from 'express';
import { startOfHour, parseISO } from  'date-fns';

import AppointmentRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentRepository();

appointmentsRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;
    const parsedDate = parseISO(date);
    const createAppointment = new CreateAppointmentService(appointmentsRepository);
    const appointment = createAppointment.execute({ date: parsedDate, provider });

    return response.json(appointment);

  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentsRepository.all();

  return response.json(appointments);
});

export default appointmentsRouter; 