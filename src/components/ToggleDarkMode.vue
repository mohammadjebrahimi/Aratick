<template>
  <q-btn @click="toggleMode" unelevated no-caps class="toggle-dark-mode">
    <div class="row items-center no-wrap">
      <q-icon left :name="modeIcon" />
      <div class="text-center">
        {{ modeTitle }}
      </div>
    </div>
  </q-btn>
</template>
<script setup>

import { computed, ref } from 'vue';
import { useQuasar } from 'quasar'

const $q = useQuasar()

const modeTitle = computed(() => {
  if ($q.dark.isActive) {
    return "Dark Mode"
  }
  return "Light Mode"
})

const modeIcon = computed(() => {
  if ($q.dark.isActive) {
    return "o_dark_mode"
  }
  return "o_light_mode"
})

const toggleMode = () => {
  $q.dark.set(!$q.dark.isActive)
}

</script>
<style>
.toggle-dark-mode {
  width: 10rem;
}
</style>
