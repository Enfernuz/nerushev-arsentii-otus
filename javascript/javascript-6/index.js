const { GraphQLServer } = require('graphql-yoga')
const { importSchema } = require('graphql-import')

const { userService } = require('./service/user-service')
const { productService } = require('./service/product-service')
const { cartService } = require('./service/cart-service')
const { orderService } = require('./service/order-service')

const typeDefs = importSchema('./graphql/schema.graphql')

const resolvers = {
  Query: {
    product: (parent, args) => productService.getProductById(args.id),
    products: (parent, args) => productService.getProductsByCategory(args.category),

    user: (parent, args) => userService.getUserById(args.id),

    user_cart: (parent, args) => cartService.getCart(args.user_id),

    order: (parent, args) => orderService.getOrderById(args.id),
    user_orders: (parent, args) => orderService.getOrdersByUserId(args.user_id, args.status)


  },
  Mutation: {
    addUser: (parent, args) => userService.createUser(args.name),
    updateUser: (parent, args) => userService.updateUser(args.id, args.name),
    deleteUserById: (parent, args) => userService.deleteUserById(args.id),

    createProduct: (parent, args) => productService.createProduct(args.description, args.category, args.price),
    updateProduct: (parent, args) => {
      const product = args.product
      productService.updateProduct(args.id, product.description, product.category, product.price)
    },
    deleteProductById: (parent, args) => productService.deleteProductById(args.id),

    addToCart: (parent, args) => {
      const item = args.item
      cartService.addToCart(args.user_id, item.product_id, item.quantity)
      return true
    },
    removeFromCart: (parent, args) => {
      const item = args.item
      cartService.removeFromCart(args.user_id, item.product_id, item.quantity)
      return true
    },
    checkoutCart: (parent, args) => cartService.checkoutCart(args.user_id),

    changeOrderStatus: (parent, args) => orderService.changeOrderStatus(args.order_id, args.status)
  }
}

// 3
const server = new GraphQLServer({
  typeDefs,
  resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))
