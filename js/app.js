// 这是我们的玩家要躲避的敌人 
class Enemy {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        // 敌人的图片，用一个我们提供的工具函数来轻松的加载文件
        this.sprite = 'images/enemy-bug.png';
    }

    // 此为游戏必须的函数，用来更新敌人的位置
    // 参数: dt ，表示时间间隙
    update(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
        this.x += dt * this.speed;

        if (this.x > 404) {
            this.x = -101;
            this.y = 55 + (Math.floor(Math.random() * 3) * 83);
            //离开画面后提速
            this.speed = Math.floor(Math.random() * (500 - 150 + 1)) + 150;
        }
    }

// 此为游戏必须的函数，用来在屏幕上画出敌人，
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}


// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.goal = false;
        // BUG：无法随机人物，只有boy能正常运行
        /*const kings = [
            'images/char-boy.png',
            'images/char-cat-girl.png',
            'images/char-horn-girl.png',
            'images/char-pink-girl.png',
            'images/char-princess-girl.png',
        ];
        const chooseIndex = (min, max) => {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }*/
        this.king = /*kings[chooseIndex(0, kings.length)]*/'images/char-boy.png';
    }

    update(dx = 0, dy = 0) {
        this.x += dx * 101;
        this.y += dy * 83;
        //边界确认-右-左-下-上
        if (this.x > 404) {
            this.x = 404;
        }

        if (this.x < 0) {
            this.x = 0;
        }

        if (this.y > 83 * 4 + 55) {
            this.y = 83 * 4 + 55;
        }

        if (this.y < 55) {
            this.y = 55;
            this.goal = true;
            alert('you win');
            window.location.reload();
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.king), this.x, this.y);
    }

    handleInput(operations) {
        switch (operations) {
            case 'up': {
                this.update(0, -1);
                break;
            }
            case 'down': {
                this.update(0, 1);
                break;
            }
            case 'left': {
                this.update(-1, 0);
                break;
            }
            case 'right': {
                this.update(1, 0);
                break;
            }
        }
    }

    
}

// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
let allEnemies = [];
const createEnemy = function() {
    const y = 55 + (Math.floor(Math.random() * 3) * 83);
    //速度区间100-300
    const speed = Math.floor(Math.random() * (300 - 100 + 1)) + 100;
    const enemy = new Enemy(-101, y, speed);
    allEnemies.push(enemy);
    //敌人个数设置
    if (allEnemies.length === 3) {
        clearInterval(countSetting);
    }
}
let countSetting = setInterval(createEnemy, 1000);

let playerx = Math.floor(Math.random() * 5) * 101;
let playery = 55 + 83 * 4;
let player = new Player(playerx, playery);

//碰撞检测
function checkCollisions() {
    allEnemies.map((enemy) => {
        if (enemy.x - 101 < player.x && enemy.x + 101 > player.x && enemy.y === player.y) {
            player.x = Math.floor(Math.random() * 5) * 101;
            player.y = 55 + 83 * 4;

        }
        console.log(player.x);
        console.log(enemy.x);
    })
}



// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Player.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
