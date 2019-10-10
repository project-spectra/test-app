
<template>
    <Page actionBarHidden="true" class="page">
        <FlexboxLayout style="flex: 1;" flexDirection="column" id="container">
            <TextView text="Disclaimer" editable="false" id="project-spectra-title"/>
            <TextView editable="false" id="project-spectra-desc">
                <Span :text="INFO_TEXT" />
            </TextView>

            <StackLayout style="flex-grow: 1"/>

            <SpectraActionButton alignSelf="center" text="I agree" @tap="onReady" style="width: 80%" />
        </FlexboxLayout>
    </Page>

</template>


<script>
    import SpectraTextView from "@/components/UIControls/SpectraTextView";
    import SpectraActionButton from "@/components/UIControls/SpectraActionButton";

    import VocalHealthWarnings from "@/components/OnboardingScreens/VocalHealthWarnings";

    export default {
        components: {
            SpectraActionButton,
        },
        data() {
            return {
                name: '',
                INFO_TEXT:
                    "This app was made by volunteers with input from experienced speech therapists and voice experts, but we are not experts ourselves. By using this app, please agree to not hold us liable for any h arm done to your voice that may result from use.\n\nPlease do not complete the exercises more often than suggested. If  you ever feel prolonged strain or soreness, immediately stop using the app, and if you are able to, seek help from a doctor.\n\nThis app will not save any recordings of your voice to your device.",
            }
        },
        methods: {
            onReady: function(){
                this.$navigateTo(VocalHealthWarnings);
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

    #project-spectra-title {
        font-size: 40em;
        font-family: 'serif';
        font-weight: 700;
        color: #000;
        border-width: 0;
        background-color: transparent;
        border-color: #E8E8E8;
    }

    #project-spectra-desc {
        border-width: 0;
        background-color: transparent;
        border-color: #E8E8E8;
    }

</style>
