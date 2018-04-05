import {enchant, Sprite, Core} from "./enchant.js";

enchant(); // initialize
var game = new Core(320, 320); // game stage
game.preload('chara1.png'); // preload image
game.fps = 20;

class Bear extends Sprite {
    x : number;
    y : number;
    image: any;
    frame: any;
    tl: any;
    constructor(width, height) {
        super(width, height);
        this.image = game.assets['chara1.png'];
        this.frame = [6, 6, 7, 7];
    }
    setPlace(x, y) {
        this.x = x;
        this.y = y;
    }
    move() {
        this.tl.moveBy(288, 0, 90)   // move right
            .scaleTo(-1, 1, 10)      // turn left
            .moveBy(-288, 0, 90)     // move left
            .scaleTo(1, 1, 10)       // turn right
            .loop();                 // loop it
    }
}

game.onload = function () {
    let bear = new Bear(32, 32);
    bear.setPlace(0, 0);
    game.rootScene.addChild(bear);
    bear.move();
};

game.start(); // start your game!