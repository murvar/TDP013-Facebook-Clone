import React from 'react'
import {getMyRequests, getCookie} from './../../serverFetch'

export default function InviteDropDown() {
    let sessionID = getCookie("sessionID");

    const DropdownMenu = () => {
        const dropdownRef = React.useRef(null);
        const [isActive, setIsActive] = React.useState(false);
        const onClick = () => setIsActive(!isActive);
        const [RequestsArray, setRequestsArray] = React.useState([]);

        React.useEffect(() => {
            const pageClickEvent = (e) => {
              console.log(e);
            };

            getMyRequests(sessionID)
              .then(res => {
                  console.log("running useEffect for myRequests")
                  return res
              })
              .then(data => {
                  setRequestsArray(data)
              })
          
            // If the item is active (ie open) then listen for clicks
            if (isActive) {
              window.addEventListener('click', pageClickEvent);
            }
          
            return () => {
              window.removeEventListener('click', pageClickEvent);
            }
          
          }, [isActive]);
      
        return (
          <div className="menu-container">
            <button onClick={onClick} className="menu-trigger">
              <span>Friend Requests</span>
            </button>
            <nav ref={dropdownRef} className={`menu ${isActive ? 'active' : 'inactive'}`}>
              {RequestsArray && RequestsArray.map((elem) => {
                console.log("hello")
              return ( <ul key={elem}> {elem} </ul>   
              )                                       
              })}
            </nav>
          </div>
        );
      };

      return(
          <div>
            {DropdownMenu()} 
          </div>
      )
}