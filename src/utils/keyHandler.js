export const keyHandler = (e, keyCheck, status) => {
    keyCheck.pressed = status;
    switch (e.keyCode) {
        case 38:
            keyCheck.up = status;
            keyCheck.movement = status;
            break;
        case 40:
            keyCheck.down = status;
            keyCheck.movement = status;
            break;
        case 37 :
            keyCheck.left = status;
            keyCheck.movement = status;
            break;
        case 39:
            keyCheck.right = status;
            keyCheck.movement = status;
            break;
        case 32:
            keyCheck.movement = false;
            keyCheck.space = status;
            break;
        case 13:
            keyCheck.movement = false;
            keyCheck.enter = status;
            break;
    }
}