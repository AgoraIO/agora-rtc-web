<template>
  <div id="rtc-player">
    <div class="left-side">
      <div class="content">
        <label>RTE URL:</label>
        <el-input v-model="playerOptions.url" />
      </div>

      <div class="content">
        <div class="input-item">
          <span>Default CDN URL: </span>
          <el-input v-model="cdnDomain" />
        </div>
        <div class="input-item">
          <span>Video Config: </span>
          <el-input-number v-model="playerOptions.width" placeholder="Width" />
          <el-input-number
            v-model="playerOptions.height"
            placeholder="Height"
          />
          <el-select
            placeholder="Display Mode"
            v-model="playerOptions.objectFit"
          >
            <el-option
              v-for="item in [
                { label: 'contain', value: 'contain' },
                { label: 'cover', value: 'cover' },
                { label: 'fill', value: 'fill' },
              ]"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="input-item">
          <el-checkbox v-model="playerOptions.autoSwitchHLS"
            >Auto switch to HLS</el-checkbox
          >
          <el-checkbox v-model="playerOptions.defaultUseHLS"
            >Using HLS as default</el-checkbox
          >
          <el-checkbox v-model="playerOptions.autoplay">Autoplay</el-checkbox>
          <el-checkbox v-model="playerOptions.mirror">Mirror</el-checkbox>
        </div>
      </div>
      <div class="content buttons">
        <el-button @click="clearLocalStorage" type="danger"
          >Refresh (Clear Cache)</el-button
        >
      </div>
      <div class="content buttons">
        <el-button
          @click="createLiveVideo"
          :type="connectionState === 'connected' ? 'success' : 'default'"
        >
          Create Player
        </el-button>
        <el-button v-if="isAutoplayFailed" @click="manualPlay"
          >Toggle Play Manual</el-button
        >
        <el-button
          @click="play"
          :loading="isPending"
          :type="isPlaying ? 'success' : 'default'"
        >
          PLAY
        </el-button>
        <el-button @click="pause" :type="isPaused ? 'success' : 'default'"
          >PAUSE</el-button
        >
        <el-button @click="stop" :type="isStopped ? 'success' : 'default'"
          >STOP</el-button
        >
        <el-button @click="retry">RETRY</el-button>
        <el-button @click="switchLink">SWITCH URL</el-button>
        <el-button @click="destroyPlayer" type="error">DESTROY</el-button>
      </div>
      <div class="buttons">
        <el-button
          @click="switchToHLS"
          :type="mediaSource === 'rtc' ? 'default' : 'success'"
        >
          SWITCH TO HLS
        </el-button>
        <el-button
          @click="switchToRTC"
          :type="mediaSource === 'hls' ? 'default' : 'success'"
        >
          SWITCH TO RTC
        </el-button>
      </div>
    </div>
    <div class="right-side">
      <video id="remote-video"></video>
      <div class="states">
        <template v-if="mediaSource === 'rtc'">
          STATE: {{ connectionState }}
          <br />
          <hr />
          HOST VIDEO STATE: {{ remoteVideoState }}
          <br />
          HOST AUDIO STATE: {{ remoteAudioState }}
          <br />
          USER STATE: {{ remoteUserState }}
          <br />
          <hr />
          HOST ID: {{ hostId }}
          <br />
          HOST CHANGE LOGS: {{ hostChangeState }}
          <br />
          HOST STATE: {{ hostUserState }}
          <br />
          <hr />
        </template>
        <template v-else>
          <p>Current mode: HLS</p>
        </template>

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
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, reactive, ref, watch } from "vue";
import {
  LivePlayer,
  PlayerEvent,
  RtcSourceState,
  RtcMediaState,
  RtcUserState,
  enableLogUpload,
  setParameters,
  getParameters,
  MediaSource,
  IPlayerOptions,
  enableNewNetworkConfig,
} from "agora-fls-sdk";
import { Notification } from "element-ui";

// you can apply appid/token follow the guide https://www.agora.io/en/blog/how-to-get-started-with-agora/
const appId = "xxxxxxxxxxx";
const token = "xxxxxxxxxxx";

enableLogUpload();
enableNewNetworkConfig();

const cdnDomain = ref(getParameters("CDN_DOMAIN"));

watch(cdnDomain, (value) => {
  setParameters("CDN_DOMAIN", value);
});

const connectionState = ref("");
const remoteVideoState = ref("");
const remoteAudioState = ref("");
const remoteUserState = ref("");

const hostChangeState = ref("");
const hostUserState = ref("");
const hostId = ref("");

const mediaSource = ref("rtc");

const playState = ref("stopped");

const isStopped = computed(() => playState.value === "stopped");
const isPending = computed(() => playState.value === "pending");
const isPaused = computed(() => playState.value === "paused");
const isPlaying = computed(() => playState.value === "playing");

const isAutoplayFailed = ref(false);

const volume = ref(0);
const maxVolume = ref(100);

let player: LivePlayer | undefined = undefined;

const cachedOptions = localStorage.getItem("__player_options__");

const prevOptions = cachedOptions ? JSON.parse(cachedOptions) : null;

const playerOptions = reactive<IPlayerOptions>(
  prevOptions || {
    url: `rte://${appId}/appname/stream_name?token=${token}&uid=${Math.floor(
      Math.random() * 100000
    )}`,
    el: "remote-video",
    width: undefined,
    height: undefined,
    aspectRatio: "16/9",
    autoplay: true,
    mirror: false,
    defaultUseHLS: false,
    autoSwitchHLS: true,
    hlsConfig: {
      debug: true,
      enableWorker: true,
      lowLatencyMode: true,
    },
  }
);

function clearLocalStorage() {
  localStorage.removeItem("__player_options__");

  setTimeout(() => location.reload());
}

function destroyPlayer() {
  if (player) {
    player.destroy();
    player = undefined;
  }
}

async function createLiveVideo() {
  console.warn("createLiveVideo: ", playerOptions);

  if (player) {
    await player.destroy();
  }

  try {
    player = new LivePlayer({ ...playerOptions });
  } catch (error) {
    console.error("createLiveVideo error: ", error);
    alert(`createLiveVideo error: ${error}`);

    return;
  }

  mediaSource.value = player.source.mode;

  player.on(PlayerEvent.ERROR, onError);
  player.on(PlayerEvent.AUTOPLAY_PREVENTED, onAutoplayFailed);
  player.on(PlayerEvent.RTC_SOURCE_STATE_CHANGED, onStateChanged);
  player.on(PlayerEvent.RTC_MEDIA_CHANGED, ({ type, state }: any) => {
    if (type === "audio") {
      onAudioStateChanged(state);
    } else {
      onVideoStateChanged(state);
    }
  });

  player.on(PlayerEvent.MEDIA_SOURCE_CHANGED, (source: MediaSource) => {
    Notification({
      type: "info",
      title: "Media Source Changed",
      message: `Change to ${source}`,
      duration: 3000,
    });

    mediaSource.value = source;
    if (source === "hls") {
      connectionState.value = "";
      remoteVideoState.value = "empty";
      remoteAudioState.value = "empty";
      remoteUserState.value = "";

      hostChangeState.value = "";
      hostUserState.value = "";
      hostId.value = "";

      detectVolume();
    }
  });

  player.on(PlayerEvent.RTC_USER_STATE_CHANGED, onUserStateChanged);
  player.on(PlayerEvent.RTC_HOST_CHANGED, onHostChanged);

  player.on(PlayerEvent.REQUEST_SWITCH_MEDIA_SOURCE, (source: MediaSource) => {
    console.warn("request switch media source to: ", source);

    if (playerOptions.autoSwitchHLS && source === "hls") {
      player && player.switchMediaSource(source);
    } else {
      Notification({
        type: "warning",
        title: "player error",
        message: `unrecoverable error at ${
          source === MediaSource.HLS ? "RTC" : "HLS"
        } mode, please switch to ${source} mode`,
        duration: 3000,
      });
    }
  });

  player.on(PlayerEvent.PLAY_STATE_CHANGED, (state: string) => {
    console.warn("play state changed: ", state);
    playState.value = state;
  });

  //@ts-ignore
  window["player"] = player;

  localStorage.setItem("__player_options__", JSON.stringify(playerOptions));

  detectVolume();
}

async function manualPlay() {
  isAutoplayFailed.value = false;
  await play();
}

async function play() {
  if (!player) return;

  await player.play();
}

async function pause() {
  if (!player) return;

  await player.pause();
}

async function stop() {
  if (!player) return;

  await player.pause(true);
}

async function retry() {
  if (!player) return;

  await player.retry();
}

async function switchLink() {
  if (!player) return;

  await player.switchURL(playerOptions.url);
}

function switchToHLS() {
  if (player) {
    player.switchMediaSource(MediaSource.HLS);
  }
}

function switchToRTC() {
  if (player) {
    player.switchMediaSource(MediaSource.RTC);
  }
}

onBeforeUnmount(() => {
  if (player) {
    player.destroy();
  }
});

function onHostChanged(to: any, from: any) {
  console.warn("onHostChanged: ", to, from);

  hostChangeState.value = `${from?.uid} => ${to?.uid}`;

  hostId.value = String(to?.uid);
  hostUserState.value = "changed";
}

function onUserStateChanged(data: {
  user: any;
  state: RtcUserState;
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

let volumeTimer: number | null;

function detectVolume() {
  if (volumeTimer) {
    stopDetectVolume();
  }

  volumeTimer = window.setInterval(() => {
    if (player) {
      volume.value = player.getVolume() * 100;
    }
  }, 300);
}

function stopDetectVolume() {
  volumeTimer && clearInterval(volumeTimer);
  volumeTimer = null;
}

function onVideoStateChanged(state: RtcMediaState) {
  console.warn("onVideoStateChanged: ", state);

  remoteVideoState.value = state;
}

function onAudioStateChanged(state: RtcMediaState) {
  console.warn("onAudioStateChanged: ", state);

  remoteAudioState.value = state;
}

function onStateChanged(state: RtcSourceState) {
  console.warn("onStateChanged: ", state);

  connectionState.value = state;
}

function onError(error: Error) {
  console.warn("onError: ", error);
  Notification({
    type: "error",
    title: "Error, please retry!",
    message: JSON.stringify(error),
  });
}

function onAutoplayFailed() {
  Notification({
    type: "error",
    title: "auto play failed!",
    message: "please click Toggle Play Manual",
  });
  isAutoplayFailed.value = true;
}
</script>

<style lang="less">
#rtc-player {
  display: flex;
  flex-direction: column;

  .left-side {
    margin: 10px;
    padding: 10px;
    max-width: 800px;

    .buttons {
      margin-top: 20px;
      > button {
        margin-right: 20px;
      }
    }
  }

  .right-side {
    display: flex;
    margin: 10px;
    padding: 10px;
    flex-wrap: wrap;
    .waiting {
      margin: 10px;
      padding: 10px;
      display: flex;
    }
    video {
      min-height: 300px;
      max-width: 100%;
      margin-right: 10px;
      border-radius: 4px;
      aspect-ratio: 16/9;

      background-color: #717681;
    }

    .states {
      min-width: 400px;
      margin: 0 10px;
      padding: 10px;
      border-radius: 4px;
      color: #333;
      background-color: #efefef;
    }

    .volume {
      margin-top: 26px;
      width: 200px;
      height: 12px;
      border-radius: 6px;
      background-color: #bbbbbb;
      .inner {
        height: 100%;
        background-color: #079eff;
        border-radius: 6px;
        transition: width ease-in-out 250ms;
      }
    }

    .volume-input {
      margin-top: 24px;
      width: 200px;
      height: 12px;
      border-radius: 6px;
      .rang-input {
        width: 100%;
        margin: 0;
        padding: 0;
      }

      [type="range"] {
        appearance: none;
        margin: 0;
        border: none;
        background-color: transparent;
      }
      [type="range"]::-webkit-slider-runnable-track {
        height: 4px;
        background: #bbbbbb;
      }
      [type="range" i]::-webkit-slider-container {
        height: 20px;
        overflow: hidden;
      }
      [type="range"]::-webkit-slider-thumb {
        appearance: none;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: #079eff;
        border: 1px solid transparent;
        margin-top: -8px;
        border-image: linear-gradient(#079eff, #079eff) 0 fill / 8 20 8 0 / 0px
          0px 0 2000px;
      }
    }
  }

  .content {
    margin: 8px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;

    .input-item {
      display: flex;
      align-items: center;
      margin: 4px 0 10px 0;
      flex-wrap: wrap;
    }
    .el-input,
    .el-select {
      min-width: 200px;
    }
    .el-button {
      margin-bottom: 8px;
    }
  }
}
</style>
