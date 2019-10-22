import IOrderService from '../services/IOrderService'
import OrderModel, { AnonymousContact }  from '../models/order'
import OrderService from './ordersService'

export default class OrderServiceProxy implements IOrderService{
  public realService:OrderService
  constructor() {
    this.realService = new OrderService()    
  }

  async create(newOrder:OrderModel.Order):Promise<number>{
    return this.realService.create(newOrder)
  }

  async delete(id:number):Promise<void>{
    return this.realService.delete(id)
  }
  async get(id:number):Promise<OrderModel.Order>{
    return this.realService.get(id)
  }
  async getAll():Promise<OrderModel.Order[]>{
    let orders:OrderModel.Order[] = await this.realService.getAll()
    orders.map((order:OrderModel.Order, index:number) => {
      order.contact = new AnonymousContact()
    })
    return orders
  }
  async update(id:number, order:OrderModel.Order):Promise<void>{
    return this.realService.update(id, order)
  }

}

