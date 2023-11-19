<template>
  <div class="loading" v-if="loading">
    <q-spinner-cube class="loading-spinner" color="orange" size="5.5em" />
  </div>
</template>
<script setup>
defineProps({
  loading: Boolean
})

</script>
<style>
.loading {
  position: fixed;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  background: black;
  top: 0%;
  display: flex;
}

.loading-spinner {
  margin: auto;
}
</style>
