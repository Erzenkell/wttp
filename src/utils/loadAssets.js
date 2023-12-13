export const loadAssets = async () => {
    const charSprite = require.context('../assets/characters', true);
    console.log(charSprite.keys());
}