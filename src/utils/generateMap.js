import mapData from '../data/map.json';

export const generateMap = (global) => {
    const map = { size: [mapData.size[0] * global.tileSize * global.scale, mapData.size[1] * global.tileSize * global.scale], content: [] };
    for (let i = 0; i < mapData.size[0]; i++) {
        const row = [];
        for (let j = 0; j < mapData.size[1]; j++) {
            row.push(mapData.content[i * mapData.size[1] + j]);
        }
        map.content.push(row);
    }
    return map;
}

export const generateRandomMap = (global) => {
    const map = { size: [2000, 2000], content: [] };
    for (let i = 0; i < map.size[0]; i++) {
        const row = [];
        for (let j = 0; j < map.size[1]; j++) {
            row.push({"sprite": `world-grass-${Math.floor(Math.random() * (3 - 1) + 1)}`, "isWall": false, "isBreakable": false},);
        }
        map.content.push(row);
    }
    return map;
}