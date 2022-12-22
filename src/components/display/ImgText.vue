<template>
  <div class="card">
    <img class="image-icon" :src="imageSrc" alt="image.icon">
    <div class="outline">
      <div class="title">
        {{ title }}
      </div>
      <div class="sub-title">
        {{ subTitle }}
      </div>
      <div style="padding-left: 42%">
        <div class="link-echo" @click="$router.push(link)">
          {{ linkEcho }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ImgText",
  data() {
    return {
      linkEcho: 'Try it out',
      bkgColor: 'lightgray'
    }
  },
  props: {
    'imageSrc': {
      type: String,
      required: true,
    },
    'title': {
      type: String,
      required: true,
      default: ''
    },
    'subTitle': {
      type: String,
      required: false,
      default: ''
    },
    'link': {
      type: String,
      required: true,
      default: '/home'
    },
    'arrangement': {
      type: String,
      required: false,
      default: 'row'
    }
  },
  setup() {
  },
  mounted() {
    if (this.arrangement === 'row-reverse') {
      this.bkgColor = 'darkgray';
    }
  }
}
</script>

<style scoped>
.card {
  width: 100%;
  height: 500px;
  background-color: v-bind(bkgColor);
  display: flex;
  flex-direction: v-bind(arrangement);
}

.image-icon {
  width: 55%;
  height: 90%;
  padding-top: 2%;
  padding-left: 2%;
  padding-right: 2%;
}

.outline {
  flex: auto;
  padding-left: 2%;
  padding-right: 2%;
}

.title {
  font-size: 40px;
  font-family: Arial, Helvetica, sans-serif;
  color: black;
  padding-top: 150px;
  padding-bottom: 10px;
}

.sub-title {
  font-size: 20px;
  font-family: "Microsoft JhengHei",serif;
  color: black;
  padding-bottom: 30px;
}

.link-echo {
  font-size: 25px;
  font-family: "Times New Roman", serif;
  text-decoration-line: underline;
  cursor: pointer;
  border: 2px slategray;
  border-radius: 3px;
  background-color: lightgoldenrodyellow;
  width: 120px;
}
</style>