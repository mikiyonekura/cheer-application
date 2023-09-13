import React from 'react'
import { useEffect, useState } from 'react'

const PostToServer = async (acc) => {
    const response = await fetch("https://ad31-150-31-93-196.ngrok-free.app/api", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(acc),
        });
    
    const result = await response.json();
    console.log('===========result===========\n' + result.message);
} 

const Test = (props) => {

    const {acc} = props

    useEffect(() => {
        console.log("accが更新されました")
        console.log(acc)
        PostToServer(acc);

    }
    ,[acc])

  return (
    <div>
        <h1>Test</h1>
    </div>
  )
}

export default Test
