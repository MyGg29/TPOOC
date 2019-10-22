export default interface IStorage {
  getAsync(collection:string):Promise<string>;
  setAsync(collection:string, values:string):Promise<string>;
  delAsync(collection:string):Promise<string>;
}
