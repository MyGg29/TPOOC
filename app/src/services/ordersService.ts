import { delAsync, getAsync, setAsync } from '../../utils/storage'
import IOrderService from '../services/IOrderService'
import OrderModel  from '../models/order'
import merge from 'deepmerge'
import { resolveSoa } from 'dns';

export default class OrderService implements IOrderService{

  constructor() {
    //can't really use async functions in constructors......
  }

  create(newOrder:OrderModel.Order):Promise<number>{
    return new Promise<number>((resolve) =>
        {
          getAsync("orders")
          .then((ordersStr:string)=>
                {
                  let orders = JSON.parse(ordersStr) || []
                  let newId = 0
                  if(orders !== []){
                    //the max id of the current array of order + 1
                    newId = 1 + Math.max.apply(Math, orders.map((o:OrderModel.Order) => o.id))
                  }
                  orders.push({
                    id:newId,
                    createdAt:new Date(),
                    ...newOrder
                  })
                  setAsync("orders",JSON.stringify(orders))
                  resolve(newId)
                }) 
        })
  }

  delete(id:number):Promise<void>{
    return new Promise<void>((resolve)=>
        {
          getAsync("orders")
          .then((ordersStr:string)=>
                {
                  let orders = JSON.parse(ordersStr) || []
                  let orderIndexToDelete:number = orders.findIndex((value:OrderModel.Order) => 
                                                                   value.id === id)
                                                                   orders.splice(orderIndexToDelete,1)
                                                                   setAsync("orders",orders)
                  orders.splice(orderIndexToDelete,1)
                  setAsync("orders",orders)
                  resolve()
                }) 
        })
  }
  get(id:number):Promise<OrderModel.Order>{
    return new Promise<OrderModel.Order>(resolve =>
        {
          getAsync("orders")
          .then((ordersStr:string)=> 
                {
                  let orders = JSON.parse(ordersStr) || []
                  let queriedOrder:OrderModel.Order = orders.find((value:OrderModel.Order) => 
                                                                  value.id === id)
                  resolve(queriedOrder)
                })
        })
  }
  async getAll():Promise<OrderModel.Order[]>{
    return new Promise<OrderModel.Order[]>(resolve =>
        {
          getAsync("orders")
          .then((ordersStr:string)=> resolve(JSON.parse(ordersStr)))
        })
  }
  update(id:number, order:OrderModel.Order):Promise<void>{
    return new Promise<void>(resolve =>
        {
          getAsync("orders")
          .then((ordersStr:string)=> 
          {
            let orders = JSON.parse(ordersStr) || []
            let orderToUpdate:OrderModel.Order = orders.find((value:OrderModel.Order) => 
                                                               value.id === id)
            //we merge the order in database with the one received, 
            //when we try to merge and array in the structure (the package key for example), we overwrite the old one with the new one
            //note : allows to change the date of creation and the id
            const overwriteMerge = (destinationArray:any, sourceArray:any, options:any) => sourceArray
            let updatedOrder = merge(orderToUpdate, order, {arrayMerge:overwriteMerge})

            //we replace the old order with the new one, we have to get the index of the old one in order to use splice()                                            
            let orderIndexToUpdate:number = orders.findIndex((value:OrderModel.Order) => 
                                                        value.id === id)
            orders.splice(orderIndexToUpdate,1,updatedOrder)

            setAsync("orders",JSON.stringify(orders))
            resolve()
          })
        })
  }

}

