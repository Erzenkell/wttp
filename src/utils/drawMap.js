export const drawMap = (map, context, assets, charPosition, global) => {
    const tileScale = global.tileSize * global.scale;
    const mapY = Math.floor(charPosition.mapX / tileScale);
    const mapX = Math.floor(charPosition.mapY / tileScale);
    const left = Math.max(0, mapX - 20);
    const right = Math.min(map.content[0].length, mapX + 20);
    const top = Math.max(0, mapY - 20);
    const bottom = Math.min(map.content.length, mapY + 20);

    let i = 0;
    let j = 0;

    for (let row = top; row < bottom; row++) {
        i++;
        for (let col = left; col < right; col++) {
            j++;
            const tile = map.content[row][col].sprite;
            const sprite = assets.world.find((asset) => asset.src.endsWith(`${tile}.png`));
            if (sprite) {
                const x = i * tileScale;
                const y = j * tileScale;
                context.drawImage(sprite, x, y, tileScale, tileScale);
            }
        }
        j = 0;
    }
    i= 0;
};