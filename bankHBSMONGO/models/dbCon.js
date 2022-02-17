const {MongoClient} = require('mongodb')

const con = (cb) => {
    MongoClient.connect('mongodb://127.0.0.1:27017', {}, (err, client)=> {
        if(err) return cb(err, false, false)
        const database = client.db('bank')
        cb(false, client, database)
    })
}

module.exports = con