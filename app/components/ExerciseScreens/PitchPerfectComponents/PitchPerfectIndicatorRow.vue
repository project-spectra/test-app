<template>
    <FlexboxLayout flexDirection="row" :style="containerStyle" alignItems="center">
        <StackLayout class="hr-dark" :style="rungStyle"></StackLayout>

        <FlexboxLayout v-if="this.showNote" flexDirection="row" flexGrow="1" :style="noteCircleLegendStyle">

            <Label :text="this.note" alignSelf="center" :style="noteLabelStyle" />

        </FlexboxLayout>
    </FlexboxLayout>
</template>

<script>

    import {PITCH_PERFECT_RUNG_HEIGHT_DP} from "@/utils/Constants";

    export default {
        props: ['note', 'showNote', 'color'],
        computed: {
            containerStyle() {
                return {
                    /*'border-color': 'black',
                    'border-width': '2px',*/
                    height: `${PITCH_PERFECT_RUNG_HEIGHT_DP}dp`,
                }
            },
            rungStyle() {
                return {
                    'background-color': this.color,
                    'box-shadow': '5px 5px 10px',
                    height: '3dp'
                }

            },

            noteLabelStyle() {
                return {
                    color: this.color,
                    'font-weight': 'bold',
                    'font-size': '15em'
                }
            },

            noteCircleLegendStyle() {
                return {
                    'background-color': 'white',
                    'border-radius': '100dp',
                    'justify-content': 'center',
                    'min-width': `${PITCH_PERFECT_RUNG_HEIGHT_DP}dp`,
                    'border-width': '8px',
                    width: `${PITCH_PERFECT_RUNG_HEIGHT_DP}dp`,
                    height: `${PITCH_PERFECT_RUNG_HEIGHT_DP}dp`,
                    'border-color': this.color
                }
            }
        }
    }
</script>
