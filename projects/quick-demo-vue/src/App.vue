<template>
  <Login v-if="!isLogged" @logged="isLogged = true"></Login>
  <Meeting v-else @left="isLogged = false"></Meeting>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Login from "./Login.vue";
import Meeting from "./Meeting.vue";

const isLogged = ref(false);
</script>
