import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Transaction,
  Invoice,
} from '../models';
import {TransactionRepository} from '../repositories';

export class TransactionInvoiceController {
  constructor(
    @repository(TransactionRepository) protected transactionRepository: TransactionRepository,
  ) { }

  @get('/transactions/{id}/invoice', {
    responses: {
      '200': {
        description: 'Transaction has one Invoice',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Invoice),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Invoice>,
  ): Promise<Invoice> {
    return this.transactionRepository.invoice(id).get(filter);
  }

  @post('/transactions/{id}/invoice', {
    responses: {
      '200': {
        description: 'Transaction model instance',
        content: {'application/json': {schema: getModelSchemaRef(Invoice)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Transaction.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Invoice, {
            title: 'NewInvoiceInTransaction',
            exclude: ['id'],
            optional: ['transactionId']
          }),
        },
      },
    }) invoice: Omit<Invoice, 'id'>,
  ): Promise<Invoice> {
    return this.transactionRepository.invoice(id).create(invoice);
  }

  @patch('/transactions/{id}/invoice', {
    responses: {
      '200': {
        description: 'Transaction.Invoice PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Invoice, {partial: true}),
        },
      },
    })
    invoice: Partial<Invoice>,
    @param.query.object('where', getWhereSchemaFor(Invoice)) where?: Where<Invoice>,
  ): Promise<Count> {
    return this.transactionRepository.invoice(id).patch(invoice, where);
  }

  @del('/transactions/{id}/invoice', {
    responses: {
      '200': {
        description: 'Transaction.Invoice DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Invoice)) where?: Where<Invoice>,
  ): Promise<Count> {
    return this.transactionRepository.invoice(id).delete(where);
  }
}
