<template>
    <Page actionBarHidden="true" class="page" >
      <FlexboxLayout style="flex: 1;" flexDirection="column" id="container">
            <TextView text="Slides" editable="false" id="title"/>

            <TextView editable="false" :text="INFO_TEXT" id="desc" />

            <!--animation goes here !--> 
            <AbsoluteLayout height="200em" backgroundColor="lightgray" margin="20em">
              <Image ref="track" width="200em" src="res://track" left="60em" top="35em" stretch="aspectFit" />
              <Image ref="cartImage" src="res://cart" left="45" top="130" width="50" height="50"/>

              <!-- signposting to test the animation
              <Label left="155" top="25" width="10" height="10" backgroundColor="black" />
              <Label left="250" top="155" width="10" height="10" backgroundColor="black" />
              !-->
            </AbsoluteLayout>

            <FlexboxLayout flexDirection="row" justifyContent="space-around" >
              <IntroNotePickerButton text="Play an example  " sound="slide" @tap="onExample" :isEnabled=" !this.isPlayingExample " />
            </FlexboxLayout>

            <StackLayout flexGrow="1" />

            <FlexboxLayout justifyContent="space-between" flexDirection="row">
                <SpectraActionButton type='warning' text="Back" @tap="onBack" />

                <SpectraActionButton text="Let's go!" @tap="onStart" />
            </FlexboxLayout>
        </FlexboxLayout>
    </Page>
</template>
<script>
    import App from "@/components/App";
    import SpectraActionButton from "@/components/UIControls/SpectraActionButton";
    import IntroNotePickerButton from "../ExerciseScreens/PitchPerfectComponents/IntroNotePickerButton";
    import ActiveExercises from "../ActiveExercises";
    import * as animation from "tns-core-modules/ui/animation";

    const enums = require("tns-core-modules/ui/enums");
    const dialogs = require("tns-core-modules/ui/dialogs");
    var cartImage;

    //import filesystem and append functions
    import {appendFile} from '@/utils/Utils';
    import { knownFolders, path, File, Folder } from "tns-core-modules/file-system";

    const moment = require("moment");

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
                INFO_TEXT:
                    "Glide from your lowest comfortable note to your highest comfortable note, then back down again.",
                isPlayingExample: false,
                name: this.$store.state.name
          }
        },
        mounted() {
          cartImage = this.$refs.cartImage;

          //Request write permissions for logging and get the log file
          permissions.requestPermission(android.Manifest.permission.WRITE_EXTERNAL_STORAGE).then(() => {
            console.log('Write permissions granted.');

            const directory = android.os.Environment.getExternalStorageDirectory().getAbsolutePath().toString();
            const folder = Folder.fromPath(directory);
            
            //moment().format().substr(0,10) just the date
            logFile = folder.getFile('spectra-log.txt');
            console.log("logfile: " + logfile);
          }).catch(() => {
            console.log('Write permissions denied!');
          });

        },
        methods: {
          onBack: function() {
            this.$navigateBack();
          },
          onExample: function() {
            //Run the animation
            console.log("Animation running...");
            this.isPlayingExample = true;
            cartImage.nativeView.animate({
              translate: {x: 90, y:-135},
              rotate: 20,
              duration: 1800,
              curve: enums.AnimationCurve.linear
            }).then( () => {
              cartImage.nativeView.animate({
                translate: {x: 200, y: 10},
                rotate: 20,
                duration: 1800,
              }).then( () => {
                //Reset the cart
                this.isPlayingExample = false;
                cartImage.nativeView.animate({
                  translate: {x: 0, y: 0},
                  rotate: 0,
                  duration: 10,
                })
              })
            });
          },
          onStart: function() {
            var self = this; //so we can navigate from within the dialog function

            //Run the animation
            console.log("Animation running...");
            cartImage.nativeView.animate({
              translate: {x: 90, y:-135},
              rotate: 20,
              duration: 1800,
              curve: enums.AnimationCurve.linear
            }).then( () => {
              cartImage.nativeView.animate({
                translate: {x: 200, y: 10},
                rotate: 20,
                duration: 1800,
              }).then( () => {
                //increment exercise tracking
                this.$store.dispatch('setSlideCompletion',this.$store.state.slideCompleted + 1);

                //Log completion
                appendFile(logFile,moment().format() + ',' + 'completed' + ',' + 'Slides' + ',' + '\n');

                //Show a dialog box
                dialogs.confirm({
                  title: "Done!",
                  message: "You did it, " + self.name + "! Take a few deep breaths before continuing.",
                  cancelButtonText: "Try a new exercise",
                  okButtonText: "Repeat this exercise"
                }).then(function (result) {
                  if (!result) { //Try a new exercise
                    self.$navigateTo(ActiveExercises, {clearHistory: true});
                  } else {
                    //reset the exercise
                    cartImage.nativeView.animate({
                      translate: {x: 0, y:0},
                      duration: 10,
                    });
                  }
              });
            });
          });
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

</style>
