import React from 'react'


const dashcard = ({cardData}) => {

  
   
  return (
    <div className='w-52 h-24 border-2 border-gray-200 rounded-xl p-5 flex items-center gap-2'>
    <div className={`left p-1 rounded ${cardData.background}`}>{cardData.icon}</div>
      <div className="right">
        <p>{cardData.title}</p>
        <h2 className='font-semibold'>{cardData.number}</h2>
      </div>
    </div>
  )
}

export default dashcard
