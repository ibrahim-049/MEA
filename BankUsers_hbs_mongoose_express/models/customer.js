const mongoose = require('mongoose')
// customers => accNum, name, balance(in single not all custs page), transactions
const customer = mongoose.model('customer', {
    name:{
        type:String,
        trim:true,
        minLength:2,
        maxLength:20,
        required:true
    },
    password:{
        type:String,
        required:true,
        trim:true,
        
        validate(value){
            if( value.includes( this.name ) )
                throw new Error("You can't use your name in the password")
        }
    },
    balance:{
        type:Number,
        default:0,
    },
    transactions:[
        {
            t:{
                type:{
                    type:String,
                    enum:["withdraw", "deposit"],
                    required:true
                },
                amount:{
                    type:Number,
                    required:true
                }
            }
        }
    ]
})

module.exports = customer