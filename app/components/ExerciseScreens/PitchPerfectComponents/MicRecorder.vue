<template>

    <StackLayout flexGrow="1" :style="recordAreaStyle">

    <StackLayout style="margin-top: 15dp; margin-left: 15dp; margin-right: 15dp; font-size: 15em; background-color: white;">
        <TextView :text="pitchPerfectReminder" style="background-color: transparent;" editable="false"/>
    </StackLayout>

    <!--the timer-->
    <TextView horizontalAlignment="center" :text="timeCounterFormatted" editable="false" id="timer" />

    <!--the inner ring, absolutely positioned-->
    <FlexboxLayout :style="micIconBgStyle" justifyContent="center">
        <FlexboxLayout alignSelf="center" :style="micIconBgInlayStyle" justifyContent="center" >
            <Label :text="'\uf130'" :style="micIconStyle" alignSelf="center" class="fas" />
        </FlexboxLayout>
    </FlexboxLayout>

    </StackLayout>

</template>


<script>

    import {Config} from "@/utils/Config";

    export default {
        methods: {

        },
        computed: {
            recordAreaStyle() {
                return {
                    'background-color': Config.primaryColor,
                    'border-radius': '5dp',
                }
            },
            micIconBgStyle() {
                return {
                    'background-color': Config.mutedColor,
                    'width': '150dp',
                    'height': '150dp',
                    'border-radius': '100%'

                }
            },
            micIconBgInlayStyle() {
                return {
                    'background-color': 'rgba(255, 255, 255, 0.8)',
                    'width': '60dp',
                    'height': '60dp',
                    'border-radius': '100%',
                    position: 'absolute',
                    left: '50%',
                    right: '50%',
                    'margin-left': '-30dp',
                    'margin-right': '-30dp'


                }
            },
            micIconStyle(){
                return {
                    'font-size': '35em',
                }
            }
        },
        data() {
            return {
                pitchPerfectReminder: 'Start and end the exercise by touching the mic icon.',
                timeCounter: 0,
                // representing seconds as HH:mm:ss
                timeCounterFormatted: new Date(0 * 1000).toISOString().substr(11, 8)
            }
        }
    }

</script>


<style scoped>
    #timer {
        font-family: 'monospace';
        font-size: 20em;
        /*align-self: center;*/
        color: #AC2535;
        font-weight: bold;
        background-color: transparent;

    }

</style>
