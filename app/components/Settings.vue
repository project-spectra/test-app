<template>
  <Page actionBarHidden="true" class="page">
    <FlexboxLayout style="flex: 1;"
    flexDirection="column" id="container">
      <TextView :text="'Settings'"
      editable="false" id="settings-title" />


        <SpectraActionButton text="Change your goals" style="width: 80%" type="settings-orange" @tap="onGoalChange "/>

      <!--Empty placeholder (there is no equivalent of div in NS..) -->
      <StackLayout style="flex-grow: 1"/>

        <SpectraActionButton text="Change your name" style="width: 80%" type="settings-green" @tap="onNameChange"/>

              <!--Empty placeholder (there is no equivalent of div in NS..) -->
      <StackLayout style="flex-grow: 1"/>

        <SpectraActionButton text="View credits" style="width: 80%" type="settings-orange" @tap="onCredits"/>

              <!--Empty placeholder (there is no equivalent of div in NS..) -->
      <StackLayout style="flex-grow: 1"/>

        <SpectraActionButton text="Share feedback" style="width: 80%" type="settings-green" @tap="onFeedback"/>

              <!--Empty placeholder (there is no equivalent of div in NS..) -->
      <StackLayout style="flex-grow: 1"/>

        <SpectraActionButton text="Back" style="width: 50%" type="settings-orange" @tap="onBack"/>

    </FlexboxLayout>
  </Page>
</template>

<script>
  import SpectraActionButton from "./UIControls/SpectraActionButton";
  import App from "./App";
  import ChangeGoal from "./ChangeGoal";
  const dialogs = require("tns-core-modules/ui/dialogs");

  //import filesystem and append functions
  import {appendFile} from '@/utils/Utils';
  import { knownFolders, path, File, Folder } from "tns-core-modules/file-system";

  const moment = require("moment");

  //Set up usage logging
  const permissions = require('nativescript-permissions');
  var logFile;  

  export default {
    components: {
      SpectraActionButton
    },
    mounted() {
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
      onGoalChange() {
        this.$navigateTo(ChangeGoal, {clearHistory: true});
      },
      onNameChange() {
        dialogs.prompt({
          title: "What name should we call you?",
          message: "Enter it below!",
          okButtonText: "Done",
          cancelButtonText: "Cancel",
          defaultText: "",
          inputType: "text"
        }).then(r => {
          console.log("Dialog result: " + r.result + ", text: " + r.text);
          if (r.result) {

            //Log name change
            appendFile(logFile,moment().format() + ',' + 'nameChanged' + ',' + r.text + ',' + '\n');
            this.$store.dispatch('setName', r.text);

            dialogs.alert({
              title: "Name changed!",
              message: "Great to meet you, " + r.text + "!",
              okButtonText: "Okay"
            }).then(function () {
              console.log("Dialog closed!");
            });
          }
        })
      },
      onCredits() {
        dialogs.alert({
              title: "Credits",
              message: "Project Spectra is a group of independent developers and designers seeking to build free & open-source software for voice training. While we believe that anyone, regardless of identity, should be able to use and benefit from our work, we are specifically interested in supporting the self-determination of transgender & gender non-conforming people. \n\nhttps://github.com/project-spectra",
              okButtonText: "Okay"
            }).then(function () {
              console.log("Dialog closed!");
            });
      },
      onFeedback() {
        dialogs.alert({
              title: "Share Feedback",
              message: "Experiencing problems with the app? Have ideas on how it could be improved? Want to join us and help with development?\n\nReach us at\nprojectspectra.app@gmail.com !", //TODO: implement a mail-to link
              okButtonText: "Okay"
            }).then(function () {
              console.log("Dialog closed!");
            });
      },
      onBack() {
        this.$navigateTo(App);
      }
    }
  }
</script>

<style scoped>
  Page {
    background-color: #E8E8E8;
  }

  #settings-buttons {
    margin-top: 50;
    margin-bottom: 50;
  }

  #container {
    padding: 15em;
  }

  #settings-title {
    font-size: 45em;
    font-family: 'serif';
    font-weight: 700;
    color: #000;
    border-width: 0;
    background-color: transparent;
    border-color: #E8E8E8;
}


</style>
