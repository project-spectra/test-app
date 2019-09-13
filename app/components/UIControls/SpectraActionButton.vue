<!--Spectra-themed Action Button-->
<template>
    <Button :text="text" :isEnabled="isEnabled" :class="styleClass" :style="style" @tap="tap" />
</template>


<script>
    export default {
        // https://stackoverflow.com/questions/42872002/in-vue-js-component-how-to-use-props-in-css
        // https://github.com/NativeScript/NativeScript/issues/4864 (Can't parameterize pseudo selectors without fiddling..)

        props: ['text', 'isEnabled', 'type', /*'color', */'animateOnHover'],

        components: {

        },

        computed: {
            style () {
                // return {'background': 'red'};
                return {
                    // '--color': this.color,
                    // 'border-color': '#A7C6BE',
                    'border-width': '1dp',
                    'border-radius': '4dp',
                    'border-color': '#E8E8E8',
                    // 'background-color': 'transparent',
                    'font-size': '20em',
                    'font-weight': 'bold',
                    'min-height': '60dp',
                    'text-transform': 'none',
                }
                // return `border-color: ${this.color}; border-width: 2dp; background-color: transparent; font-size: 20em; min-height: 60dp; text-transform: none; font-weight: bold; borderRadius: 3dp;`
            },

            styleClass() {
                switch(this.type) {
                    case 'warning':
                        return 'spectra-action-button-warning';
                    case 'settings-green':
                        return 'settings-button-green';
                    case 'settings-orange':
                        return 'settings-button-orange';
                    default:
                        return 'spectra-action-button';
                }
            }
        },
        data() {
            return {

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
    Button.spectra-action-button-warning {
        background-color: #F8AF51;
    }

    Button.spectra-action-button-warning:active {
        background-color: #F3D3A9;
        border-color: #F8AF51;
    }

    Button.spectra-action-button {
        background-color:  #72C8B2;
    }

    Button.settings-button-green {
        background-color: #72C8B2;
    }

    Button.settings-button-orange {
        background-color: #F8AF51;
    }

    Button.spectra-action-button:active {
        background-color: #A7C6BE;
        border-color: #72C8B2;
    }
</style>
