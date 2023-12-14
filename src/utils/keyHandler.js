export const keyHandler = (e, keyCheck, status) => {
    keyCheck.pressed = status;
    switch (e.keyCode) {
        case 38:
            keyCheck.up = status;
            break;
        case 40:
            keyCheck.down = status;
            break;
        case 37 :
            keyCheck.left = status;
            break;
        case 39:
            keyCheck.right = status;
            break;
    }
}