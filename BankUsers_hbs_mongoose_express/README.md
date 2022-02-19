--------------- Notes about system --------------------
the add transaction function will check if you have enough balance if you are withdrawing and will refuse transaction if you dont have enough balance
balance is updated upon depositing or withdrawing










bank 
- customers => accNum, name, balance(in single not all custs page), transactions
==> add customers
==> show all customers
==> show single customer
==> add transaction to customer => select (withdraw, addBalance), input(balance)
user => {                                      // in single cust page
    accNum: random, 
    name:",
    balance:100,
    transactions:[                                    // array of objects of transactions done 
        {transactionType:"withdraw", balance:50}, 
        .....
    ]    
}


show                        add trans                                    delete

gadwal lel custo     select(with, addBaln), input(balance)
