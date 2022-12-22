<template>
  <div class="header">
    <a-space style="display: flex; padding: 10px">
      <img alt="voice-separation.icon" src="../assets/wave.png" style="cursor:pointer;" @click="$router.push('/home')">
      <div class="app-name">
        Voice Separation
      </div>
      <a-divider type="vertical" style="height: 40px; background-color: white"></a-divider>
      <div class="header-title" @click="$router.push('/home')">
        Home
      </div>
      <div class="header-title header-title-item" @click.prevent>
        <a-dropdown>
          <a class="ant-dropdown-link" style="color: white">
            Separate
          </a>
          <template #overlay>
            <a-menu class="menu-item">
              <a-menu-item style="font-size: large; font-family: 'Times New Roman',serif; color: dimgray"
                           @click="$router.push('/separate/two-voice')">
                Two-Voice Separation
              </a-menu-item>
              <a-menu-item style="font-size: large; font-family: 'Times New Roman',serif; color: dimgray; padding-top: 10px"
                           @click="$router.push('/separate/voice-noise')">
                Voice-Noise Separation
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
      <div class="header-title header-title-item"
           @click="$router.push('/recording')">
        Recording
      </div>
      <div class="header-title header-title-item"
           @click="$router.push('/about')">
        About
      </div>
      <div class="header-title" style="margin-left: 480px"
           @click="$router.push('/personal/account')">
        Personal Account
      </div>
    </a-space>
  </div>
</template>

<script>
import {ref} from "vue";
import router from "@/router";

export default {
  name: "Header",
  methods: {
  },
  components: {
  },
  setup() {
  },
  mounted() {
  }
}
</script>

<style scoped>
.header {
  background-color: black;
  width: 100%;
  height: 70px;
  text-align: center;
}

.app-name {
  color: papayawhip;
  font-size: x-large;
}

.header-title {
  color: white;
  background-color: black;
  font-size: x-large;
  font-family: "Times New Roman",serif;
  font-weight: bold;
  margin-left: 30px;
  cursor: pointer;
}

.header-title-item {
  padding-left: 30px;
}

.menu-item {
}
</style>