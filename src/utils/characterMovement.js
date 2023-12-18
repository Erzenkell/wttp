export const updateCharSpritePosition = (src, keyCheck, charPosition, speed, canvas, mapSize) => {
    const isWithinBoundsX = (x) => x >= 0 && x <= canvas.width - src.width;
    const isWithinBoundsY = (y) => y >= 0 && y <= canvas.height - src.height;

    const updatePosition = (deltaX, deltaY) => {
        if (isWithinBoundsX(charPosition.X + deltaX) && isWithinBoundsY(charPosition.Y + deltaY)) {
            charPosition.mapX += deltaX;
            charPosition.mapY += deltaY;
        }
    };

    switch (true) {
        case keyCheck.up && keyCheck.left: // haut gauche
            updatePosition(-speed, -speed);
            break;
        case keyCheck.up && keyCheck.right: // haut droite
            updatePosition(speed, -speed);
            break;
        case keyCheck.down && keyCheck.left: // bas gauche
            updatePosition(-speed, speed);
            break;
        case keyCheck.down && keyCheck.right: // bas droite
            updatePosition(speed, speed);
            break;
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