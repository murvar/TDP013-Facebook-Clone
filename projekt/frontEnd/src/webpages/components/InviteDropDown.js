import React from 'react'
import {getMyRequests, getCookie} from './../../serverFetch'
import RequestComponent from './requestComponent';
import {Dropdown, DropdownButton} from 'react-bootstrap';

export default function InviteDropDown() {
    let sessionID = getCookie("sessionID")

    const [flag1, setFlag1] = React.useState(false);
    const [RequestsArray, setRequestsArray] = React.useState([]);

    React.useEffect (() => {
      getMyRequests(sessionID)
      .then(res => {
        console.log("running useEffect for getMyRequests")
        setRequestsArray(res)
        setFlag1(true)
      })
    }, [])

    const DropdownMenu = () => {
        return (
          <DropdownButton id="dropdown-button" title="Friend Requests">
            {flag1 && RequestsArray.map((elem) => {
              return( 
                <Dropdown.Item key={"rc" + elem}>
                  <RequestComponent userID={elem} />
                </Dropdown.Item> 
              )
              })
              //om något i listan, ändra färg
            }                                  
          </DropdownButton>
        );
      };

      return(
          <div>
            {DropdownMenu()} 
          </div>
      )
}