export interface IDefaultService{
  create(order:any):number
  delete(id:number):void
  get(id:number):any
  getAll():any[]
  update(order:any):any
}
