## Install

Install `agora-fls-sdk` by `npm` , `yarn` or `pnpm`

```bash
npm i agora-fls-sdk
yarn add agora-fls-sdk
pnpm add agora-fls-sdk
```

Import necessary dependencies

```ts
import {
  LivePlayer,
  PlayerEvent,
  RtcSourceState,
  RtcMediaState,
  RtcUserState,
  setParameters,
  getParameters,
  MediaSource,
  MediaPlayState,
  IPlayerOptions,
  setRTCParameters,
  isRtcSupported,
  isHlsSupported,
  type IPlayerOptions,
  type IPlayerError,
  // enableLogUpload,
  // enableNewNetworkConfig,
} from "agora-fls-sdk";

// enableLogUpload();
// enableNewNetworkConfig();

console.info(`WebRTC: ${isRtcSupported()}, HLS: ${isHlsSupported()}`);
```

1. Prepare `<video/>` for video rendering

```html
<video id="remote-video"></video>
```

2. Create Live Player

```ts
const appId = "xxxxxxxxxxxxxxxxxxxxxx";
const token = "xxxxxxxxxxxxxxxxxxxxxx";

const rteURL = `rte://${appId}/appname/stream_name?token=${token}&uid=123456`
const playerOptions: IPlayerOptions = {
    url: rteURL,
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

3. Event Listen

```ts
player.on(PlayerEvent.ERROR, ({ error, source }: IPlayerError) => {
  console.info("error: ", error, `at ${source} mode, please retry!`);
});
player.on(PlayerEvent.AUTOPLAY_PREVENTED, () => {
  console.info("autoplay failed, please toggle play manually");
});
player.on(PlayerEvent.BEFORE_MEDIA_SOURCE_CHANGE, (source: MediaSource) => {
  console.info("media source will change to: ", source);
});
player.on(PlayerEvent.MEDIA_SOURCE_CHANGED, (source: MediaSource) => {
  console.info("media source changed to: ", source);
});

player.on(PlayerEvent.REQUEST_SWITCH_MEDIA_SOURCE, (source: MediaSource) => {
  console.info("request switch media source to: ", source);
});

player.on(PlayerEvent.PLAY_STATE_CHANGED, (state: MediaPlayState) => {
  console.info("play state change to: ", state);
});
```

1. Operate Player

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

async function switchURL(newURL: string) {
  await player.switchURL(newURL);
}

async function switchToHLS() {
  await player.switchMediaSource(MediaSource.HLS);
}

async function switchToRTC() {
  await player.switchMediaSource(MediaSource.RTC);
}

async function destroy() {
  await player.destroy();
}
```

## Changelogs

### FLS@0.0.2

Test Website：https://webdemo.agora.io/fls/fls-v0.0.2/

#### New Features

1. At RTC mode, you can get current network status and the callback when network status change

   - Reference:

     - https://docportal.shengwang.cn/cn/All/API%20Reference/web_ng/interfaces/iagorartcclient.html#event_network_quality

   - Usage:
     ```ts
     player.on("network-quality", (quality: 0 | 1 | 2 | 3 | 4 | 5 | 6) => {});
     player.getNetworkQuality(): 0 | 1 | 2 | 3 | 4 | 5 | 6
     ```

2. At RTC mode, you can get host's audio and video stats

   - Reference:

     - https://docportal.shengwang.cn/cn/All/API%20Reference/web_ng/interfaces/iagorartcclient.html#getremoteaudiostats
     - https://docportal.shengwang.cn/cn/All/API%20Reference/web_ng/interfaces/iagorartcclient.html#getremotevideostats

   - Usage:
     ```ts
     player.getStats(): {
       audio: RtcAudioStats,
       video: RtcVideoStats
     }
     ```

3. You can check whether the current browser supports WebRTC and HLS

   - `isRtcSupported` whether the current browser supports WebRTC
   - `isHlsSupported` whether the current browser supports HLS

4. Add event "before-media-source-change"
   - Usage:
   ```ts
   player.on(PlayerEvent.BEFORE_MEDIA_SOURCE_CHANGE, (source: MediaSource) => {
     console.info("media source will change to: ", source);
   });
   ```

#### Bug fix

1. The uid is regarded as string uid when set to 0
2. Switching media source when muted, the voice recovered
3. WebRTC is regarded as unsupported at the WebViews of some iOS devices
