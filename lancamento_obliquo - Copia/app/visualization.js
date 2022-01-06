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
console.log(cannonBall.position.x + " " + cannonBall.position.y)

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


const cannonWheel = app.stage.addChild(
    new Graphics()
        .beginFill(0x3E3E3E)
        .lineStyle(7, 0x353535, 1)
        .drawCircle(0, 0, 50)
        .endFill()
);
cannonWheel.pivot.set(0, 0);
cannonWheel.position.set(50 - 25, app.renderer.screen.height - 25);

