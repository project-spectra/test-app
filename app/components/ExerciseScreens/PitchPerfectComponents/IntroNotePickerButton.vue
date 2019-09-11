<template>
    <FlexboxLayout flexDirection="row" justifyContent="space-between" :style="style" @tap="onTap" >
        <Label :text="text" alignSelf="center" style="font-weight: bold; font-size: 20em" />
        <Label :text="'\uf028'" alignSelf="center" style="font-size: 20em;" class="fas" />
    </FlexboxLayout>
</template>

<script>

    export default {
        props: ['selected', 'text'],
        components: {

        },
        computed: {
            style() {
                return {
                    'background-color': '#B272C8',
                    'padding': '15dp',
                    'min-width': '80dp',
                    // 'height': '20dp',
                    'border-radius': '5dp',
                    'box-shadow': '5px 5px 10px'
                }
            }
        },
        methods: {
          onTap: function() {
            //TODO: Play the note indicated
          }
        }
    }

</script>
