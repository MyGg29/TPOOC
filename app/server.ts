import App from './app'
import OrderController from './src/controllers/OrderController'

const app = new App([
  new OrderController(),
], 1337)

app.listen()
