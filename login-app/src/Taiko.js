import React, { Component } from 'react';
import * as Pixi from 'pixi.js';
import 'pixi-layers';
import 'pixi-sound';
import './Taiko.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";

import Notes from './component/Note.js';
import Background from './component/Background.js';
import Input from './component/Input.js';
import Explosion from './component/explosion.js';
import Score from './component/Score.js';


class Taiko extends Component {
    app: Pixi.Application;
    gameCanvas: HTMLDivElement;
  
    constructor(props) {
        super(props);
        this.state = {
            userName: this.props.location.package.userName,
            sessionKey: this.props.location.package.sessionKey,
            songID: this.props.location.package.songID,
            score: 0,
            soul: 0,
            totalNotes: this.props.location.package.songChart.totalnotes,
            combo: 0,
            maxCombo: 0,
            Perfect: 0,
            Good: 0,
            lenda: 0,
            currentlenda: 0,
            lendaEnable: false,
            redirect: false
        }
        this.songFile = this.props.location.package.songFile,
        this.chartData = this.props.location.package.songChart;
        this.scoreBase = 1500;
    }
  
    /**
    * After mounting, add the Pixi Renderer to the div and start the Application.
    */
    componentDidMount() {
        this.app = new Pixi.Application({
                        width:window.innerWidth, 
                        height: window.innerHeight,
                        antialias: true,
                        transparent: false,
                        resolution: 1});
        this.gameCanvas.appendChild(this.app.view);

        this.startTime = 0;
        //LoadImage(this.setup);
        this.setup().then(setTimeout(this.startPlaying, 3000));
        this.app.start();
        //console.log(this.state.sessionKey);
    }
  
    /**
    * Stop the Application when unmounting.
    */
    componentWillUnmount() {
        Pixi.loader.reset();
        this.app.stop();
    }

    setup = async () => {
        this.container = new Pixi.Container();
        this.app.stage = new Pixi.display.Stage();
        this.app.stage.group.enableSort = true;
        this.app.stage.addChild(this.container);

        // decide Z-order
        var bgGroup = new Pixi.display.Group(0, false);
        var mTaikoGroup = new Pixi.display.Group(10, false);
        var explodeGroup = new Pixi.display.Group(2, false);
        var judgeMarkGroup = new Pixi.display.Group(15, false);
        var scoreGroup = new Pixi.display.Group(18, false);
        var noteGroup = new Pixi.display.Group(5, false);
        var endGroup = new Pixi.display.Group(20, false);
        var endScoreGroup = new Pixi.display.Group(21, false);
        this.app.stage.addChild(new Pixi.display.Layer(bgGroup));
        this.app.stage.addChild(new Pixi.display.Layer(mTaikoGroup));
        this.app.stage.addChild(new Pixi.display.Layer(explodeGroup));
        this.app.stage.addChild(new Pixi.display.Layer(judgeMarkGroup));
        this.app.stage.addChild(new Pixi.display.Layer(scoreGroup));
        this.app.stage.addChild(new Pixi.display.Layer(noteGroup));
        this.app.stage.addChild(new Pixi.display.Layer(endGroup));
        this.app.stage.addChild(new Pixi.display.Layer(endScoreGroup));


        // background
        this.background = new Background(bgGroup, mTaikoGroup, endGroup);
        this.container.addChild(this.background.container);

        // note
        this.chart = new Notes(noteGroup, bgGroup, this.chartData);
        this.container.addChild(this.chart.container);
        
        // explosion
        this.explode = new Explosion(explodeGroup, judgeMarkGroup);
        this.container.addChild(this.explode.container);

        this.chart.initialize(this.explode.initialize);

        // score
        this.score = new Score(scoreGroup, endScoreGroup);
        this.container.addChild(this.score.container);
        
        // adjust window size
        if (window.innerHeight*16 > window.innerWidth*9) {
            var trueHeight = Math.floor(window.innerWidth*9/16);
            this.container.height = trueHeight;
            this.container.y = (window.innerHeight - trueHeight) / 2;
            this.container.width = window.innerWidth;
        }
        else {
            var trueWidth = Math.floor(window.innerHeight*16/9);
            this.container.width = trueWidth;
            this.container.x = (window.innerWidth - trueWidth) / 2;
            this.container.height = window.innerHeight;
        }
        
        // load sound
        this.bgm = Pixi.sound.Sound.from({
            url: this.songFile,
            preload: true,           
        });
        this.donSound = Pixi.sound.Sound.from({
            url: 'don.wav',
            preload: true,            
        });
        this.kaSound = Pixi.sound.Sound.from({
            url: 'ka.wav',
            preload: true,           
        });
    }

    startPlaying = () => {
        // input
        this.background.allStart();
        this.input = new Input(this.handleDon, this.handleKa, this.handleESC);
        this.bgm.play(
            {
                complete: () => {
                    this.gameEnd();
                }
            }
        );
        this.startTime = new Date().getTime();
        this.app.ticker.add((delta) => {
            this.chart.update(new Date().getTime() - this.startTime, this.handleCombo);
            this.chart.updatelenda(new Date().getTime() - this.startTime, this.lendaStart, this.lendaEnd);
            this.score.update(this.state.score, this.state.combo);
            this.handleClear();
        });
        this.background.start();
        this.donSound.volume = 0.8;
        this.kaSound.volume = 0.8;
    }

    handleDon = () => {
        this.donSound.play();
        this.handleLenda();
        var jgAndtype = this.chart.don(new Date().getTime() - this.startTime, this.handleCombo); 
        if (jgAndtype.type === 1) {
            if (jgAndtype.judge === 1) {
                this.explode.exploSmallPerfect();
                this.setState({ Perfect: this.state.Perfect + 1 });
                this.addScore(this.scoreBase);
            }
            else if (jgAndtype.judge === 2) {
                this.explode.exploSmallGood();
                this.setState({ Good: this.state.Good + 1 });
                this.addScore(this.scoreBase/2);
            }
            else if (jgAndtype.judge === 3) {
                this.explode.exploBad();
            }
        }
        else if (jgAndtype.type === 3) {
            if (jgAndtype.judge === 1) {
                this.explode.exploBigPerfect();
                this.setState({ Perfect: this.state.Perfect + 1 });
                this.addScore(this.scoreBase * 2);
            }
            else if (jgAndtype.judge === 2) {
                this.explode.exploBigGood();
                this.setState({ Good: this.state.Good + 1 });
                this.addScore(this.scoreBase);
            }
            else if (jgAndtype.judge === 3) {
                this.explode.exploBad();
            }
        }
    }

    handleKa = () => {
        this.kaSound.play();
        this.handleLenda();
        var jgAndtype = this.chart.ka(new Date().getTime() - this.startTime, this.handleCombo); 
        if (jgAndtype.type === 2) {
            if (jgAndtype.judge === 1) {
                this.explode.exploSmallPerfect();
                this.setState({ Perfect: this.state.Perfect + 1 });
                this.addScore(this.scoreBase);
            }
            else if (jgAndtype.judge === 2) {
                this.explode.exploSmallGood();
                this.setState({ Good: this.state.Good + 1 });
                this.addScore(this.scoreBase / 2);
            }
            else if (jgAndtype.judge === 3) {
                this.explode.exploBad();
            }
        }
        else if (jgAndtype.type === 4) {
            if (jgAndtype.judge === 1) {
                this.explode.exploBigPerfect();
                this.setState({ Perfect: this.state.Perfect + 1 });
                this.addScore(this.scoreBase * 2);
            }
            else if (jgAndtype.judge === 2) {
                this.explode.exploBigGood();
                this.setState({ Good: this.state.Good + 1 });
                this.addScore(this.scoreBase);
            }
            else if (jgAndtype.judge === 3) {
                this.explode.exploBad();
            }
        }
    }
    handleESC = () => {
        this.bgm.stop();
        this.input.removeEventListeners();
        this.route();
    }

    addScore = (sc) => {
        this.setState({ score: this.state.score + sc });
    }

    handleCombo = (judge) => {
        var newSoul = this.state.soul;
        var baseSoul = 100 / this.state.totalNotes;
        if (judge === 1) {
            this.setState({ combo: this.state.combo + 1 });
            newSoul += baseSoul;
        }
        else if (judge === 2) {
            this.setState({ combo: this.state.combo + 1 });
            newSoul += baseSoul / 2;
        }
        else {
            this.setState({ combo: 0 });
            newSoul -= baseSoul / 2;
        }
        if (newSoul > 60) this.setState({ soul: 60 });
        else if (newSoul < 0) this.setState({ soul: 0 });
        else this.setState({ soul: newSoul });
        this.background.updateSoul(this.state.soul);

        if (this.state.combo > this.state.maxCombo)
            this.setState({ maxCombo: this.state.combo });
    }

    lendaStart = () => {
        if (!this.state.lendaEnable) {
            this.setState({
                lendaEnable: true,
                currentlenda: 0,
            });
            this.background.lendaStart();
            this.score.lendaStart();
        }
    }

    lendaEnd = () => {
        if (this.state.lendaEnable) {
            this.setState({lendaEnable: false});
            this.background.lendaEnd();
            this.score.lendaEnd();
        }
    }

    handleLenda = () => {
        if (this.state.lendaEnable) {
            this.setState({
                currentlenda: this.state.currentlenda + 1,
                lenda: this.state.lenda + 1
            });
            this.score.lendaText(this.state.currentlenda);
            this.addScore(100);
        }
    }

    handleClear = () => {
        this.background.clear(this.state.soul > 49);
    }

    gameEnd = () => {
        this.input.removeEventListeners();
        this.background.end();
        var endData = {
            score: this.state.score,
            Perfect: this.state.Perfect,
            Good: this.state.Good,
            Bad: this.state.totalNotes - this.state.Perfect - this.state.Good,
            maxCombo: this.state.maxCombo,
            lenda: this.state.lenda
        }
        this.score.end(endData);

        var clearState;
        if (this.state.totalNotes === this.state.maxCombo)
            clearState = 2;
        else if (this.state.soul > 49)
            clearState = 1;
        else
            clearState = 0;
        
        fetch("http://webdemo.nctu.me:5000/scoreSubmission/", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                person_id: this.state.sessionKey,
                song_id: this.state.songID,
                score: this.state.score,
                clear_state: clearState
            })
        })
        .then((response) => {
            console.log('fetch debuggggggggg');
            console.log(response.json());
            console.log('fetch debuggggggggg');
            setTimeout(this.route, 5000);
        })
        .catch((error) => {
            console.error(error);
        });
        
    }

    route = () => {
        this.setState({redirect: true});
    }
  
    /**
    * Simply render the div that will contain the Pixi Renderer.
    */
    render() {
        const redirect = this.state.redirect;
        if (redirect) {
            return (<Redirect to={
                {
                    pathname: '/menu',
                }
            }/>);
        }
        else {
            return (
                <div className="taiko" ref={(thisDiv) => {this.gameCanvas = thisDiv}} />
            );
        }
    }
}

export default Taiko;
