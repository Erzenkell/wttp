import react from 'react'
import PropTypes from 'prop-types'
import Typewriter from '../TypeWrite/TypeWrite';
import './DialogFrame.css'

export const DialogFrame = ({dialogContent, setDialog}) => {
    return (
        <div className='dialog-wrapper frame'>
            <div className='dialog-item dialog-name'>
                {dialogContent?.name}
            </div>
            <div className='dialog-item dialog-text'>
                {dialogContent?.text}
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