import React from 'react'

function BgChangeBtn({btnName, btnColour}) {


  return (
    <button className={btnColour}>{btnName}</button>
  )
}

export default BgChangeBtn
