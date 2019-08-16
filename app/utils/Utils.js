// All credits go to https://gist.github.com/stuartmemo/3766449 -Transfusion
export const getFrequency = function (note) {
    let notes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'],
        octave,
        keyNumber;

    if (note.length === 3) {
        octave = note.charAt(2);
    } else {
        octave = note.charAt(1);
    }

    keyNumber = notes.indexOf(note.slice(0, -1));

    if (keyNumber < 3) {
        keyNumber = keyNumber + 12 + ((octave - 1) * 12) + 1;
    } else {
        keyNumber = keyNumber + ((octave - 1) * 12) + 1;
    }

    // Return frequency of note
    return 440 * Math.pow(2, (keyNumber- 49) / 12);
};

let noteStrings = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

// todo: refactor with divmod
export function noteFromPitch( frequency ) {
    let noteNum = 12 * (Math.log(frequency / 440) / Math.log(2));
    let note = Math.round( noteNum ) + 69;
    return noteStrings[note % 12] + (Math.floor(note / 12) - 1)
}

export const MathUtils = {
    interpolateLinear: (X1, X2, Y1, Y2) => {
        let slope = (Y2 - Y1) / (X2 - X1);
        let intercept = Y1 - slope * X1;
        return (x) => {
            return slope * x + intercept;
        }
    }
};
