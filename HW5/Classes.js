class Accaunt {
    constructor(balance, userName, typeUser) {
        //properties
        this._numberID = String(Math.floor(Math.random() * (10000000- 1000000) + 1000000));
        this._typeContibution = "dollars";        
        this._pin =String(Math.floor(Math.random() * (10000 - 1000) + 1000));
        this._balance = balance;
        this._dateCreate = new Date().toLocaleDateString();
        this._userName = userName;
        this._typeUser = typeUser;
        Accaunt.count += 1;
        console.log('Create account');
    }
    get numberID() {
        return this._numberID;        
    }
    get typeContibution() {
        return this._typeContibution;
    } 

    set typeContibution(value) {
        switch (value)
        {
            case 1: this._typeContibution = 'dollars';
                break;
            case 2: this._typeContibution = 'euro';
                break;
            case 3: this._typeContibution = 'byn';
                break;
            case 4: this._typeContibution = 'yen';
                break;
            default: this._typeContibution = 'rub';
        }
    }
    
    get pin() {
        return this._pin;
    }

    set pin(pin) {
        this._pin = pin;
    }

    get typeUser() {
        return this._typeUser;
    }

    set typeUser(typeUser) {
        this._typeUser = typeUser;
    }

    get dateCreate() {
        let str = "Date of account creation: " + this._dateCreate;
        return str;
    }

    get userName() {
        return this._userName;
    } 

    get balance() {
        return this._balance;
    } 

    static getCountAcc() {
        console.log('Amount of accounts:', Accaunt.count);        
    }
}


class SavingAccount extends Accaunt {
    constructor(procent){
        super();
        this._procent = procent;
    }

    get procent() {
        return this._procent;
    }

    set procent(value) {
        this._procent = value;
    }
}


class CurrentAccount extends Accaunt {
    withdrawMoney(summ) {
        if( this._balance - summ > 0 && summ > 0){
            this._balance = this._balance - summ;
            console.log('Your current balance is after withdraw money: ' + this._balance + ' ' + this._typeContibution);
        }else{
            console.log('Sorry, your cannot withdraw from the card ' + summ + ' ' + this._typeContibution);
        }      
    }

    AddMoney(summ) {
        if( summ > 0 ) {
            if(!this._balance)
                this._balance = 0;
            this._balance = this._balance + summ;
            console.log('Your current balance after add money is: ' + this._balance + ' ' + this._typeContibution);
        } else{
            console.log('Sorry, your cannot add at the card ' + summ + ' ' + this._typeContibution);
        }  
    }
}

Accaunt.count = 0; 

let acc =  new Accaunt( 200, 'Steven', 'new');
let acc2 =  new Accaunt(250, 'Sofi', 'new');

Accaunt.getCountAcc();
console.log(acc);
acc2.typeContibution = 2;
console.log(acc2);

console.log('--------------------');
console.log('--------------------');

let savAcc = new SavingAccount(12);
console.log(savAcc);
SavingAccount.getCountAcc();

console.log('--------------------');
console.log('--------------------');

let curAcc = new CurrentAccount(4, 2235, 30, 'Sad', 2);
console.log('Balance '+curAcc.balance);
curAcc.AddMoney(20);
curAcc.withdrawMoney(10);
console.log(curAcc);

CurrentAccount.getCountAcc();