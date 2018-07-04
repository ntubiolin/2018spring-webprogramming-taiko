import * as Pixi from 'pixi.js';
import 'pixi-layers';

export default class Score {
    constructor(scoreGroup, endScoreGroup){
        this.container = new Pixi.Container();
        this.scoreGroup = scoreGroup;
        this.endScoreGroup = endScoreGroup;
        this.initialize();
    }
    initialize = () => {
        this.score = new Pixi.Text('0',
        {
            fontFamily : 'Courier New',
            fontSize: 18,
            fill: 'white', 
            align : 'right',
            fontWeight: 'bold'
        });
        this.score.parentGroup = this.scoreGroup;
        this.score.x = 80;
        this.score.y = 90;
        this.score.anchor.set(1, 0);
        this.score.height = 19;
        this.container.addChild(this.score);

        this.combo = new Pixi.Text('',
        {
            fontFamily : 'Courier New',
            fontSize: 34, 
            fill: '#f05500', 
            align : 'center',
            fontWeight: 'bold'
        });
        this.combo.parentGroup = this.scoreGroup;
        this.combo.x = 123;
        this.combo.y = 101;
        this.combo.anchor.set(0.5, 0)
        this.container.addChild(this.combo);

        // lenda
        this.lenda = new Pixi.Text('',
        {
            fontFamily : 'Courier New',
            fontSize: 40,
            fill: 'white', 
            align : 'center',
            fontWeight: 'bold',
            strokeThickness: 3
        });
        this.lenda.parentGroup = this.endScoreGroup;
        this.lenda.x = 196;
        this.lenda.y = 19;
        this.lenda.anchor.set(0.5, 0)
        this.lenda.visible = false;
        this.container.addChild(this.lenda);

        // ending
        this.endScore = new Pixi.Text('',
        {
            fontFamily : 'Courier New',
            fontSize: 20,
            fill: 'white', 
            align : 'right',
            fontWeight: 'bold'
        });
        this.endScore.parentGroup = this.endScoreGroup;
        this.endScore.x = 375;
        this.endScore.y = 126;
        this.endScore.anchor.set(1, 0);
        this.endScore.visible = false;
        this.container.addChild(this.endScore);

        this.endPerfect = new Pixi.Text('',
        {
            fontFamily : 'Courier New',
            fontSize: 18,
            fill: 'white', 
            align : 'right',
            fontWeight: 'bold',
            strokeThickness: 3
        });
        this.endPerfect.parentGroup = this.endScoreGroup;
        this.endPerfect.x = 488;
        this.endPerfect.y = 93;
        this.endPerfect.anchor.set(1, 0)
        this.endPerfect.visible = false;
        this.container.addChild(this.endPerfect);

        this.endGood = new Pixi.Text('',
        {
            fontFamily : 'Courier New',
            fontSize: 18,
            fill: 'white', 
            align : 'right',
            fontWeight: 'bold',
            strokeThickness: 3
        });
        this.endGood.parentGroup = this.endScoreGroup;
        this.endGood.x = 488;
        this.endGood.y = 112;
        this.endGood.anchor.set(1, 0);
        this.endGood.visible = false;
        this.container.addChild(this.endGood);

        this.endBad = new Pixi.Text('',
        {
            fontFamily : 'Courier New',
            fontSize: 18,
            fill: 'white', 
            align : 'right',
            fontWeight: 'bold',
            strokeThickness: 3
        });
        this.endBad.parentGroup = this.endScoreGroup;
        this.endBad.x = 488;
        this.endBad.y = 133;
        this.endBad.anchor.set(1, 0);
        this.endBad.visible = false;
        this.container.addChild(this.endBad);

        this.endCombo = new Pixi.Text('',
        {
            fontFamily : 'Courier New',
            fontSize: 18,
            fill: 'white', 
            align : 'right',
            fontWeight: 'bold',
            strokeThickness: 3
        });
        this.endCombo.parentGroup = this.endScoreGroup;
        this.endCombo.x = 620;
        this.endCombo.y = 93;
        this.endCombo.anchor.set(1, 0);
        this.endCombo.visible = false;
        this.container.addChild(this.endCombo);

        this.endLenda = new Pixi.Text('',
        {
            fontFamily : 'Courier New',
            fontSize: 18,
            fill: 'white', 
            align : 'right',
            fontWeight: 'bold',
            strokeThickness: 3
        });
        this.endLenda.parentGroup = this.endScoreGroup;
        this.endLenda.x = 620;
        this.endLenda.y = 112;
        this.endLenda.anchor.set(1, 0);
        this.endLenda.visible = false;
        this.container.addChild(this.endLenda);
    }

    update = (sc, combo) => {
        this.score.text = sc;
        if (combo >= 10 )
            this.combo.text = combo;
        else
            this.combo.text = '';
    }

    end = (data) => {
        this.endScore.text = data.score;
        this.endPerfect.text = data.Perfect;
        this.endGood.text = data.Good;
        this.endBad.text = data.Bad;
        this.endCombo.text = data.maxCombo;
        this.endLenda.text = data.lenda;

        this.endScore.visible = true;
        this.endPerfect.visible = true;
        this.endGood.visible = true;
        this.endBad.visible = true;
        this.endCombo.visible = true;
        this.endLenda.visible = true;
    }

    lendaStart = () => {
        this.lenda.visible = true;
        this.lenda.text = '0';
    }

    lendaEnd = () => {
        this.lenda.visible = false;
    }

    lendaText = (t) => {
        this.lenda.text = t;
    }
}