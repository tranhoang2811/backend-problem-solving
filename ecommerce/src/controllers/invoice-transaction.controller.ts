import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Invoice,
  Transaction,
} from '../models';
import {InvoiceRepository} from '../repositories';

export class InvoiceTransactionController {
  constructor(
    @repository(InvoiceRepository)
    public invoiceRepository: InvoiceRepository,
  ) { }

  @get('/invoices/{id}/transaction', {
    responses: {
      '200': {
        description: 'Transaction belonging to Invoice',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Transaction)},
          },
        },
      },
    },
  })
  async getTransaction(
    @param.path.string('id') id: typeof Invoice.prototype.id,
  ): Promise<Transaction> {
    return this.invoiceRepository.transaction(id);
  }
}
