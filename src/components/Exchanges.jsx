import React, { useEffect, useState } from 'react'
import BuyCrypto from './BuyCrypto'

import { Balance } from "./Balance";
import { AddTransaction } from './AddTransaction';
import { Expense } from './Expense';
import { TransactionList } from "./TransactionList";
import { useHistory } from 'react-router';
import {useAuth} from '../context/AuthContext'

const Exchanges = () => { 
    const {logout,currentUser} = useAuth()
    const history = useHistory()
    const [error, setError] = useState('')
    // logout
    async function handleLogout() {
      setError('')
      try {
          await logout()
          history.push("/login")
      }
      catch{
          setError('failed to log out')
      }
    } 
    // check if user is logged in or not
    useEffect(() => {
      if(currentUser) {
        history.push('/exchanges')
      }
      else {
        history.push('/login')
      }
    },[])
    return (
      <>
      <button onClick = {()=> handleLogout()} className = "py-2 px-4 bg-blue-400 text-black">Logout</button>
      <div class="flex flex-wrap -mx-3 overflow-hidden sm:-mx-2 md:-mx-2">
        <div class="my-3 px-3 w-1/2 border-2 overflow-hidden sm:my-2 sm:px-2 sm:w-full md:my-2 md:px-2 md:w-1/2">{<Balance/>}</div>
        <div class="my-3 px-3 w-1/2 border-2 overflow-hidden sm:my-2 sm:px-2 sm:w-full md:my-2 md:px-2 md:w-1/2">{<Expense/>}</div>
        {/* <div class="my-3 px-3 w-1/2 border-2 overflow-hidden sm:my-2 sm:px-2 sm:w-full md:my-2 md:px-2 md:w-1/2"></div> */}
        <div class="my-3 px-3 w-full border-2 overflow-y-auto sm:my-2 sm:px-2 sm:w-full md:my-2 md:px-2 md:w-1/2">{<TransactionList/>}</div>

      </div>
      <div>{<BuyCrypto/>}</div>
      </>
    )
}

export default Exchanges