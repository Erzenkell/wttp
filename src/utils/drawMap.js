export const drawMap = (map, context, assets, global) => {
    let sprite;
    const tileScale = global.tileSize * global.scale * 2;
    for(let row in map) {
        for(let col in map[row]) {
            const tile = map[row][col].sprite
            for(let i=0; i<assets.world.length; i++) {
                if (assets.world[i].src.endsWith(`${tile}.png`)) {
                    sprite = assets.world[i];
                    break;
                }
            }
            const x = col * tileScale
            const y = row * tileScale
            context.drawImage(sprite, x, y, tileScale, tileScale)
        }
    }
}