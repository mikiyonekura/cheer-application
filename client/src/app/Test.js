import React from 'react'
import { useEffect, useState } from 'react'

const Test = (props) => {

    const {xyzlist} = props

    useEffect(() => {
        console.log("useEffect")
    }
    ,[xyzlist])

  return (
    <div>
      aa
    </div>
  )
}

export default Test
