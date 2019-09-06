<template>
    <Page actionBarHidden="true" class="page" >
      <FlexboxLayout style="flex: 1;" flexDirection="column" id="container">
            <TextView text="Slides" editable="false" id="title"/>

            <TextView editable="false" :text="INFO_TEXT" id="desc" />

            <!--animation goes here !--> 
            <AbsoluteLayout height="200em" backgroundColor="lightgray" margin="20em">
              <Image ref="track" src="~/assets/images/track.png" left="75em" top="50em" stretch="fill" />
              <Label ref="cartImageTest" left="75" top="155" width="10" height="10" backgroundColor="red"/>

              <!-- signposting !-->
              <Label left="95" top="145" width="10" height="10" backgroundColor="black" />
              <Label left="115" top="65" width="10" height="10" backgroundColor="black" />
              <Label left="155" top="38" width="10" height="10" backgroundColor="black" />


            </AbsoluteLayout>

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
    import * as animation from "tns-core-modules/ui/animation";

    const enums = require("tns-core-modules/ui/enums");
    const dialogs = require("tns-core-modules/ui/dialogs");
    var cartImageTest;

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
        mounted() {
          cartImageTest = this.$refs.cartImageTest;
        },
        methods: {
          onBack: function() {
            this.$navigateBack();
          },

          onStart: function() {
            //Run the animation
            console.log("Animation running...");
            //cartImageTest.nativeView.animate({});
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
