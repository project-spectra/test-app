<template>
  <Page actionBarHidden="true" class="page">
    <FlexboxLayout style="flex: 1;"
    flexDirection="column" id="container">
      <TextView :text="'Settings'"
      editable="false" id="settings-title" />

      <StackLayout orientation="vertical" horizontalAlignment="center" style="padding: 10em;" id="settings-buttons">
        <SpectraActionButton text="Change your goals" style="width: 80%" type="settings-orange" @tap="onGoalChange "/>

        <SpectraActionButton text="Change your name" style="width: 80%" type="settings-green" @tap="onNameChange"/>

        <SpectraActionButton text="View credits" style="width: 80%" type="settings-orange" @tap="onCredits"/>

        <SpectraActionButton text="Share feedback" style="width: 80%" type="settings-green" @tap="onFeedback"/>

        <SpectraActionButton text="Back" style="width: 50%" type="settings-orange" @tap="onBack"/>
      </StackLayout>
    </FlexboxLayout>
  </Page>
</template>

<script>
  import SpectraActionButton from "./UIControls/SpectraActionButton";
  import App from "./App";
  import ChangeGoal from "./ChangeGoal";
  const dialogs = require("tns-core-modules/ui/dialogs");

  export default {
    components: {
      SpectraActionButton
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
              message: "Project Spectra is a group of independent developers and designers seeking to build free & open-source software for voice training. While we believe that anyone, regardless of identity, should be able to use and benefit from our work, we are specifically interested in supporting the self-determination of transgender & gender non-conforming people.",
              okButtonText: "Okay"
            }).then(function () {
              console.log("Dialog closed!");
            });
      },
      onFeedback() {
        dialogs.alert({
              title: "Share Feedback",
              message: "Experiencing problems with the app? Have ideas on how it could be improved? Want to join us and help with development?\n\nReach us at projectspectra.app@gmail.com !", //TODO: implement a mail-to link
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
