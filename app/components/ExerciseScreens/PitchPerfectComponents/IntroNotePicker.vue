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
              this.lowSelected = true;
              this.medSelected = false;
              this.highSelected = false;

              //emit to upper level component
              this.$emit('select-note', 'D3');
            } else {
              this.lowSelected = false;
              this.$emit('deselect-note');
            }
          },
          onTapMed: function() {
            if ( !this.medSelected ) { //if low is not selected
              this.medSelected = true;
              this.lowSelected = false;
              this.highSelected = false;
              this.$emit('select-note', 'F3');
            } else {
              this.medSelected = false;
              this.$emit('deselect-note');              
            }          
          },
          onTapHigh: function() {
            if ( !this.highSelected ) { //if low is not selected
              this.highSelected = true;
              this.medSelected = false;
              this.lowSelected = false;
              this.$emit('select-note', 'G3');
            } else {
              this.highSelected = false;
              this.$emit('deselect-note');
            }
          }
        }
    }

</script>

<style scoped>
  .selectedButtonClass {
    border-color: #72C8B2;
    border-width: 2dp;
  }
</style>