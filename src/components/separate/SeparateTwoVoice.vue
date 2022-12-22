<template>
  <div style="display: flex; flex-direction: column">
    <Uploader class="uploader"/>
    <a-button type="primary" @click="twoVoiceSeparate"
              style="margin-bottom: 40px; width: 52%; margin-left: 25%">
      Separate!
    </a-button>
    <TextDivider text="Source Audio"
                 v-show="sourceAudioShow"
                 class="two-voice-separate-audio-wave"/>
    <BasicWave v-model:audio-url="sourceAudioUrl"
               v-show="sourceAudioShow"
               uid="wave0"
               class="two-voice-separate-audio-wave"
    />
    <TextDivider text="Separated Audio"
                 v-show="separateAudioShow"
                 class="two-voice-separate-audio-wave"/>
    <BasicWave v-model:audio-url="audio_s1"
               v-show="separateAudioShow"
               uid="wave1"
               class="two-voice-separate-audio-wave"
    />
    <BasicWave v-model:audio-url="audio_s2"
               v-show="separateAudioShow"
               uid="wave2"
               class="two-voice-separate-audio-wave"
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
      s2: "s2"
    }
  },
  methods: {
    twoVoiceSeparate() {
      // 后端默认userId=2代表GUEST上传，所以这里如果user===null，也可以不传userId这个param
      let user = JSON.parse(sessionStorage.getItem("user-login"));
      let userId = 2;
      if (user !== null)
        userId = user.userId;

      let sourceAudioUrl = sessionStorage.getItem('source-file-url');
      // console.log(sourceAudioUrl)
      request.get('http://localhost:8080/multi-voice/separate/by-source-audio-url',
          {params: {userId: userId, url: sourceAudioUrl}})
          .then(res => {
        if (res.code === "CODE_200") {
          sessionStorage.setItem('s1', res.data[0]);
          sessionStorage.setItem('s2', res.data[1]);
          message.success("Separation finished.");
          this.$router.go(0);
        } else {
          message.error(res.code);
        }
      })
    }
  },
  mounted() {
    let updateUrl = () => {
      let sourceAudioUrl_ = sessionStorage.getItem('source-file-url');
      if (sourceAudioUrl_ === null) {
        return;
      }
      this.sourceAudioUrl = sourceAudioUrl_;
      // console.log(this.audioUrl);
      this.sourceAudioShow = true;
    }

    let s1 = sessionStorage.getItem('s1');
    let s2 = sessionStorage.getItem('s2');
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
    let sourceAudioShow = ref(true);

    let audio_s1 = ref('http://localhost:8080/test-s1.wav');
    let audio_s2 = ref('http://localhost:8080/test-s2.wav');
    let separateAudioShow = ref(false);

    // const waveSource = () => import('@/components/wavesurfer/BasicWave.vue');
    // const waveS1 = () => import('@/components/wavesurfer/BasicWave.vue');
    // const waveS2 = () => import('@/components/wavesurfer/BasicWave.vue');

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
.uploader {
  margin-left: 25%;
}

.two-voice-separate-audio-wave {
  margin-left: 23%;
}
</style>