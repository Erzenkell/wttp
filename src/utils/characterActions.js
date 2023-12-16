export const attackButton = (charPosition, assets, context, frame) => { // Maximum width for the sprite
        const spriteIndex = Math.floor(frame*2 / 12);
        const sprite = assets.sword[spriteIndex];
        const charAspectRatio = assets.hero[0].width / assets.hero[0].height;
        const height = 3 * sprite.height / charAspectRatio;
        const width = 4 * sprite.width / charAspectRatio;
        context.drawImage(sprite, charPosition.X - width - 4 * spriteIndex, (charPosition.Y + height / 2) + 3 * spriteIndex, width, height);
};
