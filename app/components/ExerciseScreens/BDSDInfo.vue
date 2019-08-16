<!--screen in the mockups to pick the D, F, or G notes-->
<template>

    <Page actionBarHidden="true" class="page">
        <FlexboxLayout style="flex: 1;" flexDirection="column" id="container">

            <TextView text="Big Dog, Small Dog" editable="false" id="bdsd-title"/>

            <TextView editable="false" style="background-color: transparent;">

                <Span text="What is this? " style="font-weight: bold;" />
                <Span :text="whatIsBDSD" style="" />

            </TextView>

            <!--<TextView editable="false" style="background-color: transparent;">-->

                <!--<Span text="Practice: " style="font-weight: bold;" />-->
                <!--<Span :text="practiceInfo" style="" />-->

            <!--</TextView>-->

            <StackLayout height="15dp"/>

            <!--<FlexboxLayout flexDirection="row" justifyContent="space-around" >
                <IntroNotePickerButton text="D" />
                <IntroNotePickerButton text="F" />
                <IntroNotePickerButton text="G" />
            </FlexboxLayout>-->

            <StackLayout style="flex-grow: 1"/>

            <FlexboxLayout justifyContent="space-between" flexDirection="row">
                <SpectraActionButton type='warning' text="Back" @tap="onBack" />
                <SpectraActionButton text="Next" @tap="onNext" />
            </FlexboxLayout>

        </FlexboxLayout>
    </Page>
</template>


<script>

    import {Config} from "@/utils/Config";
    import SpectraActionButton from "@/components/UIControls/SpectraActionButton";
    import BDSD from './BDSD';

    export default {
        components: { SpectraActionButton},
        data() {
            return {
                whatIsBDSD: 'Raising the larynx leads to a "brighter sound, reducing space in the vocal tract. ' +
                    'Conversely, lowering the larynx leads to a "darker" sound. ' +
                    'Testosterone has an effect on the vocal tract which lowers the larynx. ' +
                    'This exercise will strengthen your control of your larynx."',

            }
        },
        methods: {
            onBack: function() {
                this.$navigateBack();
            },
            onNext: function() {
                // the note that the user selected above
                this.$navigateTo(BDSD);
            },
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

    #bdsd-title {
        font-size: 20em;
        font-family: serif;
        color: #000;
        font-weight: 700;
        background-color: transparent;
    }

</style>
