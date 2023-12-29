import React, {useEffect, useRef, useState} from "react";
import {generateMap, generateRandomMap} from "../utils/generateMap";
import { loadAssets } from "../utils/loadAssets";
import { keyHandler } from "../utils/keyHandler";
import { updateCharSpritePosition } from "../utils/characterMovement";
import { attackButton } from "../utils/characterActions";
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

    //character
    let frame = 0; //sprite frame
    let attackFrame = 0; //attack frame
    const factor = 6; //anim speed
    const speed = 1; //movement speed
    let isAttacking = false;

    let charPosition = {
        X: assetsLoaded ? global.width / 2 - assets.hero[0].width * global.scale / 2 : 0,
        Y: assetsLoaded ? global.height / 2 - assets.hero[0].height * global.scale / 2 : 0,
        mapX: 800,
        mapY: 800,
        direction: 'right',
    }

    const loadCharFrame = (frame, context, canvas) => {
        let char = null;
        for(let i=0; i<assets.hero.length; i++) {
            // Check if the end of the string matches the target ending
            if (assets.hero[i].src.endsWith(`${charPosition.direction}-${frame}.png`)) {
                char = assets.hero[i];
                break;
            }
        }
        if (isAttacking === false && keyCheck.movement === true) {
            charPosition = updateCharSpritePosition(char, keyCheck, charPosition, speed, canvas, global, map);
        }
        const height = char.height * global.scale;
        const width = char.width * global.scale;
        context.drawImage(char, charPosition.X, charPosition.Y, width, height);
    }

    const animateChar = (context, canvas) => {
        frame = (frame + 1) % (7 * factor);
        const charFrame = Math.floor(frame / factor) + 1;
        loadCharFrame('walk-'+charFrame, context, canvas);
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
    }
    
    useEffect(() => {
        document.addEventListener('keydown', e => keyHandler(e, keyCheck, true), true);
        document.addEventListener('keyup', e => keyHandler(e, keyCheck, false), true);
    });

    const play = () => {
        if (assetsLoaded && mapLoaded) {
            const canvas = canvasRef.current;
            canvas.width = global.width;
            canvas.height = global.height;
            const context = canvas.getContext('2d');
            //context.clearRect(0, 0, canvas.width, canvas.height);
            drawMap(map, context, assets, charPosition, global);
            if(keyCheck.pressed === true) {
                if(keyCheck.movement === true && isAttacking === false) {
                    animateChar(context, canvas);
                } 
                else {
                    loadCharFrame('idle', context, canvas);
                }  
                if (keyCheck.space === true) {
                    if (isAttacking === false) {
                        isAttacking = true;
                        attackFrame = 0;
                        setTimeout(() => {
                            isAttacking = false;
                        }, 500);
                    }    
                }
            }
            else {       
                loadCharFrame('idle', context, canvas);
            }
            if (isAttacking === true) {
                if (attackFrame > 30) {
                    attackFrame = 0;
                }
                attackFrame ++;
                attackButton(charPosition, assets, context, attackFrame, global);
            }
        }
        requestAnimationFrame(play);
    }
    
    useEffect(() => {
        play();
    }, [assetsLoaded]);

    return(
        <div className="canvas-wrapper" style={{
            maxHeight: global.height, 
            maxWidth: global.width,
            minHeight: global.height,
            minWidth: global.width,
        }}>
            {assetsLoaded ? null : <div className="loading">Loading Assets...</div>}
            {mapLoaded ? null : <div className="loading">Loading Map...</div>}
            <canvas ref={canvasRef} {...props}/>
        </div>
    )
}

export default Gamu;