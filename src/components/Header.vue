<template>
  <div class="header">
    <a-space class="main-space" size="large">
      <img alt="voice-separation.icon" src="../assets/wave.png" style="cursor:pointer;" @click="$router.push('/home')">
      <div class="app-name">
        Voice Separation
      </div>
      <a-divider type="vertical" style="height: 40px; background-color: white"></a-divider>
    </a-space>
    <a-space>
      <div class="header-title header-title-item" @click="$router.push('/home')">
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
    </a-space>
    <div style="flex: 20%">
    </div>
    <a-space>
      <div class="header-title header-title-item" style="flex: 15%"
           @click="$router.push('/personal/account')">
        Personal Account
      </div>
    </a-space>
  </div>
</template>

<script>

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
  height: 10%;
  text-align: center;
  display: flex;
  flex-direction: row;
}

.main-space {
  padding: 0.8%;
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
  /*margin-left: 50px;*/
  margin-right: 50px;
  cursor: pointer;
}

.header-title-item {
  /*flex: 50%;*/
}

.menu-item {
}
</style>