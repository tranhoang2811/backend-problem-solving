import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Transaction, TransactionRelations, User, Invoice} from '../models';
import {UserRepository} from './user.repository';
import {InvoiceRepository} from './invoice.repository';

export class TransactionRepository extends DefaultCrudRepository<
  Transaction,
  typeof Transaction.prototype.id,
  TransactionRelations
> {

  public readonly user: BelongsToAccessor<User, typeof Transaction.prototype.id>;

  public readonly invoice: HasOneRepositoryFactory<Invoice, typeof Transaction.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('InvoiceRepository') protected invoiceRepositoryGetter: Getter<InvoiceRepository>,
  ) {
    super(Transaction, dataSource);
    this.invoice = this.createHasOneRepositoryFactoryFor('invoice', invoiceRepositoryGetter);
    this.registerInclusionResolver('invoice', this.invoice.inclusionResolver);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
