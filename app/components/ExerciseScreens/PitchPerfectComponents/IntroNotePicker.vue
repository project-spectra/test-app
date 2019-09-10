<!--screen in the mockups to pick the D, F, or G notes-->
<template>

    <StackLayout flexGrow="1" :style="introNotePickerStyle">

        <TextView editable="false" style="background-color: transparent;">

            <Span text="To begin: " style="font-weight: bold;" />
            <Span :text="startingNoteInfo" style="" />

        </TextView>

        <TextView editable="false" style="background-color: transparent;">

            <Span text="Practice: " style="font-weight: bold;" />
            <Span :text="practiceInfo" style="" />

        </TextView>

        <StackLayout height="15dp"/>

        <FlexboxLayout flexDirection="row" justifyContent="space-around" >
            <IntroNotePickerButton text="D3" />
            <IntroNotePickerButton text="F3" />
            <IntroNotePickerButton text="G3" />
        </FlexboxLayout>
    </StackLayout>
</template>


<script>

    import {Config} from "@/utils/Config";
    import IntroNotePickerButton from "@/components/ExerciseScreens/PitchPerfectComponents/IntroNotePickerButton";

    export default {
        components: {IntroNotePickerButton},
        computed: {
            introNotePickerStyle() {

            }
        },

        data() {
            return {
                startingNoteInfo: "Choose the note below that is most comfortable for you to hold right now." +
                    " This will be your starting note during the exercise.",

                practiceInfo: "As you listen, make the sound 'ol' (like 'old' without the 'd'). " +
                    "Your lips should be rounded, and you should feel vibrations on your lips."
            }
        }
    }

</script>
