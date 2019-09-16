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
    
    fetch("http://localhost:2403/account", {
        method: 'POST',
        body: data, 
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      .then(response => console.log('Success:', JSON.stringify(response)))
      .catch(error => console.error('Error:', error));



}

function onRead() {

    fetch('http://localhost:2403/account', {
        headers:{
            'Content-Type': 'application/json'
        }
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(account) {
        var resultTBody = document.createElement('tbody');
        account.map(function(nthAccount){
            resultTBody.appendChild(parseAccountToTableRow(nthAccount));
        });

        var table = document.getElementById('rTBody').parentElement;
        table.replaceChild(resultTBody, document.getElementById('rTBody'));
        resultTBody.id = 'rTBody';
        console.log('success');
    })
    .catch(error=>console.error('Error:',error));

}

function onPrepareUpdate(ev){

    ev.preventDefault();
    fetch('http://localhost:2403/account', {
        headers:{
            'Content-Type': 'application/json'
        }
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(account) {
        var ids=document.createElement('select');
        ids.className='form-control';
        account.map(function(nthAccount){
            var id=document.createElement('option');
            id.innerHTML=nthAccount['id'];
            ids.appendChild(id);
        });
        var form=document.getElementById('uid').parentElement;
        form.replaceChild(ids,document.getElementById('uid'));
        ids.id='uid';
    })
    .catch(error=>console.error('Error:',error));
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

    fetch("http://localhost:2403/account/" + document.getElementById("uid").value, {
        method: 'PUT', 
        body: data, 
        headers:{
          'Content-Type': 'application/json'
        }
    }).then(res => res.json())
    .then(response => console.log('Success:', JSON.stringify(response)))
    .catch(error => console.error('Error:', error));
}

function onDelete(ev) {
    ev.preventDefault();

    fetch("http://localhost:2403/account/" + document.getElementById("did").value, {
        method: 'DELETE',
        headers:{
          'Content-Type': 'application/json'
        }
    }).then(res => res.json())
    .then(response => console.log('Success:', JSON.stringify(response)))
    .catch(error => console.error('Error:', error));
}

function parseAccountToTableRow(Accounts){
    var row=document.createElement('tr');

    id=document.createElement('td');
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
  
    document.getElementById('cbutton').addEventListener('click', onCreate);
    document.getElementById('rbutton').addEventListener('click', onRead);
    document.getElementById('ubutton').addEventListener('click', onUpdate);
    document.getElementById('pubutton').addEventListener('click', onPrepareUpdate);
    document.getElementById('dbutton').addEventListener('click', onDelete);
    console.log('Handlers is set')
})()