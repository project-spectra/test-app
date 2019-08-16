
<template>
    <Page actionBarHidden="true" class="page">
        <FlexboxLayout style="flex: 1;" flexDirection="column" id="container">
            <TextView text="Exercises" editable="false" id="welcome"/>

            <TextView editable="false" style="background-color: transparent; border-bottom-color: #A7C6BE; border-bottom-width: 2dp;">
                <Span text="Current Goal: " />
                <Span :text="currentGoalName" style="font-style: italic; font-weight: bold;" />
            </TextView>

            <StackLayout style="height: 10dp" />
            <ExerciseProgressRow @tap="onPitchPerfect" class="exercise-progress-row" text="Pitch Perfect: Practice holding a note"
                                 percentage="33" progressText="1/3" />
            <ExerciseProgressRow percentage="0" class="exercise-progress-row" text="Slide: Move smoothly between notes" progressText="0/2" />
            <ExerciseProgressRow @tap="onBDSDTap" class="exercise-progress-row" text="Big Dog/Small Dog: Larynx Training" progressText="2/2" />
            <ExerciseProgressRow percentage="50" class="exercise-progress-row" text="Conversational Practice: Talk to a bot" progressText="1/2" />

            <StackLayout style="height: 10dp;"/>

            <Label text="See all exercises"
                   :style="allExercisesLinkStyle"/>

            <!--Empty placeholder (there is no equivalent of div in NS..) -->
            <StackLayout style="flex-grow: 1"/>
            <FlexboxLayout alignSelf="flex-begin" flexDirection="row">
                <SpectraActionButton type='warning' alignSelf="flex-begin" text="Main Menu" @tap="onMainMenu" />
            </FlexboxLayout>

        </FlexboxLayout>
    </Page>
</template>

<script>
    import {AVAILABLE_GOALS} from "@/utils/Constants";
    import ExerciseProgressRow from "@/components/UIControls/ExerciseProgressRow";
    import SpectraActionButton from "@/components/UIControls/SpectraActionButton";

    import App from "@/components/App";
    import Dog from "@/components/Dog";
    import BDSDInfo from '@/components/ExerciseScreens/BDSDInfo';

    import PitchPerfect from "@/components/ExerciseScreens/PitchPerfect";

    import {Config} from "@/utils/Config";

    export default {
        components: {ExerciseProgressRow, SpectraActionButton},
        computed: {
            currentGoalName() {
                let currentGoalId = this.$store.state.goal;
                return AVAILABLE_GOALS.find( ({id}) => id === currentGoalId).name;
            },
            allExercisesLinkStyle() {
                return {
                    'font-style': 'italic',
                    'color': Config.accentColor,
                    'text-decoration': 'underline',
                    'font-size': '15em'
                }
            }
        },
        data() {
            return {
                Config: Config
            }
        },
        methods: {
            onMainMenu: function () {
                this.$navigateTo(App, {clearHistory: true});
            },

            onBDSDTap: function() {
                // this.$navigateTo(Dog);
                this.$navigateTo(BDSDInfo);
            },

            onPitchPerfect: function(){
                this.$navigateTo(PitchPerfect);
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

    #welcome {
        font-size: 20em;
        font-family: serif;
        color: #000;
        font-weight: 700;
        background-color: transparent;
    }

    .exercise-progress-row {
        margin-bottom: 12dp;
    }
</style>
