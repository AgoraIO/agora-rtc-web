# 安装

安装 SDK 代码

```bash
npm i agora-rtc-sdk-ng@^4.18.2
```

将打包后的 SDK 代码放在项目目录下，如 `src/sdk`

使用 LiveVideo SDK

```ts
import { LiveVideoPlayer, LiveVideoEvent } from "src/sdk/live-video";
import type { IAgoraRTCRemoteUser } from "agora-rtc-sdk-ng";
```

# 使用

## 事件

1. LiveVideoEvent.ERROR \
   如出现该错误，可尝试调用 retry

2. LiveVideoEvent.AUTOPLAY_PREVENTED \
   自动播放被阻止，可提示用户主动点击播放

3. LiveVideoEvent.AUDIO/VIDEO_STATE_CHANGED \
   当前播放媒体状态，如主播停止推流等。播放器会自动处理，集成时可用于提示用于相关状况。

4. LiveVideoEvent.USER_STATE_CHANGED \
    用户状态变更，主要有两种：用户的 Join 与 Leave，用户的 Publish 与 UnPublish

   ```ts
   enum UserState {
     JOINED = "joined",
     LEFT = "left",
     UNPUBLISHED = "unpublished",
     PUBLISHED = "published",
   }

   interface UserState {
     state: UserState;
     user: IAgoraRTCRemoteUser;
     isHost: boolean;
     mediaType?: "video" | "audio";
   }
   ```

   如没有特殊用途，可忽略该事件。

5. LiveVideoEvent.HOST_CHANGED \
   主播发生变化：如主播第一次加入、离开。或者中途离开后顺延到下一个推流者。\
   如没有特殊用途，可忽略该事件。

## 创建 LiveVideo

```ts
let player: LiveVideoPlayer;

function createLiveVideo() {
  player = new LiveVideoPlayer({
    url: "rte://xxxx****APP_ID****xxxx/live-video/channel?token=null&uid=null",
    id: "remote-video",
  });

  player.on(LiveVideoEvent.ERROR, onError);
  player.on(LiveVideoEvent.AUTOPLAY_PREVENTED, onAutoplayFailed);
  player.on(LiveVideoEvent.STATE_CHANGED, onStateChanged);
  player.on(LiveVideoEvent.AUDIO_STATE_CHANGED, onAudioStateChanged);
  player.on(LiveVideoEvent.VIDEO_STATE_CHANGED, onVideoStateChanged);
  player.on(LiveVideoEvent.USER_STATE_CHANGED, onUserStateChanged);
  player.on(LiveVideoEvent.HOST_CHANGED, onHostChanged);
}

function onHostChanged(prev: IAgoraRTCRemoteUser, next: IAgoraRTCRemoteUser) {
  console.warn("onHostChanged: ", prev, next);
}

function onUserStateChanged(data: {
  user: IAgoraRTCRemoteUser;
  state: UserState;
  isHost: boolean;
  mediaType?: "audio" | "video";
}) {
  console.info("onUserStateChanged: ", data);
}

function onVideoStateChanged(state: MediaState) {
  console.info("onVideoStateChanged: ", state);
}

function onAudioStateChanged(state: MediaState) {
  console.info("onAudioStateChanged: ", state);
}

function onStateChanged(state: LiveVideoState) {
  console.info("onStateChanged: ", state);
}

function onError(error: Error) {
  // 可尝试调用 retry 进行恢复
  console.error("onError: ", error);
}

function onAutoplayFailed() {
  // 可以在此提示用户手动触发播放
  console.warn("onAutoplayFailed");
}
```

该方法只用户创建播放器，如需接收主播流，还需要调用 play 方法

## 开始播放

```ts
async function play() {
  if (!player) return;
  await player.play();
}
```

该方法只是改变播放器状态，和有没有主播推流无关。 \
即：当没有主播推流是，调用 play 方法会把播放器置于播放中状态，等有主播推流时会自动播放。

## 暂停播放

```ts
async function pause() {
  if (!player) return;
  await player.pause();
}
```

该方法只是暂停播放，而不是停止订阅主播流。

## 停止播放

```ts
async function stop() {
  if (!player) return;

  await player.pause(true);
}
```

调用该方法会停止订阅主播流。 \
再次 play 的时候，其耗时比暂停播放会更长，因为会重新订阅，创建媒体传输通道等。

## 设置音量

```ts
async function setVolume(volume: number) {
  if (!player) return;

  player.setVolume(volume);
}
```

仅仅当前有音频的时候调用生效，此时返回值设置的音量，范围为 0 - 1。 \
如果当前没有音频，则返回 -1。

## 获取音量

```ts
async function getVolume() {
  if (!player) return;

  const volume = player.getVolume();
}
```

返回值为当前音量，范围为 0 - 1，会随着对方说活音量的变化而变化。\
如果当前没有音频，则返回 -1。

## 重试

```ts
async function retry() {
  if (!player) return;

  await player.retry();
}
```

当出现异常抛错时，该方法会根据播放器内部状态尝试进行恢复，重试后的播放器状态不发生改变。

## 切换链接

```ts
async function switchURL() {
  if (!player) return;

  await player.switchURL(url.value);
}
```

该方法用于切换 URL，切换后的播放器状态不发生改变。 \
对于相同的 URL 调用该方法无效。

## 销毁 LiveVideo

```ts
function destroy() {
  if (!player) return;

  player.destroy();
}
```

该方法用于销毁播放器，销毁后可通过 retry 恢复，但是播放器状态被重置。

## 统计信息

```ts
function getStats() {
  const stats = player && player.getStats();

  if (stats) {
    console.info(stats);
  }
}
```

可以根据统计信息评估当前的网络状况。
