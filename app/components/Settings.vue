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
  import SetAGoal from "./OnboardingScreens/SetAGoal";
  var dialogs = require("tns-core-modules/ui/dialogs");

  export default {
    components: {
      SpectraActionButton
    },
    methods: {
      onGoalChange() {
        this.$store.dispatch('setGoal', '');
        this.$navigateTo(SetAGoal, {clearHistory: true});
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
          }
        })
      },
      onCredits() {

      },
      onFeedback() {
        //implement a mailto
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
