<template>
  <div style="display: flex; flex-direction: column">
    <div class="separate-page-title">
      Two-Voice Separation
    </div>
    <Uploader class="uploader"/>
    <a-button type="primary" @click="twoVoiceSeparate"
              style="margin-bottom: 2%; width: 52%; margin-left: 25%;
              background-color: lightslategray; border-color: lightslategray">
      Separate!
    </a-button>
    <TextDivider text="Source Audio"
                 v-show="sourceAudioShow"
                 class="voice-separate-audio-wave"/>
    <BasicWave v-model:audio-url="sourceAudioUrl"
               v-show="sourceAudioShow"
               uid="multi-wave-0"
               class="voice-separate-audio-wave"
    />
    <TextDivider text="Separated Audio"
                 v-show="separateAudioShow"
                 class="voice-separate-audio-wave"/>
    <BasicWave v-model:audio-url="audio_s1"
               v-show="separateAudioShow"
               uid="multi-wave-1"
               class="voice-separate-audio-wave"
    />
    <BasicWave v-model:audio-url="audio_s2"
               v-show="separateAudioShow"
               uid="multi-wave-2"
               class="voice-separate-audio-wave"
    />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Uploader from "@/components/util/Uploader.vue";
import BasicWave from "@/components/wavesurfer/BasicWave.vue";
import {message} from "ant-design-vue";
import {defineAsyncComponent, ref} from "vue";
import request from "@/utils/request";
import axios from "axios";
import TextDivider from "@/components/util/TextDivider.vue";

export default {
  name: "SeparateTwoVoice",
  components: {
    TextDivider,
    BasicWave, Uploader, Header,
    // waveSource: defineAsyncComponent(() => import('@/components/wavesurfer/BasicWave.vue')),
    // waveS1: defineAsyncComponent(() => import('@/components/wavesurfer/BasicWave.vue')),
    // waveS2: defineAsyncComponent(() => import('@/components/wavesurfer/BasicWave.vue'))
  },
  data() {
    return {
      source: 'source',
      s1: "s1",
      s2: "s2",
      sourceUrlIdx: 'source-file-url'
    }
  },
  methods: {
    twoVoiceSeparate() {
      // ????????????userId=2??????GUEST???????????????????????????user===null??????????????????userId??????param
      let user = JSON.parse(sessionStorage.getItem("user-login"));
      let userId = 2;
      if (user !== null)
        userId = user.userId;


      let sourceAudioUrl = sessionStorage.getItem(this.sourceUrlIdx);
      if (sourceAudioUrl == null) {
        message.info("Please upload source-audio first.");
        return;
      }

      // console.log(sourceAudioUrl)
      message.info("Separating...");
      request.get('http://localhost:8080/multi-voice/separate/by-source-audio-url',
          {params: {userId: userId, url: sourceAudioUrl}})
          .then(res => {
        if (res.code === "CODE_200") {
          sessionStorage.setItem('multi1', res.data[0]);
          sessionStorage.setItem('multi2', res.data[1]);
          this.$router.go(0);
          message.success("Separation finished.");
        } else {
          message.error(res.code);
        }
      })
    }
  },
  mounted() {
    let updateUrl = () => {
      let sourceAudioUrl_ = sessionStorage.getItem(this.sourceUrlIdx);
      if (sourceAudioUrl_ === null) {
        return;
      }
      this.sourceAudioUrl = sourceAudioUrl_;
      // console.log(this.audioUrl);
      this.sourceAudioShow = true;
    }

    let s1 = sessionStorage.getItem('multi1');
    let s2 = sessionStorage.getItem('multi2');
    let updateS1S2 = () => {
      if (s1 === null && s2 === null)
        return;
      this.audio_s1 = s1;
      this.audio_s2 = s2;
      this.separateAudioShow = true;
    }

    setInterval(() => {
      updateUrl();
      updateS1S2();
    }, 100)
  },
  setup() {
    let sourceAudioUrl = ref('http://localhost:8080/test.wav');
    let sourceAudioShow = ref(false);

    let audio_s1 = ref('http://localhost:8080/test-s1.wav');
    let audio_s2 = ref('http://localhost:8080/test-s2.wav');
    let separateAudioShow = ref(false);

    return {
      sourceAudioUrl,
      sourceAudioShow,
      audio_s1,
      audio_s2,
      separateAudioShow,
    }
  }
}
</script>

<style scoped>
.separate-page-title {
  margin-top: 3%;
  font-family: Cambria, system-ui;
  font-size: xxx-large;
  color: darkslategray;
}

.uploader {
  margin-left: 25%;
}

.voice-separate-audio-wave {
  margin-left: 23%;
}
</style>