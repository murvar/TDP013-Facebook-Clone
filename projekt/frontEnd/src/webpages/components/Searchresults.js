import React from 'react'
import {useParams} from 'react-router-dom'
import {search, toggleFriendRequest, getCookie, friends, getMySentRequests} from './../../serverFetch'
import ResultComponent from './resultComponent';

export default function Searchresults() {

    const searchValue = useParams().searchValue
    let sessionID = getCookie("sessionID");

    const [searchArray, setSearchArray] = React.useState([]);
    const [friendsArray, setFriendArray] = React.useState([]);
    const [sentRequestsArray, setSentRequestsArray] = React.useState([]);
 
    
    React.useEffect (() => {
        search(searchValue)
        .then(res => {
            console.log("running useEffect for search")
            return res
        })
        .then(data => {
            setSearchArray(data)
        })
        
        friends(sessionID)
        .then(res => {
            console.log("running useEffect for friends")
            return res
        })
        .then(data => {
            setFriendArray(data)
        })

        /* IMPLEMENTERA RÄTT FUNKTIONSNAMN HÄR från SERVERFETCH  */

        /*
         const promise1 = new Promise((resolve, reject) => {
            resolve('Success!');
        });

        promise1.then((value) => {
            console.log(value);
            // expected output: "Success!"
        });
        */
        getMySentRequests(sessionID)
        .then((res) => {
            console.log("running useEffect for mySentRequests")
            console.log("result: ");
            console.log(res);
            setSentRequestsArray( res );
            console.log("done")
        })

        
        
    
    }, [])

    /*function render(){

        return (
            <div>
                <h2>Search Results:</h2>
                {searchArray && friendsArray && sentRequestsArray && searchArray.map((elem) => {
    
                    return ( <ResultComponent key={"resultComp"+ elem.userID} friendsArray={friendsArray} sentRequestsArray={sentRequestsArray} element={elem} sessionID={sessionID} />   
                    )                                       
                })
                }
            </div>
        )
    
    }*/

    
   return (
        <div>
            <h2>Search Results:</h2>
            {searchArray && friendsArray && sentRequestsArray && searchArray.map((elem) => {

                return ( <ResultComponent key={"resultComp"+ elem.userID} friendsArray={friendsArray} sentRequestsArray={sentRequestsArray} element={elem} sessionID={sessionID} />   
                )                                       
            })
            }
        </div>
    )
}



