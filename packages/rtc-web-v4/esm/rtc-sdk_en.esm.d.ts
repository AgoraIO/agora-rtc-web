import { IAudioProcessor } from 'agora-rte-extension';
import type { IAudioProcessorContext } from 'agora-rte-extension';
import { IBaseProcessor } from 'agora-rte-extension';
import { IExtension } from 'agora-rte-extension';
import type { IProcessorContext } from 'agora-rte-extension';
import type { Kind } from 'agora-rte-extension';
import type { ProcessorStats } from 'agora-rte-extension';
import { Usage } from 'agora-rte-extension';
import type { UsageWithDirection } from 'agora-rte-extension';

export declare const __CLIENT_LIST__: AgoraRTCClient[];

export declare const __TRACK_LIST__: Track[];

export declare const AgoraRTC: {
    on(event: "camera-changed", listener: (deviceInfo: DeviceInfo) => void): void;
    on(event: "microphone-changed", listener: (deviceInfo: DeviceInfo) => void): void;
    on(event: "playback-device-changed", listener: (deviceInfo: DeviceInfo) => void): void;
    on(event: "autoplay-failed", listener: () => void): void;
    on(event: "security-policy-violation", listener: Function): void;
    onCameraChanged?: (info: DeviceInfo) => void;
    onMicrophoneChanged?: (info: DeviceInfo) => void;
    onPlaybackDeviceChanged?: (info: DeviceInfo) => void;
    onAudioAutoplayFailed?: () => void;
    onAutoplayFailed?: () => void;
    onSecurityPolicyViolation?: (event: SecurityPolicyViolationEvent) => void;
} & EventEmitter;

declare class AgoraRTCClient extends EventEmitter implements IAgoraRTCClient {
    get connectionState(): ConnectionState;
    get remoteUsers(): AgoraRTCRemoteUser[];
    get localTracks(): LocalTrack[];
    get uid(): undefined | UID;
    get channelName(): undefined | string;
    get localDataChannels(): LocalDataChannel[];
    get mode(): SDK_MODE;
    get role(): ClientRole;
    private store;
    private _uid?;
    private _channelName?;
    private _users;
    private _config;
    private _clientId;
    private _appId?;
    private _key?;
    private _joinInfo?;
    private _gateway;
    private _statsCollector;
    private _configDistribute;
    private _leaveMutex;
    private _publishMutex;
    private _renewTokenMutex;
    private _subscribeMutex;
    private _encryptionMode;
    private _encryptionSecret;
    private _encryptionSalt;
    private _proxyServer?;
    private _turnServer;
    private _cloudProxyServerMode;
    private _lowStreamParameter?;
    private _streamFallbackTypeCacheMap;
    private _remoteStreamTypeCacheMap;
    private _axiosCancelSource;
    private _audioVolumeIndicationInterval?;
    private _networkQualityInterval?;
    private _userOfflineTimeout?;
    private _streamRemovedTimeout?;
    private _injectStreamingClient?;
    private _liveTranscodeStreamingClient?;
    private _liveRawStreamingClient?;
    private _channelMediaRelayClient?;
    private _networkQualitySensitivity;
    private _p2pChannel;
    private _useLocalAccessPoint;
    private _setLocalAPVersion?;
    private _joinAndNotLeaveYet;
    private _numberOfJoinCount;
    private _remoteDefaultVideoStreamType?;
    private _inspect?;
    private _moderation?;
    private _license?;
    private _pendingPublishedUsers;
    ntpAlignErrorCount: number;
    remoteInboundOffset: number;
    private get codec();
    private get audioCodec();
    private get isStringUID();
    get __className__(): string;
    constructor(config: ClientConfig);
    joinMeta(appId: string, channel: string, token: string | null, uid?: UID | null, optionalInfo?: string, use443PortOnly?: boolean, useDualDomain?: boolean): Promise<UID>;
    join(appId: string, channel: string, token: string | null, uid?: UID | null, optionalInfo?: string): Promise<UID>;
    private _joinGateway;
    leave(): Promise<void>;
    publish(config: IDataChannelConfig): Promise<LocalDataChannel>;
    publish(tracks: LocalTrack | LocalTrack[], isUserAction?: boolean): Promise<void>;
    private _publishDataChannel;
    unpublish(datachannel?: LocalDataChannel): Promise<void>;
    unpublish(tracks?: LocalTrack | LocalTrack[]): Promise<void>;
    private _unpublishDataChannel;
    subscribe(user: AgoraRTCRemoteUser, mediaType: "audio"): Promise<RemoteAudioTrack>;
    subscribe(user: AgoraRTCRemoteUser, mediaType: "video"): Promise<RemoteVideoTrack>;
    subscribe(user: AgoraRTCRemoteUser, mediaType: "datachannel", channelId: number): Promise<RemoteDataChannel>;
    private _subscribeDataChannel;
    private _p2pSubscribe;
    private _subscribe;
    massSubscribe(subscribeList: {
        user: AgoraRTCRemoteUser;
        mediaType: "audio" | "video";
    }[]): Promise<{
        user: AgoraRTCRemoteUser;
        mediaType: "audio" | "video";
        track?: RemoteTrack;
        error?: AgoraRTCError;
    }[]>;
    unsubscribe(user: AgoraRTCRemoteUser, mediaType?: "audio" | "video" | "datachannel", channelId?: number): Promise<void>;
    private _unsubscribeDataChannel;
    massUnsubscribe(unsubscribeList: {
        user: AgoraRTCRemoteUser;
        mediaType?: "audio" | "video";
    }[]): Promise<void>;
    setLowStreamParameter(streamParameter: LowStreamParameter): Promise<void>;
    enableDualStream(): Promise<void>;
    disableDualStream(): Promise<void>;
    setClientRole(role: ClientRole, options?: ClientRoleOptions): Promise<void>;
    getRemoteInboundOffset(): number;
    getNtpWallTimeInMs(): number;
    setProxyServer(proxyServer: string, initializeCall?: boolean): void;
    setTurnServer(turnServers: TurnServerConfig | TurnServerConfig[] | RTCIceServer[], initializeCall?: boolean): void;
    setLicense(license: string): void;
    startProxyServer(mode?: number): void;
    stopProxyServer(): void;
    setLocalAccessPointsV2(config: LocalAccessPointConfig): void;
    setLocalAccessPoints(serverList: string[], domain: string): void;
    setRemoteDefaultVideoStreamType(streamType: RemoteStreamType): Promise<void>;
    setRemoteVideoStreamType(uid: UID, streamType: RemoteStreamType): Promise<void>;
    setStreamFallbackOption(uid: UID, fallbackType: RemoteStreamFallbackType): Promise<void>;
    setEncryptionConfig(encryptionMode: EncryptionMode, secret: string, salt?: Uint8Array): void;
    renewToken(token: string): Promise<void>;
    enableAudioVolumeIndicator(): void;
    getRTCStats(): AgoraRTCStats;
    startLiveStreaming(url: string, isTranscoding?: boolean): Promise<void>;
    setLiveTranscoding(config: LiveStreamingTranscodingConfig): Promise<void>;
    stopLiveStreaming(url: string): Promise<void>;
    addInjectStreamUrl(url: string, config: InjectStreamConfig): Promise<void>;
    removeInjectStreamUrl(): Promise<void>;
    startChannelMediaRelay(config: ChannelMediaRelayConfiguration): Promise<void>;
    updateChannelMediaRelay(config: ChannelMediaRelayConfiguration): Promise<void>;
    stopChannelMediaRelay(): Promise<void>;
    sendStreamMessage(message: SendDataStreamMessage, needRetry?: boolean): Promise<void>;
    sendMetadata(metadata: Uint8Array): Promise<void>;
    sendCustomReportMessage(params: EventCustomReportParams | EventCustomReportParams[]): Promise<void>;
    getLocalAudioStats(): LocalAudioTrackStats;
    getRemoteAudioStats(): {
        [uid: string]: RemoteAudioTrackStats;
    };
    getLocalVideoStats(): LocalVideoTrackStats;
    getRemoteVideoStats(): {
        [uid: string]: RemoteVideoTrackStats;
    };
    getRemoteNetworkQuality(): {
        [uid: string]: NetworkQuality;
    };
    pickSVCLayer(uid: UID, layerOptions: {
        spatialLayer: 0 | 1 | 2 | 3;
        temporalLayer: 0 | 1 | 2 | 3;
    }): Promise<void>;
    setRTM2Flag(flag: number): Promise<void>;
    private _reset;
    private _startSession;
    private _publishHighStream;
    private _publishLowStream;
    private _createLiveStreamingClient;
    private _createChannelMediaRelayClient;
    private _handleLocalTrackEnable;
    private _handleLocalTrackDisable;
    private _handleUserOnline;
    private _handleUserOffline;
    private _handleUpdateDataChannel;
    private _handleAddAudioOrVideoStream;
    private _handleRemoveStream;
    private _handleRemoveDataChannels;
    private _handleSetStreamLocalEnable;
    private _handleMuteStream;
    private _handleP2PLost;
    private _handleTokenWillExpire;
    private _handleBeforeUnload;
    private _handleUpdateNetworkQuality;
    private _handleGatewayEvents;
    private _handleGatewaySignalEvents;
    private _handleP2PAddAudioOrVideoStream;
    private _handleP2PEvents;
    private _handleP2PChannelEvents;
    getKeyMetrics(): KeyMetrics;
    enableContentInspect(inspectConfig: InspectConfiguration): Promise<void>;
    disableContentInspect(): Promise<void>;
    setImageModeration(enabled: boolean, config?: ImageModerationConfiguration): Promise<void>;
    private handleImageModerationEvents;
    private handleVideoInspectEvents;
    getJoinChannelServiceRecords(): JoinChannelServiceRecord[];
    setPublishAudioFilterEnabled(enabled: boolean): Promise<void>;
    private _handleResetAddStream;
}

/**
 * @ignore
 */
declare class AgoraRTCError extends AgoraRTCError_2 {
    readonly name: string;
    constructor(code: AgoraRTCErrorCode, message?: string, data?: any);
    print(level?: "error" | "warning"): AgoraRTCError;
    throw(): never;
}

/**
 * @ignore
 */
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

/**
 * @ignore
 */
export declare enum AgoraRTCErrorCode {
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
    DATACHANNEL_CONNECTION_TIMEOUT = "DATACHANNEL_CONNECTION_TIMEOUT",
    PROHIBITED_OPERATION = "PROHIBITED_OPERATION",
    IMAGE_MODERATION_UPLOAD_FAILED = "IMAGE_MODERATION_UPLOAD_FAILED"
}


declare class AgoraRTCRemoteUser implements IAgoraRTCRemoteUser {
    uid: UID;
    _uintid: number;
    _trust_audio_enabled_state_: boolean;
    _trust_video_enabled_state_: boolean;
    _trust_audio_mute_state_: boolean;
    _trust_video_mute_state_: boolean;
    _audio_muted_: boolean;
    _video_muted_: boolean;
    _audio_enabled_: boolean;
    _video_enabled_: boolean;
    _audio_added_: boolean;
    _video_added_: boolean;
    _trust_video_stream_added_state_: boolean;
    _trust_audio_stream_added_state_: boolean;
    get hasVideo(): boolean;
    get hasAudio(): boolean;
    get audioTrack(): undefined | RemoteAudioTrack;
    get videoTrack(): undefined | RemoteVideoTrack;
    get dataChannels(): RemoteDataChannel[];
    constructor(uid: UID, uintid: number);
}

/**
 * Statistics of the call, which can be retrieved by calling [AgoraRTCClient.getRTCStats]{@link IAgoraRTCClient.getRTCStats}.
 */
export declare interface AgoraRTCStats {
    /**
     * Call duration in seconds.
     */
    Duration: number;
    /**
     * The total bitrate (bps) of the received audio and video, represented by an instantaneous value.
     */
    RecvBitrate: number;
    /**
     * The total number of bytes received, represented by an aggregate value.
     */
    RecvBytes: number;
    /**
     * The total bitrate (bps) of the sent audio and video, represented by an instantaneous value.
     */
    SendBitrate: number;
    /**
     * The total number of bytes sent, represented by an aggregate value.
     */
    SendBytes: number;
    /**
     * The number of users in the channel.
     *
     * - Communication profile: The number of users in the channel.
     * - Live Broadcast profile:
     *   - If the local user is an audience: The number of users in the channel = The number of hosts in the channel + 1.
     *   - If the local user is a host: The number of users in the channel = The number of hosts in the channel.
     */
    UserCount: number;
    /**
     * RTT (Round-Trip Time) between the SDK and Agora's edge server, in ms.
     */
    RTT: number;
    /**
     * The estimated bandwidth (Kbps) of the uplink network.
     */
    OutgoingAvailableBandwidth: number;
}

declare enum AppType {
    APP_TYPE_INVALID_VALUE = -1,
    APP_TYPE_NATIVE = 0,
    APP_TYPE_NATIVE_COCOS = 1,
    APP_TYPE_NATIVE_UNITY = 2,
    APP_TYPE_NATIVE_ELECTRON = 3,
    APP_TYPE_NATIVE_FLUTTER = 4,
    APP_TYPE_NATIVE_UNREAL = 5,
    APP_TYPE_NATIVE_XAMARIN = 6,
    APP_TYPE_NATIVE_API_CLOUD = 7,
    APP_TYPE_NATIVE_REACT_NATIVE = 8,
    APP_TYPE_NATIVE_PYTHON = 9,
    APP_TYPE_NATIVE_COCOS_CREATOR = 10,
    APP_TYPE_NATIVE_RUST = 11,
    APP_TYPE_NATIVE_C_SHARP = 12,
    APP_TYPE_NATIVE_CEF = 13,
    APP_TYPE_NATIVE_UNI_APP = 14,
    APP_TYPE_WEBRTC = 1000,
    APP_TYPE_WEBRTC_REACT = 1001,
    APP_TYPE_WEBRTC_VUE = 1002,
    APP_TYPE_WEBRTC_ANGULAR = 1003
}

/**
 * Regions for the connection. Used for calling [AgoraRTC.setArea]{@link IAgoraRTC.setArea}.
 */
export declare enum AREAS {
    /**
     * China.
     */
    CHINA = "CHINA",
    /**
     * Asia, excluding Mainland China.
     */
    ASIA = "ASIA",
    /**
     * North America.
     */
    NORTH_AMERICA = "NORTH_AMERICA",
    /**
     * Europe.
     */
    EUROPE = "EUROPE",
    /**
     * Japan.
     */
    JAPAN = "JAPAN",
    /**
     * India.
     */
    INDIA = "INDIA",
    /**
     * @ignore
     */
    KOREA = "KOREA",
    /**
     * @ignore
     */
    HKMC = "HKMC",
    /**
     * @ignore
     */
    US = "US",
    /**
     * @ignore
     */
    OCEANIA = "OCEANIA",
    /**
     * @ignore
     */
    SOUTH_AMERICA = "SOUTH_AMERICA",
    /**
     * @ignore
     */
    AFRICA = "AFRICA",
    /**
     * @ignore
     */
    OVERSEA = "OVERSEA",
    /**
     * Global.
     */
    GLOBAL = "GLOBAL",
    /**
     * @ignore
     */
    EXTENSIONS = "EXTENSIONS"
}

/**
 *
 * The latency level of an audience member in a live interactive streaming. Takes effect only when the user role is `"audience"`.
 * - `1`: Low latency.
 * - `2`: (Default) Ultra low latency.
 */
export declare enum AudienceLatencyLevelType {
    /**
     * Low latency.
     */
    AUDIENCE_LEVEL_LOW_LATENCY = 1,
    /**
     * Ultra-low latency.
     */
    AUDIENCE_LEVEL_ULTRA_LOW_LATENCY = 2,
    /**
     * @ignore
     */
    AUDIENCE_LEVEL_SYNC_LATENCY = 3
}

/**
 * @ignore
 */
declare const AUDIO_ENCODER_CONFIG_SETTINGS: {
    speech_low_quality: AudioEncoderConfiguration;
    speech_standard: AudioEncoderConfiguration;
    music_standard: AudioEncoderConfiguration;
    standard_stereo: AudioEncoderConfiguration;
    high_quality: AudioEncoderConfiguration;
    high_quality_stereo: AudioEncoderConfiguration;
};

declare class AudioBufferSource extends AudioSource {
    private audioBuffer;
    protected sourceNode?: AudioBufferSourceNode;
    private startPlayTime;
    private startPlayOffset;
    private pausePlayTime;
    private options;
    private currentLoopCount;
    private currentPlaybackSpeed;
    set currentState(state: AudioSourceState);
    get currentState(): AudioSourceState;
    private _currentState;
    constructor(buffer: AudioBuffer, options?: AudioSourceOptions);
    createWebAudioDiagram(): GainNode;
    get duration(): number;
    get playbackSpeed(): number;
    get currentTime(): number;
    updateOptions(options: AudioSourceOptions): void;
    startProcessAudioBuffer(): void;
    pauseProcessAudioBuffer(): void;
    seekAudioBuffer(time: number): void;
    resumeProcessAudioBuffer(): void;
    stopProcessAudioBuffer(): void;
    destroy(): void;
    setAudioBufferPlaybackSpeed(speed: number): void;
    private startSourceNode;
    private createSourceNode;
    private handleSourceNodeEnded;
    private reset;
}

declare class AudioElementPlayCenter {
    onAutoplayFailed?: () => void;
    private elementMap;
    private elementStateMap;
    private elementsNeedToResume;
    private sinkIdMap;
    constructor();
    setSinkID(trackId: string, deviceID: string): Promise<void>;
    play(track: MediaStreamTrack, trackId: string, volume: number, sessionId?: string): void;
    updateTrack(trackId: string, track: MediaStreamTrack): void;
    isPlaying(trackId: string): boolean;
    setVolume(trackId: string, volume: number): void;
    stop(trackId: string): void;
    private bindAudioElementEvents;
    getPlayerState(trackId: string): string;
    private autoResumeAudioElement;
    private autoResumeAfterInterruption;
    private autoResumeAfterInterruptionOnIOS15_16;
}

export declare const audioElementPlayCenter: AudioElementPlayCenter;

/**
 *
 * `AudioEncoderConfiguration` is the interface that defines the audio encoder configurations.
 *
 * You can customize the audio encoder configurations when calling [AgoraRTC.createCustomAudioTrack]{@link IAgoraRTC.createCustomAudioTrack}, [AgoraRTC.createMicrophoneAudioTrack]{@link IAgoraRTC.createMicrophoneAudioTrack} or [AgoraRTC.createBufferSourceAudioTrack]{@link IAgoraRTC.createBufferSourceAudioTrack}.
 */
export declare interface AudioEncoderConfiguration {
    /**
     * Sample rate of the audio (Hz).
     */
    sampleRate?: number;
    /**
     * Sample size of the audio.
     */
    sampleSize?: number;
    /**
     * Whether to enable stereo.
     */
    stereo?: boolean;
    /**
     * Bitrate of the audio (Kbps).
     */
    bitrate?: number;
}

/**
 * The preset audio encoder configurations.
 *
 * You can pass the preset video encoder configurations when calling the following methods:
 * - [AgoraRTC.createCustomAudioTrack]{@link IAgoraRTC.createCustomAudioTrack}
 * - [AgoraRTC.createMicrophoneAudioTrack]{@link IAgoraRTC.createMicrophoneAudioTrack}
 * - [AgoraRTC.createBufferSourceAudioTrack]{@link IAgoraRTC.createBufferSourceAudioTrack}
 *
 * The following table lists all the preset audio profiles. The SDK uses `"music_standard"` by default.
 *
 * | Audio Profile | Configurations |
 * | -------- | --------------- |
 * |`"speech_low_quality"`|Sample rate 16 kHz, mono, encoding rate 24 Kbps|
 * |`"speech_standard"`|Sample rate 32 kHz, mono, encoding rate 24 Kbps|
 * |`"music_standard"`|Sample rate 48 kHz, mono, encoding rate 40 Kbps|
 * |`"standard_stereo"`|Sample rate 48 kHz, stereo, encoding rate 64 Kbps|
 * |`"high_quality"`|Sample rate 48 kHz, mono, encoding rate 128 Kbps|
 * |`"high_quality_stereo"`|Sample rate 48 kHz, stereo, encoding rate 192 Kbps| Kbps.
 * @public
 */
export declare type AudioEncoderConfigurationPreset = keyof typeof AUDIO_ENCODER_CONFIG_SETTINGS;

declare class AudioProcessorContext extends EventEmitter implements IAudioProcessorContext {
    private constraintsMap;
    private statsRegistry;
    private readonly audioContext;
    private readonly trackId;
    private readonly direction;
    private usageRegistry;
    private _chained;
    set chained(chained: boolean);
    get chained(): boolean;
    constructor(audioContext: AudioContext, trackId: string, direction: "local" | "remote");
    getConstraints(): Promise<MediaTrackConstraints>;
    getAudioContext(): AudioContext;
    requestApplyConstraints(constraints: MediaTrackConstraints, processor: IBaseProcessor): Promise<void>;
    requestRevertConstraints(processor: IBaseProcessor): Promise<void>;
    registerStats(processor: IBaseProcessor, type: string, cb: () => any): void;
    unregisterStats(processor: IBaseProcessor, type: string): void;
    gatherStats(): ProcessorStats[];
    registerUsage(processor: IBaseProcessor, cb: () => Usage): void;
    unregisterUsage(processor: IBaseProcessor): void;
    gatherUsage(): Promise<UsageWithDirection[]>;
    getDirection(): "local" | "remote";
}

declare class AudioProcessorDestination extends EventEmitter implements IAudioProcessor {
    name: string;
    ID: string;
    private inputTrack?;
    private inputNode?;
    private readonly audioProcessorContext;
    _source?: IAudioProcessor;
    constructor(audioProcessorContext: AudioProcessorContext);
    get kind(): Kind;
    get enabled(): boolean;
    pipe(): IAudioProcessor;
    unpipe(): void;
    enable(): void;
    disable(): void;
    reset(): void;
    updateInput(inputOptions: {
        track?: MediaStreamTrack;
        node?: AudioNode;
        context: IAudioProcessorContext;
    }): void;
}

declare abstract class AudioSource extends EventEmitter {
    outputNode: GainNode;
    outputTrack?: MediaStreamTrack;
    isPlayed: boolean;
    protected abstract sourceNode?: AudioNode;
    context: AudioContext;
    private audioBufferNode?;
    private destNode?;
    private audioOutputLevel;
    protected volumeLevelAnalyser: VolumeLevelAnalyser;
    private _processedNode;
    get processSourceNode(): AudioNode | undefined;
    set processedNode(node: AudioNode | undefined);
    get processedNode(): AudioNode | undefined;
    protected playNode: AudioNode;
    protected isDestroyed: boolean;
    protected onNoAudioInput?: () => void;
    protected isNoAudioInput: boolean;
    private _noAudioInputCount;
    constructor();
    startGetAudioBuffer(bufferSize: number): void;
    stopGetAudioBuffer(): void;
    createOutputTrack(): MediaStreamTrack;
    play(dest?: AudioNode): void;
    stop(): void;
    getAccurateVolumeLevel(): number;
    checkHasAudioInput(times?: number): Promise<boolean>;
    getAudioVolume(): number;
    setVolume(level: number): void;
    destroy(): void;
    protected disconnect(): void;
    protected connect(): void;
}

/**
 * Options for processing the audio buffer. You need to set the options for processing the audio buffer when calling [startProcessAudioBuffer]{@link IBufferSourceAudioTrack.startProcessAudioBuffer}.
 */
export declare interface AudioSourceOptions {
    /**
     * How many times the audio loops.
     */
    cycle?: number;
    /**
     * Whether to loop the audio infinitely.
     */
    loop?: boolean;
    /**
     * The playback position (seconds).
     */
    startPlayTime?: number;
}

/**
 * Processing state of the audio buffer:
 * - `"stopped"`: The SDK stops processing the audio buffer. Reasons may include:
 *  - The SDK finishes processing the audio buffer.
 *  - The user manually stops the processing of the audio buffer.
 * - `"playing"`: The SDK is processing the audio buffer.
 * - `"paused"`: The SDK pauses processing the audio buffer.
 *
 * You can get the state with [BufferSourceAudioTrack.on("source-state-change")]{@link IBufferSourceAudioTrack.event_source_state_change}.
 */
export declare type AudioSourceState = "stopped" | "playing" | "paused";

declare class AudioTrackSource extends AudioSource {
    protected sourceNode: MediaStreamAudioSourceNode;
    track: MediaStreamTrack;
    clonedTrack?: MediaStreamTrack;
    private audioElement;
    private isCurrentTrackCloned;
    private isRemoteTrack;
    private originVolumeLevelAnalyser?;
    get isFreeze(): boolean;
    constructor(track: MediaStreamTrack, isRemoteTrack?: boolean, originTrack?: MediaStreamTrack);
    private rebuildWebAudio;
    updateTrack(track: MediaStreamTrack): void;
    destroy(): void;
    createMediaStreamSourceNode(track: MediaStreamTrack): MediaStreamAudioSourceNode;
    updateOriginTrack(originTrack: MediaStreamTrack): void;
    getOriginVolumeLevel(): number;
}

/**
 * @ignore
 *
 * Image enhancement options. You need to set the image enhancement options when calling [setBeautyEffect]{@link ILocalVideoTrack.setBeautyEffect}.
 */
export declare interface BeautyEffectOptions {
    /**
     *
     * The smoothness level.
     *
     * The value range is [0.0, 1.0]. The original smoothness level is 0.0. The default value is 0.5. This parameter is usually used to remove blemishes.
     */
    smoothnessLevel?: number;
    /**
     * The brightness level.
     *
     * The value range is [0.0, 1.0]. The original brightness level is 0.0. The default value is 0.7.
     */
    lighteningLevel?: number;
    /**
     * The redness level.
     *
     * The value range is [0.0, 1.0]. The original redness level is 0.0. The default value is 0.1. This parameter adjusts the red saturation level.
     */
    rednessLevel?: number;
    /**
     * The contrast level. Use this together with {@link lighteningLevel}.
     * - 0: Low contrast level.
     * - 1: (Default) The original contrast level.
     * - 2: High contrast level.
     */
    lighteningContrastLevel?: 0 | 1 | 2;
}

declare class BufferSourceAudioTrack extends LocalAudioTrack implements IBufferSourceAudioTrack {
    source: string | File | AudioBuffer | null;
    private _bufferSource;
    get __className__(): string;
    constructor(source: string | File | AudioBuffer, bufferSource: AudioBufferSource, encodingConfig?: AudioEncoderConfiguration, trackId?: string);
    get currentState(): AudioSourceState;
    get duration(): number;
    get playbackSpeed(): number;
    getCurrentTime(): number;
    startProcessAudioBuffer(options?: AudioSourceOptions): void;
    pauseProcessAudioBuffer(): void;
    seekAudioBuffer(time: number): void;
    resumeProcessAudioBuffer(): void;
    stopProcessAudioBuffer(): void;
    close(): void;
    setAudioBufferPlaybackSpeed(speed: number): void;
}

/**
 * Configurations for the audio track from an audio file or `AudioBuffer` object. Set these configurations when calling [AgoraRTC.createBufferSourceAudioTrack]{@link IAgoraRTC.createBufferSourceAudioTrack}.
 */
export declare interface BufferSourceAudioTrackInitConfig {
    /**
     * The type of the audio source:
     * - `File`: An [File](https://developer.mozilla.org/en-US/docs/Web/API/File) object, representing a local audio file.
     * - `string`: The online audio file retrieved from an HTTPS address. Ensure the address supports HTTPS and CORS.
     * - `AudioBuffer`: An [AudioBuffer](https://developer.mozilla.org/en-US/docs/Web/API/AudioBuffer) object, representing the raw data in PCM format.
     */
    source: File | string | AudioBuffer;
    /**
     * Whether to cache the online file:
     * - `true`: Cache the online file.
     * - `false`: (default) Do not cache the online file.
     */
    cacheOnlineFile?: boolean;
    /**
     * The audio encoder configurations.
     *
     * You can set the audio encoder configurations in either of the following ways:
     * - Pass the preset audio encoder configurations by using [[AudioEncoderConfigurationPreset]].
     * - Pass your customized audio encoder configurations by using [[AudioEncoderConfiguration]].
     *
     * > Firefox does not support setting the audio encoding rate.
     */
    encoderConfig?: AudioEncoderConfiguration | AudioEncoderConfigurationPreset;
}

export declare const BUILD: string;

declare class CameraVideoTrack extends LocalVideoTrack implements ICameraVideoTrack {
    private _config;
    private _originalConstraints;
    private _constraints;
    _enabled: boolean;
    _deviceName: string;
    get __className__(): string;
    constructor(track: MediaStreamTrack, config: CameraVideoTrackInitConfig, constraints: MediaTrackConstraints, scalabilityConfig?: SVCConfiguration, optimizationMode?: "motion" | "detail" | "balanced", trackId?: string);
    setDevice(deviceId: string | RequiredOnlyOneOf<{
        facingMode: VideoFacingModeEnum;
        deviceId: string;
    }>): Promise<void>;
    private _setDeviceById;
    private _setDeviceByFacingModel;
    setEnabled(enabled: boolean, skipChangeState?: boolean): Promise<void>;
    setEncoderConfiguration(config: VideoEncoderConfiguration | VideoEncoderConfigurationPreset, doNotRenegoation?: boolean): Promise<void>;
    protected _getDefaultPlayerConfig(): Partial<PlayerConfig>;
    protected onTrackEnded(): void;
    renewMediaStreamTrack(newConstraints?: MediaTrackConstraints): Promise<void>;
    tryResumeVideoForIOS15_16WeChat: () => Promise<void>;
    close(): void;
    clone(config?: VideoEncoderConfiguration | VideoEncoderConfigurationPreset, cloneTrack?: boolean): CameraVideoTrack;
    bindProcessorContextEvents(): void;
}

/**
 * Configurations for the video track from the video captured by a camera. Set these configurations when calling [AgoraRTC.createCameraVideoTrack]{@link IAgoraRTC.createCameraVideoTrack}.
 */
export declare interface CameraVideoTrackInitConfig {
    /**
     * The video encoder configurations.
     *
     * You can set the video encoder configurations in either of the following ways:
     * - Pass the preset video encoder configurations by using [[VideoEncoderConfigurationPreset]].
     * - Pass your customized video encoder configurations by using [[VideoEncoderConfiguration]].
     */
    encoderConfig?: VideoEncoderConfiguration | VideoEncoderConfigurationPreset;
    /**
     * Whether to user the front camera or the rear camera.
     *
     * You can use this parameter to choose between the front camera and the rear camera on a mobile device:
     * - `"user"`: The front camera.
     * - `"environment"`: The rear camera.
     */
    facingMode?: VideoFacingModeEnum;
    /**
     * Specifies the camera ID.
     *
     * You can get a list of the available cameras by calling [AgoraRTC.getCameras]{@link IAgoraRTC.getCameras}.
     */
    cameraId?: string;
    /**
     * **Since**
     * <br>&emsp;&emsp;&emsp;*4.0.0*
     *
     * Transmission optimization mode. Whether to prioritize video quality or smoothness:
     * - `"detail"`: Prioritizes video quality.
     *   - The SDK ensures high-quality images by automatically calculating a minimum bitrate based on the capturing resolution and frame rate. No matter how poor the network condition is, the sending bitrate will never be lower than the minimum value.
     *   - In most cases, the SDK does not reduce the sending resolution, but may reduce the frame rate.
     * -  `"motion"`: Prioritizes video smoothness.
     *   - In poor network conditions, the SDK reduces the sending bitrate to minimize video freezes.
     *   - In most cases, the SDK does not reduce the frame rate, but may reduce the sending resolution.
     * - Empty: Uses the default transmission optimization mode. The SDK may reduce the frame rate or the sending resolution in poor network conditions.
     *
     * > Note: This method is only supported on Chrome.
     */
    optimizationMode?: "motion" | "detail";
    /**
     * @ignore
     *
     * **Since**
     * <br>&emsp;&emsp;&emsp;*4.18.0*
     *
     * Configurations for Scalable Video Coding (SVC).
     *
     * You can set the configurations using one of the following options:
     * - Use the preset SVC configurations provided by the SDK through {@link SVCConfigurationPreset}.
     * - Use your custom SVC configurations through {@link SVCConfiguration}.
     */
    scalabiltyMode?: SVCConfiguration | SVCConfigurationPreset;
}

declare class ChannelMediaRelayConfiguration implements IChannelMediaRelayConfiguration {
    private destChannelMediaInfos;
    private srcChannelMediaInfo?;
    setSrcChannelInfo(info: ChannelMediaRelayInfo): void;
    addDestChannelInfo(info: ChannelMediaRelayInfo): void;
    removeDestChannelInfo(channelName: string): void;
}

/**
 * The error code of the media stream relay. You can get the code through [AgoraRTCClient.on("channel-media-relay-state")]{@link IAgoraRTCClient.event_channel_media_relay_state}.
 */
export declare enum ChannelMediaRelayError {
    /**
     * No error.
     */
    RELAY_OK = "RELAY_OK",
    /**
     * The SDK disconnects from the relay service.
     */
    SERVER_CONNECTION_LOST = "SERVER_CONNECTION_LOST",
    /**
     * The token of the source channel has expired.
     */
    SRC_TOKEN_EXPIRED = "SRC_TOKEN_EXPIRED",
    /**
     * The token of the destination channel has expired.
     */
    DEST_TOKEN_EXPIRED = "DEST_TOKEN_EXPIRED"
}

/**
 * Events during the media stream relay. You can get the event through [AgoraRTCClient.on("channel-media-relay-event")]{@link IAgoraRTCClient.event_channel_media_relay_event}.
 */
export declare enum ChannelMediaRelayEvent {
    /**
     * The user disconnects from the server due to a poor network connection.
     */
    NETWORK_DISCONNECTED = "NETWORK_DISCONNECTED",
    /**
     * The user is connected to the server.
     */
    NETWORK_CONNECTED = "NETWORK_CONNECTED",
    /**
     * The user joins the source channel.
     */
    PACKET_JOINED_SRC_CHANNEL = "PACKET_JOINED_SRC_CHANNEL",
    /**
     * The user joins the destination channel.
     */
    PACKET_JOINED_DEST_CHANNEL = "PACKET_JOINED_DEST_CHANNEL",
    /**
     * The SDK starts relaying the media stream to the destination channel.
     */
    PACKET_SENT_TO_DEST_CHANNEL = "PACKET_SENT_TO_DEST_CHANNEL",
    /**
     * The server receives the video stream from the source channel.
     */
    PACKET_RECEIVED_VIDEO_FROM_SRC = "PACKET_RECEIVED_VIDEO_FROM_SRC",
    /**
     * The server receives the audio stream from the source channel.
     */
    PACKET_RECEIVED_AUDIO_FROM_SRC = "PACKET_RECEIVED_AUDIO_FROM_SRC",
    /**
     * The destination channel is updated.
     */
    PACKET_UPDATE_DEST_CHANNEL = "PACKET_UPDATE_DEST_CHANNEL",
    /**
     * Fails to update the destination channel due to an internal error.
     */
    PACKET_UPDATE_DEST_CHANNEL_REFUSED = "PACKET_UPDATE_DEST_CHANNEL_REFUSED",
    /**
     * The destination channel is not updated.
     */
    PACKET_UPDATE_DEST_CHANNEL_NOT_CHANGE = "PACKET_UPDATE_DEST_CHANNEL_NOT_CHANGE"
}

/**
 * Channel information in the media relay, used in [ChannelMediaRelayConfiguration]{@link IChannelMediaRelayConfiguration}.
 */
export declare interface ChannelMediaRelayInfo {
    /**
     * The channel name.
     */
    channelName: string;
    /**
     * The token generated with the `channelName` and `uid`. Do not set this parameter if you have not enabled token.
     * The token for authentication. Do not set this parameter if you have not enabled token authentication.
     *
     * - When you set the information of the source channel, the token is generated with 0 and the source channel name.
     * - When you set the information of the destination channel, the token is generated with `uid` and the destination channel name.
     */
    token?: string;
    /**
     * The unique ID to identify the relay stream.
     *
     * A 32-bit unsigned integer with a value ranging from 0 to (2<sup>32</sup>-1). If you set it as `0`, the server assigns a random one.
     *
     * When used for the source channel, it is the ID to identify the relay stream in the source channel.
     *
     * When used for the destination channel, it is the ID to identify the relay stream in the destination channel. To avoid UID conflicts, this value must be different from any other user IDs in the destination channel.
     * - When you set the information of the source channel, set `uid` as the ID of the host whose stream is relayed.
     * - When you set the information of the destination channel, you can set `uid` as `0` (the server assigns a random one) or a 32-bit unsigned integer with a value ranging from 0 to (2<sup>32</sup>-1). To avoid UID conflicts, this value must be different from any other user IDs in the destination channel.
     */
    uid: number;
}

/**
 * The state code of the media stream relay. You can get the code through [AgoraRTCClient.on("channel-media-relay-state")]{@link IAgoraRTCClient.event_channel_media_relay_state}.
 */
export declare enum ChannelMediaRelayState {
    /**
     * The SDK is initialized, but has not started the media stream relay service.
     */
    RELAY_STATE_IDLE = "RELAY_STATE_IDLE",
    /**
     * The SDK is connecting to the media stream relay service.
     */
    RELAY_STATE_CONNECTING = "RELAY_STATE_CONNECTING",
    /**
     * The SDK successfully relays the media stream to the destination channel.
     */
    RELAY_STATE_RUNNING = "RELAY_STATE_RUNNING",
    /**
     * An error occurs in the media stream relay. See {@link ChannelMediaRelayError} for the error code.
     */
    RELAY_STATE_FAILURE = "RELAY_STATE_FAILURE"
}

export declare function checkAudioTrackIsActive(track: LocalAudioTrack | RemoteAudioTrack, timeout?: number): Promise<boolean>;

export declare function checkSystemRequirements(): boolean;

export declare function checkVideoTrackIsActive(track: LocalVideoTrack | RemoteVideoTrack, timeout?: number): Promise<boolean>;

/**
 * The visibility of the `<video>` tag.
 *
 * Get the visibility of the `<video>` tag through the following methods and events:
 * - [localVideoTrack.on("video-element-visible-status")]{@link ILocalVideoTrack.event_video_element_visible_status}
 * - [localVideoTrack.getVideoElementVisibleStatus]{@link ILocalVideoTrack.getVideoElementVisibleStatus}
 * - [remoteVideoTrack.on("video-element-visible-status")]{@link IRemoteVideoTrack.event_video_element_visible_status}
 * - [remoteVideoTrack.getVideoElementVisibleStatus]{@link IRemoteVideoTrack.getVideoElementVisibleStatus}
 *
 * This object contains the following parameters:
 * - `visible`: Boolean, whether the `<video>` tag is visible or not.
 * - `reason`: This parameter is only valid when `visible` is `false`, which indicates the reason:
 *    - `"SIZE"`: The size of `<video>` is too small to see.
 *    - `"STYLE"`: The CSS styles of `<video>` or its ancestor element cause `<video>` to be invisible.
 *    - `"POSITION"`: The `<video>` tag or its ancestor element are positioned outside the viewport.
 *    - `"COVERED"`: The `<video>` tag is covered by other elements.
 */
declare type CheckVideoVisibleResult = CheckVisibleResult;

/**
 * @ignore
 */
declare type CheckVisibleResult = VisibleResultInner | VisibleHiddenResult;

/**
 * Interface for defining the behavior of a web client.
 *
 * You need to configure it when calling the {@link createClient} method to create a web client.
 *
 * > The [mode]{@link ClientConfig.mode} and [codec]{@link ClientConfig.codec} properties are required.
 */
export declare interface ClientConfig {
    /**
     * The codec that the Web browser uses for encoding.
     * - `"vp8"`: Use VP8 for encoding.
     * - `"h264"`: Use H.264 for encoding.
     * - `"h265"`: Use H.265 for encoding.
     * - `"vp9"`: (Beta) Use VP9 for encoding.
     *
     * > Safari 12.1 or earlier does not support the VP8 codec.
     */
    codec: SDK_CODEC;
    /**
     * @ignore
     */
    audioCodec?: SDK_AUDIO_CODEC;
    /**
     * The channel profile.
     *
     * The SDK differentiates channel profiles and applies different optimization algorithms accordingly. For example, it prioritizes smoothness and low latency for a video call, and prioritizes video quality for a video streaming.
     *
     * The SDK supports the following channel profiles:
     * - `"live"`: Sets the channel profile as live streaming. You need to go on to call [setClientRole]{@link IAgoraRTCClient.setClientRole} to set the client as either a host or an audience. A host can send and receive audio or video, while an audience can only receive audio or video.
     * - `"rtc"`: Sets the channel profile as communication. It is used for a one-on-one call or a group call where all users in the channel can converse freely.
     */
    mode: SDK_MODE;
    /**
     * The user role in a live interactive streaming (when [mode]{@link ClientConfig.mode} is `"live"`).
     *
     * The user role determines the permissions that the SDK grants to a user, such as permission to publish local streams, subscribe to remote streams, and push streams to a CDN address. You can set the user role as `"host"` or `"audience"`. A host can publish and subscribe to tracks, while an audience member can only subscribe to tracks. The default role in a live streaming is `"audience"`. Before publishing tracks, you must set the user role as `"host"`.
     *
     * After creating a client, you can call {@link setClientRole} to switch the user role.
     */
    role?: ClientRole;
    /**
     * The detailed options of the user role, including user level.
     *
     * The user level determines the level of services that a user can enjoy within the permissions of the user's role. For example, an audience can choose to receive remote streams with low latency or ultra low latency. Levels affect prices.
     */
    clientRoleOptions?: ClientRoleOptions;
    /**
     * @ignore
     */
    proxyServer?: string;
    /**
     * @ignore
     */
    turnServer?: TurnServerConfig;
    /**
     * @ignore
     */
    httpRetryConfig?: RetryConfiguration;
    /**
     * @ignore
     */
    websocketRetryConfig?: RetryConfiguration;
}

/**
 * The user role in a live broadcast channel.
 * - `"host"`: Host. A host can both publish tracks and subscribe to tracks.
 * - `"audience"`: Audience. An audience can only subscribe to tracks.
 */
export declare type ClientRole = "audience" | "host";

/**
 * The detailed options of the user role, including the user level.
 *
 * Used by the {@link ClientConfig.clientRoleOptions} property or the [AgoraRTCClient.setClientRole]{@link IAgoraRTCClient.setClientRole} method.
 */
export declare interface ClientRoleOptions {
    /**
     * The latency level of an audience member in a live interactive streaming.
     *
     * > Note:
     * > - Takes effect only when the user role is `"audience"`.
     * > - Levels affect prices.
     */
    level: AudienceLatencyLevelType;
    /**
     * @ignore
     */
    delay?: number;
}

declare type CloudProxyServerMode = "disabled" | "proxy3" | "proxy4" | "proxy5" | "proxy6" | "fallback";

/**
 * Reason for the disconnection.
 */
export declare enum ConnectionDisconnectedReason {
    /**
     * The user has left the channel.
     */
    LEAVE = "LEAVE",
    /**
     * The network is down, and cannot recover after retry.
     */
    NETWORK_ERROR = "NETWORK_ERROR",
    /**
     * The server returns an error. This is usually caused by incorrect parameter settings.
     */
    SERVER_ERROR = "SERVER_ERROR",
    /**
     * The user is banned.
     */
    UID_BANNED = "UID_BANNED",
    /**
     * The IP is banned.
     */
    IP_BANNED = "IP_BANNED",
    /**
     * The channel is banned.
     */
    CHANNEL_BANNED = "CHANNEL_BANNED",
    /**
     * @ignore
     */
    FALLBACK = "FALLBACK",
    /**
     * @ignore
     */
    LICENSE_MISSING = "LICENSE_MISSING",
    /**
     * @ignore
     */
    LICENSE_EXPIRED = "LICENSE_EXPIRED",
    /**
     * @ignore
     */
    LICENSE_MINUTES_EXCEEDED = "LICENSE_MINUTES_EXCEEDED",
    /**
     * @ignore
     */
    LICENSE_PERIOD_INVALID = "LICENSE_PERIOD_INVALID",
    /**
     * @ignore
     */
    LICENSE_MULTIPLE_SDK_SERVICE = "LICENSE_MULTIPLE_SDK_SERVICE",
    /**
     * @ignore
     */
    LICENSE_ILLEGAL = "LICENSE_ILLEGAL",
    /**
     * The user's token expires.
     */
    TOKEN_EXPIRE = "TOKEN_EXPIRE"
}

/**
 * Connection state between the SDK and Agora's edge server.
 *
 * You can get the connection state through [connectionState]{@link IAgoraRTCClient.connectionState}.
 *
 * The connection between the SDK and the edge server has the following states:
 * - `"DISCONNECTED"`: The SDK is disconnected from the server.
 *  - This is the initial state until you call [join]{@link IAgoraRTCClient.join}.
 *  - The SDK also enters this state after you call [leave]{@link IAgoraRTCClient.leave}, when the user is banned, or when the connection fails.
 * - `"CONNECTING"`: The SDK is connecting to the server. The SDK enters this state when you call [join]{@link IAgoraRTCClient.join}.
 * - `"CONNECTED"`: The SDK is connected to the server and joins a channel. The user can now publish streams or subscribe to streams in the channel.
 * - `"RECONNECTING"`: The SDK is reconnecting to the server. If the connection is lost because the network is down or switched, the SDK enters this state.
 * - `"DISCONNECTING"`: The SDK is disconnecting from the server. The SDK enters this state when you call [leave]{@link IAgoraRTCClient.leave}.
 */
export declare type ConnectionState = "DISCONNECTED" | "CONNECTING" | "RECONNECTING" | "CONNECTED" | "DISCONNECTING";

/**
 * Specifies a constraint for a property, such as the resolution or bitrate for video capture in [[VideoEncoderConfiguration]].
 */
export declare interface ConstrainLong {
    /**
     * The lower limit of the property.
     */
    min?: number;
    /**
     * The upper limit of the property.
     */
    max?: number;
    /**
     * An ideal value of a property. If the video capture device cannot output this value, it outputs the closest value instead.
     */
    ideal?: number;
    /**
     * A required value of a property. If the video capture device cannot output this value, the video capture fails.
     */
    exact?: number;
}

export declare function createBufferSourceAudioTrack(config: BufferSourceAudioTrackInitConfig): Promise<BufferSourceAudioTrack>;

export declare function createCameraVideoTrack(config?: CameraVideoTrackInitConfig): Promise<CameraVideoTrack>;

export declare function createChannelMediaRelayConfiguration(): IChannelMediaRelayConfiguration;

export declare function createClient(config?: ClientConfig): IAgoraRTCClient;

export declare function createCustomAudioTrack(config: CustomAudioTrackInitConfig): LocalAudioTrack;

export declare function createCustomVideoTrack(config: CustomVideoTrackInitConfig): LocalVideoTrack;

export declare function createMicrophoneAndCameraTracks(audioConfig?: MicrophoneAudioTrackInitConfig, videoConfig?: CameraVideoTrackInitConfig): Promise<[MicrophoneAudioTrack, CameraVideoTrack]>;

export declare function createMicrophoneAudioTrack(config?: MicrophoneAudioTrackInitConfig): Promise<MicrophoneAudioTrack>;

export declare function createScreenVideoTrack(config: ScreenVideoTrackInitConfig, withAudio: "enable"): Promise<[LocalVideoTrack, LocalAudioTrack]>;

export declare function createScreenVideoTrack(config?: ScreenVideoTrackInitConfig, withAudio?: "disable"): Promise<LocalVideoTrack>;

export declare function createScreenVideoTrack(config: ScreenVideoTrackInitConfig, withAudio: "auto"): Promise<[LocalVideoTrack, LocalAudioTrack] | LocalVideoTrack>;

/**
 * Configurations for the custom audio track. Set these configurations when calling [AgoraRTC.createCustomAudioTrack]{@link IAgoraRTC.createCustomAudioTrack}.
 */
export declare interface CustomAudioTrackInitConfig {
    /**
     * Your [MediaStreamTrack](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack) object.
     */
    mediaStreamTrack: MediaStreamTrack;
    /**
     * The audio encoder configurations.
     *
     * You can set the audio encoder configurations in either of the following ways:
     * - Pass the preset audio encoder configurations by using [[AudioEncoderConfigurationPreset]].
     * - Pass your customized audio encoder configurations by using [[AudioEncoderConfiguration]].
     *
     * > Firefox does not support setting the audio encoding rate.
     */
    encoderConfig?: AudioEncoderConfiguration | AudioEncoderConfigurationPreset;
}

/**
 * Configurations for the custom video track. Set these configurations when calling [AgoraRTC.createCustomVideoTrack]{@link IAgoraRTC.createCustomVideoTrack}.
 */
export declare interface CustomVideoTrackInitConfig {
    /**
     * Your [MediaStreamTrack](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack) object.
     */
    mediaStreamTrack: MediaStreamTrack;
    /**
     * **Since**
     * <br>&emsp;&emsp;&emsp;*4.17.1*
     *
     * Width of the video.
     *
     * You can pass a `number`, or a constraint such as `{ max: 1280, min: 720 }`.
     *
     * For more details about the constraint, see [ConstrainLong]{@link ConstrainLong}.
     */
    width?: number | ConstrainLong;
    /**
     * **Since**
     * <br>&emsp;&emsp;&emsp;*4.17.1*
     *
     * Height of the video.
     *
     * You can pass a `number`, or a constraint such as `{ max: 1280, min: 720 }`.
     *
     * For more details about the constraint, see [ConstrainLong]{@link ConstrainLong}.
     */
    height?: number | ConstrainLong;
    /**
     * **Since**
     * <br>&emsp;&emsp;&emsp;*4.17.1*
     *
     * Frame rate of the video (fps).
     *
     * You can pass a `number`, or a constraint such as `{ max: 30, min: 5 }`.
     *
     * For details about the constraint, see [ConstrainLong]{@link ConstrainLong}.
     */
    frameRate?: number | ConstrainLong;
    /**
     * The minimum bitrate of sending the video track (Kbps).
     */
    bitrateMin?: number;
    /**
     * The maximum bitrate of sending the video track (Kbps).
     */
    bitrateMax?: number;
    /**
     * **Since**
     * <br>&emsp;&emsp;&emsp;*4.0.0*
     *
     * Transmission optimization mode. Whether to prioritize video quality or smoothness:
     * - `"detail"`: Prioritizes video quality.
     *   - The SDK ensures high-quality images by automatically calculating a minimum bitrate based on the capturing resolution and frame rate. No matter how poor the network condition is, the sending bitrate will never be lower than the minimum value.
     *   - In most cases, the SDK does not reduce the sending resolution, but may reduce the frame rate.
     * -  `"motion"`: Prioritizes video smoothness.
     *   - In poor network conditions, the SDK reduces the sending bitrate to minimize video freezes.
     *   - In most cases, the SDK does not reduce the frame rate, but may reduce the sending resolution.
     * - Empty: Uses the default transmission optimization mode. The SDK may reduce the frame rate or the sending resolution in poor network conditions.
     *
     * > Note: This method is only supported on Chrome.
     */
    optimizationMode?: "motion" | "detail";
    /**
     * @ignore
     *
     * **Since**
     * <br>&emsp;&emsp;&emsp;*4.18.0*
     *
     * Configurations for Scalable Video Coding (SVC).
     *
     * You can set `scalabiltyMode` using one of the following options:
     * - Use the preset SVC configurations provided by the SDK through {@link SVCConfigurationPreset}.
     * - Use your custom SVC configurations through {@link SVCConfiguration}.
     */
    scalabiltyMode?: SVCConfiguration | SVCConfigurationPreset;
}

declare abstract class DataChannel extends EventEmitter implements IDataChannel {
    private _version;
    private _type;
    _config: IDataChannelConfig;
    _originDataChannel?: RTCDataChannel;
    protected _dataStreamPacketHeader: ArrayBuffer;
    protected _dataStreamPacketHandler: DataStream;
    private _datachannelEventMap;
    constructor(config: IDataChannelConfig, datachannel?: RTCDataChannel);
    get id(): number;
    get ordered(): boolean;
    get maxRetransmits(): number;
    get metadata(): string;
    get readyState(): RTCDataChannelState;
    get _originDataChannelId(): number | null;
    getChannelId(): number;
    getConfig(): IDataChannelConfig;
    _close(): void;
    _waitTillOpen(): Promise<void>;
    _updateOriginDataChannel(datachannel: RTCDataChannel): void;
    private _initPacketHeader;
    private _bandDataChannelEvents;
    private _unbindDataChannelEvents;
}

declare class DataStream {
    private _sequence;
    private _startTime;
    private isUseOneByte;
    private get startTime();
    private get sequence();
    serialize(payload: ArrayBuffer): ArrayBuffer;
    deserialize(packet: ArrayBuffer): ArrayBuffer;
    private serializeExtension;
    private deserializeExtension;
    private decompress;
    private compress;
}

declare interface DenoiserStats {
    ns: number;
    ebn: number;
    ean: number;
    vl: number;
}

export declare const DEV: boolean;

/**
 * Information of the media input device.
 *
 * - You can get the audio sampling device information through [onMicrophoneChanged]{@link onMicrophoneChanged}.
 * - You can get the video capture device information through [onCameraChanged]{@link onCameraChanged}.
 * - You can get the audio playback device information through [onPlaybackDeviceChanged]{@link onPlaybackDeviceChanged}.
 */
export declare interface DeviceInfo {
    /**
     * The latest time when the state of the media input device was updated.
     *
     * A Unix timestamp in milliseconds.
     */
    updateAt: number;
    /**
     * The time when the SDK first detects the media input device.
     *
     * A Unix timestamp in milliseconds.
     */
    initAt: number;
    /**
     * The state of the capture device.
     */
    state: DeviceState;
    /**
     * Device information of the media input device. See [MediaDeviceInfo](https://developer.mozilla.org/en-US/docs/Web/API/MediaDeviceInfo) for details.
     */
    device: MediaDeviceInfo;
}

/**
 * The state of the media input device.
 * - `"ACTIVE"`: The device is plugged in.
 * - `"INACTIVE"`: The device is unplugged.
 */
export declare type DeviceState = "ACTIVE" | "INACTIVE";

export declare function disableLogUpload(): void;

/**
 * Information of the sharing screen source on Electron, which is retrieved by calling {@link getElectronScreenSources}.
 *
 * See [DesktopCapturerSource](https://www.electronjs.org/docs/api/structures/desktop-capturer-source) in the Electron API documentation for details.
 */
export declare interface ElectronDesktopCapturerSource {
    /**
     * The ID of the screen source.
     */
    id: string;
    /**
     * The name of the screen source.
     */
    name: string;
    /**
     * The thumbnail of the screen source.
     *
     * See [ElectronNativeImage](https://electronjs.org/docs/api/native-image#nativeimage) for details.
     */
    thumbnail: IElectronNativeImage;
}

export declare function enableLogUpload(): void;

/**
 * The encryption mode, which is used in the {@link setEncryptionConfig} method call.
 * - `"aes-128-xts"`: 128-bit AES encryption, XTS mode.
 * - `"aes-256-xts"`: 256-bit AES encryption, XTS mode.
 * - `"aes-128-gcm"`: 128-bit AES encryption, GCM mode.
 * - `"aes-256-gcm"`: 256-bit AES encryption, GCM mode.
 * - `"aes-128-gcm2"`: 128-bit AES encryption, GCM mode, with salt.
 * - `"aes-256-gcm2"`: 256-bit AES encryption, GCM mode, with salt.
 * - `"aes-128-ecb"`: 128-bit AES encryption, ECB mode.
 * - `"sm4-128-ecb"`: 128-bit SM4 encryption, ECB mode.
 * - `"none"`: No encryption.
 */
export declare type EncryptionMode = "aes-128-xts" | "aes-256-xts" | "aes-128-ecb" | "sm4-128-ecb" | "aes-128-gcm" | "aes-256-gcm" | "aes-128-gcm2" | "aes-256-gcm2" | "none";

export declare const ESM: boolean;

export declare const ESM_BUNDLER: boolean;

/**
 * **Since**
 * <br>&emsp;&emsp;&emsp;*4.18.0*
 *
 * If you needs a more flexible way of listening to autoplay failures, Agora recommends that you call {@link IAgoraRTC.on} and pass in this callback to replace {@link onAutoplayFailed}.
 *
 * ```javascript
 * AgoraRTC.on("autoplay-failed", (info) => {
 *   console.log("Autoplay failed!", info.state, info.device);
 * });
 * ```
 *
 * @asMemberOf IAgoraRTC
 * @event
 */
declare function event_autoplay_failed(): void;

/**
 * @ignore
 *
 * Occurs when the device is overloaded after you call [setBeautyEffect]{@link ILocalVideoTrack.setBeautyEffect} to enable image enhancement.
 *
 * You can listen for this event to notify users of the device overload and disable image enhancement.
 *
 * ```javascript
 * localVideoTrack.on("beauty-effect-overload", () => {
 *   console.log("beauty effect overload, disable beauty effect");
 *   localVideoTrack.setBeautyEffect(false);
 * });
 * ```
 * @event
 * @asMemberOf ILocalVideoTrack
 */
declare function event_beauty_effect_overload(): void;

/**
 * **Since**
 * <br>&emsp;&emsp;&emsp;*4.18.0*
 *
 * If you needs a more flexible way of listening to camera device changes, Agora recommends that you call {@link IAgoraRTC.on} and pass in this callback to replace {@link onCameraChanged}.
 *
 * ```javascript
 * AgoraRTC.on("camera-changed", (info) => {
 *   console.log("Camera changed!", info.state, info.device);
 * });
 * ```
 *
 * @param deviceInfo The device information. See {@link DeviceInfo}.
 * @asMemberOf IAgoraRTC
 * @event
 */
declare function event_camera_changed(deviceInfo: DeviceInfo): void;

/**
 * Reports events during a media stream relay.
 *
 * @param event The event code for a media stream relay.
 * @asMemberOf IAgoraRTCClient
 * @event
 */
declare function event_channel_media_relay_event(event: ChannelMediaRelayEvent): void;

/**
 * Occurs when the state of the media stream relay changes.
 *
 * The SDK reports the state and error code of the current media relay with this callback.
 *
 * If the media relay is in an abnormal state, you can find the error code in {@link ChannelMediaRelayError} (for example if the token has expired, or repeated reconnection attempts fail.)
 * @param state The state of the media relay.
 * @param code The error code.
 * @asMemberOf IAgoraRTCClient
 * @event
 */
declare function event_channel_media_relay_state(state: ChannelMediaRelayState, code: ChannelMediaRelayError): void;

/**
 * Occurs when the state of the connection between the SDK and the server changes.
 * @param curState The current connection state.
 * @param revState The previous connection state.
 * @param reason The reason of disconnection if `curState` is `"DISCONNECTED"`.
 * @asMemberOf IAgoraRTCClient
 * @event
 */
declare function event_connection_state_change(curState: ConnectionState, revState: ConnectionState, reason?: ConnectionDisconnectedReason): void;

declare function event_content_inspect_connection_state_change(preState: InspectState, newState: InspectState): void;

declare function event_content_inspect_error(error?: AgoraRTCError): void;

/**
 * Occurs when decryption fails.
 *
 * The SDK triggers this callback when the decryption fails during the process of subscribing to a stream. The failure is usually caused by incorrect encryption settings. See {@link setEncryptionConfig} for details.
 * @asMemberOf IAgoraRTCClient
 * @event
 */
declare function event_crypt_error(): void;

/**
 * Reports exceptions in the channel.
 *
 * Exceptions are not errors, but usually reflect quality issues.
 *
 * This callback also reports recovery from an exception.
 *
 * Each exception corresponds to a recovery event.
 *
 * **Exception**
 *
 * | Code | Message                   | Exception            |
 * | :----- | :------------------------- | :--------------- |
 * | 1001   | FRAMERATE_INPUT_TOO_LOW    | Captured video frame rate is too low |
 * | 1002   | FRAMERATE_SENT_TOO_LOW     | Sent video frame rate is too low |
 * | 1003   | SEND_VIDEO_BITRATE_TOO_LOW | Sent video bitrate is too low |
 * | 1005   | RECV_VIDEO_DECODE_FAILED   | Decoding received video fails |
 * | 2001   | AUDIO_INPUT_LEVEL_TOO_LOW  | Sent audio volume is too low     |
 * | 2002   | AUDIO_OUTPUT_LEVEL_TOO_LOW | Received audio volume is too low     |
 * | 2003   | SEND_AUDIO_BITRATE_TOO_LOW | Sent audio bitrate is too low |
 * | 2005   | RECV_AUDIO_DECODE_FAILED   | Decoding received audio fails |
 *
 * **Recoveries**
 *
 * | Code | Message                   | Recovery             |
 * | :----- | :------------------------- | :--------------- |
 * |3001   | FRAMERATE_INPUT_TOO_LOW_RECOVER    | Captured video frame rate recovers |
 * |3002   | FRAMERATE_SENT_TOO_LOW_RECOVER     | Sent video frame rate recovers |
 * |3003   | SEND_VIDEO_BITRATE_TOO_LOW_RECOVER | Sent video bitrate recovers |
 * |3005   | RECV_VIDEO_DECODE_FAILED_RECOVER   | Decoding received video recovers |
 * |4001   | AUDIO_INPUT_LEVEL_TOO_LOW_RECOVER  | Sent audio volume recovers     |
 * |4002   | AUDIO_OUTPUT_LEVEL_TOO_LOW_RECOVER | Received audio volume recovers     |
 * |4003   | SEND_AUDIO_BITRATE_TOO_LOW_RECOVER | Sent audio bitrate recovers |
 * |4005   | RECV_AUDIO_DECODE_FAILED_RECOVER   | Decoding received audio recovers |
 *
 * @asMemberOf IAgoraRTCClient
 * @event
 */
declare function event_exception(event: {
    /**
     * The event code.
     */
    code: number;
    /**
     * The event message.
     */
    msg: string;
    /**
     * The ID of the user who has experienced the exception or recovery event.
     */
    uid: UID;
}): void;

/**
 * Occurs when the first remote audio or video frame is decoded.
 *
 * @event
 * @asMemberOf IRemoteTrack
 */
declare function event_first_frame_decoded(): void;

declare function event_image_moderation_connection_state_change(newState: ImageModerationConnectionState, preState: ImageModerationConnectionState): void;

/**
 * **Since**
 * <br>&emsp;&emsp;&emsp;*4.4.0*
 *
 * The SDK triggers this callback to indicate whether the media stream is forwarded by the Agora cloud proxy service.
 * - Earlier than v4.10.0: The callback is triggered after the method call of [[publish]] succeeds.
 * - v4.10.0 and later: The callback is triggered after the method call of [[join]] succeeds.
 *
 * @param isUsingProxy Whether the media stream is forwarded by the Agora cloud proxy service.
 * - `true`: Forwarded by the Agora cloud proxy service.
 * - `false`: Not forwarded by the Agora cloud proxy service.
 * @asMemberOf IAgoraRTCClient
 * @event
 */
declare function event_is_using_cloud_proxy(isUsingProxy: boolean): void;

/**
 * **DEPRECATED** from v4.19.0. This callback will not be triggered because the SDK stops using proxy to ensure connectivity.
 *
 * Occurs when the SDK automatically switches to TCP/TLS 443.
 *
 * As of v4.11.0, if the SDK fails in the attempt to directly connect to Agora SD-RTN™ after you call [[join]],
 * the SDK automatically switches to TCP/TLS 443 in order to ensure connectivity.
 *
 * @param proxyServer The server address used after the switch.
 * @asMemberOf IAgoraRTCClient
 * @event
 */
declare function event_join_fallback_to_proxy(proxyServer: string): void;

/**
 * Occurs when an error occurs in CDN live streaming.
 *
 * After the method call of {@link startLiveStreaming} succeeds, the SDK triggers this callback when errors occur during CDN live streaming.
 *
 * You can visit `err.code` to get the error code. The errors that you may encounter include:
 * - `LIVE_STREAMING_INVALID_ARGUMENT`: Invalid argument.
 * - `LIVE_STREAMING_INTERNAL_SERVER_ERROR`: An error occurs in Agora's streaming server.
 * - `LIVE_STREAMING_PUBLISH_STREAM_NOT_AUTHORIZED`: The URL is occupied.
 * - `LIVE_STREAMING_TRANSCODING_NOT_SUPPORTED`: Sets the transcoding parameters when the transcoding is not enabled.
 * - `LIVE_STREAMING_CDN_ERROR`: An error occurs in the CDN.
 * - `LIVE_STREAMING_INVALID_RAW_STREAM`: Timeout for the CDN live streaming. Please check your media stream.
 *
 * @param url The URL of the CDN live streaming that has errors.
 * @param err The error details.
 * @asMemberOf IAgoraRTCClient
 * @event
 */
declare function event_live_streaming_error(url: string, err: AgoraRTCError): void;

/**
 * Occurs when a warning occurs in CDN live streaming.
 *
 * After the method call of {@link startLiveStreaming} succeeds, the SDK triggers this callback when warnings occur during CDN live streaming.
 *
 * You can visit `err.code` to get the warning code. The warnings that you may encounter include:
 * - `LIVE_STREAMING_WARN_STREAM_NUM_REACH_LIMIT`: Pushes stremas to more than 10 URLs.
 * - `LIVE_STREAMING_WARN_FAILED_LOAD_IMAGE`: Fails to load the background image or watermark image.
 * - `LIVE_STREAMING_WARN_FREQUENT_REQUEST`: Pushes stremas to the CDN too frequently.
 *
 * @param url The URL of the CDN live streaming that has warnings.
 * @param warning The warning details.
 * @asMemberOf IAgoraRTCClient
 * @event
 */
declare function event_live_streaming_warning(url: string, warning: AgoraRTCError): void;

/**
 * Occurs when the SDK ends reestablishing the media connection for publishing and subscribing.
 * @param uid The ID of the user who reestablishes the connection. If it is the local `uid`, the connection is for publishing; if it is a remote `uid`, the connection is for subscribing.
 * @asMemberOf IAgoraRTCClient
 * @event
 */
declare function event_media_reconnect_end(uid: UID): void;

/**
 * Occurs when the SDK starts to reestablish the media connection for publishing and subscribing.
 * @param uid The ID of the user who reestablishes the connection.  If it is the local `uid`, the connection is for publishing; if it is a remote `uid`, the connection is for subscribing.
 * @asMemberOf IAgoraRTCClient
 * @event
 */
declare function event_media_reconnect_start(uid: UID): void;

/**
 * **Since**
 * <br>&emsp;&emsp;&emsp;*4.18.0*
 *
 * If you needs a more flexible way of listening to
 * microphone device changes, Agora recommends that you call {@link IAgoraRTC.on} and pass in this callback to replace {@link onMicrophoneChanged}.
 *
 * ```javascript
 * AgoraRTC.on("microphone-changed", (info) => {
 *   console.log("Microphone changed!", info.state, info.device);
 * });
 * ```
 *
 * @param deviceInfo The device information. See {@link DeviceInfo}.
 * @asMemberOf IAgoraRTC
 * @event
 */
declare function event_microphone_changed(deviceInfo: DeviceInfo): void;

/**
 * Reports the network quality of the local user.
 *
 * After the local user joins the channel, the SDK triggers this callback to report the uplink and downlink network conditions of the local user once every two second.
 *
 * > Agora recommends listening for this event and displaying the network quality.
 *
 * @param stats The network quality of the local user.
 * @asMemberOf IAgoraRTCClient
 * @event
 */
declare function event_network_quality(stats: NetworkQuality): void;

/**
 * **Since**
 * <br>&emsp;&emsp;&emsp;*4.18.0*
 *
 * If you needs a more flexible way of listening to audio playback device changes, Agora recommends that you call {@link IAgoraRTC.on} and pass in this callback to replace {@link onPlaybackDeviceChanged}.
 *
 * ```javascript
 * AgoraRTC.on("playback-device-changed", (info) => {
 *   console.log("Playback device changed!", info.state, info.device);
 * });
 * ```
 *
 * @param deviceInfo The device information. See {@link DeviceInfo}.
 * @asMemberOf IAgoraRTC
 * @event
 */
declare function event_playback_device_changed(deviceInfo: DeviceInfo): void;

/**
 * **Since**
 * <br>&emsp;&emsp;&emsp;*4.11.0*
 *
 * If you enable support for 128 hosts in a channel, this callback is triggered when [[join]] is called.
 * The callback reports remote users who publish audio and/or video tracks in the channel.
 *
 * > Note:
 * > - For the `published-user-list` to be triggered, every user in the channel must use a number as their user ID (`uid`).
 * > - `published-user-list` has the following impacts on [AgoraRTCClient.on("user-joined")]{@link event_user_joined} and [AgoraRTCClient.on("user-published")]{@link event_user_published}:
 * >   - If you listen for the `published-user-list` event, users reported by the `published-user-list` callback are not reported by `user-joined` and `user-published`.
 * >   - If you do not listen for the `published-user-list` event, the `user-joined` and `user-published` callbacks are not affected.
 *
 * @param users The remote user.
 *
 * @asMemberOf IAgoraRTCClient
 * @event
 */
declare function event_published_user_list(users: IAgoraRTCRemoteUser): void;

/**
 * **Since**
 * <br>&emsp;&emsp;&emsp;*4.18.0*
 *
 * If you needs a more flexible way of listening to CSP rule violations, Agora recommends that you call {@link IAgoraRTC.on} and pass in this callback to replace {@link onSecurityPolicyViolation}.
 *
 * ```javascript
 * AgoraRTC.on("security-policy-violation", (info) => {
 *   console.log("Security policy violation!", info.state, info.device);
 * });
 * ```
 * @asMemberOf IAgoraRTC
 * @event
 */
declare function event_security_policy_violation(): void;

/**
 * Occurs when the state of processing the audio buffer in [BufferSourceAudioTrack]{@link IBufferSourceAudioTrack} changes.
 *
 * @param currentState The state of processing the audio buffer:
 * - `"stopped"`: The SDK stops processing the audio buffer. Reasons may include:
 *  - The SDK finishes processing the audio buffer.
 *  - The user manually stops the processing of the audio buffer.
 * - `"paused"`: The SDK pauses the processing of the audio buffer.
 * - `"playing"`: The SDK is processing the audio buffer.
 *
 * @event
 * @asMemberOf IBufferSourceAudioTrack
 */
declare function event_source_state_change(currentState: AudioSourceState): void;

/**
 * Occurs when a remote video stream falls back to an audio stream due to unreliable network conditions or switches back to video after the network conditions improve.
 * @param uid The ID of the remote user.
 * @param isFallbackOrRecover Whether the remote media stream falls back or recovers:
 * - `"fallback"`: The remote media stream falls back to audio-only due to unreliable network conditions.
 * - `"recover"`: The remote media stream switches back to the video stream after the network conditions improve.
 * @asMemberOf IAgoraRTCClient
 * @event
 */
declare function event_stream_fallback(uid: UID, isFallbackOrRecover: "fallback" | "recover"): void;

/**
 * Occurs when the type of a remote video stream changes.
 *
 * The SDK triggers this callback when a high-quality video stream changes to a low-quality video stream, or vice versa.
 * @param uid The ID of the remote user.
 * @param streamType The new stream type:
 * - 0: High-bitrate, high-resolution video stream.
 * - 1: Low-bitrate, low-resolution video stream.
 * @asMemberOf IAgoraRTCClient
 * @event
 */
declare function event_stream_type_changed(uid: UID, streamType: RemoteStreamType): void;

/**
 * Occurs when the token expires.
 *
 * You must request a new token from your server and call {@link join} to use the new token to join the channel.
 *
 * ``` javascript
 * client.on("token-privilege-did-expire", async () => {
 *   // After requesting a new token
 *   await client.join(<APPID>, <CHANNEL NAME>, <NEW TOKEN>);
 * });
 * ```
 *
 * @asMemberOf IAgoraRTCClient
 * @event
 */
declare function event_token_privilege_did_expire(): void;

/**
 * Occurs 30 seconds before a token expires.
 *
 * You must request a new token from your server and call {@link renewToken} to pass a new token as soon as possible.
 *
 * ``` javascript
 * client.on("token-privilege-will-expire", async function(){
 *   // After requesting a new token
 *   await client.renewToken(token);
 * });
 * ```
 * @asMemberOf IAgoraRTCClient
 * @event
 */
declare function event_token_privilege_will_expire(): void;

/**
 * Occurs when a audio or video track ends.
 *
 * Reasons may include:
 * - Camera is unplugged.
 * - Microphone is unplugged.
 * - The local user stops screen sharing.
 * - The local user closes the underlying `MediaStreamTrack`.
 * - A local media device malfunctions.
 * - The device permission is revoked.
 *
 * @event
 * @asMemberOf ILocalTrack
 */
declare function event_track_ended(): void;

/**
 * Occurs when the `RTCRtpTransceiver` instance of the current track is updated.
 *
 * @param transceiver The new `RTCRtpTransceiver` instance.
 * @param type The type of the video stream to which the current track belongs. See {@link StreamType}.
 *
 * @event
 * @asMemberOf ILocalTrack
 */
declare function event_transceiver_updated(transceiver: RTCRtpTransceiver, type?: StreamType): void;

/**
 * Occurs when the `RTCRtpTransceiver` instance of the current track is updated.
 *
 * @param transceiver The new `RTCRtpTransceiver` instance.
 * @event
 * @asMemberOf IRemoteTrack
 */
declare function event_transceiver_updated_2(transceiver: RTCRtpTransceiver): void;

/**
 * @ignore
 */
declare function event_user_datachannel_close(): void;

/**
 * @ignore
 */
declare function event_user_datachannel_error(ev: Event): void;

/**
 * @ignore
 */
declare function event_user_datachannel_message(data: ArrayBuffer): void;

/**
 * @ignore
 */
declare function event_user_datachannel_open(): void;

/**
 * Reports the state change of users.
 *
 * In most cases, you only need to listen for [user-published]{@link IAgoraRTCClient.event_user_published} and [user-unpublished]{@link IAgoraRTCClient.event_user_unpublished} events for operations including subscribing, unsubscribing, and displaying whether the remote user turns on the camera and microphone. You do not need to pay special attention to user states since the SDK automatically handles user states.
 *
 * > This event indicating the media stream of a remote user is active does not necessarily mean that the local user can subscribe to this remote user. The local user can subscribe to a remote user only when receiving the [user-published]{@link IAgoraRTCClient.event_user_published} event.
 *
 * @param uid The ID of the remote user.
 * @param msg The current user state. Note that the `"enable-local-video"` and `"disable-local-video"` states are only for synchronizing states with the clients that integrate the RTC Native SDK.
 * @asMemberOf IAgoraRTCClient
 * @event
 */
declare function event_user_info_updated(uid: UID, msg: "mute-audio" | "mute-video" | "enable-local-video" | "unmute-audio" | "unmute-video" | "disable-local-video"): void;

/**
 * Occurs when a remote user or host joins the channel.
 *
 * - In a communication channel, this callback indicates that another user joins the channel and reports the ID of that user. The SDK also triggers this callback to report the existing users in the channel when a user joins the channel.
 * - In a live-broadcast channel, this callback indicates that a host joins the channel. The SDK also triggers this callback to report the existing hosts in the channel when a user joins the channel. Ensure that you have no more than 17 hosts in a channel.
 *
 * The SDK triggers this callback when one of the following situations occurs:
 * - A remote user or host joins the channel by calling {@link join}.
 * - A remote audience switches the user role to host by calling {@link setClientRole} after joining the channel.
 * - A remote user or host rejoins the channel after a network interruption.
 * @param user Information of the remote user.
 * @asMemberOf IAgoraRTCClient
 * @event
 */
declare function event_user_joined(user: IAgoraRTCRemoteUser): void;

/**
 * Occurs when a remote user becomes offline.
 *
 * The SDK triggers this callback when one of the following situations occurs:
 * - A remote user calls {@link leave} and leaves the channel.
 * - A remote user has dropped offline. If no data packet of the user or host is received for 20 seconds, the SDK assumes that the user has dropped offline. A poor network connection may cause a false positive.
 * - A remote user switches the client role from host to audience.
 *
 * > In live-broadcast channels, the SDK triggers this callback only when a host goes offline.
 * @param user Information of the user who is offline.
 * @param reason Reason why the user has gone offline.
 * - `"Quit"`: The user calls {@link leave} and leaves the channel.
 * - `"ServerTimeOut"`: The user has dropped offline.
 * - `"BecomeAudience"`: The client role is switched from host to audience.
 * @asMemberOf IAgoraRTCClient
 * @event
 */
declare function event_user_left(user: IAgoraRTCRemoteUser, reason: string): void;

/**
 * Occurs when a remote user publishes an audio or video track.
 *
 * You can subscribe to and play the audio or video track in this callback. See {@link subscribe} and [RemoteTrack.play]{@link IRemoteTrack.play}.
 *
 * > The SDK also triggers this callback to report the existing tracks in the channel when a user joins the channel.
 *
 * ```javascript
 * client.on("user-published", async (user, mediaType) => {
 *   await client.subscribe(user, mediaType);
 *   if (mediaType === "video") {
 *     console.log("subscribe video success");
 *     user.videoTrack.play("xxx");
 *   }
 *   if (mediaType === "audio") {
 *     console.log("subscribe audio success");
 *     user.audioTrack.play();
 *   }
 * })
 * ```
 * @param user Information of the remote user.
 * @param mediaType Type of the track.
 * - `"audio"`: The remote user publishes an audio track.
 * - `"video"`: The remote user publishes a video track.
 * - `"datachannel"`: Reserved for future use.
 * @param config Reserved for future use.
 * @asMemberOf IAgoraRTCClient
 * @event
 */
declare function event_user_published(user: IAgoraRTCRemoteUser, mediaType: "audio" | "video" | "datachannel", config?: IDataChannelConfig): void;

/**
 * Occurs when a remote user unpublishes an audio or video track.
 * @param user Information of the remote user.
 * @param mediaType Type of the track.
 * - `"audio"`: The remote user unpublishes an audio track.
 * - `"video"`: The remote user unpublishes a video track.
 * @asMemberOf IAgoraRTCClient
 * @event
 */
declare function event_user_unpublished(user: IAgoraRTCRemoteUser, mediaType: "audio" | "video" | "datachannel", config?: IDataChannelConfig): void;

/**
 * **Since**
 * <br>&emsp;&emsp;&emsp;*4.8.0*
 *
 * Indicates the visibility of the `<video>` HTML tag.
 *
 * The SDK triggers this event every 30 seconds.
 *
 * After you call `localVideoTrack.play`, the SDK creates an [`<video>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video) tag for playing video tracks. When `localVideoTrack.isPlaying` is `true` but you cannot see any video, this event helps you check whether the `<video>` tag is visible or not and learn the reason when the `<video>` tag is invisible.
 *
 * @param data The visibility of the `<video>` tag.
 * @asMemberOf ILocalVideoTrack
 * @event
 */
declare function event_video_element_visible_status(data?: CheckVideoVisibleResult): void;

/**
 * **Since**
 * <br>&emsp;&emsp;&emsp;*4.8.0*
 *
 * Indicates the visibility of the `<video>` HTML tag.
 *
 * The SDK triggers this event every 30 seconds.
 *
 * After you call `remoteVideoTrack.play`, the SDK creates an [`<video>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video) tag for playing video tracks. When `remoteVideoTrack.isPlaying` is `true` but you cannot see any video, this event helps you check whether the `<video>` tag is visible or not and learn the reason when the `<video>` tag is invisible.
 *
 * @param data The visibility of the `<video>` tag.
 * @asMemberOf IRemoteVideoTrack
 * @event
 */
declare function event_video_element_visible_status_2(data?: CheckVideoVisibleResult): void;

/**
 * Reports all the speaking local and remote users and their volumes.
 *
 * It is disabled by default. You can enable this callback by calling {@link enableAudioVolumeIndicator}.
 * If enabled, it reports the users' volumes every two seconds regardless of whether there are users speaking.
 *
 * The volume is an integer ranging from 0 to 100. Usually a user with volume above 60 is a speaking user.
 *
 * ``` javascript
 * client.on("volume-indicator", function(result){
 *     result.forEach(function(volume, index){
 *     console.log(`${index} UID ${volume.uid} Level ${volume.level}`);
 *   });
 * });
 * ```
 *
 * @param result An object consisting of the following properties:
 * - level: The volume of the speaking user, ranging from 0 to 100.
 * - uid: The ID of the speaking user.
 *
 * @asMemberOf IAgoraRTCClient
 * @event
 */
declare function event_volume_indicator(result: {
    /**
     * The volume of the speaking user, ranging from 0 to 100.
     */
    level: number;
    /**
     * The ID of the speaking user.
     */
    uid: UID;
}[]): void;

/**
 * Parameters for reporting customized messages. Used when calling [AgoraRTCClient.sendCustomReportMessage]{@link IAgoraRTCClient.sendCustomReportMessage}.
 */
export declare interface EventCustomReportParams {
    /**
     * The ID of the message.
     */
    reportId: string;
    /**
     * The category of the message.
     */
    category: string;
    /**
     * The event name of the message.
     */
    event: string;
    /**
     * The label of the message.
     */
    label: string;
    /**
     * The value of the message.
     */
    value: number;
}

/**
 * The `EventEmitter` class provides a way to define, emit, and handle events.
 */
declare class EventEmitter {
    private _events;
    /**
     * Gets all the listeners for a specified event.
     *
     * @param event The event name.
     */
    getListeners(event: string): Function[];
    /**
     * Listens for a specified event.
     *
     * When the specified event happens, the SDK triggers the callback that you pass.
     * @param event The event name.
     * @param listener The callback to trigger.
     */
    on(event: string, listener: Function): void;
    /**
     * Listens for a specified event once.
     *
     * When the specified event happens, the SDK triggers the callback that you pass and then removes the listener.
     * @param event The event name.
     * @param listener The callback to trigger.
     */
    once(event: string, listener: Function): void;
    /**
     * Removes the listener for a specified event.
     *
     * @param event The event name.
     * @param listener The callback that corresponds to the event listener.
     */
    off(event: string, listener: Function): void;
    /**
     * Removes all listeners for a specified event.
     *
     * @param event The event name. If left empty, all listeners for all events are removed.
     */
    removeAllListeners(event?: string): void;
    private _indexOfListener;
}

declare interface ExternalMethods {
    getDenoiserStats?: () => DenoiserStats | undefined;
}

declare class FakeAudioNode {
    disconnect(): void;
    connect(): void;
}

declare class FakeTrackSource extends EventEmitter {
    context: any;
    processSourceNode: undefined;
    outputTrack: undefined;
    processedNode: undefined;
    clonedTrack: undefined;
    outputNode: FakeAudioNode;
    get isPlayed(): boolean;
    get isFreeze(): boolean;
    constructor();
    setVolume(): void;
    createOutputTrack(): MediaStreamTrack;
    getOriginVolumeLevel(): number;
    getAccurateVolumeLevel(): number;
    stopGetAudioBuffer(): void;
    startGetAudioBuffer(): void;
    play(): void;
    stop(): void;
    destroy(): void;
    updateTrack(): void;
    updateOriginTrack(): void;
    createMediaStreamSourceNode(): undefined;
}

export declare function getCameras(skipPermissionCheck?: boolean): Promise<MediaDeviceInfo[]>;

export declare function getDevices(skipPermissionCheck?: boolean): Promise<MediaDeviceInfo[]>;

export declare function getElectronScreenSources(type?: ScreenSourceType): Promise<ElectronDesktopCapturerSource[]>;

export declare function getMicrophones(skipPermissionCheck?: boolean): Promise<MediaDeviceInfo[]>;

export declare function getParameter(key: keyof typeof MUTABLE_PARAMS): any;

export declare function getPlaybackDevices(skipPermissionCheck?: boolean): Promise<MediaDeviceInfo[]>;

export declare function getSupportedCodec(): Promise<{
    video: string[];
    audio: string[];
}>;

/**
 * The entry point of the Agora Web SDK.
 */
export declare interface IAgoraRTC extends EventEmitter {
    /**
     * The version of the Agora Web SDK.
     */
    VERSION: string;
    /**
     * **Since**
     * <br>&emsp;&emsp;&emsp;*4.18.0*
     *
     * @param event The event name.
     * @param listener See {@link event_camera_changed}.
     */
    on(event: "camera-changed", listener: typeof event_camera_changed): void;
    /**
     * **Since**
     * <br>&emsp;&emsp;&emsp;*4.18.0*
     *
     * @param event The event name.
     * @param listener See {@link event_microphone_changed}.
     */
    on(event: "microphone-changed", listener: typeof event_microphone_changed): void;
    /**
     * **Since**
     * <br>&emsp;&emsp;&emsp;*4.18.0*
     *
     * @param event The event name.
     * @param listener See {@link event_playback_device_changed}.
     */
    on(event: "playback-device-changed", listener: typeof event_playback_device_changed): void;
    /**
     * **Since**
     * <br>&emsp;&emsp;&emsp;*4.18.0*
     *
     * @param event The event name.
     * @param listener See {@link event_autoplay_failed}.
     */
    on(event: "autoplay-failed", listener: typeof event_autoplay_failed): void;
    /**
     * **Since**
     * <br>&emsp;&emsp;&emsp;*4.18.0*
     *
     * @param event The event name.
     * @param listener See {@link event_security_policy_violation}.
     */
    on(event: "security-policy-violation", listener: typeof event_security_policy_violation): void;
    /**
     * Gets the codecs that the browser supports.
     *
     * This method gets a list of the codecs supported by the SDK and the web browser. The Agora Web SDK supports video codecs VP8 and H.264, and audio codec OPUS.
     *
     * > Note:
     * > - The method works with all major browsers. It gets an empty list if it does not recognize the browser or the browser does not support WebRTC.
     * > - The returned codec list is based on the [SDP](https://tools.ietf.org/html/rfc4566) used by the web browser and for reference only.
     * > - Some Android phones claim to support H.264 but have problems in communicating with other platforms using this codec, in which case we recommend VP8 instead.
     *
     * ```javascript
     * AgoraRTC.getSupportedCodec().then(result => {
     * console.log(`Supported video codec: ${result.video.join(",")}`);
     * console.log(`Supported audio codec: ${result.audio.join(",")}`);
     * });
     * ```
     * @returns A `Promise` object. In the `.then(function(result){})` callback, `result` has the following properties:
     * - `video`: array, the supported video codecs. The array may include `"H264"`, `"VP8"`, or be empty.
     * - `audio`: array, the supported audio codecs. The array may include `"OPUS"`, or be empty.
     *
     */
    getSupportedCodec(): Promise<{
        video: string[];
        audio: string[];
    }>;
    /**
     * Checks the compatibility of the current browser.
     *
     * Use this method before calling {@link createClient} to check if the SDK is compatible with the web browser.
     *
     * @returns
     * - `true`: The SDK is compatible with the current web browser.
     * - `false`: The SDK is incompatible with the current web browser.
     */
    checkSystemRequirements(): boolean;
    /**
     * Creates a local client object for managing a call.
     *
     * This is usually the first step of using the Agora Web SDK.
     * @param config The configurations for the client object, including channel profile and codec. The default codec is `vp8` and default channel profile is `rtc`. See {@link ClientConfig} for details.
     * @category Agora Core
     */
    createClient(config: ClientConfig): IAgoraRTCClient;
    /**
     * Creates a customized audio track.
     *
     * This method creates a customized audio track from a [MediaStreamTrack](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack) object.
     *
     * @param config Configurations for the customized audio track.
     * @category Local Track
     */
    createCustomAudioTrack(config: CustomAudioTrackInitConfig): ILocalAudioTrack;
    /**
     * Creates an audio track from the audio sampled by a microphone.
     *
     * @param config Configurations for the sampled audio, such as the capture device and the encoder configuration. See {@link MicrophoneAudioTrackInitConfig}.
     * @category Local Track
     */
    createMicrophoneAudioTrack(config?: MicrophoneAudioTrackInitConfig): Promise<IMicrophoneAudioTrack>;
    /**
     *
     * Creates an audio track from an audio file or [AudioBuffer](https://developer.mozilla.org/en-US/docs/Web/API/AudioBuffer) object.
     *
     * This method works with both the local and online audio files, supporting the following formats:
     * - MP3.
     * - AAC.
     * - Other audio formats supported by the browser.
     * @param config Configurations such as the file path, caching strategies, and encoder configuration.
     * @returns Unlike other audio track objects, this audio track object adds the methods for audio playback control, such as playing, pausing, seeking and playback status querying.
     * @category Local Track
     */
    createBufferSourceAudioTrack(config: BufferSourceAudioTrackInitConfig): Promise<IBufferSourceAudioTrack>;
    /**
     * Creates a customized video track.
     *
     * This method creates a customized video track from a [MediaStreamTrack](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack) object.
     * @param config Configurations for the customized video track. See {@link CustomVideoTrackInitConfig}.
     * > As of v4.17.1, you can set the resolution and frame rate (in addition to the sending bitrate) for a customized video track by [config]{@link CustomVideoTrackInitConfig}.
     * @category Local Track
     */
    createCustomVideoTrack(config: CustomVideoTrackInitConfig): ILocalVideoTrack;
    /**
     * Creates a video track from the video captured by a camera.
     *
     * @param config Configurations for the captured video, such as the capture device and the encoder configuration.
     * @category Local Track
     */
    createCameraVideoTrack(config?: CameraVideoTrackInitConfig): Promise<ICameraVideoTrack>;
    /**
     * Creates an audio track and a video track.
     *
     * Creates an audio track from the audio sampled by a microphone and a video track from the video captured by a camera.
     *
     * > Calling this method differs from calling {@link createMicrophoneAudioTrack} and {@link createCameraVideoTrack} separately:
     * > - This method call requires access to the microphone and the camera at the same time. In this case, users only need to do authorization once.
     * > - Calling {@link createMicrophoneAudioTrack} and {@link createCameraVideoTrack} requires access to the microphone and the camera separately. In this case, users need to do authorization twice.
     * @param audioConfig Configurations for the sampled audio, such as the capture device and the encoder configurations.
     * @param videoConfig Configurations for the captured video, such as the capture device and the encoder configurations.
     */
    createMicrophoneAndCameraTracks(audioConfig?: MicrophoneAudioTrackInitConfig, videoConfig?: CameraVideoTrackInitConfig): Promise<[IMicrophoneAudioTrack, ICameraVideoTrack]>;
    /**
     * Creates a video track for screen sharing.
     *
     * @param config Configurations for the screen-sharing video, such as encoder configuration and capture configuration.
     * @param withAudio Whether to share the audio of the **screen sharing input source** when sharing the screen.
     * - `enable`: Share the audio.
     * - `disable`: (Default) Do not share the audio.
     * - `auto`: Share the audio, dependent on whether the browser supports this function.
     * > Note:
     * > - This function is only supported on Chrome 74 or later on Windows and macOS platforms.
     * > - On Windows, this function allows you to share the audio when sharing the entire screen and sharing Chrome tabs, but not when sharing the application window.
     * On macOS, this function allows you to share the audio only when sharing Chrome tabs.
     * > - For the audio sharing to take effect, the end user must check **Share audio** in the pop-up window when sharing the screen.
     * @returns
     * - If `withAudio` is `enable`, then this method returns a list containing a video track for screen sharing and an audio track. If the end user does not check **Share audio**, the SDK throws an error.
     * - If `withAudio` is `disable`, then this method returns a video track for screen sharing.
     * - If `withAudio` is `auto`, then the SDK attempts to share the audio on browsers supporting this function.
     *   - If the end user checks **Share audio**, then this method returns a list containing a video track for screen sharing and an audio track.
     *   - If the end user does not check **Share audio**, then this method only returns a video track for screen sharing.
     * @category Local Track
     */
    createScreenVideoTrack(config: ScreenVideoTrackInitConfig, withAudio: "enable"): Promise<[ILocalVideoTrack, ILocalAudioTrack]>;
    /**
     * Creates a video track for screen sharing.
     *
     * @param config Configurations for the screen-sharing video, such as encoder configuration and capture configuration.
     * @param withAudio Whether to share the audio of the **screen sharing input source** when sharing the screen.
     * - `enable`: Share the audio.
     * - `disable`: (Default) Do not share the audio.
     * - `auto`: Share the audio, dependent on whether the browser supports this function.
     * > Note:
     * > - This function is only supported on Chrome 74 or later on Windows and macOS platforms.
     * > - On Windows, this function allows you to share the audio when sharing the entire screen and sharing Chrome tabs, but not when sharing the application window.
     * On macOS, this function allows you to share the audio only when sharing Chrome tabs.
     * > - For the audio sharing to take effect, the end user must check **Share audio** in the pop-up window when sharing the screen.
     * @returns
     * - If `withAudio` is `enable`, then this method returns a list containing a video track for screen sharing and an audio track. If the end user does not check **Share audio**, the SDK throws an error.
     * - If `withAudio` is `disable`, then this method returns a video track for screen sharing.
     * - If `withAudio` is `auto`, then the SDK attempts to share the audio on browsers supporting this function.
     *   - If the end user checks **Share audio**, then this method returns a list containing a video track for screen sharing and an audio track.
     *   - If the end user does not check **Share audio**, then this method only returns a video track for screen sharing.
     */
    createScreenVideoTrack(config: ScreenVideoTrackInitConfig, withAudio: "disable"): Promise<ILocalVideoTrack>;
    /**
     * Creates a video track for screen sharing.
     *
     * @param config Configurations for the screen-sharing video, such as encoder configuration and capture configuration.
     * @param withAudio Whether to share the audio of the **screen sharing input source** when sharing the screen.
     * - `enable`: Share the audio.
     * - `disable`: (Default) Do not share the audio.
     * - `auto`: Share the audio, dependent on whether the browser supports this function.
     * > Note:
     * > - This function is only supported on Chrome 74 or later on Windows and macOS platforms.
     * > - On Windows, this function allows you to share the audio when sharing the entire screen and sharing Chrome tabs, but not when sharing the application window.
     * On macOS, this function allows you to share the audio only when sharing Chrome tabs.
     * > - For the audio sharing to take effect, the end user must check **Share audio** in the pop-up window when sharing the screen.
     * @returns
     * - If `withAudio` is `enable`, then this method returns a list containing a video track for screen sharing and an audio track. If the end user does not check **Share audio**, the SDK throws an error.
     * - If `withAudio` is `disable`, then this method returns a video track for screen sharing.
     * - If `withAudio` is `auto`, then the SDK attempts to share the audio on browsers supporting this function.
     *   - If the end user checks **Share audio**, then this method returns a list containing a video track for screen sharing and an audio track.
     *   - If the end user does not check **Share audio**, then this method only returns a video track for screen sharing.
     */
    createScreenVideoTrack(config: ScreenVideoTrackInitConfig, withAudio?: "enable" | "disable" | "auto"): Promise<[ILocalVideoTrack, ILocalAudioTrack] | ILocalVideoTrack>;
    /**
     * Enumerates the media input and output devices available, such as microphones, cameras, and headsets.
     *
     * If this method call succeeds, the SDK returns a list of media devices in an array of [MediaDeviceInfo](https://developer.mozilla.org/en-US/docs/Web/API/MediaDeviceInfo) objects.
     *
     * > Note:
     * > - Calling this method turns on the camera and microphone shortly for the device permission request. On browsers including Chrome 81 or later, Firefox, and Safari, the SDK cannot get accurate device information without permission for the media device.
     * > - The [MediaDeviceInfo.deviceId](https://developer.mozilla.org/en-US/docs/Web/API/MediaDeviceInfo/deviceId) property of a device may change. For example, it is reset when the user clears cookies. Agora does not recommend using the `deviceId` property to implement your business logic.
     *
     * ```javascript
     * getDevices().then(devices => {
     * console.log("first device id", devices[0].deviceId);
     * }).catch(e => {
     * console.log("get devices error!", e);
     * });
     * ```
     * @param skipPermissionCheck Whether to skip the permission check. If you set this parameter as `true`, the SDK does not trigger the request for media device permission. In this case, the retrieved media device information may be inaccurate.
     * - `true`: Skip the permission check.
     * - `false`: (Default) Do not skip the permission check.
     * @category Media Devices
     */
    getDevices(skipPermissionCheck?: boolean): Promise<MediaDeviceInfo[]>;
    /**
     * Enumerates the audio sampling devices available, such as microphones.
     *
     * If this method call succeeds, the SDK returns a list of audio input devices in an array of [MediaDeviceInfo](https://developer.mozilla.org/en-US/docs/Web/API/MediaDeviceInfo) objects.
     *
     * > Calling this method turns on the microphone shortly for the device permission request. On browsers including Chrome 81 or later, Firefox, and Safari, the SDK cannot get accurate device information without permission for the media device.
     *
     * @param skipPermissionCheck Whether to skip the permission check. If you set this parameter as `true`, the SDK does not trigger the request for media device permission. In this case, the retrieved media device information may be inaccurate.
     * - `true`: Skip the permission check.
     * - `false`: (Default) Do not skip the permission check.
     * @category Media Devices
     */
    getMicrophones(skipPermissionCheck?: boolean): Promise<MediaDeviceInfo[]>;
    /**
     * Enumerates the video capture devices available, such as cameras.
     *
     * If this method call succeeds, the SDK returns a list of video input devices in an array of [MediaDeviceInfo](https://developer.mozilla.org/en-US/docs/Web/API/MediaDeviceInfo) objects.
     *
     * > Calling this method turns on the camera shortly for the device permission request. On browsers including Chrome 81 or later, Firefox, and Safari, the SDK cannot get accurate device information without permission for the media device.
     *
     * @param skipPermissionCheck Whether to skip the permission check. If you set this parameter as `true`, the SDK does not trigger the request for media device permission. In this case, the retrieved media device information may be inaccurate.
     * - `true`: Skip the permission check.
     * - `false`: (Default) Do not skip the permission check.
     * @category Media Devices
     */
    getCameras(skipPermissionCheck?: boolean): Promise<MediaDeviceInfo[]>;
    /**
     * **Since**
     * <br>&emsp;&emsp;&emsp;*4.1.0*
     *
     * Enumerates the audio playback devices available, such as speakers.
     *
     * If this method call succeeds, the SDK returns a list of audio playback devices in an array of [MediaDeviceInfo](https://developer.mozilla.org/en-US/docs/Web/API/MediaDeviceInfo) objects.
     *
     * > - This method is supported on Chrome only.
     * > - Calling this method turns on the microphone briefly for the device permission request. On Chrome 81 or later, the SDK cannot get accurate device information without permission for the media device.
     *
     * @param skipPermissionCheck Whether to skip the permission check. If you set this parameter as `true`, the SDK does not trigger the request for media device permission. In this case, the retrieved media device information may be inaccurate.
     * - `true`: Skip the permission check.
     * - `false`: (Default) Do not skip the permission check.
     * @category Media Devices
     */
    getPlaybackDevices(skipPermissionCheck?: boolean): Promise<MediaDeviceInfo[]>;
    /**
     * Gets the sources for screen-sharing through Electron.
     *
     * > If your electron environment has set `contextIsolation: true`, calling this function will throw an error. You need to get screen source id with `contextBridge.exposeInMainWorld` method by yourself.
     * ```
     * // preload.js
     *
     * const {
     *   contextBridge, desktopCapturer
     * } = require("electron");
     *
     * contextBridge.exposeInMainWorld(
     *   "electronDesktopCapturer", {
     *     getSources: async (...args) => {
     *       const sources = await desktopCapturer.getSources(...args);
     *       return sources;
     *     }
     *   }
     * );
     *
     * // renderer.js
     * (async () => {
     *   sources = await window.electronDesktopCapturer.getSources(["window", "screen"]);
     *   const source = sources[0];   // just for example ,you shuould make an UI for user to select the exact source.
     *   const screenVideoTrack = await AgoraRTC.createScreenVideoTrack({ electronScreenSourceId: source.id });
     * })()
     *
     * ```
     * If this method call succeeds, the SDK returns a list of screen sources in an array of {@link ElectronDesktopCapturerSource} objects.
     * @param type The type of screen sources (window/application/screen) to get. See {@link ScreenSourceType}. If it is left empty, this method gets all the available sources.
     * @category Media Devices
     */
    getElectronScreenSources(type?: ScreenSourceType): Promise<ElectronDesktopCapturerSource[]>;
    /**
     * @ignore
     */
    setAppType(type: AppType): void;
    /**
     * Sets the output log level of the SDK.
     *
     * Choose a level to see the logs preceding that level. The log level follows the sequence of NONE, ERROR, WARNING, INFO, and DEBUG.
     *
     * For example, if you set the log level as `AgoraRTC.setLogLevel(1);`, then you can see logs in levels INFO, ERROR, and WARNING.
     * @param level The output log level.
     * - 0: DEBUG. Output all API logs.
     * - 1: INFO. Output logs of the INFO, WARNING and ERROR level.
     * - 2: WARNING. Output logs of the WARNING and ERROR level.
     * - 3: ERROR. Output logs of the ERROR level.
     * - 4: NONE. Do not output any log.
     * @category Logger
     */
    setLogLevel(level: number): void;
    /**
     * Enables log upload.
     *
     * Call this method to enable log upload to Agora’s server.
     *
     * The log-upload function is disabled by default. To enable this function, you must call this method before calling all the other methods.
     *
     * > If a user fails to join the channel, the log information (for that user) is unavailable on Agora's server.
     * @category Logger
     */
    enableLogUpload(): void;
    /**
     * Disables log upload.
     *
     * The log-upload function is disabled by default. If you have called {@link enableLogUpload}, then call this method when you need to stop uploading the log.
     * @category Logger
     */
    disableLogUpload(): void;
    /**
     * Creates an object for configuring the media stream relay.
     */
    createChannelMediaRelayConfiguration(): IChannelMediaRelayConfiguration;
    /**
     * Checks whether a video track is active.
     *
     * The SDK determines whether a video track is active by checking for image changes during the specified time frame.
     *
     * Agora recommends calling this method before starting a call to check the availability of the video capture device. You can pass the camera video track as a parameter in this method to check whether the camera works.
     *
     * > Notes:
     * > - If a video track is muted, this method returns `false`.
     * > - Do not call this method frequently as the check may affect web performance.
     *
     * ``` javascript
     * const videoTrack = await AgoraRTC.createCameraVideoTrack({ cameraId });
     * AgoraRTC.checkVideoTrackIsActive(videoTrack).then(result => {
     *   console.log(`${ cameraLabel } is ${ result ? "available" : "unavailable" }`);
     * }).catch(e => {
     *   console.log("check video track error!", e);
     * });
     * ```
     *
     * @param track The local or remote video track to be checked.
     * @param timeout The time frame (ms) for checking. The default value is 5,000 ms.
     *
     * @returns Whether the image in the specified video track changes during the specified time frame:
     * - `true`: The image changes. For the camera video track, it means the video capture device works.
     * - `false`: The image does not change. Possible reasons:
     *   - The video capturing device does not work properly or is blocked.
     *   - The video track is muted.
     */
    checkVideoTrackIsActive(track: ILocalVideoTrack | IRemoteVideoTrack, timeout?: number): Promise<boolean>;
    /**
     * Check whether an audio track is active.
     *
     * The SDK determines whether an audio track is active by checking whether the volume changes during the specified time frame.
     *
     * Agora recommends calling this method before starting a call to check the availability of the audio sampling device. You can pass the audio track from the audio sampled by a microphone as a parameter in this method to check whether the microphone works.
     *
     * > Notes:
     * > - The check may fail in a quiet environment. Agora suggests you instruct the end user to speak or make some noise when calling this method.
     * > - If an audio track is muted, this method returns `false`.
     * > - Do not call this method frequently as the check may affect web performance.
     *
     * ``` javascript
     * const audioTrack = await AgoraRTC.createMicrophoneAudioTrack({ microphoneId });
     * AgoraRTC.checkAudioTrackIsActive(audioTrack).then(result => {
     *   console.log(`${ microphoneLabel } is ${ result ? "available" : "unavailable" }`);
     * }).catch(e => {
     *   console.log("check audio track error!", e);
     * });
     * ```
     *
     * @param track The local or remote audio track to be checked.
     * @param timeout The time frame (ms) for checking. The default value is 5,000 ms.
     *
     * @returns Whether the volume in the specified audio track changes during the specified time frame:
     * - `true`: The volume changes. For the microphone audio track, it means the audio sampling device works.
     * - `false`: The volume does not change. Possible reasons:
     *   - The audio sampling device does not work properly.
     *   - The volume in the customized audio track does not change.
     *   - The audio track is muted.
     */
    checkAudioTrackIsActive(track: ILocalAudioTrack | IRemoteAudioTrack, timeout?: number): Promise<boolean>;
    /**
     * Occurs when a video capture device is added or removed.
     *
     * ``` javascript
     * AgoraRTC.onCameraChanged = (info) => {
     *   console.log("camera changed!", info.state, info.device);
     * };
     * ```
     * **Parameters**
     *
     * - **deviceInfo**: The information of the video capture device. See {@link DeviceInfo}.
     *
     * @category Global Callback
     */
    onCameraChanged?: (deviceInfo: DeviceInfo) => void;
    /**
     * Occurs when an audio sampling device is added or removed.
     *
     * ``` javascript
     * AgoraRTC.onMicrophoneChanged = (info) => {
     *   console.log("microphone changed!", info.state, info.device);
     * };
     * ```
     * **Parameters**
     *
     * - **deviceInfo**: The information of the device. See {@link DeviceInfo}.
     * @category Global Callback
     */
    onMicrophoneChanged?: (deviceInfo: DeviceInfo) => void;
    /**
     * **Since**
     * <br>&emsp;&emsp;&emsp;*4.1.0*
     *
     * Occurs when an audio playback device is added or removed.
     *
     * ``` javascript
     * AgoraRTC.onPlaybackDeviceChanged = (info) => {
     *   console.log("speaker changed!", info.state, info.device);
     * };
     * ```
     * **Parameters**
     *
     * - **deviceInfo**: The information of the device. See {@link DeviceInfo}.
     * @category Global Callback
     */
    onPlaybackDeviceChanged?: (deviceInfo: DeviceInfo) => void;
    /**
     * Occurs when the autoplay of an audio track fails.
     *
     * **DEPRECATED** from v4.6.0. Use [[onAutoplayFailed]] instead.
     *
     * If multiple tracks call `play` and all trigger autoplay blocking, the SDK triggers `onAudioAutoplayFailed` multiple times.
     *
     * The autoplay failure is caused by browsers' [autoplay blocking](https://developer.mozilla.org/en-US/docs/Web/Media/Autoplay_guide#Autoplay_and_autoplay_blocking), which does not affect video tracks.
     *
     * In the Agora Web SDK, once the user has interacted with the webpage, the autoplay blocking is removed. You can deal with the issue in either of the following ways:
     * - If you do not want to receive the `onAudioAutoplayFailed` callback, ensure that the user has interacted with the webpage before `RemoteAudioTrack.play` or `LocalAudioTrack.play` is called.
     * - If you cannot guarantee a user interaction before the call of `RemoteAudioTrack.play` or `LocalAudioTrack.play`, you can display a button and instruct the user to click it in the `onAudioAutoplayFailed` callback.
     *
     * > As the number of visits on a webpage increases, the browser adds the webpage to the autoplay whitelist, but this information is not accessible by JavaScript.
     *
     * The following example shows how to display a button for the user to click when autoplay fails.
     *
     * ```javascript
     *  let isAudioAutoplayFailed = false;
     *  AgoraRTC.onAudioAutoplayFailed = () => {
     *   if (isAudioAutoplayFailed) return;
     *
     *   isAudioAutoplayFailed = true;
     *   const btn = document.createElement("button");
     *   btn.innerText = "Click me to resume the audio playback";
     *   btn.onClick = () => {
     *     isAudioAutoplayFailed = false;
     *     btn.remove();
     *   };
     *   document.body.append(btn);
     * };
     * ```
     * > If multiple audio tracks call `play`, the `onAudioAutoplayFailed` is triggered multiple times. The example uses the `isAudioAutoplayFailed` object to avoid repeatedly creating buttons.
     *
     * @category Global Callback
     */
    onAudioAutoplayFailed?: () => void;
    /**
     *
     * **Since**
     * <br>&emsp;&emsp;&emsp;*4.6.0*
     *
     * Occurs when the autoplay of an audio track or a video track fails.
     *
     * Different from [[onAudioAutoplayFailed]], if multiple tracks call `play` and all trigger autoplay blocking, the SDK triggers `onAutoplayFailed` only once before a user gesture for removing the autoplay blocking occurs.
     *
     * The autoplay failure of audible media is caused by browsers' [autoplay blocking](https://developer.mozilla.org/en-US/docs/Web/Media/Autoplay_guide#Autoplay_and_autoplay_blocking). On most web browsers, inaudible media are not affected by autoplay blocking. However, on iOS Safari with low power mode enabled, or other iOS in-app browsers that implement a custom autoplay policy, such as WeChat browser, the autoplay of inaudible media is blocked.
     *
     * In the Agora Web SDK, once the user has interacted with the webpage, the autoplay blocking is removed. You can deal with the issue in either of the following ways:
     * - If you do not want to receive the `onAutoplayFailed` callback, ensure that the user has interacted with the webpage before `RemoteTrack.play` or `LocalTrack.play` is called.
     * - If you cannot guarantee a user interaction before the call of `RemoteTrack.play` or `LocalTrack.play`, you can display a button and instruct the user to click it in the `onAutoplayFailed` callback.
     *
     * > As the number of visits on a webpage increases, the browser may add the webpage to the autoplay whitelist, but this information is not accessible by JavaScript.
     *
     * The following example demonstrates how to display a button for the user to click when autoplay fails.
     *
     * ```javascript
     *  AgoraRTC.onAutoplayFailed = () => {
     *   const btn = document.createElement("button");
     *   btn.innerText = "Click me to resume the audio playback";
     *   btn.onClick = () => {
     *     btn.remove();
     *   };
     *   document.body.append(btn);
     * };
     * ```
     * > Since the SDK only triggers `onAutoplayFailed` once before a user gesture that removes the autoplay blocking occurs, you do not need to maintain the state of `isAutoPlayFailed` as you did for the `onAudioAutoplayFailed` callback.
     *
     * @category Global Callback
     * */
    onAutoplayFailed?: () => void;
    /**
     * **Since**
     * <br>&emsp;&emsp;&emsp;*4.15.0*
     *
     * Occurs when Agora-related services cause CSP (Content Security Policy) violations.
     *
     * When Agora fails to load a resource or send a request due to CSP violations, the SDK triggers this callback.
     * After receiving this callback, modify your CSP configuration to ensure that you can access Agora-related services.
     *
     * @category Global Callback
     */
    onSecurityPolicyViolation?: (event: SecurityPolicyViolationEvent) => void;
    /**
     * **Since**
     * <br>&emsp;&emsp;&emsp;*4.2.0*
     *
     * Sets the region for connection.
     *
     * This advanced feature applies to scenarios that have regional restrictions.
     *
     * By default, the SDK connects to nearby Agora servers. After specifying the region, the SDK connects to the Agora servers within that region.
     *
     * ```javascript
     * // Specify the region for connection as North America.
     * AgoraRTC.setArea({
     *   areaCode:"NORTH_AMERICA"
     * })
     * ```
     *
     * ```javascript
     * // Exclude Mainland China from the regions for connection.
     * AgoraRTC.setArea({
     *   areaCode:"GLOBAL",
     *   excludedArea:"CHINA"
     * })
     * ```
     *
     * @param area The region for connection. For supported regions, see {@link AREAS}. Choose either of the following ways to specify the region for connection:
     * - Set the `areaCode` parameter to specify only one region for connection.
     * - Set the `areaCode` parameter to specify a large region and the `excludedArea` parameter to specify a small region. The region for connection is the large region excluding the small region. You can only specify the large region as `"GLOBAL"`.
     */
    setArea(area: AREAS[] | {
        areaCode: AREAS[];
        excludedArea?: AREAS;
    }): void;
    /**
     * **Since**
     * <br>&emsp;&emsp;&emsp;*4.5.0*
     *
     * Enables the AEC (Acoustic Echo Canceller) for the audio played on the local client.
     * In a scenario where multiple users play a media file at the same time, such as watching a movie together, if the user A plays the media file through [HTMLMediaElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement) on Chrome with a speaker, the SDK captures the audio played by a speaker together with the voice of the user A. The other users can hear the audio sent by the user A and the audio played locally, which sounds like an echo. To deal with this echo issue, you can call `processExternalMediaAEC` and pass in the HTMLMediaElement to enable the AEC for the audio played on the local client.
     *
     * ```javascript
     * <audio crossOrigin="anonymous" src="http://www.test.com/test.mp3" id="audioDom"></audio>
     * <script>
     *   const element = document.getElementById("audioDom");
     *   AgoraRTC.processExternalMediaAEC(element);
     * </script>
     * ```
     *
     * > Note: If you play a cross-origin media file, you must set the `crossOrigin` property in [HTMLMediaElement](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement) as `"anonymous"` to allow the SDK to capture the media.
     *
     * @param element The [HTMLMediaElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement) object to which the echo cancellation is applied.
     */
    processExternalMediaAEC(element: HTMLMediaElement): void;
    /**
     * **Since**
     * <br>&emsp;&emsp;&emsp;*4.10.0*
     *
     * Registers an extension.
     *
     * Agora supports the following extensions:
     * - [Virtual Background Extension](https://docs.agora.io/en/Video/virtual_background_web_ng?platform=Web)
     * - [AI Denoiser Extension](https://docs.agora.io/en/Video/noise_reduction_web_ng?platform=Web)
     * - [Image Enhancement Extension](https://docs.agora.io/cn/Video/beauty_effect_web_ng?platform=Web)
     *
     * @param extensions The extension instance.
     */
    registerExtensions(extensions: IExtension<any>[]): void;
}

/**
 * An interface providing the local client with basic functions for a voice or video call, such as joining a channel, publishing tracks, or subscribing to tracks.
 *
 * An `AgoraRTCClient` object is created by the [[createClient]] method.
 * @public
 */
export declare interface IAgoraRTCClient extends EventEmitter {
    /**
     * Connection state between the SDK and the Agora server.
     */
    readonly connectionState: ConnectionState;
    /**
     * A list of the remote users in the channel, each of which includes the user ID and the corresponding track information.
     *
     * The list is empty if the local user has not joined a channel.
     */
    readonly remoteUsers: IAgoraRTCRemoteUser[];
    /**
     * **Since**
     * <br>&emsp;&emsp;&emsp;*4.0.0*
     *
     * The list of the local tracks that the local user is publishing.
     *
     * - After a success method call of [[publish]], the published track object is added to this list automatically.
     * - After a success method call of [[unpublish]], the unpublished track object is removed from this list automatically.
     */
    readonly localTracks: ILocalTrack[];
    /**
     * The ID of the local user.
     *
     * The value is `undefined` if the local user has not joined a channel.
     */
    readonly uid?: UID;
    /**
     * The current channel name.
     *
     * The value is `undefined` if the local user has not joined a channel.
     */
    readonly channelName?: string;
    /**
     * @ignore
     */
    readonly localDataChannels: ILocalDataChannel[];
    /**
     * @ignore
     * **Since**
     * <br>&emsp;&emsp;&emsp;*4.18.1*
     *
     * The current channel profile.
     */
    readonly mode: SDK_MODE;
    /**
     * @ignore
     * **Since**
     * <br>&emsp;&emsp;&emsp;*4.18.1*
     *
     * The current user role.
     */
    readonly role: ClientRole;
    /**
     * @param event The event name.
     * @param listener See [connection-state-change]{@link event_connection_state_change}.
     */
    on(event: "connection-state-change", listener: typeof event_connection_state_change): void;
    /**
     * @param event The event name.
     * @param listener See [user-joined]{@link event_user_joined}.
     */
    on(event: "user-joined", listener: typeof event_user_joined): void;
    /**
     * @param event The event name.
     * @param listener See [user-left]{@link event_user_left}.
     */
    on(event: "user-left", listener: typeof event_user_left): void;
    /**
     * @param event The event name.
     * @param listener See [user-published]{@link event_user_published}.
     */
    on(event: "user-published", listener: typeof event_user_published): void;
    /**
     * @param event The event name.
     * @param listener See [user-unpublished]{@link event_user_unpublished}.
     */
    on(event: "user-unpublished", listener: typeof event_user_unpublished): void;
    /**
     * @param event The event name.
     * @param listener See [user-info-updated]{@link event_user_info_updated}.
     */
    on(event: "user-info-updated", listener: typeof event_user_info_updated): void;
    /**
     * @param event The event name.
     * @param listener See [media-reconnect-start]{@link event_media_reconnect_start}.
     */
    on(event: "media-reconnect-start", listener: typeof event_media_reconnect_start): void;
    /**
     * @param event The event name.
     * @param listener See [media-reconnect-end]{@link event_media_reconnect_end}.
     */
    on(event: "media-reconnect-end", listener: typeof event_media_reconnect_end): void;
    /**
     * @param event The event name.
     * @param listener See [stream-type-changed]{@link event_stream_type_changed}.
     */
    on(event: "stream-type-changed", listener: typeof event_stream_type_changed): void;
    /**
     * @param event The event name.
     * @param listener See [stream-fallback]{@link event_stream_fallback}.
     */
    on(event: "stream-fallback", listener: typeof event_stream_fallback): void;
    /**
     * @param event The event name.
     * @param listener See [channel-media-relay-state]{@link event_channel_media_relay_state}.
     */
    on(event: "channel-media-relay-state", listener: typeof event_channel_media_relay_state): void;
    /**
     * @param event The event name.
     * @param listener See [channel-media-relay-event]{@link event_channel_media_relay_event}.
     */
    on(event: "channel-media-relay-event", listener: typeof event_channel_media_relay_event): void;
    /**
     * @param event The event name.
     * @param listener See [volume-indicator]{@link event_volume_indicator}.
     */
    on(event: "volume-indicator", listener: typeof event_volume_indicator): void;
    /**
     * @param event The event name.
     * @param listener See [crypt-error]{@link event_crypt_error}.
     */
    on(event: "crypt-error", listener: typeof event_crypt_error): void;
    /**
     * @param event The event name.
     * @param listener See [token-privilege-will-expire]{@link event_token_privilege_will_expire}.
     */
    on(event: "token-privilege-will-expire", listener: typeof event_token_privilege_will_expire): void;
    /**
     * @param event The event name.
     * @param listener See [token-privilege-did-expire]{@link event_token_privilege_did_expire}.
     */
    on(event: "token-privilege-did-expire", listener: typeof event_token_privilege_did_expire): void;
    /**
     * @param event The event name.
     * @param listener See [network-quality]{@link event_network_quality}.
     */
    on(event: "network-quality", listener: typeof event_network_quality): void;
    /**
     * @param event The event name.
     * @param listener See [live-streaming-error]{@link event_live_streaming_error}.
     */
    on(event: "live-streaming-error", listener: typeof event_live_streaming_error): void;
    /**
     * @param event The event name.
     * @param listener See [live-streaming-warning]{@link event_live_streaming_warning}.
     */
    on(event: "live-streaming-warning", listener: typeof event_live_streaming_warning): void;
    /**
     * @param event The event name.
     * @param listener See [exception]{@link event_exception}.
     */
    on(event: "exception", listener: typeof event_exception): void;
    /**
     * @param event The event name.
     * @param listener See [is-using-cloud-proxy]{@link event_is_using_cloud_proxy}.
     */
    on(event: "is-using-cloud-proxy", listener: typeof event_is_using_cloud_proxy): void;
    /**
     * **DEPRECATED** from 4.19.0.
     *
     * @param event The event name.
     * @param listener See [join-fallback-to-proxy]{@link event_join_fallback_to_proxy}.
     */
    on(event: "join-fallback-to-proxy", listener: typeof event_join_fallback_to_proxy): void;
    /**
     * @param event The event name.
     * @param listener See [published-user-list]{@link event_published_user_list}.
     */
    on(event: "published-user-list", listener: typeof event_published_user_list): void;
    /**
     * @param event The event name.
     * @param listener See [content-inspect-connection-state-change]{@link event_content_inspect_connection_state_change}.
     */
    on(event: "content-inspect-connection-state-change", listener: typeof event_content_inspect_connection_state_change): void;
    /**
     * @param event The event name.
     * @param listener See [content-inspect-error]{@link event_content_inspect_error}.
     */
    on(event: "content-inspect-error", listener: typeof event_content_inspect_error): void;
    /**
     * When the specified event happens, the SDK triggers the callback that you pass.
     *
     * @param event The event name.
     * @param listener See [image-moderation-connection-state-change]{@link event_image_moderation_connection_state_change}.
     */
    on(event: "image-moderation-connection-state-change", listener: typeof event_image_moderation_connection_state_change): void;
    /**
     * When the specified event happens, the SDK triggers the callback that you pass.
     *
     * @param event The event name.
     * @param listener The callback function.
     */
    on(event: string, listener: Function): void;
    /**
     * Allows a user to join a channel.
     *
     * Users in the same channel can talk to each other.
     *
     * When joining a channel, the [AgoraRTCClient.on("connection-state-change")]{@link event_connection_state_change} callback is triggered on the local client.
     *
     * After joining a channel, if the user is in the communication profile, or is a host in the Live Broadcast profile, the [AgoraRTCClient.on("user-joined")]{@link event_user_joined} callback is triggered on the remote client.
     *
     * @param appid The [App ID](https://docs.agora.io/en/Agora%20Platform/terms?platform=All%20Platforms#appid) of your Agora project.
     * @param token The token generated at your server:
     * - For low-security requirements: You can use the temporary token generated at Console. For details, see [Get an RTC temporary token](https://docs.agora.io/en/Agora%20Platform/get_appid_token?platform=All%20Platforms#generate-an-rtc-temporary-token).
     * - For high-security requirements: Set it as the token generated at your server. For details, see [Authenticate Your Users with Tokens](https://docs.agora.io/en/Video/token_server?platform=Web).
     * @param channel A string that provides a unique channel name for the call. The length must be within 64 bytes. Supported character scopes:
     * - All lowercase English letters: a to z.
     * - All uppercase English letters: A to Z.
     * - All numeric characters: 0 to 9.
     * - The space character.
     * - Punctuation characters and other symbols, including: "!", "#", "$", "%", "&", "(", ")", "+", "-", ":", ";", "<", "=", ".", ">", "?", "@", "[", "]", "^", "_", " {", "}", "|", "~", ",".
     * @param uid The user ID, an integer or a string, ASCII characters only. Ensure this ID is unique. If you set the `uid` to `null`, the Agora server assigns a number uid and returns it in the Promise object.
     * - If you use a number as the user ID, it should be a 32-bit unsigned integer with a value ranging from 0 to (2<sup>32</sup>-1).
     * - If you use a string as the user ID, the maximum length is 255 characters.
     *
     * <div class="alert warning">To ensure a better end-user experience, Agora recommends using a number as the user ID.</div>
     *
     * > Note:
     * > - All users in the same channel should have the same type (number or string) of `uid`.
     * > - You can use string UIDs to interoperate with the Native SDK 2.8 or later. Ensure that the Native SDK uses the User Account to join the channel. See [Use String User Accounts](https://docs.agora.io/en/faq/string).
     * > - To ensure the data accuracy in Agora Analytics, Agora recommends that you specify `uid` for each user and ensure it is unique.
     *
     * @returns A Promise object with the user ID.
     * - If you pass a number as the user ID, the SDK returns a number `uid`.
     * - If you pass a string as the user ID, the SDK returns a string `uid`.
     * - If you leave the `uid` parameter empty or set it as `null`, the Agora server assigns a number `uid` and returns it.
     * @category Agora Core
     */
    join(appid: string, channel: string, token: string | null, uid?: UID | null): Promise<UID>;
    /**
     * Leaves a channel.
     *
     * When leaving the channel, the [AgoraRTCClient.on("connection-state-change")]{@link IAgoraRTCClient.event_connection_state_change} callback is triggered on the local client.
     *
     * When a user (in the communication profile) or a host (in the live-broadcast profile) leaves the channel, the [AgoraRTCClient.on("user-left")]{@link IAgoraRTCClient.event_user_left} callback is triggered on each remote client in the channel.
     * @category Agora Core
     */
    leave(): Promise<void>;
    /**
     * Publishes local audio and/or video tracks to a channel.
     *
     * After publishing the local tracks, the [AgoraRTCClient.on("user-published")]{@link event_user_published} callback is triggered on the remote client.
     *
     * > Note:
     * > - In an interactive live streaming, call {@link setClientRole} to set the user role as the host before calling this method.
     * > - You can call this method multiple times to add tracks for publishing.
     * > - An `AgoraRTCClient` object can publish multiple audio tracks. The SDK automatically mixes the audio tracks into one audio track. Exception: Safari does not support publishing multiple audio tracks on versions earlier than Safari 12.
     * > - An `AgoraRTCClient` object can publish **only one video track**. If you want to switch the published video track, for example, from a camera video track to a scree-sharing video track, you must unpublish the published video track.
     * @param tracks Local tracks created by [AgoraRTC.createMicrophoneAudioTrack]{@link IAgoraRTC.createMicrophoneAudioTrack} / [AgoraRTC.createCameraVideoTrack]{@link IAgoraRTC.createCameraVideoTrack} or other methods.
     * @category Agora Core
     */
    publish(tracks: ILocalTrack | ILocalTrack[]): Promise<void>;
    /**
     * @ignore
     */
    publish(config: IDataChannelConfig): Promise<ILocalDataChannel>;
    /**
     * @ignore
     */
    publish(params: ILocalTrack | ILocalTrack[] | IDataChannelConfig): Promise<ILocalDataChannel | void>;
    /**
     * Unpublishes the local audio and/or video tracks.
     *
     * After the local client unpublishes, the [AgoraRTCClient.on("user-unpublished")]{@link event_user_unpublished} callback is triggered on each remote client in the channel.
     *
     * > Note: In an interactive live streaming, after a host unpublishes the local tracks, the SDK does not automatically change the role of this host to the audience. To change the user role, you must call {@link setClientRole}.
     *
     * @param tracks The tracks to unpublish. If left empty, all the published tracks are unpublished.
     * @category Agora Core
     */
    unpublish(tracks?: ILocalTrack | ILocalTrack[]): Promise<void>;
    /**
     * @ignore
     */
    unpublish(dataChannel?: ILocalDataChannel): Promise<void>;
    /**
     * @ignore
     */
    unpublish(params?: ILocalTrack | ILocalTrack[] | ILocalDataChannel): Promise<void>;
    /**
     * Subscribes to the audio and/or video tracks of a remote user.
     *
     * ```javascript
     * await client.subscribe(user，"audio");
     * user.audioTrack.play();
     * ```
     * @param user The remote user.
     * @param mediaType The media type of the tracks to subscribe to.
     * - `"video"`: Subscribe to the video track only.
     * - `"audio"`: Subscribe to the audio track only.
     *
     * @returns When the subscription succeeds, the SDK adds the subscribed tracks to [user.audioTrack]{@link IAgoraRTCRemoteUser.audioTrack} and [user.videoTrack]{@link IAgoraRTCRemoteUser.videoTrack}. You can go on to call [audioTrack.play]{@link IRemoteAudioTrack.play} or [videoTrack.play]{@link IRemoteVideoTrack.play} to play the tracks.
     * > The `Promise` object throws the `TRACK_IS_NOT_PUBLISHED` error if the specified tracks do not exist.
     * @category Agora Core
     */
    subscribe(user: IAgoraRTCRemoteUser, mediaType: "video"): Promise<IRemoteVideoTrack>;
    /**
     * Subscribes to the audio and/or video tracks of a remote user.
     *
     * ```javascript
     * await client.subscribe(user，"audio");
     * user.audioTrack.play();
     * ```
     * @param user The remote user.
     * @param mediaType The media type of the tracks to subscribe to.
     * - `"video"`: Subscribe to the video track only.
     * - `"audio"`: Subscribe to the audio track only.
     *
     * @returns When the subscription succeeds, the SDK adds the subscribed tracks to [user.audioTrack]{@link IAgoraRTCRemoteUser.audioTrack} and [user.videoTrack]{@link IAgoraRTCRemoteUser.videoTrack}. You can go on to call [audioTrack.play]{@link IRemoteAudioTrack.play} or [videoTrack.play]{@link IRemoteVideoTrack.play} to play the tracks.
     * > The `Promise` object throws the `TRACK_IS_NOT_PUBLISHED` error if the specified tracks do not exist.
     * @category Agora Core
     */
    subscribe(user: IAgoraRTCRemoteUser, mediaType: "audio"): Promise<IRemoteAudioTrack>;
    /**
     * @ignore
     */
    subscribe(user: IAgoraRTCRemoteUser, mediaType: "datachannel", channelId: number): Promise<IRemoteDataChannel>;
    /**
     * Subscribes to the audio and/or video tracks of a remote user.
     *
     * ```javascript
     * await client.subscribe(user，"audio");
     * user.audioTrack.play();
     * ```
     * @param user The remote user.
     * @param mediaType The media type of the tracks to subscribe to.
     * - `"video"`: Subscribe to the video track only.
     * - `"audio"`: Subscribe to the audio track only.
     * - `"datachannel"`: Reserved for future use.
     *
     * @returns When the subscription succeeds, the SDK adds the subscribed tracks to [user.audioTrack]{@link IAgoraRTCRemoteUser.audioTrack} and [user.videoTrack]{@link IAgoraRTCRemoteUser.videoTrack}. You can go on to call [audioTrack.play]{@link IRemoteAudioTrack.play} or [videoTrack.play]{@link IRemoteVideoTrack.play} to play the tracks.
     * > The `Promise` object throws the `TRACK_IS_NOT_PUBLISHED` error if the specified tracks do not exist.
     * @category Agora Core
     */
    subscribe(user: IAgoraRTCRemoteUser, mediaType: "video" | "audio" | "datachannel", channelId?: number): Promise<IRemoteTrack | IRemoteDataChannel>;
    /**
     * **Since**
     * <br>&emsp;&emsp;&emsp;*4.11.0*
     *
     * Subscribes to the audio and/or video tracks of multiple remote users at one time.
     *
     * ```javascript
     * const result = await client.massSubscribe([{user:userA, mediaType:'audio'}, {user: userB, mediaType:'audio'}]);
     *
     * for(const {track, mediaType, error} of result) {
     *   if(error) {
     *     console.error(error);
     *     continue;
     *   }
     *
     *   if(track) {
     *     if(mediaType === 'audio') {
     *       track.play();
     *     }else{
     *       track.play(document.querySelector('.video-container'));
     *     }
     *   }
     * }
     * ```
     *
     * @param subscribeList The list of remote users to subscribe to. Each list entry contains the following information:
     * - `user`: The remote user. See [AgoraRTCRemoteUser]{@link IAgoraRTCRemoteUser}.
     * - `mediaType`: The media type of the tracks to subscribe to.
     *   - `"video"`: Subscribe to this user's video track.
     *   - `"audio"`: Subscribe to this user's audio track.
     *
     * @returns Normally, the returned list has the same length and order as `subscribeList`, and each list entry contains the following information:
     * - `user`: The remote user. See [AgoraRTCRemoteUser]{@link IAgoraRTCRemoteUser}.
     * - `mediaType`: The media type of the tracks subscribed to:
     *   - `"video"`: The video track is subscribed to.
     *   - `"audio"`: The audio track is subscribed to.
     * - `track`: The remote track. See [RemoteTrack]{@link IRemoteTrack}.
     * - `error`: The error message. If subscription of a user's audio and/or video tracks fails, the error message is returned through this parameter.
     */
    massSubscribe(subscribeList: {
        user: IAgoraRTCRemoteUser;
        mediaType: "audio" | "video";
    }[]): Promise<{
        user: IAgoraRTCRemoteUser;
        mediaType: "audio" | "video";
        track?: IRemoteTrack;
        error?: AgoraRTCError;
    }[]>;
    /**
     * Unsubscribes from the audio and/or video tracks of a remote user.
     *
     * @param user The remote user.
     * @param mediaType The media type of the tracks to unsubscribe from:
     * - `"video"`: Unsubscribe from the video track only.
     * - `“audio”`: Unsubscribe from the audio track only.
     * - empty: Unsubscribe from all the tracks published by the remote user.
     * - `"datachannel"`: Reserved for future use.
     * @param channelId Reserved for future use.
     * @returns The `Promise` object throws the `TRACK_IS_NOT_SUBSCRIBED` error if the specified tracks do not exist.
     * @category Agora Core
     */
    unsubscribe(user: IAgoraRTCRemoteUser, mediaType?: "video" | "audio" | "datachannel", channelId?: number): Promise<void>;
    /**
     * **Since**
     * <br>&emsp;&emsp;&emsp;*4.11.0*
     *
     * Unsubscribes from the audio and/or video tracks of multiple remote users at one time.
     *
     * ```javascript
     * client.massUnsubscribe([{user:userA}, {user: userB}]);
     * ```
     * @param unsubscribeList The list of remote users to unsubscribe from. Each list entry contains the following information:
     * - `user`: The remote user. See [AgoraRTCRemoteUser]{@link IAgoraRTCRemoteUser}.
     * - `mediaType`: The media type of the tracks to unsubscribe from.
     *   - `"video"`: Unsubscribe from this user's video track.
     *   - `"audio"`: Unsubscribe from this user's audio track.
     *   - empty: Unsubscribe from all the tracks published by this user.
     */
    massUnsubscribe(unsubscribeList: {
        user: IAgoraRTCRemoteUser;
        mediaType?: "audio" | "video";
    }[]): Promise<void>;
    /**
     * Sets the video profile of the low-quality video stream.
     *
     * If you have enabled the dual-stream mode by calling {@link enableDualStream}, use this method to set the low-quality video stream profile.
     *
     * If you do not set the low-quality video stream profile, the SDK assigns the default values based on your stream video profile.
     *
     * > Note:
     * > - Firefox: Frame rate settings do not take effect. The browser sets the frame rate as 30 fps.
     * > - iOS Safari: The browser does not support setting `LowStreamParameter.bitrate`. The resolution of the low-quality stream must be proportional to the resolution of the high-quality stream.
     * > - Due to limitations of some devices and browsers, the resolution you set may get adjusted by the browser. In this case, billings are calculated based on the actual resolution.
     * @param streamParameter The video profile of the low-quality video stream.
     * @category Dual Stream
     */
    setLowStreamParameter(streamParameter: LowStreamParameter): void;
    /**
     * Enables dual-stream mode.
     *
     * Enables dual-stream mode for the local stream. Dual streams are a hybrid of a high-quality video stream and a low-quality video stream:
     * - High-quality video stream: High bitrate, high resolution.
     * - Low-quality video stream: Low bitrate, low resolution. The default video profile of the low-quality stream is: A resolution (width × height) of 160 × 120 px, a bitrate of 50 Kbps, and a frame rate of 15 fps. Call {@link setLowStreamParameter} to customize the video profile of the low-quality stream.
     *
     * > Note:
     * > - `enableDualStream` does not apply to the audio-only mode.
     * > - On Android Chrome, the Web SDK cannot send high-quality and low-quality streams in H.264.
     *
     * ```javascript
     * client.enableDualStream().then(() => {
     *   console.log("Enable Dual stream success!");
     * }).catch(err => {
     *   console.log(err);
     * })
     * ```
     * @category Dual Stream
     */
    enableDualStream(): Promise<void>;
    /**
     * Disables dual-stream mode.
     * @category Dual Stream
     */
    disableDualStream(): Promise<void>;
    /**
     * Sets the user role and level in a live streaming (when [mode]{@link ClientConfig.mode} is `"live"`).
     *
     * - The user role determines the permissions that the SDK grants to a user, such as permission to publish local streams, subscribe to remote streams, and push streams to a CDN address. You can set the user role as `"host"` or `"audience"`. A host can publish and subscribe to streams, while an audience member can only subscribe to streams. The default role in a live streaming is `"audience"`. Before publishing tracks, you must call this method to set the user role as `"host"`.
     * - The detailed options of a user, including the user level. The user level determines the level of services that a user can enjoy within the permissions of the user's role. For example, an audience can choose to receive remote streams with low latency or ultra low latency. Levels affect prices.
     *
     * > Note:
     * > - When [mode]{@link ClientConfig.mode} is `"rtc"`, this method does not take effect and all users are `"host"` by default.
     * > - If the local client switches the user role after joining a channel, the SDK triggers the [AgoraRTCClient.on("user-joined")]{@link event_user_joined} or [AgoraRTCClient.on("user-left")]{@link event_user_left} callback on the remote client.
     * > - To switch the user role to `"audience"` after calling {@link publish}, call {@link unpublish} first. Otherwise the method call fails and throws an exception.
     *
     * @param role The role of the user.
     * @param options The detailed options of a user, including user level.
     */
    setClientRole(role: ClientRole, options?: ClientRoleOptions): Promise<void>;
    /**
     *
     * Deploys your proxy server.
     *
     * Do not use this method and {@link startProxyServer} together. They have
     * the following differences:
     * - `setProxyServer`: This method allows you to use a custom proxy server
     * for purposes including signaling transmission, log uploading, and event reporting. But it cannot be used for media transmission.
     * - `startProxyServer`: This method provides Agora's cloud proxy service,
     * which handles media and signaling transmission with simple setup. For more
     * information, refer to [Using Cloud Proxy Service](https://docs.agora.io/en/
     * video-call-4.x/cloud_proxy_web_ng?platform=Web).
     *
     * > Note:
     * > - Call this method before {@link join}.
     * > - Proxy services by different service providers may result in slow performance if you are using the Firefox browser. Therefore, Agora recommends using the same service provider for the proxy services. If you use different service providers, Agora recommends not using the Firefox browser.
     * @param proxyServer Your proxy server domain name. ASCII characters only.
     * @category Proxy
     */
    setProxyServer(proxyServer: string): void;
    /**
     * @ignore
     * Deploys a TURN server.
     *
     * You can also use cloud proxy by {@link startProxyServer}. See [Use Cloud Proxy](https://docs.agora.io/en/Interactive%20Broadcast/cloud_proxy_web?platform=Web) for details.
     *
     * > Call this method before {@link join}.
     *
     * @param turnServer The TURN server settings.
     * @category Proxy
     */
    setTurnServer(turnServer: TurnServerConfig): void;
    /**
     * Enables cloud proxy.
     *
     * You must call this method before joining the channel or after leaving the channel.
     *
     * For the extra settings required for using the cloud proxy service, see [Use Cloud Proxy](https://docs.agora.io/en/Interactive%20Broadcast/cloud_proxy_web_ng?platform=Web).
     *
     * @param mode Cloud proxy mode:
     * - `3`: The cloud proxy for the UDP protocol, that is, the Force UDP cloud proxy mode. In this mode, the SDK always transmits data over UDP.
     * - `5`: The cloud proxy for the TCP (encryption) protocol, that is, the Force TCP cloud proxy mode. In this mode, the SDK always transmits data over TLS 443.
     *
     * > Note:
     * > As of v4.15.0, the default value of `mode` is `3`.
     *
     * @category Proxy
     */
    startProxyServer(mode?: number): void;
    /**
     * Disables cloud proxy.
     *
     * You must call this method before joining the channel or after leaving the channel.
     * @category Proxy
     */
    stopProxyServer(): void;
    /**
     * Sets which video stream of a remote user to subscribe to.
     *
     * If a remote user enables dual-stream mode, the user sends a hybrid of a high-quality video stream and a low-quality video stream. Use this method to set which video stream to subscribe to. The local client subscribes to the high-quality video stream by default.
     *
     * > This method works only if the remote user has enabled dual-stream mode ({@link enableDualStream}).
     * > If both this method and {@link setStreamFallbackOption} are called, the actual video stream that the user subscribes to depends on the fallback option set in {@link setStreamFallbackOption}.
     *
     * @param uid The ID of the remote user.
     * @param streamType The remote video stream type:
     * - 0: High-bitrate, high-resolution video stream.
     * - 1: Low-bitrate, low-resolution video stream.
     * @category Dual Stream
     */
    setRemoteVideoStreamType(uid: UID, streamType: RemoteStreamType): Promise<void>;
    /**
     * Sets the video type of all of the remote stream.
     *
     * If a remote user enables dual-stream mode, after using this method, local client will subscribe the specified streamType by default. The local client subscribes to the high-quality video stream by default.
     *
     * > - Agora suggests calling `setRemoteDefaultVideoStreamType` before joining the channel.
     * > - The method call of {@link setRemoteVideoStreamType} to set the video stream type of a specified remote user overrides this method.
     *
     * @param streamType The remote video stream type:
     * - 0: High-bitrate, high-resolution video stream.
     * - 1: Low-bitrate, low-resolution video stream.
     * @category Dual Stream
     */
    setRemoteDefaultVideoStreamType(streamType: RemoteStreamType): Promise<void>;
    /**
     * @ignore
     */
    pickSVCLayer(uid: UID, layerOptions: {
        spatialLayer: 0 | 1 | 2 | 3;
        temporalLayer: 0 | 1 | 2 | 3;
    }): Promise<void>;
    /**
     * @ignore
     */
    setRTM2Flag(flag: number): Promise<void>;
    /**
     * Sets the stream fallback option.
     *
     * Use this method to set the fallback option for the subscribed video stream.
     * Under poor network conditions, the SDK can subscribe to the low-quality video stream or only to the audio stream.
     *
     * If the auto-fallback option is enabled, the SDK triggers the [AgoraRTCClient.on("stream-type-changed")]{@link event_stream_type_changed} callback when the remote stream changes from a high-quality video stream to a low-quality video stream or vice versa, and triggers the [AgoraRTCClient.on("stream-fallback")]{@link event_stream_fallback} callback when the remote stream changes from a video stream to an audio stream or vice versa.
     *
     * > This method works only if the remote user has enabled the dual-stream mode by {@link enableDualStream}.
     * @param uid The ID of the remote user.
     * @param fallbackType The fallback option. See {@link RemoteStreamFallbackType} for details.
     * @category Dual Stream
     */
    setStreamFallbackOption(uid: UID, fallbackType: RemoteStreamFallbackType): Promise<void>;
    /**
     * Sets the encryption configurations.
     *
     * Use this method to enable the built-in encryption before joining a channel.
     *
     * If the encryption configurations are incorrect, the SDK triggers the [AgoraRTCClient.on("crypt-error")]{@link event_crypt_error} callback when publishing tracks or subscribing to tracks.
     *
     * > Notes:
     * > - All users in a channel must use the same encryption mode, secret, and salt.
     * > - You must call this method before joining a channel, otherwise the method call does not take effect and encryption is not enabled.
     * > - As of v4.7.0, after a user leaves the channel, the SDK automatically disables the built-in encryption. To re-enable the built-in encryption, call this method before the user joins the channel again.
     * > - Do not use this method for CDN live streaming.
     *
     * @param encryptionMode The encryption mode.
     * @param secret The encryption secret. ASCII characters only. When a user uses a weak secret, the SDK outputs a warning message to the Web Console and prompts the users to set a strong secret. A strong secret must contain at least eight characters and be a combination of uppercase and lowercase letters, numbers, and special characters. Due to browser encryption algorithm limitations, the secret length cannot exceed 62 characters. Agora recommends you use OpenSSL to generate the secret on your server. For details, see [Media Stream Encryption](https://docs.agora.io/en/Video/channel_encryption_web_ng?platform=Web).
     * @param salt The salt. Only valid when you set the encryption mode as `"aes-128-gcm2"` or `"aes-256-gcm2"`. Agora recommends you use OpenSSL to generate the salt on your server. For details, see [Media Stream Encryption](https://docs.agora.io/en/Video/channel_encryption_web_ng?platform=Web).
     */
    setEncryptionConfig(encryptionMode: EncryptionMode, secret: string, salt?: Uint8Array): void;
    /**
     * Renews the token.
     *
     * The token expires after a set time once token is enabled. When the SDK triggers the [AgoraRTCClient.on("token-privilege-will-expire")]{@link event_token_privilege_will_expire} callback, call this method to pass a new token. Otherwise the SDK disconnects from the server.
     * @param token The new token.
     */
    renewToken(token: string): Promise<void>;
    /**
     * Enables the volume indicator.
     *
     * This method enables the SDK to regularly report the local and remote users who are speaking and their volumes.
     *
     * After the volume indicator is enabled, the SDK triggers the [AgoraRTCClient.on("volume-indicator")]{@link event_volume_indicator} callback to report the volumes every two seconds, regardless of whether there are active speakers in the channel.
     *
     * > If the local user leaves the channel and rejoins the channel, you need to call `enableAudioVolumeIndicator` again.
     *
     * ```javascript
     * client.enableAudioVolumeIndicator();
     * client.on("volume-indicator", volumes => {
     *   volumes.forEach((volume, index) => {
     *     console.log(`${index} UID ${volume.uid} Level ${volume.level}`);
     *   });
     * })
     * ```
     */
    enableAudioVolumeIndicator(): void;
    /**
     * Gets the statistics of the call.
     *
     * @returns The statistics of the call.
     */
    getRTCStats(): AgoraRTCStats;
    /**
     * Sets the video layout and audio for CDN live streaming.
     *
     * > Ensure that you [enable the RTMP Converter service](https://docs.agora.io/en/Interactive%20Broadcast/cdn_streaming_web?platform=Web#prerequisites) before using this function.
     * @param config Configurations for live transcoding. See {@link LiveStreamingTranscodingConfig} for details.
     * @category Live Streaming
     */
    setLiveTranscoding(config: LiveStreamingTranscodingConfig): Promise<void>;
    /**
     * Publishes the local stream to the CDN.
     *
     * See [Push Streams to the CDN](https://docs.agora.io/en/Interactive%20Broadcast/cdn_streaming_web?platform=Web) for details.
     *
     * > Note:
     * > - This method adds only one stream HTTP/HTTPS URL address each time it is called.
     * > - Pushing streams to the CDN is not supported on mobile devices.
     *
     * @param url The CDN streaming URL in the RTMP format. ASCII characters only.
     * @param transcodingEnabled Whether to enable live transcoding.
     * Transcoding sets the audio and video profiles and the picture-in-picture layout for the stream to be pushed to the CDN. It is often used to combine the audio and video streams of multiple hosts in a CDN live stream.
     * > If set as `true`, {@link setLiveTranscoding} must be called before this method.
     * - `true`: Enable transcoding.
     * - `false`: (Default) Disable transcoding.
     * @category Live Streaming
     */
    startLiveStreaming(url: string, transcodingEnabled?: boolean): Promise<void>;
    /**
     * Removes a URL from CDN live streaming.
     *
     * This method removes only one URL address each time it is called. To remove multiple URLs, call this method multiple times.
     * @param url The URL to be removed.
     * @category Live Streaming
     */
    stopLiveStreaming(url: string): Promise<void>;
    /**
     * @ignore
     *
     * > Note: Agora will soon stop the service for injecting online media streams on the client. If you have not implemented this service, Agora recommends that you do not use it.
     *
     * Injects an online media stream to a live-broadcast channel.
     *
     * After you call this method, the server pulls the online stream and injects it into a live-broadcast channel. This is applicable to scenarios where all audience members in the channel can watch a live show and interact with each other. See [Inject Online Media Stream](https://docs.agora.io/en/Interactive%20Broadcast/inject_stream_web_ng?platform=Web) for details.
     *
     * If the online media stream is injected successfully, this stream is added to the channel, and all users in the channel receive the [AgoraRTCClient.on("user-published")]{@link event_user_published} and [AgoraRTCClient.on("user-joined")]{@link event_user_joined} callbacks with the `uid` 666.
     *
     * The SDK reports the status of the media stream by triggering the [AgoraRTCClient.on("stream-inject-status")]{@link event_stream_inject_status} event.
     *
     * @param url The URL address to be injected to the ongoing live broadcast. ASCII characters only, and the string length must be less than 1024 bytes. Valid protocols are RTMP, HLS, and HTTP-FLV.
     * - Supported audio codec type: AAC.
     * - Supported video codec type: H264(AVC).
     * @param config Configurations for the injected stream.
     * @category Inject Stream
     */
    addInjectStreamUrl(url: string, config: InjectStreamConfig): Promise<void>;
    /**
     * @ignore
     *
     * > Note: Agora will soon stop the service for injecting online media streams on the client. If you have not implemented this service, Agora recommends that you do not use it.
     *
     * Removes an injected stream.
     *
     * This method removes an injected stream (added by [[addInjectStreamUrl]]) from the live broadcast.
     *
     * If the injected stream is removed successfully, all users in the channel receive the [AgoraRTCClient.on("user-left")]{@link event_user_left} and [AgoraRTCClient.on("user-unpublished")]{@link event_user_unpublished} callbacks.
     * @category Inject Stream
     */
    removeInjectStreamUrl(): Promise<void>;
    /**
     * Starts relaying media streams across channels.
     *
     * After this method call, the SDK triggers the following callbacks:
     *
     * - [AgoraRTCClient.on("channel-media-relay-state")]{@link event_channel_media_relay_state}, which reports the state and error code of the media stream relay.
     *   - If the media stream relay fails, this callback returns `state` 3. Refer to `code` for the error code and call this method again.
     * - [AgoraRTCClient.on("channel-media-relay-event")]{@link event_channel_media_relay_event}, which reports the events of the media stream relay.
     *   - If the media stream relay starts successfully, this callback returns `code` 4, reporting that the SDK starts relaying the media stream to the destination channel.
     *
     * > Note:
     * >
     * > - Contact sales-us@agora.io to enable this function.
     * > - We do not support string user IDs in this API.
     * > - Call this method only after joining a channel.
     * > - In a live-broadcast channel, only a host can call this method.
     * > - To call this method again after it succeeds, you must call {@link stopChannelMediaRelay} to quit the current relay.
     *
     * ```javascript
     * client.startChannelMediaRelay(config).then(() => {
     *   console.log("startChannelMediaRelay success");
     * }).catch(e => {
     *   console.log("startChannelMediaRelay failed", e);
     * })
     * ```
     * @param config Configurations of the media stream relay.
     * @returns A `Promise` object, which is resolved if the media relay starts successfully.
     * @category Channel Media Relay
     */
    startChannelMediaRelay(config: IChannelMediaRelayConfiguration): Promise<void>;
    /**
     * Updates the destination channels for media stream relay.
     *
     * After the channel media relay starts, if you want to relay the media stream to more channels, or leave the current relay channel, you can call this method.
     *
     * > Note:
     * >
     * > - Call this method after {@link startChannelMediaRelay}.
     * > - You can add a maximum of four destination channels to a relay.
     * @param config Configurations of the media stream relay.
     * @returns A Promise object, which is resolved if the update succeeds. If the update fails, the media relay state is reset, and you need to call {@link startChannelMediaRelay} again to restart the relay.
     * @category Channel Media Relay
     */
    updateChannelMediaRelay(config: IChannelMediaRelayConfiguration): Promise<void>;
    /**
     * Stops the media stream relay.
     *
     * Once the relay stops, the user leaves all the destination channels.
     *
     * @returns A `Promise` object, which is resolved if the relay stops successfully.
     * @category Channel Media Relay
     */
    stopChannelMediaRelay(): Promise<void>;
    /**
     * Reports customized messages to Agora's data center.
     *
     * > Temporarily, Agora supports reporting a maximum of 20 message pieces within 5 seconds.
     *
     * @param reports Messages. You can report multiple messages one time.
     *
     * ```js
     * client.sendCustomReportMessage({
     *   reportId: "id1", category: "category1", event: "custom", label: "label1", value: 0,
     * }).then(() => {
     *   console.log("send custom report success");
     * }).catch(e => {
     *   console.error("send custom report error");
     * });
     * ```
     */
    sendCustomReportMessage(reports: EventCustomReportParams[] | EventCustomReportParams): Promise<void>;
    /**
     * **Since**
     * <br>&emsp;&emsp;&emsp;*4.1.0*
     *
     * Gets the statistics of a local audio track.
     *
     */
    getLocalAudioStats(): LocalAudioTrackStats;
    /**
     * **Since**
     * <br>&emsp;&emsp;&emsp;*4.1.0*
     *
     * Gets the statistics of remote audio tracks.
     *
     * > Note: The statistics are calculated after subscribing the remote stream,
     * which may take at most 3 seconds. You can call this method periodically.
     *
     */
    getRemoteAudioStats(): {
        [uid: string]: RemoteAudioTrackStats;
    };
    /**
     * **Since**
     * <br>&emsp;&emsp;&emsp;*4.2.0*
     *
     * Gets the network quality of all the remote users to whom the local user subscribes.
     *
     */
    getRemoteNetworkQuality(): {
        [uid: string]: NetworkQuality;
    };
    /**
     * **Since**
     * <br>&emsp;&emsp;&emsp;*4.1.0*
     *
     * Gets the statistics of a local video track.
     *
     * > Note: You cannot get the `encodeDelay` property on iOS.
     */
    getLocalVideoStats(): LocalVideoTrackStats;
    /**
     * **Since**
     * <br>&emsp;&emsp;&emsp;*4.1.0*
     *
     * Gets the statistics of remote video tracks.
     *
     * > Note: The statistics are calculated after subscribing the remote stream,
     * which may take at most 3 seconds. You can call this method periodically.
     *
     */
    getRemoteVideoStats(): {
        [uid: string]: RemoteVideoTrackStats;
    };
    /**
     * @ignore
     *
     * @param inspectConfig
     */
    enableContentInspect(inspectConfig: InspectConfiguration): Promise<void>;
    /**
     * @ignore
     */
    disableContentInspect(): Promise<void>;
    /**
     * Disables the third-party video moderation service.
     *
     * @param enabled Default is `false` and can only be set to `false`.
     */
    setImageModeration(enabled: false): Promise<void>;
    /**
     * Enables and configures the third-party video moderation service.
     *
     * After calling this method, the SDK triggers the
     * [image-moderation-connection-state-change]{@link event_image_moderation_connection_state_change} callback, and captures the
     * snapshots of the locally sent video to send to the third-party service
     * provider for moderation.
     *
     * > - Before calling this method, make sure the following requirements are met:
     * >    - You have activated the third-party video moderation service.
     * >    - The local user has joined the channel, and the local video track has been published and enabled.
     *
     * @param enabled Default is `true` and can only be set to `true`.
     * @param config Configuration for the video moderation service. See {@link ImageModerationConfiguration}.
     */
    setImageModeration(enabled: true, config: ImageModerationConfiguration): Promise<void>;
    /**
     * @ignore
     */
    setLicense(license: string): void;
    /**
     * @ignore
     *
     * @param LocalAccessPointConfig
     */
    setLocalAccessPointsV2(config: LocalAccessPointConfig): void;
}

/**
 * @ignore
 */
export declare interface IAgoraRTCError extends Error {
    readonly code: AgoraRTCErrorCode;
    readonly message: string;
    readonly data?: any;
    readonly name: string;
    toString(): string;
    print(level?: "error" | "warning", logger?: any): IAgoraRTCError;
    throw(logger?: any): never;
}

/**
 * Information about a remote user. You can get this through [AgoraRTCClient.remoteUsers]{@link IAgoraRTCClient.remoteUsers}.
 */
export declare interface IAgoraRTCRemoteUser {
    /**
     * The ID of the remote user.
     */
    uid: UID;
    /**
     * The subscribed audio track.
     */
    audioTrack?: IRemoteAudioTrack;
    /**
     * The subscribed video track.
     */
    videoTrack?: IRemoteVideoTrack;
    /**
     * Whether the remote user is sending an audio track.
     * - `true`: The remote user is sending an audio track.
     * - `false`: The remote user is not sending an audio track.
     */
    hasAudio: boolean;
    /**
     * Whether the remote user is sending a video track.
     * - `true`: The remote user is sending an audio track.
     * - `false`: The remote user is not sending an audio track.
     */
    hasVideo: boolean;
    /**
     * @ignore
     */
    dataChannels?: IRemoteDataChannel[];
}

/**
 * Inherited from [LocalAudioTrack]{@link ILocalAudioTrack}, `BufferSourceAudioTrack` is an interface for the audio from a local audio file and adds several functions for controlling the processing of the audio buffer, such as starting processing, stopping processing, and seeking a specified time location.
 *
 * You can create an audio track from an audio file by calling [AgoraRTC.createBufferSourceAudioTrack]{@link IAgoraRTC.createBufferSourceAudioTrack}.
 */
export declare interface IBufferSourceAudioTrack extends ILocalAudioTrack {
    /**
     * The [source]{@link BufferSourceAudioTrackInitConfig.source} specified when creating an audio track.
     */
    source: string | File | AudioBuffer | null;
    /**
     * The current state of audio processing, such as start, pause, or stop.
     */
    currentState: AudioSourceState;
    /**
     * The total duration of the audio (seconds).
     */
    duration: number;
    /**
     * **Since**
     * <br>&emsp;&emsp;&emsp;*4.18.0*
     *
     * The playback speed of the current audio file. Valid range is [50, 400], where:
     * - `50`: Half the original speed.
     * - `100`: (Default) The original speed.
     * - `400`: Four times the original speed.
     */
    playbackSpeed: number;
    /**
     * @param event The event name.
     * @param listener See [source-state-change]{@link event_source_state_change}.
     */
    on(event: "source-state-change", listener: typeof event_source_state_change): void;
    /**
     * When the specified event happens, the SDK triggers the callback that you pass.
     *
     * @param event The event name.
     * @param listener The callback function.
     */
    on(event: string, listener: Function): void;
    /**
     * Gets the progress (seconds) of the audio buffer processing.
     *
     * @returns The progress (seconds) of the audio buffer processing.
     */
    getCurrentTime(): number;
    /**
     * Starts processing the audio buffer.
     *
     * > Starting processing the audio buffer means that the processing unit in the SDK has received the audio data. If the audio track has been published, the remote user can hear the audio.
     * > Whether the local user can hear the audio depends on whether the SDK calls the [[play]] method and sends the audio data to the sound card.
     *
     * @param options Options for processing the audio buffer. See [[AudioSourceOptions]].
     */
    startProcessAudioBuffer(options?: AudioSourceOptions): void;
    /**
     * Pauses processing the audio buffer.
     */
    pauseProcessAudioBuffer(): void;
    /**
     * Jumps to a specified time point.
     *
     * @param time The specified time point (seconds).
     */
    seekAudioBuffer(time: number): void;
    /**
     * Resumes processing the audio buffer.
     */
    resumeProcessAudioBuffer(): void;
    /**
     * Stops processing the audio buffer.
     */
    stopProcessAudioBuffer(): void;
    /**
     * **Since**
     * <br>&emsp;&emsp;&emsp;*4.18.0*
     *
     * Sets the playback speed for the current audio file.
     *
     * You can call this method before or after joining a channel.
     *
     * @param speed The playback speed. Valid range is [50, 400], where:
     * - `50`: Half the original speed.
     * - `100`: (Default) The original speed.
     * - `400`: Four times the original speed.
     */
    setAudioBufferPlaybackSpeed(speed: number): void;
}

/**
 *
 * Inherited from [LocalVideoTrack]{@link ILocalVideoTrack}, `CameraVideoTrack` is an interface for the video captured by a local camera and adds functions such as switching devices and adjusting video encoder configurations.
 *
 * You can create a local camera video track by calling [AgoraRTC.createCameraVideoTrack]{@link IAgoraRTC.createCameraVideoTrack}.
 */
export declare interface ICameraVideoTrack extends ILocalVideoTrack {
    /**
     * Sets the device for capturing video.
     *
     * > You can call this method either before or after publishing the video track.
     *
     * @param deviceId Device ID, which can be passed in using the following ways:
     * - Pass a string: Pass the `deviceId` obtained using [AgoraRTC.getCameras]{@link IAgoraRTC.getCameras}.
     * - Pass an object: Starting from version 4.19.0, you can pass an object
     * containing `facingMode` or `deviceId`, but only one of these properties
     * can be specified. `deviceId` can be obtained through [AgoraRTC.getCameras]{@link IAgoraRTC.getCameras}, and `facingMode` supports the following values:
     *    - `"environment"`: Use the rear camera.
     *    - `"user"`: Use the front camera.
     */
    setDevice(deviceId: string | RequiredOnlyOneOf<{
        facingMode: VideoFacingModeEnum;
        deviceId: string;
    }>): Promise<void>;
    /**
     * **Since**
     * <br>&emsp;&emsp;&emsp;*4.0.0*
     *
     * Enables/Disables the track.
     *
     * After a track is disabled, the SDK stops playing and publishing the track.
     *
     * > - Disabling a track does not trigger the [LocalTrack.on("track-ended")]{@link event_track_ended} event.
     * > - If a track is published, disabling this track triggers the [user-unpublished]{@link IAgoraRTCClient.event_user_unpublished} event on the remote client, and re-enabling this track triggers the [user-published]{@link IAgoraRTCClient.event_user_published} event.
     * > - Do not call `setEnabled` and `setMuted` together.
     *
     * @param enabled Whether to enable the track:
     * - `true`: Enable the track.
     * - `false`: Disable the track.
     */
    setEnabled(enabled: boolean): Promise<void>;
    /**
     * **Since**
     * <br>&emsp;&emsp;&emsp;*4.19.0*
     *
     * Clones the current video track to create a new video track.
     *
     * In scenarios such as video conferencing and online education, you can use this method to display the same video stream with two sets of display parameters, including resolution, frame rate, and bitrate. For example, you can have one display set to high-definition and the other to low-definition.
     *
     * @param config The encoding configuration for the new video track. You can pass in the SDK's built-in encoding configuration through [[VideoEncoderConfiguration]], or customize the video encoding configuration by passing in a [[VideoEncoderConfigurationPreset]].
     * @param cloneTrack Whether to clone the current track. Default is `true`.
     * @returns The newly generated video track.
     */
    clone(config?: VideoEncoderConfiguration | VideoEncoderConfigurationPreset, cloneTrack?: boolean): ICameraVideoTrack;
}

/**
 * Configurations of the media stream relay.
 *
 * Use this interface to set the media stream relay when calling [startChannelMediaRelay]{@link IAgoraRTCClient.startChannelMediaRelay} or [updateChannelMediaRelay]{@link IAgoraRTCClient.updateChannelMediaRelay}.
 *
 * ```javascript
 * const configuration = AgoraRTC.createChannelMediaRelayConfiguration();
 * configuration.setSrcChannelInfo({ channelName: "test", token: "xxx", uid: 12345 });
 * configuration.addDestChannelInfo({ channelName: "test2", token: "xxx", uid: 23456 });
 * ```
 */
export declare interface IChannelMediaRelayConfiguration {
    /**
     * Sets the information of the source channel.
     *
     * ```javascript
     * const config = AgoraRTC.createChannelMediaRelayConfiguration();
     * config.setSrcChannelInfo({ channelName: "test", token: "xxx", uid: 123456 });
     * ```
     * @param info The information of the source channel.
     */
    setSrcChannelInfo(info: ChannelMediaRelayInfo): void;
    /**
     * Adds a destination channel.
     *
     * To relay a media stream across multiple channels, call this method as many times (to a maximum of four).
     *
     * ```javascript
     * const config = AgoraRTC.createChannelMediaRelayConfiguration();
     * config.addDestChannelInfo({ channelName: "test2", token: "xxx", uid: 23456 });
     * config.addDestChannelInfo({ channelName: "test3", token: "xxx", uid: 23457 });
     * ```
     *
     * @param info The information of the destination channel.
     */
    addDestChannelInfo(info: ChannelMediaRelayInfo): void;
    /**
     * Removes the destination channel added through {@link addDestChannelInfo}.
     * @param channelName The name of the destination channel to be removed.
     */
    removeDestChannelInfo(channelName: string): void;
}

/**
 * @ignore
 */
export declare interface IDataChannel extends EventEmitter {
    readonly id: number;
    readonly maxRetransmits: number | null;
    readonly ordered: boolean;
    readonly readyState: RTCDataChannelState;
    readonly metadata: string;
    getChannelId(): number;
    getConfig(): IDataChannelConfig;
}

/**
 * @ignore
 */
export declare interface IDataChannelConfig {
    id: number;
    ordered: boolean;
    metadata: string;
}

/**
 * @ignore
 */
declare interface IElectronNativeImage {
    toDataURL(): string;
    getSize(): {
        width: number;
        height: number;
    };
    resize(options: {
        width: number;
    }): IElectronNativeImage;
}

/**
 * `LocalAudioTrack` is the basic interface for local audio tracks, providing main methods of local audio tracks.
 *
 * You can create a local audio track by calling [AgoraRTC.createCustomAudioTrack]{@link IAgoraRTC.createCustomAudioTrack}.
 *
 * The following interfaces are inherited from `LocalAudioTrack`:
 * - [MicrophoneAudioTrack]{@link IMicrophoneAudioTrack}, the interface for the audio sampled by a local microphone, which adds several microphone-related functions.
 * - [BufferSourceAudioTrack]{@link IBufferSourceAudioTrack}, the interface for the audio from a local audio file, which adds several audio-file-related functions.
 */
export declare interface ILocalAudioTrack extends ILocalTrack {
    /**
     * Sets the volume of a local audio track.
     *
     * @param volume The volume. The value ranges from 0 (mute) to 1000 (maximum). A value of 100 is the original volume。 The volume change may not be obvious to human ear. If local track has been published, setting volume will affect the volume heard by remote users.
     */
    setVolume(volume: number): void;
    /**
     * Gets the audio level of a local audio track.
     *
     * @returns The audio level. The value range is [0,1]. 1 is the highest audio level.
     * Usually a user with audio level above 0.6 is a speaking user.
     *
     */
    getVolumeLevel(): number;
    /**
     * Sets the callback for getting raw audio data in PCM format.
     *
     * After you successfully set the callback, the SDK constantly returns the audio frames of a local audio track in this callback by using [AudioBuffer](https://developer.mozilla.org/en-US/docs/Web/API/AudioBuffer).
     *
     * > You can set the `frameSize` parameter to determine the frame size in each callback, which affects the interval between the callbacks. The larger the frame size, the longer the interval between them.
     *
     * ```js
     * track.setAudioFrameCallback((buffer) => {
     *   for (let channel = 0; channel < buffer.numberOfChannels; channel += 1) {
     *     // Float32Array with PCM data
     *     const currentChannelData = buffer.getChannelData(channel);
     *     console.log("PCM data in channel", channel, currentChannelData);
     *   }
     * }, 2048);
     *
     * // ....
     * // Stop getting the raw audio data
     * track.setAudioFrameCallback(null);
     * ```
     *
     * @param audioFrameCallback The callback function for receiving the [AudioBuffer](https://developer.mozilla.org/en-US/docs/Web/API/AudioBuffer) object. If you set `audioBufferCallback` as `null`, the SDK stops getting raw audio data.
     * @param frameSize The number of samples of each audio channel that an `AudioBuffer` object contains. You can set `frameSize` as 256, 512, 1024, 2048, 4096, 8192, or 16384. The default value is 4096.
     */
    setAudioFrameCallback(audioFrameCallback: null | ((buffer: AudioBuffer) => void), frameSize?: number): void;
    /**
     * Plays a local audio track.
     *
     * > When playing a audio track, you do not need to pass any DOM element.
     */
    play(): void;
    /**
     * **Since**
     * <br>&emsp;&emsp;&emsp;*4.1.0*
     *
     * > Note:
     * > - As of v4.7.0, this method no longer takes effect. Use [IRemoteAudioTrack.setPlaybackDevice]{@link IRemoteAudioTrack.setPlaybackDevice} instead.
     * > - This method supports Chrome on desktop devices only. Other browsers throw a '`NOT_SUPPORTED` error when calling this method.
     *
     * Sets the playback device (speaker) for the remote audio stream.
     *
     * @param deviceId The device ID, which can be retrieved by calling [[getPlaybackDevices]].
     */
    setPlaybackDevice(deviceId: string): Promise<void>;
    /**
     * Gets the statistics of a local audio track.
     *
     * **DEPRECATED** from v4.1.0. Use [AgoraRTCClient.getLocalVideoStats]{@link IAgoraRTCClient.getLocalVideoStats} and [AgoraRTCClient.getLocalAudioStats]{@link IAgoraRTCClient.getLocalAudioStats} instead.
     */
    getStats(): LocalAudioTrackStats;
    /**
     * Inserts a `Processor` to the local audio track.
     *
     * @param processor The `Processor` instance. Each extension has a corresponding type of `Processor`.
     *
     * @returns The `Processor` instance.
     */
    pipe(processor: IAudioProcessor): IAudioProcessor;
    /**
     * **Since**
     * <br>&emsp;&emsp;&emsp;*4.10.0*
     *
     * Removes the `Processor` inserted to the local audio track.
     */
    unpipe(): void;
    /**
     * **Since**
     * <br>&emsp;&emsp;&emsp;*4.10.0*
     *
     * The destination of the current processing pipeline on the local audio track.
     */
    processorDestination: IAudioProcessor;
}

/**
 * @ignore
 */
export declare interface ILocalDataChannel extends IDataChannel {
    send(data: ArrayBuffer): void;
}

/**
 * `LocalTrack` is the basic interface for local tracks, providing public methods for [LocalAudioTrack]{@link ILocalAudioTrack} and [LocalVideoTrack]{@link ILocalVideoTrack}.
 */
export declare interface ILocalTrack extends ITrack {
    /**
     * @param event The event name.
     * @param listener See [track-ended]{@link event_track_ended}.
     */
    on(event: "track-ended", listener: typeof event_track_ended): void;
    /**
     * Adds an event listener.
     * @param event The event name.
     * @param listener See [transceiver-updated]{@link event_transceiver_updated}.
     */
    on(event: "transceiver-updated", listener: typeof event_transceiver_updated): void;
    /**
     * **Since**
     * <br>&emsp;&emsp;&emsp;*4.0.0*
     *
     * Enables/Disables the track.
     *
     * After a track is disabled, the SDK stops playing and publishing the track.
     *
     * > - Disabling a track does not trigger the [LocalTrack.on("track-ended")]{@link event_track_ended} event.
     * > - If a track is published, disabling this track triggers the [user-unpublished]{@link IAgoraRTCClient.event_user_unpublished} event on the remote client, and re-enabling this track triggers the [user-published]{@link IAgoraRTCClient.event_user_published} event.
     * > - Do not call `setEnabled` and `setMuted` together.
     *
     * @param enabled Whether to enable the track:
     * - `true`: Enable the track.
     * - `false`: Disable the track.
     */
    setEnabled(enabled: boolean): Promise<void>;
    /**
     * **DEPRECATED** from v4.1.0. Use [AgoraRTCClient.getLocalVideoStats]{@link IAgoraRTCClient.getLocalVideoStats} and [AgoraRTCClient.getLocalAudioStats]{@link IAgoraRTCClient.getLocalAudioStats} instead.
     *
     * Gets the statistics of a local track.
     *
     * > Note: When getting the statistics of a local video track, you cannot get the `encodeDelay` property on iOS.
     */
    getStats(): LocalVideoTrackStats | LocalAudioTrackStats;
    /**
     * Gets the label of a local track.
     *
     * @return The label that the SDK returns may include:
     * - The [MediaDeviceInfo.label](https://developer.mozilla.org/en-US/docs/Web/API/MediaDeviceInfo/label) property, if the track is created by calling `createMicrophoneAudioTrack` or `createCameraVideoTrack`.
     * - The `sourceId` property, if the track is created by calling `createScreenVideoTrack`.
     * - The [MediaStreamTrack.label](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack/label) property, if the track is created by calling `createCustomAudioTrack` or `createCustomVideoTrack`.
     */
    getTrackLabel(): string;
    /**
     * Sends or stops sending the media data of the track.
     *
     * **Since**
     * <br>&emsp;&emsp;&emsp;*4.6.0*
     *
     * If the track is published, a successful call of `setMuted(true)` triggers the [user-unpublished]{@link IAgoraRTCClient.event_user_unpublished} event on the remote client, and a successful call of `setMuted(false)` triggers the [user-published]{@link IAgoraRTCClient.event_user_published} event.
     *
     * > - Calling `setMuted(true)` does not stop capturing audio or video and takes shorter time to take effect than [[setEnabled]]. For details, see [What are the differences between setEnabled and setMuted?](https://docs.agora.io/en/Interactive%20Broadcast/faq/differences_between_setenabled_and_setmuted).
     * > - Do not call `setEnabled` and `setMuted` together.
     *
     * @param muted Whether to stop sending the media data of the track:
     * - `true`: Stop sending the media data of the track.
     * - `false`: Resume sending the media data of the track.
     */
    setMuted(muted: boolean): Promise<void>;
    /**
     * Closes a local track and releases the audio and video resources that it occupies.
     *
     * Once you close a local track, you can no longer reuse it.
     */
    close(): void;
    muted: boolean;
    enabled: boolean;
}

/**
 * `LocalVideoTrack` is the basic interface for local video tracks, providing the main methods for local video tracks.
 *
 * You can get create a local video track by calling [AgoraRTC.createCustomVideoTrack]{@link IAgoraRTC.createCustomVideoTrack} or [AgoraRTC.createScreenVideoTrack]{@link IAgoraRTC.createScreenVideoTrack} method.
 *
 * Inherited from `LocalVideoTrack`, [CameraVideoTrack]{@link ICameraVideoTrack} is an interface for the video captured by a local camera and adds several camera-related functions.
 */
export declare interface ILocalVideoTrack extends ILocalTrack {
    /**
     * @param event The event name.
     * @param listener See [track-ended]{@link event_track_ended}.
     */
    on(event: "track-ended", listener: typeof event_track_ended): void;
    /**
     * @param event The event name.
     * @param listener See [video-element-visible-status]{@link event_video_element_visible_status}.
     */
    on(event: "video-element-visible-status", listener: typeof event_video_element_visible_status): void;
    /**
     * Adds an event listener.
     * @param event The event name.
     * @param listener See [transceiver-updated]{@link event_transceiver_updated}.
     */
    on(event: "transceiver-updated", listener: typeof event_transceiver_updated): void;
    /**
     * Plays a local video track on the web page.
     *
     * @param element Specifies a DOM element. The SDK will create a `<video>` element under the specified DOM element to play the video track. You can specify a DOM element in either of the following ways:
     * - `string`: Specify the ID of the DOM element.
     * - `HTMLElement`: Pass a DOM object.
     * @param config Sets the playback configurations, such as display mode and mirror mode. See [[VideoPlayerConfig]]. By default, the SDK enables mirror mode for a local video track.
     */
    play(element: string | HTMLElement, config?: VideoPlayerConfig): void;
    /**
     * Gets the statistics of a local video track.
     *
     * **DEPRECATED** from v4.1.0. Use [AgoraRTCClient.getLocalVideoStats]{@link IAgoraRTCClient.getLocalVideoStats} and [AgoraRTCClient.getLocalAudioStats]{@link IAgoraRTCClient.getLocalAudioStats} instead.
     */
    getStats(): LocalVideoTrackStats;
    /**
     * **Since**
     * <br>&emsp;&emsp;&emsp;*4.19.0*
     *
     * Clones the current video track to create a new video track.
     *
     * In scenarios such as video conferencing and online education, you can use this method to display the same video stream with two sets of display parameters, including resolution, frame rate, and bitrate. For example, you can have one display set to high-definition and the other to low-definition.
     *
     * @param config The encoding configuration for the new video track. You can pass in the SDK's built-in encoding configuration through [[VideoEncoderConfiguration]], or customize the video encoding configuration by passing in a [[VideoEncoderConfigurationPreset]].
     * @param cloneTrack Whether to clone the current track. Default is `true`.
     * @returns The newly generated video track.
     */
    clone(config?: VideoEncoderConfiguration | VideoEncoderConfigurationPreset, cloneTrack?: boolean): ILocalVideoTrack;
    /**
     * @ignore
     *
     * Enables/Disables image enhancement and sets the options.
     *
     * > Notes:
     * > - Agora is planning to sunset this built-in image enhancement feature.
     * You can use the upgraded Image Enhancement Extension instead. For details, see
     * [Use the Image Enhancement Extension](https://docs.agora.io/en/Video/beauty_effect_web_ng?platform=Web).
     * > - This method supports the following browsers:
     * >  - Safari 12 or later.
     * >  - Chrome 65 or later.
     * >  - Firefox 70.0.1 or later.
     * > - This function is not supported on mobile devices.
     * > - If you enable dual-stream mode, the image enhancement options only apply to the high-quality video stream.
     *
     * @param enabled Whether to enable image enhancement:
     * - `true`: Enable image enhancement.
     * - `false`: Disable image enhancement.
     * @param options Sets image enhancement options. See [[BeautyEffectOptions]].
     */
    setBeautyEffect(enabled: boolean, options?: BeautyEffectOptions): Promise<void>;
    /**
     * **Since**
     * <br>&emsp;&emsp;&emsp;*4.1.0*
     *
     * Gets the data of the video frame being rendered.
     *
     * > You should call this method after calling [[play]]. Otherwise, the method call returns null.
     *
     * @returns An `ImageData` object that stores RGBA data. `ImageData` is a web API supported by the browser. For details, see [ImageData](https://developer.mozilla.org/en-US/docs/Web/API/ImageData).
     */
    getCurrentFrameData(): ImageData;
    /**
     *
     * @ignore
     */
    getCurrentFrameImage(imageType: string, quality: number): Promise<ImageTypedData>;
    /**
     * **Since**
     * <br>&emsp;&emsp;&emsp;*4.2.0*
     *
     * Sets the video transmission optimization mode.
     *
     * You can call this method during a video call, a live streaming or screen sharing to dynamically change the optimization mode. For example, during the screen sharing, before you change the shared content from text to video, you can change the optimization mode from `"detail"` to `"motion"` to ensure smoothness in poor network conditions.
     *
     * > Note: This method supports Chrome only.
     *
     * @param mode The video transmission optimization mode:
     * - `"balanced"`: Uses the default optimization mode.
     *   - For a screen-sharing video track, the default transmission optimization strategy is to prioritizes clarity.
     *   - For the other types of video tracks, the SDK may reduce the frame rate or the sending resolution in poor network conditions.
     * - `"detail"`: Prioritizes video quality.
     *   - The SDK ensures high-quality images by automatically calculating a minimum bitrate based on the capturing resolution and frame rate. No matter how poor the network condition is, the sending bitrate will never be lower than the minimum value.
     *   - In most cases, the SDK does not reduce the sending resolution, but may reduce the frame rate.
     * -  `"motion"`: Prioritizes video smoothness.
     *   - In poor network conditions, the SDK reduces the sending bitrate to minimize video freezes.
     *   - In most cases, the SDK does not reduce the frame rate, but may reduce the sending resolution.
     */
    setOptimizationMode(mode: "balanced" | "motion" | "detail"): Promise<void>;
    /**
     * **Since**
     * <br>&emsp;&emsp;&emsp;*4.8.0*
     *
     * Gets the visibility of the `<video>` HTML tag.
     *
     * After you call `localVideoTrack.play`, the SDK creates an [`<video>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video) tag for playing video tracks. When `localVideoTrack.isPlaying` is `true` but you cannot see any video, call this method to check whether the `<video>` tag is visible or not and learn the reason when the `<video>` tag is invisible.
     *
     * @returns The [[CheckVideoVisibleResult]] object. If this method returns `undefined`, it may be due to the following reasons:
     * - `localVideoTrack.isPlaying` is `false`.
     * - The `<video>` tag does not exist.
     * - The `<video>` tag is not created by calling the `play` method.
     */
    getVideoElementVisibleStatus(): CheckVideoVisibleResult | undefined;
    /**
     * Inserts a `Processor` to the local video track.
     *
     * @param processor The `Processor` instance. Each extension has a corresponding type of `Processor`.
     *
     * @returns The `Processor` instance.
     */
    pipe(processor: IBaseProcessor): IBaseProcessor;
    /**
     * **Since**
     * <br>&emsp;&emsp;&emsp;*4.10.0*
     *
     * Removes the `Processor` inserted to the local video track.
     */
    unpipe(): void;
    /**
     * **Since**
     * <br>&emsp;&emsp;&emsp;*4.10.0*
     *
     * The destination of the current processing pipeline on the local video track.
     */
    processorDestination: IBaseProcessor;
    /**
     * **Since**
     * <br>&emsp;&emsp;&emsp;*4.17.0*
     *
     * Replaces the local video track.
     *
     * You can call this method before or after publishing the local video stream:
     * - If you call this method before publishing, the new video track is played locally.
     * - If you call this method after publishing, the new video track is received by the remote user.
     *
     * The new video track can be retrieved by the {@link ILocalVideoTrack.getMediaStreamTrack} or `mediaStream.getVideoTracks` method. You can choose to either stop or retain the replaced track.
     *
     * > Notes:
     * > - This method supports Chrome 65+, Safari, and the latest Firefox.
     * > - This method might not take effect on some mobile devices.
     * > - Agora recommends switching between video tracks that are of the same type and have the same encoder configurations for the following reasons:
     * >   - If the video track types are different, such as replacing a `CameraVideoTrack` object with a `ScreenVideoTrack` object, the video is flipped horizontally due to the mirror effect enabled by default on `CameraVideoTrack` (see {@link VideoPlayerConfig.mirror} for details).
     * >   - If the encoder configurations (`encoderConfig`) are different, the actual sending resolution or frame rate might be different from what you set.
     * > - The subscriber will not be notified if the track gets replaced.
     * > - To switch the media input devices, Agora recommends using {@link ICameraVideoTrack.setDevice}.
     *
     * **Example**
     * ```javascript
     * // Current video track
     * const localVideoTrack = await AgoraRTC.createCameraVideoTrack();
     * // Gets the new video track (option one)
     * const newTrack = localVideoTrack.getMediaStreamTrack();
     * // Gets the new video track (option two)
     * const newTrack = await navigator.mediaDevices.getUserMedia({audio: true, video: true}).then(mediaStream => mediaStream.getVideoTracks()[0]);
     * // Replaces and stops the current video track
     * await localVideoTrack.replaceTrack(newTrack, true);
     * ```
     * @param track The new video track, which is a [MediaStreamTrack](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack) object.
     * @param stopOldTrack Whether to stop the old video track:
     *  - true: Stops the old video track.
     *  - false: Retains the old video track.
     */
    replaceTrack(track: MediaStreamTrack, stopOldTrack: boolean): Promise<void>;
    /**
     * Sets the video encoder configurations, such as resolution, frame rate, and bitrate.
     *
     * @param config The video encoder configurations. You can pass either [[VideoEncoderConfigurationPreset]] or a customized [[VideoEncoderConfiguration]] object.
     */
    setEncoderConfiguration(config: VideoEncoderConfiguration | VideoEncoderConfigurationPreset): Promise<void>;
}

declare interface ImageModerationConfiguration {
    interval: number;
}

/**
 * Connection state between the SDK and the third-party video moderation service.
 */
declare enum ImageModerationConnectionState {
    /**
     * The SDK is connecting to the third-party service.
     */
    CONNECTING = "CONNECTING",
    /**
     * The SDK is reconnecting to the third-party service.
     */
    RECONNECTING = "RECONNECTING",
    /**
     * The SDK is connected to the third-party service.
     */
    CONNECTED = "CONNECTED",
    /**
     * The SDK has disconnected from the third-party service.
     */
    CLOSED = "CLOSED"
}

export declare interface ImageTypedData {
    buffer: Uint8Array;
    width: number;
    height: number;
}

/**
 * Inherited from [LocalAudioTrack]{@link ILocalAudioTrack}, `MicrophoneAudioTrack` is an interface for the audio sampled by a local microphone and adds several functions such as switching devices.
 *
 * You can create a local microphone audio track by calling [AgoraRTC.createMicrophoneAudioTrack]{@link IAgoraRTC.createMicrophoneAudioTrack}.
 */
export declare interface IMicrophoneAudioTrack extends ILocalAudioTrack {
    /**
     * Sets the device for sampling audio.
     *
     * > You can call the method either before or after publishing an audio track.
     *
     * @param deviceId The ID of the specified device. You can get the `deviceId` by calling [AgoraRTC.getMicrophones]{@link IAgoraRTC.getMicrophones}.
     */
    setDevice(deviceId: string): Promise<void>;
    /**
     * **Since**
     * <br>&emsp;&emsp;&emsp;*4.0.0*
     *
     * Enables/Disables the track.
     *
     * After a track is disabled, the SDK stops playing and publishing the track.
     *
     * > - Disabling a track does not trigger the [LocalTrack.on("track-ended")]{@link event_track_ended} event.
     * > - If a track is published, disabling this track triggers the [user-unpublished]{@link IAgoraRTCClient.event_user_unpublished} event on the remote client, and re-enabling this track triggers the [user-published]{@link IAgoraRTCClient.event_user_published} event.
     * > - Do not call `setEnabled` and `setMuted` together.
     *
     * @param enabled Whether to enable the track:
     * - `true`: Enable the track.
     * - `false`: Disable the track.
     */
    setEnabled(enabled: boolean): Promise<void>;
}

/**
 * @ignore
 * The configurations for the injected online stream in [AgoraRTCClient.addInjectStreamUrl]{@link IAgoraRTCClient.addInjectStreamUrl}.
 */
export declare interface InjectStreamConfig {
    audioVolume?: number;
    /**
     * The audio bitrate (Kbps) of the injected stream.
     *
     * A positive integer. The default value is 48.
     */
    audioBitrate?: number;
    /**
     * The number of audio channels of the injected stream.
     *
     * A positive integer. The default value is 1. The value range is [1,2].
     */
    audioChannels?: number;
    /**
     * The audio sampling rate of the injected stream.
     *
     * - 32000: 32 kHz
     * - 44100: (Default) 44.1 kHz
     * - 48000: 48 kHz
     *
     * > Agora recommends using the default value.
     */
    audioSampleRate?: number;
    /**
     * The height of the injected stream.
     *
     * The default value is 0, which is the same height as the original stream.
     */
    height?: number;
    /**
     * The width of the injected stream.
     *
     * The default value is 0, which is the same width as the original stream.
     */
    width?: number;
    /**
     * The video bitrate (Kbps) of the injected stream.
     *
     * A positive integer. The default value is 400.
     */
    videoBitrate?: number;
    /**
     * The video frame rate (fps) of the injected stream.
     *
     * A positive integer. The default value is 15.
     */
    videoFramerate?: number;
    videoGop?: number;
}

/**
 * @ignore
 */
export declare interface InspectConfiguration {
    interval: number;
    ossFilePrefix?: string;
    extraInfo?: string;
    inspectType?: ("supervise" | "moderation")[];
}

/**
 * @ignore
 */
declare enum InspectState {
    CONNECTING = "CONNECTING",
    RECONNECTING = "RECONNECTING",
    CONNECTED = "CONNECTED",
    CLOSED = "CLOSED"
}

/**
 * `RemoteAudioTrack` is the basic interface for the remote audio track.
 *
 * You can get create a remote audio track by the [AgoraRTCRemoteUser.audioTrack]{@link IAgoraRTCRemoteUser.audioTrack} object after calling [subscribe]{@link IAgoraRTCClient.subscribe}.
 */
export declare interface IRemoteAudioTrack extends IRemoteTrack {
    /**
     * Gets the statistics of a remote audio track.
     *
     * @return An [[RemoteAudioTrackStats]] object.
     */
    getStats(): RemoteAudioTrackStats;
    /**
     * Plays a remote audio track.
     *
     * > When playing the audio track, you do not need to pass any DOM element.
     */
    play(): void;
    /**
     * **Since**
     * <br>&emsp;&emsp;&emsp;*4.1.0*
     *
     * Sets the audio playback device, for example, the speaker.
     *
     * > This method supports Chrome on desktop devices only. Other browsers throw a `NOT_SUPPORTED` error when calling this method.
     * @param deviceId Device ID, which can be retrieved by calling [[getPlaybackDevices]].
     */
    setPlaybackDevice(deviceId: string): Promise<void>;
    /**
     * Sets the callback for getting raw audio data in PCM format.
     *
     * After you successfully set the callback, the SDK constantly returns the audio frames of a remote audio track in this callback by using [AudioBuffer](https://developer.mozilla.org/en-US/docs/Web/API/AudioBuffer).
     *
     * > You can set the `frameSize` parameter to determine the frame size in each callback, which affects the interval between the callbacks. The larger the frame size, the longer the interval between them.
     *
     * ```js
     * track.setAudioFrameCallback((buffer) => {
     *   for (let channel = 0; channel < buffer.numberOfChannels; channel += 1) {
     *     // Float32Array with PCM data
     *     const currentChannelData = buffer.getChannelData(channel);
     *     console.log("PCM data in channel", channel, currentChannelData);
     *   }
     * }, 2048);
     *
     * // ....
     * // Stop getting the raw audio data
     * track.setAudioFrameCallback(null);
     * ```
     *
     * @param audioFrameCallback The callback function for receiving the [AudioBuffer](https://developer.mozilla.org/en-US/docs/Web/API/AudioBuffer) object. If you set `audioBufferCallback` as `null`, the SDK stops getting raw audio data.
     * @param frameSize The number of samples of each audio channel that an `AudioBuffer` object contains. You can set `frameSize` as 256, 512, 1024, 2048, 4096, 8192, or 16384. The default value is 4096.
     */
    setAudioFrameCallback(audioFrameCallback: null | ((buffer: AudioBuffer) => void), frameSize?: number): void;
    /**
     * Sets the volume of a remote audio track.
     *
     * @param volume The volume. The value ranges from 0 (mute) to 100 (maximum). A value of 100 is the current volume.
     */
    setVolume(volume: number): void;
    /**
     * Gets the audio level of a remote audio track.
     *
     * @returns The audio level. The value range is [0,1]. 1 is the highest audio level.
     * Usually a user with audio level above 0.6 is a speaking user.
     */
    getVolumeLevel(): number;
    /**
     * **Since**
     * <br>&emsp;&emsp;&emsp;*4.13.0*
     *
     * Inserts a `Processor` to the remote audio track.
     *
     * @param processor The `Processor` instance. Each extension has a corresponding type of `Processor`.
     *
     * @returns The `Processor` instance.
     */
    pipe(processor: IAudioProcessor): IAudioProcessor;
    /**
     * **Since**
     * <br>&emsp;&emsp;&emsp;*4.13.0*
     *
     * Removes the `Processor` inserted to the remote audio track.
     */
    unpipe(): void;
    /**
     * **Since**
     * <br>&emsp;&emsp;&emsp;*4.13.0*
     *
     * The destination of the current processing pipeline on the remote audio track.
     */
    processorDestination: IAudioProcessor;
}

/**
 * @ignore
 */
export declare interface IRemoteDataChannel extends IDataChannel {
}

/**
 * `RemoteTrack` is the basic interface for remote tracks, providing public methods for [RemoteAudioTrack]{@link IRemoteAudioTrack} and [RemoteVideoTrack]{@link IRemoteVideoTrack}.
 */
export declare interface IRemoteTrack extends ITrack {
    /**
     * @param event The event name.
     * @param listener See [first-frame-decoded]{@link event_first_frame_decoded}.
     */
    on(event: "first-frame-decoded", listener: typeof event_first_frame_decoded): void;
    /**
     * Adds an event listener.
     * @param event The event name.
     * @param listener See [transceiver-updated-2]{@link event_transceiver_updated_2}.
     */
    on(event: "transceiver-updated", listener: typeof event_transceiver_updated_2): void;
    /**
     * Gets the `uid` of the remote user who publishes the remote track.
     *
     * @return The `uid` of the remote user.
     */
    getUserId(): UID;
    /**
     * Gets the statistics of a remote track.
     *
     * **DEPRECATED** from v4.1.0. Use [AgoraRTCClient.getRemoteVideoStats]{@link IAgoraRTCClient.getRemoteVideoStats} and [AgoraRTCClient.getRemoteAudioStats]{@link IAgoraRTCClient.getRemoteAudioStats} instead.
     * @return An [[RemoteAudioTrackStats]] or [[RemoteVideoTrackStats]] object.
     */
    getStats(): RemoteAudioTrackStats | RemoteVideoTrackStats;
}

/**
 * `RemoteVideoTrack` is the basic interface for the remote video track.
 *
 * You can get create a remote video track by the [AgoraRTCRemoteUser.videoTrack]{@link IAgoraRTCRemoteUser.videoTrack} object after calling [subscribe]{@link IAgoraRTCClient.subscribe}.
 */
export declare interface IRemoteVideoTrack extends IRemoteTrack {
    /**
     * @param event The event name.
     * @param listener See [first-frame-decoded]{@link event_first_frame_decoded}.
     */
    on(event: "first-frame-decoded", listener: typeof event_first_frame_decoded): void;
    /**
     * @param event The event name.
     * @param listener See [video-element-visible-status]{@link event_video_element_visible_status_2}.
     */
    on(event: "video-element-visible-status", listener: typeof event_video_element_visible_status_2): void;
    /**
     * Adds an event listener.
     * @param event The event name.
     * @param listener See [transceiver-updated-2]{@link event_transceiver_updated_2}.
     */
    on(event: "transceiver-updated", listener: typeof event_transceiver_updated_2): void;
    /**
     * Gets the statistics of a remote video track.
     *
     * @return An [[RemoteVideoTrackStats]] object。
     */
    getStats(): RemoteVideoTrackStats;
    /**
     * Plays a remote video track on the web page.
     *
     * @param element Specifies a DOM element. The SDK will create a `<video>` element under the specified DOM element to play the video track. You can specify a DOM element in either of following ways:
     * - `string`: Specify the ID of the DOM element.
     * - `HTMLElement`: Pass a DOM object.
     * @param config Sets the playback configurations, such as display mode and mirror mode. See [[VideoPlayerConfig]]. By default, the SDK enables mirror mode for a local video track.
     */
    play(element: string | HTMLElement, config?: VideoPlayerConfig): void;
    /**
     * **Since**
     * <br>&emsp;&emsp;&emsp;*4.1.0*
     *
     * Gets the data of the video frame being rendered.
     *
     * > You should call this method after calling [[play]]. Otherwise, the method call returns null.
     *
     * @returns An `ImageData` object that stores RGBA data. `ImageData` is a web API supported by the browser. For details, see [ImageData](https://developer.mozilla.org/en-US/docs/Web/API/ImageData).
     */
    getCurrentFrameData(): ImageData;
    /**
     * **Since**
     * <br>&emsp;&emsp;&emsp;*4.8.0*
     *
     * Gets the visibility of the `<video>` HTML tag.
     *
     * After you call `remoteVideoTrack.play`, the SDK creates an [`<video>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video) tag for playing video tracks. When `remoteVideoTrack.isPlaying` is `true` but you cannot see any video, call this method to check whether the `<video>` tag is visible or not and learn the reason when the `<video>` tag is invisible.
     *
     * @returns The [[CheckVideoVisibleResult]] object. If this method returns `undefined`, it may be due to the following reasons:
     * - `localRemoteTrack.isPlaying` is `false`.
     * - The `<video>` tag does not exist.
     * - The `<video>` tag is not created by calling the `play` method.
     */
    getVideoElementVisibleStatus(): CheckVideoVisibleResult | undefined;
    /**
     * **Since**
     * <br>&emsp;&emsp;&emsp;*4.13.0*
     *
     * Inserts a `Processor` to the remote video track.
     *
     * @param processor The `Processor` instance. Each extension has a corresponding type of `Processor`.
     *
     * @returns The `Processor` instance.
     */
    pipe(processor: IBaseProcessor): IBaseProcessor;
    /**
     * **Since**
     * <br>&emsp;&emsp;&emsp;*4.13.0*
     *
     * Removes the `Processor` inserted to the remote video track.
     */
    unpipe(): void;
    /**
     * **Since**
     * <br>&emsp;&emsp;&emsp;*4.13.0*
     *
     * The destination of the current processing pipeline on the remote video track.
     */
    processorDestination: IBaseProcessor;
}

export declare interface ITrack extends EventEmitter {
    /**
     * The type of a media track:
     * - `"audio"`: Audio track.
     * - `"video"`: Video track.
     */
    trackMediaType: "audio" | "video";
    /**
     * Whether a media track is playing on the webpage:
     * - `true`: The media track is playing on the webpage.
     * - `false`: The media track is not playing on the webpage.
     */
    isPlaying: boolean;
    /**
     * Gets the ID of a media track, a unique identifier generated by the SDK.
     *
     * @return The media track ID.
     */
    getTrackId(): string;
    /**
     * Gets an [MediaStreamTrack](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack) object.
     *
     * @return An [MediaStreamTrack](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack) object.
     */
    getMediaStreamTrack(): MediaStreamTrack;
    /**
     * Gets the [RTCRtpTransceiver](https://developer.mozilla.org/en-US/docs/Web/API/RTCRtpTransceiver) instance of the current track.
     *
     * This method is currently mainly used for end-to-end encryption of video streams (Beta).
     *
     * > If the SDK experiences a reconnection, the `RTCRtpTransceiver` instance corresponding to the current track might change. You can use the "transceiver-updated" {@link event_transceiver_updated} event of the current track to obtain the new `RTCRtpTransceiver` instance.
     *
     * @param type The type of the video stream. See {@link StreamType}.
     * @returns The [RTCRtpTransceiver](https://developer.mozilla.org/en-US/docs/Web/API/RTCRtpTransceiver) instance of the current track.
     */
    getRTCRtpTransceiver(type?: StreamType): RTCRtpTransceiver | undefined;
    /**
     * Plays a media track on the webpage.
     *
     * @param element Specifies a DOM element. The SDK will create a `<video>` element under the specified DOM element to play the video track. You can specify a DOM element in either of following ways:
     * - `string`: Specify the ID of the DOM element.
     * - `HTMLElement`: Pass a DOM object.
     */
    play(element?: string | HTMLElement): void;
    /**
     * Stops playing the media track.
     */
    stop(): void;
}

declare interface JoinChannelServiceRecord {
    urls: string[];
    startTs: number;
    endTs: number | undefined;
    sessionId: string;
    errors?: Error[];
    uid?: UID;
    status: "pending" | "success" | "error" | "timeout" | "aborted";
    service: "stringUID" | "chooseServer" | "gateway";
    cloudProxyMode: "disabled" | "normal" | "443only" | "proxy3" | "proxy4" | "proxy5" | "proxy6" | "fallback";
}

declare interface KeyMetrics {
    clientCreated?: number;
    joinStart?: number;
    joinEnd?: number;
    requestAPStart?: number;
    requestAPEnd?: number;
    joinGatewayStart?: number;
    joinGatewayEnd?: number;
    peerConnectionStart?: number;
    peerConnectionEnd?: number;
    descriptionStart?: number;
    iceConnectionEnd?: number;
    datachannelOpen?: number;
    publish: {
        trackId: string;
        type: "video" | "audio";
        publishStart?: number;
        publishEnd?: number;
    }[];
    subscribe: {
        userId: UID;
        type: "video" | "audio";
        subscribeStart?: number;
        subscribeEnd?: number;
        firstFrame?: number;
        streamAdded?: number;
        firstDecoded?: number;
    }[];
}

/**
 * The configurations for CDN live stream transcoding. To be used when you call [setLiveTranscoding]{@link IAgoraRTCClient.setLiveTranscoding}.
 */
export declare interface LiveStreamingTranscodingConfig {
    /**
     * The audio bitrate (Kbps) of the CDN live stream.
     *
     * A positive integer. The default value is 48, and the highest value is 128.
     */
    audioBitrate?: number;
    /**
     * The number of audio channels for the CDN live stream.
     *
     * Agora recommends choosing 1 (mono), or 2 (stereo) audio channels. Special players are required if you choose 3, 4, or 5.
     *
     * - 1: (Default) Mono
     * - 2: Stereo
     * - 3: Three audio channels
     * - 4: Four audio channels
     * - 5: Five audio channels
     */
    audioChannels?: 1 | 2 | 3 | 4 | 5;
    /**
     * The audio sampling rate:
     *
     * - 32000: 32 kHz
     * - 44100: 44.1 kHz
     * - 48000: (Default) 48 kHz
     */
    audioSampleRate?: 32000 | 44100 | 48000;
    /**
     * The background color in RGB hex.
     *
     * Value only. Do not include a preceding #. The default value is 0x000000.
     */
    backgroundColor?: number;
    /**
     * The height of the video in pixels.
     *
     * A positive integer, the default value is 360.
     *
     * - When pushing video streams to the CDN, ensure that `height` is at least 64; otherwise, the Agora server adjusts the value to 64.
     * - When pushing audio streams to the CDN, set `width` and `height` as 0.
     */
    height?: number;
    /**
     * The width of the video in pixels.
     *
     * A positive integer, the default value is 640.
     *
     * - When pushing video streams to the CDN, ensure that `width` is at least 64; otherwise, the Agora server adjusts the value to 64.
     * - When pushing audio streams to the CDN, set `width` and `height` as 0.
     */
    width?: number;
    /**
     * @ignore
     */
    lowLatency?: boolean;
    /**
     * The bitrate (Kbps) of the output video stream.
     *
     * The default value is 400.
     */
    videoBitrate?: number;
    /**
     * The video codec profile type.
     *
     * Set it as `66`, `77`, or `100` (default). If you set this parameter to any other value, the Agora server adjusts it to the default value `100`.
     *
     * - `66`: Baseline video codec profile. Generally used for video calls on mobile phones.
     * - `77`: Main video codec profile. Generally used for mainstream electronic devices, such as MP4 players, portable video players, PSP, and iPads.
     * - `100`: (Default) High video codec profile. Generally used for high-resolution broadcasts or television.
     */
    videoCodecProfile?: 66 | 77 | 100;
    /**
     * The video frame rate (fps) of the CDN live stream.
     *
     * The default value is 15. The Agora server adjusts any value over 30 to 30.
     */
    videoFrameRate?: number;
    /**
     * The video GOP in frames.
     *
     * The default value is 30.
     */
    videoGop?: number;
    /**
     * **DEPRECATED**
     *
     * Watermark images for the CDN live stream.
     */
    images?: LiveStreamingTranscodingImage[];
    /**
     * Watermark image for the CDN live stream.
     */
    watermark?: LiveStreamingTranscodingImage;
    /**
     * Background image for the CDN live stream.
     */
    backgroundImage?: LiveStreamingTranscodingImage;
    /**
     * Manages the user layout configuration in the CDN live streaming.
     *
     * Agora supports a maximum of 17 transcoding users in a CDN streaming channel.
     */
    transcodingUsers?: LiveStreamingTranscodingUser[];
    userConfigExtraInfo?: string;
}

/**
 * Configurations for the watermark and background images to put on top of the video in [LiveStreamingTranscodingConfig]{@link LiveStreamingTranscodingConfig}.
 */
export declare interface LiveStreamingTranscodingImage {
    /**
     * The HTTP/HTTPS URL address of the image on the video.
     *
     * Supports online PNG only.
     */
    url: string;
    /**
     * The horizontal distance (pixel) between the image's top-left corner and the video's top-left corner.
     *
     * The default value is `0`.
     */
    x?: number;
    /**
     * The vertical distance (pixel) between the image's top-left corner and the video's top-left corner.
     *
     * The default value is `0`.
     */
    y?: number;
    /**
     * The width (pixel) of the image.
     *
     * The default value is `160`.
     */
    width?: number;
    /**
     * The height (pixel) of the image.
     *
     * The default value is `160`.
     */
    height?: number;
    /**
     * The transparency level of the image.
     *
     * The value range is [0.0,1.0]:
     * - 0.0: Completely transparent.
     * - 1.0: (Default) Opaque.
     */
    alpha?: number;
}

/**
 * Manages the user layout configuration in [LiveStreamingTranscodingConfig]{@link LiveStreamingTranscodingConfig}.
 */
export declare interface LiveStreamingTranscodingUser {
    /**
     * The transparency level of the user's video.
     *
     * The value ranges between 0.0 and 1.0:
     *
     * - 0.0: Completely transparent.
     * - 1.0: (Default) Opaque.
     */
    alpha?: number;
    /**
     * The height of the video.
     *
     * The default value is 640.
     */
    height?: number;
    /**
     * The user ID of the CDN live host.
     */
    uid: UID;
    /**
     * The width of the video.
     *
     * The default value is 360.
     */
    width?: number;
    /**
     * The position of the top-left corner of the video on the horizontal axis.
     *
     * The default value is 0.
     */
    x?: number;
    /**
     * The position of the top-left corner of the video on the vertical axis.
     *
     * The default value is 0.
     */
    y?: number;
    /**
     * The layer index of the video frame.
     *
     * An integer. The value range is [0,100].
     *
     * - 0: (Default) Bottom layer.
     * - 100: Top layer.
     */
    zOrder?: number;
    /**
     * The audio channel ranging between 0 and 5. The default value is 0.
     * - 0: (default) Supports dual channels. Depends on the upstream of the broadcaster.
     * - 1: The audio stream of the broadcaster uses the FL audio channel. If the broadcaster’s upstream uses multiple audio channels, these channels are mixed into mono first.
     * - 2: The audio stream of the broadcaster uses the FC audio channel. If the broadcaster’s upstream uses multiple audio channels, these channels are mixed into mono first.
     * - 3: The audio stream of the broadcaster uses the FR audio channel. If the broadcaster’s upstream uses multiple audio channels, these channels are mixed into mono first.
     * - 4: The audio stream of the broadcaster uses the BL audio channel. If the broadcaster’s upstream uses multiple audio channels, these channels are mixed into mono first.
     * - 5: The audio stream of the broadcaster uses the BR audio channel. If the broadcaster’s upstream uses multiple audio channels, these channels are mixed into mono first.
     */
    audioChannel?: number;
}

/**
 * @ignore
 *
 * -----暂不对外的备用内容-----
 * - `cds`：（可选）配置下发服务。默认关闭。包含可选属性 `hostname` 和 `port`。
 *
 * 默认值
 *   |`cds.hostname`| `accessPoints` 所包含的 hostname 列表|
 *   |`cds.port`|443|
 */
export declare type LocalAccessPointConfig = {
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

declare class LocalAudioTrack extends LocalTrack implements ILocalAudioTrack {
    readonly trackMediaType: "audio" | "video";
    _encoderConfig?: AudioEncoderConfiguration;
    _trackSource: AudioTrackSource | FakeTrackSource;
    get _source(): AudioTrackSource | FakeTrackSource;
    set _source(source: AudioTrackSource | FakeTrackSource);
    _enabled: boolean;
    private _volume;
    _useAudioElement: boolean;
    _bypassWebAudio: boolean;
    protected processor?: IAudioProcessor;
    protected _processorContext: AudioProcessorContext;
    protected get processorContext(): AudioProcessorContext;
    protected set processorContext(ctx: AudioProcessorContext);
    _processorDestination: AudioProcessorDestination;
    get processorDestination(): AudioProcessorDestination;
    set processorDestination(des: AudioProcessorDestination);
    protected _getOriginVolumeLevel: boolean;
    get isPlaying(): boolean;
    get __className__(): string;
    constructor(track: MediaStreamTrack, encoderConfig?: AudioEncoderConfiguration, trackId?: string, getOriginVolumeLevel?: boolean, deferWebAudio?: boolean);
    setVolume(volume: number): void;
    getVolumeLevel(): number;
    setPlaybackDevice(deviceId: string): Promise<void>;
    setEnabled(enabled: boolean, _?: any, skipChangeState?: boolean): Promise<void>;
    protected _setEnabled(enabled: boolean, _?: any, skipChangeState?: boolean): Promise<void>;
    setMuted(muted: boolean): Promise<void>;
    getStats(): LocalAudioTrackStats;
    setAudioFrameCallback(callback: null | ((buffer: AudioBuffer) => void), frameSize?: number): void;
    play(): void;
    stop(): void;
    close(): void;
    protected _updatePlayerSource(updateWebAudioSource?: boolean): void;
    protected _updateOriginMediaStreamTrack(track: MediaStreamTrack, stopOldTrack: boolean): Promise<void>;
    renewMediaStreamTrack(newConstraints?: MediaTrackConstraints): Promise<void>;
    pipe(processor: IAudioProcessor): IAudioProcessor;
    unpipe(): void;
    private bindProcessorDestinationEvents;
    private unbindProcessorDestinationEvents;
    private unbindProcessorContextEvents;
}

/**
 * Information of the local audio track, which can be retrieved by calling [AgoraRTCClient.getLocalAudioStats]{@link IAgoraRTCClient.getLocalAudioStats}.
 */
export declare interface LocalAudioTrackStats {
    /**
     * The audio codec.
     *
     * - `"opus"`: The audio codec is OPUS。
     * - `"aac"`: The audio codec is AAC。
     * - `"pcmu"`: Reserved for future use.
     * - `"pcma"`: Reserved for future use.
     * - `"g722"`: Reserved for future use.
     *
     * > Firefox does not support this property.
     */
    codecType?: "opus" | "aac" | "PCMU" | "PCMA" | "G722";
    /**
     * The energy level of the sent audio.
     *
     * The value range is [0,32767].
     *
     * > This value is retrieved by calling WebRTC-Stats and may not be up-to-date. To get the real-time sound volume, call [LocalAudioTrack.getVolumeLevel]{@link ILocalAudioTrack.getVolumeLevel}.
     */
    sendVolumeLevel: number;
    /**
     * The bitrate (bps) of the sent audio.
     */
    sendBitrate: number;
    /**
     * The total bytes of the sent audio.
     */
    sendBytes: number;
    /**
     * The total packets of the sent audio.
     */
    sendPackets: number;
    /**
     * The total number of lost audio packets that were sent.
     *
     * > You can not get this property on Safari.
     */
    sendPacketsLost: number;
    /**
     * Jitter (ms) of the audio packets that were sent.
     */
    sendJitterMs: number;
    /**
     * Round-trip time delay (ms) of the audio packets that were sent.
     */
    sendRttMs: number;
    /**
     * The packet loss rate of the sent audio in 400ms.
     */
    currentPacketLossRate: number;
}

declare class LocalDataChannel extends DataChannel implements ILocalDataChannel {
    send(data: ArrayBuffer): void;
}

declare abstract class LocalTrack extends Track implements ILocalTrack {
    _enabled: boolean;
    _muted: boolean;
    _isExternalTrack: boolean;
    get isExternalTrack(): boolean;
    get muted(): boolean;
    get enabled(): boolean;
    _isClosed: boolean;
    protected _enabledMutex: PromiseMutex;
    protected processor?: IBaseProcessor;
    protected abstract _processorContext: IProcessorContext;
    protected get processorContext(): IProcessorContext;
    protected set processorContext(ctx: IProcessorContext);
    constructor(track: MediaStreamTrack, trackId?: string);
    abstract getStats(): LocalVideoTrackStats | LocalAudioTrackStats;
    abstract setMuted(enabled: boolean): Promise<void>;
    abstract setEnabled(enabled: boolean): Promise<void>;
    getTrackLabel(): string;
    close(): void;
    protected _updateOriginMediaStreamTrack(track: MediaStreamTrack, stopOldTrack: boolean, isExternalTrack?: boolean): Promise<void>;
    protected abstract _updatePlayerSource(): void;
    protected _getDefaultPlayerConfig(): Partial<PlayerConfig>;
    protected _handleTrackEnded: () => void;
    protected onTrackEnded(): void;
    protected stateCheck(stateName: "enabled" | "muted", state: boolean): void;
    abstract renewMediaStreamTrack(): Promise<void>;
    getProcessorStats(): ProcessorStats[];
    getProcessorUsage(): Promise<UsageWithDirection[]>;
}

declare class LocalVideoTrack extends LocalTrack implements ILocalVideoTrack {
    readonly trackMediaType: "audio" | "video";
    _player?: AgoraRTCPlayer | VideoPlayer;
    private _videoVisibleTimer;
    private _previousVideoVisibleStatus;
    private _clearPreviousVideoVisibleStatus;
    _encoderConfig?: Partial<VideoEncoderConfiguration>;
    _scalabilityMode?: SVCConfiguration;
    _optimizationMode?: "motion" | "detail" | "balanced";
    _videoHeight?: number;
    _videoWidth?: number;
    _forceBitrateLimit?: {
        max_bitrate: number;
        min_bitrate: number;
    };
    _enabled: boolean;
    get isPlaying(): boolean;
    processorDestination: VideoProcessorDestination;
    protected _processorContext: VideoProcessorContext;
    protected get processorContext(): VideoProcessorContext;
    protected set processorContext(ctx: VideoProcessorContext);
    get __className__(): string;
    constructor(track: MediaStreamTrack, encoderConfig?: Partial<VideoEncoderConfiguration>, scalabilityConfig?: SVCConfiguration, optimizationMode?: "motion" | "detail" | "balanced", trackId?: string, hints?: TrackHint[]);
    play(element: HTMLElement | HTMLVideoElement | string, config?: VideoPlayerConfig): void;
    stop(): void;
    setEnabled(enabled: boolean, skipChangeState?: boolean): Promise<void>;
    setMuted(muted: boolean): Promise<void>;
    setEncoderConfiguration(config: VideoEncoderConfiguration | VideoEncoderConfigurationPreset, doNotRenegoation?: boolean): Promise<void>;
    getStats(): LocalVideoTrackStats;
    setBeautyEffect(enabled: boolean, options?: BeautyEffectOptions): Promise<void>;
    getCurrentFrameData(): ImageData;
    getCurrentFrameImage(imageType: string, quality?: number): Promise<ImageTypedData>;
    setBitrateLimit(bitrateLimit: {
        max_bitrate: number;
        min_bitrate: number;
    }): Promise<void>;
    setOptimizationMode(mode: "motion" | "detail" | "balanced"): Promise<void>;
    setScalabiltyMode(mode: SVCConfiguration): void;
    updateMediaStreamTrackResolution(): void;
    protected _updatePlayerSource(): void;
    protected _getDefaultPlayerConfig(): Partial<VideoPlayerConfig>;
    updateBitrateFromProfile(): void;
    getVideoElementVisibleStatus(): CheckVideoVisibleResult | undefined;
    renewMediaStreamTrack(newConstraints?: MediaTrackConstraints): Promise<void>;
    pipe(processor: IBaseProcessor): IBaseProcessor;
    unpipe(): void;
    close(): void;
    clone(config?: VideoEncoderConfiguration | VideoEncoderConfigurationPreset, cloneTrack?: boolean): LocalVideoTrack;
    replaceTrack(track: MediaStreamTrack, stopOldTrack: boolean): Promise<void>;
    private bindProcessorDestinationEvents;
    private unbindProcessorDestinationEvents;
    private unbindProcessorContextEvents;
}

/**
 * Information of the local video track, which can be retrieved by calling [AgoraRTCClient.getLocalVideoStats]{@link IAgoraRTCClient.getLocalVideoStats}.
 */
export declare interface LocalVideoTrackStats {
    /**
     * The video codec.
     *
     * - `"H264"`: The video codec is H.264.
     * - `"H265"`: The video codec is H.265.
     * - `"VP8"`: The video codec is VP8.
     * - `"VP9"`: (Beta) The video codec is VP9.
     * - `"AV1X"`: Reserved for future use.
     * - `"AV1"`: Reserved for future use.
     *
     * > You can not get this property on Firefox.
     */
    codecType?: "H264" | "H265" | "VP8" | "VP9" | "AV1X" | "AV1";
    /**
     * The total bytes of the sent video.
     */
    sendBytes: number;
    /**
     * The frame rate (fps) of the sent video.
     *
     * > You can not get this property on Firefox.
     */
    sendFrameRate?: number;
    /**
     * The frame rate (fps) of the captured video.
     *
     * > You can not get this property on Safari and Firefox.
     */
    captureFrameRate?: number;
    /**
     * The total packets of the sent video.
     */
    sendPackets: number;
    /**
     * The total number of lost video packets that were sent.
     *
     * > - You can not get this property on Safari.
     * > - This property is inaccurate on Firefox.
     */
    sendPacketsLost: number;
    /**
     * Jitter (ms) of the video packets that were sent.
     */
    sendJitterMs: number;
    /**
     * Round-trip time delay (ms) of the video packets that were sent.
     */
    sendRttMs: number;
    /**
     * The resolution height (pixel) of the sent video.
     */
    sendResolutionHeight: number;
    /**
     * The resolution width (pixel) of the sent video.
     */
    sendResolutionWidth: number;
    /**
     * The resolution height (pixel) of the captured video.
     */
    captureResolutionHeight: number;
    /**
     * The resolution width (pixel) of the captured video.
     */
    captureResolutionWidth: number;
    /**
     * The time (ms) required for encoding the captured video.
     */
    encodeDelay?: number;
    /**
     * The bitrate (bps) of the sent video.
     */
    sendBitrate: number;
    /**
     * The target bitrate (bps) of the sent video, namely the bitrate set in {@link VideoEncoderConfiguration}.
     */
    targetSendBitrate: number;
    /**
     * The total duration of the sent video in seconds.
     */
    totalDuration: number;
    /**
     * The total freeze time of the encoded video in seconds.
     */
    totalFreezeTime: number;
    /**
     * The packet loss rate of the sent video in 400ms.
     */
    currentPacketLossRate: number;
}

/**
 * The video profile of the low-quality video stream. Set the the video profile of the low-quality video stream when calling [setLowStreamParameter]{@link IAgoraRTCClient.setLowStreamParameter}.
 */
export declare interface LowStreamParameter {
    /**
     * Width of the video.
     *
     * You can pass a `number`, or a constraint such as `{ max: 1280, min: 720 }`.
     *
     * For more details about the constraint, see [ConstrainLong]{@link ConstrainLong}.
     */
    width: ConstrainULong;
    /**
     * Height of the video.
     *
     * You can pass a `number`, or a constraint such as `{ max: 1280, min: 720 }`.
     *
     * For more details about the constraint, see [ConstrainLong]{@link ConstrainLong}.
     */
    height: ConstrainULong;
    /**
     * Frame rate of the video (fps).
     *
     * You can pass a `number`, or a constraint such as `{ max: 30, min: 5 }`.
     *
     * For details about the constraint, see [ConstrainLong]{@link ConstrainLong}.
     */
    framerate?: ConstrainULong;
    /**
     * Bitrate of the video (Kbps).
     */
    bitrate?: number;
}

declare enum MediaElementStatus {
    NONE = "none",
    INIT = "init",
    CANPLAY = "canplay",
    PLAYING = "playing",
    PAUSED = "paused",
    SUSPEND = "suspend",
    STALLED = "stalled",
    WAITING = "waiting",
    ERROR = "error",
    DESTROYED = "destroyed",
    ABORT = "abort",
    ENDED = "ended",
    EMPTIED = "emptied",
    LOADEDDATA = "loadeddata"
}

declare class MicrophoneAudioTrack extends LocalAudioTrack implements IMicrophoneAudioTrack {
    _config: MicrophoneAudioTrackInitConfig;
    _deviceName: string;
    private _constraints;
    private readonly _originalConstraints;
    _enabled: boolean;
    get __className__(): string;
    constructor(track: MediaStreamTrack, config: MicrophoneAudioTrackInitConfig, constraints: MediaTrackConstraints, trackId?: string);
    setDevice(deviceId: string): Promise<void>;
    setEnabled(enabled: boolean, notCloseDevice?: boolean, skipChangeState?: boolean): Promise<void>;
    close(): void;
    protected onTrackEnded(): void;
    renewMediaStreamTrack(newConstraints?: MediaTrackConstraints): Promise<void>;
    private bindProcessorContextEvents;
}

/**
 * Configurations for the audio track from the audio captured by a microphone. Set these configurations when calling [AgoraRTC.createMicrophoneAudioTrack]{@link IAgoraRTC.createMicrophoneAudioTrack}.
 */
export declare interface MicrophoneAudioTrackInitConfig {
    /**
     * The audio encoder configurations.
     *
     * You can set the audio encoder configurations in either of the following ways:
     * - Pass the preset audio encoder configurations by using [[AudioEncoderConfigurationPreset]].
     * - Pass your customized audio encoder configurations by using [[AudioEncoderConfiguration]].
     *
     * > Firefox does not support setting the audio encoding rate.
     */
    encoderConfig?: AudioEncoderConfiguration | AudioEncoderConfigurationPreset;
    /**
     * Whether to enable acoustic echo cancellation:
     * - `true`: Enable acoustic echo cancellation.
     * - `false`: Do not enable acoustic echo cancellation.
     */
    AEC?: boolean;
    /**
     * Whether to enable audio gain control:
     * - `true`: Enable audio gain control.
     * - `false`: Do not enable audio gain control.
     */
    AGC?: boolean;
    /**
     * Whether to enable automatic noise suppression:
     * - `true`: Enable automatic noise suppression.
     * - `false`: Do not automatic noise suppression.
     */
    ANS?: boolean;
    /**
     * @ignore
     */
    DTX?: boolean;
    /**
     * Specifies the microphone ID.
     *
     * You can get a list of the available microphones by calling [AgoraRTC.getMicrophones]{@link IAgoraRTC.getMicrophones}.
     */
    microphoneId?: string;
    /**
     * @ignore
     * Specifies whether or not audio track pass through WebAudio.
     */
    bypassWebAudio?: boolean;
}


/**
 * The last-mile network quality.
 *
 * Last mile refers to the connection between the local device and Agora edge server.
 *
 * - After the local user joins the channel, the SDK triggers the [AgoraRTCClient.on("network-quality")]{@link IAgoraRTCClient.event_network_quality} callback once every two seconds and provides the uplink and downlink last-mile network conditions of the user through this interface.
 * - You can call [AgoraRTCClient.getRemoteNetworkQuality]{@link IAgoraRTCClient.getRemoteNetworkQuality} to get the network quality of all remote users to whom the local user subscribes.
 *
 * > The returned network quality is a relative value and is for reference only.
 */
export declare interface NetworkQuality {
    /**
     * The uplink network quality.
     *
     * It is calculated based on the uplink transmission bitrate, uplink packet loss rate, RTT (round-trip time) and jitter.
     *
     * - 0: The quality is unknown.
     * - 1: The quality is excellent.
     * - 2: The quality is good, but the bitrate is less than optimal.
     * - 3: Users experience slightly impaired communication.
     * - 4: Users can communicate with each other, but not very smoothly.
     * - 5: The quality is so poor that users can barely communicate.
     * - 6: The network is disconnected and users cannot communicate.
     */
    uplinkNetworkQuality: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    /**
     * The downlink network quality.
     *
     * It is calculated based on the uplink transmission bitrate, uplink packet loss rate, RTT (round-trip time) and jitter.
     *
     * - 0: The quality is unknown.
     * - 1: The quality is excellent.
     * - 2: The quality is good, but the bitrate is less than optimal.
     * - 3: Users experience slightly impaired communication.
     * - 4: Users can communicate with each other, but not very smoothly.
     * - 5: The quality is so poor that users can barely communicate.
     * - 6: The network is disconnected and users cannot communicate.
     */
    downlinkNetworkQuality: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

export declare function onAudioAutoplayFailed(fn: () => void): void;

export declare function onAutoplayFailed(fn: () => void): void;

export declare function onCameraChanged(fn: (info: DeviceInfo) => void): void;

export declare function onMicrophoneChanged(fn: (info: DeviceInfo) => void): void;

export declare function onSecurityPolicyViolation(fn: (event: SecurityPolicyViolationEvent) => void): void;


export declare function processExternalMediaAEC(element: HTMLMediaElement): void;

declare class PromiseMutex {
    static setLogger(_logger: any): void;
    private lockingPromise;
    private locks;
    private name;
    private lockId;
    constructor(name?: string);
    get isLocked(): boolean;
    lock(info?: string): Promise<() => void>;
}

export declare function registerExtensions(extensions: IExtension<any>[]): void;

declare class RemoteAudioTrack extends RemoteTrack implements IRemoteAudioTrack {
    readonly trackMediaType: "audio" | "video";
    _source: AudioTrackSource | FakeTrackSource;
    _useAudioElement: boolean;
    private _volume;
    protected processorContext: AudioProcessorContext;
    processorDestination: AudioProcessorDestination;
    private _played;
    private _bypassWebAudio;
    get isPlaying(): boolean;
    get __className__(): string;
    constructor(track: MediaStreamTrack, userId: UID, uintId: number, store: SDKStore);
    setAudioFrameCallback(callback: null | ((buffer: AudioBuffer) => void), frameSize?: number): void;
    setVolume(volume: number): void;
    setPlaybackDevice(deviceId: string): Promise<void>;
    getVolumeLevel(): number;
    getStats(): RemoteAudioTrackStats;
    play(): void;
    stop(): void;
    _destroy(): void;
    _isFreeze(): boolean;
    protected _updatePlayerSource(updateWebAudioSource?: boolean): void;
    pipe(processor: IAudioProcessor): IAudioProcessor;
    unpipe(): void;
    private bindProcessorDestinationEvents;
    private unbindProcessorDestinationEvents;
}

/**
 * Statistics of the remote audio track, such as connection and transmission statistics, which can be retrieved by calling [AgoraRTCClient.getRemoteAudioStats]{@link IAgoraRTCClient.getRemoteAudioStats}.
 */
export declare interface RemoteAudioTrackStats {
    /**
     * Transmission delay (ms).
     *
     * The delay (ms) between a remote client sending the audio and the local client receiving the audio.
     */
    transportDelay: number;
    /**
     * The audio codec.
     *
     * - `"opus"`: The audio codec is OPUS。
     * - `"aac"`: The audio codec is AAC。
     * - `"pcmu"`: Reserved for future use.
     * - `"pcma"`: Reserved for future use.
     * - `"g722"`: Reserved for future use.
     *
     * > Firefox does not support this property.
     */
    codecType?: "opus" | "aac" | "PCMU" | "PCMA" | "G722";
    /**
     * End-to-end delay (ms).
     *
     * The delay (ms) between a remote client sampling the audio and the local client playing the audio.
     * This delay does not include the time spent in encoding at the remote client and the time spent in decoding at the local client.
     */
    end2EndDelay: number;
    /**
     * The bitrate (bps) of the received audio.
     */
    receiveBitrate: number;
    /**
     * The energy level of the received audio.
     *
     * The value range is [0,32767].
     *
     * > This value is retrieved by calling WebRTC-Stats and may not be up-to-date. To get the real-time sound volume, call [RemoteAudioTrack.getVolumeLevel]{@link IRemoteAudioTrack.getVolumeLevel}.
     */
    receiveLevel: number;
    /**
     * The total bytes of the received audio.
     */
    receiveBytes: number;
    /**
     * The delay (ms) between a remote client sending the audio and the local client playing the audio.
     *
     * > This property is inaccurate on Safari and Firefox.
     */
    receiveDelay: number;
    /**
     * The total packets of the received audio.
     */
    receivePackets: number;
    /**
     * The total number of lost audio packets that should be received.
     */
    receivePacketsLost: number;
    /**
     * The packet loss rate of the received audio.
     */
    packetLossRate: number;
    /**
     * The packet loss rate of the received audio.
     */
    currentPacketLossRate: number;
    /**
     * The total duration of the received audio in seconds.
     */
    totalDuration: number;
    /**
     * The total freeze time of the received audio in seconds.
     */
    totalFreezeTime: number;
    /**
     * The freeze rate of the received audio.
     */
    freezeRate: number;
    publishDuration: number;
}

declare class RemoteDataChannel extends DataChannel implements IRemoteDataChannel {
    private _messageListener;
    constructor(config: IDataChannelConfig);
    _updateOriginDataChannel(datachannel: RTCDataChannel): void;
    _close(): void;
    private _bandRemoteDataChannelEvents;
}

/**
 * The stream fallback option. Set the stream fallback option when calling [setStreamFallbackOption]{@link IAgoraRTCClient.setStreamFallbackOption}.
 *
 */
export declare enum RemoteStreamFallbackType {
    /**
     * 0: Disable the fallback.
     */
    DISABLE = 0,
    /**
     * 1: (Default) Automatically subscribe to the low-video stream under poor network conditions. */
    LOW_STREAM = 1,
    /**
     * 2: Subscribe to the low-quality video stream when the network conditions worsen, and subscribe to audio only when the conditions become too poor to support video transmission.
     */
    AUDIO_ONLY = 2
}

/**
 * The video type of the remote stream. Set the video type of the remote stream when calling [setRemoteVideoStreamType]{@link IAgoraRTCClient.setRemoteVideoStreamType}.
 */
export declare enum RemoteStreamType {
    /**
     * 0: High-quality video stream (high-bitrate, high-resolution).
     */
    HIGH_STREAM = 0,
    /**
     * 1: Low-quality video stream (low-bitrate, low-resolution).
     */
    LOW_STREAM = 1
}

declare abstract class RemoteTrack extends Track implements IRemoteTrack {
    private _userId;
    _isDestroyed: boolean;
    protected store: SDKStore;
    protected processor?: IBaseProcessor;
    protected abstract processorContext: IProcessorContext;
    getUserId(): UID;
    abstract getStats(): RemoteAudioTrackStats | RemoteVideoTrackStats;
    constructor(track: MediaStreamTrack, userId: UID, uintId: number, store: SDKStore);
    _updateOriginMediaStreamTrack(track: MediaStreamTrack): void;
    _destroy(): void;
    protected abstract _updatePlayerSource(): void;
    getProcessorStats(): ProcessorStats[];
    getProcessorUsage(): Promise<UsageWithDirection[]>;
}

declare class RemoteVideoTrack extends RemoteTrack implements IRemoteVideoTrack {
    private _videoVisibleTimer;
    private _previousVideoVisibleStatus;
    private _clearPreviousVideoVisibleStatus;
    readonly trackMediaType: "audio" | "video";
    _videoWidth?: number;
    _videoHeight?: number;
    _player?: AgoraRTCPlayer | VideoPlayer;
    processorDestination: VideoProcessorDestination;
    protected processorContext: VideoProcessorContext;
    get isPlaying(): boolean;
    get __className__(): string;
    constructor(track: MediaStreamTrack, userId: UID, uintId: number, store: SDKStore);
    getStats(): RemoteVideoTrackStats;
    play(element: string | HTMLElement | HTMLVideoElement, config?: VideoPlayerConfig): void;
    stop(): void;
    getCurrentFrameData(): ImageData;
    updateMediaStreamTrackResolution(): void;
    protected _updatePlayerSource(): void;
    getVideoElementVisibleStatus(): CheckVideoVisibleResult | undefined;
    pipe(processor: IBaseProcessor): IBaseProcessor;
    unpipe(): void;
    private bindProcessorDestinationEvents;
    private unbindProcessorDestinationEvents;
    _destroy(): void;
}

/**
 * Statistics of the remote video track, such as connection and transmission statistics, which can be retrieved by calling [AgoraRTCClient.getRemoteVideoStats]{@link IAgoraRTCClient.getRemoteVideoStats}.
 */
export declare interface RemoteVideoTrackStats {
    /**
     * Transmission delay (ms).
     *
     * The delay (ms) between a remote client sending the video and the local client receiving the video.
     */
    transportDelay: number;
    /**
     * The video codec.
     *
     * - `"H264"`: The video codec is H.264.
     * - `"H265"`: The video codec is H.265.
     * - `"VP8"`: The video codec is VP8.
     * - `"VP9"`: (Beta) The video codec is VP9.
     * - `"AV1X"`: Reserved for future use.
     * - `"AV1"`: Reserved for future use.
     *
     * > You can not get this property on Firefox.
     */
    codecType?: "H264" | "H265" | "VP8" | "VP9" | "AV1X" | "AV1";
    /**
     * End-to-end delay (ms).
     *
     * The delay (ms) a remote client capturing the video and the local client playing the video.
     * This delay does not include the time spent in encoding at the remote client and the time spent in decoding at the local client.
     */
    end2EndDelay: number;
    /**
     * The bitrate (bps) of the received video.
     */
    receiveBitrate: number;
    /**
     * The delay (ms) between a remote client sending the video and the local client playing the video.
     *
     * > This property is inaccurate on Safari and Firefox.
     */
    receiveDelay: number;
    /**
     * The total byes of the received video.
     */
    receiveBytes: number;
    /**
     * The frame rate (fps) of the decoded video.
     */
    decodeFrameRate?: number;
    /**
     * The frame rate (fps) of the received video.
     */
    receiveFrameRate?: number;
    /**
     * The rendering frame rate (fps) of the decoded video.
     */
    renderFrameRate?: number;
    /**
     * The total bytes of the received video.
     */
    receivePackets: number;
    /**
     * The total number of lost video packets that should be received.
     */
    receivePacketsLost: number;
    /**
     * The packet loss rate of the received video.
     */
    packetLossRate: number;
    /**
     * The packet loss rate of the received video.
     */
    currentPacketLossRate: number;
    /**
     * The resolution height (pixel) of the received video.
     */
    receiveResolutionHeight: number;
    /**
     * The resolution width (pixel) of the received video.
     */
    receiveResolutionWidth: number;
    /**
     * The total duration of the received video in seconds.
     */
    totalDuration: number;
    /**
     * The total freeze time of the received video in seconds.
     */
    totalFreezeTime: number;
    /**
     * The freeze rate of the received video.
     */
    freezeRate: number;
    publishDuration: number;
}

declare type RequiredOnlyOneOf<T, K extends keyof T = keyof T> = {
    [P in K]: {
        [S in P]: T[S];
    } & {
        [U in keyof Omit<T, P>]?: never;
    };
}[K] extends infer O ? {
    [K in keyof O]: O[K];
} : never;

/**
 * @ignore
 */
declare interface RetryConfiguration {
    timeout: number;
    timeoutFactor: number;
    maxRetryCount: number;
    maxRetryTimeout: number;
}

/**
 * The preset video encoder configurations for screen sharing.
 *
 * You can pass the preset video encoder configurations when calling [AgoraRTC.createScreenVideoTrack]{@link IAgoraRTC.createScreenVideoTrack}.
 *
 * The following table lists all the preset video profiles for screen sharing.
 *
 * | Video Profile | Resolution (Width×Height) | Frame Rate (fps) |
 * | -------- | --------------- | ----------- |
 * | "480p"     | 640 × 480       | 5           |
 * | "480p_1"   | 640 × 480       | 5           |
 * | "480p_2"   | 640 × 480       | 30          |
 * | "480p_3"   | 640 × 480       | 15          |
 * | "720p"     | 1280 × 720      | 5           |
 * | "720p_1"   | 1280 × 720      | 5           |
 * | "720p_2"   | 1280 × 720      | 30          |
 * | "720p_3"   | 1280 × 720      | 15          |
 * | "1080p"    | 1920 × 1080     | 5           |
 * | "1080p_1"  | 1920 × 1080     | 5           |
 * | "1080p_2"  | 1920 × 1080     | 30          |
 * | "1080p_3"  | 1920 × 1080     | 15          |
 */
export declare type ScreenEncoderConfigurationPreset = keyof typeof SUPPORT_SCREEN_ENCODER_CONFIG_LIST;

/**
 * The type of the source for screen sharing.
 * - `"screen"`: Sharing the whole screen.
 * - `"application"`: Sharing all windows of an app.
 * - `"window"`: Sharing a window of an app.
 */
export declare type ScreenSourceType = "screen" | "window" | "application";

/**
 * Configurations for the video track for screen sharing. Set these configurations when calling [AgoraRTC.createScreenVideoTrack]{@link IAgoraRTC.createScreenVideoTrack}.
 */
export declare interface ScreenVideoTrackInitConfig {
    /**
     * The video encoder configurations for screen sharing.
     *
     * You can set the video encoder configurations in either of the following ways:
     * - Pass the preset video encoder configurations by using [[ScreenEncoderConfigurationPreset]].
     * - Pass your customized video encoder configurations by using [[VideoEncoderConfiguration]].
     */
    encoderConfig?: VideoEncoderConfiguration | ScreenEncoderConfigurationPreset;
    /**
     * The `sourceId` when you share the screen through Electron.
     */
    electronScreenSourceId?: string;
    /**
     * The `extensionId` when you share the screen with a Chrome extension.
     */
    extensionId?: string;
    /**
     *
     * **DEPRECATED** from v4.17.1. Use {@link displaySurface} instead.
     *
     * The type of the source for screen sharing.
     */
    screenSourceType?: ScreenSourceType;
    /**
     * **Since**
     * <br>&emsp;&emsp;&emsp;*4.0.0*
     *
     * Transmission optimization mode. Whether to prioritize video quality or smoothness:
     * - `"detail"`: (Default) Prioritizes video quality.
     *   - The SDK ensures high-quality images by automatically calculating a minimum bitrate based on the capturing resolution and frame rate. No matter how poor the network condition is, the sending bitrate will never be lower than the minimum value.
     *   - In most cases, the SDK does not reduce the sending resolution, but may reduce the frame rate.
     * -  `"motion"`: Prioritizes video smoothness.
     *   - In poor network conditions, the SDK reduces the sending bitrate to minimize video freezes.
     *   - In most cases, the SDK does not reduce the frame rate, but may reduce the sending resolution.
     *
     * > Note: This method is only supported on Chrome.
     */
    optimizationMode?: "motion" | "detail";
    /**
     * @ignore
     *
     * **Since**
     * <br>&emsp;&emsp;&emsp;*4.18.0*
     *
     * Configurations for Scalable Video Coding (SVC).
     *
     * You can set the configurations using one of the following options:
     * - Use the preset SVC configurations provided by the SDK through {@link SVCConfigurationPreset}.
     * - Use your custom SVC configurations through {@link SVCConfiguration}.
     */
    scalabiltyMode?: SVCConfiguration | SVCConfigurationPreset;
    /**
     *
     * **Since**
     * <br>&emsp;&emsp;&emsp;*4.17.1*
     *
     * The pre-selected pane in the media picker. See [displaySurface](https://developer.chrome.com/docs/web-platform/screen-sharing-controls/#displaySurface) for details.
     *
     * > Note: This property is supported on Chrome 107 and later, as well as Edge 107 and later.
     */
    displaySurface?: "browser" | "window" | "monitor";
    /**
     *
     * **Since**
     * <br>&emsp;&emsp;&emsp;*4.17.1*
     *
     * Whether to allow the user to share the current tab:
     * - `"include"`: (Default) Allows the user to share the current tab.
     * - `"exclude"`: Prevents the user from sharing the current tab.
     *
     * See [displaySurface](https://developer.chrome.com/docs/web-platform/screen-sharing-controls/#displaySurface) for details.
     *
     * > Note:
     * > - This property is defaulted to `"exclude"` on Chrome 107. For better compatibility with earlier versions, the SDK changes the default value to "include", which ensures that users can still share the current tab after upgrading to Chrome 107.
     * > - This property is supported on Chrome 107 and later, as well as Edge 107 and later.
     */
    selfBrowserSurface?: "include" | "exclude";
    /**
     *
     * **Since**
     * <br>&emsp;&emsp;&emsp;*4.17.1*
     *
     * Whether to allow the user to dynamically switch between shared tabs:
     * - `"include"`: (Default) The user can dynamically switch between shared tabs.
     * - `"exclude"`: The user cannot dynamically switch between shared tabs.
     *
     * See [surfaceSwitching](https://developer.chrome.com/docs/web-platform/screen-sharing-controls/#surfaceSwitching) for details.
     *
     * > Note: This property is supported on Chrome 107 and later, as well as Edge 107 and later.
     */
    surfaceSwitching?: "include" | "exclude";
    /**
     *
     * **Since**
     * <br>&emsp;&emsp;&emsp;*4.17.1*
     *
     * Whether to capture system audio:
     * - `"include"`: (Default) Captures system audio.
     * - `"exclude"`: Avoids capturing system audio
     *
     * See [systemAudio](https://developer.chrome.com/docs/web-platform/screen-sharing-controls/#systemAudio) for details.
     *
     * > Note: This property is supported on Chrome 105 and later (Windows only), as well as Edge 105 and later (Windows only).
     */
    systemAudio?: "include" | "exclude";
}

/**
 * @ignore
 */
export declare type SDK_AUDIO_CODEC = "opus" | "pcma" | "pcmu" | "g722";

/**
 * The codec that the Web browser uses for encoding.
 * - `"vp8"`: Use VP8 for encoding.
 * - `"h264"`: Use H.264 for encoding.
 * - `"h265"`: Use H.265 for encoding.
 * - `"vp9"`: (Beta) Use VP9 for encoding.
 * - `"av1"`: Reserved, unavailable now.
 *
 * > Safari 12.1 or earlier does not support the VP8 codec.
 */
export declare type SDK_CODEC = "h264" | "h265" | "vp8" | "vp9" | "av1";

/**
 * The channel profile.
 *
 * The SDK differentiates channel profiles and applies different optimization algorithms accordingly. For example, it prioritizes smoothness and low latency for a video call, and prioritizes video quality for a video broadcast.
 *
 * The SDK supports the following channel profiles:
 * - `"live"`: Sets the channel profile as live broadcast. You need to go on to call [setClientRole]{@link IAgoraRTCClient.setClientRole} to set the client as either a host or an audience. A host can send and receive audio or video, while an audience can only receive audio or video.
 * - `"rtc"`: Sets the channel profile as communication. It is used for a one-on-one call or a group call where all users in the channel can converse freely.
 */
export declare type SDK_MODE = "live" | "rtc";

declare class SDKStore {
    private state;
    constructor(codec: SDK_CODEC, audioCodec: SDK_AUDIO_CODEC, mode: SDK_MODE, clientId: string);
    private dispatch;
    set sessionId(sessionId: string | null);
    get sessionId(): string | null;
    get codec(): SDK_CODEC;
    get audioCodec(): SDK_AUDIO_CODEC;
    get clientId(): string;
    set p2pId(p2pId: number);
    get p2pId(): number;
    set dcId(dcId: number);
    get dcId(): number;
    set uid(uid: UID | undefined);
    get uid(): UID | undefined;
    set pubId(pubId: number);
    get pubId(): number;
    set cloudProxyServerMode(mode: CloudProxyServerMode);
    get cloudProxyServerMode(): CloudProxyServerMode;
    set useDataChannel(val: boolean);
    get useDataChannel(): boolean;
    set useP2P(val: boolean);
    get useP2P(): boolean;
    clientCreated(): void;
    joinStart(): void;
    joinEnd(): void;
    requestAPStart(): void;
    requestAPEnd(): void;
    joinGatewayStart(): void;
    joinGatewayEnd(): void;
    peerConnectionStart(): void;
    peerConnectionEnd(): void;
    descriptionStart(): void;
    signalChannelOpen(): void;
    iceConnectionEnd(): void;
    publish(trackId: string, type: "video" | "audio" | "datachannel", publishStart?: number, publishEnd?: number): void;
    subscribe(userId: UID, type: "video" | "audio", subscribeStart?: number, subscribeEnd?: number, firstFrame?: number, streamAdded?: number, firstDecoded?: number): void;
    massSubscribe(userList: {
        userId: UID;
        type: "video" | "audio";
    }[], subscribeStart?: number, subscribeEnd?: number, firstFrame?: number): void;
    get keyMetrics(): KeyMetrics;
    recordJoinChannelService(record: Partial<JoinChannelServiceRecord>, index?: number): number;
    resetJoinChannelServiceRecords(): void;
    resetKeyMetrics(): void;
    get joinChannelServiceRecords(): JoinChannelServiceRecord[];
    get avoidJoinStart(): number;
    set avoidJoinStart(avoidJoinStart: number);
}

declare type SendDataStreamMessage = {
    payload: string | Uint8Array;
    syncWithAudio?: boolean;
} | string | Uint8Array;

export declare function setAppType(type: AppType): void;

export declare function setArea(params: AREAS[] | AREAS | {
    areaCode: AREAS[];
    excludedArea?: AREAS;
}, _force?: boolean): void;

export declare function setLogLevel(level: number): void;

export declare const setParameter: typeof setParameter_2;


declare enum StreamType {
    /**
     * 0: High-quality video stream (high-bitrate, high-resolution).
     */
    HIGH_STREAM = 0,
    /**
     * 1: Low-quality video stream (low-bitrate, low-resolution).
     */
    LOW_STREAM = 1
}

/**
 * @ignore
 */
declare const SUPPORT_SCREEN_ENCODER_CONFIG_LIST: Record<string, VideoEncoderConfiguration>;

/**
 * @ignore
 */
declare const SUPPORT_SVC_CONFIG_LIST: Record<string, SVCConfiguration>;

/**
 * @ignore
 */
declare const SUPPORT_VIDEO_ENCODER_CONFIG_LIST: Record<string, VideoEncoderConfiguration>;

/**
 * @ignore
 * **Since**
 * <br>&emsp;&emsp;&emsp;*4.18.0*
 *
 * Custom SVC encoding configurations.
 *
 * You can control the SVC configurations for local video by passing `SVCConfiguration` in the following methods:
 * - [AgoraRTC.createCameraVideoTrack]{@link IAgoraRTC.createCameraVideoTrack}
 * - [AgoraRTC.createCustomVideoTrack]{@link IAgoraRTC.createCustomVideoTrack}
 * - [AgoraRTC.createScreenVideoTrack]{@link IAgoraRTC.createScreenVideoTrack}
 */
export declare interface SVCConfiguration {
    /**
     * Specifies the number of spatial layer in SVC.
     */
    numSpatialLayers: 1 | 2 | 3;
    /**
     * Specifies the number of temporal layer in SVC.
     */
    numTemporalLayers: 1 | 3;
}

/**
 * @ignore
 *
 * **Since**
 * <br>&emsp;&emsp;&emsp;*4.18.0*
 *
 * The preset SVC configurations provided by the SDK.
 * - `"1SL1TL"`: 1 spatial layer, 1 temporal layer.
 * - `"3SL3TL"`: 3 spatial layers, 3 temporal layers.
 * - `"2SL3TL"`: 2 spatial layers, 3 temporal layers.
 *
 * You can control the SVC configurations for local video by passing these preset values in the following methods:
 * - [AgoraRTC.createCameraVideoTrack]{@link IAgoraRTC.createCameraVideoTrack}
 * - [AgoraRTC.createCustomVideoTrack]{@link IAgoraRTC.createCustomVideoTrack}
 * - [AgoraRTC.createScreenVideoTrack]{@link IAgoraRTC.createScreenVideoTrack}
 *
 */
export declare type SVCConfigurationPreset = keyof typeof SUPPORT_SVC_CONFIG_LIST;

declare abstract class Track extends EventEmitter implements ITrack {
    abstract readonly trackMediaType: "audio" | "video";
    private _ID;
    protected _rtpTransceiver?: RTCRtpTransceiver;
    protected _lowRtpTransceiver?: RTCRtpTransceiver;
    abstract get isPlaying(): boolean;
    _hints: TrackHint[];
    _isClosed: boolean;
    _originMediaStreamTrack: MediaStreamTrack;
    _mediaStreamTrack: MediaStreamTrack;
    _external: ExternalMethods;
    constructor(track: MediaStreamTrack, trackId?: string);
    toString(): string;
    getTrackId(): string;
    getMediaStreamTrack(fromInternal?: boolean): MediaStreamTrack;
    getRTCRtpTransceiver(type?: StreamType): RTCRtpTransceiver | undefined;
    getMediaStreamTrackSettings(): MediaTrackSettings;
    protected close(): void;
    abstract play(element?: HTMLElement | string): void;
    abstract stop(): void;
    _updateRtpTransceiver(transceiver?: RTCRtpTransceiver, type?: StreamType): void;
}

declare enum TrackHint {
    SCREEN_TRACK = "screen_track",
    CUSTOM_TRACK = "custome_track",
    LOW_STREAM = "low_stream"
}

/**
 * @ignore
 * The configuration of your TURN server. Used when calling [setTurnServer]{@link IAgoraRTCClient.setTurnServer}.
 */
export declare interface TurnServerConfig {
    /**
     * The URL of your TURN server. ASCII characters only.
     */
    turnServerURL: string;
    /**
     * The password of Your TURN server. ASCII characters only.
     */
    password: string;
    /**
     * The TCP port(s) you want add to your TURN server.
     */
    udpport?: number;
    /**
     * The username of your TURN server. ASCII characters only.
     */
    username: string;
    /**
     * Whether to force data transfer by the TURN Server:
     * - `true`: Force data transfer.
     * - `false`: (default) Do not force data transfer.
     */
    forceturn?: boolean;
    /**
     * The UDP port(s) you want to add to your TURN server.
     */
    tcpport?: number;
    security?: boolean;
}

/**
 * The user ID to identify a user in the channel.
 *
 * Each user in the same channel should have a unique user ID with the same data type (number or string).
 *
 * To ensure a better end-user experience, Agora recommends using a number as the user ID. See {@link join} for details.
 */
export declare type UID = number | string;

export declare const UMD: boolean;

export declare const VERSION: string;

/**
 * `VideoEncoderConfiguration` is the interface that defines the video encoder configurations.
 *
 * You can customize the video encoder configurations when calling [AgoraRTC.createCameraVideoTrack]{@link IAgoraRTC.createCameraVideoTrack} or [AgoraRTC.createScreenVideoTrack]{@link IAgoraRTC.createScreenVideoTrack}.
 *
 * The SDK provides the preset video encoder configurations. For more information, see [[VideoEncoderConfigurationPreset]].
 *
 * > The actual bitrate may differ slightly from the value you set due to the limitations of the operation system or the web browser. Agora recommends setting the bitrate between 100 Kbps and 5000 Kbps.
 */
export declare interface VideoEncoderConfiguration {
    /**
     * Width of the video.
     *
     * You can pass a `number`, or a constraint such as `{ max: 1280, min: 720 }`.
     *
     * For more details about the constraint, see [ConstrainLong]{@link ConstrainLong}.
     */
    width?: number | ConstrainLong;
    /**
     * Height of the video.
     *
     * You can pass a `number`, or a constraint such as `{ max: 1280, min: 720 }`.
     *
     * For more details about the constraint, see [ConstrainLong]{@link ConstrainLong}.
     */
    height?: number | ConstrainLong;
    /**
     * Frame rate of the video (fps).
     *
     * You can pass a `number`, or a constraint such as `{ max: 30, min: 5 }`.
     *
     * For details about the constraint, see [ConstrainLong]{@link ConstrainLong}.
     */
    frameRate?: number | ConstrainLong;
    /**
     * The minimum bitrate of the video (Kbps).
     */
    bitrateMin?: number;
    /**
     * The maximum bitrate of the video (Kbps).
     */
    bitrateMax?: number;
    /**
     * @ignore
     */
    scaleResolutionDownBy?: number;
}

/**
 *
 * The preset video encoder configurations.
 *
 * You can pass the preset video encoder configurations when calling [AgoraRTC.createCameraVideoTrack]{@link IAgoraRTC.createCameraVideoTrack} or [AgoraRTC.createScreenVideoTrack]{@link IAgoraRTC.createScreenVideoTrack}.
 *
 * The following table lists all the preset video profiles. The SDK uses `"480p_1"` by default.
 *
 * | Video Profile | Resolution (Width×Height) | Frame Rate (fps) | Bitrate (Kbps） | Chrome | Firefox | Safari |
 * | -------- | --------------- | ----------- | ------------ | ------ | ------- | ------ |
 * | 120p     | 160 × 120       | 15          | 65           | ✓      |         |        |
 * | 120p_1   | 160 × 120       | 15          | 65           | ✓      |         |        |
 * | 120p_3   | 120 × 120       | 15          | 50           | ✓      |         |        |
 * | 180p     | 320 × 180       | 15          | 140          | ✓      |         |        |
 * | 180p_1   | 320 × 180       | 15          | 140          | ✓      |         |        |
 * | 180p_3   | 180 × 180       | 15          | 100          | ✓      |         |        |
 * | 180p_4   | 240 × 180       | 15          | 120          | ✓      |         |        |
 * | 240p     | 320 × 240       | 15          | 200          | ✓      |         |        |
 * | 240p_1   | 320 × 240       | 15          | 200          | ✓      |         |        |
 * | 240p_3   | 240 × 240       | 15          | 140          | ✓      |         |        |
 * | 240p_4   | 424 × 240       | 15          | 220          | ✓      |         |        |
 * | 360p     | 640 × 360       | 15          | 400          | ✓      |         |        |
 * | 360p_1   | 640 × 360       | 15          | 400          | ✓      |         |        |
 * | 360p_3   | 360 × 360       | 15          | 260          | ✓      |         |        |
 * | 360p_4   | 640 × 360       | 30          | 600          | ✓      |         |        |
 * | 360p_6   | 360 × 360       | 30          | 400          | ✓      |         |        |
 * | 360p_7   | 480 × 360       | 15          | 320          | ✓      |         |        |
 * | 360p_8   | 480 × 360       | 30          | 490          | ✓      |         |        |
 * | 360p_9   | 640 × 360       | 15          | 800          | ✓      |         |        |
 * | 360p_10  | 640 × 360       | 24          | 800          | ✓      |         |        |
 * | 360p_11  | 640 × 360       | 24          | 1000         | ✓      |         |        |
 * | 480p     | 640 × 480       | 15          | 500          | ✓      | ✓       | ✓      |
 * | 480p_1   | 640 × 480       | 15          | 500          | ✓      | ✓       | ✓      |
 * | 480p_2   | 640 × 480       | 30          | 1000         | ✓      | ✓       | ✓      |
 * | 480p_3   | 480 × 480       | 15          | 400          | ✓      | ✓       | ✓      |
 * | 480p_4   | 640 × 480       | 30          | 750          | ✓      | ✓       | ✓      |
 * | 480p_6   | 480 × 480       | 30          | 600          | ✓      | ✓       | ✓      |
 * | 480p_8   | 848 × 480       | 15          | 610          | ✓      | ✓       | ✓      |
 * | 480p_9   | 848 × 480       | 30          | 930          | ✓      | ✓       | ✓      |
 * | 480p_10  | 640 × 480       | 10          | 400          | ✓      | ✓       | ✓      |
 * | 720p     | 1280 × 720      | 15          | 1130         | ✓      | ✓       | ✓      |
 * | 720p_1   | 1280 × 720      | 15          | 1130         | ✓      | ✓       | ✓      |
 * | 720p_2   | 1280 × 720      | 30          | 2000         | ✓      | ✓       | ✓      |
 * | 720p_3   | 1280 × 720      | 30          | 1710         | ✓      | ✓       | ✓      |
 * | 720p_5   | 960 × 720       | 15          | 910          | ✓      | ✓       | ✓      |
 * | 720p_6   | 960 × 720       | 30          | 1380         | ✓      | ✓       | ✓      |
 * | 1080p    | 1920 × 1080     | 15          | 2080         | ✓      |         | ✓      |
 * | 1080p_1  | 1920 × 1080     | 15          | 2080         | ✓      |         | ✓      |
 * | 1080p_2  | 1920 × 1080     | 30          | 3000         | ✓      |         | ✓      |
 * | 1080p_3  | 1920 × 1080     | 30          | 3150         | ✓      |         | ✓      |
 * | 1080p_5  | 1920 × 1080     | 60          | 4780         | ✓      |         | ✓      |
 */
export declare type VideoEncoderConfigurationPreset = keyof typeof SUPPORT_VIDEO_ENCODER_CONFIG_LIST;


/**
 * Playback configurations for a video track. Set the playback configurations for a video track when calling [ILocalVideoTrack.play]{@link ILocalVideoTrack.play}.
 */
export declare interface VideoPlayerConfig {
    /**
     * Sets whether to enable mirror mode:
     * - `true`: Enable mirror mode.
     * - `false`: Disable mirror mode.
     *
     * > Notes:
     * > - The SDK enables mirror mode for the local video track by default.
     * > - The SDK disables mirror mode for the remote video track by default.
     */
    mirror?: boolean;
    /**
     * Sets video display mode:
     * - `"cover"`: The image files the height and width of the box, while maintaining its aspect ratio but often cropping the image in the process. For more information, see the `cover` option of `object-fit` in CSS.
     * - `"contain"`: The size of the image increases or decreases to fill the box while preserving its aspect-ratio. Areas that are not filled due to the disparity in the aspect ratio are filled with black. For more information, see the `contain` option of `object-fit` in CSS.
     * - `"fill"`: The image stretches to fit the box, regardless of its aspect-ratio. For more information, see the `fill` option of `object-fit` in CSS.
     *
     * > Notes:
     * > - When playing the local camera video track, the SDK uses cover mode by default; when playing the local video track of screen sharing, the SDK uses contain mode by default.
     * > - When playing the remote video track, the SDK uses cover mode by default.
     */
    fit?: "cover" | "contain" | "fill";
}

declare class VideoProcessorContext extends EventEmitter implements IProcessorContext {
    private constraintsMap;
    private statsRegistry;
    private usageRegistry;
    private readonly trackId;
    private readonly direction;
    private _chained;
    set chained(chained: boolean);
    get chained(): boolean;
    constructor(trackId: string, direction: "local" | "remote");
    getConstraints(): Promise<MediaTrackConstraints>;
    requestApplyConstraints(constraints: MediaTrackConstraints, processor: IBaseProcessor): Promise<void>;
    requestRevertConstraints(processor: IBaseProcessor): Promise<void>;
    registerStats(processor: IBaseProcessor, type: string, cb: () => any): void;
    unregisterStats(processor: IBaseProcessor, type: string): void;
    gatherStats(): ProcessorStats[];
    registerUsage(processor: IBaseProcessor, cb: () => Usage): void;
    unregisterUsage(processor: IBaseProcessor): void;
    gatherUsage(): Promise<UsageWithDirection[]>;
    getDirection(): "local" | "remote";
}

declare class VideoProcessorDestination extends EventEmitter implements IBaseProcessor {
    name: string;
    ID: string;
    _source?: IBaseProcessor;
    private readonly videoContext;
    constructor(videoContext: VideoProcessorContext);
    private inputTrack?;
    get kind(): Kind;
    get enabled(): boolean;
    pipe(): IBaseProcessor;
    unpipe(): void;
    enable(): void;
    disable(): void;
    updateInput(inputOptions: {
        track?: MediaStreamTrack;
        node?: AudioNode;
        context: IProcessorContext;
    }): void;
    reset(): void;
}

/**
 * @ignore
 */
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

/**
 * @ignore
 */
declare interface VisibleResultInner {
    visible: true;
}

declare class VolumeLevelAnalyser {
    private readonly context;
    private analyserNode;
    private sourceNode?;
    constructor();
    updateSource(sourceNode?: AudioNode): void;
    getVolumeLevel(): number;
    getAnalyserNode(): AnalyserNode;
    rebuildAnalyser(): void;
    destroy(): void;
}

export { }
