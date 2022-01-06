// ----------------------- Container 2: Visualization ----------------------- //
const bgTexture = PIXI.Texture.from('./imagens/background_mesa.jpg');
const background = new PIXI.TilingSprite(bgTexture, 736, 400);
tableBg.addChild(background);


    // White ball slider and handle
const slider = new Graphics()
    .beginFill(0x479b4d, 0.87)
    .drawRect(0, 0, 8, tableBg.height - 2*44)
    .endFill()

tableBg.addChild(slider);
slider.pivot.set(0, 0);
slider.position.set(67, 44.5)

const handle = tableBg.addChild(
    new Graphics()
        .beginFill(0xffffff)
        .drawCircle(0, 0, r1)
        .endFill(),
);
handle.pivot.set(0, 0);
handle.position.set(slider.width / 2 + 67, slider.height / 2 + 44.5);


    // Black eight ball
const eightBall = tableBg.addChild(
    new Graphics()
        .beginFill(0x00000)
        .drawCircle(0, 0, r2)
        .endFill(),
);

eightBall.addChild(
    new Graphics()
        .beginFill(0xffffff)
        .drawCircle(0, 0, r2 / 2)
        .endFill(),
);

eight = new PIXI.Text('8', {
    fontSize: r2, 
    align: 'center', 
    fontFamily: 'Arial',
    stroke: "0x00000",
    strokeThickness: 1});

eight.anchor.set(0.5, 0.5);
eight.position.set(0, 0);

eightBall.addChild(eight);
eightBall.pivot.set(0,0);
eightBall.position.set(tableBg.width / 2, slider.height / 2 + 44.5);


// Interactivity
slider.interactive = true;
handle.interactive = true;
handle.buttonMode = true;

handle.addEventListener('pointerup', stopDraggingFunc);
handle.addEventListener('pointerupoutside', stopDraggingFunc);
handle.addEventListener('pointerdown', (anEvent) => {
    app.stage.interactive = true;
    app.stage.addEventListener('pointermove', draggingFunc);
});

function stopDraggingFunc(anEvent){
    app.stage.interactive = false;
    app.stage.removeEventListener('pointermove', draggingFunc);
};

function draggingFunc(anEvent){
    handle.position.y = Math.max((44.5 + r1),
        Math.min(
            anEvent.data.global.y,
            app.renderer.screen.height - (44.5 + r1),
        ));
    
    theta = Math.atan((200 - handle.position.y) / (eightBall.position.x - handle.position.x));
    degrees = theta * 180 / Math.PI
    
    thetaInfoText.text = `Ângulo da colisão: ${theta.toFixed(2)} rad ou ${degrees.toFixed(2)}°`;
};


    // Borders and holes
const hole1 = tableBg.addChild(
    new Graphics()
        .beginFill(0x037370, 0)
        .lineStyle(1, 0x037370, 1)
        .drawCircle(0, 0, 16)
        .endFill(),
); 
hole1.pivot.set(0,0);
hole1.position.set(32, 32)
    
const hole2 = tableBg.addChild(
    new Graphics()
        .beginFill(0x037370, 0)
        .lineStyle(1, 0x037370, 1)
        .drawCircle(0, 0, 16)
        .endFill(),
);
hole2.pivot.set(0,0);
hole2.position.set(736 / 2, 32)
    
const hole3 = tableBg.addChild(
    new Graphics()
        .beginFill(0x037370, 0)
        .lineStyle(1, 0x037370, 1)
        .drawCircle(0, 0, 16)
        .endFill(),
);
hole3.pivot.set(0,0);
hole3.position.set(736 - 32, 32)
    
const hole4 = tableBg.addChild(
    new Graphics()
        .beginFill(0x037370, 0)
        .lineStyle(1, 0x037370, 1)
        .drawCircle(0, 0, 16)
        .endFill(),
);
hole4.pivot.set(0,0);
hole4.position.set(736 - 32, 400 - 32)

const hole5 = tableBg.addChild(
    new Graphics()
        .beginFill(0x037370, 0)
        .lineStyle(1, 0x037370, 1)
        .drawCircle(0, 0, 16)
        .endFill(),
);
hole5.pivot.set(0,0);
hole5.position.set(736 / 2, 400 - 32)

const hole6 = tableBg.addChild(
    new Graphics()
        .beginFill(0x037370, 0)
        .lineStyle(1, 0x037370, 1)
        .drawCircle(0, 0, 16)
        .endFill(),
);
hole6.pivot.set(0,0);
hole6.position.set(32, 400 - 32)

const bound1 = tableBg.addChild(
    new Graphics()
        .lineStyle(1, 0xffffff, 1)
        .moveTo(49, 29)
        .lineTo(65, 44.5),
);

const bound18 = tableBg.addChild(
    new Graphics()
        .lineStyle(1, 0xffffff, 1)
        .moveTo(44.5, 44.5 + 22)
        .lineTo(44.5 - 18, 48),
);
 

/*const bound2 = tableBg.addChild(
    new Graphics()
        .lineStyle(1, 0xffffff, 1)
        .moveTo(65, 44.5)
        .lineTo(736 / 2 - 22, 44.5),
);*/

const bound3 = tableBg.addChild(
    new Graphics()
        .lineStyle(1, 0xffffff, 1)
        .moveTo(736 / 2 - 22, 44.5)
        .lineTo(736 / 2 - 16, 32),
);

const bound4 = tableBg.addChild(
    new Graphics()
        .lineStyle(1, 0xffffff, 1)
        .moveTo(736 / 2 + 16, 32)
        .lineTo(736 / 2 + 22, 44.5),
);

/*const bound5 = tableBg.addChild(
    new Graphics()
        .lineStyle(1, 0xffffff, 1)
        .moveTo(736 / 2 + 22, 44.5)
        .lineTo(736 - 65, 44.5),
);*/

const bound6 = tableBg.addChild(
    new Graphics()
        .lineStyle(1, 0xffffff, 1)
        .moveTo(736 - 65, 44.5)
        .lineTo(736 - 48, 30),
);

const bound7 = tableBg.addChild(
    new Graphics()
        .lineStyle(1, 0xffffff, 1)
        .moveTo(736 - 26, 48)
        .lineTo(736 - 44.5, 44.5 + 22),
);

const bound9 = tableBg.addChild(
    new Graphics()
        .lineStyle(1, 0xffffff, 1)
        .moveTo(736 - 44.5, 400 - 44.5 - 21)
        .lineTo(736 - 26, 400 - 47),
);

const bound10 = tableBg.addChild(
    new Graphics()
        .lineStyle(1, 0xffffff, 1)
        .moveTo(736 - 48, 400 - 28)
        .lineTo(736 - 65, 400 - 44.5),
);
   
/*const bound11 = tableBg.addChild(
    new Graphics()
        .lineStyle(1, 0xffffff, 1)
        .moveTo(736 - 65, 400 - 44.5)
        .lineTo(736 / 2 + 22, 400 - 44.5),
);*/

const bound12 = tableBg.addChild(
    new Graphics()
        .lineStyle(1, 0xffffff, 1)
        .moveTo(736 / 2 + 22, 400 - 44.5)
        .lineTo(736 / 2 + 16, 400 - 32),
);

const bound13 = tableBg.addChild(
    new Graphics()
        .lineStyle(1, 0xffffff, 1)
        .moveTo(736 / 2 - 16, 400 - 32)
        .lineTo(736 / 2 - 22, 400 - 44.5),
);

/*const bound14 = tableBg.addChild(
    new Graphics()
        .lineStyle(1, 0xffffff, 1)
        .moveTo(736 / 2 - 22, 400 - 44.5)
        .lineTo(65, 400 - 44.5),
);*/

/*const bound15 = tableBg.addChild(
    new Graphics()
        .lineStyle(1, 0xffffff, 1)
        .moveTo(65, 400 - 44.5)
        .lineTo(48, 400 - 28),
);

const bound16 = tableBg.addChild(
    new Graphics()
        .lineStyle(1, 0xffffff, 1)
        .moveTo(27, 400 - 48)
        .lineTo(44.5, 400 - 44.5 - 22),
);*/


   



const wallCoeff = new Array(18);

const verticalWall = new Array(2);
const horizontalWall = new Array(4);

verticalWall[0] = [44.5, 44.5 + 22, 400 - (44.5 + 22)];
verticalWall[1] = [736 - 44.5, 44.5 + 22, 400 - (44.5 + 22)];

horizontalWall[0] = [65, 736 / 2 - 22, 44.5]; 
horizontalWall[1] = [736 / 2 + 22, 736 - 65, 44.5];
horizontalWall[2] = [736 / 2 + 22, 736 - 65, 400 - 44.5];
horizontalWall[3] = [65, 736 / 2 - 22, 400 - 44.5];



wallCoeff[0] = [48, 32, 65, 44.5];
wallCoeff[1] = [65, 44.5, 736 / 2 - 22, 44.5];
wallCoeff[2] = [736 / 2 - 22, 44.5, 736 / 2 - 16, 32];
wallCoeff[3] = [736 / 2 + 16, 32, 736 / 2 + 22, 44.5];
wallCoeff[4] = [736 / 2 + 22, 44.5, 736 - 65, 44.5];
wallCoeff[5] = [736 - 65, 44.5, 736 - 48, 30];
wallCoeff[6] = [736 - 26, 48, 736 - 44.5, 44.5 + 22];
wallCoeff[7] = [736 - 44.5, 44.5 + 22, 736 - 44.5, 400 - 44.5 - 22];
wallCoeff[8] = [736 - 44.5, 400 - 44.5 - 22, 736 - 30, 400 - 48];
wallCoeff[9] = [736 - 48, 400 - 28, 736 - 65, 400 - 44.5];
wallCoeff[10] = [736 - 65, 400 - 44.5, 736 / 2 + 22, 400 - 44.5];
wallCoeff[11] = [736 / 2 + 22, 400 - 44.5, 736 / 2 + 16, 400 - 32];
wallCoeff[12] = [736 / 2 - 16, 400 - 32, 736 / 2 - 22, 400 - 44.5];
wallCoeff[13] = [736 / 2 - 22, 400 - 44.5, 65, 400 - 44.5];
wallCoeff[14] = [65, 400 - 44.5, 48, 400 - 28];
wallCoeff[15] = [27, 400 - 48, 44.5, 400 - 44.5 - 22];
wallCoeff[16] = [44.5, 400 - 44.5 - 22, 44.5, 44.5 + 22];
wallCoeff[17] = [44.5, 44.5 + 22, 44.5 - 18, 48];
