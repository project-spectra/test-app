<!--https://lh3.googleusercontent.com/j92tXOUj0gwqAI6x2w13OaZRmY7c9otW2h8StmbnQIkhtaCub6GwpbwHGnefFps7Dn6tJwVHHA=w293-->

<template>
    <FlexboxLayout flexDirection="row" justifyContent="space-between" :style="style" @tap="tap" >
        <Label :text="text" style="/*font-weight: bold;*/ font-size: 15em;"/>

        <FlexboxLayout flexDirection="row">
            <Label :text="progressText" style="font-weight: bold; font-size: 15em; padding-right: 6dp;"/>
            <Label :text="'\uf054'" alignSelf="center" style="font-size: 20em;" class="fas" />
        </FlexboxLayout>

    </FlexboxLayout>
</template>

<script>
    import {Config} from "@/utils/Config";

    export default {
        props: ['text', 'percentage', 'progressText'],
        components: {

        },
        computed: {
            style() {
                let percentage = this.percentage ? 100 - this.percentage : '0';

                if (percentage == 0) {
                  return {
                      'background': `${Config.mutedColor}`,
                      'border-radius': '7dp',
                      'border-color': `${Config.primaryColor}`,
                      'border-width': `2dp`,
                    padding: '10dp'
                  };
                } else {
                    return {
                        'background': this.percentage ?
                            `linear-gradient(to bottom left, #E8E8E8 ${percentage}%, ${Config.primaryColor} ${percentage}%)`:
                            Config.primaryColor,
                        'border-radius': '7dp',
                        'border-color': `${Config.primaryColor}`,
                        'border-width': `2dp`,
                    padding: '10dp'
                    }
                };
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
