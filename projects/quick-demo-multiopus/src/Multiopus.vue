<template>
  <div id="multiopus">
    <div class="wrapper">
      <div class="content input">
        <div class="input-item">
          <span>当前频道</span>
          <n-input v-model:value="channel" />
        </div>
        <div class="input-item" style="width: 60%">
          <span>多声道音频地址</span>
          <n-input v-model:value="audioURL" />
        </div>
        <div class="input-item">
          <span>音频声道数</span>
          <n-input v-model:value="channelCount" />
        </div>
      </div>
      <div class="content input">
        <div class="input-item">
          <span>选择声道,以逗号(,)隔开(如0,1,2,3,4,5)</span>
          <n-input v-model:value="selectedChannels" />
        </div>
        <n-button type="info" @click="selectChannel('surround')"
          >确定(环绕声)</n-button
        >
        <n-button type="info" @click="selectChannel('stereo')"
          >确定(双声道)</n-button
        >
        <n-button type="info" @click="selectChannel('mono')"
          >确定(单声道)</n-button
        >
      </div>
      <div class="content operation">
        <n-button type="info" @click="joinChannel">加入频道</n-button>
        <n-button type="info" @click="leaveChannel">离开频道</n-button>

        <n-button type="info" @click="publishAudio">发布音频</n-button>
        <n-button type="info" @click="unpublishAudio">取消发布音频</n-button>

        <n-button
          type="success"
          @click="subscribe('audio')"
          :disabled="!isPublished"
        >
          订阅音频
        </n-button>
        <n-button type="info" @click="cancelSubscribe('audio')"
          >取消订阅音频</n-button
        >
      </div>

      <div class="content volumes">
        <div class="outer" v-for="(v, _) in volumes">
          <div class="inner" :style="{ width: `${v * 100}%` }"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AgoraRTC from "agora-rtc-sdk-ng";
import type {
  IAgoraRTCClient,
  IAgoraRTCRemoteUser,
  ILocalAudioTrack,
  IRemoteAudioTrack,
  IRemoteVideoTrack,
} from "agora-rtc-sdk-ng";

import { NButton, NInput } from "naive-ui";
import { ref } from "vue";

import { useNotification } from "naive-ui";

const notification = useNotification();

//@ts-ignore
AgoraRTC.setParameter("ENABLE_MULTIOPUS_CODEC", true);

const APP_ID = "aab8b8f5a8cd4469a63042fcfafe7063";

let client: IAgoraRTCClient | null = null;
const channel = ref(localStorage.getItem("channelName") || "multiopus");
const channelCount = ref("8");
const selectedChannels = ref("0,1,2,3,4,5");

const baseURL = location.href.includes("localhost")
  ? location.origin
  : location.href.split("#")[0];
// const audioURL = ref(`${baseURL}/8_Channel_ID.wav`);
const audioURL = ref(`${baseURL}/8_Channel_ID.wav`);

const isPublished = ref(false);
let publishedUser: IAgoraRTCRemoteUser | undefined;

function selectChannel(mode: "mono" | "stereo" | "surround") {
  if (remoteAudioTrack) {
    const channels = selectedChannels.value.split(",").map((v) => Number(v));

    remoteAudioTrack.selectChannels(channels, mode);
  }
}

async function joinChannel() {
  client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

  await client.join(APP_ID, channel.value, null, null);

  notification.success({ title: "加入成功", duration: 1000 });

  localStorage.setItem("channelName", channel.value);

  client.on("user-joined", (user) => {
    console.warn("user-joined", user);
  });
  client.on("user-left", (user) => {
    console.warn("user-left", user);
  });
  client.on("user-published", (user, mediaType) => {
    console.warn("user-published", user, mediaType);
    isPublished.value = true;
    publishedUser = user;
  });
  client.on("user-unpublished", (user, mediaType) => {
    console.warn("user-unpublished", user, mediaType);
  });
  client.on("user-info-updated", (user, mediaType) => {
    console.warn("user-info-updated", user, mediaType);
  });
}

function leaveChannel() {
  client?.leave();
  client = null;
}

let audioTrack: ILocalAudioTrack;
async function publishAudio() {
  audioTrack = await getAudioTrack();

  client?.publish(audioTrack);
}

function decodeAudioData(buffer: ArrayBuffer) {
  const context = new AudioContext();

  return context.decodeAudioData(buffer);
}

async function createAudioBuffer(source: string) {
  notification.success({ title: "正在加载音频文件", duration: 1000 });
  const res = await fetch(source);
  notification.success({ title: "加载音频文件加载成功", duration: 1000 });

  const arrayBuffer = await res.arrayBuffer();
  const audioBuffer = await decodeAudioData(arrayBuffer);

  return audioBuffer;
}

function getAudioBufferTrack(audioBuffer: AudioBuffer) {
  const context = new AudioContext({
    sampleRate: audioBuffer.sampleRate,
  });

  const streamNode = context.createMediaStreamDestination();

  streamNode.channelCount = audioBuffer.numberOfChannels;
  streamNode.channelCountMode = "explicit";

  function addAudioBuffer() {
    const source = context.createBufferSource();

    source.channelCount = audioBuffer.numberOfChannels;
    source.buffer = audioBuffer;

    source.onended = () => {
      console.warn("audio buffer play end!");
      setTimeout(() => addAudioBuffer(), 1000);
    };

    source.connect(streamNode);
    source.start();
  }

  addAudioBuffer();

  return streamNode.stream.getAudioTracks()[0];
}

async function getAudioTrack() {
  if (!audioURL.value) {
    notification.warning({ title: "没有输入音频链接", duration: 1000 });

    throw new Error("没有输入音频链接");
  }

  return AgoraRTC.createCustomAudioTrack({
    mediaStreamTrack: getAudioBufferTrack(
      await createAudioBuffer(audioURL.value)
    ),
    channelCount: Number(channelCount.value),
  });
}

function unpublishAudio() {
  client?.unpublish(audioTrack);
}

let remoteVideoTrack: IRemoteVideoTrack | null = null;
let remoteAudioTrack: IRemoteAudioTrack | null = null;
let remoteUser: IAgoraRTCRemoteUser;

const volumes = ref<number[]>([]);
let volumeTimer: number = -1;

async function subscribe(kind: "audio") {
  const user = publishedUser || client?.remoteUsers[0];

  if (user) {
    remoteUser = user;

    const track = await client?.subscribe(user, kind);

    if (track && track.trackMediaType === "audio") {
      track.play();
      remoteAudioTrack = track;

      if (volumeTimer) {
        window.clearInterval(volumeTimer);
      }

      volumeTimer = window.setInterval(() => {
        remoteAudioTrack &&
          (volumes.value = remoteAudioTrack.getVolumeLevels());
      }, 300);
    }
  }
}

async function cancelSubscribe(kind: "video" | "audio") {
  if (!client) return;

  const user = client.remoteUsers[0];

  if (user) {
    if (kind === "audio" && remoteAudioTrack) {
      client.unsubscribe(user, "audio");
      remoteAudioTrack = null;

      if (volumeTimer) {
        window.clearInterval(volumeTimer);
      }
    }
    if (kind === "video" && remoteVideoTrack) {
      client.unsubscribe(user, "video");
      remoteVideoTrack = null;
    }
  }
}
</script>

<style lang="less">
#multiopus {
  padding: 12px;
  > .bottom-buttons {
    margin-top: 40px;
    display: flex;
    justify-content: flex-end;
  }
  button {
    margin: 4px;
  }

  .wrapper {
    max-width: 800px;
    .input {
      display: flex;

      .input-item {
        margin-right: 8px;
      }
    }
    .operation {
      margin: 8px;
      padding: 8px;
    }
    .content {
      display: flex;
      align-items: center;
      margin: 8px;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    .volumes {
      .outer {
        margin-top: 6px;
        width: 60%;
        height: 12px;
        background-color: #ccc;
        border-radius: 4px;
        .inner {
          height: 100%;
          background-color: #2080f0;
          border-radius: 4px;
          transition: width 0.2s;
        }
      }
    }
  }
}
</style>
