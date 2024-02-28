export const drawMap = (map, context, assets, charPosition, enemies, global) => {
    const tileScale = global.tileSize * global.scale;
    const mapY = charPosition?.mapX ? Math.floor(charPosition.mapX / tileScale) : 800;
    const mapX = charPosition?.mapY ? Math.floor(charPosition.mapY / tileScale) : 800;
    const left = Math.max(0, mapX - 9);
    const right = Math.min(map.content[0].length, mapX + 10);
    const top = Math.max(0, mapY - 12);
    const bottom = Math.min(map.content.length, mapY + 13);

    let i = 0;
    let j = 0;

    var enemyList = [];

    for (let row = top; row < bottom; row++) {
        for (let col = left; col < right; col++) {
            const tile = map.content[row][col].sprite;
            const mapSprite = assets.world.find((asset) => asset.src.endsWith(`${tile}.png`));
            if (mapSprite) {
                const x = i * tileScale;
                const y = j * tileScale;
                const enemy = enemies.find((enemy) => enemy.position[0] === row && enemy.position[1] === col);
                context.drawImage(mapSprite, x, y, tileScale, tileScale);
                if (enemy) {
                    const enemySprite = assets.enemies.find((asset) => asset.src.endsWith(`${enemy.sprite}.png`));
                    if (enemySprite) {
                        enemyList.push({ "sprite": enemySprite, "position": [x, y], "type": "enemy" });
                    }
                }
            }
            j++;
        }
        i++;
        j = 0;
    }
    i= 0;
    
    return enemyList;
};