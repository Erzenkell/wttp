import react from 'react'
import PropTypes from 'prop-types'
import Typewriter from '../TypeWrite/TypeWrite';
import './DialogFrame.css'

export const DialogFrame = ({dialogContent, setDialog}) => {
    return (
        <div className='dialog-wrapper frame'>
            <div className='dialog-name'>
                {dialogContent?.name}
            </div>
            <div className='dialog-text'>
                {/* <Typewriter text={dialogContent.text} speed={50}/> */}
            </div>
        </div>
    );
}

DialogFrame.propTypes = {
    dialogContent: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            text: PropTypes.string,
        })
    ),
    setDialog: PropTypes.func,
};

export default DialogFrame;