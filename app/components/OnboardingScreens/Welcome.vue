
<template>
    <Page actionBarHidden="true" class="page">
        <FlexboxLayout style="flex: 1;" flexDirection="column" id="container">
            <TextView :text="'Project Spectra'" editable="false" id="project-spectra-title"/>
            <TextView editable="false" id="project-spectra-desc">
                <Span :text="WELCOME_TEXT" />

                <Span text="let us know." textDecoration="Underline" />
            </TextView>

            <Label text="What name should we call you?" style="font-weight: 600; color: #000; font-size: 15em; padding-bottom: 5em;"/>

            <SpectraTextView v-model="name" v-on:return-press="onReady"/>

            <Label :text="this.name === '' ? 'You can change your name at any time in the Settings.' : 'Whoa, great name!'"
                   style="font-style: italic"/>

            <StackLayout style="flex-grow: 1"/>

            <FlexboxLayout alignSelf="flex-end" flexDirection="row">
                <SpectraActionButton alignSelf="flex-end" :isEnabled="this.name !== ''" text="Ready" @tap="onReady" />
            </FlexboxLayout>
        </FlexboxLayout>
    </Page>

</template>


<script>
    import SpectraTextView from "@/components/UIControls/SpectraTextView";
    import SpectraActionButton from "@/components/UIControls/SpectraActionButton";
    import Disclaimer from "@/components/OnboardingScreens/Disclaimer";

    export default {
        components: {
            SpectraActionButton,
            SpectraTextView
        },
        data() {
            return {
                name: '',
                WELCOME_TEXT:
                    "Welcome! This free, open-source voice training app was made by and for the LGBTQ community to " +
                    "support our self-determination.\n\nIf you have feedback for us or if you are interested in joining " +
                    "the development team, ",
            }
        },
        methods: {
            onReady: function(){
                // firstLoad must explicitly be true in order for main.js to not conditionally route to App
                this.$store.dispatch("setName", this.name);
                this.$store.dispatch("setFirstLoad", true);
                //this.$store.commit("save", {name: this.name, firstLoad: true});
                this.$navigateTo(Disclaimer);
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
