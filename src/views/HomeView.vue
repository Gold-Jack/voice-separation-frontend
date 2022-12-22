<template>
  <div style="display: flex; flex-direction: column">
    <ImgText title="Two-Voice Separate"
             sub-title="Upload your own audio or voice-recordings and get a pack of two separated voices."
             link="/separate/two-voice"
             :image-src="require('../assets/two-voice-icon.png')"
    />
    <ImgText title="Voice-Noise Separation"
             sub-title="Separate your own voice(s) from the background noise."
             link="/separate/voice-noise"
             :image-src="require('../assets/voice-noise-icon.png')"
             arrangement="row-reverse"
    />
    <ImgText title="Voice Recording"
             sub-title="Don't have any audio file? Try record one."
             link="/recording"
             :image-src="require('../assets/recording-icon.png')"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import Home from "@/components/Home.vue";
import ImgText from "@/components/display/ImgText.vue";

export default {
  components: {
    ImgText,
    Home,
  }
}
</script>
