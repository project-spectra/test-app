<template>
  <Page ref="page">
    <ActionBar title="Big Dog Small Dog"/>
      <StackLayout>
        <Label text="Hello World" />
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
        duration: 3000,
        curve: enums.AnimationCurve.easeInOut,
        scale: { x: 2, y: 2}
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