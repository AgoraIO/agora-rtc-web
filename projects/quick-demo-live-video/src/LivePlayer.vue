<template>
  <div id="live-player">
    <div class="input-url">
      <n-input v-model:value="options.url" placeholder="请输入RTE链接" clearable />
      <n-button @click="createLivePlayer">创建</n-button>
      <n-button :disabled="!isCreated" @click="switchPlayerUrl">切换链接</n-button>
      <n-button :disabled="!isCreated" @click="switchMediaSource">切换模式</n-button>
      <n-button @click="resetLivePlayer">重置</n-button>
    </div>
    <div class="content">
      <div class="content-left">
        <div class="content-video">
          <video id="remote-video"></video>
        </div>
        <div class="content-operation">
          <n-button v-if="isAutoplayFailed" @click="togglePlayManually" type="warning">
            手动触发播放
          </n-button>
          <n-button
            @click="play"
            :loading="isPending"
            :disabled="!isCreated || isPending || isPlaying"
            type="info"
          >
            播放
          </n-button>
          <template></template>
          <n-button :disabled="!isPlaying" type="info" @click="pause">暂停</n-button>
          <n-button :disabled="isStopped || isPending" type="info" @click="stop">停止</n-button>
          <n-button :disabled="!isCreated" type="info" @click="mute">
            {{ isMuted ? "恢复" : "静音" }}
          </n-button>
          <n-button :disabled="!isCreated" type="info" @click="retry">重试</n-button>
          <n-button :disabled="!isCreated" type="error" @click="destroy">销毁</n-button>
        </div>
      </div>
      <div class="content-right">
        <div class="content-parameters">
          <div class="content-tag">
            <n-tag :type="isRTCSupport ? 'success' : ''" :bordered="false">
              WebRTC {{ isRTCSupport ? "✅" : "❌" }}
            </n-tag>
            <n-tag :type="isHLSSupport ? 'success' : ''" :bordered="false">
              HLS {{ isHLSSupport ? "✅" : "❌" }}
            </n-tag>
            <template v-if="mediaSource === 'rtc'">
              <n-tag v-if="isCreated" type="info" :bordered="false" @click="updateNetworkQuality()">
                网络：{{ networkQuality }}
              </n-tag>
              <n-tag v-if="isCreated && rtcMediaStatus" type="warning" :bordered="false">
                媒体：{{ rtcMediaStatus }}
              </n-tag>
            </template>
          </div>
          <div class="content-shape">
            <n-input-number
              v-model:value="options.width"
              :show-button="false"
              placeholder="视频宽度"
            />
            <n-input-number
              v-model:value="options.height"
              :show-button="false"
              placeholder="视频高度"
            />
          </div>
          <n-select
            placeholder="选择视频模式"
            v-model:value="options.objectFit"
            :options="[
              { label: 'contain', value: 'contain' },
              { label: 'cover', value: 'cover' },
              { label: 'fill', value: 'fill' },
            ]"
          />
          <n-checkbox v-model:checked="options.autoSwitchHLS">自动切换到HLS</n-checkbox>
          <n-checkbox v-model:checked="options.defaultUseHLS">默认使用HLS</n-checkbox>
          <n-checkbox v-model:checked="options.autoplay">自动播放</n-checkbox>
          <n-checkbox v-model:checked="options.mirror">镜像播放</n-checkbox>
        </div>
        <div class="content-stats">
          <div class="content-text-mode">当前模式：{{ mediaSource.toUpperCase() }}</div>
          <template v-if="isCreated && mediaSource === 'rtc'">
            <div>连接状态：{{ rtcConnectionState }}</div>
            <div>频道内用户状态：{{ remoteUserState }}</div>
            <div>主播ID：{{ hostId }}</div>
            <div>主播状态：{{ hostState }}</div>
            <div>主播切换状态：{{ hostChangeState }}</div>
            <div>主播视频状态：{{ hostVideoState }}</div>
            <div>主播音频状态：{{ hostAudioState }}</div>
            <div class="dialog-stats">
              <n-button type="info" dashed @click="showRTCStats" size="tiny">获取统计信息</n-button>
            </div>
          </template>
          <div class="content-model-stats">
            <n-modal
              v-model:show="isRTCStatsVisible"
              class="model-stats"
              preset="card"
              title="RTC 统计信息"
              :onAfterLeave="closeRTCStats"
            >
              <n-data-table
                :columns="[
                  { title: '属性', key: 'key', minWidth: 140 },
                  { title: '音频', key: 'audio', minWidth: 120 },
                  { title: '视频', key: 'video', minWidth: 120 },
                ]"
                :data="rtcMediaStats"
              />
              <template #footer>
                <n-button text tag="a" :href="RTC_AUDIO_STATS_DOC" target="_blank" type="info">
                  音频统计信息文档
                </n-button>
                <n-space />
                <n-button text tag="a" :href="RTC_VIDEO_STATS_DOC" target="_blank" type="info">
                  视频统计信息文档
                </n-button>
              </template>
            </n-modal>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  NInput,
  NInputNumber,
  NButton,
  NCheckbox,
  NModal,
  NSelect,
  NDataTable,
  NTag,
  NSpace,
  useNotification,
} from "naive-ui";
import { h, computed, onBeforeUnmount, reactive, ref } from "vue";
import {
  LivePlayer,
  PlayerEvent,
  RtcSourceState,
  RtcMediaState,
  RtcUserState,
  MediaSource,
  MediaPlayState,
  enableLogUpload,
  enableNewNetworkConfig,
  isHlsSupported,
  isRtcSupported,
  setRTCParameter,
  setParameter,
  type RtcUser,
  type IPlayerOptions,
  type RtcVideoStats,
  type RtcAudioStats,
  type IPlayerError,
  RtcEvent,
} from "agora-fls-sdk";
import { watch } from "vue";

setRTCParameter("ENABLE_INSTANT_VIDEO", true);
setRTCParameter("ENABLE_AUT_CC", true);

setParameter("VIDEO_FROZEN_POINTS", 3);

const RTC_AUDIO_STATS_DOC =
  "https://doc.shengwang.cn/api-ref/rtc/javascript/interfaces/remoteaudiotrackstats";
const RTC_VIDEO_STATS_DOC =
  "https://doc.shengwang.cn/api-ref/rtc/javascript/interfaces/remotevideotrackstats";

enableLogUpload();
enableNewNetworkConfig();

const notification = useNotification();

const appId = "xxxxxxxxxxxxxxxxxxxxxx";

onBeforeUnmount(() => {
  destroy();
});

const rtcConnectionState = ref("");
const hostVideoState = ref("");
const hostAudioState = ref("");
const remoteUserState = ref("");
const hostChangeState = ref("");
const hostState = ref("");
const hostId = ref("");
const mediaSource = ref<MediaSource>(MediaSource.RTC);
const networkQuality = ref("未知");
const rtcMediaStatus = ref("");
const isRTCSupport = isRtcSupported();
const isHLSSupport = isHlsSupported();

const rtcAudioStats = ref<RtcAudioStats | undefined>();
const rtcVideoStats = ref<RtcVideoStats | undefined>();

watch(
  mediaSource,
  (source) => {
    document.title = `FLS 播放器 | ${source.toUpperCase()} 模式`;
  },
  { immediate: true }
);

const rtcMediaStats = computed(() => {
  const statKeys = Object.keys({ ...rtcAudioStats.value, ...rtcVideoStats.value });

  if (statKeys) {
    return statKeys.map((key) => {
      let audio = rtcAudioStats.value?.[key] ?? "-";
      let video = rtcVideoStats.value?.[key] ?? "-";

      if (typeof audio === "number" && String(audio).includes(".")) {
        audio = audio.toFixed(4);
      }
      if (typeof video === "number" && String(video).includes(".")) {
        video = video.toFixed(4);
      }

      return {
        key,
        audio,
        video,
      };
    });
  }

  return [];
});

const playState = ref<MediaPlayState>(MediaPlayState.STOPPED);

const isCreated = ref(false);
const isStopped = computed(() => playState.value === "stopped");
const isPending = computed(() => playState.value === "pending");
const isPaused = computed(() => playState.value === "paused");
const isPlaying = computed(() => playState.value === "playing");

const isAutoplayFailed = ref(false);
const isRTCStatsVisible = ref(false);

let player: LivePlayer | undefined = undefined;
const storedOptions = JSON.parse(localStorage.getItem("__player_options__"));
const defaultOptions: IPlayerOptions = {
  url: `rte://${appId}/an/sn?token=null&uid=${Math.floor(Math.random() * 100000)}`,
  el: "remote-video",
  width: undefined,
  height: undefined,
  aspectRatio: "16/9",
  autoplay: true,
  objectFit: "cover",
  mirror: false,
  defaultUseHLS: false,
  autoSwitchHLS: true,
  hlsConfig: undefined,
};

const options = reactive<IPlayerOptions>(storedOptions || defaultOptions);

function resetLivePlayer() {
  destroy();

  localStorage.removeItem("__player_options__");
  Object.keys(defaultOptions).forEach((key) => {
    options[key] = defaultOptions[key];
  });
}

async function createLivePlayer() {
  console.info("LivePlayer createLivePlayer: ", options);

  player && (await destroy());

  rtcMediaStatus.value = "";

  try {
    player = new LivePlayer({ ...options });
  } catch (error) {
    console.error("LivePlayer createLivePlayer error: ", error);
    notification.error({ title: "创建播放器出错", content: error.message || error.name || error });
    throw error;
  }

  playState.value = player.playState;

  // Player
  player.on(PlayerEvent.AUTOPLAY_PREVENTED, onAutoPlayFailed);
  player.on(PlayerEvent.NETWORK_QUALITY, onNetworkQuality);
  player.on(PlayerEvent.BEFORE_MEDIA_SOURCE_CHANGE, onBeforeMediaSourceChange);
  player.on(PlayerEvent.MEDIA_SOURCE_CHANGED, onMediaSourceChanged);
  player.on(PlayerEvent.PLAY_STATE_CHANGED, onPlayerStateChanged);
  player.on(PlayerEvent.REQUEST_SWITCH_MEDIA_SOURCE, onRequestSwitchMediaSource);

  player.on(PlayerEvent.ERROR, onError);

  // RTC
  player.on(PlayerEvent.RTC_HOST_CHANGED, onRTCHostChanged);
  player.on(PlayerEvent.RTC_USER_STATE_CHANGED, onRTCUserStateChanged);
  player.on(PlayerEvent.RTC_MEDIA_CHANGED, ({ type, state }) => {
    if (type === "video") onRTCVideoStateChanged(state);
    if (type === "audio") onRTCAudioStateChanged(state);
  });

  player.on(PlayerEvent.RTC_SOURCE_STATE_CHANGED, onRTCStateChanged);

  mediaSource.value = player.source.mode;
  isCreated.value = true;

  localStorage.setItem("__player_options__", JSON.stringify(options));
  window["player"] = player;

  player.on(PlayerEvent.RTC_EVENTS, (code: RtcEvent) => {
    switch (code) {
      case RtcEvent.NETWORK_EXCEPTION:
        notification.error({ title: "网络异常，请检查网络连接", duration: 2000 });
        break;
      case RtcEvent.NETWORK_EXCEPTION_RECOVERED:
        notification.info({ title: "网络异常已恢复", duration: 2000 });

        break;
      case RtcEvent.VIDEO_DECODED_FAILED:
        rtcMediaStatus.value = "视频解码失败";
        notification.error({ title: rtcMediaStatus.value, duration: 2000 });
        break;
      case RtcEvent.VIDEO_DECODED_RECOVERED:
        rtcMediaStatus.value = "";
        notification.info({ title: "视频解码失败恢复", duration: 2000 });
        break;
      case RtcEvent.VIDEO_FROZEN:
        rtcMediaStatus.value = "视频发生卡顿";
        notification.error({ title: rtcMediaStatus.value, duration: 2000 });
        break;
      case RtcEvent.VIDEO_FROZEN_RECOVERED:
        rtcMediaStatus.value = "";
        notification.info({ title: "视频卡顿已恢复", duration: 2000 });
        break;
    }
  });
}

async function switchPlayerUrl() {
  if (player) {
    console.info("LivePlayer switchPlayerUrl: target url ", options.url);
    await player.switchURL(options.url);
  }
}

async function togglePlayManually() {
  await play();
  isAutoplayFailed.value = false;
}

async function play() {
  player && (await player.play());
}

async function pause() {
  player && (await player.pause());
}

const isMuted = ref(false);
function mute() {
  isMuted.value = !isMuted.value;
  player && player.setVolume(isMuted.value ? 0 : 1);
}

async function stop() {
  player && (await player.pause(true));
}

async function retry() {
  player && (await player.retry());
}

async function destroy() {
  player && (await player.destroy());
  player = undefined;
  isCreated.value = false;
  isMuted.value = false;

  resetRTCStats();
}

function resetRTCStats() {
  rtcConnectionState.value = "";
  hostVideoState.value = "";
  hostAudioState.value = "";
  remoteUserState.value = "";
  hostChangeState.value = "";
  hostState.value = "";
  hostId.value = "";
  networkQuality.value = "未知";
}

async function switchMediaSource() {
  if (player) {
    const target = mediaSource.value === MediaSource.RTC ? MediaSource.HLS : MediaSource.RTC;
    await player.switchMediaSource(target);
  }
}

const qualities = ["未知", "极好", "良好", "一般", "较差", "很差", "断开"];
function updateNetworkQuality(quality?: 0 | 1 | 2 | 3 | 4 | 5 | 6) {
  if (player && quality == null) {
    quality = player.getNetworkQuality();
    console.info("LivePlayer updateNetworkQuality: ", qualities[quality || 0]);
  }

  networkQuality.value = qualities[quality || 0];
}

let rtcStatsTimer: number | undefined;
function updateRTCStats() {
  const stats = player && player.getStats();
  if (stats) {
    rtcAudioStats.value = stats.audio;
    rtcVideoStats.value = stats.video;
  }
}
function showRTCStats() {
  if (player && mediaSource.value === MediaSource.RTC) {
    rtcStatsTimer && clearInterval(rtcStatsTimer);
    rtcStatsTimer = setInterval(updateRTCStats, 1000);
    updateRTCStats();

    isRTCStatsVisible.value = true;
  }
}

function closeRTCStats() {
  isRTCStatsVisible.value = false;

  rtcStatsTimer && clearInterval(rtcStatsTimer);
  rtcAudioStats.value = undefined;
  rtcVideoStats.value = undefined;
}

function setVolume(value: number) {
  player && player.setVolume(value);
}

// 事件监听
function onBeforeMediaSourceChange(target: MediaSource) {
  console.info("LivePlayer onBeforeMediaSourceChange to ", target);

  notification.info({ title: `当前播放模式即将切换到 ${target}`, duration: 3000 });
}
function onMediaSourceChanged(target: MediaSource) {
  console.info("LivePlayer onMediaSourceChanged to ", target);

  notification.info({ title: `当前播放模式已切换到 ${target}`, duration: 3000 });

  if (target === MediaSource.RTC) {
  }

  if (target === MediaSource.HLS) {
    resetRTCStats();
  }

  mediaSource.value = target;
}

// RTC
function onRTCHostChanged(to?: RtcUser, from?: RtcUser) {
  console.info("LivePlayer onRTCHostChanged: ", from, " => ", to);

  hostChangeState.value = `${from?.uid} => ${to?.uid}`;
  hostId.value = String(to?.uid);
  hostState.value = "changed";
}
function onRTCUserStateChanged(data: {
  user: any;
  state: RtcUserState;
  isHost: boolean;
  mediaType?: "audio" | "video";
}) {
  console.info("LivePlayer onRTCUserStateChanged: ", data);

  remoteUserState.value = `${data.user.uid}:${data.state}`;

  if (data.isHost) {
    hostState.value = data.state + (data.mediaType ? `: ${data.mediaType}` : "");
  }
}
function onRTCVideoStateChanged(state: RtcMediaState) {
  hostVideoState.value = state;
  if (state === RtcMediaState.EMPTY || state === RtcMediaState.STOPPED) {
    rtcMediaStatus.value = "";
  }
}
function onRTCAudioStateChanged(state: RtcMediaState) {
  hostAudioState.value = state;
}
function onRTCStateChanged(state: RtcSourceState) {
  rtcConnectionState.value = state;
}

// Player
function onAutoPlayFailed() {
  notification.error({ title: "自动播放失败，请手动点击播放" });
  isAutoplayFailed.value = true;
}
function onNetworkQuality(quality: 0 | 1 | 2 | 3 | 4 | 5 | 6) {
  updateNetworkQuality(quality);
}
function onRequestSwitchMediaSource(source: MediaSource) {
  console.warn("LivePlayer request switch media source to: ", source);

  if (options.autoSwitchHLS && source === "hls") {
    player && player.switchMediaSource(source);
  } else {
    const nCallback = notification.error({
      title: "发生不可恢复错误",
      content: () =>
        h("div", [
          "播放器请求 ",
          h(
            NButton,
            {
              onClick: () => {
                nCallback.destroy();
                switchMediaSource();
              },
              type: "info",
              text: true,
            },
            "切换"
          ),
          ,
          ` 到${source.toUpperCase()}模式`,
        ]),
    });
  }
}
function onPlayerStateChanged(state: MediaPlayState) {
  console.info("LivePlayer onPlayerStateChanged: ", state);
  playState.value = state;
}
function onError({ error, source }: IPlayerError) {
  console.error("LivePlayer onError: ", error);
  const message =
    error instanceof Error
      ? error.message
      : `[${error.type}] ${error.details} ${error.error.message}`;

  notification.error({
    title: `${source} 模式下错误，请重试`,
    content: message,
  });
}
</script>

<style lang="less">
#live-player {
  max-width: 100%;
  margin-top: 24px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.06);

  .input-url {
    display: flex;
    margin: 12px;
    > .n-input {
      margin-right: 12px;
    }
    > button {
      margin-left: 12px;
    }
  }
  .content {
    margin: 6px 0;
    display: flex;
    flex-wrap: wrap;
    .content-left,
    .content-right {
      display: flex;
      flex-grow: 1;
      flex-direction: column;
      padding: 6px 12px;
      box-sizing: border-box;
      max-width: 100%;
    }
    .content-left {
      .content-video {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 12px;
        border-radius: 4px;
        width: 640px;
        max-width: 100%;
        aspect-ratio: 16/9;
        background-color: #efefef;
        > video {
          border-radius: 4px;
          width: 100%;
        }
      }
      .content-operation {
        display: flex;
        flex-wrap: wrap;
        margin-top: 12px;
        > button {
          margin-left: 12px;
        }
        > button:first-child {
          margin-left: 0 !important;
        }
      }
    }
    .content-right {
      .content-parameters {
        margin-bottom: 6px;
        > .n-input,
        > .n-select,
        > .n-checkbox {
          margin-bottom: 6px;
        }

        > .content-tag {
          margin-bottom: 12px;
          > .n-tag {
            margin-right: 8px;
          }
        }
        > .content-shape {
          display: flex;
          margin-bottom: 6px;
          > .n-input-number {
            flex: 1;
            &:first-child {
              margin-right: 6px;
            }
          }
        }
      }

      .content-stats {
        margin-top: 12px;
        > div {
          display: flex;
          align-items: center;
          margin: 2px 0;
        }
        > .content-text-mode {
          font-weight: bold;
        }
        > .dialog-stats {
          margin-top: 8px;
        }
      }
    }
  }
}

.model-stats {
  max-width: 640px;
  .n-card__footer {
    text-align: right;
    > a {
      margin-right: 12px;
    }
  }
}

@media (max-width: 688px) {
  #live-player {
    margin-top: 0;
    .input-url {
      flex-wrap: wrap;
      > .n-input {
        margin-right: 0;
        flex-shrink: 0;
      }
      > button {
        margin: 12px 12px 0 0 !important;
      }
    }
  }
}
</style>
