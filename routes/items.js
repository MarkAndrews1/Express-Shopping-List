const Item = require('../itemClass')
const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
    try{
        return res.json({items: Item.listAll()})
    }catch(err){
        return next(err)
    }
})

router.post('/', (req, res, next) => {
    try{
        let newItem = new Item(req.query.name, req.query.price)
        return res.json({item: newItem})
    }catch(err){
        return next(err)
    }
})

router.get('/:name', (req, res, next) => {
    try{
        let item = Item.findItem(req.params.name)
        return res.json({item: item})
    }catch(err){
        return next(err)
    }
})

router.patch('/:name', (req, res, next) => {
    try{
        let item = Item.updateItem(req.params.name)
        return res.json({item: item})
    }catch(err){
        return next(err)
    }
})

router.delete('/:name', (req, res, next) => {
    try{
        Item.delete(req.params.name)
        return res.json({msg: "Item deleted"})
    }catch(err){
        return next(err)
    }
})

module.exports = router;