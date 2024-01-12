import React, {useEffect, useRef, useState} from "react";
import { Debug } from "./Debug/Debug";
import { Chat } from "./Chat/Chat";
import { Settings } from "./Settings/Settings";

import {generateMap, generateRandomMap} from "../utils/generateMap";
import {generateEnemies} from "../utils/generateEnemies";
import { loadAssets } from "../utils/loadAssets";
import { keyHandler } from "../utils/keyHandler";
import { updateCharSpritePosition } from "../utils/characterMovement";
import { attackButton, interactionButton } from "../utils/characterActions";
import { drawMap } from "../utils/drawMap";
import './Gamu.css'

const Gamu = (props) => {
    //canvas
    const canvasRef = useRef(null);

    //global
    const [global, setGlobal] = useState({
        scale: 2,
        width: 800,
        height: 600,
        tileSize: 16,
        characterSize: [16, 21]
    });

    //map
    const [map, setMap] = useState(null);
    const [mapLoaded, setMapLoaded] = useState(false);

    useEffect(() => {
        generateRandomMap().then((map) => {
            setMap(map);
            setMapLoaded(true);
        });
    }, [global]);

    //assets
    const [assetsLoaded, setAssetsLoaded] = useState(false);
    const [assets, setAssets] = useState(null);

    useEffect(() => {
        loadAssets().then((assets) => {
            setAssetsLoaded(true);
            setAssets(assets);
        });
    }, []);

    //Enemies
    const [enemiesLoaded, setEnemiesLoaded] = useState(false);
    const [enemies, setEnemies] = useState([]);

    useEffect(() => {
        mapLoaded ?
            generateEnemies(map).then((enemies) => {
                setEnemiesLoaded(true);
                setEnemies(enemies);
            })
        : null;
    }, [mapLoaded]);

    //character
    let frame = 0; //sprite frame
    let attackFrame = 0; //attack frame
    const factor = 6; //anim speed
    const speed = 1; //movement speed
    let isAttacking = false;
    let isInteracting = false;

    let charPosition = {
        X: assetsLoaded ? global.width / 2 - assets.hero[0].width * global.scale / 2 : 0,
        Y: assetsLoaded ? global.height / 2 - assets.hero[0].height * global.scale / 2 : 0,
        mapX: 800,
        mapY: 800,
        direction: 'right',
    }

    const loadCharFrame = (frame, context, npcList) => {
        let char = null;
        for(let i=0; i<assets.hero.length; i++) {
            // Check if the end of the string matches the target ending
            if (assets.hero[i].src.endsWith(`${charPosition.direction}-${frame}.png`)) {
                char = assets.hero[i];
                break;
            }
        }
        if (isAttacking === false && keyCheck.movement === true) {
            charPosition = updateCharSpritePosition(char, keyCheck, charPosition, speed, global, map, npcList);
        }
        const height = char.height * global.scale;
        const width = char.width * global.scale;
        context.drawImage(char, charPosition.X, charPosition.Y, width, height);
    }

    const animateChar = (context, npcList) => {
        frame = (frame + 1) % (7 * factor);
        const charFrame = Math.floor(frame / factor) + 1;
        loadCharFrame('walk-'+charFrame, context, npcList);
    }

    //keyPress
    var keyCheck = {
        pressed: false,
        movement: false,
        up: false,
        down: false,
        left: false,
        right: false,
        space: false,
        enter: false,
    }
    
    useEffect(() => {
        document.addEventListener('keydown', e => keyHandler(e, keyCheck, true), true);
        document.addEventListener('keyup', e => keyHandler(e, keyCheck, false), true);
    });

    const play = () => {
        if (!(assetsLoaded && mapLoaded && enemiesLoaded)) {
            requestAnimationFrame(play);
            return;
        }
    
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        canvas.width = global.width;
        canvas.height = global.height;
    
        const npcList = drawMap(map, context, assets, charPosition, enemies, global);
        drawNpcs(context, npcList, global);
        handleCharacterAnimation(context, npcList);
        handleInteractions(charPosition, npcList, global);
        handleAttackAnimation(context);
    
        setDebugData(
            [
                {title: 'X', value: charPosition.mapX},
                {title: 'Y', value: charPosition.mapY},
                {title: 'direction', value: charPosition.direction},
            ]
        );

        requestAnimationFrame(play);
    };
    
    const drawNpcs = (context, npcList, global) => {
        for (const npc in npcList) {
            const { sprite, position } = npcList[npc];
            context.drawImage(sprite, position[0], position[1], sprite.width * global.scale, sprite.height * global.scale);
        }
    };
    
    const handleCharacterAnimation = (context, npcList) => {
        if (keyCheck.pressed) {
            if (keyCheck.movement && !isAttacking && !isInteracting) {
                animateChar(context, npcList);
            } else {
                loadCharFrame('idle', context);
            }
    
            if (keyCheck.space && !isAttacking) {
                isAttacking = true;
                attackFrame = 0;
                setTimeout(() => {
                    isAttacking = false;
                }, 500);
            }

            if (keyCheck.enter && !isInteracting) {
                isInteracting = true;    
            }
        } else {
            loadCharFrame('idle', context);
        }
    };

    const handleInteractions = (charPosition, npcList, global) => {
        if (isInteracting) {
            interactionButton(charPosition, npcList, global);
            isInteracting = false;
        }
    };

    const handleAttackAnimation = (context) => {
        if (isAttacking) {
            if (attackFrame > 30) {
                attackFrame = 0;
            }
            attackFrame++;
            attackButton(charPosition, assets, context, attackFrame, global);
        }
    };
    
    useEffect(() => {
        play();
    }, [assetsLoaded]);

    //debug
    const [debug, setDebug] = useState(false);
    const [debugData, setDebugData] = useState([]);

    function toggleDebug() {
        setDebug(!debug);
    }

    return(
        <>
            {debug ? <Debug debugData={debugData}/> : null}
            <div className="canvas-wrapper frame" style={{
                maxHeight: global.height, 
                maxWidth: global.width,
                minHeight: global.height,
                minWidth: global.width,
            }}>
                {assetsLoaded ? null : <div className="loading">Loading Assets...</div>}
                {mapLoaded ? null : <div className="loading">Loading Map...</div>}
                {enemiesLoaded ? null : <div className="loading">Loading Enemies...</div>}
                <canvas ref={canvasRef} {...props}/>
            </div>
            <Chat/>
            <Settings debug={toggleDebug}/>
        </>
    )
}

export default Gamu;