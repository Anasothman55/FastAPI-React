import React, { useContext, useEffect, useState } from 'react'
import moment from "moment"
import ErrorMessage from './ErrorMessage'
import { UserContext } from '../context/UserContex'
import LeadModel from './LeadModel'

function Table() {
  const [token] = useContext(UserContext)
  const [lead, setLead] = useState(null)
  const [errorMessage, setErrorMessage] = useState("");
  const [leaded, setLeaded] = useState(false)
  const [activeModel,setActiveModel] = useState(false)
  const [id,setId] = useState(null)

  const handleUpdate = async (id) =>{
    setId(id)
    setActiveModel(true)
  }

  const handleLeadDelete = async (ids) =>{
    const request = {
      method:"DELETE",
      headers:{
        "Content-Type": "application/json",
        "Authorization":`Bearer ${token}`
      }
    }
    const respons = await fetch(`/api/leads/${ids}`,request)
    if(!respons.ok){
      setErrorMessage("Faild tp delete lead")
    }
    getLead()
  }

  const getLead = async ()=>{
    const request = {
      method:"GET",
      headers:{
        "Content-Type": "application/json",
        "Authorization":`Bearer ${token}`
      }
    }
    const respons = await fetch("/api/leads",request)
    if(!respons.ok){
      setErrorMessage("Somethong went wrong. Couldn't load the leads")
    }else{
      const data = await respons.json()
      setLead(data)
      setLeaded(true)
    }
  }

  useEffect(()=>{
    getLead()
  },[])

  const handleModal = () =>{
    setActiveModel(prev => !prev)
    getLead()
    setId(null)
  }

  return (  
    <>
    <LeadModel active={activeModel} handlemodel={handleModal} token={token} id={id} setErrorMessage={setErrorMessage}/>
    <button
      className="button is-fullwidth mb-5 is-primary" onClick={()=>setActiveModel(true)}>
      Create Lead
    </button>
    <ErrorMessage message={errorMessage} />
    {leaded && lead ? (
      <table className="table is-fullwidth">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Company</th>
            <th>Note</th>
            <th>Last Updated</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {lead.map((leads)=>(
            <tr key={leads.id} >
              <td>{leads.first_name}</td>
              <td>{leads.last_name}</td>
              <td>{leads.email}</td>
              <td>{leads.company}</td>
              <td>{leads.note}</td>
              <td>{moment(leads.date_last_updated).format("MM/DD/YYYY")}</td>
              <td>
                <button className='button mr-2 is-info is-light' onClick={()=>{handleUpdate(leads.id)} }>update</button>
                <button className='button mr-2 is-danger is-light' onClick={() => {handleLeadDelete(leads.id)}}>delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p>Loading</p>
    )}
  </>
  )
}

export default Table
