import React from 'react'


interface Props{
    source:string;
    summary:string;
    onClick?:() =>void;
}

const Icon = ({source, summary,onClick} :Props) => {

  return (
    <img src={source} alt={summary} onClick={onClick}></img>
  )
}

export default Icon 