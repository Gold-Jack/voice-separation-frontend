<template>
  <div class="basic-wave-container">
    <div class="top">
      <div>
        <a-button size="small" shape="circle" class="play-buttons" :disabled="disabled">
          <align-center-outlined :rotate="90" class="play-icons"/>
        </a-button>
      </div>
      <div class="audio-name">
        &nbsp;&nbsp;{{ this.audioName }}
      </div>
      <div class="top-mid">
<!--        top-mid-->
      </div>
      <div class="top-right">
        <Timer :time-sec="this.currentTime" font-color="red"/>
      </div>
      <div class="top-right">
        &nbsp;/&nbsp;
      </div>
      <div class="top-right">
        <Timer :time-sec="this.duration"/>
      </div>
    </div>
    <div class="card-medium">
      <div id="waveform" style="width: inherit; margin-left: 1px; margin-right: 1px">
        <!-- Here be the waveform -->
      </div>
      <a-divider style="margin-top: 1px; margin-bottom: 1px" dashed/>
      <div style="display: flex" class="card-bottom">
        <a-space class="bottom-left-play-buttons">
          <AButton shape="circle" size="small" class="play-buttons" @click="backward">
            <BackwardOutlined class="play-icons"/>
          </AButton>
          <AButton shape="circle" size="small" class="play-buttons" @click="play">
            <play-circle-outlined class="play-icons" />
          </AButton>
          <AButton shape="circle" size="small" class="play-buttons" @click="forward">
            <ForwardOutlined class="play-icons"/>
          </AButton>
          <a-divider type="vertical" style="background-color: lightgray; height: 25px; width: 1px; margin-left: 0; margin-right: 0"/>
          <AButton shape="circle" size="small" class="play-buttons" @click="mute">
            <sound-outlined class="play-icons"/>
          </AButton>
          <div style="width: 100px">
            <a-slider :disabled="disabled" v-model:value="soundVolume" @change="volumeChange"/>
          </div>
        </a-space>
        <div class="bottom-mid">
<!--          bottom-mid-->
        </div>
        <div class="bottom-right">
          <a-space>
            <a-button shape="circle" size="middle" class="play-buttons" @click="zoomOut">
              <zoom-out-outlined class="play-icons"/>
            </a-button>
            <div style="width: 100px">
              <a-slider :disabled="disabled" v-model:value="zoom_" @change="zoomChange"/>
            </div>
            <a-button shape="circle" size="middle" class="play-buttons" @click="zoomIn">
              <zoom-in-outlined class="play-icons"/>
            </a-button>
            <a-divider type="vertical" style="background-color: lightgray; height: 25px; width: 1px; margin-left: 0; margin-right: 0"/>
            <a-button shape="circle" size="middle" class="play-buttons" @click="download">
              <download-outlined class="play-icons"/>
            </a-button>
          </a-space>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WaveSurfer from 'wavesurfer.js'

import { BackwardOutlined, PlayCircleOutlined, ForwardOutlined, SoundOutlined, DownloadOutlined,
          ZoomInOutlined, ZoomOutOutlined, AlignCenterOutlined} from "@ant-design/icons-vue";
import { defineComponent, ref} from "vue";
import Timer from "@/components/util/Timer.vue";
import request from "@/utils/request";
import {message} from "ant-design-vue";

export default {
  name: "BasicWave",
  props: {
    'audioUrl': {
      type: String,
      required: true,
    },
    'audioName': {
      type: String,
      required: false,
      default: "<AUDIO_NAME>.wav"
    },
    'uid': {
      type: String,
      required: false,
      default: '0'
    }
  },
  components: {
    Timer,
    BackwardOutlined,
    PlayCircleOutlined,
    ForwardOutlined,
    SoundOutlined,
    DownloadOutlined,
    ZoomInOutlined,
    ZoomOutOutlined,
    AlignCenterOutlined
  },
  data() {
    return {
      // wavesurfer: null,
      noSound: false,
      mute_: false,
    };
  },
  watch: {
    audioUrl() {
      this.wavesurfer.load(this.audioUrl);
    }
  },
  mounted() {
    let audioNameUpdate = () => {
      if (this.audioName === null) {
        request.get('/file/get/filename', {params: {downloadUrl: this.audioUrl}}).then(res => {
          if (res.data.code === 'CODE_200') {
            this.audioName = res.data.data;
          } else {
            message.error(res.data.code + "\n" + res.data.msg);
          }
        })
      }
    }

    // this.$nextTick(() => {
    //   // console.log(WaveSurfer)
    // });
    this.wavesurfer = WaveSurfer.create({
      container: "#waveform",
      waveColor: '#d299e9',
      progressColor: '#8c11a0',
      height: '150',
      width: '230',
      // backend: 'MediaElement',   // 这里会造成鼠标点击失焦的bug，故不采用backend
      mediaControls: false,
      audioRate: '1',
      cursorWidth: '1',
      cursorColor: 'rgba(6,108,234,0.12)',
    });
    // 结束播放
    this.wavesurfer.on("finish", () => {
      this.wavesurfer.pause();
    });

    this.wavesurfer.load(this.audioUrl);

    // 每100毫秒执行一次，对currentTime进行更新
    setInterval(() => {
      audioNameUpdate();
      this.currentTime = this.wavesurfer.getCurrentTime();
      this.duration = this.wavesurfer.getDuration();
      // console.log(this.currentTime);
    }, 100);
  },
  methods: {
    getCurrentTime() {
      return this.wavesurfer.getCurrentTime();
    },
    getDuration() {
      return this.wavesurfer.getDuration();
    },
    play() {
      // 播放/暂停
      // this.wavesurfer.playPause.bind(this.wavesurfer)();
      this.wavesurfer.playPause();
    },
    forward() {
      this.wavesurfer.skipForward(this.forwardBackwardStep);
    },
    backward() {
      this.wavesurfer.skipBackward(this.forwardBackwardStep);
    },
    mute() {
      if (this.mute_ === true) {
        this.soundVolume = this.beforeMuteVolume;
      } else {
        this.beforeMuteVolume = this.soundVolume;
        this.soundVolume = 0.0;
      }
      this.mute_ = !this.mute_;
      this.volumeChange(this.soundVolume);
    },
    volumeChange(volume) {
      // console.log(volume / 100);
      this.wavesurfer.setVolume(volume / 100);
    },
    download() {
      fetch(this.audioUrl).then(res => res.blob()).then(blob => {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = this.audioName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(a.href);
        document.body.removeChild(a);
      })
    },
    zoomIn() {
      this.zoom_ = this.zoom_ + 10 > 100 ? 100 : this.zoom_ + 10;
      let afterZoom = this.wavesurfer.zoom(this.zoom_ + this.zoomBase);
    },
    zoomOut() {
      this.zoom_ = this.zoom_ - 10 < 0 ? 0 : this.zoom_ - 10;
      let afterZoom = this.wavesurfer.zoom(this.zoom_ + this.zoomBase);
    },
    zoomChange(value) {
      let afterZoom = this.wavesurfer.zoom(value + this.zoomBase);
    }
  },
  created() {
  },
  setup() {
    let soundVolume = ref(30);
    let disabled = ref(false);
    let beforeMuteVolume = ref(30);

    let forwardBackwardStep = ref(1);

    let zoomBase = ref(69);
    let zoom_ = ref(0);

    let duration = ref(0);
    let currentTime = ref(0);

    let wavesurfer = ref(null);

    return {
      soundVolume,
      disabled,
      beforeMuteVolume,
      forwardBackwardStep,
      zoomBase,
      zoom_,
      duration,
      currentTime,
      wavesurfer
    }
  }
}
</script>

<style scoped>
.basic-wave-container {
  width: 850px;
  height: 188px;
  box-shadow: gainsboro;
  margin-bottom: 80px;
}

.top {
  padding-left: 10px;
  padding-bottom: 2px;
  padding-right: 10px;
  display: flex;
}

.audio-name {
  color: darkgray;
  font-size: large;
  padding-bottom: 1px;
}

.top-mid {
  flex: auto;
}

.top-right {
  font-size: large;
}

.bottom-left-play-buttons {
  padding-left: 10px;
  padding-right: 10px;
}

.bottom-mid {
  flex: auto;
}

.bottom-right {
  width: 250px;
}

.card-medium {
  border: 1px darkgray solid;
  box-shadow: 1px 1px 5px 0.5px dimgray;
  border-radius: 8px;
  padding-left: 0.05%;
}

.card-bottom {
  padding-top: 6px;
  padding-bottom: 4px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  background-color: mediumpurple;
}

.play-buttons {
  border: 0;
  background-color: mediumpurple;
}

.play-icons {
  border: 0;
  color: white;
  font-size: large;
  padding-top: 3px;
}

.code-box-demo .ant-slider {
  margin-bottom: 16px;
}
</style>