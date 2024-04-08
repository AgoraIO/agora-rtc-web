## Install

Install `agora-fls-sdk` by `pnpm`

```bash
pnpm add agora-fls-sdk
```

前置准备

```ts
import {
  LivePlayer,
  PlayerEvent,
  RtcSourceState,
  RtcMediaState,
  RtcUserState,
  MediaSource,
  IPlayerOptions,
  setRTCParameters,
  // enableLogUpload,
  // enableNewNetworkConfig,
} from "agora-fls-sdk";

// enableLogUpload();
// enableNewNetworkConfig();
```

1. 准备 `<video/>` 标签用于渲染视频

```html
<video id="remote-video"></video>
```

2. 创建播放器

```ts
const appId = "xxxxxxxxxxxxxxxxxxxxxx";
const token = "xxxxxxxxxxxxxxxxxxxxxx";

const playerOptions = {
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
const player = new LivePlayer({ ...playerOptions });
```

3. 事件监听

```ts
player.on(PlayerEvent.ERROR, (error) => {
  console.info("error: ", error, ", please retry!");
});
player.on(PlayerEvent.AUTOPLAY_PREVENTED, () => {
  console.info("autoplay failed, please toggle play manually");
});
player.on(PlayerEvent.MEDIA_SOURCE_CHANGED, (source: MediaSource) => {
  console.info("media source change to: ", source);
});

player.on(PlayerEvent.REQUEST_SWITCH_MEDIA_SOURCE, (source: MediaSource) => {
  console.info("request switch media source to: ", source);
});

player.on(PlayerEvent.PLAY_STATE_CHANGED, (state: string) => {
  console.info("play state change to: ", state);
});
```

4. 操作播放器

```ts
async function play() {
  await player.play();
}

async function pause() {
  await player.pause();
}

async function stop() {
  await player.pause(true);
}

async function retry() {
  await player.retry();
}

async function switchLink(newURL: string) {
  await player.switchURL(newURL);
}

function switchToHLS() {
  await player.switchMediaSource(MediaSource.HLS);
}

function switchToRTC() {
  await player.switchMediaSource(MediaSource.RTC);
}

function destroy() {
  await player.destroy();
}
```
