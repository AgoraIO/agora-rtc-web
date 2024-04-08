import { HlsConfig } from 'hls.js';
import HlsPlayer from 'hls.js';
import { IAudioProcessor } from 'agora-rte-extension';
import { IBaseProcessor } from 'agora-rte-extension';

declare class AgoraRTCError extends AgoraRTCError_2 {
    readonly name: string;
    constructor(code: AgoraRTCErrorCode, message?: string, data?: any);
    print(level?: "error" | "warning"): AgoraRTCError;
    throw(): never;
}

declare class AgoraRTCError_2 extends Error implements IAgoraRTCError {
    readonly code: AgoraRTCErrorCode;
    readonly message: string;
    readonly data?: any;
    readonly name: string;
    constructor(code: AgoraRTCErrorCode, message?: string, data?: any);
    toString(): string;
    print(level?: "error" | "warning", logger?: any): AgoraRTCError_2;
    throw(logger?: any): never;
}

declare enum AgoraRTCErrorCode {
    UNEXPECTED_ERROR = "UNEXPECTED_ERROR",
    UNEXPECTED_RESPONSE = "UNEXPECTED_RESPONSE",
    TIMEOUT = "TIMEOUT",
    INVALID_PARAMS = "INVALID_PARAMS",
    NOT_READABLE = "NOT_READABLE",
    NOT_SUPPORTED = "NOT_SUPPORTED",
    INVALID_OPERATION = "INVALID_OPERATION",
    OPERATION_ABORTED = "OPERATION_ABORTED",
    WEB_SECURITY_RESTRICT = "WEB_SECURITY_RESTRICT",
    EXCHANGE_SDP_FAILED = "EXCHANGE_SDP_FAILED",
    ADD_CANDIDATE_FAILED = "ADD_CANDIDATE_FAILED",
    DATACHANNEL_FAILED = "DATACHANNEL_FAILED",
    NETWORK_ERROR = "NETWORK_ERROR",
    NETWORK_TIMEOUT = "NETWORK_TIMEOUT",
    NETWORK_RESPONSE_ERROR = "NETWORK_RESPONSE_ERROR",
    API_INVOKE_TIMEOUT = "API_INVOKE_TIMEOUT",
    ENUMERATE_DEVICES_FAILED = "ENUMERATE_DEVICES_FAILED",
    DEVICE_NOT_FOUND = "DEVICE_NOT_FOUND",
    ELECTRON_IS_NULL = "ELECTRON_IS_NULL",
    ELECTRON_DESKTOP_CAPTURER_GET_SOURCES_ERROR = "ELECTRON_DESKTOP_CAPTURER_GET_SOURCES_ERROR",
    CHROME_PLUGIN_NO_RESPONSE = "CHROME_PLUGIN_NO_RESPONSE",
    CHROME_PLUGIN_NOT_INSTALL = "CHROME_PLUGIN_NOT_INSTALL",
    MEDIA_OPTION_INVALID = "MEDIA_OPTION_INVALID",
    PERMISSION_DENIED = "PERMISSION_DENIED",
    CONSTRAINT_NOT_SATISFIED = "CONSTRAINT_NOT_SATISFIED",
    TRACK_IS_DISABLED = "TRACK_IS_DISABLED",
    GET_VIDEO_ELEMENT_VISIBLE_ERROR = "GET_VIDEO_ELEMENT_VISIBLE_ERROR",
    SHARE_AUDIO_NOT_ALLOWED = "SHARE_AUDIO_NOT_ALLOWED",
    LOW_STREAM_ENCODING_ERROR = "LOW_STREAM_ENCODING_ERROR",
    SET_ENCODING_PARAMETER_ERROR = "SET_ENCODING_PARAMETER_ERROR",
    TRACK_STATE_UNREACHABLE = "TRACK_STATE_UNREACHABLE",
    INVALID_UINT_UID_FROM_STRING_UID = "INVALID_UINT_UID_FROM_STRING_UID",
    CAN_NOT_GET_PROXY_SERVER = "CAN_NOT_GET_PROXY_SERVER",
    CAN_NOT_GET_GATEWAY_SERVER = "CAN_NOT_GET_GATEWAY_SERVER",
    VOID_GATEWAY_ADDRESS = "VOID_GATEWAY_ADDRESS",
    UID_CONFLICT = "UID_CONFLICT",
    MULTI_UNILBS_RESPONSE_ERROR = "MULTI_UNILBS_RESPONSE_ERROR",
    UPDATE_TICKET_FAILED = "UPDATE_TICKET_FAILED",
    INVALID_LOCAL_TRACK = "INVALID_LOCAL_TRACK",
    INVALID_TRACK = "INVALID_TRACK",
    SENDER_NOT_FOUND = "SENDER_NOT_FOUND",
    CREATE_OFFER_FAILED = "CREATE_OFFER_FAILED",
    SET_ANSWER_FAILED = "SET_ANSWER_FAILED",
    ICE_FAILED = "ICE_FAILED",
    PC_CLOSED = "PC_CLOSED",
    SENDER_REPLACE_FAILED = "SENDER_REPLACE_FAILED",
    GET_LOCAL_CAPABILITIES_FAILED = "GET_LOCAL_CAPABILITIES_FAILED",
    GET_LOCAL_CONNECTION_PARAMS_FAILED = "GET_LOCAL_CONNECTION_PARAMS_FAILED",
    SUBSCRIBE_FAILED = "SUBSCRIBE_FAILED",
    UNSUBSCRIBE_FAILED = "UNSUBSCRIBE_FAILED",
    GATEWAY_P2P_LOST = "GATEWAY_P2P_LOST",
    NO_ICE_CANDIDATE = "NO_ICE_CANDIDATE",
    CAN_NOT_PUBLISH_MULTIPLE_VIDEO_TRACKS = "CAN_NOT_PUBLISH_MULTIPLE_VIDEO_TRACKS",
    EXIST_DISABLED_VIDEO_TRACK = "EXIST_DISABLED_VIDEO_TRACK",
    INVALID_REMOTE_USER = "INVALID_REMOTE_USER",
    REMOTE_USER_IS_NOT_PUBLISHED = "REMOTE_USER_IS_NOT_PUBLISHED",
    CUSTOM_REPORT_SEND_FAILED = "CUSTOM_REPORT_SEND_FAILED",
    CUSTOM_REPORT_FREQUENCY_TOO_HIGH = "CUSTOM_REPORT_FREQUENCY_TOO_HIGH",
    FETCH_AUDIO_FILE_FAILED = "FETCH_AUDIO_FILE_FAILED",
    READ_LOCAL_AUDIO_FILE_ERROR = "READ_LOCAL_AUDIO_FILE_ERROR",
    DECODE_AUDIO_FILE_FAILED = "DECODE_AUDIO_FILE_FAILED",
    WS_ABORT = "WS_ABORT",
    WS_DISCONNECT = "WS_DISCONNECT",
    WS_ERR = "WS_ERR",
    EXTERNAL_SIGNAL_ABORT = "EXTERNAL_SIGNAL_ABORT",
    LIVE_STREAMING_TASK_CONFLICT = "LIVE_STREAMING_TASK_CONFLICT",
    LIVE_STREAMING_INVALID_ARGUMENT = "LIVE_STREAMING_INVALID_ARGUMENT",
    LIVE_STREAMING_INTERNAL_SERVER_ERROR = "LIVE_STREAMING_INTERNAL_SERVER_ERROR",
    LIVE_STREAMING_PUBLISH_STREAM_NOT_AUTHORIZED = "LIVE_STREAMING_PUBLISH_STREAM_NOT_AUTHORIZED",
    LIVE_STREAMING_TRANSCODING_NOT_SUPPORTED = "LIVE_STREAMING_TRANSCODING_NOT_SUPPORTED",
    LIVE_STREAMING_CDN_ERROR = "LIVE_STREAMING_CDN_ERROR",
    LIVE_STREAMING_INVALID_RAW_STREAM = "LIVE_STREAMING_INVALID_RAW_STREAM",
    LIVE_STREAMING_WARN_STREAM_NUM_REACH_LIMIT = "LIVE_STREAMING_WARN_STREAM_NUM_REACH_LIMIT",
    LIVE_STREAMING_WARN_FAILED_LOAD_IMAGE = "LIVE_STREAMING_WARN_FAILED_LOAD_IMAGE",
    LIVE_STREAMING_WARN_FREQUENT_REQUEST = "LIVE_STREAMING_WARN_FREQUENT_REQUEST",
    WEBGL_INTERNAL_ERROR = "WEBGL_INTERNAL_ERROR",
    BEAUTY_PROCESSOR_INTERNAL_ERROR = "BEAUTY_PROCESSOR_INTERNAL_ERROR",
    CROSS_CHANNEL_WAIT_STATUS_ERROR = "CROSS_CHANNEL_WAIT_STATUS_ERROR",
    CROSS_CHANNEL_FAILED_JOIN_SRC = "CROSS_CHANNEL_FAILED_JOIN_SEC",
    CROSS_CHANNEL_FAILED_JOIN_DEST = "CROSS_CHANNEL_FAILED_JOIN_DEST",
    CROSS_CHANNEL_FAILED_PACKET_SENT_TO_DEST = "CROSS_CHANNEL_FAILED_PACKET_SENT_TO_DEST",
    CROSS_CHANNEL_SERVER_ERROR_RESPONSE = "CROSS_CHANNEL_SERVER_ERROR_RESPONSE",
    METADATA_OUT_OF_RANGE = "METADATA_OUT_OF_RANGE",
    LOCAL_AEC_ERROR = "LOCAL_AEC_ERROR",
    INVALID_PLUGIN = "INVALID_PLUGIN",
    DISCONNECT_P2P = "DISCONNECT_P2P",
    INIT_WEBSOCKET_TIMEOUT = "INIT_WEBSOCKET_TIMEOUT",
    CONVERTING_IMAGEDATA_TO_BLOB_FAILED = "CONVERTING_IMAGEDATA_TO_BLOB_FAILED",
    CONVERTING_VIDEO_FRAME_TO_BLOB_FAILED = "CONVERTING_VIDEO_FRAME_TO_BLOB_FAILED",
    INIT_DATACHANNEL_TIMEOUT = "INIT_DATACHANNEL_TIMEOUT",
    CREATE_DATACHANNEL_ERROR = "CREATE_DATACHANNEL_ERROR",
    DATACHANNEL_CONNECTION_TIMEOUT = "DATACHANNEL_CONNECTION_TIMEOUT",
    PROHIBITED_OPERATION = "PROHIBITED_OPERATION",
    IMAGE_MODERATION_UPLOAD_FAILED = "IMAGE_MODERATION_UPLOAD_FAILED",
    P2P_MESSAGE_FAILED = "P2P_MESSAGE_FAILED"
}

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

declare enum ChannelMediaRelayError {
    RELAY_OK = "RELAY_OK",
    SERVER_CONNECTION_LOST = "SERVER_CONNECTION_LOST",
    SRC_TOKEN_EXPIRED = "SRC_TOKEN_EXPIRED",
    DEST_TOKEN_EXPIRED = "DEST_TOKEN_EXPIRED"
}

declare enum ChannelMediaRelayEvent {
    NETWORK_DISCONNECTED = "NETWORK_DISCONNECTED",
    NETWORK_CONNECTED = "NETWORK_CONNECTED",
    PACKET_JOINED_SRC_CHANNEL = "PACKET_JOINED_SRC_CHANNEL",
    PACKET_JOINED_DEST_CHANNEL = "PACKET_JOINED_DEST_CHANNEL",
    PACKET_SENT_TO_DEST_CHANNEL = "PACKET_SENT_TO_DEST_CHANNEL",
    PACKET_RECEIVED_VIDEO_FROM_SRC = "PACKET_RECEIVED_VIDEO_FROM_SRC",
    PACKET_RECEIVED_AUDIO_FROM_SRC = "PACKET_RECEIVED_AUDIO_FROM_SRC",
    PACKET_UPDATE_DEST_CHANNEL = "PACKET_UPDATE_DEST_CHANNEL",
    PACKET_UPDATE_DEST_CHANNEL_REFUSED = "PACKET_UPDATE_DEST_CHANNEL_REFUSED",
    PACKET_UPDATE_DEST_CHANNEL_NOT_CHANGE = "PACKET_UPDATE_DEST_CHANNEL_NOT_CHANGE"
}

declare interface ChannelMediaRelayInfo {
    channelName: string;
    token?: string;
    uid: number;
}

declare enum ChannelMediaRelayState {
    RELAY_STATE_IDLE = "RELAY_STATE_IDLE",
    RELAY_STATE_CONNECTING = "RELAY_STATE_CONNECTING",
    RELAY_STATE_RUNNING = "RELAY_STATE_RUNNING",
    RELAY_STATE_FAILURE = "RELAY_STATE_FAILURE"
}

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

declare type ClientRole = "audience" | "host";

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

declare function event_channel_media_relay_event(event: ChannelMediaRelayEvent): void;

declare function event_channel_media_relay_state(state: ChannelMediaRelayState, code: ChannelMediaRelayError): void;

declare function event_connection_state_change(curState: ConnectionState, revState: ConnectionState, reason?: ConnectionDisconnectedReason): void;

declare function event_content_inspect_connection_state_change(preState: InspectState, newState: InspectState): void;

declare function event_content_inspect_error(error?: AgoraRTCError): void;

declare function event_crypt_error(): void;

declare function event_exception(event: {
    code: number;
    msg: string;
    uid: UID;
}): void;

declare function event_first_frame_decoded(): void;

declare function event_image_moderation_connection_state_change(newState: ImageModerationConnectionState, preState: ImageModerationConnectionState): void;

declare function event_is_using_cloud_proxy(isUsingProxy: boolean): void;

declare function event_join_fallback_to_proxy(proxyServer: string): void;

declare function event_live_streaming_error(url: string, err: AgoraRTCError): void;

declare function event_live_streaming_warning(url: string, warning: AgoraRTCError): void;

declare function event_media_reconnect_end(uid: UID): void;

declare function event_media_reconnect_start(uid: UID): void;

declare function event_network_quality(stats: NetworkQuality): void;

declare function event_published_user_list(users: IAgoraRTCRemoteUser[]): void;

declare function event_sei_received(sei: Uint8Array): void;

declare function event_stream_fallback(uid: UID, isFallbackOrRecover: "fallback" | "recover"): void;

declare function event_stream_type_changed(uid: UID, streamType: RemoteStreamType): void;

declare function event_token_privilege_did_expire(): void;

declare function event_token_privilege_will_expire(): void;

declare function event_track_ended(): void;

declare function event_transceiver_updated(transceiver: RTCRtpTransceiver, type?: StreamType): void;

declare function event_transceiver_updated_2(transceiver: RTCRtpTransceiver): void;

declare function event_user_info_updated(uid: UID, msg: "mute-audio" | "mute-video" | "enable-local-video" | "unmute-audio" | "unmute-video" | "disable-local-video"): void;

declare function event_user_joined(user: IAgoraRTCRemoteUser): void;

declare function event_user_left(user: IAgoraRTCRemoteUser, reason: string): void;

declare function event_user_published(user: IAgoraRTCRemoteUser, mediaType: "audio" | "video" | "datachannel", config?: IDataChannelConfig): void;

declare function event_user_unpublished(user: IAgoraRTCRemoteUser, mediaType: "audio" | "video" | "datachannel", config?: IDataChannelConfig): void;

declare function event_video_element_visible_status_2(data?: CheckVideoVisibleResult): void;

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

export declare function getParameters(key: keyof typeof VARIABLE_PARAMS): string;

declare class HlsMediaSource extends EventEmitter<SourceEvent> {
    mode: MediaSource_2.HLS;
    url: string;
    element: HTMLVideoElement;
    hls?: HlsPlayer;
    private recoverTimes;
    constructor(url: string, element: HTMLVideoElement, hlsConfig?: Partial<HlsConfig>);
    private bindElementEvents;
    private bindEvents;
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
    readonly remoteUsers: IAgoraRTCRemoteUser[];
    readonly localTracks: ILocalTrack[];
    readonly uid?: UID;
    readonly channelName?: string;
    readonly localDataChannels: ILocalDataChannel[];
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
    on(event: "channel-media-relay-state", listener: typeof event_channel_media_relay_state): void;
    on(event: "channel-media-relay-event", listener: typeof event_channel_media_relay_event): void;
    on(event: "volume-indicator", listener: typeof event_volume_indicator): void;
    on(event: "crypt-error", listener: typeof event_crypt_error): void;
    on(event: "token-privilege-will-expire", listener: typeof event_token_privilege_will_expire): void;
    on(event: "token-privilege-did-expire", listener: typeof event_token_privilege_did_expire): void;
    on(event: "network-quality", listener: typeof event_network_quality): void;
    on(event: "live-streaming-error", listener: typeof event_live_streaming_error): void;
    on(event: "live-streaming-warning", listener: typeof event_live_streaming_warning): void;
    on(event: "exception", listener: typeof event_exception): void;
    on(event: "is-using-cloud-proxy", listener: typeof event_is_using_cloud_proxy): void;
    on(event: "join-fallback-to-proxy", listener: typeof event_join_fallback_to_proxy): void;
    on(event: "published-user-list", listener: typeof event_published_user_list): void;
    on(event: "content-inspect-connection-state-change", listener: typeof event_content_inspect_connection_state_change): void;
    on(event: "content-inspect-error", listener: typeof event_content_inspect_error): void;
    on(event: "image-moderation-connection-state-change", listener: typeof event_image_moderation_connection_state_change): void;
    on(event: string, listener: Function): void;
    join(appid: string, channel: string, token: string | null, uid?: UID | null): Promise<UID>;
    leave(): Promise<void>;
    publish(tracks: ILocalTrack | ILocalTrack[]): Promise<void>;
    publish(config: IDataChannelConfig): Promise<ILocalDataChannel>;
    publish(params: ILocalTrack | ILocalTrack[] | IDataChannelConfig): Promise<ILocalDataChannel | void>;
    unpublish(tracks?: ILocalTrack | ILocalTrack[]): Promise<void>;
    unpublish(dataChannel?: ILocalDataChannel): Promise<void>;
    unpublish(params?: ILocalTrack | ILocalTrack[] | ILocalDataChannel): Promise<void>;
    subscribe(user: IAgoraRTCRemoteUser, mediaType: "video"): Promise<IRemoteVideoTrack>;
    subscribe(user: IAgoraRTCRemoteUser, mediaType: "audio"): Promise<IRemoteAudioTrack>;
    subscribe(user: IAgoraRTCRemoteUser, mediaType: "datachannel", channelId: number): Promise<IRemoteDataChannel>;
    subscribe(user: IAgoraRTCRemoteUser, mediaType: "video" | "audio" | "datachannel", channelId?: number): Promise<IRemoteTrack | IRemoteDataChannel>;
    presubscribe(uid: UID, mediaType: "audio"): Promise<IRemoteAudioTrack>;
    presubscribe(uid: UID, mediaType: "video"): Promise<IRemoteVideoTrack>;
    presubscribe(uid: UID, mediaType: "video" | "audio"): Promise<IRemoteTrack>;
    massSubscribe(subscribeList: {
        user: IAgoraRTCRemoteUser;
        mediaType: "audio" | "video";
    }[]): Promise<{
        user: IAgoraRTCRemoteUser;
        mediaType: "audio" | "video";
        track?: IRemoteTrack;
        error?: AgoraRTCError;
    }[]>;
    unsubscribe(user: IAgoraRTCRemoteUser, mediaType?: "video" | "audio" | "datachannel", channelId?: number): Promise<void>;
    massUnsubscribe(unsubscribeList: {
        user: IAgoraRTCRemoteUser;
        mediaType?: "audio" | "video";
    }[]): Promise<void>;
    setLowStreamParameter(streamParameter: LowStreamParameter): void;
    enableDualStream(): Promise<void>;
    disableDualStream(): Promise<void>;
    setClientRole(role: ClientRole, options?: ClientRoleOptions): Promise<void>;
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
    setLiveTranscoding(config: LiveStreamingTranscodingConfig): Promise<void>;
    startLiveStreaming(url: string, transcodingEnabled?: boolean): Promise<void>;
    stopLiveStreaming(url: string): Promise<void>;
    addInjectStreamUrl(url: string, config: InjectStreamConfig): Promise<void>;
    removeInjectStreamUrl(): Promise<void>;
    startChannelMediaRelay(config: IChannelMediaRelayConfiguration): Promise<void>;
    updateChannelMediaRelay(config: IChannelMediaRelayConfiguration): Promise<void>;
    stopChannelMediaRelay(): Promise<void>;
    sendCustomReportMessage(reports: EventCustomReportParams[] | EventCustomReportParams): Promise<void>;
    getLocalAudioStats(): LocalAudioTrackStats;
    getRemoteAudioStats(): {
        [uid: string]: RemoteAudioTrackStats;
    };
    getRemoteNetworkQuality(): {
        [uid: string]: NetworkQuality;
    };
    getLocalVideoStats(): LocalVideoTrackStats;
    getRemoteVideoStats(): {
        [uid: string]: RemoteVideoTrackStats;
    };
    enableContentInspect(inspectConfig: InspectConfiguration): Promise<void>;
    disableContentInspect(): Promise<void>;
    setImageModeration(enabled: false): Promise<void>;
    setImageModeration(enabled: true, config: ImageModerationConfiguration): Promise<void>;
    setLicense(license: string): void;
    setLocalAccessPointsV2(config: LocalAccessPointConfig): void;
}

declare interface IAgoraRTCError extends Error {
    readonly code: AgoraRTCErrorCode;
    readonly message: string;
    readonly data?: any;
    readonly name: string;
    toString(): string;
    print(level?: "error" | "warning", logger?: any): IAgoraRTCError;
    throw(logger?: any): never;
}

declare interface IAgoraRTCRemoteUser {
    uid: UID;
    audioTrack?: IRemoteAudioTrack;
    videoTrack?: IRemoteVideoTrack;
    hasAudio: boolean;
    hasVideo: boolean;
    dataChannels?: IRemoteDataChannel[];
}

declare interface IChannelMediaRelayConfiguration {
    setSrcChannelInfo(info: ChannelMediaRelayInfo): void;
    addDestChannelInfo(info: ChannelMediaRelayInfo): void;
    removeDestChannelInfo(channelName: string): void;
}

declare interface IDataChannel extends EventEmitter_2 {
    readonly id: number;
    readonly maxRetransmits: number | null;
    readonly ordered: boolean;
    readonly readyState: RTCDataChannelState;
    readonly metadata: string;
    getChannelId(): number;
    getConfig(): IDataChannelConfig;
}

declare interface IDataChannelConfig {
    id: number;
    ordered: boolean;
    metadata: string;
}

declare interface ILocalDataChannel extends IDataChannel {
    send(data: ArrayBuffer): void;
}

declare interface ILocalTrack extends ITrack {
    on(event: "track-ended", listener: typeof event_track_ended): void;
    on(event: "transceiver-updated", listener: typeof event_transceiver_updated): void;
    setEnabled(enabled: boolean): Promise<void>;
    getStats(): LocalVideoTrackStats | LocalAudioTrackStats;
    getTrackLabel(): string;
    setMuted(muted: boolean): Promise<void>;
    close(): void;
    muted: boolean;
    enabled: boolean;
}

declare interface ImageModerationConfiguration {
    interval: number;
    extraInfo?: string;
    vendor?: string;
}

declare enum ImageModerationConnectionState {
    CONNECTING = "CONNECTING",
    RECONNECTING = "RECONNECTING",
    CONNECTED = "CONNECTED",
    CLOSED = "CLOSED"
}

declare interface InjectStreamConfig {
    audioVolume?: number;
    audioBitrate?: number;
    audioChannels?: number;
    audioSampleRate?: number;
    height?: number;
    width?: number;
    videoBitrate?: number;
    videoFramerate?: number;
    videoGop?: number;
}

declare interface InspectConfiguration {
    interval: number;
    ossFilePrefix?: string;
    extraInfo?: string;
    inspectType?: ("supervise" | "moderation")[];
}

declare enum InspectState {
    CONNECTING = "CONNECTING",
    RECONNECTING = "RECONNECTING",
    CONNECTED = "CONNECTED",
    CLOSED = "CLOSED"
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
    getStats(): RemoteAudioTrackStats;
    play(): void;
    setPlaybackDevice(deviceId: string): Promise<void>;
    setAudioFrameCallback(audioFrameCallback: null | ((buffer: AudioBuffer) => void), frameSize?: number): void;
    setVolume(volume: number): void;
    getVolumeLevel(): number;
    pipe(processor: IAudioProcessor): IAudioProcessor;
    unpipe(): void;
    processorDestination: IAudioProcessor;
}

declare interface IRemoteDataChannel extends IDataChannel {
}

declare interface IRemoteTrack extends ITrack {
    on(event: "first-frame-decoded", listener: typeof event_first_frame_decoded): void;
    on(event: "transceiver-updated", listener: typeof event_transceiver_updated_2): void;
    getUserId(): UID;
    getStats(): RemoteAudioTrackStats | RemoteVideoTrackStats;
}

declare interface IRemoteVideoTrack extends IRemoteTrack {
    on(event: "video-state-changed", listener: typeof event_video_state_changed): void;
    on(event: "first-frame-decoded", listener: typeof event_first_frame_decoded): void;
    on(event: "video-element-visible-status", listener: typeof event_video_element_visible_status_2): void;
    on(event: "transceiver-updated", listener: typeof event_transceiver_updated_2): void;
    on(event: "sei-received", listener: typeof event_sei_received): void;
    getStats(): RemoteVideoTrackStats;
    play(element: string | HTMLElement, config?: VideoPlayerConfig): void;
    getCurrentFrameData(): ImageData;
    getVideoElementVisibleStatus(): CheckVideoVisibleResult | undefined;
    pipe(processor: IBaseProcessor): IBaseProcessor;
    unpipe(): void;
    processorDestination: IBaseProcessor;
}

declare function isHlsSupported(): boolean;

declare function isRtcSupported(): boolean;

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
    replaceNewVideoElement(): void;
}

declare interface LiveStreamingTranscodingConfig {
    audioBitrate?: number;
    audioChannels?: 1 | 2 | 3 | 4 | 5;
    audioSampleRate?: 32000 | 44100 | 48000;
    backgroundColor?: number;
    height?: number;
    width?: number;
    lowLatency?: boolean;
    videoBitrate?: number;
    videoCodecProfile?: 66 | 77 | 100;
    videoFrameRate?: number;
    videoGop?: number;
    images?: LiveStreamingTranscodingImage[];
    watermark?: LiveStreamingTranscodingImage;
    backgroundImage?: LiveStreamingTranscodingImage;
    transcodingUsers?: LiveStreamingTranscodingUser[];
    userConfigExtraInfo?: string;
}

declare interface LiveStreamingTranscodingImage {
    url: string;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    alpha?: number;
}

declare interface LiveStreamingTranscodingUser {
    alpha?: number;
    height?: number;
    uid: UID;
    width?: number;
    x?: number;
    y?: number;
    zOrder?: number;
    audioChannel?: number;
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

declare interface LocalAudioTrackStats {
    codecType?: "opus" | "aac" | "PCMU" | "PCMA" | "G722";
    sendVolumeLevel: number;
    sendBitrate: number;
    sendBytes: number;
    sendPackets: number;
    sendPacketsLost: number;
    sendJitterMs: number;
    sendRttMs: number;
    currentPacketLossRate: number;
}

declare interface LocalVideoTrackStats {
    codecType?: "H264" | "H265" | "VP8" | "VP9" | "AV1X" | "AV1";
    sendBytes: number;
    sendFrameRate?: number;
    captureFrameRate?: number;
    sendPackets: number;
    sendPacketsLost: number;
    sendJitterMs: number;
    sendRttMs: number;
    sendResolutionHeight: number;
    sendResolutionWidth: number;
    captureResolutionHeight: number;
    captureResolutionWidth: number;
    encodeDelay?: number;
    sendBitrate: number;
    targetSendBitrate: number;
    totalDuration: number;
    totalFreezeTime: number;
    currentPacketLossRate: number;
}

declare interface LowStreamParameter {
    width: ConstrainULong;
    height: ConstrainULong;
    framerate?: ConstrainULong;
    bitrate?: number;
}

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
    MEDIA_SOURCE_CHANGED = "media-source-changed",
    AUTOPLAY_PREVENTED = "autoplay-prevented",
    ERROR = "error",
    REQUEST_SWITCH_MEDIA_SOURCE = "request-switch-media-source"
}

declare interface RemoteAudioTrackStats {
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

declare enum RemoteStreamFallbackType {
    DISABLE = 0,
    LOW_STREAM = 1,
    AUDIO_ONLY = 2
}

declare enum RemoteStreamType {
    HIGH_STREAM = 0,
    LOW_STREAM = 1
}

declare interface RemoteVideoTrackStats {
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

declare interface RetryConfiguration {
    timeout: number;
    timeoutFactor: number;
    maxRetryCount: number;
    maxRetryTimeout: number;
}

declare class RtcMediaSource extends EventEmitter<RtcSourceEvent | SourceEvent> {
    mode: MediaSource_2.RTC;
    private url;
    element: HTMLVideoElement;
    private rtcConfig;
    rtc: IAgoraRTCClient;
    host?: IAgoraRTCRemoteUser;
    channel?: string;
    uid?: number;
    protected state: RtcSourceState;
    protected videoState: RtcMediaState;
    protected audioState: RtcMediaState;
    protected pendingRemoteUsers: IAgoraRTCRemoteUser[];
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
    protected playRemoteUser(user: IAgoraRTCRemoteUser | undefined): Promise<void>;
    protected onUserJoined: (user: IAgoraRTCRemoteUser) => Promise<void>;
    private onUserLeft;
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
        video: RemoteVideoTrackStats | undefined;
        audio: RemoteAudioTrackStats | undefined;
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
    AUTOPLAY_PREVENTED = "autoplay_was_prevented",
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

export declare enum RtcUserState {
    JOINED = "joined",
    LEFT = "left",
    UNPUBLISHED = "unpublished",
    PUBLISHED = "published"
}

declare interface RTMConfiguration {
    apRTM: boolean;
    rtmFlag: number;
}

declare type SDK_AUDIO_CODEC = keyof typeof AudioCodec;

declare type SDK_CODEC = keyof typeof VideoCodec;

declare type SDK_MODE = "live" | "rtc" | "p2p";

export declare function setLogLevel(level: number): void;

export declare function setParameters(key: keyof typeof VARIABLE_PARAMS, value: any): void;

export declare function setRTCParameters(key: string, value: any): void;

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
};

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
