<!--Spectra-themed Action Button-->
<template>
    <Button :text="text" :isEnabled="isEnabled" class="spectra-action-button" :style="style" @tap="tap" />
</template>


<script>
    export default {
        // https://stackoverflow.com/questions/42872002/in-vue-js-component-how-to-use-props-in-css
        // https://github.com/NativeScript/NativeScript/issues/4864 (Can't parameterize pseudo selectors without fiddling..)

        props: ['text', 'isEnabled', /*'color', */'animateOnHover'],

        components: {

        },

        computed: {
            style () {
                // return {'background': 'red'};
                return {
                    // '--color': this.color,
                    'border-color': '#A7C6BE',
                    'border-width': '2dp',
                    'border-radius': '2dp',
                    // 'background-color': 'transparent',
                    'font-size': '20em',
                    'font-weight': 'bold',
                    'min-height': '60dp',
                    'text-transform': 'none',
                }
                // return `border-color: ${this.color}; border-width: 2dp; background-color: transparent; font-size: 20em; min-height: 60dp; text-transform: none; font-weight: bold; borderRadius: 3dp;`
            }
        },
        data() {
            return {
                name: '',
                WELCOME_TEXT:
                    "Welcome! This free, open-source voice training app was made by and for the LGBTQ community to " +
                    "support our self-determination.\n\nIf you have feedback for us or if you are interested in joining " +
                    "the development team, ",
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
    Button.spectra-action-button:active {
        background-color: #A7C6BE;
    }
</style>
