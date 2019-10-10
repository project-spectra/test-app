<template>
    <Page @loaded="onPageLoaded"
          actionBarHidden="true" class="page">
        <FlexboxLayout style="flex: 1;" flexDirection="column" id="container">
            <TextView :text="'Pitch Perfect: Level ' + level" editable="false" id="pitch-perfect-level-1-title"/>

            <!-- TODO: User should have a chance to hear the note and click "ready" before the next level starts !-->
            <FlexboxLayout flexWrap="wrap" justifyContent="center" flexDirection="row" id="holdNoteInfo" >
                <TextView text="Hold the note " editable="false" id="holdNoteText"/>
                <IntroNotePickerButton selected="false" :text="currentNote" sound="o"/>
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
                                  editable="false"/>
                    </FlexboxLayout>

                    <FlexboxLayout>
                        <!-- the arrow is bound to be smaller than the container. the height will
                        be as calculated in pitchIndicatorContainerStyle-->
                        <AbsoluteLayout :style="pitchIndicatorArrowContainerStyle" backgroundColor="transparent">
                            <!-- remember that padding-top and padding-bottom are both 40dp-->
                            <!-- the indicator itself is 25 dp -->
                            <Label :top="arrowOffset" :text="'\uf054'" alignSelf="center" :style="arrowStyle"
                                   class="fas"/>
                        </AbsoluteLayout>

                        <StackLayout style="min-width: 10dp"/>
                        <FlexboxLayout flexDirection="column" justifyContent="space-between"
                                       :style="pitchIndicatorContainerStyle">

                            <!--<StackLayout class="hr-dark" style="height: 3dp;"/>
                            <FlexboxLayout flexDirection="row" alignItems="center">
                                <StackLayout class="hr-dark" style="background-color: darkgreen; box-shadow: 5px 5px 10px; height: 3dp;"></StackLayout>

                                <FlexboxLayout flexDirection="row" flexGrow="1" :style="noteCircleLegendStyle">

                                    <Label text="D#1" alignSelf="center" style="font-weight: bold; font-size: 15em" />

                                </FlexboxLayout>
                            </FlexboxLayout>

                            <StackLayout class="hr-dark" style="height: 3dp;"/>
                            <StackLayout class="hr-dark" style="height: 3dp;"/>-->

                            <PitchPerfectIndicatorRow :note="this.rungs[0]"
                                                      :showNote="!hasAccidental(this.rungs[0])" color="black"/>
                            <PitchPerfectIndicatorRow :note="this.rungs[1]"
                                                      :showNote="!hasAccidental(this.rungs[1])"
                                                      :color="this.isPitchAcceptable() ? 'green' : 'red'"/>
                            <PitchPerfectIndicatorRow :note="this.rungs[2]"
                                                      :showNote="!hasAccidental(this.rungs[2])" color="black"/>
                            <PitchPerfectIndicatorRow :note="this.rungs[3]"
                                                      :showNote="!hasAccidental(this.rungs[3])" color="black"/>


                        </FlexboxLayout>

                        <StackLayout style="min-width: 15dp"/>

                    </FlexboxLayout>


                </StackLayout>
            </StackLayout>

            <StackLayout style="flex-grow: 1"/>

            <FlexboxLayout justifyContent="space-between" flexDirection="row">
                <SpectraActionButton type='warning' text="Back" @tap="onBack"/>
                <!--<SpectraActionButton text="Let's go!" @tap="onLetsGo" />-->
            </FlexboxLayout>

        </FlexboxLayout>

    </Page>
</template>

<script>
    import {Config} from "@/utils/Config";
    import ActiveExercises from "@/components/ActiveExercises";
    import IntroNotePickerButton from "@/components/ExerciseScreens/PitchPerfectComponents/IntroNotePickerButton";
    import SpectraActionButton from "@/components/UIControls/SpectraActionButton";
    import PitchPerfectIndicatorRow from "@/components/ExerciseScreens/PitchPerfectComponents/PitchPerfectIndicatorRow";
    import {SpectraPitchPerfectPlugin} from 'nativescript-spectra-pitch-perfect-plugin';
    import {getFrequency} from '@/utils/Utils';
    import {PITCHPERFECT_NOTES} from '@/utils/Constants';

    const dialogs = require("tns-core-modules/ui/dialogs");
    const Timer = require('timer-machine');

    import * as permissions from 'nativescript-permissions';
    import * as platformModule from 'tns-core-modules/platform';

    // import interpolate from 'interpolate-range';

    // import * as THREE from 'three';
    import {MathUtils} from "@/utils/Utils";
    import {transpose, Interval, hasAccidental} from 'music-fns';
    import {PITCH_PERFECT_RUNG_HEIGHT_DP} from "@/utils/Constants";

    let _nativePluginInstance = new SpectraPitchPerfectPlugin();

    export default {
        props: ['targetNote'],
        components: {PitchPerfectIndicatorRow, IntroNotePickerButton, SpectraActionButton},
        data() {
            // let targetPitchHz = getFrequency(this.targetNote);
            // let wholeNoteBelowTargetPitchHz = getFrequency(transpose(this.targetNote, -Interval.TONE));

            return {
                hasAccidental,
                screenHeightDIPs: platformModule.screen.mainScreen.heightDIPs,
                pitchIndicatorContainerHeightDIPs: platformModule.screen.mainScreen.heightDIPs * 0.40,
                currentNote: this.targetNote,
                targetPitchHz: getFrequency(this.targetNote),

                /*arrowInterpolateFunction: interpolate({
                    inputRange: [getFrequency(this.targetNote), getFrequency(this.targetNote) - 50],
                    // target note should be on the 2nd bar, the bottommost bar should represent some lower frequency
                    outputRange: [(1/3), 1],
                    clamp: false,
                }),*/

                /*arrowInterpolateFunction: MathUtils.interpolateLinear(getFrequency(this.targetNote), getFrequency(this.targetNote) - 55,
                    (1/3), 1),*/

                currentPitchHz: getFrequency(this.targetNote), // is assigned to

                EXERCISE_STATE_ENUM: {
                    HOLDING_NOTE: 1,
                    NAVIGATION_DIALOG_BOX_SHOWN: 3,
                    NO_NOTE: 2,
                },

                exerciseState: 2,

                exerciseStopwatch: new Timer(),

                level: 1
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
            // this.currentNote || this.targetNote is used because currentNote is set in the data and isn't accessible upon first navigation
            rungs() { // each rung on the metaphorical pitch ladder - Transfusion
                return [transpose(this.currentNote || this.targetNote, Interval.SEMITONE),
                    this.currentNote || this.targetNote,
                    transpose(this.currentNote || this.targetNote, -Interval.SEMITONE),
                    transpose(this.currentNote || this.targetNote, -Interval.TONE)];
            },
            // the bottom line should always be two semitones below the green line
            arrowInterpolateFunction() {
                return MathUtils.interpolateLinear(getFrequency(this.currentNote || this.targetNote),
                    getFrequency(this.currentNote || this.targetNote) - 55, (1 / 3), 1)
            },
            arrowOffset() {
                // console.log(this.arrowInterpolateFunction(this.currentPitchHz));
                // minus padding-top minus padding-bottom - half of the row height twice (one for the top rung and another for the bottom)
                let calculatedOffset = (this.pitchIndicatorContainerHeightDIPs - 40 - 40 - (PITCH_PERFECT_RUNG_HEIGHT_DP / 2) - (PITCH_PERFECT_RUNG_HEIGHT_DP / 2)) *
                    this.arrowInterpolateFunction(this.currentPitchHz) - 25 + 40 + (PITCH_PERFECT_RUNG_HEIGHT_DP / 2);

                // indicator shouldn't be higher than the container!
                return `${Math.min(Math.max(-20, calculatedOffset), this.pitchIndicatorContainerHeightDIPs - 30)}dp`
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
            },

            pitchTrack() {
                switch (this.targetNote) {
                    case 'D3':
                        return 'low';
                    case 'F3':
                        return 'med';
                    case 'G3':
                        return 'high';
                }
            },
        },
        methods: {

            onBack: function () {
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

            continuousNoteStart() {
                /*
                invariant: if _continuousNoteMonitor is running then this.isPitchAcceptable() === true AND
                the dialog should NOT be displayed, i.e. if the dialog prompting the user to quit or proceed is shown
                the stopwatch should NOT be running.
                */
                if (this.isPitchAcceptable() && !this._continuousNoteMonitor &&
                    this.exerciseState === this.EXERCISE_STATE_ENUM.NO_NOTE) {

                    // this.exerciseStopwatch.reset();
                    this.exerciseStopwatch.start();
                    this.exerciseState = this.EXERCISE_STATE_ENUM.HOLDING_NOTE;

                    this._continuousNoteMonitor = setInterval(() => {
                        if (!this.isPitchAcceptable()) {
                            // stop the timer and reset the state
                            this.exerciseStopwatch.stop();
                            let timeHeld = Math.round(this.exerciseStopwatch.time() / 1000, 1);

                            //Reset exercise data
                            this.exerciseState = this.EXERCISE_STATE_ENUM.NAVIGATION_DIALOG_BOX_SHOWN;
                            clearInterval(this._continuousNoteMonitor);
                            this._continuousNoteMonitor = null;
                            this.exerciseStopwatch = new Timer();

                            const self = this; //So we can navigate from inside the dialog
                            let name = this.$store.state.name;
                            if (this.level < 5) { //User has more levels to go. Navigate to next level

                                dialogs.confirm({
                                    title: timeHeld === 1 ? "Nice, " + timeHeld + " second!" : "Nice, " + timeHeld + " seconds!",
                                    message: "You finished level " + self.level + ", " + name + "! Take a few breaths before continuing on.",
                                    cancelButtonText: "Stop this exercise",
                                    okButtonText: "Continue to the next level"
                                }).then(function (result) {
                                    self.exerciseState = self.EXERCISE_STATE_ENUM.NO_NOTE;
                                    if (!result) { //Stop this exercise
                                        //Return user to main exercises screen
                                        _nativePluginInstance.stop();
                                        self.$navigateTo(ActiveExercises);
                                    } else { //Continue to next level
                                        //Increase level and note depending on pitch track
                                        self.level++;
                                        console.log('Moving up to level ' + self.level);
                                        console.log(PITCHPERFECT_NOTES.find(({id}) => id === self.pitchTrack + '_' + self.level).name);

                                        //Get the next note from Constants
                                        self.currentNote = PITCHPERFECT_NOTES.find(({id}) => id === self.pitchTrack + '_' + self.level).name;
                                        self.targetPitchHz = getFrequency(self.currentNote);
                                        console.log('Next note is...' + self.currentNote);
                                        console.log(self.targetPitchHz);
                                    }
                                });

                            } else { //User has reached the final level! Show dialog box to congratulate and increment exercise tracker
                                this.$store.dispatch('setPitchPerfectCompletion', this.$store.state.pitchPerfectCompleted + 1);

                                dialogs.alert({
                                    title: timeHeld === 1 ? "Nice, " + timeHeld + " second!" : "Nice, " + timeHeld + " seconds!",
                                    message: "You did it, " + name + "! If you're feeling strained, take a break before doing this or any other exercise.",
                                    okButtonText: "Return to exercises screen",
                                }).then(function () {
                                    self.exerciseState = self.EXERCISE_STATE_ENUM.NO_NOTE;
                                    _nativePluginInstance.stop();
                                    self.$navigateTo(ActiveExercises, {clearHistory: true});
                                });
                            }
                        }
                    }, 500); // - Use the exercise state to determine whether to monitor the presence of a continuous note. -Transfusion
                }
            },

            onPageLoaded: function (args) {
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

            onNavigatedTo: function (args) {
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
