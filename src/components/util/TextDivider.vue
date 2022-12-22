<template>
  <div class="text-divider">
    <div style="display: flex; flex-direction: row">
      <div class="text">
        {{ text }}
      </div>
      <div style="flex: auto">

      </div>
    </div>
    <a-divider type="horizontal" class="divider"/>
  </div>
</template>

<script>
export default {
  name: "TextDivider",
  props: {
    'text': {
      type: String,
      required: true
    }
  },
  setup() {
  },
  mounted() {
  }
}
</script>

<style scoped>
.text-divider {
  width: 850px;
  margin-top: 20px;
}

.text {
  color: black;
  font-size: x-large;
  font-family: "Times New Roman",serif;
  /*margin-left: 1%;*/
}

.divider {
  background-color: black;
  width: inherit;
  height: 2px;
  border-radius: 1px;
  padding-left: 2px;
  padding-right: 2px;
  margin-top: 0;
}
</style>