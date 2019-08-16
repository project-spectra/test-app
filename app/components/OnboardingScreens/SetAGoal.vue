

<template>
    <Page actionBarHidden="true" class="page">
        <FlexboxLayout style="flex: 1;" flexDirection="column" id="container">
            <TextView text="Set a Goal" editable="false" id="welcome"/>

            <TextView text="What do you want to do with your voice?" editable="false" id="question"/>

            <!--https://docs.nativescript.org/vuejs/ns-ui/DataForm/getting-started#add-raddataform-to-the-page-->
            <RadDataForm style="background-color: #C9C9C9" :source="form" :metadata="formMetadata"
                         @propertyCommitted="onFormPropertyCommitted" />

            <Label text='You can change your goal at any time in Settings'
                   style="font-style: italic"/>
                   
            <check-box text='Select a specific pitch' checkPadding="25dp" :style="checkboxStyle"
                       :fillColor="Config.primaryColor" @checkedChange="onSpecificPitchCheck($event)"
                       checked="false" />
                       
            <!--Empty placeholder (there is no equivalent of div in NS..) -->
            <StackLayout style="flex-grow: 1"/>

            <FlexboxLayout justifyContent="space-between" flexDirection="row">
                <SpectraActionButton type='warning' text="Return" @tap="onReturn" />
                <SpectraActionButton :text="nextButtonText" @tap="onOK" />
            </FlexboxLayout>

        </FlexboxLayout>
    </Page>

</template>


<script>

    import SpectraActionButton from "@/components/UIControls/SpectraActionButton";
    import SpectraTextView from "@/components/UIControls/SpectraTextView";
    import {AVAILABLE_GOALS} from "@/utils/Constants";
    import {Config} from "@/utils/Config";
    import App from "@/components/App";
    import SpecificPitchPicker from "@/components/OnboardingScreens/SpecificPitchPicker";
    import {PropertyConverter} from 'nativescript-ui-dataform'

    /*Sun May 05 2019 01:54:28 GMT+0800 Transfusion: the converter property which transforms the objects backing
    each selection item in the picker into the desired format for the model backing the form doesn't seem to work
    perhaps because it has been intercepted by the onFormPropertyCommitted method*/

    /*class GoalsConverter {
        constructor() {}

        convertFrom(id) {
            return AVAILABLE_GOALS.find((goal) => goal.id === id).name
        }

        convertTo(name) {
            return AVAILABLE_GOALS.find((goal) => goal.name === name).id
        }
    }*/

    export default {
        components: {
            SpectraActionButton,
            SpectraTextView,
        },
        methods: {
            onOK: function(){
                if (this.form.goal === 'Explore my voice') {
                  this.form.goal = 'explore_voice';
                } else if (this.form.goal === 'More Masculine Sound') {
                  this.form.goal = 'more_masc_sound';
                } else if (this.form.goal === 'More Feminine Sound') {
                  this.form.goal = 'more_fem_sound';
                } else if (this.form.goal === 'More Androgynous Sound') {
                  this.form.goal = 'androgyn_sound';
                }

                this.$store.dispatch('setGoal', this.form.goal);
                this.$store.dispatch('setFirstLoad', this.selectSpecificPitchChecked);
                
                if (this.selectSpecificPitchChecked) {
                    this.$navigateTo(SpecificPitchPicker);
                } else {
                    this.$navigateTo(App, {clearHistory: true});
                }
            },

            onReturn: function(){
                this.$navigateBack();
            },

            // https://stackoverflow.com/questions/54605451/nativescript-vue-dataform-does-not-update-the-source-data
            onFormPropertyCommitted: function(data) {
                let editedObject = JSON.parse                        (data.object.editedObject);
                this.form.goal = AVAILABLE_GOALS.find((goal) => goal.name === editedObject.goal).id
            },

            onSpecificPitchCheck: function($event) {
                // https://github.com/bradmartin/nativescript-checkbox
                this.selectSpecificPitchChecked = $event.value;
                console.log(this.selectSpecificPitchChecked);
            }
        },
        computed: {
            checkboxStyle(){
                return {
                    "font-size": '17em',
                    // "font-style": "italic",
                }
            },
            nextButtonText() {
                if (this.selectSpecificPitchChecked) {
                    return "Next"
                } else {
                    return "All Set :)"
                }
            }

        },
        data() {
            return {
                Config,
                selectSpecificPitchChecked: false,
                form: {
                goal: 'Sample Goal'
            }, formMetadata: {
                    'isReadOnly': false,
                commitMode: 'immediate',
                validationMode: 'immediate',
                propertyAnnotations: [
                    {name: 'goal',
                    displayName: 'Your Goal',
                    index: 0,
                    hintText: 'Choose a goal...', //Not working for some reason
                    editor: 'Picker',
                    valuesProvider: AVAILABLE_GOALS.map(goal => goal.name),
                    /*converter: new GoalsConverter()*/}
                ]
            }}
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

    #question {
        font-size: 15em;
        font-family: serif;
        color: #000;
        font-weight: 700;
        background-color: transparent;
    }

</style>
