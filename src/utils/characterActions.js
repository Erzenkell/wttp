export const attackButton = (charPosition, assets, context, frame, global) => { // Maximum width for the sprite
        const spriteIndex = Math.floor(frame*2 / 12);
        const sprite = assets.sword[spriteIndex];
        //const charAspectRatio = assets.hero[0].width / assets.hero[0].height;
        const height = global.scale * sprite.height;
        const width =  global.scale * sprite.width;
        context.drawImage(sprite, charPosition.X - assets.hero[0].width - global.scale * spriteIndex, (charPosition.Y + assets.hero[0].height / 2) + global.scale * spriteIndex, width, height);
};
