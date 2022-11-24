import {Entity, model, property, belongsTo, hasOne} from '@loopback/repository';
import {User} from './user.model';
import {Invoice} from './invoice.model';

@model()
export class Transaction extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  deliveryStatus: string;

  @property({
    type: 'date',
  })
  createdAt?: string;

  @property({
    type: 'date',
  })
  updatedAt?: string;

  @belongsTo(() => User)
  userId: string;

  @hasOne(() => Invoice)
  invoice: Invoice;

  constructor(data?: Partial<Transaction>) {
    super(data);
  }
}

export interface TransactionRelations {
  // describe navigational properties here
}

export type TransactionWithRelations = Transaction & TransactionRelations;
