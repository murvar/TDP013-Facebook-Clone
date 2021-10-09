import './App.css';
let serverFetch = require("./serverFetch.js")

async function loginHandler() {
  let username = document.getElementById("loginUsername")
  let password = document.getElementById("loginPassword")
  
  await new Promise ((res, req) => {
    let sessionID = serverFetch.login(username, password)
    document.cookie = "sessionID = " + sessionID
    this.props.history.push('/')
  })
}


function App() {

  document.getElementById("loginbutton").addEventListener("click", loginHandler)

  return (
    <div>
      <form>
        <label for="username">Username:</label><br />
        <input
          type="text"
          name="username"
          id="loginUsername"
        />
        <label for="password">Password:</label><br />
        <input
          type="password"
          name="password"
          id="loginPassword"
        /> <br />

        <button type="submit" id="loginbutton">Login</button>
      </form>
    </div>
  )
}

export default App;
