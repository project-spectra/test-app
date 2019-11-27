<template>
    <Page actionBarHidden="true" class="page" >
      <FlexboxLayout style="flex: 1;" flexDirection="column" id="container">
            <TextView text="Hold that Note!" editable="false" id="title"/>

            <TextView editable="false" :text="INFO_TEXT" id="desc" />

            <StackLayout flexGrow="1" />

            <FlexboxLayout flexDirection="row" justifyContent="space-around" >
              <IntroNotePickerButton text="E3" sound="e"/>
              <IntroNotePickerButton text="F3" sound="e"/>
              <IntroNotePickerButton text="A3" sound="e"/>
            </FlexboxLayout>

            <StackLayout flexGrow="1" />

            <FlexboxLayout justifyContent="flex-end" flexDirection="row">
              <TextView :text=" !this.started ? 'Tap Start as soon as you begin making sound.' : 'Tap Done when you stop making sound.' " editable="false" id="instructions-text"/>
            </FlexboxLayout>

            <FlexboxLayout justifyContent="space-between" flexDirection="row">
                <SpectraActionButton type='warning' text="Back" @tap="onBack" />

                <SpectraActionButton :text="buttonText" @tap="onStart" />
            </FlexboxLayout>
        </FlexboxLayout>
    </Page>
</template>
<script>
    import App from "@/components/App";
    import SpectraActionButton from "@/components/UIControls/SpectraActionButton";
    import IntroNotePickerButton from "../ExerciseScreens/PitchPerfectComponents/IntroNotePickerButton";
    import ActiveExercises from "../ActiveExercises";

    //import filesystem and append functions
    import {appendFile} from '@/utils/Utils';
    import { knownFolders, path, File, Folder } from "tns-core-modules/file-system";

    const moment = require("moment");
    const dialogs = require("tns-core-modules/ui/dialogs");

    //Set up usage logging
    const permissions = require('nativescript-permissions');
    var logFile;

    export default {
        components: {
          SpectraActionButton,
          IntroNotePickerButton
        },
        data() {
          return {
                buttonText: "Start!",
                started: false,
                timeStarted: 0,
                INFO_TEXT:
                    "In this vocal warmup, hold the sound 'eeee' for as long as possible. To hear an example, choose the note below that is most comfortable for you to hold right now.\n\nThe tone should be as soft as possible without breathiness. Produce this with an extremely forward and almost nasal sound. This is a warmup, so don't worry about being exactly on pitch!",
          }
        },
        mounted() { //Get the log file
          permissions.requestPermission(android.Manifest.permission.WRITE_EXTERNAL_STORAGE).then(() => {
            console.log('Write permissions granted.');

            const directory = android.os.Environment.getExternalStorageDirectory().getAbsolutePath().toString();
            const folder = Folder.fromPath(directory);
            
            //moment().format().substr(0,10) just the date
            logFile = folder.getFile('spectra-log.txt');
            console.log("logfile: " + logfile);
          }).catch( (error) => {
            console.error(error);
          });
        },
        methods: {
          onBack: function() {
            this.$navigateBack();
          },

          onStart: function() {
            if ( !this.started ) {
              this.timeStarted = moment();
              this.buttonText = "Done";
              this.started = true;
            } else {
              var timeStopped = moment();
              var timeHeld = timeStopped.diff(this.timeStarted, 's');
              this.started = false;
              this.buttonText = "Start!";
              var self = this; //so that we can navigate from within the dialog function
              console.log("Note was held for " + timeHeld + " seconds");

              //Log completion
              appendFile(logFile,moment().format() + ',' + 'completed' + ',' + 'HoldThatNote' + ',' + '\n');

              //Dialog box telling the user how long they held the note for
              dialogs.confirm({
                title: timeHeld === 1 ? "Nice! " + timeHeld + " second!" : "Nice! " + timeHeld + " seconds!",
                message: "You did it! Take a few breaths before continuing.\n\nIf you're feeling strained, take a break.",
                cancelButtonText: "Try a new exercise",
                okButtonText: "Repeat this exercise"
              }).then(function (result) {
                if (!result) { //User hit try a new exercise
                  //Return user to main exercises screen, otherwise do nothing
                  self.$navigateTo(ActiveExercises);
                }
              });
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
        font-size: 40em;
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

    #instructions-text {
      background-color: white;
      font-size: 15em;
      font-style: italic;
      margin-bottom: 15em;
      border-color: black;
      border-width: 1;
    }

</style>
