# Project Spectra

> Our goal is to work with trans people, clinical speech therapists, and trans voice experts to build a voice training app that doesn’t suck.

## Development Environment Setup

These steps have been tested on macOS 10.14.6 and Ubuntu 18.04.3 LTS.
1.  Ensure you have `node` installed. [Node Version Manager](https://github.com/nvm-sh/nvm) can help with having an isolated `node` environment rather than that of your system. `lts/dubnium` or Node.js 10 and above should work.

2. Make an empty directory to put the sources in, then clone the [main repo](https://github.com/project-spectra/test-app.git) as well as the NativeScript plugins required for voice analysis, into said empty directory. As of the time of writing, the available plugins are:
    1. [Pitch Perfect Plugin](https://github.com/project-spectra/spectra-pitch-perfect-plugin)
    2. [BDSD Plugin](https://github.com/project-spectra/spectra-bdsd-plugin)

    For convenience, the `.jar`s that these libraries depend on are already checked into git to make working on the frontend easier. If you're interested on working on algorithms and audio processing, please visit [Native Plugin Development](http://tbd).

3. Ensure that you have the Android P (API 28) SDK Platform and build tools and/or Xcode 10.2 (mandatory, some of the libraries use Swift 5) or above installed. Set your Android SDK environment variables appropriately, e.g.:
    ```
    export ANDROID_HOME=~/Library/Android/sdk/
    export PATH=$ANDROID_HOME/platform-tools:$PATH
    ```

4.
        npm install -g nativescript
        cd test-app
        npm install
        cd ..
        cd spectra-bdsd-plugin
        npm install
        cd ..
        # `cd` into every other plugin folder and do npm install



Please refer to the NativeScript tutorial for more details as it is a very fast-moving platform: https://nativescript-vue.org/en/docs/getting-started/installation/

## Usage

``` bash
# Before performing any of these commands, you must cd into the src folder within every plugin and run the typescript transpiler, and *leave the terminal window open*:

cd spectra-*-plugin/src/
npm run plugin.tscwatch

# <platform> is {android,ios}
# Build for production
tns build <platform> --bundle

# Build, watch for changes and debug the application
tns debug <platform> --bundle

# Build, watch for changes and run the application
tns run <platform> --bundle
```

# How you can help

## Algorithm Research
- Help us document common techniques or algorithms used in speech analysis and which are **relevant to our exercises** in the Wiki or by opening a new issue for discussion.
    - One such example is [here](https://github.com/project-spectra/test-app/wiki/Formants-and-their-extraction).
- Even if you do not implement it yourself (which may often be the case), your contributions are extremely valuable - others interested in the implementation will get a head start where you left off and avoid "barking up the wrong tree" especially if you manage to document the pros and cons of various approaches.
- The documentation should strive to be as self-contained as possible to lower the entry barrier for contributors.
- Documenting algorithms which we implement by simply making use of other open source libraries is also appreciated; at the very least references to some papers would help shed light on their inner workings (e.g. the YIN algorithm for F0 detection.)
- "Ten Physical Elements of the Voice and Two Cultural Elements of Speech that Are Relevant to Gender" can be found [here](https://docs.google.com/document/d/1fiWuHP2-scY6n1bJ5N4MYtnMJL5xyql7fKsbujmpCYE/view).

## iOS
- Achieve full feature parity and consistent UX with the Android version.
- This involves filling out the `.ios.js` files in the plugin repos as well as researching alternatives that behave similarly to the Android version. For instance, we may use TarsosDSP on Android for F0 detection, but CoreAudio on iOS instead.

## Other coding-related tasks
- Unit testing
- Documentation
    - Vue component names of certain reusable design elements such as buttons, controls, etc.
    - Making existing documentation more accessible and user friendly by adding table of contents, examples, etc.


To get in touch with us and learn more about our procedures, practices, and history, please read our [Onboarding Guide](https://docs.google.com/document/d/1-poyIcIj0BSHoWMEc8NA--XnNl2zCiyEonpMrjRFFVU/view) and [Contributor's Covenant](http://tbd).

# Planned features

'Big Dog Small Dog' voice training exercise

Conversational practice exercise

Customizable goals and feedback, with an emphasis on user empowerment and agency