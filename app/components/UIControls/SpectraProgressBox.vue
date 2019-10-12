<!--Spectra-themed progress box-->

<template>
    <Label text="" width="250" height="50" backgroundColor="transparent" :style="style"/>
</template>

<script>
    import {Config} from "@/utils/Config";

    export default {
        props: ['percentage'],
        components: {

        },
        computed: {
            style() {
                let pct_gradient = this.percentage ? 100 - this.percentage : '0';
                
                if (this.percentage == 0) {
                  return {
                      'background': `${Config.mutedColor}`,
                      'border-radius': '5dp',
                      'border-color': `${Config.primaryColor}`,
                      'border-width': `2dp`
                  };
                } else if (this.percentage == 100) {
                  return {
                      'background': `${Config.primaryColor}`,
                      'border-radius': '5dp',
                      'border-color': `${Config.primaryColor}`,
                      'border-width': `2dp`
                  };
                } else {
                    return {
                      'background': this.percentage ?
                          `linear-gradient(to bottom left, #E8E8E8 ${pct_gradient}%, ${Config.primaryColor} ${pct_gradient}%)`:
                          Config.primaryColor,
                      'border-radius': '5dp',
                      'border-color': `${Config.primaryColor}`,
                      'border-width': `2dp`
                  };
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
