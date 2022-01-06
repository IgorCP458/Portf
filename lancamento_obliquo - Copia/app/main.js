// ----------------------- App setup ----------------------- //
// -----------Valores que podem ser modificados------------- //

//App
const width = 1000
const height = 400
//Bola:
const raioBola_1 = 20;
const raioBola_2 = 7;
const raioBola = raioBola_1 + raioBola_2;
//Chão
const groundHeight = 50

//---------------------------------------------------------------
const app = new PIXI.Application({
    width: width,
    height: height,
    transparent: false,
    antialias: true,
    backgroundColor: 0xFFFFFF,
});

    // Centralizes app
document.getElementsByClassName("sim")[0].appendChild(app.view);
app.renderer.view.style.position = 'relative';
app.renderer.view.style.right = ((window.innerWidth - app.renderer.width) >> 1) + 'px';

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
const bgTexture = PIXI.Texture.from('./imagens/teste4.png');
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
        .drawRoundedRect(0, 0, app.renderer.screen.width - 295, groundHeight, 3)
        .endFill(),
);
ground.pivot.set(0,0);
ground.position.set(0, app.renderer.screen.height - 50)

    // Drawing the cannon ball
const cannonBall = mainStage.addChild(
    new Graphics()
        .beginFill(0xFDDE1B)
        .lineStyle(raioBola_2, 0x0058A5, 1)
        .drawCircle(0, 0, raioBola_1)
        .endFill(),
);
cannonBall.pivot.set(0, 0);
cannonBall.position.set(0, app.renderer.screen.height - groundHeight)

cannonBall.addChild(
    new Graphics()
        .beginFill(0xFF0000)
        .drawStar(0,0, 5, 5, 11, 0)
        .endFill(),
);
    
    // Drawing the cannon
const cannon = mainStage.addChild(
    new Graphics()
        .beginFill(0x3E3E3E)
        .lineStyle(3, 0x353535, 1)
        .drawPolygon(0, 10, 0, 70, 130, 57.5, 130, 12.5)
        .endFill(),
);
cannon.pivot.set(0, 70);
cannon.position.set(30, app.renderer.screen.height - 25);
cannon.rotation = -45 * Math.PI / 180;
//const cannonBallX = cannon.position.x
//const cannonBallY = cannon.position.y
const cannonBallX = 0
const cannonBallY = 0

const cannonWheel = app.stage.addChild(
    new Graphics()
        .beginFill(0x3E3E3E)
        .lineStyle(5, 0x353535, 1)
        .drawCircle(0, 0, 50)
        .endFill()
);
cannonWheel.pivot.set(0, 35);
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
buttonText = new PIXI.Text('Iniciar !', {
    fontSize: 20, 
    fill: "0xFFFFFF",
    align: 'center', 
    fontFamily: 'Arial',
    stroke: "0xFFFFFF",
    strokeThickness: 0.01});
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
        .drawRoundedRect(0, 0, 225, 5)
        .endFill(),
);
thetaSlider.pivot.set(0, 0);
thetaSlider.position.set(37.5, 25 + 45);

const vSlider = features.addChild(
    new Graphics()
        .beginFill(0x00BFFF, 0.67)
        .drawRoundedRect(0, 0, 225, 5)
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

// ---------------- Resultado (Acertou ou Errou) -----------------
let resultado = new PIXI.Text("")
    resultado.anchor.set(0.5, 0.5);
    resultado.position.set(150, 220);
    featuresFrame.addChild(resultado);

const resultadoWin = new PIXI.TextStyle({
    fontSize: 30, 
    fill: "0x008BC7",
    align: 'center', 
    fontFamily: 'Arial',
    stroke: "0x008BC7",
    strokeThickness: 1
})

const resultadoLose = new PIXI.TextStyle({
    fontSize: 30, 
    fill: "0xE40A0A",
    align: 'center', 
    fontFamily: 'Arial',
    stroke: "0xE40A0A",
    strokeThickness: 1
    
})

// ----------------------- Physics functions ----------------------- //
startButton.addEventListener('pointerdown', (anEvent) => {
    startButton.interactive = true;
    startButton.buttonMode = true;

    target.interactive = true;
    target.buttonMode = true;

    resultado.text = ""
    const inicialPos = [cannonBallX, cannonBallY ];
    let ballPhysics = new Sphere(theta * Math.PI / 180, v, inicialPos);

    app.ticker.add((delta) => {
        ballPhysics.updatePosition(delta);
        cannonBall.position.set(ballPhysics.position[0], ballPhysics.position[1]);

        if (ballPhysics.position[0] + 20 >= 680 &&
            ballPhysics.position[1] + 20 >= target.position.y - 80 &&
             ballPhysics.position[1] + 20 <= target.position.y + 80){

            ballPhysics._xVelocity *= -1;
            ballPhysics._yVelocity *= 0;
            resultado.text = "Você acertou!"
            resultado.style = resultadoWin

        }else if(ballPhysics.position[0] > 700 - 20){
            ballPhysics._xVelocity *= -1;
            ballPhysics._yVelocity *= 0;
            resultado.text = "Você errou!"
            resultado.style = resultadoLose

        }else if(ballPhysics.position[1] + 20 >= 400){
            //app.ticker.destroy();
            ballPhysics._xVelocity *= 0;
            ballPhysics._yVelocity *= 0;
        }
        

    });
});