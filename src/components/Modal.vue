<template>
  <div class="modal-mask" >
    <div class="modal-wrapper" v-on:click.self="$emit('close')">
      <div class="modal-container">
        {{result.reduce((p, x) => p + x, 0)}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'modal',
  props: {
    'result': {
      type: Array,
      required: true
    }
  }
}
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .5s ease;
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(17, 13, 13, 0.33);
  transition: all .5s ease;
  font-family: Helvetica, Arial, sans-serif;
  color: red;
  font-size: 30px
}
</style>