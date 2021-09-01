
function init() {
    console.log(document.getElementById('submit_btn'))
    document.getElementById("submit_btn").addEventListener("click", getText)
    document.getElementById("submit_bt").addEventListener("click", listCookies)
}


function getText() {

    let message = document.getElementById('text_box').value
    

    if (message.length <= 0 || text.length > 140) {
        //gör felmeddelande
        window.alert("Faulty message")
    } else {
        //Lägg till text i cookie
        document.cookie = "message = " + message + ";"
    }


    //Displaya nytt meddelande på hemsidan

}


function getCookies() {
    let messages = document.cookie.split(';');
    for(let i = 0; i < messages.length; i++) {
        //generera textrutor?
        window.alert(messages[i])
    }
}

function listCookies() {
    var theCookies = document.cookie.split(';');
    var aString = '';
    for (var i = 1 ; i <= theCookies.length; i++) {
        aString += i + ' ' + theCookies[i-1] + "\n";
    }
    window.alert(aString);
}

window.onload = function() {
    init();
}