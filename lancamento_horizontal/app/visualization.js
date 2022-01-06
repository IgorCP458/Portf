// ----------------------- Container 2: Visualization ----------------------- //
const background = mainStage.addChild(
    new Graphics()
        .beginFill(0x98E1FF, 0.87)
        .drawRect(0, 0, 600, 400)
        .endFill()
);

const table = mainStage.addChild(
    new Graphics()
        .beginFill(0x542601, 1)
        .drawRect(0, 350, 600, 50)
        .endFill()
);

const tower = mainStage.addChild(
    new Graphics()
        .beginFill(0x713D12, 1)
        .drawRoundedRect(75, 150, 100, 200, 2.5)
        .endFill()
);

    // Drawing string with length L = 123
const string = 
    new Graphics()
        .lineStyle(1, 0x0, 1)
        .moveTo(137.5, 20 + 7)
        .lineTo(14.5, 20 + 7)
mainStage.addChild(string);

const support = mainStage.addChild(
    new Graphics()
        .beginFill(0x713D12, 1)
        .drawRoundedRect(137.5 - 15 / 2, 20, 15, 135, 3)
        .endFill()
);

const targetBall = mainStage.addChild(
    new Graphics()
        .beginFill(0xC60F33)
        .lineStyle(2, 0xB90A2D, 1)
        .drawCircle(163, 150 - 15, 15)
        .endFill(),
);

const pendulumBall = mainStage.addChild(
    new Graphics()
        .beginFill(0xC60F33)
        .lineStyle(2, 0xB90A2D, 1)
        .drawCircle(14.5, 20 + 7, 15)
        .endFill(),
);

string.destroy();

string.moveTo(10,10);
string.lineTo(0,0);