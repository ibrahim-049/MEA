const addCust = document.querySelector("#addCust")
const userHeads = ["custName", "initBalance"]
const customersTable = document.querySelector("#customersTable")

// <tr>
//                         <td>1</td>        id
//                         <td>Ibrahim</td>   custName
//                         <td>
//                             <a href="Customer.html" class="btn btn-success mx-3">Show</a>
//                             <a href="addTransaction.html" class="btn btn-success mx-3">Add Transaction</a>
//                             <button id="delete" class="btn btn-danger mx-3">Delete</a>
//                         </td>
//                     </tr>

const readDataLocalStorage = (key) => {
    try {
        return JSON.parse(localStorage.getItem(key))
    }
    catch(e){
        console.log(e.message)
    }
}

const writeDataLocalStorage = (key, data) => {
    
    localStorage.setItem(key, JSON.stringify(data))
}

const createMyFullElement = (name, parent, value = null, classes = null, attributes = []) => {
    const myElement = document.createElement(name)
    parent.appendChild(myElement)
    if(value)   myElement.textContent = value
    if(classes) myElement.classList = classes
    attributes.forEach((att) => {
        myElement.setAttribute(att.key, att.value)
    })
    return myElement
}




if(customersTable) {
    const users = readDataLocalStorage("users")

    users.forEach((user) => {
        const tr = createMyFullElement("tr", customersTable, null, null, [])
        createMyFullElement("td", tr, user.id, null, [])
        createMyFullElement("td", tr, user.custName, null, [])
        const controlTableData = createMyFullElement("td", tr, null, null, [])
        createMyFullElement("a", controlTableData, "Show", "btn btn-success mx-3", [])
        createMyFullElement("a", controlTableData, "Add Transaction", "btn btn-success mx-3", [])
        createMyFullElement("button", controlTableData, "Delete", "btn btn-danger mx-3", [
            {
                key:"id",
                value: "delete"
            }
        ])
        
    })
    
}



if(addCust) {
    addCust.addEventListener("submit", (e)=> {
        e.preventDefault()
        const user = {
            id: Date.now()
        }
        userHeads.forEach(element => {
            user[element] = addCust.elements[element].value
        });
        let users = readDataLocalStorage("users")
        if(Array.isArray(users)) {
            users.push(user)
            writeDataLocalStorage("users", users)
        }
        else{
            users = []
            users.push(user)
            writeDataLocalStorage("users", users)
        }
        window.location.href = "index.html"
    })
}













