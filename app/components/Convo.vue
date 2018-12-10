<template>
  <Page ref="page">
    <ActionBar title="Conversation"/>
      <StackLayout>
        <Label text="This exercise is set up like a chat interface, to help give you a sense of your voice in a more conversational setting. If you have allowed this app to record audio, you will be able to see some feedback about your recording. Your recordings will remain on your device and will only be accessible to you." textWrap="true"/>

      </StackLayout>
  </Page>
</template>

<script>
import * as animation from "tns-core-modules/ui/animation";
var enums = require("tns-core-modules/ui/enums");
var dogImg;

export default {
    data: () => ({

    }),
    mounted() {

    },
  methods: {

  }

}
</script>

<style>
</style>