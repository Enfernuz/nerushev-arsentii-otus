// Let's omit any nullness and validation checks for simplicity.
const orders = {}
const userToOrders = {}
let idGenerator = 0

const service = {

    createOrder: (userId, items) => {
        const order = {
            id: `${idGenerator++}`,
            user_id: userId,
            items: items,
            status: "CREATED"
        }
        let userOrders = userToOrders[userId]
        if (!userOrders) {
            userOrders = []
            userToOrders[userId] = userOrders
        }
        userOrders.push(order)
        orders[order.id] = order
        return Object.assign({}, order)
    },

    getOrderById: (id) => orders[id],

    getUserOrders: (userId, status) => {
        const userOrders = userToOrders[userId] || []
        if (!status) {
            return userOrders
        }

        let result = []
        if (userOrders) {
            for (const order in userOrders) {
                if (order.status === status) {
                    result.push(Object.assign({}, order)) // return shallow copies
                }
            }
        }

        return result
    },

    changeOrderStatus: (id, status) => {
        const order = orders[id]
        if (!order) {
            throw new Error("An order with such ID does not exist.")
        }
        order.status = status
        return Object.assign({}, order)
    }
}

module.exports = { orderService: service }
