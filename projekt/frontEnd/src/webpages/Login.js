import React from 'react'
import login from 'src/../ServerFetch'

export default function Login() {
    return (
        <div>
        <form onSubmit={this.login}>
          <input
            type="text"
            name="username"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />

          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />

          <button type="submit">Login</button>
        </form>
      </div>
    )
}
