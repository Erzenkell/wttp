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

export const generateRandomMap = () => {
    return new Promise((resolve) => {
        const map = { size: [500, 500], content: [] };

        const generateRow = async (i) => {
            const row = [];
            if (i < 20 || i > map.size[0] - 20) {
                for (let j = 0; j < map.size[1]; j++) {
                    row.push({ "sprite": `world-wall-1`, "isWall": true, "isBreakable": false, "enemy": false });
                }
            } else {
                for (let j = 0; j < map.size[1]; j++) {
                    if (j <= 20 || j >= map.size[1] - 20) {
                        row.push({ "sprite": `world-wall-1`, "isWall": true, "isBreakable": false, "enemy": false });
                    } else {
                        const haveEnemy = Math.floor(Math.random() * (50 - 1) + 1) === 1;
                        row.push({
                            "sprite": `world-grass-${Math.floor(Math.random() * (3 - 1) + 1)}`,
                            "isWall": false,
                            "isBreakable": false,
                            "enemy":  haveEnemy ? `enemy-${Math.floor(Math.random() * (3 - 1) + 1)}` : false,
                        });
                    }
                }
            }
            return row;
        };

        const generateMapAsync = async () => {
            for (let i = 0; i < map.size[0]; i++) {
                const row = await generateRow(i);
                map.content.push(row);
            }
            resolve(map);
        };

        generateMapAsync();
    });
};
