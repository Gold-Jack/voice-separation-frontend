<template>
  <div class="timer-main">
    {{ this.time }}
  </div>
</template>

<script>

export default {
  name: "Timer",
  props: {
    'timeSec': {
      type: Number,
      required: true,
      default: 0,
    },
    'fontColor': {
      type: String,
      required: false,
      default: 'black',
    }
  },
  data() {
    return {
      hour: 0,
      minute: 0,
      second: 0,
      time: '',
      DIVIDER: ':',
    }
  },
  watch: {
    timeSec(value) {
      this.refresh();
    }
  },
  mounted() {
    // ~~是取整符
    this.refresh();
  },
  methods: {
    refresh() {
      this.time = '';
      this.hour = ~~(this.timeSec / 3600);
      this.minute = ~~(this.timeSec % 3600 / 60);
      this.second = ~~(this.timeSec % 3600 % 60);

      this.time += this.handleDisplayTime(this.hour, true);
      this.time += this.handleDivider(this.time);
      this.time += this.handleDisplayTime(this.minute);
      this.time += this.handleDivider(this.time);
      this.time += this.handleDisplayTime(this.second);
    },
    handleDisplayTime(timeValue, canBeOmitted=false) {
      let displayTime = '';
      if (canBeOmitted && timeValue === 0)
        return displayTime;
      if (timeValue < 10)
        displayTime = '0' + timeValue;
      else
        displayTime = timeValue;
      return displayTime;
    },
    handleDivider(timeStr) {
      if (timeStr === '')
        return '';
      return this.DIVIDER;
    }
  },
}
</script>

<style scoped>
.timer-main {
  color: v-bind(fontColor);
}

.hour {

}

.minute {

}

.second {

}
</style>