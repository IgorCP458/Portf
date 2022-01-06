// ----------------------- Container 1: setup/features ----------------------- //
const Graphics = PIXI.Graphics;

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
startButton.position.set(50, 325);


    // Text 
m1InfoText = new PIXI.Text('Massa da bola branca: m = 0.10 kg', {
    fontSize: 15, 
    fill: "0x00000",
    align: 'center', 
    fontFamily: 'Arial',
});
m1InfoText.anchor.set(0, 0);
m1InfoText.position.set(27, 30);
features.addChild(m1InfoText);

m2InfoText = new PIXI.Text('Massa da bola oito: m = 0.10 kg', {
    fontSize: 15, 
    fill: "0x00000",
    align: 'center', 
    fontFamily: 'Arial',
});
m2InfoText.anchor.set(0, 0);
m2InfoText.position.set(27, 60 + 30);
features.addChild(m2InfoText);

v1InfoText = new PIXI.Text('Velocidade inicial da bola branca:\nv = 0.1 m/s', {
    fontSize: 15, 
    fill: "0x00000",
    align: 'left', 
    fontFamily: 'Arial',
});
v1InfoText.anchor.set(0, 0);
v1InfoText.position.set(27, 30 + 60 + 30 + 30);
features.addChild(v1InfoText);

thetaInfoText = new PIXI.Text('Ângulo da colisão: 0.00 rad ou 0.00°', {
    fontSize: 15, 
    fill: "0x00000",
    align: 'center', 
    fontFamily: 'Arial',
});
thetaInfoText.anchor.set(0, 0);
thetaInfoText.position.set(27, 225);
features.addChild(thetaInfoText);

currentInfoText = new PIXI.Text('Velocidade da bola branca: 0.1 m/s\nVelocidade da bola oito: 0.0 m/s', {
    fontSize: 15, 
    fill: "0x00000",
    align: 'left', 
    fontFamily: 'Arial',
});
currentInfoText.anchor.set(0, 0);
currentInfoText.position.set(27, 245);
features.addChild(currentInfoText);

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


    // Sliders
const m1Slider = features.addChild(
    new Graphics()
        .beginFill(0x00BFFF, 0.67)
        .drawRect(0, 0, 246, 5)
        .endFill(),
);
m1Slider.pivot.set(0, 0);
m1Slider.position.set(27, 60);

const m2Slider = features.addChild(
    new Graphics()
        .beginFill(0x00BFFF, 0.67)
        .drawRect(0, 0, 246, 5)
        .endFill(),
);
m2Slider.pivot.set(0, 0);
m2Slider.position.set(27, 60 + 30 + 30);

const v1Slider = features.addChild(
    new Graphics()
        .beginFill(0x00BFFF, 0.67)
        .drawRect(0, 0, 246, 5)
        .endFill(),
);
v1Slider.pivot.set(0, 0);
v1Slider.position.set(27, 150 + 30 + 15);


    // Handlers
const m1Handle = features.addChild(
    new Graphics()
        .beginFill(0x0080FF)
        .drawCircle(0, 0, 7)
        .endFill(),
);
m1Handle.pivot.set(0,0);
m1Handle.position.set(27, 60 + 5 / 2);

const m2Handle = features.addChild(
    new Graphics()
        .beginFill(0x0080FF)
        .drawCircle(0, 0, 7)
        .endFill(),
);
m2Handle.pivot.set(0, 0);
m2Handle.position.set(27, 120 + 5 / 2);

const v1Handle = features.addChild(
    new Graphics()
        .beginFill(0x0080FF)
        .drawCircle(0, 0, 7)
        .endFill(),
);
v1Handle.pivot.set(0, 0);
v1Handle.position.set(27, 150 + 30 + 15 + 5 / 2);


    // Interactivity
startButton.interactive = true;
startButton.buttonMode = true;

m1Slider.interactive = true;
m1Handle.interactive = true;
m1Handle.buttonMode = true;

m2Slider.interactive = true;
m2Handle.interactive = true;
m2Handle.buttonMode = true;

v1Slider.interactive = true;
v1Handle.interactive = true;
v1Handle.buttonMode = true;


    // Event listeners
startButton.addEventListener('pointerdown', (anEvent) => {
    startButton.interactive = false;
    startButton.buttonMode = false;
    slider.destroy();

    // Initializing the balls and the interaction
    let whiteBallCenter = [handle.position.x, handle.position.y];
    let blackBallCenter = [eightBall.position.x, eightBall.position.y];

    initialVelocity = [v1 * Math.cos(theta), Math.sin(theta) * v1]

    let whiteBall = new Ball(m1, r1, initialVelocity, whiteBallCenter);
    let blackBall = new Ball(m2, r2, [0, 0], blackBallCenter);

    app.ticker.add(delta => startInteraction(delta, whiteBall, blackBall, theta));
});

m1Handle.addEventListener('pointerup', m1StopDraggingFunc);
m1Handle.addEventListener('pointerupoutside', m1StopDraggingFunc);
m1Handle.addEventListener('pointerdown', (anEvent) => {
    app.stage.interactive = true;
    app.stage.addEventListener('pointermove', m1DraggingFunc);
});

function m1StopDraggingFunc(anEvent){
    app.stage.interactive = false;
    app.stage.removeEventListener('pointermove', m1DraggingFunc);
};

function m1DraggingFunc(anEvent){
    m1Handle.position.x = Math.max(27,
        Math.min(
            anEvent.data.global.x - 736,
            27 + 246,
        ));
    m1 = Math.max(0.1, (m1Handle.position.x - 27) * 5 / 246);
    m1InfoText.text = `Massa da bola branca: m = ${m1.toFixed(2)} kg`;
};

m2Handle.addEventListener('pointerup', m2StopDraggingFunc);
m2Handle.addEventListener('pointerupoutside', m2StopDraggingFunc);
m2Handle.addEventListener('pointerdown', (anEvent) => {
    app.stage.interactive = true;
    app.stage.addEventListener('pointermove', m2DraggingFunc);
});

function m2StopDraggingFunc(anEvent){
    app.stage.interactive = false;
    app.stage.removeEventListener('pointermove', m2DraggingFunc);
};

function m2DraggingFunc(anEvent){
    m2Handle.position.x = Math.max(27,
        Math.min(
            anEvent.data.global.x - 736,
            246 + 27,
        ));
    
    m2 = Math.max(0.1, (m2Handle.position.x - 27) * 5 / 246)
    m2InfoText.text = `Massa da bola oito: m = ${m2.toFixed(2)} kg`;
};

v1Handle.addEventListener('pointerup', v1StopDraggingFunc);
v1Handle.addEventListener('pointerupoutside', v1StopDraggingFunc);
v1Handle.addEventListener('pointerdown', (anEvent) => {
    app.stage.interactive = true;
    app.stage.addEventListener('pointermove', v1DraggingFunc);
});

function v1StopDraggingFunc(anEvent){
    app.stage.interactive = false;
    app.stage.removeEventListener('pointermove', v1DraggingFunc);
};

function v1DraggingFunc(anEvent){
    v1Handle.position.x = Math.max(27,
        Math.min(
            anEvent.data.global.x - 736,
            246 + 27,
        ));
    
    v1 = Math.max(0.1, (v1Handle.position.x - 27) * 10 / 246)
    v1InfoText.text = `Velocidade inicial da bola branca:\n v = ${v1.toFixed(1)} m/s`;
    currentInfoText.text = `Velocidade da bola branca: ${v1.toFixed(1)} m/s\nVelocidade da bola oito: 0.0 m/s`;
};