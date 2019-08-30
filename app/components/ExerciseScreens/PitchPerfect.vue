<template>
    <Page actionBarHidden="true" class="page">
        <FlexboxLayout style="flex: 1;" flexDirection="column" id="container">
            <TextView :text="'Pitch Perfect'" editable="false" id="pitch-perfect-title"/>

            <TextView editable="false" id="project-spectra-desc">
                <Span text="This exercise will strengthen and balance the muscles of the voicebox." />
            </TextView>



                <!--<StackLayout style="margin-top: 15dp; margin-left: 15dp; margin-right: 15dp; font-size: 15em; background-color: white;">
                    <TextView :text="pitchPerfectReminder" style="background-color: transparent;" editable="false"/>
                </StackLayout>

                &lt;!&ndash;the timer&ndash;&gt;
                <TextView horizontalAlignment="center" :text="timeCounterFormatted" editable="false" id="timer" />

                &lt;!&ndash;the inner ring, absolutely positioned&ndash;&gt;
                <FlexboxLayout :style="micIconBgStyle" justifyContent="center">
                    <FlexboxLayout alignSelf="center" :style="micIconBgInlayStyle" justifyContent="center" >
                        <Label :text="'\uf130'" :style="micIconStyle" alignSelf="center" class="fas" />
                    </FlexboxLayout>
                </FlexboxLayout>-->

            <!--<MicRecorder />-->
            <IntroNotePicker />



            <StackLayout style="flex-grow: 1"/>

            <FlexboxLayout justifyContent="space-between" flexDirection="row">
                <SpectraActionButton type='warning' text="Back" @tap="onBack" />
                <SpectraActionButton text="Let's go!" @tap="onLetsGo" />
            </FlexboxLayout>

        </FlexboxLayout>
    </Page>
</template>

<script>
    import SpectraActionButton from "@/components/UIControls/SpectraActionButton";
    import MicRecorder from '@/components/ExerciseScreens/PitchPerfectComponents/MicRecorder';

    import {Config} from "@/utils/Config";
    import IntroNotePicker from "@/components/ExerciseScreens/PitchPerfectComponents/IntroNotePicker";

    import Level1 from './PitchPerfectLevels/Level1';
    import ActiveExercises from '../ActiveExercises';

    export default {
        components: {IntroNotePicker, SpectraActionButton, MicRecorder},
        methods: {
            onBack: function() {
                this.$navigateTo(ActiveExercises);
            },
            onLetsGo: function() {
                // the note that the user selected above
                this.$navigateTo(Level1, {props: {targetNote: 'D3'}});
            },
            startExercise(){

            },

            stopExercise(){

            }
        },
        computed: {
            /*exerciseAreaStyle() {
                return {
                    'background-color': Config.primaryColor,
                    'border-radius': '5dp',
                }
            },
            micIconBgStyle() {
                return {
                    'background-color': Config.mutedColor,
                    'width': '150dp',
                    'height': '150dp',
                    'border-radius': '100%'

                }
            },
            micIconBgInlayStyle() {
                return {
                    'background-color': 'rgba(255, 255, 255, 0.8)',
                    'width': '60dp',
                    'height': '60dp',
                    'border-radius': '100%',
                    position: 'absolute',
                    left: '50%',
                    right: '50%',
                    'margin-left': '-30dp',
                    'margin-right': '-30dp'


                }
            },
            micIconStyle(){
                return {
                    'font-size': '35em',
                }
            }*/
        },
        data() {
            return {
                /*pitchPerfectReminder: 'Start and end the exercise by touching the mic icon.',
                timeCounter: 0,
                // representing seconds as HH:mm:ss
                timeCounterFormatted: new Date(0 * 1000).toISOString().substr(11, 8)*/
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

    #pitch-perfect-title {
        font-size: 45em;
        font-family: 'serif';
        font-weight: 700;
        color: #000;
        border-width: 0;
        background-color: transparent;
        border-color: #E8E8E8;
    }

    #project-spectra-desc {
        border-width: 0;
        background-color: transparent;
        border-color: #E8E8E8;
    }

    /*#timer {
        font-family: 'monospace';
        font-size: 20em;
        !*align-self: center;*!
        color: #AC2535;
        font-weight: bold;
        background-color: transparent;

    }*/

</style>
