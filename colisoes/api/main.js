const app = new PIXI.Application({
  width: 700,
  height: 400,
  backgroundColor: 0x274E13,
  transparent: false,
  antialias: true,
})
document.getElementById("sim").appendChild(app.view)
app.renderer.view.style.position = 'absolute';
app.renderer.view.style.left = ((window.innerWidth - app.renderer.width) >> 1) + 'px';
delete PIXI.Renderer.__plugins.interaction;
app.renderer.addSystem(PIXI.InteractionManager, 'events');

const container = new PIXI.Container();
app.stage.addChild(container);


