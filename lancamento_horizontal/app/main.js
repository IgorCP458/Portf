// ----------------------- App setup ----------------------- //
const app = new PIXI.Application({
    width: 600 + 300,
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
mainStage._bakcgroundColor = 0x98E1FF;
app.stage.addChild(mainStage)

const features = new PIXI.Container();
features.pivot.set(0, 0);
features.position.set(600, 0);
app.stage.addChild(features);