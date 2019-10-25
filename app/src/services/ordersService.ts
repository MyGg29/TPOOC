import IOrderService from '../services/IOrderService'
import OrderModel, { AnonymousContact }  from '../models/order'
import merge from 'deepmerge'
import OrderRepository from '../models/orderRepository'

export default class OrderService implements IOrderService{
  ordersRepo:OrderRepository = new OrderRepository()

  constructor() {
    //can't really use async functions in constructors......
  }

  async create(newOrder:OrderModel.Order):Promise<number>{
    let orders:OrderModel.Order[] = await this.ordersRepo.getOrders()
    let newId = 0
    if(orders.length !== 0){
      //the max id of the current array of order + 1
      newId = 1 + Math.max.apply(Math, orders.map((o:OrderModel.Order) => o.id))
    }
    orders.push({
      id:newId,
      createdAt:new Date(),
      ...newOrder
    })
    this.ordersRepo.setAsync(orders)
    return newId    
  }

  async delete(id:number):Promise<void>{
    let orders = await this.ordersRepo.getOrders()
    let orderIndexToDelete:number = orders.findIndex((value:OrderModel.Order) => 
                                                     value.id === id)
    orders.splice(orderIndexToDelete,1)
    this.ordersRepo.setAsync(orders)
  }
  async get(id:number):Promise<OrderModel.Order>{
    let orders = await this.ordersRepo.getOrders()
    let queriedOrder:OrderModel.Order = orders.find((value:OrderModel.Order) => 
                                                    value.id === id)
    return queriedOrder
  }
  async getAll():Promise<OrderModel.Order[]>{
    return this.ordersRepo.getOrders()
  }
  async update(id:number, order:OrderModel.Order):Promise<Boolean>{
    let orders = await this.ordersRepo.getOrders()
    let orderToUpdate:OrderModel.Order = orders.find((value:OrderModel.Order) => 
                                                     value.id === id)
    if(!orderToUpdate){
      //The order we want to update doesn't exists, we return
      return false
    }
    //we merge the order in database with the one received, 
    //when we try to merge and array in the structure (the package key for example), we overwrite the old one with the new one
    //note : allows to change the date of creation and the id
    const overwriteMerge = (destinationArray:any, sourceArray:any, options:any) => sourceArray
    let updatedOrder = merge(orderToUpdate, order, {arrayMerge:overwriteMerge})

    //we replace the old order with the new one, we have to get the index of the old one in order to use splice()                                            
    let orderIndexToUpdate:number = orders.findIndex((value:OrderModel.Order) => 
                                                     value.id === id)
    orders.splice(orderIndexToUpdate,1,updatedOrder)

    this.ordersRepo.setAsync(orders)
    return true
  }

}

