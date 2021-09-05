let msg_counter = 0

function init() {
    console.log("Init")
    //console.log(getCookies()[0])
    if (getCookies()[0] == "") {
        msg_counter = 0
    }
    else {
        msg_counter = document.cookie.split(';').length
        displayMessages()
    }
    
    //document.cookie = "foo=ettttst"
    //console.log(document.cookie)
    console.log(document.getElementById('submit_btn'))
    document.getElementById("submit_btn").addEventListener("click", getMessage)
}


function getMessage() {
    console.log("getMessage")

    let message = document.getElementById('text_box').value
    document.getElementById('text_box').value = ""
    

    if (message.length <= 0 || message.length > 140) {
        //document.getElementById('error_p_tag').value = "error, please write a message of max 140 characters"
        console.log("faulty msg")
    } else {
        msg_counter++
        console.log("msg_counter increased with 1 and has a value of " + msg_counter)
        setCookie("msg" + msg_counter + "=" + message)
        createMsgTag("msg" + msg_counter + "=" + message)
    }

    console.log("Current cookies = " + document.cookies)

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
    div.classList.add("col-md-10")
    
    para.appendChild(node);

    const element = document.getElementById("div1");
    para.classList.add("col-md-6")
    checkbox.classList.add("col-md-12")
    div.appendChild(para);
    div.appendChild(checkbox)
    element.appendChild(div)
}


function getCookies() {
    let messages = document.cookie.split(';');
    return messages.reverse()
}



function setCookie(value) {
    /*if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days2460601000));
        expires = "; expires=" + date.toUTCString();
    }*/
    console.log("Added cookie with values : " + value)
    document.cookie = value;
}



window.onload = function() {
    init();
}