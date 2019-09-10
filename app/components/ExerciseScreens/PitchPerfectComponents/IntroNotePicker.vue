<!--screen in the mockups to pick the D, F, or G notes-->
<template>

    <StackLayout flexGrow="1" >

        <TextView editable="false" style="background-color: transparent;">

            <Span text="To begin: " style="font-weight: bold;" />
            <Span :text="startingNoteInfo" style="" />

        </TextView>

        <TextView editable="false" style="background-color: transparent;">

            <Span text="Practice: " style="font-weight: bold;" />
            <Span :text="practiceInfo" style="" />

        </TextView>

        <StackLayout height="15dp"/>

        <FlexboxLayout flexDirection="row" justifyContent="space-around" >
            <IntroNotePickerButton text="D3" @tap="onTapLow" :class="[this.lowSelected ? this.selectedClass : '']" />
            <IntroNotePickerButton text="F3" @tap="onTapMed" :class="[this.medSelected ? this.selectedClass : '']" />
            <IntroNotePickerButton text="G3" @tap="onTapHigh" :class="[this.highSelected ? this.selectedClass : '']" />
        </FlexboxLayout>
    </StackLayout>
</template>


<script>

    import {Config} from "@/utils/Config";
    import IntroNotePickerButton from "@/components/ExerciseScreens/PitchPerfectComponents/IntroNotePickerButton";

    export default {
        components: {IntroNotePickerButton},
        computed: {
            selectedClass() {
              return 'selectedButtonClass';
            },
        },

        data() {
            return {
                startingNoteInfo: "Choose the note below that is most comfortable for you to hold right now." +
                    " This will be your starting note during the exercise.",

                practiceInfo: "As you listen, make the sound 'ol' (like 'old' without the 'd'). " +
                    "Your lips should be rounded, and you should feel vibrations on your lips.",

                lowSelected: false,
                medSelected: false,
                highSelected: false
            }
        },

        methods: {
          onTapLow: function() {
            if ( !this.lowSelected ) { //if low is not selected
              console.log('Low selected')
              this.lowSelected = true;
              this.medSelected = false;
              this.highSelected = false;
            } else {
              this.lowSelected = false;
            }

            //emit something
          },
          onTapMed: function() {
            console.log('Medium selected')
            this.medSelected = true;
            //
          },
          onTapHigh: function() {
            console.log('High selected')
            this.highSelected = true;
            //
          }
        }
    }

</script>

<style scoped>
  IntroNotePickerButton.selectedButtonClass {
    border-color: red;
    border-width: 2dp;
  }
</style>