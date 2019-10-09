<!--Spectra-themed TextView component for text input.-->
<template>
    <!--https://stackoverflow.com/questions/44472276/vuejs-pass-all-props-to-child-component-->
    <TextField v-bind="$props" v-model="inputVal" returnKeyType="done" @returnPress="onReturn" id="spectra-text-view" />
</template>

<script>

    export default {
        props: ['value'],
        data() {
            return { inputVal: this.value }
        },
        watch: {
            inputVal(val) {
                this.$emit('input', val);
            }
        },
        methods: {
            onReturn() {
                this.$emit('return-press');
            }
        }
    }

</script>


<style scoped>
    #spectra-text-view {
        background-color: #C9C9C9;
    }
</style>
