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

    v = (vHandle.position.x - 37.5) / 22.5;
    vInfoText.text = `Velocidade inicial: v = ${v.toFixed(2)} m/s`;
};