const burgerOrder = require("../models/burgerOrder")
const slices = require("../models/slices")


module.exports = {
    get_slices_list: async() => {
        const slices_list = await slices.find()
        return slices_list
    },

    add_new_order: async(body,cb) => {
        const {order_quantity,customer_modile_number,slices} = body
        try {
            let body = {
                order_quantity: order_quantity || 1,
                customer_modile_number,
                slices,
                order_number: `BURG-${Math.floor(Math.random()*100)}`
            }

            new burgerOrder(body).save().then(response => {
                cb(response._id)
            }).catch(err => {
                console.log({err})
                cb(false)
            })
        } catch (error) {
            console.log({error})
            cb(false)
        }
    },

    get_burger: async(id) => {
        const ordered_burger = await burgerOrder.findOne({_id: id})
    },

    add_new_slice: async(body,cb) => {
        new slices(body).save().then((response) => {
            cb(true)
        }).catch(err => {
            cb(false)
        })
    }
}