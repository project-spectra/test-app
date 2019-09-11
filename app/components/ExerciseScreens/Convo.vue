<template>
    <Page actionBarHidden="true" class="page" >
      <FlexboxLayout style="flex: 1;" flexDirection="column" id="container">
            <TextView text="Conversation Practice" editable="false" id="title"/>

            <TextView editable="false" :text="INFO_TEXT" id="desc" />

            <!--cat chat goes here !--> 
            <AbsoluteLayout height="200em" backgroundColor="lightgray" margin="20em">

            </AbsoluteLayout>

            <!--nav buttons--> 
            <FlexboxLayout justifyContent="space-between" flexDirection="row">
                <SpectraActionButton type='warning' text="Back" @tap="onBack" />

                <SpectraActionButton text="Answer" @tap="onStart" />
            </FlexboxLayout>
        </FlexboxLayout>
    </Page>
</template>

<script>

    import SpectraActionButton from "@/components/UIControls/SpectraActionButton";

    export default {
      components: {SpectraActionButton},
      data() {
          return {
                INFO_TEXT:
                    "Let's put the skills you've learned into practice, and get a sense of where your voice is at. Respond to the question freely, as though you were talking to someone next to you. When you're ready, tap 'Answer'!",
          }
      },
      methods: {
        onBack: function() {
          this.$navigateBack();
        },
        onStart: function() {
          //Chat bubble appears with "I'm listening"
          //Start recording
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
