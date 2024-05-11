import { ErrorData } from 'hls.js';
import { HlsConfig } from 'hls.js';
import HlsPlayer from 'hls.js';
import { IAudioProcessor } from 'agora-rte-extension';
import { IBaseProcessor } from 'agora-rte-extension';

declare interface AgoraRTCStats {
    Duration: number;
    RecvBitrate: number;
    RecvBytes: number;
    SendBitrate: number;
    SendBytes: number;
    UserCount: number;
    RTT: number;
    OutgoingAvailableBandwidth: number;
}

declare enum AudienceLatencyLevelType {
    AUDIENCE_LEVEL_LOW_LATENCY = 1,
    AUDIENCE_LEVEL_ULTRA_LOW_LATENCY = 2,
    AUDIENCE_LEVEL_SYNC_LATENCY = 3
}

declare enum AudioCodec {
    opus = "opus",
    pcma = "pcma",
    pcmu = "pcmu",
    g722 = "g722"
}

export declare const BUILD_INFO: string;

declare type CheckVideoVisibleResult = CheckVisibleResult;

declare type CheckVisibleResult = VisibleResultInner | VisibleHiddenResult;

declare interface ClientConfig {
    codec: SDK_CODEC;
    audioCodec?: SDK_AUDIO_CODEC;
    mode: SDK_MODE;
    role?: ClientRole;
    clientRoleOptions?: ClientRoleOptions;
    proxyServer?: string;
    turnServer?: TurnServerConfig;
    httpRetryConfig?: RetryConfiguration;
    websocketRetryConfig?: RetryConfiguration;
}

declare type ClientRole = "audience";

declare interface ClientRoleOptions {
    level: AudienceLatencyLevelType;
    delay?: number;
}

declare enum ConnectionDisconnectedReason {
    LEAVE = "LEAVE",
    NETWORK_ERROR = "NETWORK_ERROR",
    SERVER_ERROR = "SERVER_ERROR",
    UID_BANNED = "UID_BANNED",
    IP_BANNED = "IP_BANNED",
    CHANNEL_BANNED = "CHANNEL_BANNED",
    FALLBACK = "FALLBACK",
    LICENSE_MISSING = "LICENSE_MISSING",
    LICENSE_EXPIRED = "LICENSE_EXPIRED",
    LICENSE_MINUTES_EXCEEDED = "LICENSE_MINUTES_EXCEEDED",
    LICENSE_PERIOD_INVALID = "LICENSE_PERIOD_INVALID",
    LICENSE_MULTIPLE_SDK_SERVICE = "LICENSE_MULTIPLE_SDK_SERVICE",
    LICENSE_ILLEGAL = "LICENSE_ILLEGAL",
    TOKEN_EXPIRE = "TOKEN_EXPIRE"
}

declare type ConnectionState = "DISCONNECTED" | "CONNECTING" | "RECONNECTING" | "CONNECTED" | "DISCONNECTING";

declare interface Deferred<T = void> {
    promise: Promise<T>;
    isResolved: boolean;
    isRejected: boolean;
    isFinished: boolean;
    value?: T;
    resolve: (value: T) => void;
    reject: (reason: unknown) => void;
    cancel: (reason?: unknown) => void;
}

export declare function disableLogUpload(): void;

export declare function enableLogUpload(): void;

export declare function enableNewNetworkConfig(): void;

declare type EncryptionMode = "aes-128-xts" | "aes-256-xts" | "aes-128-ecb" | "sm4-128-ecb" | "aes-128-gcm" | "aes-256-gcm" | "aes-128-gcm2" | "aes-256-gcm2" | "none";

declare function event_connection_state_change(curState: ConnectionState, revState: ConnectionState, reason?: ConnectionDisconnectedReason): void;

declare function event_crypt_error(): void;

declare function event_exception(event: {
    code: number;
    msg: string;
    uid: UID;
}): void;

declare function event_first_frame_decoded(): void;

declare function event_is_using_cloud_proxy(isUsingProxy: boolean): void;

declare function event_join_fallback_to_proxy(proxyServer: string): void;

declare function event_media_reconnect_end(uid: UID): void;

declare function event_media_reconnect_start(uid: UID): void;

declare function event_network_quality(stats: NetworkQuality): void;

declare function event_sei_received(sei: Uint8Array): void;

declare function event_stream_fallback(uid: UID, isFallbackOrRecover: "fallback" | "recover"): void;

declare function event_stream_type_changed(uid: UID, streamType: RemoteStreamType): void;

declare function event_token_privilege_did_expire(): void;

declare function event_token_privilege_will_expire(): void;

declare function event_transceiver_updated(transceiver: RTCRtpTransceiver): void;

declare function event_user_info_updated(uid: UID, msg: "mute-audio" | "mute-video" | "enable-local-video" | "unmute-audio" | "unmute-video" | "disable-local-video"): void;

declare function event_user_joined(user: RtcUser): void;

declare function event_user_left(user: RtcUser, reason: string): void;

declare function event_user_published(user: RtcUser, mediaType: "audio" | "video"): void;

declare function event_user_unpublished(user: RtcUser, mediaType: "audio" | "video"): void;

declare function event_video_element_visible_status(data?: CheckVideoVisibleResult): void;

declare function event_video_state_changed(videoState: VideoState): void;

declare function event_volume_indicator(result: {
    level: number;
    uid: UID;
}[]): void;

declare interface EventCustomReportParams {
    reportId: string;
    category: string;
    event: string;
    label: string;
    value: number;
}

declare class EventEmitter<E extends string> {
    private _events;
    getListeners(event: E): Function[];
    on(event: E, listener: Function): void;
    addListener: (event: E, listener: Function) => void;
    once(event: E, listener: Function): void;
    off(event: E, listener?: Function): void;
    removeAllListeners(event?: E): void;
    emit(event: E, ...args: any[]): void;
    safeEmit(event: E, ...args: any[]): void;
    private _indexOfListener;
}

declare class EventEmitter_2 {
    private _events;
    getListeners(event: string): Function[];
    on(event: string, listener: Function): void;
    once(event: string, listener: Function): void;
    off(event: string, listener: Function): void;
    removeAllListeners(event?: string): void;
    private _indexOfListener;
}

export declare function getParameter(key: keyof typeof VARIABLE_PARAMS): string | boolean;

declare class HlsMediaSource extends EventEmitter<SourceEvent> {
    mode: MediaSource_2.HLS;
    url: string;
    element: HTMLVideoElement;
    hls?: HlsPlayer;
    private recoverTimes;
    constructor(url: string, element: HTMLVideoElement, hlsConfig?: Partial<HlsConfig>);
    private bindElementEvents;
    private unBindElementEvents;
    private bindEvents;
    private unBindEvents;
    play(): Promise<void>;
    pause(stop?: boolean): Promise<void>;
    retry(): Promise<void>;
    switch(url: string): Promise<void>;
    setVolume(volume: number): void;
    getVolume(): number;
    destroy(): Promise<void>;
}

declare interface IAgoraRTCClient extends EventEmitter_2 {
    readonly connectionState: ConnectionState;
    readonly remoteUsers: RtcUser[];
    readonly uid?: UID;
    readonly channelName?: string;
    readonly mode: SDK_MODE;
    readonly role: ClientRole;
    on(event: "connection-state-change", listener: typeof event_connection_state_change): void;
    on(event: "user-joined", listener: typeof event_user_joined): void;
    on(event: "user-left", listener: typeof event_user_left): void;
    on(event: "user-published", listener: typeof event_user_published): void;
    on(event: "user-unpublished", listener: typeof event_user_unpublished): void;
    on(event: "user-info-updated", listener: typeof event_user_info_updated): void;
    on(event: "media-reconnect-start", listener: typeof event_media_reconnect_start): void;
    on(event: "media-reconnect-end", listener: typeof event_media_reconnect_end): void;
    on(event: "stream-type-changed", listener: typeof event_stream_type_changed): void;
    on(event: "stream-fallback", listener: typeof event_stream_fallback): void;
    on(event: "volume-indicator", listener: typeof event_volume_indicator): void;
    on(event: "crypt-error", listener: typeof event_crypt_error): void;
    on(event: "token-privilege-will-expire", listener: typeof event_token_privilege_will_expire): void;
    on(event: "token-privilege-did-expire", listener: typeof event_token_privilege_did_expire): void;
    on(event: "network-quality", listener: typeof event_network_quality): void;
    on(event: "exception", listener: typeof event_exception): void;
    on(event: "is-using-cloud-proxy", listener: typeof event_is_using_cloud_proxy): void;
    on(event: "join-fallback-to-proxy", listener: typeof event_join_fallback_to_proxy): void;
    on(event: string, listener: Function): void;
    join(appid: string, channel: string, token: string | null, uid?: UID | null): Promise<UID>;
    leave(): Promise<void>;
    subscribe(user: RtcUser, mediaType: "video"): Promise<IRemoteVideoTrack>;
    subscribe(user: RtcUser, mediaType: "audio"): Promise<IRemoteAudioTrack>;
    subscribe(user: RtcUser, mediaType: "video" | "audio", channelId?: number): Promise<IRemoteTrack>;
    presubscribe(uid: UID, mediaType: "audio"): Promise<IRemoteAudioTrack>;
    presubscribe(uid: UID, mediaType: "video"): Promise<IRemoteVideoTrack>;
    presubscribe(uid: UID, mediaType: "video" | "audio"): Promise<IRemoteTrack>;
    unsubscribe(user: RtcUser, mediaType?: "video" | "audio", channelId?: number): Promise<void>;
    setProxyServer(proxyServer: string): void;
    setTurnServer(turnServer: TurnServerConfig): void;
    startProxyServer(mode?: number): void;
    stopProxyServer(): void;
    setRemoteVideoStreamType(uid: UID, streamType: RemoteStreamType): Promise<void>;
    setRemoteDefaultVideoStreamType(streamType: RemoteStreamType): Promise<void>;
    pickSVCLayer(uid: UID, layerOptions: {
        spatialLayer: 0 | 1 | 2 | 3;
        temporalLayer: 0 | 1 | 2 | 3;
    }): Promise<void>;
    setRTMConfig(config: RTMConfiguration): Promise<void>;
    setStreamFallbackOption(uid: UID, fallbackType: RemoteStreamFallbackType): Promise<void>;
    setEncryptionConfig(encryptionMode: EncryptionMode, secret: string, salt?: Uint8Array, encryptDataStream?: boolean): void;
    renewToken(token: string): Promise<void>;
    enableAudioVolumeIndicator(): void;
    getRTCStats(): AgoraRTCStats;
    sendCustomReportMessage(reports: EventCustomReportParams[] | EventCustomReportParams): Promise<void>;
    getRemoteAudioStats(): {
        [uid: string]: RtcAudioStats;
    };
    getRemoteNetworkQuality(): {
        [uid: string]: NetworkQuality;
    };
    getNetworkQuality(): NetworkQuality;
    getRemoteVideoStats(): {
        [uid: string]: RtcVideoStats;
    };
    setLicense(license: string): void;
    setLocalAccessPointsV2(config: LocalAccessPointConfig): void;
}

export declare interface IPlayerError {
    source: MediaSource_2;
    error: ErrorData | Error;
}

export declare interface IPlayerOptions {
    url: string;
    el: string | HTMLVideoElement;
    width?: number;
    height?: number;
    objectFit?: "cover" | "contain" | "fill";
    aspectRatio?: string;
    autoSwitchHLS?: boolean;
    defaultUseHLS?: boolean;
    hlsConfig?: HlsConfig;
    autoplay?: boolean;
    mirror?: boolean;
}

declare interface IRemoteAudioTrack extends IRemoteTrack {
    getStats(): RtcAudioStats;
    play(): void;
    setPlaybackDevice(deviceId: string): Promise<void>;
    setAudioFrameCallback(audioFrameCallback: null | ((buffer: AudioBuffer) => void), frameSize?: number): void;
    setVolume(volume: number): void;
    getVolumeLevel(): number;
    pipe(processor: IAudioProcessor): IAudioProcessor;
    unpipe(): void;
    processorDestination: IAudioProcessor;
}

declare interface IRemoteTrack extends ITrack {
    on(event: "first-frame-decoded", listener: typeof event_first_frame_decoded): void;
    on(event: "transceiver-updated", listener: typeof event_transceiver_updated): void;
    getUserId(): UID;
    getStats(): RtcAudioStats | RtcVideoStats;
}

declare interface IRemoteVideoTrack extends IRemoteTrack {
    on(event: "video-state-changed", listener: typeof event_video_state_changed): void;
    on(event: "first-frame-decoded", listener: typeof event_first_frame_decoded): void;
    on(event: "video-element-visible-status", listener: typeof event_video_element_visible_status): void;
    on(event: "transceiver-updated", listener: typeof event_transceiver_updated): void;
    on(event: "sei-received", listener: typeof event_sei_received): void;
    getStats(): RtcVideoStats;
    play(element: string | HTMLElement, config?: VideoPlayerConfig): void;
    getCurrentFrameData(): ImageData;
    getVideoElementVisibleStatus(): CheckVideoVisibleResult | undefined;
    pipe(processor: IBaseProcessor): IBaseProcessor;
    unpipe(): void;
    processorDestination: IBaseProcessor;
}

export declare function isHlsSupported(): boolean;

export declare function isRtcSupported(): boolean;

declare interface ITrack extends EventEmitter_2 {
    trackMediaType: "audio" | "video";
    isPlaying: boolean;
    getTrackId(): string;
    getMediaStreamTrack(): MediaStreamTrack;
    getRTCRtpTransceiver(type?: StreamType): RTCRtpTransceiver | undefined;
    play(element?: string | HTMLElement): void;
    stop(): void;
}

export declare class LivePlayer extends EventEmitter<PlayerEvent> {
    static isHlsSupported: typeof isHlsSupported;
    static isRtcSupported: typeof isRtcSupported;
    source: RtcMediaSource | HlsMediaSource;
    element: HTMLVideoElement;
    private options;
    private urlInfo;
    private autoSwitchHLS;
    private isMirror;
    private volume;
    private playDefer;
    private pauseDefer;
    private retryDefer;
    private switchUrlDefer;
    private switchSourceDefer;
    private _playState;
    set playState(state: MediaPlayState);
    get playState(): MediaPlayState;
    get isPlaying(): boolean;
    get isPaused(): boolean;
    get isStopped(): boolean;
    constructor(options: IPlayerOptions);
    private bindMediaEvents;
    private unbindMediaEvents;
    play(): Promise<void>;
    pause(stop?: boolean): Promise<void>;
    retry(): Promise<void>;
    switchURL(url: string): Promise<void>;
    switchMediaSource(source: MediaSource_2): Promise<void>;
    mirror(mirror?: boolean): void;
    destroy(): Promise<void>;
    setVolume(volume: number): void;
    getVolume(): number;
    getNetworkQuality(): 0 | 1 | 6 | 2 | 5 | 3 | 4;
    getStats(): {
        audio: RtcAudioStats;
        video: RtcVideoStats;
    } | undefined;
    private replaceNewVideoElement;
}

declare type LocalAccessPointConfig = {
    [serve in "log" | "report" | "cds"]?: {
        hostname?: string[];
        port?: number;
    };
} & {
    accessPoints: {
        serverList: string[];
        domain: string;
        port?: number;
    };
};

export declare enum MediaPlayState {
    PENDING = "pending",
    PLAYING = "playing",
    PAUSED = "paused",
    STOPPED = "stopped"
}

declare enum MediaSource_2 {
    HLS = "hls",
    RTC = "rtc"
}
export { MediaSource_2 as MediaSource }

declare interface NetworkQuality {
    uplinkNetworkQuality: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    downlinkNetworkQuality: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

export declare enum PlayerEvent {
    RTC_USER_STATE_CHANGED = "rtc-user-state-changed",
    RTC_SOURCE_STATE_CHANGED = "rtc-source-state-changed",
    RTC_HOST_CHANGED = "rtc-host-changed",
    RTC_MEDIA_CHANGED = "rtc-media-changed",
    PLAY_STATE_CHANGED = "play-state-changed",
    BEFORE_MEDIA_SOURCE_CHANGE = "before-media-source-change",
    MEDIA_SOURCE_CHANGED = "media-source-changed",
    AUTOPLAY_PREVENTED = "autoplay-prevented",
    NETWORK_QUALITY = "network-quality",
    ERROR = "error",
    REQUEST_SWITCH_MEDIA_SOURCE = "request-switch-media-source"
}

declare enum RemoteStreamFallbackType {
    DISABLE = 0,
    LOW_STREAM = 1,
    AUDIO_ONLY = 2
}

declare enum RemoteStreamType {
    HIGH_STREAM = 0,
    LOW_STREAM = 1
}

declare interface RetryConfiguration {
    timeout: number;
    timeoutFactor: number;
    maxRetryCount: number;
    maxRetryTimeout: number;
}

export declare interface RtcAudioStats {
    transportDelay: number;
    codecType?: "opus" | "aac" | "PCMU" | "PCMA" | "G722";
    end2EndDelay: number;
    receiveBitrate: number;
    receiveLevel: number;
    receiveBytes: number;
    receiveDelay: number;
    receivePackets: number;
    receivePacketsLost: number;
    packetLossRate: number;
    currentPacketLossRate: number;
    totalDuration: number;
    totalFreezeTime: number;
    freezeRate: number;
    publishDuration: number;
}

declare class RtcMediaSource extends EventEmitter<RtcSourceEvent | SourceEvent> {
    mode: MediaSource_2.RTC;
    private url;
    element: HTMLVideoElement;
    private rtcConfig;
    rtc: IAgoraRTCClient;
    host?: RtcUser;
    channel?: string;
    uid?: number;
    protected state: RtcSourceState;
    protected videoState: RtcMediaState;
    protected audioState: RtcMediaState;
    protected pendingRemoteUsers: RtcUser[];
    protected videoTrack?: IRemoteVideoTrack;
    protected audioTrack?: IRemoteAudioTrack;
    protected audioDefer?: Deferred<void>;
    protected videoDefer?: Deferred<void>;
    constructor(url: string, element: HTMLVideoElement, rtcConfig?: ClientConfig);
    private onAutoplayFailed;
    private setState;
    private setVideoState;
    private setAudioState;
    private join;
    private reset;
    private recreate;
    setVolume(volume: number): number;
    getVolume(): number;
    playAudio(): Promise<void>;
    playVideo(): Promise<void>;
    private pauseAudio;
    private pauseVideo;
    protected playRemoteUser(user: RtcUser | undefined): Promise<void>;
    protected onUserJoined: (user: RtcUser) => Promise<void>;
    private onUserLeft;
    private onNetworkQuality;
    getNetworkQuality(): 0 | 1 | 6 | 2 | 5 | 3 | 4;
    private onUserUnpublished;
    private onUserPublished;
    private bindEvents;
    private unbindEvent;
    private onRtcError;
    retry(): Promise<boolean>;
    pause(stop?: boolean): Promise<void>;
    play(): Promise<void>;
    switch(url: string): Promise<void>;
    protected create(): Promise<void>;
    getStats(): {
        video: RtcVideoStats | undefined;
        audio: RtcAudioStats | undefined;
    } | undefined;
    destroy(): Promise<void>;
}

export declare enum RtcMediaState {
    PLAYING = "playing",
    PAUSED = "paused",
    STOPPED = "stopped",
    EMPTY = "empty"
}

export declare enum RtcSourceEvent {
    NETWORK_QUALITY = "network_quality",
    STATE_CHANGED = "state_changed",
    VIDEO_STATE_CHANGED = "video_state_changed",
    AUDIO_STATE_CHANGED = "audio_state_changed",
    HOST_CHANGED = "host_changed",
    USER_STATE_CHANGED = "user_state_changed"
}

export declare enum RtcSourceState {
    CREATING = "creating",
    CREATED = "created",
    CONNECTING = "connecting",
    CONNECTED = "connected",
    CONNECT_FAILED = "connect-failed",
    DESTROYED = "destroyed"
}

export declare interface RtcUser {
    uid: UID;
    audioTrack?: IRemoteAudioTrack;
    videoTrack?: IRemoteVideoTrack;
    hasAudio: boolean;
    hasVideo: boolean;
}

export declare enum RtcUserState {
    JOINED = "joined",
    LEFT = "left",
    UNPUBLISHED = "unpublished",
    PUBLISHED = "published"
}

export declare interface RtcVideoStats {
    transportDelay: number;
    codecType?: "H264" | "H265" | "VP8" | "VP9" | "AV1X" | "AV1";
    end2EndDelay: number;
    receiveBitrate: number;
    receiveDelay: number;
    receiveBytes: number;
    decodeFrameRate?: number;
    receiveFrameRate?: number;
    renderFrameRate?: number;
    receivePackets: number;
    receivePacketsLost: number;
    packetLossRate: number;
    currentPacketLossRate: number;
    receiveResolutionHeight: number;
    receiveResolutionWidth: number;
    totalDuration: number;
    totalFreezeTime: number;
    freezeRate: number;
    publishDuration: number;
}

declare interface RTMConfiguration {
    apRTM: boolean;
    rtmFlag: number;
}

declare type SDK_AUDIO_CODEC = keyof typeof AudioCodec;

declare type SDK_CODEC = keyof typeof VideoCodec;

declare type SDK_MODE = "live" | "rtc";

export declare function setLogLevel(level: number): void;

export declare function setParameter(key: keyof typeof VARIABLE_PARAMS, value: any): void;

export declare function setRTCParameter(key: string, value: any): void;

declare enum SourceEvent {
    ERROR = "error",
    READY_FOR_PLAY = "ready_for_play",
    UNRECOVERABLE_ERROR = "unrecoverable_error",
    AUTOPLAY_PREVENTED = "autoplay_was_prevented"
}

declare enum StreamType {
    HIGH_STREAM = 0,
    LOW_STREAM = 1
}

declare interface TurnServerConfig {
    turnServerURL: string;
    password: string;
    udpport?: number;
    username: string;
    forceturn?: boolean;
    tcpport?: number;
    security?: boolean;
}

declare type UID = number | string;

declare const VARIABLE_PARAMS: {
    CDN_DOMAIN: string;
    CDN_BACKUP_DOMAIN: string;
    ENABLE_RTC_H264_CHECK: boolean;
};

export declare const VERSION: string;

declare enum VideoCodec {
    h264 = "h264",
    h265 = "h265",
    vp8 = "vp8",
    vp9 = "vp9",
    av1 = "av1"
}

declare interface VideoPlayerConfig {
    mirror?: boolean;
    fit?: "cover" | "contain" | "fill";
}

declare enum VideoState {
    VideoStateStopped = 0,
    VideoStateStarting = 1,
    VideoStateDecoding = 2,
    VideoStateFrozen = 3
}

declare enum VisibleHiddenReason {
    COVERED = "COVERED",
    POSITION = "POSITION",
    SIZE = "SIZE",
    STYLE = "STYLE"
}

declare interface VisibleHiddenResult {
    visible: false;
    reason: keyof typeof VisibleHiddenReason;
}

declare interface VisibleResultInner {
    visible: true;
}

export { }
