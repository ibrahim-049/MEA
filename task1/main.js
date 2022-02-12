const addCust = document.querySelector("#addCust")
const userHeads = ["custName", "initBalance"]
const transactionHeads = ["transType", "amount"]
const customersTable = document.querySelector("#customersTable")
const addTransaction = document.querySelector("#addTransaction")
const transactionTypes = ["withdraw", "deposit"]
const singleCustomer = document.querySelector("#singleCustomer")

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

const drawTransactionTypes = (transactionTypes)=>{
    transactionTypes.forEach(transactionType => {
        createMyFullElement("option", document.querySelector("#transactionType"), transactionType, null, [{ key: "value", value: transactionType }])
    })
}

if(addTransaction)
{
    
    drawTransactionTypes(transactionTypes)
}

const showCustomer = (user) => {
    writeDataLocalStorage("user", user)
    window.location.href = "Customer.html"
}

if(customersTable) {
    customersTable.textContent = ""
    const users = readDataLocalStorage("users")
    if (users.length == 0)
    {
        const tr = createMyFullElement("tr", customersTable, null, "alert alert-danger", [])
        createMyFullElement("td", tr, "No users!", "text-center", [{ key: "colspan", value: 6 }])
    }
    users.forEach((user) => {
        const tr = createMyFullElement("tr", customersTable, null, null, [])
        createMyFullElement("td", tr, user.id, null, [])
        createMyFullElement("td", tr, user.custName, null, [])
        const controlTableData = createMyFullElement("td", tr, null, null, [])
        const showBtn = createMyFullElement("button", controlTableData, "Show", "btn btn-success mx-3", [])
        
        showBtn.addEventListener("click", () => showCustomer(user) )
        const transBtn = createMyFullElement("button", controlTableData, "Add Transaction", "btn btn-success mx-3", [])

        transBtn.addEventListener("click",  () => {
            writeDataLocalStorage("user", user)
            window.location.href="addTransaction.html"
            
        })

        const delBtn = createMyFullElement("button", controlTableData, "Delete", "btn btn-danger mx-3", [
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

if(addTransaction)
{
    
    const users = readDataLocalStorage("users")
    const user = readDataLocalStorage("user")
    const userTransactions = {
        id: user.id
    }

    addTransaction.addEventListener("submit", (e)=> {
                e.preventDefault()
                transactionHeads.forEach(element => {
                    

                    userTransactions[element] = addTransaction.elements[element].value
                });

                users.forEach( (element) => {
                    if(element.id === user.id)
                    {
                        if(userTransactions.transType === "deposit"){
                            element.initBalance = parseInt(element.initBalance) + parseInt(userTransactions.amount)
                        }
                        else{
                            element.initBalance = parseInt(element.initBalance) - parseInt(userTransactions.amount)
                        }
                    }
                })

                // writeDataLocalStorage("userTransactions", userTransactions)
                writeDataLocalStorage("users", users)

                let allTransactions = readDataLocalStorage("allTransactions")
                if(Array.isArray(allTransactions)) {
                    allTransactions.push(userTransactions)
                    writeDataLocalStorage("allTransactions", allTransactions)
                }
                else{
                    allTransactions = []
                    allTransactions.push(userTransactions)
                    writeDataLocalStorage("allTransactions", allTransactions)
                }
                window.location.href = "index.html"
            })
}

if(singleCustomer)
{
    const user = readDataLocalStorage("user")
    const allTransactions = readDataLocalStorage("allTransactions")
    const userTransactions = []
    allTransactions.forEach( (element) => {
        if(element.id === user.id)
        {
            userTransactions.push(element)
        }
    })
    singleCustomer.innerHTML = `
    <div class="col-md-12 col-12 border border-3 border-primary" id="singelCustomerTable">
                <h5>Account Number</h5>
                <p>${user.id}</p>
            </div>
            <div class="col-md-12 col-12 border border-3 border-primary">
                <h5>Name</h5>
                <p>${user.custName}</p>
            </div>
            <div class="col-md-12 col-12 border border-3 border-primary">
                <h5>Balance</h5>
                <p>${user.initBalance}</p>
            </div>

    `
    const singelCustomerTable = document.querySelector("#singelCustomerTable")
    // console.log(singelCustomerTable)
    // let tr = document.createElement("tr")
    // singleCustomer.appendChild(tr)
    userTransactions.forEach((element) => {
        let div1 = createMyFullElement("div", singelCustomerTable, null, "col-md-6 col-12 border border-3 border-primary",[])
        createMyFullElement("h5", div1, "Transaction Type", null, [])
        createMyFullElement("p", div1, element.transType, null, [])

        let div2 = createMyFullElement("div", singelCustomerTable, null, "col-md-6 col-12 border border-3 border-primary",[])
        createMyFullElement("h5", div2, "Amount", null, [])
        createMyFullElement("p", div2, element.amount, null, [])

    })
}




// transactionHeads.forEach( (transaction) => {
//     element[transaction] = userTransactions[transaction]
// })


{/* <div class="col-md-6 col-12 border border-3 border-primary">
<h5>Transaction Type</h5>
<p>${userTransactions[0].transType}</p>
</div>

<div class="col-md-6 col-12 border border-3 border-primary">
<h5>Amount</h5>
<p>$${userTransactions[0].amount}</p>
</div> */}



