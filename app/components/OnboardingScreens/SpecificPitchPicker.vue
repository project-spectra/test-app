<template>

    <Page @loaded="onPageLoaded"
          actionBarHidden="true" class="page">

        <FlexboxLayout style="flex: 1;" flexDirection="column" id="container">
            <TextView text="Set A Goal" editable="false" id="welcome"/>

            <TextView editable="false" id="set-a-goal-desc">
                <Span :text="WELCOME_TEXT"/>
            </TextView>

            <FlexboxLayout flexDirection="row" id="container" :minHeight="sliderAreaHeight">
                <!--fixed width-->
                <FlexboxLayout style="width: 55%; align-items: flex-end; justify-content: center" flexDirection="column" id="container">

                    <TextView editable="false" id="selectedPitchLegend">
                        <Span :text="  this.currentNote + '/' + this.currentPitchHz + ' Hz'"  style="font-size: 25em; font-weight: bold" />
                        <Span :text="'\n'" />
                        <Span :text="`(${currentPitchTextDescription})`" />
                    </TextView>
                </FlexboxLayout>

                <!--<FlexboxLayout style="flex: 1; align-items: center;" flexDirection="column" id="container">-->
                <AbsoluteLayout backgroundColor="transparent" minWidth="50">


                    <StackLayout backgroundColor="white" left="30" minWidth="20"  borderColor="black"
                                 borderWidth="2dp" :height="sliderAreaHeight"/>
                    <StackLayout @pan="onSliderPan" backgroundColor="black" :top="sliderOffset" width="50"
                                 :height="sliderKnobHeight"/>
                </AbsoluteLayout>
                <!--</FlexboxLayout>-->

                <FlexboxLayout style="flex: 1; align-items: center;" flexDirection="column" >
                    <!--<TextView text="show up!" editable="false" id="welcome"/>-->
                    <StackLayout flexGrow="1" backgroundColor="#B6A9D7" style="width: 60%;"/>
                    <StackLayout flexGrow="1" backgroundColor="#BF99D7" style="width: 60%;"/>
                    <StackLayout flexGrow="1" backgroundColor="#D7B7DF" style="width: 60%;"/>
                </FlexboxLayout>
            </FlexboxLayout>

            <FlexboxLayout style="justify-content: center;">
                <FlexboxLayout flexDirection="row" justifyContent="space-between" id="play-this-pitch"
                               @tap="playThisPitchTap" >
                    <Label text="Play this pitch" alignSelf="center" style="font-weight: bold; font-size: 20em" />
                    <StackLayout width="10dp"/>
                    <Label :text="'\uf028'" alignSelf="center" style="font-size: 20em;" class="fas" />
                </FlexboxLayout>
            </FlexboxLayout>


            <!--Empty placeholder (there is no equivalent of div in NS..) -->
            <StackLayout style="flex-grow: 1"/>

            <FlexboxLayout justifyContent="space-between" flexDirection="row">
                <SpectraActionButton type='warning' text="Return" @tap="onReturn" />
                <SpectraActionButton text="All Set :)" @tap="onOK" />
            </FlexboxLayout>

        </FlexboxLayout>

    </Page>
</template>

<script>

    // the range that the slider is supposed to represent
    // https://languagelog.ldc.upenn.edu/nll/?p=5908
    import {PanGestureEventData} from "tns-core-modules/ui/gestures";

    const MIN_PITCH_HZ = 85;
    const ANDROGYNOUS_BOTTOM_BORDER = 120;
    const ANDROGYNOUS_TOP_BORDER = 160;
    const MAX_PITCH_HZ = 220;

    const AUDIO_SAMPLE_DURATION = 5;

    const SLIDER_KNOB_HEIGHT = 16;

    import * as platformModule from 'tns-core-modules/platform';
    import App from "@/components/App";

    import SpectraActionButton from "@/components/UIControls/SpectraActionButton";
    import SpectraTextView from "@/components/UIControls/SpectraTextView";

    import {noteFromPitch} from '@/utils/Utils';
    import {isAndroid} from "tns-core-modules/platform";


    export default {
        /*mounted() {
            let sliderContainer = this.$refs.sliderContainer;
            console.log(sliderContainer);
            sliderContainer.nativeView.setClipChildren(false);
        },*/
        onNavigatedTo: function(args) {
            console.log(platformModule.screen.mainScreen.heightDIPs * 0.5);
        },
        components: {
            SpectraActionButton,
            SpectraTextView
        },
        data() {
            return {
                name: '',
                WELCOME_TEXT:
                    "Since you said you wanted to aim for a specific pitch, select it below.\n" +
                    "Remember, pitch isn't everything, so choosing a manageable goal is best.",
                sliderProgress: 0.5,

            }
        },
        computed: {
            sliderKnobHeight: () => SLIDER_KNOB_HEIGHT,
            sliderAreaHeight: () => platformModule.screen.mainScreen.heightDIPs * 0.4,
            currentNote: function () {
                return noteFromPitch(this.currentPitchHz);
            },
            currentPitchHz: function() {
                // math.round is for https://stackoverflow.com/questions/11832914/round-to-at-most-2-decimal-places-only-if-necessary
                return Math.round((this.sliderProgress * (MAX_PITCH_HZ - MIN_PITCH_HZ) + MIN_PITCH_HZ) * 100) / 100;
            },
            sliderOffset: function() {
                /*let percentage = (this.currentPitchHz - MIN_PITCH_HZ) / (MAX_PITCH_HZ - MIN_PITCH_HZ);
                if (percentage < 0){percentage = 0}
                if (percentage > 1){percentage = 1}
                percentage = 1 - percentage;*/
                return (1 - this.sliderProgress )* (this.sliderAreaHeight - SLIDER_KNOB_HEIGHT)
            },
            currentPitchTextDescription: function() {
                if (this.currentPitchHz < ANDROGYNOUS_BOTTOM_BORDER){
                    return 'male range';
                }
                else if (this.currentPitchHz < ANDROGYNOUS_TOP_BORDER) {
                    return 'androgynous range';
                }
                else {
                    return 'female range';
                }
            }
        },
        methods: {
            playThisPitchTap: function(args) {
                console.log("playing note!");
                if (isAndroid) {
                    let duration = AUDIO_SAMPLE_DURATION; // seconds
                    let sampleRate = 22050;
                    let numSamples = duration * sampleRate;
                    let samples = [];
                    // let buffer = [];
                    let buffer = Array.create("short", numSamples);

                    for (let i = 0; i < numSamples; ++i)
                    {
                        samples.push( Math.sin(2 * Math.PI * i / (sampleRate / this.currentPitchHz)) ); // Sine wave
                        buffer[i] = samples[i] * 32767;  // Higher amplitude increases volume
                    }

                    let audioTrack = new android.media.AudioTrack(android.media.AudioManager.STREAM_MUSIC,
                        sampleRate, android.media.AudioFormat.CHANNEL_OUT_MONO,
                        android.media.AudioFormat.ENCODING_PCM_16BIT, buffer.length,
                        android.media.AudioTrack.MODE_STATIC);

                    audioTrack.write(buffer, 0, buffer.length);
                    audioTrack.play();
                }
                else {
                    alert('Not implemented for your platform yet!');
                }


            },
            onPageLoaded: function(args) {
                /*console.log("navigated to the pitch picker");
                let page = args.object;
                let sliderContainer = page.getViewById('sliderContainer');
                console.log(sliderContainer);
                console.log('grid clipChildren: ' + sliderContainer.android.getClipChildren());
                sliderContainer.android.getParent().setClipChildren(false);

                console.log('grid clipChildren: ' + sliderContainer.android.getClipChildren()); */
            },
            onOK: function(){
                this.$store.dispatch('setSpecificPitchGoal',this.currentPitchHz);
                this.$store.dispatch('setFirstLoad',false);
                //this.$store.commit("save", {...this.$store.state, specificPitchGoal: this.currentPitchHz, firstLoad: false});
                this.$navigateTo(App, {clearHistory: true});
            },

            onReturn: function(){
                this.$navigateBack();
            },
            onSliderPan(args) {
                if (args.state === 1) // down
                {
                    // this.prevDeltaX = 0;
                    this.prevDeltaY = 0;
                }
                else if (args.state === 2) // panning
                {
                    /*this.dragImageItem.translateX += args.deltaX - this.prevDeltaX;
                    this.dragImageItem.translateY += args.deltaY - this.prevDeltaY;*/

                    let delta = (args.deltaY - this.prevDeltaY);
                    // console.log(delta);
                    this.sliderProgress = this.sliderProgress -
                        delta / this.sliderAreaHeight;

                    if (this.sliderProgress < 0){this.sliderProgress = 0}
                    if (this.sliderProgress > 1){this.sliderProgress = 1}

                    // this.prevDeltaX = args.deltaX;
                    this.prevDeltaY = args.deltaY;
                }
                else if (args.state === 3) // up
                {

                }
            }

            /*onSliderLoaded(event) {
                console.log(event);
                const layout = event.object;
                if (layout.android) {
                    layout.android.getParent().setClipChildren(false);
                }
            }*/
        }
    }

</script>


<style scoped>
    Page {
        background-color: #E8E8E8;
    }

    #play-this-pitch {
        background-color: #C98DD8;
        padding: 15dp;
        /*min-width: 80dp;*/
        /*width: 70dp;*/
        border-radius: 5dp;
        box-shadow: 5px 5px 10px;
    }

    #container {
        padding: 15em;
    }

    #welcome {
        font-size: 20em;
        font-family: serif;
        color: #000;
        font-weight: 700;
        background-color: transparent;
    }

    #set-a-goal-desc {
        border-width: 0;
        background-color: transparent;
        border-color: #E8E8E8;
    }

    #selectedPitchLegend {
        border-width: 0;
        background-color: transparent;
        border-color: #E8E8E8;
        text-align: right;
    }

</style>
