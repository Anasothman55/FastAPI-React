import { useEffect, useState } from "react"



function LeadModel({active,handlemodel,token,id, setErrorMessage}) {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [emailName, setEmailName] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [noteName, setNoteName] = useState("")
  const [updateError, setUpdateError] = useState("")

  const handleUpdate = async (e) =>{
    e.preventDefault()
    const request = {
      method:"PUT",
      headers:{
        "Content-Type": "application/json",
        "Authorization":`Bearer ${token}`
      },
      body:JSON.stringify({first_name:firstName,last_name:lastName,email:emailName,company:companyName,note:noteName})
    }
    const respons = await fetch(`/api/leads/${id}`,request)
    const data = await respons.json();
    if(!respons.ok){
      const messages = [];
      data.detail.forEach((item) => {
      if (item.msg) {
        messages.push(item.msg); // Collect all messages
      }
      });
      setUpdateError(messages);
    }else{
      handleCleanData()
      handlemodel()
    }
  }

  useEffect(()=>{
    const getLead = async ()=>{
      const request = {
        method:"GET",
        headers:{
          "Content-Type": "application/json",
          "Authorization":`Bearer ${token}`
        }
      }
      const respons = await fetch(`/api/leads/${id}`,request)
      if(!respons.ok){
        setErrorMessage("Somethong went wrong. Couldn't get lead")
      }else{
        const data = await respons.json()
        setFirstName(data.first_name)
        setLastName(data.last_name)
        setEmailName(data.email)
        setCompanyName(data.company)
        setNoteName(data.note)
      }
    }
    if(id){
      getLead()
    }

  },[id,token])

  const handleCleanData = () =>{
    setFirstName("")
    setLastName("")
    setEmailName("")
    setCompanyName("")
    setNoteName("")
  }

  function  handleCansel(){
    handlemodel()
    handleCleanData()
  }


  const handleCreateLeads = async (e) =>{
    e.preventDefault()
    const request = {
      method:"POST",
      headers:{
        "Content-Type": "application/json",
        "Authorization":`Bearer ${token}`
      },
      body:JSON.stringify({first_name:firstName,last_name:lastName,email:emailName,company:companyName,note:noteName})
    }
    const respons = await fetch("/api/leads",request)
    if(!respons.ok){
      setErrorMessage("Something went wrong creating lead")
    }else{
      handleCleanData()
      handlemodel()
    }
  }

  return (
    <div className={`modal ${active && "is-active"}`}>
      <div
      className="modal-background" onClick={handlemodel}></div>
      <div className="modal-card">
        <header className="modal-card-head has-background-primary-light">
          <h1 className="modal-card-title">{id ? "update Lead" : "Create Lead" }</h1>
        </header>
        <section className="modal-card-body">
          <form action="">
            <div className="field">
              <label className="lable">First Name</label>
              <div className="control">
                <input type="text" placeholder="john" value={firstName} onChange={(e)=> setFirstName(e.target.value)} className="input" required/>
              </div>
            </div>
            <div className="field">
              <label className="lable">Last Name</label>
              <div className="control">
                <input type="text" placeholder="dowe" value={lastName} onChange={(e)=> setLastName(e.target.value)} className="input" required/>
              </div>
            </div>
            <div className="field">
              <label className="lable">Email Address</label>
              <div className="control">
                <input type="email" placeholder="Example@..." value={emailName} onChange={(e)=> setEmailName(e.target.value)} className="input" required/>
              </div>
            </div>
            <div className="field">
              <label className="lable">Company</label>
              <div className="control">
                <input type="text" placeholder="Amazon" value={companyName} onChange={(e)=> setCompanyName(e.target.value)} className="input" required/>
              </div>
            </div>
            <div className="field">
              <label className="lable">Note</label>
              <div className="control">
                <input type="text" placeholder="Enter Note" value={noteName} onChange={(e)=> setNoteName(e.target.value)} className="input" required/>
              </div>
            </div>
          </form>
        </section>
        <p className="modal-card is-danger">{updateError}</p>
        <footer className="modal-card-foot has-background-primary-light">
          {id ? (<button className="button is-info" onClick={handleUpdate}>Update</button>): (<button className="button is-primary" onClick={handleCreateLeads}>Create</button>)}
          <button className="button ml-2" onClick={handleCansel}>Cansle</button>
        </footer>
      </div>
    </div>
  )
}

export default LeadModel