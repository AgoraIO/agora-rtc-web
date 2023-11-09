<script setup lang="ts">
import { ref } from "vue";

const appName = ref("Web VAD");
</script>

<template>
  <header>{{ appName }}</header>
</template>

<style>
header {
  height: 3rem;
  color: white;
  padding-left: 1.25rem;
  background-color: rgb(82, 82, 82);
  display: flex;
  flex-shrink: 0;
  align-items: center;
}
</style>
