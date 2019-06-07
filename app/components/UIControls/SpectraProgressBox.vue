<!--Spectra-themed progress box-->

<template>
    <Label text="" width="50" height="50" backgroundColor="transparent" :style="style"/>
</template>

<script>
    import {Config} from "@/utils/Config";

    export default {
        props: ['percentage'],
        components: {

        },
        computed: {
            style() {
                let percentage = this.percentage ? 100 - this.percentage : '0';

                return {
                    'background': this.percentage ?
                        `linear-gradient(to bottom left, #E8E8E8 ${percentage}%, ${Config.primaryColor} ${percentage}%)`:
                        Config.primaryColor,
                    'border-radius': '7dp',
                    'border-color': `${Config.primaryColor}`,
                    'border-width': `1dp`
                }
            }
        },
        data() {
            return {
                Config: Config
            }
        }
    }
</script>
