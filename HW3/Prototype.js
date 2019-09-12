var Account = function(numbserID, typeContibution, pin, balance, userName, typeUser) 
{
    this.numbserID = numbserID;
    this.typeContibution = typeContibution;
    this.pin = pin;
    this.balance = balance;
    this.dateCreate = new Date().toLocaleDateString();
    this.userName = userName;
    this.typeUser = typeUser;


    

    ///////////////////////////////////
    this.getNumberID = function () {
        return this.numbserID;
    }

    ////////////////////////////////////
    this.getTypeContibution = function () {
        return this.typeContibution;
    }

    this.setTypeContibution = function (newtypeContibution) {
        switch (newtypeContibution)
        {
            case 1: this.typeContibution = "dollars";
                break;
            case 2: this.typeContibution = "euro";
                break;
            default: this.typeContibution = "rub";
        }
    }

    ////////////////////////////////////
    this.getPin = function () {
        return this.pin;
    }

    this.setPin = function (pin) {
        this.pin = pin;
    }

    ////////////////////////////////////
    this.getTypeUser = function () {
        return this.typeUser;
    }

    this.setTypeUser = function (typeUser) {
        this.typeUser = typeUser;
    }

    ////////////////////////////////////
    this.getDateCreate = function() {
        let str = "Date of account creation: " + this.dateCreate;
        return str;
    }

    /////////////////////////////////////
    this.getUserName = function () {
        return this.userName;
    } 

    /////////////////////////////////////
    this.getBalance = function () {
        return this.balance;
    } 
}

Account.prototype.setUserName = function(newUserName) {
    if(!newUserName.isEmpty) {
        this.userName = newUserName;
    } else {
        console.log("Sorry, your user already exist in our system ");
    }
}


var SavingAccount = function (procent) {
    Account.apply(this, arguments);
    this.procent = procent;

    this.getProcent = function () {
        return this.procent;
    }

    this.setProcent = function(newProcent) {
        this.procent  = newProcent;
    }
}

var CurrenAccount =  function () {
    Account.apply(this, arguments);

    this.withdrawMoney = function (summ) {
        if( this.balance-summ > 0 && summ>0){
            this.balance= this.balance-summ;
        }else{
            console.log("Sorry, your cannot withdraw from the card " + summ+" "+ this.getTypeContibution());
        }      
    }

    this.AddMoney = function(summ) {
        if( summ>0 ){
            if(!this.balance)
                this.balance=0;
            this.balance= this.balance+summ;
        }else{
            console.log("Sorry, your cannot add at the card " + summ+" "+ this.getTypeContibution());
        }  
    }
}


SavingAccount.prototype = Object.create(Account.prototype);
CurrenAccount.prototype = Object.create(Account.prototype);

SavingAccount.prototype.constructor = SavingAccount;
CurrenAccount.prototype.constructor = CurrenAccount;


SavingAccount.prototype.setProcent = function(balance) {
    this.procent = balance * 0.2 + balance;
}


var account =  new Account(1, 1, 1122, 30,  "Fill", "active");
var savingAcc =  new SavingAccount(15);
var currenAcc = new CurrenAccount();



account.setUserName("David");
console.log(account);
console.log(account.getNumberID());
console.log(account.getDateCreate());
console.log(account.getTypeContibution());


savingAcc.setUserName("Sam");
savingAcc.setPin(4353);
savingAcc.setTypeContibution(1);
console.log(savingAcc);


currenAcc.setTypeContibution(1);
currenAcc.setUserName("John");
currenAcc.AddMoney(20);
console.log(currenAcc.getBalance());
currenAcc.withdrawMoney(10);
console.log(currenAcc.getBalance());

