function onCreate(ev) {
    ev.preventDefault();
   
   
    var data = JSON.stringify({
        "userName": String(document.getElementById("userName").value),
        "typeContibution": String(document.getElementById("typeContibution").value),
        "depositAmount": String(document.getElementById("depositAmount").value),
        "typeUser": String(document.getElementById("typeUser").value),
        "pin": String(Math.floor(Math.random() * (10000 - 1000) + 1000)),
        "dateCreate": String(new Date().toLocaleDateString())
    });
    console.log(data);
    xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            alert(this.responseText);
            document.getElementById("createForm").dispatchEvent(new Event('submit'));
        } 
    });

    xhr.open("POST", "http://localhost:2403/account");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
}

function onRead() {
    xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {

            result=JSON.parse(this.response);
            console.log(result);
            var resultTBody=document.createElement('tbody');
            result.map(function(nthAccount){
                resultTBody.appendChild(parseAccountToTableRow(nthAccount));
            });

            var table=document.getElementById('rTBody').parentElement;
            table.replaceChild(resultTBody,document.getElementById('rTBody'));
            resultTBody.id='rTBody';
            console.log('success');
        }
    });

    xhr.open("GET", "http://localhost:2403/account");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
}

function onPrepareUpdate(ev){

    ev.preventDefault();
    xhrids = new XMLHttpRequest();
    xhrids.withCredentials = true;

    xhrids.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            result=JSON.parse(this.response);
            var ids=document.createElement('select');
            ids.className='form-control';
            result.map(function(nthAccount){
                var id=document.createElement('option');
                id.innerHTML=nthAccount['id'];
                ids.appendChild(id);
            });
            var form=document.getElementById('uid').parentElement;
            form.replaceChild(ids,document.getElementById('uid'));
            ids.id='uid';
        }
    });
    xhrids.open("GET", "http://localhost:2403/account/");
    xhrids.setRequestHeader("Content-Type", "application/json");
    xhrids.send();
}

function onUpdate(ev) {
    ev.preventDefault();

   
    var data =
     JSON.stringify({
         "userName": String(document.getElementById("userName1").value),
         "typeContibution": String(document.getElementById("typeContibution1").value),
         "depositAmount": String(document.getElementById("depositAmount1").value),
         "typeUser": String(document.getElementById("typeUser1").value)
     });
    console.log(data);
    xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
        }
    });

    xhr.open("PUT", "http://localhost:2403/account/"+document.getElementById("uid").value);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
}

function onDelete(ev) {
    ev.preventDefault();
     xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
        }
    });

    xhr.open("DELETE", "http://localhost:2403/account/"+document.getElementById("did").value);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
}

function parseAccountToTableRow(Accounts){
    var row=document.createElement('tr');

    id=document.createElement('th');
    id.innerText=Accounts['id'];
    row.appendChild(id);

    userName=document.createElement('td');
    userName.innerText=Accounts['userName'];
    row.appendChild(userName);

    typeContibution=document.createElement('td');
    typeContibution.innerText=Accounts['typeContibution'];
    row.appendChild(typeContibution);
   
    depositAmount=document.createElement('td');
    depositAmount.innerText=Accounts['depositAmount'];
    row.appendChild(depositAmount);
    
    typeUser=document.createElement('td');
    typeUser.innerText=Accounts['typeUser'];
    row.appendChild(typeUser);

    pin=document.createElement('td');
    pin.innerText=Accounts['pin'];
    row.appendChild(pin);

    dateCreate=document.createElement('td');
    dateCreate.innerText=Accounts['dateCreate'];
    row.appendChild(dateCreate);


    return row;
}


(function () {
  
    document.getElementById('cbutton').addEventListener(
        'click', onCreate
    );
    document.getElementById('rbutton').addEventListener(
        'click', onRead
    );
    document.getElementById('ubutton').addEventListener(
        'click', onUpdate
    );
    document.getElementById('pubutton').addEventListener(
        'click', onPrepareUpdate
    );
    document.getElementById('dbutton').addEventListener(
        'click', onDelete
    );
    console.log('Handlers is set')
})()