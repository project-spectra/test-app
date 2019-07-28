

<template>

    <Page actionBarHidden="true" class="page" @loaded="onPageLoaded">
        <FlexboxLayout style="flex: 1;" flexDirection="column" id="container">
            <TextView text="Big Dog, Small Dog" editable="false" id="bdsd-title"/>

            <TextView :text="'A: ' + A"  editable="false" style="border-width: 0; background-color: transparent;"/>

            <StackLayout flexGrow="1" />
            <FlexboxLayout justifyContent="space-between" flexDirection="row">
                <SpectraActionButton type='warning' text="Back" @tap="onBack" />
                <!--<SpectraActionButton text="Let's go!" @tap="onLetsGo" />-->
            </FlexboxLayout>
        </FlexboxLayout>

    </Page>
</template>

<script>
    import {SpectraBdsdPlugin} from 'nativescript-spectra-bdsd-plugin';
    import SpectraActionButton from "@/components/UIControls/SpectraActionButton";

    import * as permissions from 'nativescript-permissions';

    let _nativePluginInstance = new SpectraBdsdPlugin();

    export default {

        components: {SpectraActionButton},
        data() {
            return {
                A: 0
            }
        },

        methods: {

            onBack: function () {
                _nativePluginInstance.stop();
                this.$navigateBack();
            },

            onBDSDDetectionResult(A) {
                this.A = A;
                console.log('A :' + A);
            },

            onPageLoaded: function(args) {
                console.log('onBDSDLoaded');

                permissions.requestPermission(android.Manifest.permission.RECORD_AUDIO, "BDSD Exercise").then(() => {
                    _nativePluginInstance.start({
                        onBDSDDetectionResult: this.onBDSDDetectionResult.bind(this),
                    });
                }).catch(() => {
                    console.log("Uh oh, no permissions - plan B time!");
                    alert('Unfortunately, we need to use your microphone for you to do this exercise.');
                })

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
