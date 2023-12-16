export const updateCharSpritePosition = (src, keyCheck, charPosition, speed, canvas) => {
    if (keyCheck.up == true){ //haut
        charPosition.direction = 'up';
        if (keyCheck.left == true){ //haut gauche
            
            if (charPosition.X - speed >= 0) charPosition.X -= speed;
            if (charPosition.Y - speed >= 0) charPosition.Y -= speed;
        }
        else if (keyCheck.right == true){ //haut droite
            if (charPosition.X + speed <= canvas.width - src.width) charPosition.X += speed;
            if (charPosition.Y - speed >= 0) charPosition.Y -= speed;
        }
        else if (charPosition.Y - speed >= 0) charPosition.Y -= speed;
    }
    else if (keyCheck.down == true){ //bas
        charPosition.direction = 'down';
        if (keyCheck.left == true){ //bas gauche
            if (charPosition.X - speed >= 0) charPosition.X -= speed;
            if (charPosition.Y +speed <= canvas.height - src.height) charPosition.Y += speed;
        }
        else if (keyCheck.right == true){ //bas droite
            if (charPosition.X + speed <= canvas.width - src.width) charPosition.X += speed;
            if (charPosition.Y +speed <= canvas.height - src.height) charPosition.Y += speed;
        }
        else if (charPosition.Y +speed <= canvas.height - src.height) charPosition.Y += speed; 
    } 
    else if (keyCheck.left == true){ //gauche
        charPosition.direction = 'left';
        if (keyCheck.up == true){ //haut gauche
            if (charPosition.Y - speed >= 0) charPosition.Y -= speed;
            if (charPosition.X - speed >= 0) charPosition.X -= speed;
        }
        else if (keyCheck.down == true){ // bas gauche
            if (charPosition.Y +speed <= canvas.height - src.height) charPosition.Y += speed
            if (charPosition.X - speed >= 0) charPosition.X -= speed;
        }
        else if (charPosition.X - speed >= 0) charPosition.X -= speed;
    } 
    else if (keyCheck.right == true){ //droite
        charPosition.direction = 'right';
        if (keyCheck.up == true){ // droite haut
            if (charPosition.Y - speed >= 0) charPosition.Y -= speed;
            if (charPosition.X + speed <= canvas.width - src.width) charPosition.X += speed;
        }
        else if (keyCheck.down == true){ // droite bas
            if (charPosition.Y +speed <= canvas.height - src.height) charPosition.Y += speed;
            if (charPosition.X + speed <= canvas.width - src.width) charPosition.X += speed;
        }
        else if (charPosition.X + speed <= canvas.width - src.width) charPosition.X += speed;       
    }
    return charPosition;
}