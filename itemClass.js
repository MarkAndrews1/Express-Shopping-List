const items = require('./fakeDb')
const ExpressError = require('./expressError')

class Item{
    constructor(name, price){
        this.name = name
        this.price = price

        items.push(this)
    }

    static listAll(){
        return items
    }

    static findItem(name){
        let item = items.find(i => i.name === name)

        if(item === undefined){
            return new ExpressError("Item not found", 404)
        } else{
            return item
        }
    }

    static updateItem(name, data){
        let item = this.findItem(name)

        if(item === undefined){
            return new ExpressError("Item not found", 404)
        } else{
            item.name = data.name
            item.price = data.price
            
            return item
        }
    }

    static delete(name){
        let item = this.findItem(name)

        if(item === undefined){
            return new ExpressError("Item not found", 404)
        } else{
            items.splice(item, 1)
        }
    }
}

module.exports = Item;