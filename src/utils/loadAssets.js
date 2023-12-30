const importImages = async (type, spe, path) => {
    const charResponse = await fetch(`${path}/${type}/${spe}.json`);
    const charFileNames = await charResponse.json();

    const charImagePromises = charFileNames.map(async (fileName) => {
        const imageUrl = `${path}/${type}/${fileName}`;
        const image = new Image();

        // Create a promise that resolves when the image is loaded
        const imageLoadedPromise = new Promise((resolve) => {
            image.onload = () => resolve(image);
        });

        // Set the image source to start loading
        image.src = imageUrl;

        // Wait for the image to load
        await imageLoadedPromise;

        return image;
    });

    return Promise.all(charImagePromises);
}

export const loadAssets = async () => {
    const path = '/src/assets/sprite';
    const Assets = {};
    const characterSprites = await importImages('character/link', 'link', path);
    const swordSprites = await importImages('sword', 'sword', path);
    const worldSprites = await importImages('map', 'world', path);
    const enemiesSprites = await importImages('enemies', 'enemies', path);
    Assets.hero = characterSprites;
    Assets.sword = swordSprites;
    Assets.world = worldSprites;
    Assets.enemies = enemiesSprites;
    return Assets;
}