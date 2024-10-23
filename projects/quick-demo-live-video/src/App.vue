<template>
  <n-notification-provider>
    <n-message-provider>
      <n-modal-provider>
        <LivePlayer />
      </n-modal-provider>
    </n-message-provider>
  </n-notification-provider>
</template>

<script setup lang="ts">
import { NNotificationProvider, NMessageProvider, NModalProvider } from "naive-ui";
import LivePlayer from "./LivePlayer.vue";
</script>

<style lang="less">
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
}
</style>
