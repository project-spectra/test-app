<template>
    <Page actionBarHidden="true" class="page" >
      <FlexboxLayout style="flex: 1;" flexDirection="column" id="container">
            <TextView text="Slides" editable="false" id="title"/>

            <TextView editable="false" :text="INFO_TEXT" id="desc" />

            <StackLayout flexGrow="1" />

            <!--animation goes here !--> 

            <FlexboxLayout flexDirection="row" justifyContent="space-around" >
              <IntroNotePickerButton text="Play an example  " />
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

    const dialogs = require("tns-core-modules/ui/dialogs");

    export default {
        components: {
          SpectraActionButton,
          IntroNotePickerButton
        },
        data() {
          return {
                INFO_TEXT:
                    "Glide from your lowest comfortable note to your highest comfortable note, then back down again.",
          }
        },
        methods: {
          onBack: function() {
            this.$navigateBack();
          },

          onStart: function() {
            //Run the animation
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
