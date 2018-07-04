import * as Pixi from 'pixi.js';
import 'pixi-layers';
import {NotePos2Time, Time2Pos} from './TimePos.js';
import {Judgment} from './Judgment.js';

export default class Notes {

    constructor(noteGroup, bgGroup, noteData){
        this.noteData = noteData;
        this.bgGroup = bgGroup;
        this.noteGroup = noteGroup;
        this.judgePosX = 166;
        this.judgePosY = 92;
        this.noteList = [];
        this.lendaList = [];
        this.bpm = noteData.BPM;
        this.offset = this.noteData.offset * -1000;
        this.currentNoteIndex = 0;
        this.container = new Pixi.Container();
        //this.initialize();
    }

    initialize = (init) => {
        Pixi.loader
            .add("img/notes.png")
            .add("img/explosion_lower.png")
            .add("img/explosion_upper.png")
            .add("img/judgement.png")
            .load(this.createNoteBase);
        Pixi.loader.onComplete.add(() => {
            init();
        });
        //this.createNoteBase();
    }

    createNoteBase = () => {
        let noteBase = Pixi.TextureCache["img/notes.png"];

        // judgement note
        this.judgNote = this.createNoteSprite(noteBase, 0, 0);
        this.judgNote.parentGroup = this.bgGroup;
        this.container.addChild(this.judgNote);

        // chart note
        var chartNotes = [];
        for (let i=0; i<this.noteData.totalnotes; i++) {
            chartNotes[i] = {type: this.noteData.Notes[i].types,
                             timePos: NotePos2Time(this.bpm, this.noteData.Notes[i].measure, this.noteData.Notes[i].time) + this.offset};
        }

        for (let i=0; i<chartNotes.length; i++) {
            var tmp = this.createNoteSprite(noteBase, chartNotes[i].type, chartNotes[i].timePos);
            tmp.parentGroup = this.noteGroup;
            this.noteList.splice(0, 0, tmp);
        }
        
        for (let i=0; i<chartNotes.length; i++) {
            this.container.addChild(this.noteList[i]);
        }
        //console.log("fuck1")
        this.currentNoteIndex = chartNotes.length - 1;

        //lenda
        var lendaNotes = [];
        var index = 0;
        var tp = this.noteData.renda;
        var lendaInterval = NotePos2Time(this.bpm, 0, 3);
        var lstartTime = 0;
        var lendTime = 0;

        for (let i=0; i< tp.length; i++) {
            lstartTime = NotePos2Time(this.bpm, tp[i].start.measure, tp[i].start.time) + this.offset;
            lendTime = NotePos2Time(this.bpm, tp[i].end.measure, tp[i].end.time) + this.offset;
            lendaNotes[index] = {type: 5,
                                timePos: lstartTime};
            index ++;
            lstartTime += lendaInterval;
            lendaNotes[index] = {type: 7,
                                timePos: lendTime};
            index ++;
            while (lstartTime < lendTime - (0.5 * lendaInterval)) {
                lendaNotes[index] = {type: 6,
                                    timePos: lstartTime};
                index ++;
                lstartTime += lendaInterval;
            }
        }

        for (let i=0; i<lendaNotes.length; i++) {
            tmp = this.createNoteSprite(noteBase, lendaNotes[i].type, lendaNotes[i].timePos);
            tmp.parentGroup = this.noteGroup;
            this.lendaList.splice(0, 0, tmp);
        }
        
        for (let i=0; i<lendaNotes.length; i++) {
            this.container.addChild(this.lendaList[i]);
        }
    }

    // judgenote doesn't have animation
    /* 
    type
        0 : judgnote
        1 : Don
        2 : Ka
        3 : Big Don
        4 : Big Ka
        5 : yellow
    */
    createNoteSprite = (noteBase, type, timePos) => {
        var X = type * 64;
        var Y = 0;

        var note = new Pixi.Texture(noteBase, new Pixi.Rectangle(X, Y, 64, 64));
        var noteSprite = new Pixi.Sprite.from(note);

        noteSprite.x = this.judgePosX + Time2Pos(this.bpm, timePos);
        noteSprite.y = this.judgePosY;
        noteSprite.type = type;
        noteSprite.timePos = timePos;

        return noteSprite;
    }

    update = (t, handleCombo) => {
        if (this.noteList[this.currentNoteIndex]) {
            while (this.noteList[this.currentNoteIndex].timePos < (t - 120)) { 
                this.currentNoteIndex -= 1;
                handleCombo(0);
                if (this.currentNoteIndex < 0)
                    break;
            }
        }
        if (this.noteList) {
            for (let i=0; i<this.noteList.length; i++) {
                this.noteList[i].x = this.judgePosX + Time2Pos(this.bpm, this.noteList[i].timePos-t);
                if (this.noteList[i].x < 50)
                    this.noteList[i].visible = false;
            }
        }
    }

    updatelenda = (t, start, end) => {
        if (this.lendaList) {
            for (let i=0; i<this.lendaList.length; i++) {
                var tmpPos = Time2Pos(this.bpm, this.lendaList[i].timePos-t);
                this.lendaList[i].x = this.judgePosX + tmpPos;
                if (this.lendaList[i].x < 50)
                    this.lendaList[i].visible = false;
                if (this.lendaList[i].type === 5) {
                    if (tmpPos <= 0 && tmpPos > -10)
                        start();
                }
                else if (this.lendaList[i].type === 7) {
                    if (tmpPos <= 0 && tmpPos > -10)
                        end();
                } 
            }
        }
    }

    don = (t, handleCombo) => {
        var judgeAndType = {type:0, judge:0};
        if (this.currentNoteIndex < 0)
            return judgeAndType;
        while (this.noteList[this.currentNoteIndex].timePos < (t - 120)) { 
            this.currentNoteIndex -= 1;
            handleCombo(0);
        }
        if (this.noteList[this.currentNoteIndex].type === 1) {
            var JG = Judgment(this.noteList[this.currentNoteIndex].timePos, t);
            //console.log(JG);
            if (JG.jg === 0)
                return judgeAndType;
            judgeAndType = {type:1, judge:JG.jg};
            this.container.removeChild(this.noteList[this.currentNoteIndex]);
            this.currentNoteIndex -= 1;
            handleCombo(JG.jg);
            return judgeAndType;
        }
        if (this.noteList[this.currentNoteIndex].type === 3) {
            var JG = Judgment(this.noteList[this.currentNoteIndex].timePos, t);
            if (JG.jg === 0)
                return judgeAndType;
            judgeAndType = {type:3, judge:JG.jg};
            this.container.removeChild(this.noteList[this.currentNoteIndex]);
            this.currentNoteIndex -= 1;
            handleCombo(JG.jg);
            return judgeAndType;
        }
        return judgeAndType;
    }

    ka = (t, handleCombo) => {
        var judgeAndType = {type:0, judge:0};
        if (this.currentNoteIndex < 0)
            return judgeAndType;
        while (this.noteList[this.currentNoteIndex].timePos < (t - 120)) { 
            this.currentNoteIndex -= 1;
            handleCombo(0);
        }
        if (this.noteList[this.currentNoteIndex].type === 2) {
            var JG = Judgment(this.noteList[this.currentNoteIndex].timePos, t);
            if (JG.jg === 0)
                return judgeAndType;
            judgeAndType = {type:2, judge:JG.jg};
            this.container.removeChild(this.noteList[this.currentNoteIndex]);
            this.currentNoteIndex -= 1;
            handleCombo(JG.jg);
            return judgeAndType;
        }
        if (this.noteList[this.currentNoteIndex].type === 4) {
            var JG = Judgment(this.noteList[this.currentNoteIndex].timePos, t);
            if (JG.jg === 0)
                return judgeAndType;
            judgeAndType = {type:4, judge:JG.jg};
            this.container.removeChild(this.noteList[this.currentNoteIndex]);
            this.currentNoteIndex -= 1;
            handleCombo(JG.jg);
            return judgeAndType;
        }
        return judgeAndType;
    }
}