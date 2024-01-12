import react, { useState } from 'react'
import './Settings.css'

export const Settings = ({debug}) => {

    const [settingsOpen, setSettingsOpen] = useState(false);

    return (
        <div className='settings'>
        {settingsOpen ? 
            <>
                <div className="settings-wrapper frame">
                    <div className="settings-header">
                        <h3>Settings</h3>
                        <button onClick={() => setSettingsOpen(false)}>X</button>
                    </div>
                    <div className="settings-list">
                        <div className="settings-item">
                            <h3>Settings</h3>
                        </div>
                        <div className="settings-item" onClick={() => debug()}>
                            <h3>Debug</h3>
                        </div>
                        <div className="settings-item">
                            <h3>FAQ</h3>
                        </div>
                        <div className="settings-item">
                            <h3>Credits</h3>
                        </div>
                    </div>
                </div>
            </>
        :
            <button className='settings-button' style={!settingsOpen ? {background: 'transparent', border: 'none'} : null} onClick={() => setSettingsOpen(true)}>
                <img src='src/assets/settings/settings-icon.svg' style={{width: "50px", height: "50px"}} type='image/svg+xml'/>
            </button>
        }
        </div>
    )
}

export default Settings;
