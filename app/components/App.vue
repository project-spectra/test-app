<template>
  <Page class="page" :class="{ dialogOpen: dialogOpen }">
    <ActionBar title="Project Spectra" class="action-bar" />
      <GridLayout>

        <StackLayout class="content p-20">          
          <Label text="Recorder" class="label font-weight-bold m-b-5" />
          <!-- <audio-recorder></audio-recorder> !-->

          <Label text="Exercises" class="label font-weight-bold m-b-5" />
          <Button text="Big Dog Small Dog" @tap="goToDog" />
          <Button text="Conversation" @tap="goToConvo" />
          <Button text="Dialog test" @tap="showDialog" />
        </StackLayout>

        <!-- Welcome Dialog !-->
        <AbsoluteLayout class="dialog-wrapper">
          <StackLayout class="dialog">

            <Label class="h3" id="greeting" textWrap="true" v-model="welcomeText" />

            <StackLayout class="input-field">
              <TextField v-if="noName" class="input" hint="What is your name?" autocorrect="false" v-model="input.name"></TextField>
            </StackLayout>
            <GridLayout v-if="noName" id="nameControls" rows="auto, auto" columns="*, *">
              <Button text="Save" @tap="save" class="btn btn-primary" row="0" col="0" />
              <Button text="Load" @tap="load" class="btn btn-primary" row="0" col="1" />
              <Button text="clear" @tap="clear" class="btn btn-primary" row="1" col="0" colSpan="2" />
            </GridLayout>
            
            <Button class="btn btn-primary" text="Next" @tap="closeDialog" />

          </StackLayout>
        </AbsoluteLayout>

      </GridLayout>
  </Page>
</template>

<script>
  import Dog from '@/components/Dog'
  import Convo from '@/components/Convo'
  import AudioRecorder from '@/components/AudioRecorder'
  import * as ApplicationSettings from "application-settings";

  export default {
    components: { AudioRecorder },
    data () {
      return {
        msg: 'Hello World!',
        progress: 0,
        input: {
          name: "",
          firstLoad: true,
        },
        noName: true,
        dialogOpen: false,
        welcomeText: "Welcome to Spectra!",
      };
    },

    mounted() {
      this.$store.subscribe((mutations, state) => {
        ApplicationSettings.setString("store", JSON.stringify(state));
        
        this.input.name = state.name;
        this.input.firstLoad = state.firstLoad;
        
        if (state.name === "") {
          this.welcomeText = "Welcome to Spectra!";          
        } else {
          this.welcomeText = "Welcome back, " + state.name + "!";
          this.noName = false;
        }
      });

      this.$store.commit("load");
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
        this.noName = true;
      },

      //Dialog methods
      showDialog() {
        this.dialogOpen = true;
      },
      closeDialog() {
        this.dialogOpen = false;
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
  @keyframes show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .dialogOpen .content,
  .dialogOpen .action-bar {
    opacity: 0.2;
  }

  .dialogOpen .dialog-wrapper {
    visibility: visible;
    animation-name: show;
    animation-duration: 0.3s;
    animation-fill-mode: forwards;
  }

	.dialog-wrapper {
		visibility: collapse;
		opacity: 0;
	}

	.dialog {
		border-width: 1 0 1 0;
		border-color: black;
		background-color: white;
		width: 100%;
		margin-top: 100;
		padding: 20;
	}

	.dialog Label {
		margin: 0 15 15 15;
		color: black;
	}

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
