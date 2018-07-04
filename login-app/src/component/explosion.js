import * as Pixi from 'pixi.js';
import 'pixi-layers';

export default class Explosion {

    constructor(explodeGroup, judgeMarkGroup){
        this.explodeGroup = explodeGroup;
        this.judgeMarkGroup = judgeMarkGroup;
        this.container = new Pixi.Container();
        this.explodeLower = [];
        this.explodeUpper = [];
        this.judgeMark = [];
        //this.initialize();
    }

    initialize = () => {
        this.createExploSprite();
    }

    createExploSprite = () => {
        let exploLoBase = Pixi.TextureCache["img/explosion_lower.png"];

        // Lower
        var frames = []
        for (let j=0; j<4; j++) {
            frames = []
            frames.push(new Pixi.Texture(exploLoBase, new Pixi.Rectangle(0, 0, 0, 0)))
            for (let i=0; i<10; i++) {
                frames.push(new Pixi.Texture(exploLoBase, new Pixi.Rectangle(i*104, j*104, 104, 104)))
            }
            frames.push(new Pixi.Texture(exploLoBase, new Pixi.Rectangle(0, 0, 0, 0)))    

            this.explodeLower[j] = new Pixi.extras.AnimatedSprite(frames);
            this.explodeLower[j].x = 146;
            this.explodeLower[j].y = 71;
            this.explodeLower[j].animationSpeed = 0.75;    

            this.explodeLower[j].parentGroup = this.explodeGroup;
            this.explodeLower[j].loop = false;
            this.container.addChild(this.explodeLower[j]);
        }

        let exploUpBase = Pixi.TextureCache["img/explosion_upper.png"];

        // upper
        for (let j=0; j<2; j++) {
            frames = []
            frames.push(new Pixi.Texture(exploUpBase, new Pixi.Rectangle(0, 0, 0, 0)))
            for (let i=0; i<4; i++) {
                frames.push(new Pixi.Texture(exploUpBase, new Pixi.Rectangle(i*134, j*136, 134, 136)))
            }
            frames.push(new Pixi.Texture(exploUpBase, new Pixi.Rectangle(0, 0, 0, 0)))    

            this.explodeUpper[j] = new Pixi.extras.AnimatedSprite(frames);
            this.explodeUpper[j].x = 131;
            this.explodeUpper[j].y = 56;
            this.explodeUpper[j].animationSpeed = 0.35;
            this.explodeUpper[j].parentGroup = this.explodeGroup;
            this.explodeUpper[j].loop = false;
            this.container.addChild(this.explodeUpper[j]);
        }

        // upper Big
        for (let j=2; j<4; j++) {
            frames = []
            frames.push(new Pixi.Texture(exploUpBase, new Pixi.Rectangle(0, 0, 0, 0)))
            for (let i=0; i<11; i++) {
                frames.push(new Pixi.Texture(exploUpBase, new Pixi.Rectangle(i*134, j*136, 134, 136)))
            }
            frames.push(new Pixi.Texture(exploUpBase, new Pixi.Rectangle(0, 0, 0, 0)))    

            this.explodeUpper[j] = new Pixi.extras.AnimatedSprite(frames);
            this.explodeUpper[j].x = 131;
            this.explodeUpper[j].y = 56;
            this.explodeUpper[j].animationSpeed = 0.75;
            this.explodeUpper[j].parentGroup = this.explodeGroup;
            this.explodeUpper[j].loop = false;
            this.container.addChild(this.explodeUpper[j]);
        }

        let judgeBase = Pixi.TextureCache["img/judgement.png"];

        // upper
        for (let j=0; j<3; j++) {
            frames = []
            frames.push(new Pixi.Texture(judgeBase, new Pixi.Rectangle(0, 0, 0, 0)))
            for (let i=0; i<10; i++) {
                frames.push(new Pixi.Texture(judgeBase, new Pixi.Rectangle(0, j*32, 45, 32)))
            }
            frames.push(new Pixi.Texture(judgeBase, new Pixi.Rectangle(0, 0, 0, 0)))    

            this.judgeMark[j] = new Pixi.extras.AnimatedSprite(frames);
            this.judgeMark[j].x = 175;
            this.judgeMark[j].y = 68;
            this.judgeMark[j].animationSpeed = 0.75;
            this.judgeMark[j].parentGroup = this.judgeMarkGroup;
            this.judgeMark[j].loop = false;
            this.container.addChild(this.judgeMark[j]);
        }
    }

    exploSmallPerfect = () => {
        this.explodeLower[0].gotoAndPlay(0);
        this.explodeUpper[0].gotoAndPlay(0);
        this.judgeMark[0].gotoAndPlay(0);
    }
    exploSmallGood = () => {
        this.explodeLower[1].gotoAndPlay(0);
        this.explodeUpper[1].gotoAndPlay(0);
        this.judgeMark[1].gotoAndPlay(0);
    }
    exploBigPerfect = () => {
        this.explodeLower[2].gotoAndPlay(0);
        this.explodeUpper[2].gotoAndPlay(0);
        this.judgeMark[0].gotoAndPlay(0);
    }
    exploBigGood = () => {
        this.explodeLower[3].gotoAndPlay(0);
        this.explodeUpper[3].gotoAndPlay(0);
        this.judgeMark[1].gotoAndPlay(0);
    }
    exploBad = () => {
        this.judgeMark[2].gotoAndPlay(0);
    }

}