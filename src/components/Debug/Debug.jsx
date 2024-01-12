import react from 'react'
import PropTypes from 'prop-types'
import Draggable from 'react-draggable'
import './Debug.css'

export const Debug = ({debugData}) => {
  return (
    <Draggable>
      <div className='debug frame' key={debugData[0]?.title}>
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

Debug.propTypes = {
  debugData: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      value: PropTypes.any,
    }),
  ),
};

export default Debug;