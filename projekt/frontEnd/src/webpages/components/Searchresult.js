import React from 'react'

export default function Searchresult() {
    return (
        <div>
            <form>
                <label>
                    Add friend:
                    <input
                        name="Add friend"
                        type="checkbox"
                        id={elem.userID + "checkbox"}
                        defaultChecked={sentRequestsArray.includes(elem.userID)}
                        onChange={(e) => toggleFriendRequestHandler(e, elem.userID)}
                        />
                </label>
            </form>
        </div>
    )
}
