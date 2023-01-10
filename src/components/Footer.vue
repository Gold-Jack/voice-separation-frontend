<template>
  <div class="footer">
    <a-space style="display: flex; padding: 20px">
      <div>
        <img alt="voice-separation.icon" src="../assets/wave.png">
        <div class="app-name">
          Voice Separation
        </div>
      </div>
      <a-divider type="vertical" style="height: 200px; width: 2px; background-color: white"></a-divider>
      <div class="footer-info-title">
        What's new
        <a-list-item class="footer-info-item">
          v0.9 Beta Release
        </a-list-item>
        <a-list-item class="footer-info-item">
          Model Preview
        </a-list-item>
      </div>
      <div class="footer-info-title">
        Contact us
        <a-list-item class="footer-info-item" @click="jump(blog)">
          Blog: {{ blog }}
        </a-list-item>
        <a-list-item class="footer-info-item">
          E-mail: gold_jack@163.com
        </a-list-item>
        <a-list-item class="footer-info-item">
          China: +86 189-xxxx-xxxx
        </a-list-item>
      </div>
      <div class="footer-info-title" onmouseover="this.style.cursor='pointer'" @click="$router.push('/bug-report')">
        Bug Report
        <a-list-item class="footer-info-item">
          Click ME
        </a-list-item>
      </div>
    </a-space>
  </div>
</template>

<script>
import router from "@/router";
import {ref} from "vue";

export default {
  name: "Footer",
  methods: {
    jump(url) {
    },
  },
  setup() {
    let blog = ref("gold-jack.github.io");

    return {
      blog,
    }
  }
}
</script>

<style scoped>
.footer {
  background-color: black;
  color: white;
  text-align: center;
  width: 100%;
  height: 240px;
}

.app-name {
  color: papayawhip;
  font-size: x-large;
}

.footer-info-title {
  color: white;
  background-color: black;
  font-size: x-large;
  font-family: 'Impact',serif;
  margin-left: 60px;
  text-align: center;
  height: 200px;
}

.footer-info-item {
  color: white;
  background-color: black;
  font-size: medium;
  font-family: Cambria, serif;
  cursor: pointer;
}
</style>