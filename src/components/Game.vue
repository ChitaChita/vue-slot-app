<template>
  <div id="game">
    <Start v-on:slot-start="onStart"></Start>
    <SlotBase v-on:slot-selected-value="inputResult" v-bind:stateflg="this.$store.getters.getStateflg"></SlotBase>
    <SlotBase v-on:slot-selected-value="inputResult" v-bind:stateflg="this.$store.getters.getStateflg"></SlotBase>
    <SlotBase v-on:slot-selected-value="inputResult" v-bind:stateflg="this.$store.getters.getStateflg"></SlotBase>
    <!-- <Modal v-if="this.$store.getters.getModalflg" v-bind:result="result" v-on:close="offModal"></Modal> -->
    <transition name="outcome">
      <Modal v-if="this.$store.getters.getModalflg" @close="offModal" :result="result"></Modal>
    </transition>
  </div>
</template>

<script>
import Start from '@/components/Start.vue'
import SlotBase from '@/components/SlotBase.vue'
import Modal from '@/components/Modal.vue'
export default {
  name: 'game',
  // SlotBaseの戻り値を一時的に保持するために使用する
  data () {
    return {
      result: []
    }
  },
  components: {
    Start,
    SlotBase,
    Modal
  },
  watch: {
    result () {
      // SlotBaseコンポーネントの数を知る
      // let slots = document.querySelectorAll('[id^=slot-value-]')
      let slots = document.querySelectorAll('.slot-view')
      // 全てのSlotBaseコンポーネントが動作完了時に実行する
      if (this.result.length === slots.length) {
        // resultの値をスロット順に入替
        let i = 0
        for (let slotobj of slots) {
          this.result[i] = Number(slotobj.getAttribute("point"))
          i++
        }
        // モーダル表示
        this.onModal()
        this.$store.commit('addResult', {
          result: this.result
        })
        this.offStart()
      }
    }
  },
  created () {
    this.resultMessage = ''
    this.offStart()
    this.result = []
  },
  methods: {
    inputResult (num) {
      this.result.push(num)
    },
    onStart () {
      this.$store.commit('chgStateflg', {
        stateflg: true
      })
    },
    offStart () {
      this.$store.commit('chgStateflg', {
        stateflg: false
      })
    },
    onModal () {
      this.$store.commit('chgModalflg', {
        modalflg: true
      })
    },
    offModal () {
      this.$store.commit('chgModalflg', {
        modalflg: false
      })
      // 一時的に保持している値をリセット
      this.result = []
    }
  }
}
</script>
<style>
.outcome-enter-active {
  animation: bounce-in .5s;
}
.outcome-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
