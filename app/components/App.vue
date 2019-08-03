<!-- I assume this will be the landing page for users to navigate to settings and exercises. -->

<template>
  <Page @loaded="onPageLoaded" actionBarHidden="true" class="page">
    <FlexboxLayout style="flex: 1;" flexDirection="column" id="container">
      <TextView :text="'Project\nSpectra'" editable="false" id="project-spectra-title"/>

      <TextView editable="false" style="background-color: transparent;">
        <Span text="Current Goal: " />
        <Span :text="currentGoalName + '\n\n'" style="font-style: italic; font-weight: bold;" />
        <Span text="(Complete each exercise twice in a row, two times per day)" style="font-size: 13em;"/>
      </TextView>

      <FlexboxLayout flexDirection="row" style="align-self: center;">
        <SpectraProgressBox class="current-progress-box"/>
        <SpectraProgressBox class="current-progress-box"/>
        <SpectraProgressBox class="current-progress-box" percentage="25"/>
        <SpectraProgressBox class="current-progress-box" percentage="65"/>
      </FlexboxLayout>
      <!--<TextView editable="false" text="(Complete each exercise twice in a row, two times per day)")-->
                <!--style="font-size: 15em; background-color: transparent;"/>-->
      <Label style="align-self: center; font-style: italic;" text="Nice, you're on your way." />

      <!--Empty placeholder (there is no equivalent of div in NS..) -->
      <StackLayout style="flex-grow: 1"/>
      <SpectraMajorButton text="Exercises" alignSelf="flex-end" style="width: 80%" @tap="onExercises"/>

      <StackLayout style="height: 25dp" />

      <FlexboxLayout flexDirection="row" justifyContent="flex-begin">
        <SpectraMinorButton text="Settings" style="width: 80%" @tap="onExercises"/>
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

  export default {
      components: {
          SpectraMinorButton,
          SpectraMajorButton,
        SpectraProgressBox
      },
      computed: {
        currentGoalName() {
            let currentGoalId = this.$store.state.goal;
            return AVAILABLE_GOALS.find( ({id}) => id === currentGoalId).name;
        }
      },
      methods: {
          onPageLoaded: function(args) {
              console.log(this.$store.state);
          },
          onExercises() {
              this.$navigateTo(ActiveExercises);
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
    font-size: 45em;
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
