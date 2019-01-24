<template>
  <Page class="page">
    <ActionBar title="Project Spectra" class="action-bar" />
      <StackLayout>
        <StackLayout class="input-field">
          <Label text="Name" class="label font-weight-bold m-b-5" />
          <TextField class="input" hint="What is your name?" autocorrect="false" v-model="input.name" />
          <StackLayout class="hr-light"></StackLayout>
        </StackLayout>
        <GridLayout rows="auto, auto" columns="*, *">
          <Button text="Save" @tap="save" class="btn btn-primary" row="0" col="0" />
          <Button text="Load" @tap="load" class="btn btn-primary" row="0" col="1" />
          <Button text="clear" @tap="clear" class="btn btn-primary" row="1" col="0" colSpan="2" />
        </GridLayout>
        
        <Label text="Recorder" class="label font-weight-bold m-b-5" />
        <audio-recorder></audio-recorder>

        <Label text="Exercises" class="label font-weight-bold m-b-5" />
        <Button text="Big Dog Small Dog" @tap="goToDog" />
        <Button text="Conversation" @tap="goToConvo" />
      </StackLayout>
  </Page>
</template>

<script>
  import Dog from '@/components/Dog'
  import Convo from '@/components/Convo'
  import AudioRecorder from '@/components/AudioRecorder'

  export default {
    components: { AudioRecorder },
    data: () => ({
        msg: 'Hello World!',
        progress: 0,
        input: {
          name: "",
          firstLoad: true,
        }
    }),
    mounted() {
      this.$store.subscribe((mutations, state) => {
        ApplicationSettings.setString("store", JSON.stringify(state));
        this.input.name = state.name;
        this.input.firstLoad = state.firstLoad;
      });
    },
    destroyed() {

    },

    methods: {
      //Vuex methods
      save() {
        this.$store.commit("save", this.input);
      },
      load() {
        this.$store.commit("load");
      },
      clear() {
        this.input.name = "";
        this.input.firstLoad = true;
      },

      //Navigation methods
      goToDog() {
        this.$navigateTo(Dog);
      },
      goToConvo() {
        this.$navigateTo(Convo);
      }
    }
  }
</script>

<style scoped>
    ActionBar {
        background-color: #53ba82;
        color: #ffffff;
    }

    .message {
        vertical-align: center;
        text-align: center;
        font-size: 20;
        color: #333333;
    }
</style>
