<template>
    <Page @loaded="onPageLoaded"
          actionBarHidden="true" class="page">
        <FlexboxLayout style="flex: 1;" flexDirection="column" id="container">
            <TextView :text="'Pitch Perfect: Level 1'" editable="false" id="pitch-perfect-level-1-title"/>


            <FlexboxLayout flexWrap="wrap" justifyContent="center" flexDirection="row" id="holdNoteInfo" >
                <TextView text="Hold the note " editable="false" id="holdNoteText"/>
                <IntroNotePickerButton selected="false" :text="targetNote" />
                <TextView text=" as long as you can." editable="false" id="holdNoteText"/>

            </FlexboxLayout>

            <StackLayout flexGrow="1" :style="pitchPerfectLevel1Style">
                <StackLayout style="margin-top: 15dp; margin-left: 15dp; margin-right: 15dp;">

                    <FlexboxLayout flexDirection="row">
                        <TextView :width="this.exerciseState === this.EXERCISE_STATE_ENUM.HOLDING_NOTE ? '80%' : '100%'"
                                  :text="this.exerciseState === this.EXERCISE_STATE_ENUM.HOLDING_NOTE ? 'That\'s it!\nHold that note!' : 'Try to move your pitch indicator up to the indicated line' "
                                  style="background-color: white; font-size: 15em;" editable="false"/>


                        <TextView v-if="this.exerciseState === this.EXERCISE_STATE_ENUM.HOLDING_NOTE"
                                  width="20%" :text="':' + Math.ceil(this.exerciseStopwatch.time() / 1000)"
                                  style="color: darkred; font-weight: bold; border-width: 0; text-align: center; font-size: 20em; background-color: transparent;"
                                  editable="false" />
                    </FlexboxLayout>

                    <FlexboxLayout>
                        <!-- the arrow is bound to be smaller than the container. the height will
                        be as calculated in pitchIndicatorContainerStyle-->
                        <AbsoluteLayout :style="pitchIndicatorArrowContainerStyle" backgroundColor="transparent">
                            <!-- remember that padding-top and padding-bottom are both 40dp-->
                            <!-- the indicator itself is 25 dp -->
                            <Label :top="arrowOffset" :text="'\uf054'" alignSelf="center" :style="arrowStyle" class="fas" />
                        </AbsoluteLayout>

                        <StackLayout style="min-width: 10dp"/>
                        <FlexboxLayout flexDirection="column" justifyContent="space-between"
                                       :style="pitchIndicatorContainerStyle" backgroundColor="#72C8B2">

                            <StackLayout class="hr-dark" style="height: 3dp;"/>
                            <StackLayout class="hr-dark" style="background-color: darkgreen; box-shadow: 5px 5px 10px; height: 3dp;"/>
                            <StackLayout class="hr-dark" style="height: 3dp;"/>
                            <StackLayout class="hr-dark" style="height: 3dp;"/>
                        </FlexboxLayout>

                        <StackLayout style="min-width: 15dp"/>

                    </FlexboxLayout>


                </StackLayout>
            </StackLayout>

            <StackLayout style="flex-grow: 1"/>

            <FlexboxLayout justifyContent="space-between" flexDirection="row">
                <SpectraActionButton type='warning' text="Back" @tap="onBack" />
                <!--<SpectraActionButton text="Let's go!" @tap="onLetsGo" />-->
            </FlexboxLayout>

        </FlexboxLayout>

    </Page>
</template>

<script>
    import {Config} from "@/utils/Config";
    import IntroNotePickerButton from "@/components/ExerciseScreens/PitchPerfectComponents/IntroNotePickerButton";
    import SpectraActionButton from "@/components/UIControls/SpectraActionButton";
    import { SpectraPitchPerfectPlugin } from 'nativescript-spectra-pitch-perfect-plugin';
    import {getFrequency} from '@/utils/Utils';


    const Timer = require('timer-machine');

    import * as permissions from 'nativescript-permissions';
    import * as platformModule from 'tns-core-modules/platform';

    // import interpolate from 'interpolate-range';

    // import * as THREE from 'three';
    import {MathUtils} from "@/utils/Utils";


    let _nativePluginInstance = new SpectraPitchPerfectPlugin();

    export default {
        props: ['targetNote'],
        components: {IntroNotePickerButton, SpectraActionButton},
        data() {
            return {
                screenHeightDIPs: platformModule.screen.mainScreen.heightDIPs,
                pitchIndicatorContainerHeightDIPs: platformModule.screen.mainScreen.heightDIPs * 0.40,

                targetPitchHz: getFrequency(this.targetNote),

                /*arrowInterpolateFunction: interpolate({
                    inputRange: [getFrequency(this.targetNote), getFrequency(this.targetNote) - 50],
                    // target note should be on the 2nd bar, the bottommost bar should represent some lower frequency
                    outputRange: [(1/3), 1],
                    clamp: false,
                }),*/

                arrowInterpolateFunction: MathUtils.interpolateLinear(getFrequency(this.targetNote), getFrequency(this.targetNote) - 55,
                    (1/3), 1),

                currentPitchHz: getFrequency(this.targetNote),

                EXERCISE_STATE_ENUM : {
                    HOLDING_NOTE: 1,
                    NO_NOTE: 2,
                },

                exerciseState: 2,

                exerciseStopwatch: new Timer()
            }
        },

        computed: {

            arrowStyle() {
                return {
                    'height': '50dp',
                    'font-size': '50em',
                    'color': this.isPitchAcceptable() ? 'darkgreen' : '#bc3141'
                }
            },
            arrowOffset() {
                // console.log(this.arrowInterpolateFunction(this.currentPitchHz));
                let calculatedOffset = (this.pitchIndicatorContainerHeightDIPs - 40 - 40) *
                    this.arrowInterpolateFunction(this.currentPitchHz) - 25 + 40;

                // indicator shouldn't be higher than the container!
                return `${ Math.min(   Math.max(-20, calculatedOffset)  ,  this.pitchIndicatorContainerHeightDIPs - 30)     }dp`
            },
            pitchPerfectLevel1Style() {
                return {
                    'background-color': '#72C8B2',
                }
            },
            pitchIndicatorArrowContainerStyle() {
                return {
                    width: '40%',
                    height: `${this.pitchIndicatorContainerHeightDIPs}${'dp'}`,
                    // 'padding-top': '40dp',
                    // 'padding-bottom': '40dp',
                    justifyContent: 'center'
                }
            },
            pitchIndicatorContainerStyle() {
                return {
                    height: `${this.pitchIndicatorContainerHeightDIPs}${'dp'}`,
                    'padding-top': '40dp',
                    'padding-bottom': '40dp'
                }
            }
        },

        methods: {

            onBack: function() {
                _nativePluginInstance.stop();
                this.$navigateBack();
            },

            /**
             * if no pitch detected for more than
             * @param pitchHz
             * @param probability
             * @param isPitched
             */
            onPitchDetectionResult(pitchHz, probability, isPitched) {
                // console.log(this.currentPitchHz);
                // console.log(pitchHz + ' ' + probability + ' ' + isPitched);
                if (isPitched && probability > 0.8) {
                    this.currentPitchHz = pitchHz;
                    this.continuousNoteStart();
                } else {
                    this.currentPitchHz = -1;
                }

            },

            isPitchAcceptable() {
                return Math.abs(this.targetPitchHz - this.currentPitchHz) < 10;
            },

            continuousNoteStart(){
                if (this.isPitchAcceptable() && !this._continuousNoteMonitor){

                    // this.exerciseStopwatch.reset();
                    this.exerciseStopwatch.start();
                    this.exerciseState = this.EXERCISE_STATE_ENUM.HOLDING_NOTE;

                    this._continuousNoteMonitor = setInterval(() => {
                        if (!this.isPitchAcceptable()){
                            // stop the timer and reset the state
                            this.exerciseStopwatch.stop();
                            console.log(this.exerciseStopwatch.time());
                            alert('You held the note for ' + this.exerciseStopwatch.time() / 1000 + ' seconds.');
                            this.exerciseState = this.EXERCISE_STATE_ENUM.NO_NOTE;
                            clearInterval(this._continuousNoteMonitor);
                            this._continuousNoteMonitor = null;
                            this.exerciseStopwatch = new Timer();
                        }
                    }, 500);
                }
            },


            onPageLoaded: function(args) {
                console.log('onPageLoadedHmm');

                console.log(this.targetNote);

                console.log(this.targetPitchHz);
                console.log(getFrequency('C3'));

                console.log(this.arrowInterpolateFunction(getFrequency('C3')));

                console.log(platformModule.screen.mainScreen.heightDIPs);

                console.log(this.arrowOffset);

                permissions.requestPermission(android.Manifest.permission.RECORD_AUDIO, "Pitch Perfect Exercise").then(() => {
                    _nativePluginInstance.start({
                        onPitchDetectionResult: this.onPitchDetectionResult.bind(this),
                    });
                }).catch(() => {
                    console.log("Uh oh, no permissions - plan B time!");
                    alert('Unfortunately, we need to use your microphone for you to do this exercise.');
                })

            },

            onNavigatedTo: function(args) {
                console.log(args);
            }
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

    #pitch-perfect-level-1-title {
        align-self: center;
        font-size: 30em;
        font-family: 'serif';
        font-weight: 700;
        /*color: #000;*/
        border-width: 0;
        background-color: transparent;
        border-color: #E8E8E8;
    }

    #holdNoteText {
        border-width: 0;
        background-color: transparent;
        border-color: #E8E8E8;
        font-size: 20em;
    }

</style>
