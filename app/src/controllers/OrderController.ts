import {
  Request,
  Response,
  Router,
} from 'express'

import { delAsync, getAsync, setAsync } from '../../utils/storage'
import OrderModel  from '../models/order'
import merge from 'deepmerge'

export default class OrderController {
  public path = '/orders'
  public router = Router()

  constructor() {
    this.intializeRoutes()
  }

  public intializeRoutes() {
    this.router.get(this.path, this.getAll)
    this.router.post(this.path, this.create)
    this.router.put(`${this.path}/:id`, this.update)
    this.router.delete(`${this.path}/:id`, this.delete)
    this.router.get(`${this.path}/:id`, this.get)
  }

  public getAll = async (request: Request, response: Response) => {
    let orders:OrderModel.Order[] = JSON.parse(await getAsync("orders")) || []
    response.status(200).json(orders)
  }

  public create = async (request: Request, response: Response) => {
    let orders:OrderModel.Order[] = JSON.parse(await getAsync("orders")) || []
    let newOrder:OrderModel.Order = request.body
    
    //get the max id of every orders stored, 0 if no orders are stored
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

    response.status(201).json(newId)
    
  }
  
  public update = async (request: Request, response: Response) => {
    let orders:OrderModel.Order[] = JSON.parse(await getAsync("orders")) || []
    let receivedOrder:OrderModel.Order = request.body
    let orderToUpdate:OrderModel.Order = orders.find((value:OrderModel.Order) => 
                                                value.id.toString() === request.params.id)

    //we merge the order in database with the one received, 
    //when we try to merge and array in the structure (the package key for example), we overwrite the old one with the new one
    //note : this allows to change the date of creation and the id
    const overwriteMerge = (destinationArray:any, sourceArray:any, options:any) => sourceArray
    let updatedOrder = merge(orderToUpdate, receivedOrder, {arrayMerge:overwriteMerge})

    //we replace the old order with the new one, we have to get the index of the old one in order to use splice()                                            
    let orderIndexToUpdate:number = orders.findIndex((value:OrderModel.Order) => 
                                                value.id.toString() === request.params.id)
    orders.splice(orderIndexToUpdate,1,updatedOrder)

    setAsync("orders",JSON.stringify(orders))
    response.sendStatus(200)
  }

  public delete = async (request: Request, response: Response) => {
    let orders:OrderModel.Order[] = JSON.parse(await getAsync("orders")) || []
    let orderIndexToDelete:number = orders.findIndex((value:OrderModel.Order) => 
                                                value.id.toString() === request.params.id)
    orders.splice(orderIndexToDelete,1)
    response.sendStatus(200);
  }

  public get = async (request: Request, response: Response) => {
    let orders:OrderModel.Order[] = JSON.parse(await getAsync("orders")) || []
    
    let queriedOrder:OrderModel.Order = orders.find((value:OrderModel.Order) => 
                                                value.id.toString() === request.params.id)
    response.json(queriedOrder)
  }
}
