export const generateEnemies = (map) => {
    return new Promise((resolve, reject) => {
        try {
            const enemies = [];
            for (let i = 0; i < map.size[0]; i++) {
                for (let j = 0; j < map.size[1]; j++) {
                    if (map.content[i][j].enemy !== false) {
                        const enemy = {
                            "sprite": map.content[i][j].enemy,
                            "position": [i, j],
                            "type": "enemy",
                            "isAlive": true,
                            "isAttacking": false,
                            "isMoving": false,
                            "direction": "down",
                            "life": 3,
                            "attack": 1,
                            "speed": 1,
                            "move": 1,
                            "attackSpeed": 1,
                            "attackRange": 1,
                            "attackCooldown": 0,
                            "moveCooldown": 0,
                            "attackAnimation": 0,
                            "moveAnimation": 0,
                        };
                        enemies.push(enemy);
                    }
                }
            }
            resolve(enemies);
        } catch (error) {
            reject(error);
        }
    });
};
