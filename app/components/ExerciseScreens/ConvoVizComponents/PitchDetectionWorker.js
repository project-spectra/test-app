require('globals'); // necessary to bootstrap tns modules on the new thread


export const REQUEST_MSG_TYPES = {
    ANALYZE_WAV_FILE: 'ANALYZE_WAV_FILE',
    ANALYZE_FLOAT32_ARRAY: 'ANALYZE_FLOAT32_ARRAY',
    ANALYZE_PITCH_ARRAY: 'ANALYZE_PITCH_ARRAY',
};

export const RESPONSE_MSG_TYPES = {
    WAV_FILE_ANALYZED: 'WAV_FILE_ANALYZED',
    FLOAT32_ARRAY_ANALYZED: 'FLOAT32_ARRAY_ANALYZED',
    PITCH_ARRAY_ANALYZED: 'PITCH_ARRAY'
};

const fs = require("tns-core-modules/file-system");
const WavDecoder = require("wav-decoder");
const Pitchfinder = require("pitchfinder");

global.onmessage = function(msg) {
    console.log("Received this message from the main thread: " + JSON.stringify(msg.data));
    let payload = msg.data;

    switch(payload.type) {
        case REQUEST_MSG_TYPES.ANALYZE_WAV_FILE:
            let recPath = payload.data;

            console.log('recpath', recPath);
            //Load recording file
            let recFile = fs.File.fromPath(recPath);
            let source = recFile.readSync((err) => {
                console.log(err);
            });
            console.log('src!!!', source);
            // https://stackoverflow.com/questions/41346769/nativescript-is-there-a-way-to-retrieve-the-binary-data-and-process-it-after-be
            let typedBuffer = new Uint8Array(source);

            const decoded = WavDecoder.decode.sync(typedBuffer.buffer);

            console.log('decode successful');
            let float32Array = decoded.channelData[0];

            let frequencies = Pitchfinder.frequencies(Pitchfinder.YIN(), float32Array, {
                tempo: 130, // in BPM, defaults to 120
                quantization: 4, // samples per beat, defaults to 4 (i.e. 16th notes)
            });

            frequencies = frequencies.filter(item => !!item && item > 50 && item < 1000).sort(function(a, b){
                return a - b;
            });

            console.log('pitches ', frequencies);
            let mid = Math.floor(frequencies.length / 2);
            let median = frequencies.length % 2 !== 0 ? frequencies[mid] :
                (frequencies[mid - 1] + frequencies[mid]) / 2;

            // setTimeout(() => {
            postMessage( {type: RESPONSE_MSG_TYPES.WAV_FILE_ANALYZED, data: {
                    min: frequencies[0] || NaN,
                    max: frequencies[frequencies.length - 1] || NaN,
                    avg: frequencies.reduce((a,b) => a + b, 0) / frequencies.length || NaN,
                    median: median || NaN
                }});

            close();
            return;

        case REQUEST_MSG_TYPES.ANALYZE_FLOAT32_ARRAY:
            float32Array = payload.data;
            frequencies = Pitchfinder.frequencies(Pitchfinder.YIN(), float32Array, {
                tempo: 130, // in BPM, defaults to 120
                quantization: 4, // samples per beat, defaults to 4 (i.e. 16th notes)
            });

            frequencies = frequencies.filter(item => !!item).sort(function(a, b){
                return a - b;
            });

            console.log('pitches ', frequencies);

            mid = Math.floor(frequencies.length / 2);
            median = frequencies.length % 2 !== 0 ? frequencies[mid] :
                (frequencies[mid - 1] + frequencies[mid]) / 2;

            // setTimeout(() => {
            postMessage( {type: RESPONSE_MSG_TYPES.FLOAT32_ARRAY_ANALYZED, data: {
                min: frequencies[0],
                max: frequencies[frequencies.length - 1],
                avg: frequencies.reduce((a,b) => a + b, 0) / frequencies.length,
                median: median
            }});
            close();
            return;
        case REQUEST_MSG_TYPES.ANALYZE_PITCH_ARRAY:
            frequencies = payload.data;

            frequencies = frequencies.filter(item => !!item).sort(function(a, b){
                return a - b;
            });

            console.log('pitches ', frequencies);

            mid = Math.floor(frequencies.length / 2);
            median = frequencies.length % 2 !== 0 ? frequencies[mid] :
                (frequencies[mid - 1] + frequencies[mid]) / 2;

            // setTimeout(() => {
            postMessage( {type: RESPONSE_MSG_TYPES.PITCH_ARRAY_ANALYZED, data: {
                    min: frequencies[0],
                    max: frequencies[frequencies.length - 1],
                    avg: frequencies.reduce((a,b) => a + b, 0) / frequencies.length,
                    median: median
                }});
            close();
            return;
    }

    // perform some crazy cpu-intensive task here!

    // send a message back to the main thread
    // postMessage("Hello main thread!");

    close();
};

global.onerror = function(e) {
    console.log("Oh no! Worker thread error: " + e);
    return true;
};
