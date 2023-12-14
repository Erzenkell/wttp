export const attackButton = (charPosition, assets, context) => {
    const sprite = assets.sword[0];
    let aspectRatio = sprite.width / sprite.height;
    let height = 100;
    let width = height * aspectRatio;
    context.drawImage(assets.sword[0], charPosition.X, charPosition.Y, width, height);
}