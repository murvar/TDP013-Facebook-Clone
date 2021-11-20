import React from 'react'
import {useParams} from 'react-router-dom'
import {search, getCookie, friends, getMySentRequests} from './../../serverFetch'
import ResultComponent from './resultComponent';

export default function Searchresults() {

    const searchValue = useParams().searchValue
    let sessionID = getCookie("sessionID");

    const [searchArray, setSearchArray] = React.useState([]);
    const [friendsArray, setFriendArray] = React.useState([]);
    const [sentRequestsArray, setSentRequestsArray] = React.useState([]);


    const [flag1, setFlag1] = React.useState(false);
    const [flag2, setFlag2] = React.useState(false);
    const [flag3, setFlag3] = React.useState(false);
    
    React.useEffect (() => {
        search(searchValue)
        .then(res => {
            console.log("running useEffect for search")
            return res
        })
        .then(data => {
            setSearchArray(data)
            setFlag1(true)
        })
        
        friends(sessionID)
        .then(res => {
            console.log("running useEffect for friends")
            return res
        })
        .then(data => {
            setFriendArray(data)
            setFlag2(true)
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
            setFlag3(true)
            console.log("done")
        })

        
        
    
    }, [])
   
   return (
        <div>
            <h2>Search Results:</h2>
            {flag1 && flag2 && flag3 && searchArray.map((elem) => {

                return ( <ResultComponent key={"resultComp"+ elem.userID} friendsArray={friendsArray} sentRequestsArray={sentRequestsArray} element={elem} sessionID={sessionID} />   
                )                                       
            })
            }
        </div>
    )
}



