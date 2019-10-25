import OrderModel from "./order"
import {getAsync, setAsync, delAsync} from "../../utils/Storage/storage"

export default class OrderRepository {
  async getOrders():Promise<OrderModel.Order[]>{
    return JSON.parse(await getAsync("orders")) || []
  } 
  async setAsync(collection:OrderModel.Order[]):Promise<void>{
    return setAsync("orders", JSON.stringify(collection))
  }
}
