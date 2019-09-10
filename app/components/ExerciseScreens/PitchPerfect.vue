<template>
    <Page actionBarHidden="true" class="page">
        <FlexboxLayout style="flex: 1;" flexDirection="column" id="container">
            <TextView :text="'Pitch Perfect'" editable="false" id="pitch-perfect-title"/>

            <TextView editable="false" id="project-spectra-desc">
                <Span text="This exercise will strengthen and balance the muscles of the voicebox." />
            </TextView>

            <IntroNotePicker @select-note="selectNote" @deselect-note="deselectNote" />

            <StackLayout style="flex-grow: 1"/>

            <FlexboxLayout justifyContent="space-between" flexDirection="row">
                <SpectraActionButton type='warning' text="Back" @tap="onBack" />
                <SpectraActionButton :isEnabled="this.selectedNote !== ''" text="Let's go!" @tap="onLetsGo" />
            </FlexboxLayout>

        </FlexboxLayout>
    </Page>
</template>

<script>
    import SpectraActionButton from "@/components/UIControls/SpectraActionButton";
    import MicRecorder from '@/components/ExerciseScreens/PitchPerfectComponents/MicRecorder';

    import {Config} from "@/utils/Config";
    import IntroNotePicker from "@/components/ExerciseScreens/PitchPerfectComponents/IntroNotePicker";

    import Level1 from './PitchPerfectLevels/Level1';
    import ActiveExercises from '../ActiveExercises';

    export default {
        components: {IntroNotePicker, SpectraActionButton, MicRecorder},
        methods: {
            onBack: function() {
                this.$navigateTo(ActiveExercises);
            },
            onLetsGo: function() {
                // the note that the user selected above
                this.$navigateTo(Level1, {props: {targetNote: this.selectedNote}});
            },
            selectNote(e) {
                //Save the selected note
                this.selectedNote = e;
            },
            deselectNote() {
                this.selectedNote = '';
            }
        },
        data() {
            return {
                selectedNote: '',
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

    #pitch-perfect-title {
        font-size: 45em;
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
