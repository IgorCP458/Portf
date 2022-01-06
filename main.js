// ----------------------- App setup ----------------------- //
const app = new PIXI.Application({
    width: 1000,
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
const mainStage = new PIXI.Container();
app.stage.addChild(mainStage)

const features = new PIXI.Container();
features.pivot.set(0, 0);
features.position.set(700, 0);
app.stage.addChild(features);

const Graphics = PIXI.Graphics;


// ----------------------- Container 2: Visualization ----------------------- //
const bgTexture = PIXI.Texture.from('./imagens/fundo_novens.jpg');
const background = new PIXI.TilingSprite(
    bgTexture,
    app.screen.width - 300,
    app.screen.height
);
mainStage.addChild(background);

    // Drawing the ground
const ground = mainStage.addChild(
    new Graphics()
        .beginFill(0x488710)
        .lineStyle(1, 0x488710, 1)
        .drawRoundedRect(0, 0, app.renderer.screen.width - 300, 50, 3)
        .endFill(),
);
ground.pivot.set(0, 0);
ground.position.set(0, app.renderer.screen.height - 15)

    // Drawing the cannon ball
const cannonBall = mainStage.addChild(
    new Graphics()
        .beginFill(0xFDDE1B)
        .lineStyle(9, 0x0058A5, 1)
        .drawCircle(0, 0, 20)
        .endFill(),
);
cannonBall.pivot.set(0, 0);
cannonBall.position.set(25, app.renderer.screen.height - 25)

cannonBall.addChild(
    new Graphics()
        .beginFill(0xFF0000)
        .drawStar(0,0, 5, 15, 6, 0)
        .endFill(),
);

    // Drawing the cannon
const cannon = mainStage.addChild(
    new Graphics()
        .beginFill(0x3E3E3E)
        .lineStyle(5, 0x353535, 1)
        .drawPolygon(0, 0, 0, 70, 130, 57.5, 130, 12.5)
        .endFill(),
);
cannon.pivot.set(0, 70 / 2);
cannon.position.set(50 - 25, app.renderer.screen.height - 25);
cannon.rotation = -10 * Math.PI / 180;


const cannonWheel = app.stage.addChild(
    new Graphics()
        .beginFill(0x3E3E3E)
        .lineStyle(7, 0x353535, 1)
        .drawCircle(0, 0, 50)
        .endFill()
);
cannonWheel.pivot.set(0, 0);
cannonWheel.position.set(50 - 25, app.renderer.screen.height - 25);

const target = app.stage.addChild(
    new Graphics()
    .beginFill(0xB90A2D)
    .drawRect(0, 0, 20, 100)
    .endFill()
);
target.pivot.set(10, 50);
target.position.set(690, 50);

target.interactive = true;
target.buttonMode = true;

target.addEventListener('pointerup', targetStopDraggingFunc);
target.addEventListener('pointerupoutside', targetStopDraggingFunc);
target.addEventListener('pointerdown', (anEvent) => {
    app.stage.interactive = true;
    app.stage.addEventListener('pointermove', targetDraggingFunc);
});

function targetStopDraggingFunc(anEvent){
    app.stage.interactive = false;
    app.stage.removeEventListener('pointermove', targetDraggingFunc);
};

function targetDraggingFunc(anEvent){
    target.position.y = Math.max(50,
        Math.min(
            anEvent.data.global.y,
            350 - 15,
        ));
};


// ----------------------- Container 1: setup/features ----------------------- //
const featuresFrame = features.addChild(
    new Graphics()
        .beginFill(0xFFFFFF, 0)
        .lineStyle(6, 0, 1)
        .drawRoundedRect(3, 3, 300 - 7, 400 - 6, 4)
        .endFill(),
);

const startButton = features.addChild(
    new Graphics()
        .beginFill(0xFF0000)
        .lineStyle(4, 0xDF0101, 1)
        .drawRoundedRect(0, 0, 200, 50, 3)
        .endFill(),
);
startButton.position.set(49, 325);

    // Text
buttonText = new PIXI.Text('Iniciar!', {
    fontSize: 20, 
    fill: "0xFFFFFF",
    align: 'center', 
    fontFamily: 'Arial',
    stroke: "0xFFFFFF",
    strokeThickness: 1});
buttonText.anchor.set(0.5, 0.5);
buttonText.position.set(100, 25);
startButton.addChild(buttonText);

thetaInfoText = new PIXI.Text('Ângulo inicial: θ = 10.0°', {
    fontSize: 14, 
    fill: "0x00000",
    align: 'center', 
    fontFamily: 'Arial',
});
thetaInfoText.anchor.set(0, 0);
thetaInfoText.position.set(30, 25 + 15);
features.addChild(thetaInfoText);

vInfoText = new PIXI.Text('Velocidade inicial: v = 0.00 m/s', {
    fontSize: 14, 
    fill: "0x00000",
    align: 'center', 
    fontFamily: 'Arial',
});
vInfoText.anchor.set(0, 0);
vInfoText.position.set(30, 55 + 25 + 15);
features.addChild(vInfoText);

    // Sliders
const thetaSlider = features.addChild(
    new Graphics()
        .beginFill(0x00BFFF, 0.67)
        .drawRect(0, 0, 225, 5)
        .endFill(),
);
thetaSlider.pivot.set(0, 0);
thetaSlider.position.set(37.5, 25 + 45);

const vSlider = features.addChild(
    new Graphics()
        .beginFill(0x00BFFF, 0.67)
        .drawRect(0, 0, 225, 5)
        .endFill(),
);
vSlider.pivot.set(0, 0);
vSlider.position.set(37.5, 25 + 100);

    // Handlers
const thetaHandle = features.addChild(
    new Graphics()
        .beginFill(0x0080FF)
        .drawCircle(0, 0, 7)
        .endFill(),
);
thetaHandle.pivot.set(0,0);
thetaHandle.position.set(37.5, 25 + 45 + 5 / 2);

const vHandle = features.addChild(
    new Graphics()
        .beginFill(0x0080FF)
        .drawCircle(0, 0, 7)
        .endFill(),
);
vHandle.pivot.set(0,0);
vHandle.position.set(37.5, 25 + 100 + 5 / 2);

    // Interactivity
startButton.interactive = true;
startButton.buttonMode = true;

thetaSlider.interactive = true;
thetaHandle.interactive = true;
thetaHandle.buttonMode = true;

vSlider.interactive = true;
vHandle.interactive = true;
vHandle.buttonMode = true;

    // Event listeners
thetaHandle.addEventListener('pointerup', thetaStopDraggingFunc);
thetaHandle.addEventListener('pointerupoutside', thetaStopDraggingFunc);
thetaHandle.addEventListener('pointerdown', (anEvent) => {
    app.stage.interactive = true;
    app.stage.addEventListener('pointermove', thetaDraggingFunc);
});

function thetaStopDraggingFunc(anEvent){
    app.stage.interactive = false;
    app.stage.removeEventListener('pointermove', thetaDraggingFunc);
};

function thetaDraggingFunc(anEvent){
    thetaHandle.position.x = Math.max(37.5,
        Math.min(
            anEvent.data.global.x - 700,
            app.renderer.screen.width - 700 - 37.5,
        ));

    theta = (thetaHandle.position.x - 37.5) / (225 / 80) + 10;
    thetaInfoText.text = `Ângulo inicial: θ = ${theta.toFixed(1)}°`;
    
    cannon.rotation = -theta * (Math.PI/180);
};

vHandle.addEventListener('pointerup', vStopDraggingFunc);
vHandle.addEventListener('pointerupoutside', vStopDraggingFunc);
vHandle.addEventListener('pointerdown', (anEvent) => {
    app.stage.interactive = true;
    app.stage.addEventListener('pointermove', vDraggingFunc);
});

function vStopDraggingFunc(anEvent){
    app.stage.interactive = false;
    app.stage.removeEventListener('pointermove', vDraggingFunc);
};

function vDraggingFunc(anEvent){
    vHandle.position.x = Math.max(37.5,
        Math.min(
            anEvent.data.global.x - 700,
            app.renderer.screen.width - 700 - 37.5,
        ));

    v = (vHandle.position.x - 37.5) / 2.25;
    vInfoText.text = `Velocidade inicial: v = ${v.toFixed(2)} m/s`;
};


// ----------------------- Classes ----------------------- //
let v = 0;
let theta = 10 * (Math.PI / 180);

class Sphere{
    constructor(angle, velocity, initialPos){
        this._angle = angle;
        this._position = initialPos;

        this._position[0] += (25 + 130) * Math.cos(angle);
        this._position[1] -= (25 + 130) * Math.sin(angle);

        this._yVelocity = -velocity * Math.sin(angle);
        this._xVelocity = velocity * Math.cos(angle);    
    }

    get angle(){
        return this._angle;
    }

    get velocity(){
        return this._velocity;
    }

    get position(){
        return this._position;
    }

    updatePosition(t){
        this._position[0] += this._xVelocity * t / 10
        this._position[1] += this._yVelocity * t / 10
        
        this._yVelocity += 0.98 * t
    }
}


// ----------------------- Physics functions ----------------------- //
startButton.addEventListener('pointerdown', (anEvent) => {
    startButton.interactive = false;
    startButton.buttonMode = false;

    target.interactive = false;
    target.buttonMode = false;

    const inicialPos = [cannonBall.position.x, cannonBall.position.y];
    let ballPhysics = new Sphere(theta * Math.PI / 180, v, inicialPos);

    app.ticker.add((delta) => {
        ballPhysics.updatePosition(delta);
        cannonBall.position.set(ballPhysics.position[0], ballPhysics.position[1]);

        if (ballPhysics.position[0] + 20 >= 680 &&
            (ballPhysics.position[1] + 20 >= target.position.y - 55 &&
             ballPhysics.position[1] + 20 <= target.position.y + 45)){

            ballPhysics._xVelocity *= -1;
            ballPhysics._yVelocity *= 0;
            console.log("WIN");

            const win = new PIXI.Text('Você conseguiu!', {
                fontSize: 20, 
                fill: "0x008BC7",
                align: 'center', 
                fontFamily: 'Arial',
                stroke: "0x008BC7",
                strokeThickness: 1});
            win.anchor.set(0.5, 0.5);
            win.position.set(150, 220);
            featuresFrame.addChild(win);

        }else if(ballPhysics.position[0] > 700 - 20){
            ballPhysics._xVelocity *= -1;
            ballPhysics._yVelocity *= 0;
            console.log("FAIL");

            const lose = new PIXI.Text('Você falhou.', {
                fontSize: 20, 
                fill: "0xE40A0A",
                align: 'center', 
                fontFamily: 'Arial',
                stroke: "0xE40A0A",
                strokeThickness: 1});
            lose.anchor.set(0.5, 0.5);
            lose.position.set(150, 220);
            featuresFrame.addChild(lose);

        }else   if(ballPhysics.position[1] + 2 > 400){
            app.ticker.destroy();
        }
        

    });
});