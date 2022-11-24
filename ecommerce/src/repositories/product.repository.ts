import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Product, ProductRelations, User, Cart, Invoice} from '../models';
import {UserRepository} from './user.repository';
import {CartRepository} from './cart.repository';
import {InvoiceRepository} from './invoice.repository';

export class ProductRepository extends DefaultCrudRepository<
  Product,
  typeof Product.prototype.id,
  ProductRelations
> {

  public readonly user: BelongsToAccessor<User, typeof Product.prototype.id>;

  public readonly cart: BelongsToAccessor<Cart, typeof Product.prototype.id>;

  public readonly invoice: BelongsToAccessor<Invoice, typeof Product.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('CartRepository') protected cartRepositoryGetter: Getter<CartRepository>, @repository.getter('InvoiceRepository') protected invoiceRepositoryGetter: Getter<InvoiceRepository>,
  ) {
    super(Product, dataSource);
    this.invoice = this.createBelongsToAccessorFor('invoice', invoiceRepositoryGetter,);
    this.registerInclusionResolver('invoice', this.invoice.inclusionResolver);
    this.cart = this.createBelongsToAccessorFor('cart', cartRepositoryGetter,);
    this.registerInclusionResolver('cart', this.cart.inclusionResolver);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
