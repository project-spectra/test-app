<template>
    <Page actionBarHidden="true" class="page">
        <FlexboxLayout style="flex: 1;" flexDirection="column" id="container">
            <TextView text="Conversation Practice" editable="false" id="title"/>

            <TextView editable="false" :text="answering ? ANSWERING_TEXT : INFO_TEXT" height="150em" id="desc"/>

            <!--cat chat goes here !-->
            <AbsoluteLayout height="200em" backgroundColor="lightgray" margin="10em">

                <Image src="res://cat" left="200em" top="0" width="120em" stretch="aspectFit"/>

                <TextView left="0" top="30dp" id="chat-bubble" editable="false" :text="question"/>

                <Textview left="70" top="100dp" id="chat-bubble" editable="false" text="I'm listening!"
                          v-if="answering"/>

            </AbsoluteLayout>

            <StackLayout flexGrow="1"/>

            <!--nav buttons-->
            <FlexboxLayout justifyContent="space-between" flexDirection="row">
                <SpectraActionButton type='warning' text="Back" @tap="onBack"/>

                <SpectraActionButton :text="answering ? 'Done' : 'Answer'" @tap="onStartPluginTest"/>
            </FlexboxLayout>
        </FlexboxLayout>
    </Page>
</template>

<script>

    import SpectraActionButton from "@/components/UIControls/SpectraActionButton";
    import {SpectraPitchPerfectPlugin} from 'nativescript-spectra-pitch-perfect-plugin';
    // import {SpectraAudioRecorderPlugin} from 'nativescript-spectra-audio-recorder-plugin';
    import {alert} from 'tns-core-modules/ui/dialogs/dialogs';
    import ConvoViz from '@/components/ExerciseScreens/ConvoViz';

    //Initialize recorder
    const fs = require('tns-core-modules/file-system');
    const permissions = require('nativescript-permissions');
    const audio = require('nativescript-audio');
    const moment = require("moment");

    //const recordingPath = fs.knownFolders.currentApp().path; //inaccessible to user

    function getRecordingPath() {
        return android.os.Environment.getExternalStorageDirectory().getAbsolutePath().toString() +
            '/' + "convo_" + moment().format('MMM_DD_h_mm_ss') + '.wav';  // will first record as raw pcm
    }


    //path to recording
    //const recordingPath = fs.path.normalize(directory + "/recording.wav");

    // let _nativePluginInstance = new SpectraAudioRecorderPlugin();

    let _nativePluginInstance = new SpectraPitchPerfectPlugin();

    export default {
        components: {SpectraActionButton},
        data() {
            return {
                INFO_TEXT:
                    "Let's put the skills you've learned into practice, and get a sense of where your voice is at. Respond to the question freely, as though you were talking to someone next to you. When you're ready, tap 'Answer'!",
                ANSWERING_TEXT:
                    "Your voice is currently being recorded.\n\nWhen you're done responding to the question, tap 'Done!' and you will receive feedback on your voice.",
                answering: false,

                pitchArray: [],
                // isRecording: false,
            }
        },
        computed: {
            question() {
                //pick a random question from a list
                let questions = Array(
                    "How is your day going?",
                    "What are you looking\nforward to right now?",
                    "What was the last\nfun thing you did?",
                    "Tell me about a close\nfriend or family member.",
                    "What's something you like\nto do in your free time?",
                    "What was the last movie\nyou saw? What did you think?",
                    "What's your favorite animal\nand why?",
                    "What kind of music do you\nlike to listen to, and why?",
                    "What's the best thing that\nhappened to you last week?",
                    "How are you feeling today?",
                    "What are you up to tomorrow?"
                );
                return questions[Math.floor(Math.random() * questions.length)];
            }
        },
        methods: {
            onBack: function () {
                _nativePluginInstance.stop();
                this.$navigateBack();
            },
            onPitchDetectionResult(pitchHz, probability, isPitched) {
                if (isPitched && probability > 0.8) {
                    this.pitchArray.push(pitchHz);
                    // console.log(pitchHz);
                    // this.continuousNoteStart();
                }
            },
            onStartPluginTest: function () {
                if (!this.answering) {

                    //Write to accessible directory to test the audio file outputs
                    /*permissions.requestPermission([android.Manifest.permission.WRITE_EXTERNAL_STORAGE,
                        android.Manifest.permission.RECORD_AUDIO], "Write a test file").then(() => {
                        this.answering = true;

                        let recordingPath = getRecordingPath();
                        _nativePluginInstance.launchTask(recordingPath).then(res => {
                            console.log('Recorded file metadata', res);
                            this.$navigateTo(ConvoViz, {props: {recPath: recordingPath}});
                        });
                        this.isRecording = true;
                    }).catch(() => {
                        console.log("Uh oh, no permissions - plan B time!");
                        alert('Unfortunately, we need to use your microphone for you to do this exercise.');
                    });*/

                    permissions.requestPermission(android.Manifest.permission.RECORD_AUDIO, "Conversation Exercise").then(() => {

                        this.answering = true;
                        this.pitchArray = [];

                        _nativePluginInstance.start({
                            onPitchDetectionResult: this.onPitchDetectionResult.bind(this),
                        });
                    }).catch(() => {
                        console.log("Uh oh, no permissions - plan B time!");
                        alert('Unfortunately, we need to use your microphone for you to do this exercise.');
                    })


                } else {
                    this.answering = false;
                    _nativePluginInstance.stop();
                    if (this.pitchArray.length === 0) {
                        alert("Unfortunately, we weren't able to detect your pitch! Please try getting closer to the mic, or moving somewhere less noisy.")
                    } else {
                        this.$navigateTo(ConvoViz, {props: {pitchArray: this.pitchArray}});
                    }
                }
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

    #chat-bubble {
        background-color: white;
        font-size: 15em;
        border-radius: 8em;
        border-width: 1em;
        border-color: black;
        padding: 7em;
    }

</style>
