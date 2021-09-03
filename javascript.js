let msg_counter = 0

function init() {
    console.log("Init")
    //console.log(getCookies()[0])
    if (getCookies()[0] == "") {
        msg_counter = 0
    }
    else {
        msg_counter = document.cookie.split(';').length
    }
    
    //document.cookie = "foo=ettttst"
    //console.log(document.cookie)
    console.log(document.getElementById('submit_btn'))
    document.getElementById("submit_btn").addEventListener("click", getMessage)
    //document.getElementById("submit_bt").addEventListener("click", window.alert(document.cookie))
    displayMessages()
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
    console.log("Create msg tag message is = " + message)
    const para = document.createElement("p")
    const node = document.createTextNode(message)
    para.appendChild(node);

    const element = document.getElementById("div1");
    element.appendChild(para);
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