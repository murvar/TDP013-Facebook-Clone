import jsSHA from 'jssha';

function hashMyPassword(password) {
    let hashObj = new jsSHA("SHA-512", "TEXT", {numRounds: 1});
    hashObj.update(password);
    let hash = hashObj.getHash("HEX");
    return(hash);
  }

  

  export async function login(username, password) { 
    let hashedPassword = hashMyPassword(password)

    const returnPromise = fetch('http://localhost:3000/login', {
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
            return(response.json())
        }
    })
    .then((data) => {

        return data.sessionID
    })
    .catch(err => {
        console.error('There has been a problem with your fetch operation:', err);
    });

    return returnPromise
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

export async function logout(sessionID) {

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

export async function friends(sessionID) { 

    const friendPromise = fetch('http://localhost:3000/friends', {
        method: 'POST', 
        headers : {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({"sessionID" : sessionID})
    })
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            return(data.friends)
        })
        .catch(err => {
            console.error('There has been a problem with your fetch operation:', err);
        });
    
    return friendPromise
}

export async function wall(userID, sessionID) { 
    const wallPromise = fetch('http://localhost:3000/friends/' + userID, {
        method: 'POST', 
        headers : {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({"sessionID" : sessionID})
    })
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            return(data.wall)
        })
        .catch(err => {
            console.error('There has been a problem with your fetch operation:', err);
        });
    return wallPromise
}

export async function homeWall(sessionID) { 

    const homeWallPromise = fetch('http://localhost:3000/', {
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
    return homeWallPromise
}

export async function search(searchValue) { 

    const searchPromise = fetch('http://localhost:3000/search/' + searchValue, {
        method: 'GET', 
        headers : {
            'Content-Type': 'application/json'
        }
    })
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            return(data)
        })
        .catch(err => {
            console.error('There has been a problem with your fetch operation:', err);
        });
    return searchPromise
}

export async function toggleFriendRequest(userID, sessionID) {

    const TFRPromise = fetch('http://localhost:3000/request/' + userID, {
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
    return TFRPromise
}


export async function answerFriendRequest(userID, sessionID, answer) {
    //AFR = AnswerFriendRequest
    const AFRPromise = fetch('http://localhost:3000/requests/', {
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
    return AFRPromise
}

export async function getMyRequests(sessionID) {
    const AFRPromise = fetch('http://localhost:3000/getMyRequests/', {
        method: 'POST', 
        headers : {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({"sessionID" : sessionID})
    })
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            return(data.requests)
        })
        .catch(err => {
            console.error('There has been a problem with your fetch operation:', err);
        });
    return AFRPromise
}

export async function getMySentRequests(sessionID) {
    const AFRPromise = fetch('http://localhost:3000/getMySentRequests/', {
        method: 'POST', 
        headers : {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({"sessionID" : sessionID})
    })
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            return(data.invites)
        })
        .catch(err => {
            console.error('There has been a problem with your fetch operation:', err);
        });
    return AFRPromise
}

export async function postMsg(userID, sessionID, msg) { 

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
                console.log("Posting msg on " + userID + "´s wall")
                return(response.msg) 
            }
        })
        .catch(err => {
            console.error('There has been a problem with your fetch operation:', err);
        });
}

export function getCookie() {
    let name = "sessionID=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

//module.export = serverFetch; 