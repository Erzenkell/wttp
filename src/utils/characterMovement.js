export const updateCharSpritePosition = (src, keyCheck, charPosition, speed, global, map, npcList) => {
    const isWithinBoundsX = (x) => x >= 0 && x <= map.size[0] * global.scale * global.tileSize - src.width;
    const isWithinBoundsY = (y) => y >= 0 && y <= map.size[1] * global.scale * global.tileSize - src.height;

    const closestTile = (x, y) => {
        const direction = charPosition.direction;
        const tileX = Math.floor((x + global.characterSize[0]) / (global.tileSize * 2));
        const tileY = Math.floor((y + global.characterSize[0]) / (global.tileSize * 2));
        const directionX = direction === 'left' ? 0 : direction === 'right' ? 0 : 0;
        const directionY = direction === 'up' ? -2 : direction === 'down' ? 1 : 0;
        return [tileX+directionX, tileY+directionY];
    };

    const isWall = (x, y) => {
        const [tileX, tileY] = closestTile(x, y);
        return map.size[0] > tileX && tileX >= 0 && map.size[1] > tileY && tileY >= 0 && map.content[tileY][tileX].isWall;
    };

    const npcCollision = (deltaX, deltaY) => {
        const charRight = charPosition.X + deltaX * src.width + src.width;
        const charBottom = charPosition.Y + deltaY * src.width + src.height;
    
        for (const npc of npcList) {
            const npcRight = npc.position[0] + npc.sprite.width;
            const npcBottom = npc.position[1] + npc.sprite.height;
            if (
                charRight > npc.position[0] &&
                charPosition.X + deltaX * src.width < npcRight &&
                charBottom > npc.position[1] &&
                charPosition.Y + deltaY * src.width < npcBottom
            ) {
                return true;
            }
        }
        return false;
    };

    const updatePosition = (deltaX, deltaY) => {
        if (isWithinBoundsX(charPosition.mapX + deltaX) && isWithinBoundsY(charPosition.mapY + deltaY)) {
            if (!isWall(charPosition.mapX + deltaX, charPosition.mapY + deltaY) && !npcCollision(deltaX * global.scale, deltaY * global.scale)) {
                charPosition.mapX += global.tileSize * deltaX;
                charPosition.mapY += global.tileSize * deltaY;
            }
        }
    };

    switch (true) {
        // case keyCheck.up && keyCheck.left: // haut gauche
        //     updatePosition(-speed, -speed);
        //     break;
        // case keyCheck.up && keyCheck.right: // haut droite
        //     updatePosition(speed, -speed);
        //     break;
        // case keyCheck.down && keyCheck.left: // bas gauche
        //     updatePosition(-speed, speed);
        //     break;
        // case keyCheck.down && keyCheck.right: // bas droite
        //     updatePosition(speed, speed);
        //     break;
        case keyCheck.up: // haut
            updatePosition(0, -speed);
            break;
        case keyCheck.down: // bas
            updatePosition(0, speed);
            break;
        case keyCheck.left: // gauche
            updatePosition(-speed, 0);
            break;
        case keyCheck.right: // droite
            updatePosition(speed, 0);
            break;
    }

    charPosition.direction = keyCheck.up
        ? 'up'
        : keyCheck.down
        ? 'down'
        : keyCheck.left
        ? 'left'
        : keyCheck.right
        ? 'right'
        : charPosition.direction;

    return charPosition;
};