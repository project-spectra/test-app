<template>
    <Page actionBarHidden="true" class="page" >
      <FlexboxLayout style="flex: 1;" flexDirection="column" id="container">
            <TextView text="Done!" editable="false" id="title"/>

            <TextView editable="false" :text="goalNote" id="desc" />

            <!--animation goes here !--> 
            <AbsoluteLayout height="400em" backgroundColor="lightgray" margin="20em">

            </AbsoluteLayout>

            <StackLayout flexGrow="1" />

            <FlexboxLayout justifyContent="space-between" flexDirection="column">
                <SpectraActionButton type='warning' width="80%" text="Try a new exercise" @tap="onReturn" />
            </FlexboxLayout>
        </FlexboxLayout>
    </Page>
</template>
<script>
    import SpectraActionButton from "@/components/UIControls/SpectraActionButton";
    import IntroNotePickerButton from "../ExerciseScreens/PitchPerfectComponents/IntroNotePickerButton";
    import ActiveExercises from "../ActiveExercises";
    import {noteFromPitch} from '@/utils/Utils';

    export default {
        props: ['recPath'],
        components: {
          SpectraActionButton
        },
        data() {
          return {
                INFO_TEXT:
                    "Recording is located at: " + this.recPath,
                specificPitchGoal: this.$store.state.hz,
          }
        },
        computed: {
          goalNote: function() {
            return noteFromPitch(this.specificPitchGoal);
          }
          //Need to calculate pitch range and average
        },
        methods: {
          onReturn: function() {
            //Nav back to ActiveExercises
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

    #title {
        font-size: 30em;
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
