import React from 'react'
import { useEffect, useState } from 'react'

const Test = (props) => {

    const {acc} = props

    useEffect(() => {
        console.log("useEffect")
    }
    ,[acc])
    
  return (
    <div>
      {acc.weight}
    </div>
  )
}

export default Test
