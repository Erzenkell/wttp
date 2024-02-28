import React, {useEffect, useMemo, useRef, useState} from "react";
import throttle from 'lodash.throttle';

import { Debug } from "./Debug/Debug";
import { Settings } from "./Settings/Settings";
import { DialogFrame } from "./Dialog/DialogFrame";
import { CombatFrame } from "./Combat/CombatFrame";

import {generateMap, generateRandomMap} from "../utils/generateMap";
import {generateEnemies} from "../utils/generateEnemies";
import { loadAssets } from "../utils/loadAssets";
import { keyHandler } from "../utils/keyHandler";
import { updateCharSpritePosition } from "../utils/characterMovement";
import { attackButton, interactionButton } from "../utils/characterActions";
import { drawMap } from "../utils/drawMap";
import './Gamu.css'

function arrayBufferToString(buffer) {
    let str = '';
    const array = new Uint8Array(buffer);
    for (let i = 0; i < array.length; i++) {
      str += String.fromCharCode(array[i]);
    }
    return JSON.parse(str);
}

function useAnimationFrame(callback) {
    const requestRef = useRef();
    const previousTimeRef = useRef();

    const animate = time => {
        if (previousTimeRef.current !== undefined) {
            const deltaTime = time - previousTimeRef.current;
            callback(deltaTime);
        }
        previousTimeRef.current = time;
        requestRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current);
    }, [callback]);

    return requestRef;
}

const Gamu = ({sendJsonMessage, lastJsonMessage}) => {

    //Websocket
    const userID = useMemo(() => Date.now().toString(36) + Math.random().toString(36).slice(2), []);
    const THROTTLE = 50 //ms
    const sendJsonMessageThrottled = useRef(throttle(sendJsonMessage, THROTTLE))
    const [lastMessage, setLastMessage] = useState(null);
    
    useEffect(() => {
        if (lastJsonMessage !== null) {
            const messageObject = JSON.parse(lastJsonMessage.data);
            const message = arrayBufferToString(messageObject.data);
            setLastMessage(message);
        }
    }, [lastJsonMessage]);

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

    //Interaction
    const [dialog, setDialog] = useState(false);
    const [dialogData, setDialogData] = useState([]);

    //character
    var frame = 0; //sprite frame
    var attackFrame = 0; //attack frame
    const factor = 6; //anim speed
    const speed = 1; //movement speed
    var isAttacking = false;
    var collision = false;

    const [charPosition, setCharPosition] = useState({
        X: global.width / 2 - global.characterSize[0] * global.scale / 2,
        Y: global.height / 2 - global.characterSize[1] * global.scale / 2,
        mapX: 800,
        mapY: 800,
        direction: 'right',
    });

    const [charData, setCharData] = useState([]);
    const [combatData, setCombatData] = useState([]);
    var combat = false;

    useEffect(() => {
        setCharData({
            'name': 'Hero',
            'hp': 100,
            'attack': 10,
            'combat': false,
            'isInteracting': false,
        })
    }, []);

    const loadCharFrame = (frame, context, npcList) => {
        let char = null;
        for(let i=0; i<assets.hero.length; i++) {
            // Check if the end of the string matches the target ending
            if (assets.hero[i].src.endsWith(`${charPosition?.direction}-${frame}.png`)) {
                char = assets.hero[i];
                break;
            }
        }
        if (isAttacking === false && keyCheck.movement === true && !charData.isInteracting) {
            let newCharPosition = charPosition;
            newCharPosition, collision = updateCharSpritePosition(char, keyCheck, charPosition, speed, global, map, npcList, setCharPosition);
            setCharPosition(newCharPosition);
            sendJsonMessageThrottled.current(JSON.stringify({
                type: 'character',
                x: charPosition.mapX,
                y: charPosition.mapY,
                userID: userID,
            }))
        }

        const height = char?.height * global.scale;
        const width = char?.width * global.scale;
        context.drawImage(char, charPosition?.X, charPosition?.Y, width, height);
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
            return;
        }
    
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        canvas.width = global.width;
        canvas.height = global.height;
    
        const npcList = drawMap(map, context, assets, charPosition, enemies, global);
        drawNpcs(context, npcList, global);
        handleCharacterAnimation(context, npcList);
        handleInteractions(collision, global, charData);
        handleAttackAnimation(context);
    
        debug ? setDebugData(
            [
                {title: 'X', value: charPosition.mapX},
                {title: 'Y', value: charPosition.mapY},
                {title: 'direction', value: charPosition.direction},
            ]
        ): null;

        if (lastMessage !== null && lastMessage.userID !== userID) {
            if(charPosition.mapX - lastMessage.x < 12 * global.tileSize * global.scale && charPosition.mapY - lastMessage.y < 12 * global.tileSize * global.scale) {
                context.drawImage(assets.hero[0], charPosition.X + charPosition.mapX - lastMessage.x, charPosition.Y + charPosition.mapY - lastMessage.y, 32, 42);
            }
        }
        // if(combat !== true) {
        //     requestAnimationFrame(play);
        // }
    };
    
    const drawNpcs = (context, npcList, global) => {
        for (const npc in npcList) {
            const { sprite, position } = npcList[npc];
            context.drawImage(sprite, position[0], position[1], sprite.width * global.scale, sprite.height * global.scale);
        }
    };
    
    const handleCharacterAnimation = (context, npcList) => {
        if (keyCheck.pressed && !isAttacking && !charData.isInteracting) {
            if (keyCheck.movement) {
                animateChar(context, npcList);
            } else {
                loadCharFrame('idle', context);
            }
    
            if (keyCheck.space) {
                isAttacking = true;
                attackFrame = 0;
                setTimeout(() => {
                    isAttacking = false;
                }, 500);
            }

            if (keyCheck.enter) {
                charData.isInteracting =true;   
            }
        } else {
            loadCharFrame('idle', context);
        }
    };

    const handleInteractions = (collision, global, charData) => {
        if (charData.isInteracting === true && combat === false) {
            const interaction = interactionButton(collision, global);
            if (interaction !== false) {
                if(interaction.type === 'dialog') {
                    setDialogData(interaction.data);
                    setDialog(true);
                }
                else if (interaction.type === 'fight') {
                    setCombatData(interaction.data);
                    setCharData({
                        ...charData,
                        combat: true,
                    });
                    combat = true;
                }
            }
            else {
                setDialog(false);
            }
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
    
    useAnimationFrame(play);

    // useEffect(() => {
    //     if(assetsLoaded && mapLoaded && enemiesLoaded) {
            
    //     }
    // }, [assetsLoaded]);

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
                <canvas ref={canvasRef}/>
            </div>
            {dialog ? <DialogFrame dialogContent={dialogData} setDialog={setDialog}/> : null}
            {charData.combat ? <CombatFrame combatData={combatData} setCombatData={setCombatData} charData={charData} setCharData={setCharData} keyCheck={keyCheck}/> : null}
            <Settings debug={toggleDebug}/>
        </>
    )
}

export default Gamu;