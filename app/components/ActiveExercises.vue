
<template>
    <Page actionBarHidden="true" class="page">
        <FlexboxLayout style="flex: 1;" flexDirection="column" id="container">
            <TextView text="Exercises" editable="false" id="welcome"/>

            <TextView editable="false" style="background-color: transparent; border-bottom-color: #A7C6BE; border-bottom-width: 2dp;">
                <Span text="Current Goal: " />
                <Span :text="currentGoalName" style="font-style: italic; font-weight: bold;" />
            </TextView>

            <StackLayout style="height: 10dp" />

            <!-- Exercises !-->
            <Label style="font-style: italic" text="Do this first to avoid vocal strain" />
            
            <ExerciseProgressRow class="exercise-progress-row" text="Warm-up: Hold That Note!" percentage="0" progressText=""/>

            <Label style="font-style: italic" text="Two times per day" />
            <ExerciseProgressRow @tap="onPitchPerfect" class="exercise-progress-row" text="Pitch Perfect: Strengthen your voice" percentage="33" :progressText="pitchPerfectCompleted + '/2'" />
            <ExerciseProgressRow percentage="0" class="exercise-progress-row" text="Slide: Move smoothly between notes" :progressText="slideCompleted + '/2'" />
            <ExerciseProgressRow @tap="onBDSDTap" class="exercise-progress-row" text="Big Dog/Small Dog: Larynx Training" :progressText="bdsdCompleted + '/2'" />

            <Label style="font-style: italic" text="Any time" />
            <ExerciseProgressRow percentage="0" class="exercise-progress-row" text="Conversational Practice: Talk to a bot" progressText="" />

            <StackLayout style="height: 10dp;"/>

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
            },
            pitchPerfectCompleted() {
              return this.$store.state.pitchPerfectCompleted;
            },
            bdsdCompleted() {
              return this.$store.state.bdsdCompleted;
            },
            slideCompleted() {
              return this.$store.state.slideCompleted;
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
