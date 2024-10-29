import { createContext, useEffect, useState } from 'react'

export const UserContext = createContext();

export const UserProvider = (props) =>{
  const [token, setToken] = useState(localStorage.getItem("awsomLeadsToken"))

  useEffect(()=>{
    const fetchUser = async () =>{
      const request = {
        method: "GET",
        headers:{
          "Content-Type":"application/json",
          Authorization: "Bearer " + token,
        }
      };
      const  response = await fetch("/api/users/me", request);
      
      if(!response.ok){
        setToken(null)
      }
      localStorage.getItem("awsomLeadsToken")
    };
    if (token) {  // Only fetch user data if there's a token
      fetchUser();
    }
  },[token]);

  useEffect(() => {
    if (token) {
      localStorage.setItem("awsomLeadsToken", token);
    } else {
      localStorage.removeItem("awsomLeadsToken");
    }
  }, [token]);
  return (
    <UserContext.Provider value={[token,setToken]}>
      {props.children}
    </UserContext.Provider>
  )
}

