const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d')

canvas.width = innerWidth - 4;
canvas.height = innerHeight - 4;

const keys = {left: 'ArrowLeft', right: 'ArrowRight', space: ' '};
let keyPressed = {left: false, right: false};
speed = 10;

class Player {
    constructor(){
        this.width = 60;
        this.height = 60;
        this.position = {x:100, y:100};
        this.velocity = {x:0, y:0};
    }

    draw(){
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        this.physics();
        ctx.fillStyle = '#f00';
        ctx.fillRect(this.position.x,this.position.y,this.width,this.height);
    }
    move(){
        if (keyPressed.right) {
            this.velocity.x = speed;
        }else if (keyPressed.left) {
            this.velocity.x = -speed;
        }
        else{
            this.velocity.x = 0;
        }
    }
    physics(){

        if ((this.height + this.position.y + this.velocity.y) < canvas.height) {
            if (this.position.x < (block.position.x + block.width) && (this.position.x + this.width) > block.position.x && (this.position.y + this.height + this.velocity.y >= block.position.y) && (this.position.y + this.height) <= block.position.y) {
                this.velocity.y = 0;
            }else{
            	this.velocity.y += 1;
            }
        }else{
            this.velocity.y = 0;
        }

        this.move();
    }
}

class Block {
    constructor (x, y, width, height) {
        this.width = width;
        this.height = height;
        this.position = {x,y};
    }
    draw() {
        ctx.fillStyle = "#0f0";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

let block = new Block(400,400,300,70);
let player = new Player();

function animate() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width,canvas.height);

    block.draw();
    player.draw();
    requestAnimationFrame(animate);
}

animate();

addEventListener('keydown', function (e) {
    if (e.key === keys.left) {
        keyPressed.left = true;
    }else if (e.key === keys.right) {
        keyPressed.right = true;
    }
});
addEventListener('keyup', function (e) {
    if (e.key === keys.left) {
        keyPressed.left = false;
    }else if (e.key === keys.right) {
        keyPressed.right = false;
    }
});
addEventListener('keydown', function (e) {
    if (e.key === keys.space && player.velocity.y == 0) {    
        player.velocity.y -= 25;
    }
    console.log(e.key);
});