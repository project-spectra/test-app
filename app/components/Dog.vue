<template>
  <Page ref="page">
    <ActionBar title="Big Dog Small Dog"/>
      <StackLayout>
        <Label text="Raising larynx leads to a brighter sound, reducing space in the vocal tract. Conversely, lowering the larynx leads to a darker sound. Testosterone has an effect on the vocal tract which lowers the larynx. When the dog is big, pant like a big dog. You should feel your larynx low in your throat. As the dog gets smaller, start panting like a smaller dog. You should feel your larynx high in your throat. Tap the dog to try it!" textWrap="true"/>
        <Image ref="dimage" src="~/assets/images/dog.jpg" stretch="none" horizontalAlignment="center" verticalAlignment="center" @tap="animateDog" />
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
      dogImg = this.$refs.dimage;
    },
  methods: {
    animateDog(args) {
      console.log("dog clicked");
      dogImg.nativeView.animate({
        duration: 4000,
        curve: enums.AnimationCurve.easeInOut,
        scale: { x: 0.5, y: 0.5}
      }).then(() => {
        // Reset animation
        setTimeout(() => {
            dogImg.nativeView.scaleX = 1;
            dogImg.nativeView.scaleY = 1;
        }, 1000)
    })
    }
  }

}
</script>

<style>
</style>