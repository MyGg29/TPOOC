import {
  Request,
  Response,
  Router,
} from 'express'

import OrderModel  from '../models/order'
import OrderServiceProxy from '../services/ordersServiceProxy'
import IOrderService from '../services/IOrderService'

export default class OrderController {
  public path = '/orders'
  public router = Router()
  public orderService:IOrderService = new OrderServiceProxy()

  constructor() {
    this.initializeRoutes()
  }

  public initializeRoutes() {
    this.router.get(this.path, this.getAll)
    this.router.post(this.path, this.create)
    this.router.put(`${this.path}/:id`, this.update)
    this.router.delete(`${this.path}/:id`, this.delete)
    this.router.get(`${this.path}/:id`, this.get)
  }

  public getAll = async (request: Request, response: Response) => {
    this.orderService.getAll()
    .then((orders:OrderModel.Order[]) => 
          response.status(200).json(orders))
  }

  public create = async (request: Request, response: Response) => {
    let newOrder:OrderModel.Order = request.body
    this.orderService.create(newOrder)
    .then((newId:number) => response.status(201).json(newId))
  }
  
  public update = async (request: Request, response: Response) => {
    let receivedOrder:OrderModel.Order = request.body
    this.orderService.update(parseInt(request.params.id),receivedOrder)
    .then(() => response.sendStatus(200))
  }

  public delete = async (request: Request, response: Response) => {
    this.orderService.delete(parseInt(request.params.id))
    .then(() => response.sendStatus(200))
  }

  public get = async (request: Request, response: Response) => {
    this.orderService.get(parseInt(request.params.id))
    .then((queriedOrder:OrderModel.Order) => 
          response.status(200).json(queriedOrder))
  }
}
