import mapData from '../data/map.json';

export const generateMap = () => {
    const map = [];
    for (let i = 0; i < mapData.size[0]; i++) {
        const row = [];
        for (let j = 0; j < mapData.size[1]; j++) {
            row.push(mapData.content[i * mapData.size[1] + j]);
        }
        map.push(row);
    }
    return map;
}