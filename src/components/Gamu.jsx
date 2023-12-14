import React, {useEffect, useRef, useState} from "react";
import {generateMap} from "../utils/generateMap";
import { loadAssets } from "../utils/loadAssets";
import { keyHandler } from "../utils/keyHandler";
import { updateCharSpritePosition } from "../utils/characterMovement";
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
    let frame = 0; //frame du sprite
    const factor = 6; //vitesse de l'animation
    const speed = 3; //vitesse de déplacement
    let charPosition = {
        X: 0,
        Y: 0
    }

    const loadCharFrame = (frame, context, canvas) => {
        let char = assets.character[frame - 1];
        charPosition = updateCharSpritePosition(char, keyCheck, charPosition, speed, canvas);
        let aspectRatio = char.width / char.height;
        let height = 100;
        let width = height * aspectRatio;
        context.drawImage(char, charPosition.X, charPosition.Y, width, height);
    }

    const animateChar = (context, canvas) => {
        frame = (frame + 1) % (9 * factor);
        const charFrame = Math.floor(frame / factor) + 1;
        loadCharFrame(charFrame, context, canvas);
    }

    //keyPress
    var keyCheck = {
        pressed: false,
        up: false,
        down: false,
        left: false,
        right: false
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
                animateChar(context, canvas);
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