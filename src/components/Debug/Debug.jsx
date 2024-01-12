import react from 'react'
import Draggable from 'react-draggable'
import './Debug.css'

export const Debug = ({debugData}) => {
  return (
    <Draggable>
      <div className='debug frame'>
        {debugData?.map(({ title, value }, index) => {
          return (
            <div key={index} className='debug-item'>
              <div className='debug-item'>{title}: {value}</div>
            </div>
          );
        })}
      </div>
    </Draggable>
  );
}