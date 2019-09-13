<template>
    <Page actionBarHidden="true" class="page" >
      <FlexboxLayout style="flex: 1;" flexDirection="column" id="container">
            <TextView text="Conversation Practice" editable="false" id="title"/>

            <TextView editable="false" :text="answering ? ANSWERING_TEXT : INFO_TEXT" height="150em" id="desc" />

            <!--cat chat goes here !--> 
            <AbsoluteLayout height="200em" backgroundColor="lightgray" margin="10em">

              <Image src="res://cat" left="200em" top="0" width="120em" stretch="aspectFit" />

              <TextView left="0" top="30dp" id="chat-bubble" editable="false" :text="question" />

              <Textview left="70" top="100dp" id="chat-bubble" editable="false" text="I'm listening!" v-if="answering" />

            </AbsoluteLayout>

            <StackLayout flexGrow="1" />

            <!--nav buttons--> 
            <FlexboxLayout justifyContent="space-between" flexDirection="row">
                <SpectraActionButton type='warning' text="Back" @tap="onBack" />

                <SpectraActionButton :text="answering ? 'Done' : 'Answer'" @tap="onStart" />
            </FlexboxLayout>
        </FlexboxLayout>
    </Page>
</template>

<script>

    import SpectraActionButton from "@/components/UIControls/SpectraActionButton";
    import { alert } from 'tns-core-modules/ui/dialogs/dialogs';

    //Initialize recorder
    const fs = require('tns-core-modules/file-system');
    const permissions = require('nativescript-permissions');
    const audio = require('nativescript-audio');
    const audioFolder = fs.knownFolders.temp();
    const recordingPath = audioFolder.path + '/recording.mp3';
    var recorder;

    export default {
      components: {SpectraActionButton},
      data() {
          return {
                INFO_TEXT:
                    "Let's put the skills you've learned into practice, and get a sense of where your voice is at. Respond to the question freely, as though you were talking to someone next to you. When you're ready, tap 'Answer'!",
                ANSWERING_TEXT:
                    "Your voice is currently being recorded.\n\nWhen you're done responding to the question, tap 'Done!' and you will receive feedback on your voice.",
                answering: false,
                isRecording: false,
          }
      },
      computed: {
        question() {
          //pick a random question from a list
          var questions = Array(
            "How is your day going?",
            "What are you looking\nforward to right now?",
            "What was the last\nfun thing you did?",
            "Tell me about a close\nfriend or family member.",
            "What's something you like\nto do in your free time?",
            "What was the last movie\nyou saw? What did you think?",
            "What's your favorite animal?\n(It's okay if it's not a cat!)"
          )
          return questions[Math.floor(Math.random()*questions.length)];
        }
      },
      methods: {
        onBack: function() {
          this.$navigateBack();
        },
        onStart: function() {
          //If not answering yet
          if (!this.answering) {
            //Chat bubble appears with "I'm listening"
            this.answering = true;
            //Start the recording
            recorder = new audio.TNSRecorder();

            if (audio.TNSRecorder.CAN_RECORD()) {
              var recorderOptions = {
                filename: recordingPath,
                infoCallback: function () {
                  console.log('infoCallback');
                },
                errorCallback: function () {
                  console.log('errorCallback');
                  alert('Error recording.');
                }
              };
              console.log('Recorder options: ' + recorderOptions);

              recorder.start(recorderOptions).then(function(res) {
                console.log("Recording has started to " + recordingPath);
                this.isRecording = true;
              }, function(err) {
                this.isRecording = false;
                console.log('ERROR: ' + err);
              });
            } else {
              alert('Unfortunately, this exercise requires a microphone.');
            }

          } else { //If user is recording and taps "Done"
            console.log("Done tapped");
            //Stop recording
            if (recorder != undefined) {
              recorder.stop().then(function () {
                this.isRecording = false;
                console.log('Audio Recorded Successfully.');
              }, function (err) {
                console.log("Error");
                this.isRecording = true;
              });
            }

            //Navigate to new page, do analysis of recording, show visualization, delete recording

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
