import OrderModel  from '../models/order'
export default interface IOrderService{
  create(order:OrderModel.Order):Promise<number>
  delete(id:number):Promise<void>
  get(id:number):Promise<OrderModel.Order>
  getAll():Promise<OrderModel.Order[]>
  update(id:number, order:OrderModel.Order):Promise<void>
}
