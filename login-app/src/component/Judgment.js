
/*
    judgment
    0 : not hit
    1 : Perfect (33ms)
    2 : Good    (100ms)
    3 : Miss    (120ms)
*/
export function Judgment(expTime, realTime) {
    var diff = Math.abs(expTime-realTime);
    var judgment = {}

    if (diff <= 33)
        judgment.jg = 1;
    else if (diff <= 100)
        judgment.jg = 2;
    else if (diff <= 120)
        judgment.jg = 3;
    else
        judgment.jg = 0;

    return judgment;
}