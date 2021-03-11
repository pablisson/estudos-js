/**
 * 
 * O repositorio seria algo semelhante ao que eu conheço como DAO
 * 
 * ╔════════╗    ╔════════════╗    ╔═══════╗
 * ║ models ║ ←→ ║ Repository ║ ←→ ║ Route ║
 * ╚════════╝    ╚════════════╝    ╚═══════╝
 */
import { EntityRepository, Repository } from 'typeorm';

import Appointment from '../models/Appointment';

/**
 * As classes criadas para trabalhar diretamente com a base de dados e que a chamamos de 
 * <nome-da-tabela> + <Repository>, nosso caso, AppointmentsRepository.
 * Essas classes herdarão Repository. 
 * 
 * A classe repository ja contém alguns comandos para buscar e todos métodos relacionados com o CRUD.
 */
@EntityRepository(Appointment)
class AppointmentRepository extends Repository<Appointment>{

  public async findByDate(date: Date ): Promise<Appointment | null> {
    const findAppointment = await this.findOne({
      where: { date },
    });

    return findAppointment || null;
  }


}

export default AppointmentRepository;