<template>
<StackLayout>
  <Button text="Start Recording" @tap="start" />
  <Button text="Stop Recording" @tap="stop" />
  <Button class="btn btn-primary" :text="isPlaying ? 'Pause' : 'Play'" @tap="playPause" />
</StackLayout>
</template>

<script>

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
      isPlaying: false,
      isRecording: false,
    }),
    
    methods: {
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
    }
  }
</script>
