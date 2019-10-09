<template>
    <Page actionBarHidden="true" class="page">

        <FlexboxLayout v-if="!this.pitchStats" style="flex: 1;" flexDirection="column" justifyContent="center">
            <ActivityIndicator busy="true"/>
        </FlexboxLayout>

        <FlexboxLayout v-if="!!this.pitchStats" style="flex: 1;" flexDirection="column" id="container">
            <TextView text="Done!" editable="false" id="title"/>

            <TextView editable="false" style="background-color: transparent;">
                <Span text="Your average pitch was "/>
                <Span :text="Math.round(pitchStats.avg) + ' Hz ' + '(' + noteFromPitch(pitchStats.avg) + ')'"
                      style="font-style: italic; font-weight: bold;"/>
                <Span text=" and your range was "/>
                <Span :text="`${Math.round(pitchStats.min)} - ${Math.round(pitchStats.max)} Hz.`"
                      style="font-style: italic; font-weight: bold;"/>

                <Span v-if="specificPitchGoal" text=" You were "/>
                <Span v-if="specificPitchGoal"
                      :text="Math.round(specificPitchGoal - pitchStats.median) + ' Hz '"
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
                               flexDirection="column" backgroundColor="white" :width="widthOfMiddleBar">
                    <StackLayout :style="a" backgroundColor="white"/>
                    <StackLayout :style="b" backgroundColor="red"/>
                    <StackLayout :style="c" backgroundColor="white"/>
                </FlexboxLayout>
                <!--<StackLayout class="hr-dark" style="height: 1dp;"/>
                <StackLayout class="hr-dark" style="height: 1dp;"/>
                <StackLayout class="hr-dark" style="height: 1dp;"/>-->
                <!--</FlexboxLayout>-->

                <!-- Min indicator !-->
                <StackLayout height="2dp"
                             :width="calculateIndicatorLineLength(2)"
                             backgroundColor="purple"
                             :top="getAbsoluteOffsetFromTop(this.pitchStats.min)"
                             :left="calculateIndicatorLineAbsoluteOffset(2)"/>
                <TextView editable="false" class="indicatorLabel" text="Min" :width="indicatorBoxWidth" height="40"
                          :top="getAbsoluteOffsetFromTop(this.pitchStats.min) - (40/2)"
                          :left="calculateIndicatorLineAbsoluteOffset(2) - indicatorBoxWidth"/>


                <!-- Median indicator
                <StackLayout height="2dp" :width="50 + 15 + (indicatorBoxWidth + 5) + (indicatorBoxWidth + 5)"
                             backgroundColor="purple"
                             :top="getAbsoluteOffsetFromTop(this.pitchStats.median)"
                             :left="(vizAreaWidth / 2) - (15 + indicatorBoxWidth + 5 + (indicatorBoxWidth + 5))"/>
                <TextView editable="false" class="indicatorLabel" text="Med" :width="indicatorBoxWidth" height="40"
                          :top="getAbsoluteOffsetFromTop(this.pitchStats.median) - (40/2)"
                          :left="(vizAreaWidth / 2) - (15 + indicatorBoxWidth + 5 + (indicatorBoxWidth + 5)) - indicatorBoxWidth"/>
                !-->

                <!-- Mean indicator !-->
                <StackLayout height="2dp" :width="calculateIndicatorLineLength(1)" backgroundColor="purple"
                             :top="getAbsoluteOffsetFromTop(this.pitchStats.avg)"
                             :left="calculateIndicatorLineAbsoluteOffset(1)"/>
                <TextView editable="false" class="indicatorLabel" text="Avg" :width="indicatorBoxWidth" height="40"
                          :top="getAbsoluteOffsetFromTop(this.pitchStats.avg) - (40/2)"
                          :left="calculateIndicatorLineAbsoluteOffset(1) - indicatorBoxWidth"/>


                <!-- Max indicator !-->
                <StackLayout height="2dp" :width="calculateIndicatorLineLength(0)" backgroundColor="purple"
                             :top="getAbsoluteOffsetFromTop(this.pitchStats.max)"
                             :left="calculateIndicatorLineAbsoluteOffset(0)"/>
                <TextView editable="false" class="indicatorLabel" text="Max" :width="indicatorBoxWidth" height="40"
                          :top="getAbsoluteOffsetFromTop(this.pitchStats.max) - (40/2)"
                          :left="calculateIndicatorLineAbsoluteOffset(0) - indicatorBoxWidth"/>


                <!-- Legend
                <TextView editable="false" class="legend" :text="legendText" top="10" width="160"
                          :left="vizAreaWidth - 160 - 10"/>
                !-->

                <!-- Specific Pitch Goal !-->
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

                try {
                    console.log('starting pd worker');
                    let worker = new PitchDetectionWorker();
                    worker.onmessage = (msg) => {
                        console.log("Received message in UI thread from worker", msg);
                        let payload = msg.data;
                        switch (payload.type) {
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

                } catch (exception) {
                    console.log(exception);
                }

            }).catch(() => {

            });
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
                return 'Average: ' + Math.round(this.pitchStats.avg) + ' Hz ' + noteFromPitch(this.pitchStats.avg) + '\n' +
                    'Highest: ' + Math.round(this.pitchStats.max) + ' Hz ' + noteFromPitch(this.pitchStats.max) + '\n' +
                    'Lowest: ' + Math.round(this.pitchStats.min) + ' Hz ' + noteFromPitch(this.pitchStats.min); //+ '\n' +
                //'Median: ' + Math.round(this.pitchStats.median, 2) + ' Hz ' + noteFromPitch(this.pitchStats.median);
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
            // used for the min, mean, and max indicators.
            // indexFromLeft starts at 0
            calculateIndicatorLineLength: function (indexFromRight) {
                return widthOfMiddleBar + 15 + (indicatorBoxWidth + 5) * indexFromRight;
            },
            calculateIndicatorLineAbsoluteOffset: function (indexFromRight) {
                return (this.vizAreaWidth / 2) - (15 + (indicatorBoxWidth + 5) * indexFromRight);
            },
            truncateDecimal,
            noteFromPitch
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
        font-size: 15em;
        font-style: italic;
        background-color: transparent;
        border-width: 0;
        color: lightgrey;
    }
</style>
