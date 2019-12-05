// Let's use a naive simple strategy: an in-memory storage and an ever-increasing ID generator.
// Also omit any nullness checks for simplicity.
const repository = {}
let idGenerator = 0

const service = {

    createUser: (name) => {
        const date_registered = `${Date.now()}`
        const user = {
            id: `${idGenerator++}`,
            name: name,
            date_registered: date_registered,
            date_updated: null
        }
        repository[user.id] = user
        return Object.assign({}, user)
    },

    getUserById: (id) => repository[id],

    updateUser: (id, name) => {
        const user = repository[id];
        if (!user) {
            throw new Error("A user with such ID does not exist.")
        }
        user.name = name
        user.date_updated = `${Date.now()}`
        return Object.assign({}, user)
    },

    deleteUserById: (id) => {
        const user = repository[id]
        if (!user) {
            throw new Error("A user with such ID does not exist.")
        }
        repository[id] = undefined
        return user
    }
}

module.exports = { userService: service }
