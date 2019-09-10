<!--Spectra-themed Action Button-->
<template>
    <Button :text="text" :isEnabled="isEnabled" :class="styleClass" :style="style" @tap="tap" />
</template>


<script>
    export default {
        // https://stackoverflow.com/questions/42872002/in-vue-js-component-how-to-use-props-in-css
        // https://github.com/NativeScript/NativeScript/issues/4864 (Can't parameterize pseudo selectors without fiddling..)

        props: ['text', 'isEnabled', 'type', 'animateOnHover'],

        components: {

        },

        computed: {
            style () {
                return {
                    'border-width': '2dp',
                    'border-radius': '2dp',
                    'font-size': '20em',
                    'font-weight': 'bold',
                    'min-height': '60dp',
                    'text-transform': 'none',
                }
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
        border-color: #F8AF51;
    }

    Button.spectra-action-button-warning:active {
        background-color: #F8AF51;
    }

    Button.spectra-action-button {
        border-color: #A7C6BE;
    }

    Button.settings-button-green {
        background-color: #72C8B2;
    }

    Button.settings-button-orange {
        background-color: #F7AF51;
    }

    Button.spectra-action-button:active {
        background-color: #A7C6BE;
    }
</style>
