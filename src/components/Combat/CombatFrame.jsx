import react from 'react'
import PropTypes from 'prop-types'
import './CombatFrame.css'

export const CombatFrame = ({combatData, setCombatData}) => {
    return (
        <div className='combat-wrapper frame'>
            <div className='combat-item combat-name'>
                {combatData?.name}
            </div>
            <div className='combat-item combat-text'>
                {combatData?.hp}
            </div>
        </div>
    );
}

CombatFrame.propTypes = {
    combatData: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            hp: PropTypes.string,
            attack: PropTypes.string,
        })
    ),
    setCombatData: PropTypes.func,
};