const fs = require('fs')

const readJSONData = (filename) => {
    let data
    try
    {
        data = JSON.parse(fs.readFileSync(filename))
    }
    catch(e){
        data = []
    }

    return data
}

const writeJSONData = (filename, data) => {
    try{
        if(!Array.isArray(data)) throw new Error("data entered not an array")
        fs.writeFileSync(filename, JSON.stringify(data))
    }
    catch(e){
        console.log(err.message)
    }
}

module.exports = {
    writeJSONData,
    readJSONData
}