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
        props: ['text'],
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
            //Play the note from asset file...
            var note = this.text;

            //Will need to eventually differentiate between exercises, because there is for example an E3 example on an 'eeeee' sound and an 'oooool' sound.
            playerOptions.audioFile = audioDirectory + note + '.mp3';

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
