<template>
  <div style="display: flex; flex-direction: column">
    <div class="separate-page-title">
      Voice-Noise Separation
    </div>
    <Uploader class="uploader"/>
    <a-button type="primary" @click="singleVoiceSeparate"
              style="margin-bottom: 2%; width: 52%; margin-left: 25%;
              background-color: lightslategray; border-color: lightslategray">
      Separate!
    </a-button>
    <TextDivider text="Source Audio"
                 v-show="sourceAudioShow"
                 class="voice-separate-audio-wave"/>
    <BasicWave v-model:audio-url="sourceAudioUrl"
               v-show="sourceAudioShow"
               uid="single-wave-0"
               class="voice-separate-audio-wave"
    />
    <TextDivider text="Separated Audio"
                 v-show="separateAudioShow"
                 class="voice-separate-audio-wave"/>
    <BasicWave v-model:audio-url="audio_s1"
               v-show="separateAudioShow"
               uid="single-wave-1"
               class="voice-separate-audio-wave"
    />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import {ref} from "vue";
import Uploader from "@/components/util/Uploader.vue";
import TextDivider from "@/components/util/TextDivider.vue";
import BasicWave from "@/components/wavesurfer/BasicWave.vue";
import request from "@/utils/request";
import {message} from "ant-design-vue";

export default {
  name: "SeparateVoiceNoise",
  components: {BasicWave, TextDivider, Uploader, Header},
  methods: {
    singleVoiceSeparate() {
      // 后端默认userId=2代表GUEST上传，所以这里如果user===null，也可以不传userId这个param
      let user = JSON.parse(sessionStorage.getItem("user-login"));
      let userId = 2;
      if (user !== null)
        userId = user.userId;

      let sourceAudioUrl = sessionStorage.getItem('source-file-url');
      if (sourceAudioUrl == null) {
        message.info("Please upload source-audio first.");
        return;
      }
      // console.log(sourceAudioUrl)
      request.get('http://localhost:8080/single-voice/separate/by-source-audio-url',
          {params: {userId: userId, url: sourceAudioUrl}})
          .then(res => {
            if (res.code === "CODE_200") {
              sessionStorage.setItem('s1', res.data[0]);
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
      let sourceAudioUrl_ = sessionStorage.getItem('source-file-url');
      if (sourceAudioUrl_ === null) {
        this.sourceAudioShow = false;
        return;
      }
      this.sourceAudioUrl = sourceAudioUrl_;
      // console.log(this.audioUrl);
      this.sourceAudioShow = true;
    }

    let s1 = sessionStorage.getItem('s1');
    let updateS1 = () => {
      if (s1 === null)
        return;
      this.audio_s1 = s1;
      this.separateAudioShow = true;
    }

    setInterval(() => {
      updateUrl();
      updateS1();
    }, 100)
  },
  setup() {
    let sourceAudioUrl = ref('http://localhost:8080/test.wav');
    let sourceAudioShow = ref(false);

    let audio_s1 = ref('http://localhost:8080/test-s1.wav');
    let separateAudioShow = ref(false);

    return {
      sourceAudioUrl,
      sourceAudioShow,
      audio_s1,
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