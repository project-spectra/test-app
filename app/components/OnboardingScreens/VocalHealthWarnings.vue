
<template>
    <Page actionBarHidden="true" class="page">
        <FlexboxLayout style="flex: 1;" flexDirection="column" id="container">
            <TextView :text="WELCOME_TEXT" editable="false" id="welcome"/>

            <TextView :text="REMINDER_TEXT" editable="false" id="reminder"/>

            <StackLayout style="padding: 10em;">
                <check-box text='Make sure it feels "easy" when you talk.' checkPadding="25dp" :style="checkboxStyle"
                           :fillColor="Config.primaryColor" @checkedChange="onCheckboxPressed($event)"
                           checked="false" />
                <check-box text='If you feel tension while talking, try to relax the part of your body that feels strained.' checkPadding="25dp" :style="checkboxStyle"
                           :fillColor="Config.primaryColor"  @checkedChange="onCheckboxPressed($event)"
                           checked="false" />
                <check-box text='If your voice is sore, take a voice "nap!"' checkPadding="25dp" :style="checkboxStyle"
                           :fillColor="Config.primaryColor" @checkedChange="onCheckboxPressed($event)"
                           checked="false" />
                <check-box text='Do a daily 5-10 minute voice warm-up.' checkPadding="25dp" :style="checkboxStyle"
                           :fillColor="Config.primaryColor" @checkedChange="onCheckboxPressed($event)"
                           checked="false" />
                <check-box text="Using too high or two low of a pitch may cause soreness. Pitch isn't everything!"
                           :style="checkboxStyle" checkPadding="25dp"
                           :fillColor="Config.primaryColor" @checkedChange="onCheckboxPressed($event)"
                           checked="false" />
            </StackLayout>

            <!--Empty placeholder (there is no equivalent of div in NS..) -->
            <StackLayout style="flex-grow: 1"/>

            <FlexboxLayout justifyContent="space-between" flexDirection="row">
                <SpectraActionButton type='warning' text="Go Back" @tap="onReturn" />
                <SpectraActionButton :isEnabled="this.boxesChecked === 5" text="OK" @tap="onOK" />
            </FlexboxLayout>


        </FlexboxLayout>
    </Page>
</template>


<script>
    import SpectraActionButton from "@/components/UIControls/SpectraActionButton";
    import SpectraTextView from "@/components/UIControls/SpectraTextView";
    import {Config} from "@/utils/Config";
    import SetAGoal from "@/components/OnboardingScreens/SetAGoal";
    import Welcome from "@/components/OnboardingScreens/Welcome";

    export default {
        components: {
            SpectraActionButton,
            SpectraTextView
        },
        data() {
            return {
                Config: Config,
                name: '',
                boxesChecked: 0,
                WELCOME_TEXT: `Welcome to our community, ${this.$store.state.name}!`,
                REMINDER_TEXT:
                    "It's important to keep in mind these tips for general vocal health. Let us know you understand the following points by checking each box:"
            }
        },
        computed: {
            checkboxStyle(){
                return {
                    "font-size": '15em',
                    "font-style": "italic",
                }
            }

        },
        methods: {
            onOK: function(){
                this.$navigateTo(SetAGoal);
            },

            onReturn: function(){
                this.$navigateTo(Welcome);
            },

            onCheckboxPressed: function($event) {
                // https://github.com/bradmartin/nativescript-checkbox
                this.boxesChecked = $event.value ? this.boxesChecked + 1 : this.boxesChecked - 1;
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

    #reminder {
        /*font-size: 25em;*/
        /*font-family: serif;*/
        background-color: transparent;
    }

</style>
