import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Product,
  Invoice,
} from '../models';
import {ProductRepository} from '../repositories';

export class ProductInvoiceController {
  constructor(
    @repository(ProductRepository)
    public productRepository: ProductRepository,
  ) { }

  @get('/products/{id}/invoice', {
    responses: {
      '200': {
        description: 'Invoice belonging to Product',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Invoice)},
          },
        },
      },
    },
  })
  async getInvoice(
    @param.path.string('id') id: typeof Product.prototype.id,
  ): Promise<Invoice> {
    return this.productRepository.invoice(id);
  }
}
