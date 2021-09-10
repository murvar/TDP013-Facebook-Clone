let msg_counter = 0

function init() {
    console.log("Init")
    if (document.cookie == "") {
        msg_counter = 0
    }
    else {
        msg_counter = document.cookie.split(';').length
        displayMessages()
    }
    

    console.log(document.getElementById('submit_btn'))
    document.getElementById("submit_btn").addEventListener("click", getMessage)
}


function getMessage() {
    console.log("getMessage")

    let message = document.getElementById('text_box').value
    document.getElementById('text_box').value = ""
    removeErrorMsg()

    if (message.length <= 0 || message.length > 140) {
        displayErrorMsg()
    } else {
        msg_counter++
        console.log("msg_counter increased with 1 and has a value of " + msg_counter)
        setCookie(message, msg_counter, 0)
        createMsgTag(createCustomObject(message, msg_counter, 0))
    }

    //console.log("Current cookies = " + document.cookies)

}

function displayErrorMsg() {
    let para = document.createElement("p")
    let node = document.createTextNode("Skriv ett meddelande som är minst 1 och max 140 karaktärer")
    let element = document.getElementById("error_msg")
    para.appendChild(node)
    element.append(para)
}

function removeErrorMsg() {
    let element = document.getElementById("error_msg")
    if(element.firstChild) {
        element.removeChild(element.firstChild)
    }
}

function displayMessages() {
    let cookiearray = getCookies()
    cookiearray.sort(function compareFN(a, b){
        if (a.index < b.index) {
            return -1
        }
        else {return 1}
    })
    console.log("cookiearray = " + cookiearray)
    for (index in cookiearray) {
        createMsgTag(cookiearray[index])
    }
}

function createMsgTag(msg) {
    //let index = message.indexOf("=") 
    const checkbox = document.createElement("input")
    checkbox.type = "checkbox";
    if (msg.state == 1) {
        checkbox.checked = true
    }
    checkbox.name = msg.index  //checkbox tar meddelandets namn
    checkbox.addEventListener("change", function() {
        console.log("changed checkbox state = " + checkbox.checked)
        if (checkbox.checked) {
            setCookie(msg.message, msg.index, 1)
        }
        else {
            setCookie(msg.message, msg.index, 0)
        }
    })
    message = msg.message //extrahera enbart meddelandet ur message
    //console.log("Create msg tag message is = " + message)
    const para = document.createElement("p")
    const node = document.createTextNode(message)
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


function getCookies() {
    let data = document.cookie.split(';');
    console.log(data)
    let messages = []
    if (data[0] != "") {
        for (let i = 0; i < data.length; i++) {
            let nameValueArray = data[i].split("=")
            let customObject = JSON.parse(nameValueArray[1])
            messages.push(customObject)
        }
    }
    console.log(messages)
    return messages
}


function setCookie(value, index, state) {
    let customObject = createCustomObject(value, index, state)
    console.log("Added cookie with message: " + customObject.message + ", index: " + customObject.index + " and state: " + customObject.state)

    let jsonString = JSON.stringify(customObject);
    document.cookie = "cookieObject" + index + "=" + jsonString;
}

function editCookie(value, index, state) {

}


function createCustomObject(value, index, state) {
    let customObject = {};
    customObject.message = value;
    customObject.index = index
    customObject.state = state
    return customObject
}


window.onload = function() {
    init();
}