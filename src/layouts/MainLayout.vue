<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class=" header-toolbar q-px-xl  q-py-xs">
      <q-toolbar class="q-pl-none q-pr-none">

        <q-toolbar-title class="text-bold">
          Where in the world?
        </q-toolbar-title>

        <ToggleDarkMode />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import ToggleDarkMode from 'src/components/ToggleDarkMode.vue';


</script>
<style >
body.body--dark {
  background-color: rgb(32,44,55);
}
body.body--dark .header-toolbar {
  background-color: rgb(43, 55, 67);
  color: white;
  border: none;
}

@media only screen and (max-width: 600px) {
  .header-toolbar {
    padding-left: 15px;
    padding-right: 15px;
  }
}

.header-toolbar {
  background-color: white;
  color: black;
  border-bottom: 3px solid rgb(239, 239, 239);
}
</style>

