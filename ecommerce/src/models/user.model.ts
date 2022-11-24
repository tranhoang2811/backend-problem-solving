import {Entity, model, property, hasMany, hasOne} from '@loopback/repository';
import {Product} from './product.model';
import {Cart} from './cart.model';
import {Transaction} from './transaction.model';

@model()
export class User extends Entity {
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
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'number',
    required: true,
  })
  phoneNumber: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
  })
  role?: string;

  @property({
    type: 'string',
  })
  address?: string;

  @property({
    type: 'number',
  })
  age?: number;

  @property({
    type: 'string',
  })
  gender?: string;

  @property({
    type: 'date',
  })
  createdAt?: string;

  @property({
    type: 'date',
  })
  updatedAt?: string;

  @hasMany(() => Product)
  products: Product[];

  @hasOne(() => Cart)
  cart: Cart;

  @hasMany(() => Transaction)
  transactions: Transaction[];

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
