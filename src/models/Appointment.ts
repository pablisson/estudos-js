import { v4 as uuid } from 'uuid'
import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  CreateDateColumn, 
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
 } from 'typeorm'

import User from './User';

/**
 * Relacionamentos entre tabelas:
 * Um para um           (OneToOne)
 * Um para muitos       (OneToMany)
 * Muitos para Muitos   (ManytoMany)
 */
@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'provider_id' })
  provider: User;

  @Column('timestamp with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}

export default Appointment;
