

<template>
    <Page actionBarHidden="true" class="page">
        <FlexboxLayout style="flex: 1;" flexDirection="column" id="container">
            <TextView text="Set a Goal" editable="false" id="welcome"/>

            <TextView text="What do you want to do with your voice?" editable="false" id="question"/>
            <!--Empty placeholder (there is no equivalent of div in NS..) -->
            <StackLayout style="flex-grow: 1"/>

            <FlexboxLayout justifyContent="space-between" flexDirection="row">
                <SpectraActionButton type='warning' text="Return" @tap="onReturn" />
                <SpectraActionButton :isEnabled="this.boxesChecked === 5" text="OK" @tap="onOK" />
            </FlexboxLayout>

        </FlexboxLayout>
    </Page>

</template>


<script>

    import SpectraActionButton from "@/components/UIControls/SpectraActionButton";
    import SpectraTextView from "@/components/UIControls/SpectraTextView";

    export default {
        components: {
            SpectraActionButton,
            SpectraTextView
        },
        methods: {
            onOK: function(){

            },

            onReturn: function(){
                this.$navigateBack();
            },

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

    #welcome {
        font-size: 20em;
        font-family: serif;
        color: #000;
        font-weight: 700;
        background-color: transparent;
    }

    #question {
        font-size: 15em;
        font-family: serif;
        color: #000;
        font-weight: 700;
        background-color: transparent;
    }

</style>
