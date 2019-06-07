<template>
    <Button :text="'< ' + text" :isEnabled="isEnabled" :style="buttonStyle" @tap="tap" />
</template>

<script>
    import {Config} from "@/utils/Config";

    export default {
        props: ['text', 'isEnabled', 'type', /*'color', */'animateOnHover'],

        computed: {
            buttonStyle () {
                // return {'background': 'red'};
                return {
                    // '--color': this.color,
                    /*'border-color': 'transparent',
                    'border-width': '1',*/
                    // 'border-width': '2dp',
                    // 'border-radius': '2dp',
                    'font-family': 'sans-serif',
                    'background-color': Config.primaryColor,
                    'font-size': '20em',
                    'font-weight': 'bold',
                    'min-height': '65dp',
                    'text-transform': 'none',
                    'text-align': 'left',
                }
                // return `border-color: ${this.color}; border-width: 2dp; background-color: transparent; font-size: 20em; min-height: 60dp; text-transform: none; font-weight: bold; borderRadius: 3dp;`
            }
        },
        methods: {
            tap: function() {
                this.$emit('tap')
            }
        }
    }
</script>

<style scoped>

</style>
