export const keyHandler = (e, keyCheck, status) => {
    keyCheck.pressed = status;
    switch (e.keyCode) {
        case 38:
            keyCheck.movement = status;
            keyCheck.up = status;
            break;
        case 40:
            keyCheck.movement = status;
            keyCheck.down = status;
            break;
        case 37 :
            keyCheck.movement = status;
            keyCheck.left = status;
            break;
        case 39:
            keyCheck.movement = status;
            keyCheck.right = status;
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