import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Invoice, InvoiceRelations, Transaction, Product} from '../models';
import {TransactionRepository} from './transaction.repository';
import {ProductRepository} from './product.repository';

export class InvoiceRepository extends DefaultCrudRepository<
  Invoice,
  typeof Invoice.prototype.id,
  InvoiceRelations
> {

  public readonly transaction: BelongsToAccessor<Transaction, typeof Invoice.prototype.id>;

  public readonly products: HasManyRepositoryFactory<Product, typeof Invoice.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('TransactionRepository') protected transactionRepositoryGetter: Getter<TransactionRepository>, @repository.getter('ProductRepository') protected productRepositoryGetter: Getter<ProductRepository>,
  ) {
    super(Invoice, dataSource);
    this.products = this.createHasManyRepositoryFactoryFor('products', productRepositoryGetter,);
    this.registerInclusionResolver('products', this.products.inclusionResolver);
    this.transaction = this.createBelongsToAccessorFor('transaction', transactionRepositoryGetter,);
    this.registerInclusionResolver('transaction', this.transaction.inclusionResolver);
  }
}
