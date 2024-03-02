const {Router} = require('express')
const { get_slices_list, add_new_slice, add_new_order, get_burger } = require('../controllers/customerOrder')
const router = Router()

router.get("/test", (req,res) => {
    res.json({working: true})
})

router.get("/getSlicesList", async(req,res) => {
    try {
        const slices_list = await get_slices_list()
        if(slices_list.length){
            res.json({success: true, message: "Success", result: slices_list})
        }else{
            res.json({success: false, message: "Sorry no data available", result: []})
        }
    } catch (error) {
        res.json({success: false,message: "Something went wrong", result: []})
    }
})

router.post("/addOrder", async(req,res) => {
    const postData = req.body
    try {
        add_new_order(postData,ures => {
            if(ures){
                res.json({success: true, message: "Order Successfully created", result: ures})
            }else{
                res.json({success: false, message: "Failure", result: "Order couldnt be created"})
            }
        })
    } catch (error) {
        res.json({success: false,message: "Failure", result: "Something went wrong"})
    }
})

router.get("/getBurger", async(req,res) => {
    const postData = req.body
    const {id} = postData
    try {
        const burger = await get_burger(id)
        if(burger){
            res.json({success: true, message: "Success", result: burger})
        }else{
            res.json({success: false, message: "Sorry no data available", result: {}})
        }
    } catch (error) {
        res.json({success: false,message: "Something went wrong", result: {}})
    }
})

router.post("/addNewSlice", async(req,res) => {
    const postData = req.body
    try {
        add_new_slice(postData, ures => {
            if(ures){
                res.json({success: true, message: "Success", result: "Slice Successfully added"})
            }else{
                res.json({success: false, message: "Failure", result: "Slice couldnt be added"})
            }
        })
    } catch (error) {
        res.json({success: false,message: "Something went wrong", result: []})
    }
})

module.exports = router