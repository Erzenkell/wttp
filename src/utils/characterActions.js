export const attackButton = (charPosition, assets, context, frame, global) => { // Maximum width for the sprite
        const spriteIndex = Math.floor(frame*2 / 12);
        const sprite = assets.sword[spriteIndex];
        //const charAspectRatio = assets.hero[0].width / assets.hero[0].height;
        const height = global.scale * sprite.height;
        const width =  global.scale * sprite.width;
        context.drawImage(sprite, charPosition.X - assets.hero[0].width - global.scale * spriteIndex, (charPosition.Y + assets.hero[0].height / 2) + global.scale * spriteIndex, width, height);
};

export const interactionButton = (charPosition, npcList, global) => {
        if(charPosition.direction === 'up') {
                const npc = npcList.find((npc) => (npc.position[0] + npc.sprite.height * global.scale) - (charPosition.X + global.characterSize[0]) <= 0 && (npc.position[1] + npc.sprite.width * global.scale) - (charPosition.Y) <= 0);
                if(npc) {
                        console.log('npc found');
                        return npc;
                }
        }
        return false;
};