let msg_counter = 0

function init() {
    console.log("Init")
    if (getCookies()[0] == "") {
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
        setCookie("msg" + msg_counter + "=" + message)
        createMsgTag("msg" + msg_counter + "=" + message)
    }

    console.log("Current cookies = " + document.cookies)

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
    console.log(cookiearray)
    for (index in cookiearray) {
        createMsgTag(cookiearray[index])
    }
}

function createMsgTag(message) {
    let index = message.indexOf("=") 
    const checkbox = document.createElement("input")
    checkbox.type = "checkbox";
    checkbox.name = message.substring(0,index-1)  //checkbox tar meddelandets namn
    message = message.substr(index+1) //extrahera enbart meddelandet ur message
    console.log("Create msg tag message is = " + message)
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
    let messages = document.cookie.split(';');
    return messages
}



function setCookie(value) {
    console.log("Added cookie with values : " + value)
    document.cookie = value;
}



window.onload = function() {
    init();
}