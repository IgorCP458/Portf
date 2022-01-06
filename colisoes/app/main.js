// ----------------------- App setup ----------------------- //
const app = new PIXI.Application({
    width: 736 + 300,
    height: 400,
    transparent: false,
    antialias: true,
    backgroundColor: 0xFFFFFF,
});

    // Centralizes app
document.body.appendChild(app.view);
app.renderer.view.style.position = 'absolute';
app.renderer.view.style.left = ((window.innerWidth - app.renderer.width) >> 1) + 'px';

    // Disabling the interaction plugin and adding the possibility of events 
delete PIXI.Renderer.__plugins.interaction;
app.renderer.addSystem(PIXI.InteractionManager, 'events');

    // Creating Containers
const tableBg = new PIXI.Container();
app.stage.addChild(tableBg)

const features = new PIXI.Container();
features.pivot.set(0, 0);
features.position.set(736, 0);
app.stage.addChild(features);

const Graphics = PIXI.Graphics;


// ----------------------- Classes ----------------------- //
let m1 = 0.1;
let v1 = 0.1;
let m2 = 0.1;
let theta = 0;

const r1 = 100;
const r2 = 15;

class Ball{
    constructor(mass, radius, velocity, initialPos){
        this._mass = mass;
        this._radius = radius;
        this._xVelocity = velocity[0];
        this._yVelocity = velocity[1];
        this._positionX = initialPos[0];
        this._positionY = initialPos[1];
    }

    get mass(){
        return this._mass;
    }

    get radius(){
        return this._radius;
    }

    get position(){
        return [this._positionX, this._positionY];
    }

    get velocity(){
        return [this._xVelocity, this._yVelocity];
    }

    updatePos(time){
        this._positionX += this._xVelocity * time;
        this._positionY += this._yVelocity * time; 
    }

    updateVelocity(vX, vY){
        this._xVelocity = vX;
        this._yVelocity = vY;
    }
}


// ----------------------- Physics functions ----------------------- //
function distance(pos1, pos2){
    const x = Math.pow(pos1[0] - pos2[0], 2);
    const y = Math.pow(pos1[1] - pos2[1], 2);

    return Math.sqrt(x + y) <= (r1 + r2);
}


function verticalWallCollision(ball){
    const point = ball.position;
    const velocity = ball.velocity;

    if((verticalWall[0][0] >= point[0] - ball.radius &&
        point[1] >= verticalWall[0][1] && point[1] <= verticalWall[0][2]) ||

       (verticalWall[1][0] <= point[0] + ball.radius &&
        point[1] >= verticalWall[1][1] && point[1] <= verticalWall[1][2])){
            ball.updateVelocity(-velocity[0], velocity[1]);
    }
}
    
function horizontalWallCollision(ball){
    const point = ball.position;
    const velocity = ball.velocity;

    if((horizontalWall[0][0] <= point[0] && horizontalWall[0][1] >= point[0] &&
        horizontalWall[0][2] >= point[1] - ball.radius) ||

       (horizontalWall[1][0] <= point[0] && horizontalWall[1][1] >= point[0] &&
        horizontalWall[1][2] >= point[1] - ball.radius) ||
 
       (horizontalWall[2][0] <= point[0] && horizontalWall[2][1] >= point[0] &&
        horizontalWall[2][2] <= point[1] + ball.radius) ||
 
       (horizontalWall[3][0] <= point[0] && horizontalWall[3][1] >= point[0] &&
        horizontalWall[3][2] <= point[1] + ball.radius)){
           ball.updateVelocity(velocity[0], -velocity[1]);
    }
}
    




function ballCollision(ball1, ball2, angle){
    const pos1 = ball1.position;
    const pos2 = ball2.position;

    const vAux1 = v1 * (m1 - m2) / (m1 + m2);
    const vAux2 = 2 * v1 * m1 / (m1 + m2);
    let vX, vY;

    const dist = distance(pos1, pos2)

    if(dist){
        // Ball 1
        vX = vAux1 * Math.cos(angle);
        vY = vAux1 * Math.sin(angle);
        ball1.updateVelocity(vX, vY);

        // Ball 2
        vX = vAux2 * Math.cos(angle);
        vY = vAux2 * Math.sin(angle);
        ball2.updateVelocity(vX, vY);
    }

    return dist;
}


function startInteraction(delta, whiteBall, blackBall, theta){
    currentInfoText.text = `Velocidade da bola branca: ${whiteBall._xVelocity.toFixed(1)} m/s \nVelocidade da bola oito: ${blackBall._xVelocity.toFixed(1)} m/s`;
    
    // checking for collisions with walls
    verticalWallCollision(whiteBall);
    verticalWallCollision(blackBall);

    horizontalWallCollision(whiteBall);
    horizontalWallCollision(blackBall);
    
    // checking for collisions between the balls
    if(ballCollision(whiteBall, blackBall, theta)){
        ball1 = whiteBall.position;
        ball2 = blackBall.position;
        theta = Math.atan((ball1[1] - ball2[1]) / (ball1[0] - ball2[0]));
    }

    whiteBall.updatePos(delta);
    blackBall.updatePos(delta);

    handle.position.set(whiteBall._positionX, whiteBall._positionY);
    eightBall.position.set(blackBall._positionX, blackBall._positionY);

}
