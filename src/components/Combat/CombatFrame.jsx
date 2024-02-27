import react from 'react'
import PropTypes from 'prop-types'
import './CombatFrame.css'

export const CombatFrame = ({combatData, setCombatData, charData, setCharData, keyCheck}) => {
    const endCombat = () => {
        setCharData({
            ...charData,
            'isInteracting': false,
            'combat': false,
        })
        console.log(charData)
    }

    return (
        <div className='combat-wrapper frame'>
            <div className='combat-row frame'>
                <div className=''>
                    {combatData?.name}
                </div>
                <div className=''>
                    {combatData?.hp}
                </div>
            </div>
            <div className='combat-row frame'>
                <div className='hero-data'>
                    <div className=''>
                        {charData?.name}
                    </div>
                    <div className=''>
                        {charData?.hp}
                    </div>
                </div>
                <div className='combat-buttons'>
                    <button onClick={() => {endCombat()}}>Run</button>
                    <button onClick={() => {}}>Attack</button>
                </div>
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
    charData: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            hp: PropTypes.string,
            attack: PropTypes.string,
        })
    ),
    setCharData: PropTypes.func,
    keyCheck: PropTypes.object,
};