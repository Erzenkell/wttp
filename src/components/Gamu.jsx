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
    const factor = 6; //anim speed
    const speed = 3; //movement speed
    let hasAttacked = false;

    let charPosition = {
        X: 0,
        Y: 0,
        direction: 0,
    }

    const loadCharFrame = (frame, context, canvas) => {
        const char = assets.character[frame - 1];
        if (hasAttacked === false) {
            charPosition = updateCharSpritePosition(char, keyCheck, charPosition, speed, canvas);
        }
        const aspectRatio = char.width / char.height;
        const height = 100;
        const width = height * aspectRatio;
        
        // Save the current canvas state
        context.save();

        // Translate to the center of the image
        context.translate(charPosition.X + width / 2, charPosition.Y + height / 2);

        if (keyCheck.left) {
            context.scale(-1, 1); // Mirror effect along the x-axis
        }
        else {
            context.rotate((Math.PI / 180) * charPosition.direction);
        }        

        // Draw the rotated image
        context.drawImage(char, -width / 2, -height / 2, width, height);

        // Restore the canvas state
        context.restore();

        //context.drawImage(char, charPosition.X, charPosition.Y, width, height);
    }

    const animateChar = (context, canvas) => {
        frame = (frame + 1) % (9 * factor);
        const charFrame = Math.floor(frame / factor) + 1;
        loadCharFrame(charFrame, context, canvas);
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
            context.clearRect(0, 0, canvas.width, canvas.height);
            //context.drawImage(map, 0, 0, 800, 600);
            if(keyCheck.pressed === true) {
                if(keyCheck.movement === true && hasAttacked === false) {
                    animateChar(context, canvas);
                } 
                else {
                    loadCharFrame(1, context, canvas);
                }  
                if (keyCheck.space === true) {
                    loadCharFrame(10, context, canvas);
                    if (hasAttacked === false) {
                        hasAttacked = true;
                        attackButton(charPosition, assets, context)
                        setTimeout(() => {
                            hasAttacked = false;
                        }, 1000);
                    }    
                }
            }
            else {
                loadCharFrame(1, context, canvas);
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