<template>
    <FlexboxLayout flexDirection="row" justifyContent="space-between" :style="style" :class="[selected ? selectedClass : '']" @tap="tap" >
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
            },
            selectedClass() {
                return 'selectedButtonClass';
            }
        },
        methods: {
          tap: function() {
            this.$emit('tap');
            console.log('note picker button tapped')
            this.selected = true;
            //Play the note from asset file...
            //var note = this.text;
            
          }
        }
    }

</script>

<style scoped>
  FlexboxLayout.selectedButtonClass {
    border-color:red;
  }
</style>