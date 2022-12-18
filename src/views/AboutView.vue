<template>
  <div class="about">
<!--    <h1>This is an about page</h1>-->
<!--    <About/>-->
    <BasicWave audio-name="en-en-close.wav"
              audio-url="http://localhost:8080/file/download/e3b2448163af41efab92ed562c34c14b.wav"/>
  </div>
</template>

<script>
import About from "@/components/About.vue";
import BasicWave from "@/components/wavesurfer/BasicWave.vue";
export default {
  name: "AboutView",
  components: {
    BasicWave,
    About
  }
}
</script>