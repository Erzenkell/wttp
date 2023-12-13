import React, {useEffect, useRef, useState} from "react";
import {generateMap} from "../utils/generateMap";
import { loadAssets } from "../utils/loadAssets";
//import { keyDownHandler } from "../utils/keyDownHandler";

const Gamu = (props) => {

    //canvas
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
    }, [])

    //map
    const map = generateMap();

    //assets
    const [assetsLoaded, setAssetsLoaded] = useState(false);
    const [assets, setAssets] = useState(null);

    loadAssets().then((assets) => {
        setAssetsLoaded(true);
        setAssets(assets);
    });

    //keyPress
    const [pressedKeys, setPressedKeys] = useState(new Set());
    
    useEffect(() => {
        const getKey = (event) => {
            setPressedKeys(new Set());
            if (event.defaultPrevented) {
                return; // Do nothing if the event was already processed
            }
            const key = event.key;
            if(!pressedKeys.has(key)) {
                setPressedKeys((prev) => {
                    return new Set(prev.add(key));
                });
            }
            event.preventDefault();
        }
        document.addEventListener('keydown', getKey, true);
        return () => {
            document.removeEventListener('keydown', getKey, true);
        }
    }, []);

    useEffect(() => {
        console.log(pressedKeys);
    }, [pressedKeys]);

    return(
        <canvas ref={canvasRef} {...props}/>
    )
}

export default Gamu;