import { useContext, useState } from "react"
import { UserContext } from "../context/UserContex"

function Header({title}) {
  const [token,setToken] = useContext(UserContext)

  const handleLogout = () =>{
    setToken(null)
  }
  return (
    <div className="has-text-centered m-6">
      <h1 className="title">{title}</h1>
      {token && (<button className="button" onClick={handleLogout}>Logout</button>)}
    </div>
  )
}

export default Header
