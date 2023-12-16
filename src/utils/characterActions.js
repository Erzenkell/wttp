export const attackButton = (charPosition, assets, context, frame) => { // Maximum width for the sprite
        const animate = () => {
            const spriteIndex = Math.floor(frame*2 / 12);
            drawFrame(assets.sword[spriteIndex]);
        };

        const drawFrame = (sprite) => {
            const charAspectRatio = assets.hero[0].width / assets.hero[0].height;
            const height = 3 * sprite.height / charAspectRatio;
            const width = 4 * sprite.width / charAspectRatio;

            // Scale the sprite based on the new width
            context.drawImage(sprite, charPosition.X - width, charPosition.Y + height / 2, width, height);
        };

        animate();
};
