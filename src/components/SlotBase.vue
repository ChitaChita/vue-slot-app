<template>
  <div class="slot-form">
    <!-- <input v-bind:id="slotvalue" class="slot-view" type="text" v-model="value"> -->
    <transition name="base" v-on:click="$emit('slot-start', true)">
      <img class="slot-view" v-bind:id="slotvalue" :src="value" :point="point" />
    </transition>
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
      imgNames: ImgNames,
      value: ImgNames[0], // this.data.imgNames[0]
      point: 0,
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
    changeValue (imgIndex) {
      if (imgIndex && Math.abs(imgIndex) <= this.valueList.length) {
        this.value = this.valueList[imgIndex]
        this.point = imgIndex
      } else {
        let index = Math.floor(Math.random() * this.valueList.length)
        this.value = this.valueList[index]
        this.point = index
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
  border-radius: 5px;
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
  width: 140px;
  background-color: lightblue;
  position: absolute;
  border-radius: 10px;
}
.button-disabled {
  pointer-events : none;
  background-color: grey;
}
.base-enter-active,
.base-leave-active {
  transition: all 1s;
}
.base-enter,
.base-leave-active {
  opacity: 0;
}
.base-enter {
  transform: translateY(31px);
}
.base-leave-active {
  transform: translateY(-31px);
}

</style>