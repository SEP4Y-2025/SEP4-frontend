import React from 'react'

interface Props{
    source:string;
    summary:string;
}

const Icon = ({source, summary} :Props) => {
  return (
    <img src={source} alt={summary}></img>
  )
}

export default Icon 