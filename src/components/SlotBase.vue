<template>
  <div class="slot-form">
    <!-- <input v-bind:id="slotvalue" class="slot-view" type="img" v-model="value"> -->
    <img class="slot-view" v-bind:id="slotvalue" :src="value" />
    <input class="slot-button" v-bind:disabled="!canStart" type="button" value="STOP" v-on:click="onSelected">
  </div>
</template>

<script>

const ImgNames = [
  require('../assets/bfish.png'),
  require('../assets/cherry.png'),
  require('../assets/red7.png'),
  require('../assets/sacra.png'),
  require('../assets/ybell.png')
]

export default {
  data () {
    return {
      imgPath: '../assets/',
      imgNames: ImgNames,
      value: ImgNames[0], // this.data.imgNames[0]
      valueList: ImgNames,
    canStart: false,
    timer: null
    }
  },
  
  computed: {
    slotvalue () {
      return 'slot-value-' + this._uid
    }
  },
  props: {
    'stateflg': {
      type: Boolean,
      required: true
    }
  },
  watch: {
    // スロット開始フラグを監視、trueならスロット開始！！
    stateflg () {
      if (this.stateflg === true) {
        this.canStart = true
        this.start()
      }
    }
  },
  methods: {
    changeValue (images) {
      if (images && Math.abs(images) <= this.valueList.length) {
        this.value = this.valueList[images]
      } else {
        let img = Math.floor(Math.random() * this.valueList.length)
        this.value = this.valueList[img]
      }
    },
    start () {
      this.timer = setInterval(() => {
        this.changeValue()
      }, (1000 / 12))
    },
    onSelected () {
      // setInterval()でセットしたタイマーを解除する
      clearInterval(this.timer)
      // スロットが終ったら、buttonはdisabledする
      this.canStart = false
      // 親へ値を返す
      this.$emit('slot-selected-value', this.value)
    }
  }
}
</script>

<style>
.slot-form {
  display: inline-block;
  text-align: center;
  margin: 0 auto;
  width: 11em;
  height: 13em;
  border: 1px solid black;
}
.slot-view {
  display: block;
  margin: 20px auto;
  text-align: center;
  font-size: 3em;
  width: 100px;
}
.slot-button {
  display: block;
  margin: 0 auto;
  text-align: center;
  width: 100px;
  background-color: lightblue;
}
.button-disabled {
  pointer-events : none;
  background-color: grey;
}
</style>