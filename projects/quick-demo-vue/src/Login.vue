<template>
  <div id="login">
    <div class="content-appid">
      <label for="appid">Appid: </label>
      <input
        id="appid"
        type="text"
        v-model="appid"
        placeholder="Please input appid"
      />
    </div>
    <div class="content-channel">
      <label for="channel">Channel: </label>
      <input
        id="channel"
        type="text"
        v-model="channel"
        placeholder="Please input channel"
      />
    </div>

    <div class="content-video-codec">
      <label for="video-codec">video codec: </label>
      <input
        id="video-codec"
        type="text"
        v-model="videoCodec"
        placeholder="Please video codec"
      />
    </div>

    <div class="content-operations">
      <button class="btn btn-primary" @click="join">Join</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  agoraInfo,
  appid,
  channel,
  videoCodec,
  saveVideoCodec,
  saveAppid,
  saveChannel,
} from "./storage";
import { createClient } from "agora-rtc-sdk-ng/esm";

const $emit = defineEmits(["logged"]);

async function join() {
  if (!appid.value || !channel.value) {
    return alert("Please input appid and channel");
  }

  const client = createClient({ mode: "rtc", codec: videoCodec.value });

  await client.join(appid.value, channel.value, null, null);

  agoraInfo.client = client;

  saveAppid();
  saveChannel();
  saveVideoCodec();

  $emit("logged");
}
</script>

<style lang="less">
#login {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  label {
    display: inline-block;
    width: 80px;
  }

  input {
    width: 240px;
  }
}
</style>
