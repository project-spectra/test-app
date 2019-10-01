<template>
    <Page actionBarHidden="true" class="page">

        <FlexboxLayout v-if="!this.pitchStats" style="flex: 1;" flexDirection="column" justifyContent="center">
            <ActivityIndicator busy="true"/>
        </FlexboxLayout>

        <FlexboxLayout v-if="!!this.pitchStats" style="flex: 1;" flexDirection="column" id="container">
            <TextView text="Done!" editable="false" id="title"/>

            <!--<FlexboxLayout flexWrap="wrap" justifyContent="center" flexDirection="row" id="desc">-->

            <!--<TextView editable="false" :text="INFO_TEXT" id="desc"/>-->

            <!--<TextView editable="false" :text="calculatedPitch"/>-->

            <!--</FlexboxLayout>-->

            <TextView editable="false" style="background-color: transparent;">
                <Span text="Your average pitch was "/>
                <Span :text="truncateDecimal(pitchStats.avg, 2) + ' Hz '"
                      style="font-style: italic; font-weight: bold;"/>
                <Span text="and your range was "/>
                <Span :text="`${truncateDecimal(pitchStats.min, 2)}-${truncateDecimal(pitchStats.max, 2)} Hz.`" style="font-style: italic; font-weight: bold;"/>

                <Span v-if="specificPitchGoal" text=" You were "/>
                <Span v-if="specificPitchGoal"
                      :text="truncateDecimal(specificPitchGoal - pitchStats.median, 2) + ' Hz '"
                      style="font-style: italic; font-weight: bold;"/>
                <Span v-if="specificPitchGoal" text="away from your goal. "/>

            </TextView>

            <!--animation goes here !-->
            <AbsoluteLayout :height="vizAreaHeight" :width="vizAreaWidth" backgroundColor="lightgray" marginTop="20em"
                            marginBottom="20em">

                <FlexboxLayout :top="firstRungOffsetFromTop" :height="vizAreaHeight - firstRungOffsetFromTop"
                               left="0"
                               flexDirection="column" width="100%">
                    <AbsoluteLayout backgroundColor="#B6A9D7" width="100%" :style="d">
                        <TextView top="10" left="10" text="feminine" editable="false" class="zoneLabel"/>

                    </AbsoluteLayout>
                    <AbsoluteLayout backgroundColor="#BF99D7" width="100%" :style="e">
                        <TextView top="10" left="10" text="androgynous" editable="false" class="zoneLabel"/>
                    </AbsoluteLayout>
                    <AbsoluteLayout backgroundColor="#D7B7DF" width="100%" :style="f">
                        <TextView top="10" left="10" text="masculine" editable="false" class="zoneLabel"/>
                    </AbsoluteLayout>

                </FlexboxLayout>

                <!--<FlexboxLayout :height="vizAreaHeight" :width="vizAreaWidth" flexDirection="column" justifyContent="space-between" style="flex: 1; border-color: red; border-width: 1dp">-->
                <!-- 20 is for the line of text above each rung -->
                <StackLayout v-for="index in noRungs" v-bind:key="index.id" left="0"
                             :top="firstRungOffsetFromTop + (index - 1)*((vizAreaHeight - 5 - firstRungOffsetFromTop) / (noRungs - 1))"
                             width="vizAreaWidth"
                             class="hr-dark" style="height: 1dp;"/>

                <TextView v-for="index in noRungs" v-bind:key="index.id"
                          :text="`${calculateRungNote(index)} ~${calculateRungHz(index)}Hz`"
                          :left="vizAreaWidth - 120" editable="false" fontAttributes="Italic"
                          style="width: 130dp;"
                          :top="0 + (index - 1)*((vizAreaHeight - 5 - firstRungOffsetFromTop) / (noRungs - 1))"
                          class="rungLabel"/>

                <!-- the middle vertical bar-->
                <FlexboxLayout :top="firstRungOffsetFromTop" :height="vizAreaHeight - firstRungOffsetFromTop"
                               :left="(vizAreaWidth / 2)"
                               flexDirection="column" backgroundColor="white" width="50">
                    <StackLayout :style="a" backgroundColor="white"/>
                    <StackLayout :style="b" backgroundColor="red"/>
                    <StackLayout :style="c" backgroundColor="white"/>
                </FlexboxLayout>
                <!--<StackLayout class="hr-dark" style="height: 1dp;"/>
                <StackLayout class="hr-dark" style="height: 1dp;"/>
                <StackLayout class="hr-dark" style="height: 1dp;"/>-->
                <!--</FlexboxLayout>-->

                <StackLayout height="2dp"
                             :width="50 + 15 + (indicatorBoxWidth + 5) + (indicatorBoxWidth + 5) + (indicatorBoxWidth + 5)"
                             backgroundColor="purple"
                             :top="getAbsoluteOffsetFromTop(this.pitchStats.min)"
                             :left="(vizAreaWidth / 2) - (15 + indicatorBoxWidth + 5 + (indicatorBoxWidth + 5) + (indicatorBoxWidth + 5))"/>
                <TextView editable="false" class="indicatorLabel" text="Min" :width="indicatorBoxWidth" height="40"
                          :top="getAbsoluteOffsetFromTop(this.pitchStats.min) - (40/2)"
                          :left="(vizAreaWidth / 2) - (15 + indicatorBoxWidth + 5 + (indicatorBoxWidth + 5) + (indicatorBoxWidth + 5)) - indicatorBoxWidth"/>


                <StackLayout height="2dp" :width="50 + 15 + (indicatorBoxWidth + 5) + (indicatorBoxWidth + 5)"
                             backgroundColor="purple"
                             :top="getAbsoluteOffsetFromTop(this.pitchStats.median)"
                             :left="(vizAreaWidth / 2) - (15 + indicatorBoxWidth + 5 + (indicatorBoxWidth + 5))"/>
                <TextView editable="false" class="indicatorLabel" text="Med" :width="indicatorBoxWidth" height="40"
                          :top="getAbsoluteOffsetFromTop(this.pitchStats.median) - (40/2)"
                          :left="(vizAreaWidth / 2) - (15 + indicatorBoxWidth + 5 + (indicatorBoxWidth + 5)) - indicatorBoxWidth"/>

                <StackLayout height="2dp" :width="50 + 15 + indicatorBoxWidth + 5" backgroundColor="purple"
                             :top="getAbsoluteOffsetFromTop(this.pitchStats.avg)"
                             :left="(vizAreaWidth / 2) - (15 + indicatorBoxWidth + 5)"/>
                <TextView editable="false" class="indicatorLabel" text="Avg" :width="indicatorBoxWidth" height="40"
                          :top="getAbsoluteOffsetFromTop(this.pitchStats.avg) - (40/2)"
                          :left="(vizAreaWidth / 2) - (15 + indicatorBoxWidth + 5) - indicatorBoxWidth"/>

                <StackLayout height="2dp" :width="50 + 15" backgroundColor="purple"
                             :top="getAbsoluteOffsetFromTop(this.pitchStats.max)"
                             :left="(vizAreaWidth / 2) - 15"/>
                <TextView editable="false" class="indicatorLabel" text="Max" :width="indicatorBoxWidth" height="40"
                          :top="getAbsoluteOffsetFromTop(this.pitchStats.max) - (40/2)"
                          :left="(vizAreaWidth / 2) - 15 - indicatorBoxWidth"/>


                <TextView editable="false" class="legend" :text="legendText" top="10" width="160"
                          :left="vizAreaWidth - 160 - 10"/>

                <StackLayout height="2dp" :width="50 + 15" backgroundColor="purple"
                             :top="getAbsoluteOffsetFromTop(this.specificPitchGoal)"
                             :left="(vizAreaWidth / 2) "/>
                <TextView editable="false" class="indicatorLabel" text="Target" width="60" height="40"
                          :top="getAbsoluteOffsetFromTop(this.specificPitchGoal) - (40/2)"
                          :left="(vizAreaWidth / 2) + 2 + 60"/>


            </AbsoluteLayout>

            <StackLayout flexGrow="1"/>

            <FlexboxLayout justifyContent="space-between" flexDirection="column">
                <SpectraActionButton type='warning' width="80%" text="Try a new exercise" @tap="onReturn"/>
            </FlexboxLayout>
        </FlexboxLayout>
    </Page>
</template>
<script>
    import * as platformModule from 'tns-core-modules/platform';

    import SpectraActionButton from "@/components/UIControls/SpectraActionButton";
    import IntroNotePickerButton from "../ExerciseScreens/PitchPerfectComponents/IntroNotePickerButton";
    import ActiveExercises from "../ActiveExercises";
    import {noteFromPitch, truncateDecimal} from '@/utils/Utils';
    import {
        REQUEST_MSG_TYPES,
        RESPONSE_MSG_TYPES
    } from "@/components/ExerciseScreens/ConvoVizComponents/PitchDetectionWorker";

    const fs = require("tns-core-modules/file-system");
    const maxPitch = 300;
    const minPitch = 50;

    const noRungs = 5;

    const widthOfMiddleBar = 50;
    const firstRungOffsetFromTop = 40; // to make space for the label on top of the first rung;

    const indicatorBoxWidth = 35;

    const ANDROGYNOUS_BOTTOM_BORDER = 120;
    const ANDROGYNOUS_TOP_BORDER = 160;

    const permissions = require('nativescript-permissions');
    require("nativescript-nodeify"); //Trying this, in case the issue is with Node.js package compatibility
    //pitchfinder
    const WavDecoder = require("wav-decoder");
    const Pitchfinder = require("pitchfinder");
    const PitchDetectionWorker = require('nativescript-worker-loader!./ConvoVizComponents/PitchDetectionWorker.js');

    export default {
        props: ['recPath'],
        components: {
            SpectraActionButton
        },
        data() {
            return {
                noRungs, // for some reason variables into v-for cannot be bound to computed
                maxPitch,
                minPitch,
                widthOfMiddleBar,
                firstRungOffsetFromTop,
                indicatorBoxWidth,

                ANDROGYNOUS_BOTTOM_BORDER,
                ANDROGYNOUS_TOP_BORDER,

                INFO_TEXT: //Placeholder, to fill in with text description of calculation result (for accessibility)
                    "Recording is located at: " + this.recPath + " and the calculated pitch is: ",
                specificPitchGoal: this.$store.state.hz,
                // specificPitchGoal: 150,
                calculatedPitch: 0,

                pitchStats: null,
            }
        },
        mounted() {
            // return;
            permissions.requestPermission(android.Manifest.permission.READ_EXTERNAL_STORAGE, "READ a test file").then(() => {

                /*console.log('recpath', this.recPath);
                //Load recording file
                let recFile = fs.File.fromPath(this.recPath);
                let source = recFile.readSync((err) => {
                    console.log(err);
                });
                console.log('src!!!', source);
                // https://stackoverflow.com/questions/41346769/nativescript-is-there-a-way-to-retrieve-the-binary-data-and-process-it-after-be
                let typedBuffer = new Uint8Array(source);*/

                // console.log('this is the buffer!!');
                // console.log(buffer);

                try {
                    // const decoded = WavDecoder.decode.sync(typedBuffer.buffer);
                    //
                    // console.log('decode successful');
                    // const float32Array = decoded.channelData[0];

                    /*const detectPitch = new Pitchfinder.YIN();

                    let calculatedPitch = detectPitch(float32Array);

                    console.log('Calculated pitch is ' + calculatedPitch);*/


                    console.log('starting pd worker');
                    let worker = new PitchDetectionWorker();
                    worker.onmessage = (msg) => {
                        console.log("Received message in UI thread from worker", msg);
                        let payload = msg.data;
                        switch(payload.type){
                            case RESPONSE_MSG_TYPES.WAV_FILE_ANALYZED:
                                let _stats = payload.data;
                                for (let key of Object.keys(_stats)) {
                                    _stats[key] = _stats[key] || NaN;
                                }
                                this.pitchStats = _stats;
                                return
                        }
                    };
                    worker.postMessage({type: REQUEST_MSG_TYPES.ANALYZE_WAV_FILE, data: this.recPath});

                    /*let frequencies = Pitchfinder.frequencies(Pitchfinder.AMDF(), float32Array, {
                        tempo: 130, // in BPM, defaults to 120
                        quantization: 4, // samples per beat, defaults to 4 (i.e. 16th notes)
                    });

                    frequencies = frequencies.filter(item => !!item).sort();

                    console.log('pitches ', frequencies);

                    const mid = Math.floor(frequencies.length / 2);
                    const median = frequencies.length % 2 !== 0 ? frequencies[mid] :
                        (frequencies[mid - 1] + frequencies[mid]) / 2;

                    // setTimeout(() => {
                    this.pitchStats = {
                        max: frequencies[0],
                        min: frequencies[frequencies.length - 1],
                        avg: frequencies.reduce((a,b) => a + b, 0) / frequencies.length,
                        median: median
                    }*/
                    // }, 1000);
                }
                catch (exception) {
                    console.log(exception);
                }

            }).catch(() => {

            });


            //show a loading animation?

            /*const decoded = WavDecoder.decode.sync(buffer); //crashes here "Invalid WAV file" line 25 https://github.com/mohayonao/wav-decoder/blob/master/index.js
            const float32Array = decoded.channelData[0];

            //Do pitch analysis as in https://github.com/peterkhayes/pitchfinder
            const detectPitch = new Pitchfinder.YIN();
            this.calculatedPitch = detectPitch(float32Array);

            console.log('Calculated pitch is ' + pitch);*/

            //const detectors = [detectPitch, Pitchfinder.AMDF()];
            //const frequencies = Pitchfinder.frequencies(detectors, float32Array, {
            //May need to play with these options to optimize for speech?
            //tempo: 120, //default BPM
            //quantization: 4, //default samples per beat
            //});

            // set the state to dismiss the loading indicator

        },
        computed: {
            vizAreaHeight: () => platformModule.screen.mainScreen.heightDIPs * 0.55,
            vizAreaWidth: () => platformModule.screen.mainScreen.widthDIPs * 0.9,

            goalNote: function () {
                if (this.specificPitchGoal === 0) { //If user has not set a pitch goal
                    return null;
                } else {
                    return noteFromPitch(this.specificPitchGoal);
                }
            },
            legendText: function () {
                return 'Average: ' + truncateDecimal(this.pitchStats.avg, 2) + ' Hz ' + noteFromPitch(this.pitchStats.avg) + '\n' +
                    'Highest: ' + truncateDecimal(this.pitchStats.max, 2) + ' Hz ' + noteFromPitch(this.pitchStats.max) + '\n' +
                    'Lowest: ' + truncateDecimal(this.pitchStats.min, 2) + ' Hz ' + noteFromPitch(this.pitchStats.min) + '\n' +
                    'Median: ' + truncateDecimal(this.pitchStats.median, 2) + ' Hz ' + noteFromPitch(this.pitchStats.median);
            },
            // for the vertical bar in the middle
            a: function () {
                return {'flex': String((maxPitch - this.pitchStats.max) / (maxPitch - minPitch))}
            },
            b: function () {
                return {'flex': String((this.pitchStats.max - this.pitchStats.min) / (maxPitch - minPitch))}
            },
            c: function () {
                return {'flex': String((this.pitchStats.min - minPitch) / (maxPitch - minPitch))}
            },
            // for the fem, andro, and masc background
            d: function () {
                return {'flex': String((maxPitch - ANDROGYNOUS_TOP_BORDER) / (maxPitch - minPitch))}
            },
            e: function () {
                return {'flex': String((ANDROGYNOUS_TOP_BORDER - ANDROGYNOUS_BOTTOM_BORDER) / (maxPitch - minPitch))}
            },
            f: function () {
                return {'flex': String((ANDROGYNOUS_BOTTOM_BORDER - minPitch) / (maxPitch - minPitch))}
            }
        },
        methods: {
            onReturn: function () {
                //Nav back to ActiveExercises
                this.$navigateTo(ActiveExercises);
            },
            calculateRungHz: function (index) {
                return maxPitch - ((maxPitch - minPitch) / (noRungs - 1)) * (index - 1);
            },
            calculateRungNote: function (index) {
                return noteFromPitch(this.calculateRungHz(index));
            },
            getAbsoluteOffsetFromTop: function (hertz) {
                // firstRungOffsetFromTop is the distance from the top to accommodate the first rung label
                return firstRungOffsetFromTop + (1 - (hertz - minPitch) / (maxPitch - minPitch)) * (this.vizAreaHeight - firstRungOffsetFromTop);
            },
            truncateDecimal
        }
    }
</script>

<style scoped>
    Page {
        background-color: #E8E8E8;
    }

    #container {
        padding: 15em;
    }

    #title {
        font-size: 30em;
        font-family: serif;
        color: #000;
        font-weight: 700;
        background-color: transparent;
    }

    #desc {
        border-width: 0;
        background-color: transparent;
        border-color: #E8E8E8;
    }

    .rungLabel {
        font-style: italic;
        color: #444;
        background-color: transparent;
        border-width: 0;
        text-align: right;
    }

    .indicatorLabel {
        background-color: white;
        opacity: 0.5;
        font-size: 12em;
        font-weight: bold;
        text-align: center;
        border-color: purple;
        border-width: 2dp;
        border-radius: 5dp;
    }

    .legend {
        background-color: white;
        opacity: 0.5;
        font-size: 15em;
        border-width: 2dp;
        border-radius: 5dp;
        text-align: left;
        margin-left: 5dp;
        margin-right: 5dp;
        font-weight: bold;
    }

    .zoneLabel {
        font-size: 25em;
        background-color: transparent;
        border-width: 0;
        color: lightgrey;
    }
</style>
