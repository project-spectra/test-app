<template>
    <Page actionBarHidden="true" class="page">
        <FlexboxLayout style="flex: 1;" flexDirection="column" id="container">
            <TextView text="Change Your Goal" editable="false" id="welcome"/>

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
                <SpectraActionButton :text="nextButtonText" @tap="onOK"
                                     :isEnabled="this.form.goal !== 'select_a_goal'" />
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
    import Settings from "@/components/Settings"
    import SpecificPitchPicker from "@/components/OnboardingScreens/SpecificPitchPicker";
    import {PropertyConverter} from 'nativescript-ui-dataform'

    //import filesystem and append functions
    import {appendFile} from '@/utils/Utils';
    import { knownFolders, path, File, Folder } from "tns-core-modules/file-system";

    const moment = require("moment");

    //Set up usage logging
    const permissions = require('nativescript-permissions');
    var logFile;

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
                
                //Log goal set
                appendFile(logFile,moment().format() + ',' + 'goalSet' + ',' + this.form.goal + ',' + '\n');

                if (this.selectSpecificPitchChecked) {
                    this.$navigateTo(SpecificPitchPicker);
                } else {
                    this.$navigateTo(App, {clearHistory: true});
                }
            },

            onReturn: function(){
                this.$navigateTo(Settings);
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
                goal: this.$store.state.goal,
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
        },
        mounted() {
            permissions.requestPermission(android.Manifest.permission.WRITE_EXTERNAL_STORAGE).then(() => {
                console.log('Write permissions granted.');

                const directory = android.os.Environment.getExternalStorageDirectory().getAbsolutePath().toString();
                const folder = Folder.fromPath(directory);
                
                //moment().format().substr(0,10) just the date
                logFile = folder.getFile('spectra-log.txt');
                console.log("logfile: " + logfile);
            }).catch( (error) => {
                console.error(error);
            });
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
