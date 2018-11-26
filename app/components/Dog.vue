<template>
  <Page>
    <ActionBar title="Big Dog Small Dog"/>
      <StackLayout>
        <Label text="Hello World" />
        <Image id="dogImg" src="~/assets/images/dog.jpg" stretch="none" @tap="animateDog" />
      </StackLayout>
  </Page>
</template>

<script>
import { AnimationCurve } from 'ui/enums';

export default {
    data: () => ({

    }),
    mounted() {
    },
  methods: {
    animateDog(args) {
      dogImg.animate({
        duration: 3000,
        curve: AnimationCurve.easeInOut,
        scale: { x: 2, y: 2}
      }).then(() => {
        // Reset animation
        setTimeout(() => {
            view.scaleX = 1;
            view.scaleY = 1;
        }, 1000)
    })
    }
  }

}
</script>

<style>
</style>