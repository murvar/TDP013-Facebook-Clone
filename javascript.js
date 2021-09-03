let msg_counter = 0

function init() {
    console.log("Init")
    //console.log(getCookies())
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
    

    if (message.length <= 0 || message.length > 140) {
        //gör felmeddelande
        //window.alert("Faulty message")
        
    } else {
        msg_counter++
        //Lägg till text i cookie
        //document.cookie = "message = " + message + ";"
        setCookie("msg" + msg_counter + "=" + message)
    }


    //Displaya nytt meddelande på hemsidan

}

function displayMessages() {
    let cookiearray = getCookies()
    for (message in cookiearray) {
        createMsgTag(message)
    }
}

function createMsgTag(msg) {
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
    document.cookie = value;
}



window.onload = function() {
    init();
}