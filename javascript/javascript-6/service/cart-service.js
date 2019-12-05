const { orderService } = require('./order-service')

// Let's omit any nullness and validation checks for the sake of simplicity.
const carts = {}

const cartUtil = {
    isEmpty: (cart) => {
        return Object.keys(cart).length === 0
    },
    getItems: (cart) => {
        const items = []
        for (const productId in cart) {
            if (Object.prototype.hasOwnProperty.call(cart, productId)) {
                const item = {product_id: productId, quantity: cart[productId]}
                items.push(item)
            }
        }
        return items
    }
}

const service = {

    getCart: (userId) => {
        let cart = carts[userId]
        if (!cart) {
            cart = {}
            carts[userId] = cart
        }
        return Object.assign({}, cart) // return a shallow copy of the cart
    },

    addToCart: (userId, productId, quantity) => {
        let cart = carts[userId]
        if (!cart) {
            cart = {}
            carts[userId] = cart
        }

        if (Object.prototype.hasOwnProperty.call(cart, productId)) {
            cart[productId] += quantity
        } else {
            cart[productId] = quantity
        }
    },

    removeFromCart: (userId, productId, quantity) => {
        let cart = carts[userId]
        if (cart) {
            if (Object.prototype.hasOwnProperty.call(cart, productId)) {
                const currentQuantity = cart[productId]
                if (currentQuantity > quantity) {
                    cart[productId] -= quantity
                } else {
                    cart[productId] = undefined
                }
            }
        }
    },

    checkoutCart: (userId) => {
        const cart = service.getCart(userId)
        if (cartUtil.isEmpty(cart)) {
            throw new Error("The cart is empty.")
        }

        const items = cartUtil.getItems(cart)
        return orderService.createOrder(userId, items)
    }
}

module.exports = { cartService: service }
