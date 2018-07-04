import * as Pixi from 'pixi.js';
import 'pixi-layers';

export default class Background {
    constructor(bgGroup, mTaikoGroup, endGroup){
        this.bgGroup = bgGroup;
        this.mTaikoGroup = mTaikoGroup;
        this.endGroup = endGroup;
        this.container = new Pixi.Container();
        this.initialize();
    }

    initialize = () => {
        this.addBackground();
    }

    addBackground = () => {
        // before start
        var texture = Pixi.Texture.fromImage("img/blind_result.png");
        this.blind = new Pixi.Sprite(texture);
        this.blind.height = 360;
        this.blind.width = 640;
        this.blind.x = 0;
        this.blind.y = 0;
        this.blind.parentGroup = this.endGroup;
        this.container.addChild(this.blind);

        // set background
        texture = Pixi.Texture.fromImage("img/bg.png");
        this.bg = new Pixi.Sprite(texture);
        this.bg.height = 360;
        this.bg.width = 640;
        this.bg.x = 0;
        this.bg.y = 0;
        this.bg.parentGroup = this.bgGroup;
        this.container.addChild(this.bg);

        texture = Pixi.Texture.fromImage("img/bg_clear.png");
        this.clearbg = new Pixi.Sprite(texture);
        this.clearbg.height = 360;
        this.clearbg.width = 640;
        this.clearbg.x = 0;
        this.clearbg.y = 0;
        this.clearbg.visible = false;
        this.clearbg.parentGroup = this.bgGroup;
        this.container.addChild(this.clearbg);

        texture = Pixi.Texture.fromImage("img/rollballoon.png");
        this.lenda = new Pixi.Sprite(texture);
        this.lenda.x = 95;
        this.lenda.y = 0;
        this.lenda.parentGroup = this.endGroup;
        this.lenda.visible = false;
        this.container.addChild(this.lenda);

        // set endBack
        texture = Pixi.Texture.fromImage("img/resultbg_clear.png");
        this.endBack = new Pixi.Sprite(texture);
        this.endBack.height = 360;
        this.endBack.width = 640;
        this.endBack.x = 0;
        this.endBack.y = 0;
        this.endBack.parentGroup = this.endGroup;
        this.endBack.visible = false;
        this.container.addChild(this.endBack);

        // set mask
        texture = Pixi.Texture.fromImage("img/mTaiko.png");
        var mTaiko = new Pixi.Sprite(texture);
        mTaiko.height = 177;
        mTaiko.width = 640;
        mTaiko.x = 0;
        mTaiko.y = 0;
        mTaiko.parentGroup = this.mTaikoGroup;
        this.container.addChild(mTaiko);

        // oni
        texture = Pixi.Texture.fromImage("img/coursesymbol_oni.png");
        var oni = new Pixi.Sprite(texture);
        oni.height = 64;
        oni.width = 64;
        oni.x = 10;
        oni.y = 108;
        oni.parentGroup = this.mTaikoGroup;
        this.container.addChild(oni);

        // chracter
        var frames = [];

        texture = Pixi.Texture.fromImage("img/chracter.png");
        var xoffset = 15;
        var yoffset = 53;
        var c1 = new Pixi.Texture(texture, new Pixi.Rectangle(0 + xoffset, 0 + yoffset, 192 - xoffset, 192 - yoffset));
        var c2 = new Pixi.Texture(texture, new Pixi.Rectangle(192 + xoffset, 0 + yoffset, 192 - xoffset, 192 - yoffset));
        frames.push(c1);
        frames.push(c2);
        this.char = new Pixi.extras.AnimatedSprite(frames);
        this.char.x = 0;
        this.char.y = 0;
        this.char.parentGroup = this.bgGroup;
        this.char.animationSpeed = 0.07;
        this.container.addChild(this.char);

        // dancer
        frames = [];
        for(let i=1; i<17; i++) {
            texture = Pixi.Texture.fromImage("img/dancer/dancer_1n" + i + ".png");
            frames.push(texture);
        }
        this.dancer = new Pixi.extras.AnimatedSprite(frames);
        this.dancer.x = 227;
        this.dancer.y = 160;
        this.dancer.parentGroup = this.mTaikoGroup;
        this.dancer.animationSpeed = 0.2;
        this.container.addChild(this.dancer);

        // soul
        frames = [];
        texture = Pixi.Texture.fromImage("img/normagauge.png");

        // soul base
        var soulBase1 = new Pixi.Sprite(new Pixi.Texture(texture, new Pixi.Rectangle(0, 0, 6*28, 24)));
        soulBase1.x = 415;
        soulBase1.y = 66;
        soulBase1.parentGroup = this.mTaikoGroup;
        this.container.addChild(soulBase1);

        var soulBase2 = new Pixi.Sprite(new Pixi.Texture(texture, new Pixi.Rectangle(0, 0, 6*16, 24)));
        soulBase2.x = 319;
        soulBase2.y = 66;
        soulBase2.parentGroup = this.mTaikoGroup;
        this.container.addChild(soulBase2);

        var soulBase3 = new Pixi.Sprite(new Pixi.Texture(texture, new Pixi.Rectangle(0, 0, 6*16, 24)));
        soulBase3.x = 223;
        soulBase3.y = 66;
        soulBase3.parentGroup = this.mTaikoGroup;
        this.container.addChild(soulBase3);

        // soul upper
        frames = [];
        frames.push(new Pixi.Texture(texture, new Pixi.Rectangle(0, 0, 0, 0)));
        for(let i=1; i<17; i++) {
            frames.push(new Pixi.Texture(texture, new Pixi.Rectangle(0, 24, 6*i, 24)));
        }

        this.soul3 = new Pixi.extras.AnimatedSprite(frames);
        this.soul3.x = 223;
        this.soul3.y = 66;
        this.soul3.parentGroup = this.mTaikoGroup;
        this.container.addChild(this.soul3);

        this.soul2 = new Pixi.extras.AnimatedSprite(frames);
        this.soul2.x = 319;
        this.soul2.y = 66;
        this.soul2.parentGroup = this.mTaikoGroup;
        this.container.addChild(this.soul2);

        frames = [];
        frames.push(new Pixi.Texture(texture, new Pixi.Rectangle(0, 0, 0, 0)));
        for(let i=1; i<29; i++) {
            frames.push(new Pixi.Texture(texture, new Pixi.Rectangle(0, 24, 6*i, 24)));
        }

        this.soul1 = new Pixi.extras.AnimatedSprite(frames);
        this.soul1.x = 415;
        this.soul1.y = 66;
        this.soul1.parentGroup = this.mTaikoGroup;
        this.container.addChild(this.soul1);

        // soulMark
        texture = Pixi.Texture.fromImage("img/soul.png");

        this.soulMark1 = new Pixi.Sprite(new Pixi.Texture(texture, new Pixi.Rectangle(0, 0, 190, 190)));
        this.soulMark1.height = 120
        this.soulMark1.width = 120
        this.soulMark1.x = 540;
        this.soulMark1.y = 17;
        this.soulMark1.parentGroup = this.mTaikoGroup;
        this.container.addChild(this.soulMark1);

        frames = []
        for (let i=1; i<8; i++) {
            frames.push(new Pixi.Texture(texture, new Pixi.Rectangle(i*190, 0, 190, 190)))
        }
        this.soulMark = new Pixi.extras.AnimatedSprite(frames);
        this.soulMark.height = 120
        this.soulMark.width = 120
        this.soulMark.x = 540;
        this.soulMark.y = 16;
        this.soulMark.parentGroup = this.mTaikoGroup;
        this.soulMark.animationSpeed = 0.5;
        this.container.addChild(this.soulMark);
        this.soulMark.play();
        this.soulMark.visible = false;
    }
    start = () => {
        this.char.play();
        this.dancer.play();
    }

    updateSoul = (t) => {
        // t range from 0 to 60;
        t = Math.floor(t)
        if (t < 17) {
            this.soul1.gotoAndStop(0);
            this.soul2.gotoAndStop(0);
            this.soul3.gotoAndStop(t);
        }
        else if (t < 33) {
            this.soul1.gotoAndStop(0);
            this.soul2.gotoAndStop(t-16);
            this.soul3.gotoAndStop(16);
        }
        else {
            this.soul1.gotoAndStop(t-32);
            this.soul2.gotoAndStop(16);
            this.soul3.gotoAndStop(16);
        }

        if (t === 60) this.soulMark.visible = true;
        else this.soulMark.visible = false;
    }

    end = () => {
        this.endBack.visible=true;
    }

    lendaStart = () => {
        this.lenda.visible = true;
    }

    lendaEnd = () => {
        this.lenda.visible = false;
    }

    clear = (c) => {
        this.clearbg.visible = c; 
    }

    allStart = () => {
        this.blind.visible = false;
    }
}