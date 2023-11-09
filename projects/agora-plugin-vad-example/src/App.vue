<template>
  <app-header />

  <main>
    <div>
      <div>isSpeaking: {{ isSpeaking }}</div>
      <div>
        Speaking Prob:
        {{ speakingProb.toFixed(4).padStart(7, "0") }} %
      </div>
      <div>isTrackCreated: {{ isTrackCreated }}</div>
      <div>isPluginCreated: {{ isPluginCreated }}</div>
    </div>

    <div class="operate-content">
      <ElButton class="operate-item" @click="startVAD" type="success"
        >Start VAD</ElButton
      >

      <ElButton
        class="operate-item"
        v-if="!isCreateHidden && !isTrackCreated"
        @click="createTrack"
        type="primary"
        >Create Track</ElButton
      >

      <ElButton
        class="operate-item"
        v-if="!isCreateHidden && !isPluginCreated"
        @click="createPlugin"
        type="primary"
        >Create Plugin</ElButton
      >
      <ElButton
        class="operate-item"
        v-if="!isDestroyHidden"
        @click="destroy"
        type="primary"
        >Destroy</ElButton
      >
      <ElButton
        class="operate-item"
        v-if="!isJoinHidden"
        @click="join"
        type="primary"
        >Join</ElButton
      >
      <ElButton
        class="operate-item"
        v-if="!isLeaveHidden"
        @click="leave"
        type="primary"
        >Leave</ElButton
      >
      <ElButton
        class="operate-item"
        v-if="!isPipeHidden"
        @click="pipe"
        type="primary"
        >Pipe</ElButton
      >
      <ElButton
        class="operate-item"
        v-if="!isUnPipeHidden"
        @click="unPipe"
        type="primary"
        >UnPipe</ElButton
      >
      <ElButton
        class="operate-item"
        v-if="!isPublishHidden"
        @click="publish"
        type="primary"
        >Publish</ElButton
      >
      <ElButton
        class="operate-item"
        v-if="!isUnPublishHidden"
        @click="unPublish"
        type="primary"
        >UnPublish</ElButton
      >
      <ElButton
        class="operate-item"
        v-if="!isEnableHidden"
        @click="enable"
        type="primary"
        >Enable</ElButton
      >
      <ElButton
        class="operate-item"
        v-if="!isDisableHidden"
        @click="disable"
        type="primary"
        >Disable</ElButton
      >
      <ElButton
        class="operate-item"
        v-if="!isDumpHidden"
        @click="dump"
        type="primary"
        >Dump</ElButton
      >
    </div>

    <AppChart ref="vadChartElem" />
  </main>

  <app-footer />
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ElButton } from "element-plus";
import {
  createClient,
  createMicrophoneAudioTrack,
  registerExtensions,
  onAutoplayFailed,
} from "agora-rtc-sdk-ng/esm";
import type {
  IAgoraRTCClient,
  IAgoraRTCRemoteUser,
  IMicrophoneAudioTrack,
  UID,
} from "agora-rtc-sdk-ng/esm";
import { VADExtension, type IVADProcessor } from "agora-extension-vad";

import AppHeader from "./AppHeader.vue";
import AppFooter from "./AppFooter.vue";
import AppChart from "./AppChart.vue";

const vadChartElem = ref<typeof AppChart>();

const appId = ref("");
const token = ref("");
const channel = ref("");
const userId = ref<UID>("");

const isSpeaking = ref(false);
const speakingProb = ref(0);
const isTrackCreated = ref(false);
const isPluginCreated = ref(false);

onMounted(() => {
  onAutoplayFailed(() => {
    alert("click to start autoplay!");
  });
});

const isCreateHidden = ref(false);
const isDestroyHidden = ref(false);
const isJoinHidden = ref(true);
const isLeaveHidden = ref(true);
const isPipeHidden = ref(false);
const isUnPipeHidden = ref(false);
const isPublishHidden = ref(true);
const isUnPublishHidden = ref(true);
const isEnableHidden = ref(false);
const isDisableHidden = ref(false);
const isDumpHidden = ref(true);

let audioTrack: IMicrophoneAudioTrack | null = null;
let processor: IVADProcessor | null = null;

const client: IAgoraRTCClient = createClient({ mode: "rtc", codec: "vp8" });
const extension = new VADExtension({
  assetsPath: "./",
  fetchOptions: { cache: "no-cache" },
});

async function createTrack() {
  audioTrack = await createMicrophoneAudioTrack();

  isTrackCreated.value = true;
}

async function createPlugin() {
  registerExtensions([extension]);

  if (extension.checkCompatibility()) {
    processor = extension.createProcessor();
  }

  isPluginCreated.value = true;
}

async function startVAD() {
  await createTrack();
  await createPlugin();
  await pipe();
}

async function destroy() {
  if (processor) {
    disable();
    await unPipe();
    await processor.destroy();

    processor = null;
  }

  isPluginCreated.value = false;

  if (audioTrack) {
    audioTrack.stop();
    audioTrack.close();
    audioTrack = null;

    isTrackCreated.value = false;
  }
}

async function join() {
  if (!client) return;

  client.on("user-published", subscribe);
  client.on("user-unpublished", unsubscribe);
  userId.value = await client.join(
    appId.value,
    channel.value,
    token.value || null,
    userId.value || null
  );

  isJoinHidden.value = true;
  isLeaveHidden.value = false;
}

async function leave() {
  if (client) {
    if (audioTrack) await client.unpublish(audioTrack);

    await unPipe();

    client.off("user-published", subscribe);
    client.off("user-unpublished", unsubscribe);

    await client.leave();

    await destroy();
  }

  isJoinHidden.value = false;
  isLeaveHidden.value = true;
}

async function pipe() {
  try {
    if (processor) {
      processor.on("pipeerror", handlePipeError);
      processor.on("overload", handleOverload);
      processor.on("dump", handleDump);
      processor.on("result", handleResult);

      audioTrack &&
        audioTrack.pipe(processor).pipe(audioTrack.processorDestination);
    }
  } catch (error) {
    console.error(error);
  }
}

async function unPipe() {
  try {
    if (processor) {
      processor.off("pipeerror", handlePipeError);
      processor.off("overload", handleOverload);
      processor.off("dump", handleDump);
      processor.off("result", handleResult);

      processor.unpipe();

      audioTrack && audioTrack.unpipe();
      audioTrack && audioTrack.pipe(audioTrack.processorDestination);
    }
  } catch (error) {
    console.error(error);
  }
}

async function publish() {
  if (client && audioTrack) {
    await client.publish(audioTrack);
  }
}

async function unPublish() {
  if (client && audioTrack) {
    await client.unpublish(audioTrack);
  }
}

function enable() {
  processor && processor.enable();
}

function disable() {
  processor && processor.disable();
}

function dump() {
  processor && processor.dump();
}

async function subscribe(
  user: IAgoraRTCRemoteUser,
  mediaType: "audio" | "video"
) {
  if (client) {
    await client.subscribe(user, mediaType);
    if (mediaType === "audio") {
      user.audioTrack?.play();
    }
  }
}

async function unsubscribe(
  user: IAgoraRTCRemoteUser,
  mediaType: "audio" | "video"
) {
  if (client) {
    if (mediaType === "audio") {
      user.audioTrack?.stop();
    }
    await client.unsubscribe(user, mediaType);
  }
}

async function handlePipeError(error: Error) {
  console.error(error);
  await unPipe();
}

async function handleOverload() {
  console.error("processor may overload");
}

function handleDump(blob: Blob, name: string) {
  const a = document.createElement("a");
  const url = URL.createObjectURL(blob);
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 0);
}

function handleResult(result: any) {
  if (result && vadChartElem.value) {
    speakingProb.value = (result.voiceProb || 0) * 100;
    isSpeaking.value = speakingProb.value > 99;

    vadChartElem.value.addData(result.voiceProb * 100);
  }
}
</script>

<style lang="less">
main {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;

  .input-content,
  .operate-content {
    width: 80%;
    max-width: 1500px !important;
  }
  .input-content {
    margin-top: 1rem;
    display: flex;
    justify-content: center;
    .input-item {
      margin: 0.1rem 1rem;
      width: 25%;
      .tips {
        margin-top: 0.25rem;
        margin-bottom: 0.25rem;
        font-size: 0.75rem;
        color: rgb(82, 82, 82);
      }

      &:first-child {
        margin-left: 0;
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }
  .operate-content {
    display: flex;
    justify-content: center;
    margin-top: 0.75rem;
    text-align: left;
    flex-wrap: wrap;

    .operate-item {
      margin: 0 0.5rem 0.5rem 0 !important;
    }
  }
}

@media (max-width: 768px) {
  main {
    .input-content,
    .operate-content {
      width: 90%;
    }
    .input-content {
      flex-direction: column;

      .input-item {
        width: 100%;

        margin-left: 0 !important;
        margin-right: 0 !important;
      }
    }
  }
}
</style>
