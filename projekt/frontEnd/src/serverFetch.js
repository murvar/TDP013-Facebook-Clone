import jsSHA from 'jssha';

export function login(username, password) {
    let hashedPassword = hashMyPassword(password)
    console.log("in server fetch with data username: " + username + " and pw : " + hashedPassword)
    fetch('http://localhost:3000/login', {
        method: 'POST', 
        headers : {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({username: username, password: hashedPassword})
    })
        // .then((response) => {
        //     if (!response.ok) {
        //         throw new Error('Network response was not ok');
        //     }
        //     else {
        //         console.log("Signing in with ID: " + response.body)
        //         response.text().then((res) => console.log(res))
        //         return(await response.json().sessionID)
        //     }
        // })
        .then(response => response.json())
        .then(data => data.sessionID)
        .catch(err => {
            console.error('There has been a problem with your fetch operation:', err);
        });
}

function hashMyPassword(password) {
    let hashObj = new jsSHA("SHA-512", "TEXT", {numRounds: 1});
    hashObj.update(password);
    let hash = hashObj.getHash("HEX");
    return(hash);
  }


export async function registerFetch(username, password) { 
    let hashedPassword = hashMyPassword(password)

    fetch('http://localhost:3000/register', {
        method: 'POST', 
        headers : {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({"username": username, "password" : hashedPassword})
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            else {
                console.log("Registrating account")
                return(true)
            }
        })
        .catch(err => {
            console.error('There has been a problem with your fetch operation:', err);
        });
}

async function logout(sessionID) {

    fetch('http://localhost:3000/logout', {
        method: 'PATCH', 
        headers : {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({sessionID: sessionID})
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            else {
                console.log("Signing out")
                return(true)
            }
        })
        .catch(err => {
            console.error('There has been a problem with your fetch operation:', err);
        });
}

async function friends(sessionID) { 

    fetch('http://localhost:3000/friends', {
        method: 'POST', 
        headers : {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({"sessionID" : sessionID})
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            else {
                console.log("Fetching friend list")
                return(response.friends)
            }
        })
        .catch(err => {
            console.error('There has been a problem with your fetch operation:', err);
        });
}

export async function wall(userID, sessionID) { 
    console.log(userID)
    console.log(sessionID)
    fetch('http://localhost:3000/friends/' + userID, {
        method: 'POST', 
        headers : {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({sessionID : sessionID})
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            else {
                console.log("Fetching " + userID + "´s wall")
                // console.dir(response.json())
                response.json().then(data => {
                    return data
                })
                //return response.json()
            }
        })
        .catch(err => {
            console.error('There has been a problem with your fetch operation:', err);
        });
}

export async function homeWall(sessionID) { 

    fetch('http://localhost:3000/', {
        method: 'POST', 
        headers : {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({"sessionID" : sessionID})
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            else {
                console.log("Fetching " + response.userID + "´s wall")
                return(response.wall, response.userID)
            }
        })
        .catch(err => {
            console.error('There has been a problem with your fetch operation:', err);
        });
}

async function search(userID, sessionID) { 

    fetch('http://localhost:3000/search/' + userID, {
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
                console.log("searching for " + userID)
                return(response.userList)
            }
        })
        .catch(err => {
            console.error('There has been a problem with your fetch operation:', err);
        });
}

async function toggleFriendRequest(userID, sessionID) {

    fetch('http://localhost:3000/request/' + userID, {
        method: 'PATCH', 
        headers : {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({"userID" : userID, "sessionID" : sessionID})
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            else {
                console.log("Toggled friend request from " + userID)
                return(true)
            }
        })
        .catch(err => {
            console.error('There has been a problem with your fetch operation:', err);
        });
}


async function answerFriendRequest(userID, sessionID, answer) {

    fetch('http://localhost:3000/requests/', {
        method: 'PATCH', 
        headers : {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({"userID" : userID, "sessionID" : sessionID, "answer" : answer})
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            else {
                if (answer) {
                    console.log("Answered friend request from " + userID + + " with yes")
                }
                else {
                    console.log("Answered friend request from " + userID + + " with no") 
                }
                return(true)
            }
        })
        .catch(err => {
            console.error('There has been a problem with your fetch operation:', err);
        });
}

export async function postMsg(userID, sessionID, msg) { 

    console.log(userID)
    console.log(sessionID)
    console.log(msg)
    fetch('http://localhost:3000/addMsg/' + userID, {
        method: 'POST',
        headers : {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({userID: userID, sessionID: sessionID, msg: msg})
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            else {
                console.log("Posting msg on " + response.userID + "´s wall")
                return(response.msg) 
            }
        })
        .catch(err => {
            console.error('There has been a problem with your fetch operation:', err);
        });
}

//module.export = serverFetch; 