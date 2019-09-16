<template>
    <Page actionBarHidden="true" class="page" >
      <FlexboxLayout style="flex: 1;" flexDirection="column" id="container">
            <TextView text="Done!" editable="false" id="title"/>

            <FlexboxLayout flexWrap="wrap" justifyContent="center" flexDirection="row" id="desc" >

              <TextView editable="false" :text="INFO_TEXT" id="desc" />

              <TextView editable="false" :text="calculatedPitch" />

            </FlexboxLayout>

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

    const FileAPI = require('file-api');
    const FileReader = FileAPI.FileReader;

    //pitchfinder constants
    const WavDecoder = require("wav-decoder");
    const Pitchfinder = require("pitchfinder");

    export default {
        props: ['recPath'],
        components: {
          SpectraActionButton
        },
        data() {
          return {
                INFO_TEXT: //Placeholder, to fill in with text description of calculation result (for accessibility)
                    "Recording is located at: " + this.recPath + " and the calculated pitch is: ",
                specificPitchGoal: this.$store.state.hz,
                calculatedPitch: 0,
          }
        },
        mounted() {
          //Load recording file as in https://www.npmjs.com/package/filereader
          var reader = new FileReader();

          reader.readAsArrayBuffer(new File(this.recPath));

          //listen for callback and pass data into 'buffer' variable below

          //Do pitch analysis as in https://github.com/peterkhayes/pitchfinder
          const detectPitch = new Pitchfinder.YIN();

          const decoded = WavDecoder.decode.sync(buffer); //crash here
          const float32Array = decoded.channelData[0];

          this.calculatedPitch = detectPitch(float32Array);

          console.log('Calculated pitch is ' + pitch);

          //const detectors = [detectPitch, Pitchfinder.AMDF()];
          //const frequencies = Pitchfinder.frequencies(detectors, float32Array, {
            //May need to play with these options to optimize for speech?
            //tempo: 120, //default BPM
            //quantization: 4, //default samples per beat
          //});

        },
        computed: {
          goalNote: function() {
            if (this.specificPitchGoal == 0) { //If user has not set a pitch goal
              return null;
            } else {
              return noteFromPitch(this.specificPitchGoal);
            }
          },
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
