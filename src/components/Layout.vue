<template>
  <div style="display: flex; flex-direction: column; min-height: 100%">
    <Header/>
    <div style="flex: 1">
      <router-view/>
    </div>
    <Footer style="bottom: 0; width: 100%"/>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "Layout",
  components: {Footer, Header}
}
</script>

<style scoped>

</style>