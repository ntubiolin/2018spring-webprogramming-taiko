
/*
    from chart position to time(ms)
    every measure divided into 48 times, 
    currently only support 4/4

    ## measure start from 0
*/
export function NotePos2Time(bpm, measure, time) {
    return 5000/bpm * (measure*48 + time);
}

/*
    from time(ms) to display position
*/
export function Time2Pos(bpm, time) {
    return time * 0.00176 * bpm;
}