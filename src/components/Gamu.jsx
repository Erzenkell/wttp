import React, {useState} from "react";
import {generateMap} from "../utils/generateMap";
import { loadAssets } from "../utils/loadAssets";

const Gamu = () => {

    const map = generateMap();
    loadAssets();

    return(
        <h2>oui</h2>
    )
}

export default Gamu;