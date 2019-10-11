<!-- I assume this will be the landing page for users to navigate to settings and exercises. -->

<template>
  <Page @loaded="onPageLoaded" actionBarHidden="true" class="page">
    <FlexboxLayout style="flex: 1;" flexDirection="column" id="container">
      <TextView :text="'Project Spectra'" editable="false" id="project-spectra-title"/>

      <TextView editable="false" style="background-color: transparent;">
        <Span text="Your Goal: " />
        <Span :text="currentGoalName + '\n'" style="font-style: italic; font-weight: bold;" />
      </TextView>

      <FlexboxLayout flexDirection="row" style="align-self: center;">
        <SpectraProgressBox class="current-progress-box" :percentage=percentExercisesCompleted />
      </FlexboxLayout>

      <Label style="align-self: center; font-style:italic" :text="numExercisesCompleted + '/6 exercises completed today'" />

      <Label style="align-self: center; font-weight:bold" :text="encouragementText" />

      <!--Empty placeholder (there is no equivalent of div in NS..) -->
      <StackLayout style="flex-grow: 1"/>
      <SpectraMajorButton text="Exercises" alignSelf="flex-end" style="width: 80%" @tap="onExercises"/>

      <StackLayout style="height: 25dp" />

      <FlexboxLayout flexDirection="row" justifyContent="flex-begin">
        <SpectraMinorButton text="Settings" style="width: 80%" @tap="onSettings"/>
      </FlexboxLayout>

      <!--Empty placeholder (there is no equivalent of div in NS..) -->
      <StackLayout style="height: 10dp" />
    </FlexboxLayout>
  </Page>
</template>

<script>
  import {AVAILABLE_GOALS} from "@/utils/Constants";
  import SpectraProgressBox from "@/components/UIControls/SpectraProgressBox";
  import {Config} from "@/utils/Config";
  import SpectraMajorButton from "@/components/UIControls/SpectraMajorButton";
  import SpectraMinorButton from "@/components/UIControls/SpectraMinorButton";

  import ActiveExercises from '@/components/ActiveExercises';
  import Settings from '@/components/Settings';

  const moment = require("moment");

  export default {
      components: {
          SpectraMinorButton,
          SpectraMajorButton,
          SpectraProgressBox
      },
      data() {
        return {
          name: this.$store.state.name,
        }
      },
      computed: {
        currentGoalName() {
            let currentGoalId = this.$store.state.goal;
            console.log(currentGoalId);
            return AVAILABLE_GOALS.find( ({id}) => id === currentGoalId).name;
        },
        numExercisesCompleted() {
            return this.$store.state.pitchPerfectCompleted + this.$store.state.slideCompleted + this.$store.state.bdsdCompleted;
        },
        percentExercisesCompleted() {
            let completed = this.$store.state.pitchPerfectCompleted + this.$store.state.slideCompleted + this.$store.state.bdsdCompleted;
            console.log("completed " + completed + " exercises");
            return 100*(completed / 6); //at 2 exercises per day
        },
        encouragementText() {
          //Dynamic encouragement text that will appear below the excercise progress bar
          if (this.percentExercisesCompleted == 0) {
            return 'Your voice is ready for a workout, ' + this.name + '!'
          } else if (this.percentExercisesCompleted < 50 && this.percentExercisesCompleted > 0) {
            return 'Nice, ' + this.name + '! You\'re on your way.'
          } else if (this.percentExercisesCompleted == 50) {
            return 'Halfway there, ' + this.name + ' :)'
          } else if (this.percentExercisesCompleted > 50 &&this.percentExercisesCompleted < 100) {
            return 'You\'re almost done for the day, ' + this.name +  '! Keep at it.'
          } else {
            return 'Yay, all done! Great job, ' + this.name + '!'
          }
        }
      },
      created() {
        //Get the moment the app was opened
        var openedTime = moment();
        var lastOpened = this.$store.state.lastOpened;

        //Check if it's the next day since the app was last  opened
        if ( openedTime.isAfter(lastOpened, 'day') ) {

          //Reset exercise completions
          this.$store.dispatch('setPitchPerfectCompletion',0);
          this.$store.dispatch('setSlideCompletion',0);
          this.$store.dispatch('setBdsdCompletion',0);
        };

        //Set the last opened time to be the time the app was most recently opened
        this.$store.dispatch('setLastOpened',openedTime);
      },
      methods: {
          onPageLoaded: function(args) {
              console.log(this.$store.state);
          },
          onExercises() {
              this.$navigateTo(ActiveExercises);
          },

          onSettings() {
              this.$navigateTo(Settings);
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

  #project-spectra-title {
    font-size: 40em;
    font-family: 'serif';
    font-weight: 700;
    color: #000;
    border-width: 0;
    background-color: transparent;
    border-color: #E8E8E8;
  }

  .current-progress-box {
    margin: 7dp;
  }

</style>
