<template>
    <Page actionBarHidden="true" class="page" >
      <FlexboxLayout style="flex: 1;" flexDirection="column" id="container">
            <TextView text="Conversation Practice" editable="false" id="title"/>

            <TextView editable="false" :text="INFO_TEXT" id="desc" />

            <!--cat chat goes here !--> 
            <AbsoluteLayout height="200em" backgroundColor="lightgray" margin="20em">

              <Image src="res://cat" left="200em" top="0" width="120em" stretch="aspectFit" />

              <TextView left="0" top="30dp" id="chat-bubble" editable="false" :text="question" />

              <Textview left="70" top="100dp" id="chat-bubble" editable="false" text="I'm listening!" v-if="this.answering" />

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
                answering: false,
          }
      },
      computed: {
        question() {
          //TODO: pick a random question from a list
          var questions = Array(
            "How is your day going?",
            "What are you looking\nforward to right now?",
            "What was the last\nfun thing you did?",
            "Tell me about a close\nfriend or family member.",
            "What's something you like\nto do in your free time?",
            "What was the last movie\nyou saw? What did you think?",
            "What's your favorite animal?\n(It's okay if it's not a cat!)"
          )
          return questions[Math.floor(Math.random()*questions.length)];
        }
      },
      methods: {
        onBack: function() {
          this.$navigateBack();
        },
        onStart: function() {
          //Chat bubble appears with "I'm listening"
          this.answering = true;
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

    #chat-bubble {
      background-color: white;
      font-size: 15em;
      border-radius: 8em;
      border-width: 1em;
      border-color: black;
      padding: 7em;
    }

</style>
