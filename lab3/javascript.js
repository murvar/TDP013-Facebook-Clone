
//-----------------------------------------------------------------------
//-----funktioner för lab 3----------------------------------------------
//-----------------------------------------------------------------------

function newinit(){ //Hämta alla meddelanden

    getMessages()
    document.getElementById("submit_btn").addEventListener("click", postMessage)
}

async function publishMessage() {
    //Kom ihåg att lägga till funktionalitet som ser till att hämta
    //getMessage efter postMessage
    postMessage()
    // await postMessage()
}

//Hette innan newGetMessage (just a reminder for future development)
async function postMessage() { //Lägg till meddelande i databas

    let message = document.getElementById('text_box').value
    document.getElementById('text_box').value = ""
    let msgbody = newcreateCustomObject(message, Date(), false)
    //newremoveErrorMsg()
    fetch('http://localhost:8888/messages', {
        method: 'POST', 
        headers : {
            'Content-Type': 'application/json'
        },
        body : msgbody
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            else {
                console.log("getting message")
                getMessage(JSON.parse(msgbody).id);
            }
        })
        .catch(err => {
            console.error('There has been a problem with your fetch operation:', err);
        });
    

    //KÖR AJAX ANROP HÄR MED POST!!!!
        //KÖR AJAX ANROP HÄR MED POST!!!!
        // CreateMsgTag som del av ajax anrop
        // Ha även med display error msg här om något går fel
}


function getMessage(id) { //hämta ett meddelande
    //HÄMTA MEDDELANDE MED GET!!!!
    //HÄMTA MEDDELANDE MED GET!!!!
    fetch('http://localhost:8888/messages/' + id, {
        method: 'GET', 
        headers : {
            'Content-Type': 'application/json'
        }
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            else {
                response.text().then(function(result) {
                    //console.log(result)
                    newcreateMsgTag(result)
                })
            }
        })
        .catch(err => {
            console.error('There has been a problem with your fetch operation:', err);
        });
}


function newdisplayErrorMsg() {
    let para = document.createElement("p")
    let node = document.createTextNode("Skriv ett meddelande som är minst 1 och max 140 karaktärer")
    let element = document.getElementById("error_msg")
    para.appendChild(node)
    element.append(para)
}

function newremoveErrorMsg() {
    let element = document.getElementById("error_msg")
    if(element.firstChild) {
        element.removeChild(element.firstChild)
    }
}

async function getMessages() {
    //Anropa funktion som returnerar array av messages i backend,
    //Sorta baserat på tid
    //Kör loop och lägg upp
    //let cookiearray = await newgetAllMessages()
    fetch('http://localhost:8888/messages/', {
        method: 'GET', 
        headers : {
            'Content-Type': 'application/json'
        }
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            else {
                response.text().then(function(result) {
                    data = JSON.parse(result)
                    console.log(data)
                    data.sort(function newcompareFN(a, b){
                        if (new Date(a.id).getTime() < new Date(b.id).getTime()) {
                            console.log("a.id is " + a.id);
                            console.log("b.id is " + b.id);
                            console.log("---------");

                            
                            return -1
                        }
                        else {return 1}
                    })
                    for (index in data) {
                        newcreateMsgTag(data[index])
                    }
                })
            }
        })
        .catch(err => {
            console.error('There has been a problem with your fetch operation:', err);
        });
}

function newcreateMsgTag(msg) {

    // SE TILL ATT HA RÄTT NAMN PÅ ALLT NAMN RELATERAT
    // ÄNDRA INFORmATION I newsetCookie
    if (typeof msg == "string") {
        msg = JSON.parse(msg)
    }

    const checkbox = document.createElement("input")
    checkbox.type = "checkbox";
    if (msg.state == true) {
        checkbox.checked = true
    }

    checkbox.name = msg.id  //checkbox tar meddelandets namn
    checkbox.addEventListener("change", function() {
        console.log("changed checkbox state = " + checkbox.checked)
        patchMessage(msg)
    })

    const para = document.createElement("p")
    const node = document.createTextNode(msg.msg)
    let div = document.createElement("div")
    div.classList.add("div2")
    div.classList.add("col-md-8")
    div.classList.add("row")
    
    para.appendChild(node);

    const element = document.getElementById("div1");
    para.classList.add("col-md-8")
    let div2 = document.createElement("div")
    div2.classList.add("col-md-2")
    checkbox.classList.add("col-md-4")
    checkbox.classList.add("pull-right")
    div.appendChild(para);
    div.appendChild(div2)
    div.appendChild(checkbox)
    element.prepend(div)
}


function newgetAllMessages() {

    //AJAX HÄMNTNING FÖR ALLA MEDDELANDEN
    fetch('http://localhost:8888/messages/', {
        method: 'GET', 
        headers : {
            'Content-Type': 'application/json'
        }
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            else {
                response.text().then(function(result) {
                    console.log(JSON.parse(result))
                    return(JSON.parse(result))
                })
            }
        })
        .catch(err => {
            console.error('There has been a problem with your fetch operation:', err);
        });
}


function patchMessage(msg) {
    // KÖR PATCH FÖR ATT ÄNDRA STATE PÅ MEDDELANDE MED ID
    //console.log("Added cookie with message: " + customObject.message + ", index: " + customObject.index + " and state: " + customObject.state)
    if (typeof msg == "string") {
        msg = JSON.parse(msg)
    }
    console.log(msg)
    console.log("msg id = " + msg.id)
    fetch('http://localhost:8888/messages/' + msg.id, {
        method: 'PATCH'
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        })
        .catch(err => {
            console.error('There has been a problem with your fetch operation:', err);
        });
}


function newcreateCustomObject(msg, id, state) {
    let ourJSON = JSON.stringify({"msg" : msg, "id" : id, "state" : state})
    let customObject = {};
    customObject.msg = msg;
    customObject.id = id
    customObject.state = state
    console.log("CUSTOM OBJEcT IS AS FOLLOWS:")
    console.log(ourJSON)
    return JSON.stringify(customObject)
}


window.onload = function() {
    newinit();
}