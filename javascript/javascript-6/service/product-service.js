// Let's use a naive simple strategy: an in-memory storage and an ever-increasing ID generator.
// Also omit any nullness checks for simplicity.
const repository = {}
let idGenerator = 0

const service = {
    createProduct: (description, category, price) => {
        const product = {
            id: `${idGenerator++}`,
            description: description,
            category: category,
            price: price
        }
        repository[product.id] = product
        return Object.assign({}, product) // return a shallow copy
    },

    getProductById: (id) => repository[id],

    getProductsByCategory: (category) => {
        const result = []
        // We are not going to be smart here and will just use the linear search.
        for (const id in repository) {
            if (Object.prototype.hasOwnProperty.call(repository, id)) {
                const product = repository[id];
                if (product.category === category) {
                    result.push(product)
                }
            }   
        }
        return result
    },

    updateProduct: (id, description, category, price) => {
        const product = repository[id];
        if (!product) {
            throw new Error("A product with such ID does not exist.")
        }
        product.description = description
        product.category = category
        product.price = price
        return Object.assign({}, product) // return a shallow copy
    },

    deleteProductById: (id) => {
        const product = repository[id]
        if (!product) {
            throw new Error("A product with such ID does not exist.")
        }
        repository[id] = undefined
        return product
    }
}

module.exports = { productService: service }
