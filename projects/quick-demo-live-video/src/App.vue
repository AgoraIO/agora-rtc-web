<template>
  <div class="left-side">
    <h3>Please input the URL</h3>
    <input v-model="url" />
    <div class="buttons">
      <button
        @click="createLiveVideo"
        :class="{ 'button-on': connectionState === 'connected' }"
      >
        CREATE LIVE VIDEO
      </button>
      <button v-if="isAutoplayFailed" @click="manualPlay">MANUAL PLAY</button>
      <button @click="play">PLAY</button>
      <button @click="pause" :class="{ 'button-on': isPaused }">PAUSE</button>
      <button @click="stop" :class="{ 'button-on': isStopped }">STOP</button>
      <button @click="retry">RETRY</button>
      <button @click="switchLink">SWITCH URL</button>
    </div>
  </div>
  <div class="right-side">
    <video id="remote-video"></video>

    <div class="states">
      connection state: {{ connectionState }} <br />
      <hr />
      remote video state: {{ remoteVideoState }} <br />
      remote audio state: {{ remoteAudioState }} <br />
      remote user state: {{ remoteUserState }} <br />
      <hr />
      host id: {{ hostId }} <br />
      host change state: {{ hostChangeState }} <br />
      host state: {{ hostUserState }} <br />

      <div class="volume">
        <div class="inner" :style="{ width: `${volume}%` }"></div>
      </div>
      <div class="volume-input">
        <input
          class="rang-input"
          type="range"
          max="100"
          min="0"
          v-model="maxVolume"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from "vue";
import {
  LiveVideoPlayer,
  LiveVideoEvent,
  LiveVideoState,
  MediaState,
  UserState,
} from "@agora-rtc/live-video";
import type { IAgoraRTCRemoteUser } from "agora-rtc-sdk-ng";

const url = ref(
  localStorage.getItem("url") ||
    // you can apply appid follow the guide https://www.agora.io/en/blog/how-to-get-started-with-agora/
    "rte://*******appid*******/appname/stream_name?token=null&uid=null"
);

const connectionState = ref("");
const remoteVideoState = ref("");
const remoteAudioState = ref("");
const remoteUserState = ref("");

const hostChangeState = ref("");
const hostUserState = ref("");
const hostId = ref("");

const isPaused = ref(false);
const isStopped = ref(false);
const isWaiting = ref(false);

const isAutoplayFailed = ref(false);

const volume = ref(0);
const maxVolume = ref(100);

let player: LiveVideoPlayer;

function createLiveVideo() {
  player = new LiveVideoPlayer({
    url: url.value,
    id: "remote-video",
  });

  player.on(LiveVideoEvent.ERROR, onError);
  player.on(LiveVideoEvent.AUTOPLAY_PREVENTED, onAutoplayFailed);
  player.on(LiveVideoEvent.STATE_CHANGED, onStateChanged);
  player.on(LiveVideoEvent.AUDIO_STATE_CHANGED, onAudioStateChanged);
  player.on(LiveVideoEvent.VIDEO_STATE_CHANGED, onVideoStateChanged);
  player.on(LiveVideoEvent.USER_STATE_CHANGED, onUserStateChanged);
  player.on(LiveVideoEvent.HOST_CHANGED, onHostChanged);

  window["player"] = player;

  localStorage.setItem("url", url.value);
}

async function manualPlay() {
  isAutoplayFailed.value = false;
  await play();
}

async function play() {
  console.time("TIME:PLAY");
  isWaiting.value = true;

  await player.play().finally(() => (isWaiting.value = false));

  isPaused.value = false;
  isStopped.value = false;
  console.timeEnd("TIME:PLAY");
}

async function pause() {
  if (!player) return;
  console.time("TIME:PAUSE");
  await player.pause();
  isPaused.value = true;
  console.timeEnd("TIME:PAUSE");
}

async function stop() {
  if (!player) return;

  console.time("TIME:STOP");
  await player.pause(true);
  isStopped.value = true;
  console.timeEnd("TIME:STOP");
}

async function retry() {
  if (!player) return;

  console.time("TIME:RETRY");
  await player.retry();
  console.timeEnd("TIME:RETRY");
}

async function switchLink() {
  if (!player) return;

  console.time("TIME:SWITCH");
  await player.switchURL(url.value);
  console.timeEnd("TIME:SWITCH");
}

onBeforeUnmount(() => {
  if (player) {
    player.destroy();
  }
});

function onHostChanged(prev: IAgoraRTCRemoteUser, next: IAgoraRTCRemoteUser) {
  console.warn("onHostChanged: ", prev, next);

  hostChangeState.value = `${prev?.uid} => ${next?.uid}`;

  hostId.value = String(next?.uid);
  hostUserState.value = "changed";
}

function onUserStateChanged(data: {
  user: IAgoraRTCRemoteUser;
  state: UserState;
  isHost: boolean;
  mediaType?: "audio" | "video";
}) {
  console.warn("onUserStateChanged: ", data);

  remoteUserState.value = `${data.user.uid}:${data.state}`;

  if (data.isHost) {
    hostUserState.value =
      data.state + (data.mediaType ? `:${data.mediaType}` : "");

    if (data.mediaType === "audio") {
      if (data.state === "published") {
        detectVolume();
      } else {
        stopDetectVolume();
      }
    }
  }
}

watch(maxVolume, (value) => {
  player && player.setVolume(value / 100);
});

let volumeTimer: number;

function detectVolume() {
  if (volumeTimer) {
    stopDetectVolume();
  }

  volumeTimer = setInterval(() => {
    if (player) {
      volume.value = player.getVolume() * 100;
    }
  }, 300);
}

function stopDetectVolume() {
  clearInterval(volumeTimer);
  volumeTimer = null;
}

function onVideoStateChanged(state: MediaState) {
  console.warn("onVideoStateChanged: ", state);

  remoteVideoState.value = state;
}

function onAudioStateChanged(state: MediaState) {
  console.warn("onAudioStateChanged: ", state);

  remoteAudioState.value = state;
}

function onStateChanged(state: LiveVideoState) {
  console.warn("onStateChanged: ", state);

  connectionState.value = state;
}

function onError(error: Error) {
  console.warn("onError: ", error);
  alert(`onError: ${JSON.stringify(error)}`);
}

function onAutoplayFailed() {
  console.warn("onAutoplayFailed");
  isAutoplayFailed.value = true;
}
</script>

<style></style>
