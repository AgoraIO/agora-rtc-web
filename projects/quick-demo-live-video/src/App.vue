<template>
  <div id="app">
    <LivePlayer />
  </div>
</template>

<script setup lang="ts">
import LivePlayer from "./LivePlayer.vue";
</script>

<style>
html,
body,
#app {
  width: 100%;
  margin: 0;
  padding: 0;
}
#app {
  display: flex;
  justify-content: center;
  font-family: v-sans, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}
</style>
