import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Transaction} from './transaction.model';
import {Product} from './product.model';

@model()
export class Invoice extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  totalCost: number;

  @property({
    type: 'string',
    required: true,
  })
  payment: string;

  @property({
    type: 'date',
  })
  createdAt?: string;

  @property({
    type: 'date',
  })
  updatedAt?: string;

  @belongsTo(() => Transaction)
  transactionId: string;

  @hasMany(() => Product)
  products: Product[];

  constructor(data?: Partial<Invoice>) {
    super(data);
  }
}

export interface InvoiceRelations {
  // describe navigational properties here
}

export type InvoiceWithRelations = Invoice & InvoiceRelations;
