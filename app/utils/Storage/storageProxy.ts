import IStorage from './IStorage'
import { delAsync, getAsync, setAsync } from './storage'
import OrderModel, { AnonymousContact }  from '../../src/models/order'

export default class StorageProxy implements IStorage {
  async getAsync(collection:string):Promise<string>{
    if(this.checkPermission()){
      return new Promise<string>((resolve) => {
        getAsync(collection).then((ordersStr:any) => {
          let orders = JSON.parse(ordersStr)
          orders.map((order:OrderModel.Order, index:number) => {
            order.contact = new AnonymousContact()
          })
          resolve(JSON.stringify(orders))
        })
      })
    }
    else{
      return getAsync(collection)
    }
  }
  async setAsync(collection:string, values:string):Promise<string>{
    return setAsync(collection,values)
  }
  async delAsync(collection:string):Promise<string>{
    return delAsync(collection)
  }
  checkPermission():boolean{
    return 
  }
}
