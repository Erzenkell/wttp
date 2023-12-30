import react from 'react'
import './Debug.css'

export const Debug = ({ data }) => {
    return (
      <div className='debug frame'>
        {data.map(({ title, value }, index) => {
          return (
            <div key={index} className='debug-item'>
              <div className='debug-item'>{title}: {value}</div>
            </div>
          );
        })}
      </div>
    );
  }