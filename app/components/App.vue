<template>
  <Page class="page">
    <ActionBar title="Project Spectra" class="action-bar" />
      <StackLayout>
        <StackLayout class="input-field">
          <Label text="Name" class="label font-weight-bold m-b-5" />
          <TextField class="input" hint="What is your name?" autocorrect="false" v-model="input.name" />
          <StackLayout class="hr-light"></StackLayout>
        </StackLayout>
        <GridLayout rows="auto, auto" columns="*, *">
          <Button text="Save" @tap="save" class="btn btn-primary" row="0" col="0" />
          <Button text="Load" @tap="load" class="btn btn-primary" row="0" col="1" />
          <Button text="clear" @tap="clear" class="btn btn-primary" row="1" col="0" colSpan="2" />
        </GridLayout>
        
        <Label text="Recorder" class="label font-weight-bold m-b-5" />
        <Button text="Start Recording" @tap="start" />
        <Button text="Stop Recording" @tap="stop" />
        <Button class="btn btn-primary" :text="isPlaying ? 'Pause' : 'Play'" @tap="playPause" />

        <Label text="Exercises" class="label font-weight-bold m-b-5" />
        <Button text="Big Dog Small Dog" @tap="goToDog" />
        <Button text="Conversation" @tap="goToConvo" />
      </StackLayout>
  </Page>
</template>

<script>
  import Dog from '@/components/Dog'
  import Convo from '@/components/Convo'
  import * as ApplicationSettings from "application-settings";

  var fs = require('file-system');
  var permissions = require('nativescript-permissions');
  var audio = require('nativescript-audio');

  var recorder;
  var audioFolder = fs.knownFolders.currentApp().getFolder('audio');
  var recordingPath = audioFolder.path + '/recording.mp3';

  var player = new audio.TNSPlayer();

  var playerOptions = {
    audioFile: recordingPath,
    loop: false,
    completeCallback: function() {
        console.log('finished playing');
    },
    errorCallback: function(errorObject) {
        console.log(JSON.stringify(errorObject));
    },
    infoCallback: function(args) {
        console.log(JSON.stringify(args));
    }
  };

  export default {
    data: () => ({
        msg: 'Hello World!',
        progress: 0,
        isPlaying: false,
        isRecording: false,
        input: {
          name: "",
          firstLoad: true,
        }
    }),
    mounted() {
      this.$store.subscribe((mutations, state) => {
        ApplicationSettings.setString("store", JSON.stringify(state));
        this.input.name = state.name;
        this.input.firstLoad = state.firstLoad;
      });
    },
    destroyed() {

    },

    methods: {

      //Recorder methods
      start() {
        console.log('start button pressed');
          
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
              this.isRecording = true;
            }, function(err) {
              this.isRecording = false;
              console.log('ERROR: ' + err);
            });
          } else {
            alert('This device cannot record audio.');
          }
      },

      stop() {
        if (recorder != undefined) {
        recorder.stop().then(function () {
          this.isRecording = false;
          console.log('Audio Recorded Successfully.');
        }, function (err) {
          console.log(err);
          this.isRecording = true;
        });
        }
      },

      playPause() {
        if (player.isAudioPlaying()) {
          player.pause();
        } else {
          player.playFromFile(playerOptions)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log("Player error", err);
        });
        }
      },

      //Vuex methods
      save() {
        this.$store.commit("save", this.input);
      },
      load() {
        this.$store.commit("load");
      },
      clear() {
        this.input.name = "";
        this.input.firstLoad = true;
      },

      //Navigation methods
      goToDog() {
        this.$navigateTo(Dog);
      },
      goToConvo() {
        this.$navigateTo(Convo);
      }
    }
  }
</script>

<style scoped>
    ActionBar {
        background-color: #53ba82;
        color: #ffffff;
    }

    .message {
        vertical-align: center;
        text-align: center;
        font-size: 20;
        color: #333333;
    }
</style>
