<template>
    <Page actionBarHidden="true" class="page" >
      <FlexboxLayout style="flex: 1;" flexDirection="column" id="container">
            <TextView text="Hold that Note!" editable="false" id="title"/>

            <TextView editable="false" :text="INFO_TEXT" id="desc" />

            <StackLayout flexGrow="1" />
            <FlexboxLayout justifyContent="space-between" flexDirection="row">
                <SpectraActionButton type='warning' text="Back" @tap="onBack" />
            </FlexboxLayout>
        </FlexboxLayout>
    </Page>
</template>
<script>
    import App from "@/components/App";
    import SpectraActionButton from "@/components/UIControls/SpectraActionButton";

    export default {
        components: {
          SpectraActionButton,
        },
        data() {
          return {
                INFO_TEXT:
                    "In this vocal warmup, hold the sound 'eeee' for as long as possible. To hear an example, choose the note below that is most comfortable for you to hold right now.\n\nThis is a warmup, so don't worry about being exactly on pitch!",
          }
        },
        methods: {
          onBack() {

          }
        }
    }
</script>

<style scoped>
    Page {
        background-color: #E8E8E8;
    }

    #container {
        padding: 15em;
    }

    #title {
        font-size: 30em;
        font-family: serif;
        color: #000;
        font-weight: 700;
        background-color: transparent;
    }

    #desc {
        border-width: 0;
        background-color: transparent;
        border-color: #E8E8E8;
    }

</style>
