const arr = [
    {
        val1:1
    },
    {
        val1:2
    },
    {
        val1:3
    }
]

const out = arr.find( (element) => {
    if(element.val1 === 2)
    {
        return element
    }
} )

if(out){
    console.log("undef")
}

console.log(out)