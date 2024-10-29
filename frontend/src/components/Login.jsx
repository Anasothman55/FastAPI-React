import ErrorMessage from "./ErrorMessage"
import { UserContext } from "../context/UserContex"
import { useState , useContext } from "react";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [, setToken] = useContext(UserContext);

  const submitLogin = async () =>{
    const request = {
      method: "POST",
      headers:{
        "Content-Type":"application/x-www-form-urlencoded"
      },
      body:JSON.stringify(`grant_type=password&username=${email}&password=${password}&scope=&client_id=string&client_secret=string`)
    };
    const respons = await fetch("/api/token", request)
    const data = await respons.json()

    if(!respons.ok){
      setErrorMessage(data.detail)
    }else{
      setToken(data.access_token)
    }
  }
  
  const handleSubmit = (e)=>{
    e.preventDefault();
    submitLogin()

  }
  return (
    <div className="column">
    <form className="box" onSubmit={handleSubmit}>
      <h1 className="title has-text-centered">Login</h1>
      <div className="field">
        <label className="label">Email Address</label>
        <div className="control">
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            required
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Password</label>
        <div className="control">
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            required
          />
        </div>
      </div>
      <ErrorMessage message={errorMessage} />
      <br />
      <button className="button is-primary" type="submit">
        Login
      </button>
    </form>
  </div>
  )
}

export default Login
