// https://www.nativescript.org/blog/renderless-components-in-nativescript-vue
// A component that checks whether the app has previously been initialized and returns the correct screen otherwise.
<template>
    <Page>

    </Page>
</template>
<script>
    import Welcome from '@/components/OnboardingScreens/Welcome'
    import App from "@/components/App";

    export default {
        data() {

        },

        mounted() {
            setTimeout(() => {this.$navigateTo(App)}, 1000);
        },
    }
</script>
