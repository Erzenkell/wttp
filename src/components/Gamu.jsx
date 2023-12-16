import React, {useEffect, useRef, useState} from "react";
import {generateMap} from "../utils/generateMap";
import { loadAssets } from "../utils/loadAssets";
import { keyHandler } from "../utils/keyHandler";
import { updateCharSpritePosition } from "../utils/characterMovement";
import { attackButton } from "../utils/characterActions";
import './Gamu.css'

const Gamu = (props) => {

    //canvas
    const canvasRef = useRef(null);

    //map
    const map = generateMap();

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
    const speed = 5; //movement speed
    let isAttacking = false;

    let charPosition = {
        X: 0,
        Y: 0,
        direction: 'right',
    }

    const loadCharFrame = (frame, context, canvas) => {
        let char = null;
        for(let i=0; i<assets.hero.length; i++) {
            if (assets.hero[i].src === `http://localhost:5173/src/assets/sprite/character/link/${charPosition.direction}-${frame}.png`) {
                char = assets.hero[i];
                break;
            }
        }
        if (isAttacking === false) {
            charPosition = updateCharSpritePosition(char, keyCheck, charPosition, speed, canvas);
        }
        const aspectRatio = char.width / char.height;
        const height = 100;
        const width = height * aspectRatio;
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
        if (assetsLoaded) {
            const canvas = canvasRef.current;
            canvas.width = 800;
            canvas.height = 600;
            const context = canvas.getContext('2d');
            // context.clearRect(0, 0, canvas.width, canvas.height);
            //context.drawImage(map, 0, 0, 800, 600);
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
                attackButton(charPosition, assets, context, attackFrame);
            }
        }
        requestAnimationFrame(play);
    }
    
    useEffect(() => {
        play();
    }, [assetsLoaded]);

    return(
        <div className="canvas-wrapper">
            <canvas ref={canvasRef} {...props}/>
        </div>
    )
}

export default Gamu;