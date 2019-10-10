<template>
    <FlexboxLayout flexDirection="row" justifyContent="space-between" :style="style" @tap="tap" >
        <Label :text="text" alignSelf="center" style="font-weight: bold; font-size: 20em" />
        <Label :text="'\uf028'" alignSelf="center" style="font-size: 20em;" class="fas" />
    </FlexboxLayout>
</template>

<script>
    import { TNSPlayer } from "nativescript-audio";

    const player = new TNSPlayer();
    const audioDirectory = "~/assets/audio/"

    var playerOptions = {
      audioFile: '',
      loop: false,
    };

    export default {
        props: ['text', 'sound'],
        computed: {
            style() {
                return {
                    'background-color': '#B272C8',
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
            //Play the note from asset file...
            if (this.sound == "slide") {
              playerOptions.audioFile = audioDirectory + this.sound + '.mp3';
            } else {
              playerOptions.audioFile = audioDirectory + this.text + '_' + this.sound + '.mp3';
            }

            player
              .playFromFile(playerOptions)
              .then(function(res) {
                console.log(res);
              })
              .catch(function(err) {
                console.log('Something went wrong...', err);
              });
          }
        }
    }

</script>
