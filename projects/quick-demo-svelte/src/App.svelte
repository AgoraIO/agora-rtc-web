<script lang="ts">
  import type {
    IAgoraRTCClient,
    IAgoraRTCRemoteUser,
    ICameraVideoTrack,
    IMicrophoneAudioTrack,
  } from "agora-rtc-sdk-ng";

  import AgoraRTC from "agora-rtc-sdk-ng";

  let track: ICameraVideoTrack;
  let audioTrack: IMicrophoneAudioTrack;
  let client: IAgoraRTCClient;

  let isJoined = false;
  let isAudioPubed = false;
  let isVideoPubed = false;
  let isAudioSubed = false;
  let isVideoSubed = false;

  let isVideoOn = false;
  let isAudioOn = false;

  async function turnOnCamera() {
    isVideoOn = !isVideoOn;

    if (track) {
      return track.setEnabled(!track.enabled);
    }
    track = await AgoraRTC.createCameraVideoTrack();
    track.play("camera-video");
  }

  async function turnOnMicrophone() {
    isAudioOn = !isAudioOn;

    if (audioTrack) {
      return audioTrack.setEnabled(!audioTrack.enabled);
    }

    audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    // audioTrack.play();
  }

  let channel = "";
  // you can apply appid follow the guide https://www.agora.io/en/blog/how-to-get-started-with-agora/
  const APP_ID = "xxxx*****************xxxx";

  async function joinChannel() {
    if (!channel) {
      channel = "svelte-room";
    }

    if (isJoined) {
      await leaveChannel();
    }

    if (!client) {
      client = AgoraRTC.createClient({
        mode: "rtc",
        codec: "vp8",
      });

      client.on("user-published", onUserPublish);
    }

    await client.join(APP_ID, channel, null, null);

    isJoined = true;
  }

  async function leaveChannel() {
    isJoined = false;
    isAudioPubed = false;
    isVideoPubed = false;

    client && (await client.leave());
  }

  async function onUserPublish(
    user: IAgoraRTCRemoteUser,
    mediaType: "video" | "audio"
  ) {
    if (mediaType === "video") {
      const remoteTrack = await client.subscribe(user, mediaType);
      remoteTrack.play("remote-video");
      isVideoSubed = true;
    }
    if (mediaType === "audio") {
      const remoteTrack = await client.subscribe(user, mediaType);
      remoteTrack.play();
      isAudioSubed = true;
    }
  }

  async function publishVideo() {
    if (!isVideoOn) {
      await turnOnCamera();
    }

    if (!isJoined) {
      await joinChannel();
    }
    await client.publish(track);
    isVideoPubed = true;
  }

  async function publishAudio() {
    if (!isAudioOn) {
      await turnOnMicrophone();
    }
    if (!isJoined) {
      await joinChannel();
    }

    await client.publish(audioTrack);
    isAudioPubed = true;
  }
</script>

<div class="left-side">
  <h3>Pleat check you camera / microphone!</h3>
  <div class="buttons">
    <button on:click={turnOnCamera} class={isVideoOn ? "button-on" : ""}>
      Turn {isVideoOn ? "off" : "on"} camera
    </button>
    <button on:click={turnOnMicrophone} class={isAudioOn ? "button-on" : ""}>
      Turn {isAudioOn ? "off" : "on"} Microphone
    </button>
  </div>
  <h3>Please input the channel name</h3>
  <input bind:value={channel} />
  <div class="buttons">
    <button on:click={joinChannel} class={isJoined ? "button-on" : ""}>
      Join Channel
    </button>
    <button on:click={publishVideo} class={isVideoPubed ? "button-on" : ""}>
      Publish Video
    </button>
    <button on:click={publishAudio} class={isAudioPubed ? "button-on" : ""}>
      Publish Audio
    </button>
    <button on:click={leaveChannel}>Leave Channel</button>
  </div>
</div>
<div class="right-side">
  <video id="camera-video">
    <track kind="captions" />
  </video>
  <video id="remote-video">
    <track kind="captions" />
  </video>

  {#if isJoined && !isVideoSubed}
    <div class="waiting">
      You can shared channel {channel} to others.....
    </div>
  {/if}
</div>

<style>
</style>
