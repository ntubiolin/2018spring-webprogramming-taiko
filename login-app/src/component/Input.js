

export default class Input {
    constructor(don, ka, esc) {
        this.don = don;
        this.ka = ka;
        this.esc = esc;
        this.addEventListeners();
    }

    addEventListeners() {
        window.addEventListener('keydown', this.handleKey, false);
    }

    removeEventListeners() {
        window.removeEventListener('keydown', this.handleKey, false);
    }

    handleKey = e => {
        e.preventDefault();
        this.parseInput(e.keyCode, this.don, this.ka, this.esc);
    }

    parseInput = (e, don, ka, esc) => {
        //console.log(e)
        if (e === 70 || e === 74)
            don();
        else if (e === 68 || e === 75)
            ka();
        else if (e === 27)
            esc();
    }
}