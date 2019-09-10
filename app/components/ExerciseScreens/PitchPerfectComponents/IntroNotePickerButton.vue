<template>
    <FlexboxLayout flexDirection="row" justifyContent="space-between" :style="style" @tap="tap" >
        <Label :text="text" alignSelf="center" style="font-weight: bold; font-size: 20em" />
        <Label :text="'\uf028'" alignSelf="center" style="font-size: 20em;" class="fas" />
    </FlexboxLayout>
</template>

<script>

    export default {
        props: ['text'],
        components: {},
        data() {
          return {
            selected: false
          }
        },
        computed: {
            style() {
                return {
                    'background-color': '#C98DD8',
                    'padding': '15dp',
                    'min-width': '80dp',
                    'border-radius': '5dp',
                    'box-shadow': '5px 5px 10px',
                }
            }
        },
        methods: {
          tap: function() {
            this.$emit('tap');
            this.selected ? this.selected = false : this.selected = true;
            //Play the note from asset file...
            //var note = this.text;
            
          }
        }
    }

</script>
