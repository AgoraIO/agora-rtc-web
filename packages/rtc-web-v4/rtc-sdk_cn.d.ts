import { IAudioProcessor } from 'agora-rte-extension';
import { IBaseProcessor } from 'agora-rte-extension';
import { IExtension } from 'agora-rte-extension';

declare const AgoraRTC: IAgoraRTC;
export default AgoraRTC;

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
 * AgoraSDK 抛出的错误的 Code
 * @ignore
 */
export declare enum AgoraRTCErrorCode {
    /**
     * 所有用户无法处理的、非预期的错误都使用这个错误码
     */
    UNEXPECTED_ERROR = "UNEXPECTED_ERROR",
    /** 服务端返回了非预期的响应  */
    UNEXPECTED_RESPONSE = "UNEXPECTED_RESPONSE",
    TIMEOUT = "TIMEOUT",
    /** 非法参数 */
    INVALID_PARAMS = "INVALID_PARAMS",
    /** 当前设备不可读 */
    NOT_READABLE = "NOT_READABLE",
    /** 浏览器不支持 */
    NOT_SUPPORTED = "NOT_SUPPORTED",
    /** 非法操作，比如在加入房间之前发布 */
    INVALID_OPERATION = "INVALID_OPERATION",
    /** 操作中止，比如在加入房间的中途离开房间 */
    OPERATION_ABORTED = "OPERATION_ABORTED",
    /** 安全策略限制 */
    WEB_SECURITY_RESTRICT = "WEB_SECURITY_RESTRICT",
    /** P2P信令交互过程中出现异常 */
    EXCHANGE_SDP_FAILED = "EXCHANGE_SDP_FAILED",
    /** P2P添加候选人过程中出现异常 */
    ADD_CANDIDATE_FAILED = "ADD_CANDIDATE_FAILED",
    /** DataChannel交互过程中出现异常 */
    DATACHANNEL_FAILED = "DATACHANNEL_FAILED",
    /**
     * http post 请求相关
     */
    NETWORK_ERROR = "NETWORK_ERROR",
    NETWORK_TIMEOUT = "NETWORK_TIMEOUT",
    NETWORK_RESPONSE_ERROR = "NETWORK_RESPONSE_ERROR",
    /**
     * report 相关
     */
    API_INVOKE_TIMEOUT = "API_INVOKE_TIMEOUT",
    /**
     * Device 模块相关
     */
    /** 枚举本地设备失败 */
    ENUMERATE_DEVICES_FAILED = "ENUMERATE_DEVICES_FAILED",
    /** 找不到指定设备 */
    DEVICE_NOT_FOUND = "DEVICE_NOT_FOUND",
    /**
     * Electron 相关
     */
    /** 无法获取 Electron 对象 */
    ELECTRON_IS_NULL = "ELECTRON_IS_NULL",
    /** 无法通过 Electron 获取屏幕共享源 */
    ELECTRON_DESKTOP_CAPTURER_GET_SOURCES_ERROR = "ELECTRON_DESKTOP_CAPTURER_GET_SOURCES_ERROR",
    /**
     * Stream 相关
     */
    /** init 因为其他的 init 操作而中止 */
    /** chrome 屏幕共享插件没有响应 */
    CHROME_PLUGIN_NO_RESPONSE = "CHROME_PLUGIN_NO_RESPONSE",
    /** chrome 屏幕共享插件没有安装 */
    CHROME_PLUGIN_NOT_INSTALL = "CHROME_PLUGIN_NOT_INSTALL",
    /** 媒体采集的参数不支持 */
    MEDIA_OPTION_INVALID = "MEDIA_OPTION_INVALID",
    /** 获取媒体设备权限被拒绝 */
    PERMISSION_DENIED = "PERMISSION_DENIED",
    /** 浏览器不支持该 constraint */
    CONSTRAINT_NOT_SATISFIED = "CONSTRAINT_NOT_SATISFIED",
    /** 播放时被浏览器自动播放策略阻止 */
    /** 创建小流时检测到大流没有视频轨 */
    /** 屏幕共享不允许使用大小流 */
    /** 轨道被禁用 */
    TRACK_IS_DISABLED = "TRACK_IS_DISABLED",
    /** 获取 video element 可见状态失败*/
    GET_VIDEO_ELEMENT_VISIBLE_ERROR = "GET_VIDEO_ELEMENT_VISIBLE_ERROR",
    /** 屏幕共享音频时用户没有点击 **分享音频** */
    SHARE_AUDIO_NOT_ALLOWED = "SHARE_AUDIO_NOT_ALLOWED",
    /** 使用RTCRtpEncodingParameters 进行小流编码失败*/
    LOW_STREAM_ENCODING_ERROR = "LOW_STREAM_ENCODING_ERROR",
    /** 设置 rtp encoding parameters 失败 */
    SET_ENCODING_PARAMETER_ERROR = "SET_ENCODING_PARAMETER_ERROR",
    /** Track 状态不可达 */
    TRACK_STATE_UNREACHABLE = "TRACK_STATE_UNREACHABLE",
    /**
     * Client join 相关
     */
    /** 用户提供的 Token 生成函数运行时出现错误 */
    /** 通过 string uid allocate 服务返回了非法的 int uid */
    INVALID_UINT_UID_FROM_STRING_UID = "INVALID_UINT_UID_FROM_STRING_UID",
    /** 尝试了数次均无法获取云代理服务 */
    CAN_NOT_GET_PROXY_SERVER = "CAN_NOT_GET_PROXY_SERVER",
    /** 尝试了数次均无法获取 gateway 地址 */
    CAN_NOT_GET_GATEWAY_SERVER = "CAN_NOT_GET_GATEWAY_SERVER",
    /** 从 AP 拿到的网关列表为空 (obsolete after 4.7.0)*/
    VOID_GATEWAY_ADDRESS = "VOID_GATEWAY_ADDRESS",
    /** UID 冲突，重复的 UID */
    UID_CONFLICT = "UID_CONFLICT",
    /** multi unilbs 服务，响应解析错误 */
    MULTI_UNILBS_RESPONSE_ERROR = "MULTI_UNILBS_RESPONSE_ERROR",
    /** 更新 Ticket 请求失败 */
    UPDATE_TICKET_FAILED = "UPDATE_TICKET_FAILED",
    /**
     * Client publish/unpublish 相关
     */
    /** 传入了非法的 local track */
    INVALID_LOCAL_TRACK = "INVALID_LOCAL_TRACK",
    /** 传入了非法的 track */
    INVALID_TRACK = "INVALID_TRACK",
    /** replaceTrack 等操作时找不到指定的 sender */
    SENDER_NOT_FOUND = "SENDER_NOT_FOUND",
    /** p2p 建立相关 */
    CREATE_OFFER_FAILED = "CREATE_OFFER_FAILED",
    SET_ANSWER_FAILED = "SET_ANSWER_FAILED",
    ICE_FAILED = "ICE_FAILED",
    PC_CLOSED = "PC_CLOSED",
    SENDER_REPLACE_FAILED = "SENDER_REPLACE_FAILED",
    /** 获取本地RTP能力失败 */
    GET_LOCAL_CAPABILITIES_FAILED = "GET_LOCAL_CAPABILITIES_FAILED",
    GET_LOCAL_CONNECTION_PARAMS_FAILED = "GET_LOCAL_CONNECTION_PARAMS_FAILED",
    SUBSCRIBE_FAILED = "SUBSCRIBE_FAILED",
    UNSUBSCRIBE_FAILED = "UNSUBSCRIBE_FAILED",
    /** 网关抛出的 P2P 断开 */
    GATEWAY_P2P_LOST = "GATEWAY_P2P_LOST",
    NO_ICE_CANDIDATE = "NO_ICE_CANDIDATE",
    /** 不允许发布多个视频轨道 */
    CAN_NOT_PUBLISH_MULTIPLE_VIDEO_TRACKS = "CAN_NOT_PUBLISH_MULTIPLE_VIDEO_TRACKS",
    EXIST_DISABLED_VIDEO_TRACK = "EXIST_DISABLED_VIDEO_TRACK",
    /**
     * Client subscribe/unsubscribe 相关
     */
    /** 找不到指定的订阅用户 */
    INVALID_REMOTE_USER = "INVALID_REMOTE_USER",
    /** 远端用户没有发布 */
    REMOTE_USER_IS_NOT_PUBLISHED = "REMOTE_USER_IS_NOT_PUBLISHED",
    /** 相同流的上一个订阅还没有完成 */
    /**
     * Client 其他
     */
    /** 自定义事件上报失败，通常是因为网络原因 */
    CUSTOM_REPORT_SEND_FAILED = "CUSTOM_REPORT_SEND_FAILED",
    /** 自定义上报太频繁 */
    CUSTOM_REPORT_FREQUENCY_TOO_HIGH = "CUSTOM_REPORT_FREQUENCY_TOO_HIGH",
    /**
     * Stream 混音相关
     */
    /** 下载在线音频文件失败 */
    FETCH_AUDIO_FILE_FAILED = "FETCH_AUDIO_FILE_FAILED",
    /** 读取本地 音频文件失败*/
    READ_LOCAL_AUDIO_FILE_ERROR = "READ_LOCAL_AUDIO_FILE_ERROR",
    /** 解码音频文件失败 */
    DECODE_AUDIO_FILE_FAILED = "DECODE_AUDIO_FILE_FAILED",
    /** 音效的 `soundID` 发生冲突 */
    /** 找不到指定的音效 ID */
    /**
     * Gateway 操作相关
     */
    /** 请求网关时 WS 断开 */
    WS_ABORT = "WS_ABORT",
    /** 请求网关前网关就已经断开 */
    WS_DISCONNECT = "WS_DISCONNECT",
    WS_ERR = "WS_ERR",
    /**
     * Live Streaming 相关
     */
    /** 无法和推流后台建立连接 */
    /** 推流任务已经存在 */
    LIVE_STREAMING_TASK_CONFLICT = "LIVE_STREAMING_TASK_CONFLICT",
    /** 推流/拉流参数错误 */
    LIVE_STREAMING_INVALID_ARGUMENT = "LIVE_STREAMING_INVALID_ARGUMENT",
    /** 推流/拉流服务内部错误 */
    LIVE_STREAMING_INTERNAL_SERVER_ERROR = "LIVE_STREAMING_INTERNAL_SERVER_ERROR",
    /** 推流 URL 被占用 */
    LIVE_STREAMING_PUBLISH_STREAM_NOT_AUTHORIZED = "LIVE_STREAMING_PUBLISH_STREAM_NOT_AUTHORIZED",
    /** 在非转码推流中调用了转码参数 */
    LIVE_STREAMING_TRANSCODING_NOT_SUPPORTED = "LIVE_STREAMING_TRANSCODING_NOT_SUPPORTED",
    /** 推流的目标 CDN 出现错误导致推流失败 */
    LIVE_STREAMING_CDN_ERROR = "LIVE_STREAMING_CDN_ERROR",
    /** 推流超时，请确认目标流是否存在 */
    LIVE_STREAMING_INVALID_RAW_STREAM = "LIVE_STREAMING_INVALID_RAW_STREAM",
    /** 推流超过 10 路流 */
    LIVE_STREAMING_WARN_STREAM_NUM_REACH_LIMIT = "LIVE_STREAMING_WARN_STREAM_NUM_REACH_LIMIT",
    /** 推流中的背景图片或者水印地址无法拉取(不影响推流流程) */
    LIVE_STREAMING_WARN_FAILED_LOAD_IMAGE = "LIVE_STREAMING_WARN_FAILED_LOAD_IMAGE",
    /** 推流请求太频繁（不影响推流流程） */
    LIVE_STREAMING_WARN_FREQUENT_REQUEST = "LIVE_STREAMING_WARN_FREQUENT_REQUEST",
    /**
     * WebGL/美颜相关
     */
    /** WebGL 内部错误 */
    WEBGL_INTERNAL_ERROR = "WEBGL_INTERNAL_ERROR",
    /** 美颜内部错误 */
    BEAUTY_PROCESSOR_INTERNAL_ERROR = "BEAUTY_PROCESSOR_INTERNAL_ERROR",
    /**
     * Cross Channel 相关
     */
    /** 等待 status 回调出错 */
    CROSS_CHANNEL_WAIT_STATUS_ERROR = "CROSS_CHANNEL_WAIT_STATUS_ERROR",
    /** 服务器加入源频道失败 */
    CROSS_CHANNEL_FAILED_JOIN_SRC = "CROSS_CHANNEL_FAILED_JOIN_SEC",
    /** 服务器加入目标频道失败 */
    CROSS_CHANNEL_FAILED_JOIN_DEST = "CROSS_CHANNEL_FAILED_JOIN_DEST",
    /** 源频道发送数据失败 */
    CROSS_CHANNEL_FAILED_PACKET_SENT_TO_DEST = "CROSS_CHANNEL_FAILED_PACKET_SENT_TO_DEST",
    /** 服务器回应出错 */
    CROSS_CHANNEL_SERVER_ERROR_RESPONSE = "CROSS_CHANNEL_SERVER_ERROR_RESPONSE",
    /**
     * AVC SEI 相关
     */
    /** 需要编码的 SEI 数据超过了最大大小 */
    METADATA_OUT_OF_RANGE = "METADATA_OUT_OF_RANGE",
    LOCAL_AEC_ERROR = "LOCAL_AEC_ERROR",
    /** 插件不合法 */
    INVALID_PLUGIN = "INVALID_PLUGIN",
    /** 抛出断开P2P的错误来让未执行完成的P2P操作结束*/
    DISCONNECT_P2P = "DISCONNECT_P2P",
    /** websocket 初始化超时，用于 fallback */
    INIT_WEBSOCKET_TIMEOUT = "INIT_WEBSOCKET_TIMEOUT",
    /** imageData转换为Blob时失败 */
    CONVERTING_IMAGEDATA_TO_BLOB_FAILED = "CONVERTING_IMAGEDATA_TO_BLOB_FAILED",
    CONVERTING_VIDEO_FRAME_TO_BLOB_FAILED = "CONVERTING_VIDEO_FRAME_TO_BLOB_FAILED",
    /** datachannel相关 */
    INIT_DATACHANNEL_TIMEOUT = "INIT_DATACHANNEL_TIMEOUT",
    DATACHANNEL_CONNECTION_TIMEOUT = "DATACHANNEL_CONNECTION_TIMEOUT",
    PROHIBITED_OPERATION = "PROHIBITED_OPERATION",
    /** 鉴黄上传失败 */
    IMAGE_MODERATION_UPLOAD_FAILED = "IMAGE_MODERATION_UPLOAD_FAILED"
}

/**
 * 当前通话的统计信息，可以通过 [AgoraRTCClient.getRTCStats]{@link IAgoraRTCClient.getRTCStats} 获取。
 * @public
 */
export declare interface AgoraRTCStats {
    /**
     * 在当前频道内的时长，单位为秒。
     */
    Duration: number;
    /**
     * 音视频总接收码率，单位为 bps，瞬间值。
     */
    RecvBitrate: number;
    /**
     * 接收字节数，累计值。
     */
    RecvBytes: number;
    /**
     * 音视频总发送码率，单位为 bps，瞬间值。
     */
    SendBitrate: number;
    /**
     * 发送字节数，累计值。
     */
    SendBytes: number;
    /**
     * 通信场景下，该值为当前频道内的用户人数。
     *
     * 直播场景下，如果本地用户为主播，该值为当前频道内的主播人数；如果本地用户为观众，该值为当前频道内的主播人数 + 1。
     */
    UserCount: number;
    /**
     * SDK 到声网边缘服务器的 RTT (Round-Trip Time)，单位 ms。
     */
    RTT: number;
    /**
     * 上行可用带宽估计，单位为 Kbps。
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
 * 服务器的访问区域。用于设置 [AgoraRTC.setArea]{@link IAgoraRTC.setArea}。
 * @public
 */
export declare enum AREAS {
    /**
     * 中国。
     */
    CHINA = "CHINA",
    /**
     * 亚洲区域（中国大陆除外）。
     */
    ASIA = "ASIA",
    /**
     * 北美区域。
     */
    NORTH_AMERICA = "NORTH_AMERICA",
    /**
     * 欧洲区域。
     */
    EUROPE = "EUROPE",
    /**
     * 日本。
     */
    JAPAN = "JAPAN",
    /**
     * 印度。
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
     * 全球。
     */
    GLOBAL = "GLOBAL",
    /**
     * @ignore
     */
    EXTENSIONS = "EXTENSIONS"
}

/**
 * 观众延时级别。仅在用户角色为 `"audience"` 时生效。
 * - `1`: 低延时。
 * - `2`: （默认）超低延时。
 * @public
 */
export declare enum AudienceLatencyLevelType {
    /**
     * 低延时。
     */
    AUDIENCE_LEVEL_LOW_LATENCY = 1,
    /**
     * 超低延时。
     */
    AUDIENCE_LEVEL_ULTRA_LOW_LATENCY = 2,
    /**
     * @ignore
     */
    AUDIENCE_LEVEL_SYNC_LATENCY = 3
}

declare const AUDIO_ENCODER_CONFIG_SETTINGS: {
    speech_low_quality: AudioEncoderConfiguration;
    speech_standard: AudioEncoderConfiguration;
    music_standard: AudioEncoderConfiguration;
    standard_stereo: AudioEncoderConfiguration;
    high_quality: AudioEncoderConfiguration;
    high_quality_stereo: AudioEncoderConfiguration;
};

/**
 * 定义音频编码配置的对象。
 *
 * 用于创建音频流时指定自定义的编码配置。
 *
 * 你可以在 [AgoraRTC.createCustomAudioTrack]{@link IAgoraRTC.createCustomAudioTrack}、
 * [AgoraRTC.createMicrophoneAudioTrack]{@link IAgoraRTC.createMicrophoneAudioTrack} 或
 * [AgoraRTC.createBufferSourceAudioTrack]{@link IAgoraRTC.createBufferSourceAudioTrack} 方法中传入该配置对象来自定义本地音频的编码配置。
 */
export declare interface AudioEncoderConfiguration {
    /**
     * 音频采样率，单位为 Hz。
     */
    sampleRate?: number;
    /**
     * 音频采样大小。
     */
    sampleSize?: number;
    /**
     * 是否开启立体声。
     */
    stereo?: boolean;
    /**
     * 音频码率，单位为 Kbps。
     */
    bitrate?: number;
}

/**
 * SDK 预设的 [AudioEncoderConfiguration]{@link AudioEncoderConfiguration} 配置。
 *
 * 你可以在以下方法中传入预设值来控制本地音频的编码配置：
 * - [AgoraRTC.createCustomAudioTrack]{@link IAgoraRTC.createCustomAudioTrack}
 * - [AgoraRTC.createMicrophoneAudioTrack]{@link IAgoraRTC.createMicrophoneAudioTrack}
 * - [AgoraRTC.createBufferSourceAudioTrack]{@link IAgoraRTC.createBufferSourceAudioTrack}
 *
 * 下表列出了 SDK 所有内置的音频属性配置，SDK 默认使用 `"music_standard"`。
 *
 * | 音频属性 | 配置 |
 * | -------- | --------------- |
 * |`"speech_low_quality"`|16 kHz 采样率，单声道，编码码率约 24 Kbps|
 * |`"speech_standard"`|32 kHz 采样率，单声道，编码码率约 24 Kbps|
 * |`"music_standard"`|48 kHz 采样率，单声道，编码码率约 40 Kbps|
 * |`"standard_stereo"`|48 kHz 采样率，双声道，编码码率约 64 Kbps|
 * |`"high_quality"`|48 kHz 采样率，单声道， 编码码率约 128 Kbps|
 * |`"high_quality_stereo"`|48 kHz 采样率，双声道，编码码率约 192 Kbps|
 * @public
 */
export declare type AudioEncoderConfigurationPreset = keyof typeof AUDIO_ENCODER_CONFIG_SETTINGS;

/**
 * 音频数据源处理的设置。用于 [startProcessAudioBuffer]{@link IBufferSourceAudioTrack.startProcessAudioBuffer}。
 */
export declare interface AudioSourceOptions {
    /**
     * 设置循环播放的次数。
     */
    cycle?: number;
    /**
     * 设置是否无限循环。
     */
    loop?: boolean;
    /**
     * 设置开始播放的时间。
     */
    startPlayTime?: number;
}

/**
 * 音频源数据处理状态，通过 [BufferSourceAudioTrack.on("source-state-change")]{@link IBufferSourceAudioTrack.event_source_state_change} 获取。
 *
 * - `"stopped"`: 音频源数据处理停止。可能是因为数据处理完毕，也可能是手动触发了停止。
 * - `"playing"`: 音频源数据正在处理。
 * - `"paused"`: 音频源数据暂停处理。
 * @public
 */
export declare type AudioSourceState = "stopped" | "playing" | "paused";

/**
 * @ignore
 *
 * 美颜选项，用于 [setBeautyEffect]{@link ILocalVideoTrack.setBeautyEffect}。
 * @public
 */
export declare interface BeautyEffectOptions {
    /**
     * 平滑度。
     *
     * 取值范围为 [0.0, 1.0]，其中 0.0 表示原始平滑等级，默认值为 0.5。可用来实现祛痘、磨皮等视觉效果。
     */
    smoothnessLevel?: number;
    /**
     * 亮度。
     *
     * 取值范围为 [0.0, 1.0]，其中 0.0 表示原始亮度，默认值为 0.7。可用来实现美白等视觉效果。
     */
    lighteningLevel?: number;
    /**
     * 红色度。
     *
     * 取值范围为 [0.0, 1.0]，其中 0.0 表示原始红色度，默认值为 0.1。可用来实现红润肤色等视觉效果。
     */
    rednessLevel?: number;
    /**
     * 亮度明暗对比度，与 {@link lighteningLevel} 参数搭配使用。可设为：
     * - 0: 明暗对比弱。
     * - 1: (默认) 原始明暗对比度。
     * - 2: 明暗对比强。
     */
    lighteningContrastLevel?: 0 | 1 | 2;
}

/**
 * 通过本地音频文件/在线音频文件/`AudioBuffer`方式创建音频流时的配置参数，用于 [AgoraRTC.createBufferSourceAudioTrack]{@link IAgoraRTC.createBufferSourceAudioTrack}。
 */
export declare interface BufferSourceAudioTrackInitConfig {
    /**
     * 音频数据源，支持 3 种类型：
     * - `File`: 浏览器标准的 [File](https://developer.mozilla.org/en-US/docs/Web/API/File) 对象，表示一个本地文件。
     * - `string`: 表示从线上 HTTPS 地址获取在线音频文件(请确保音频在线地址支持 HTTPS 和 CORS)。
     * - `AudioBuffer`: 浏览器标准的 [AudioBuffer](https://developer.mozilla.org/en-US/docs/Web/API/AudioBuffer) 对象表示 PCM 原始数据。
     */
    source: File | string | AudioBuffer;
    /**
     * 是否缓存线上文件:
     * - `true`: 缓存线上文件。
     * - `false`: （默认）不缓存线上文件。
     */
    cacheOnlineFile?: boolean;
    /**
     * 控制音频的编码配置。
     *
     * 你可以通过 [[AudioEncoderConfigurationPreset]] 传入 SDK 内置的编码配置；也可以通过传入一个 [[AudioEncoderConfiguration]] 来自定义音频编码配置。
     *
     * > Firefox 不支持设置音频编码码率。
     */
    encoderConfig?: AudioEncoderConfiguration | AudioEncoderConfigurationPreset;
}

/**
 * 创建摄像头视频流时的配置对象，用于 [AgoraRTC.createCameraVideoTrack]{@link IAgoraRTC.createCameraVideoTrack}。
 */
export declare interface CameraVideoTrackInitConfig {
    /**
     * 控制视频的编码配置。
     *
     * 你可以通过 [[VideoEncoderConfigurationPreset]] 传入 SDK 内置的编码配置；也可以通过传入一个 [[VideoEncoderConfiguration]] 来自定义视频编码配置。
     */
    encoderConfig?: VideoEncoderConfiguration | VideoEncoderConfigurationPreset;
    /**
     * 指定使用前置/后置摄像头来采集视频。
     *
     * 在移动设备上，可以设置该参数选择使用前置或后置摄像头：
     * - `"user"`: 前置摄像头
     * - `"environment"`: 后置摄像头
     */
    facingMode?: VideoFacingModeEnum;
    /**
     * 指定摄像头的设备 ID。
     *
     * 你可以通过 [AgoraRTC.getCameras]{@link IAgoraRTC.getCameras} 来获取当前的摄像头设备列表。
     */
    cameraId?: string;
    /**
     * **自从**
     * <br>&emsp;&emsp;&emsp;*4.0.0*
     *
     * 传输优化模式。设置该值后，SDK 会自动调整码率配置以及使用不同的回退策略。
     * - `"detail"`: 清晰优先。
     *   - SDK 会自动根据你的采集分辨率和帧率设定一个最小码率。即使遭遇网络波动，发送码率也不会低于这个值，从而确保清晰的视频画面。
     *   - 大部分情况下，SDK 不会降低发送分辨率，但是可能会降低帧率。
     * - `"motion"`: 流畅优先。
     *   - SDK 不会启用最小码率策略。遭遇网络波动时，发送端会降低码率来确保接收端的视频画面不会出现中断和卡顿。
     *   - 大部分情况下，SDK 不会降低帧率，但是可能会降低发送分辨率。
     * - 留空: 默认优化策略，兼顾清晰和流畅，也就是说弱网条件下，帧率和分辨率都会被调整。
     *
     * > 注意事项：该方法只支持 Chrome 浏览器。
     */
    optimizationMode?: "motion" | "detail";
    /**
     * @ignore
     * **自从**
     * <br>&emsp;&emsp;&emsp;*4.18.0*
     *
     * SVC （可伸缩视频编码）配置。
     *
     * 你可以通过 {@link SVCConfigurationPreset} 传入 SDK 预设的 SVC 编码配置，也可以通过 {@link SVCConfiguration} 传入自定义的 SVC 编码配置。
     */
    scalabiltyMode?: SVCConfiguration | SVCConfigurationPreset;
}

/**
 * 跨频道媒体流转发中出现的错误码，可以通过 [AgoraRTCClient.on("channel-media-relay-state")]{@link IAgoraRTCClient.event_channel_media_relay_state} 事件获取。
 * @public
 */
export declare enum ChannelMediaRelayError {
    /**
     * 一切正常。
     */
    RELAY_OK = "RELAY_OK",
    /**
     * 和跨频道媒体流转发服务断开连接。
     */
    SERVER_CONNECTION_LOST = "SERVER_CONNECTION_LOST",
    /**
     * 源频道的 Token 已经过期。
     */
    SRC_TOKEN_EXPIRED = "SRC_TOKEN_EXPIRED",
    /**
     * 目标频道的 Token 已经过期。
     */
    DEST_TOKEN_EXPIRED = "DEST_TOKEN_EXPIRED"
}

/**
 * 跨频道媒体流转发过程中的事件列表，可以通过 [AgoraRTCClient.on("channel-media-relay-event")]{@link IAgoraRTCClient.event_channel_media_relay_event} 获取。
 * @public
 */
export declare enum ChannelMediaRelayEvent {
    /**
     * 网络中断导致用户与服务器连接断开。
     */
    NETWORK_DISCONNECTED = "NETWORK_DISCONNECTED",
    /**
     * 用户与服务器建立连接。
     */
    NETWORK_CONNECTED = "NETWORK_CONNECTED",
    /**
     * 用户已加入源频道。
     */
    PACKET_JOINED_SRC_CHANNEL = "PACKET_JOINED_SRC_CHANNEL",
    /**
     * 用户已加入目标频道。
     */
    PACKET_JOINED_DEST_CHANNEL = "PACKET_JOINED_DEST_CHANNEL",
    /**
     * SDK 开始向目标频道发送数据包。
     */
    PACKET_SENT_TO_DEST_CHANNEL = "PACKET_SENT_TO_DEST_CHANNEL",
    /**
     * 服务器收到了目标频道发送的视频流。
     */
    PACKET_RECEIVED_VIDEO_FROM_SRC = "PACKET_RECEIVED_VIDEO_FROM_SRC",
    /**
     * 服务器收到了目标频道发送的音频流。
     */
    PACKET_RECEIVED_AUDIO_FROM_SRC = "PACKET_RECEIVED_AUDIO_FROM_SRC",
    /**
     * 目标频道已更新。
     */
    PACKET_UPDATE_DEST_CHANNEL = "PACKET_UPDATE_DEST_CHANNEL",
    /**
     * 内部原因导致目标频道更新失败。
     */
    PACKET_UPDATE_DEST_CHANNEL_REFUSED = "PACKET_UPDATE_DEST_CHANNEL_REFUSED",
    /**
     * 目标频道未更新。
     */
    PACKET_UPDATE_DEST_CHANNEL_NOT_CHANGE = "PACKET_UPDATE_DEST_CHANNEL_NOT_CHANGE"
}

/**
 * 跨频道转发的频道信息，用于 [ChannelMediaRelayConfiguration]{@link IChannelMediaRelayConfiguration}。
 * @public
 */
export declare interface ChannelMediaRelayInfo {
    /**
     * 频道名。
     */
    channelName: string;
    /**
     * 用设置的频道名和 `uid` 生成的用于加入频道的 token。如果未启用 token 鉴权则无需设置。
     * 用于鉴权的 Token。如果未启用 Token 鉴权则无需设置。
     *
     * - 设置源频道信息时，用 0 和源频道名生成 Token。
     * - 设置目标频道信息时，用 `uid` 和目标频道名生成 Token。
     */
    token?: string;
    /**
     * 用于标识转发媒体流的 UID。
     *
     * 32 位无符号整数，设置范围：0 到 (2<sup>32</sup>-1)，设为 0 服务器会自动分配一个 UID。
     *
     * 当用于源频道时，用于标识源频道中的转发媒体流的 UID。
     * - 设置源频道信息时，`uid` 为源频道里需要转发的主播的 ID。
     * - 设置目标频道信息时，`uid` 用于标识目标频道中被转发的媒体流。可为 0，服务器会自动分配一个 UID；也可自行设置一个 32 位无符号整数，设置范围为 0 到 (2<sup>32</sup>-1)。需确保与目标频道中的其他用户 ID 不同，防止造成互踢。
     *
     * 当用于目标频道时，用于标识目标频道中的转发媒体流的 UID，需确保与目标频道中的其他用户 ID 不同，防止造成互踢。
     */
    uid: number;
}

/**
 * 跨直播媒体流转发服务的状态码，可以通过 [AgoraRTCClient.on("channel-media-relay-state")]{@link IAgoraRTCClient.event_channel_media_relay_state} 事件获取。
 * @public
 */
export declare enum ChannelMediaRelayState {
    /**
     * SDK 已经初始化，但是还没有开启跨频道媒体流转发服务。
     */
    RELAY_STATE_IDLE = "RELAY_STATE_IDLE",
    /**
     * SDK 正在连接到跨频道媒体流转发服务。
     */
    RELAY_STATE_CONNECTING = "RELAY_STATE_CONNECTING",
    /**
     * 跨频道媒体流转发成功。
     */
    RELAY_STATE_RUNNING = "RELAY_STATE_RUNNING",
    /**
     * 跨频道媒体流转发出现错误，错误代码可以参考 {@link ChannelMediaRelayError}。
     */
    RELAY_STATE_FAILURE = "RELAY_STATE_FAILURE"
}

/**
 * `<video>` 标签的可见状态信息。
 *
 * 可通过以下方法或事件获取：
 * - [localVideoTrack.on("video-element-visible-status")]{@link ILocalVideoTrack.event_video_element_visible_status}
 * - [localVideoTrack.getVideoElementVisibleStatus]{@link ILocalVideoTrack.getVideoElementVisibleStatus}
 * - [remoteVideoTrack.on("video-element-visible-status")]{@link IRemoteVideoTrack.event_video_element_visible_status}
 * - [remoteVideoTrack.getVideoElementVisibleStatus]{@link IRemoteVideoTrack.getVideoElementVisibleStatus}
 *
 * 包含以下字段：
 * - `visible`: Boolean 型，`<video>` 标签是否可见。
 * - `reason`: 仅当 `visible` 为 `false` 时有效，不可见原因：
 *   - `"SIZE"`: `<video>` 尺寸太小，导致 `<video>` 完全不可见或很难看到。
 *   - `"STYLE"`: `<video>` 或其祖先元素的 CSS 样式导致 `<video>` 不可见、颜色暗淡或模糊不清。
 *   - `"POSITION"`: `<video>` 或其祖先元素被定位到视口区域外，导致 `<video>` 只有小面积区域在视口内或全部不在视口内。
 *   - `"COVERED"`: `<video>` 被其他元素遮挡。
 */
declare type CheckVideoVisibleResult = CheckVisibleResult;

/**
 * @ignore
 */
declare type CheckVisibleResult = VisibleResultInner | VisibleHiddenResult;

/**
 * 用于控制客户端行为的接口。
 *
 * 在调用 {@link createClient} 创建客户端对象时，你需要配置该接口。
 *
 * > [mode]{@link ClientConfig.mode} 和 [codec]{@link ClientConfig.codec} 属性必须设置。
 * @public
 */
export declare interface ClientConfig {
    /**
     * 浏览器使用的编码格式，有以下选择：
     * - `"vp8"`: 浏览器使用 VP8 编码。
     * - `"h264"`: 浏览器使用 H.264 编码。
     * - `"h265"`: 浏览器使用 H.265 编码。
     * - `"vp9"`: (Beta) 浏览器使用 VP9 编码。
     *
     * > Safari 12.1 及之前版本不支持 VP8 编码。
     */
    codec: SDK_CODEC;
    /**
     * @ignore
     */
    audioCodec?: SDK_AUDIO_CODEC;
    /**
     * 频道场景。
     *
     * Agora Web SDK 需知道 app 的使用场景（例如通信场景或直播场景），从而使用不同的优化手段。
     *
     * 声网频道支持以下场景:
     * - `"live"`: 直播场景，有主播和观众两种用户角色，可以通过 [setClientRole]{@link IAgoraRTCClient.setClientRole} 方法设置用户角色为主播或观众。主播可以发布和订阅音视频轨道，而观众只能订阅音视频轨道，无法发布。
     * - `"rtc"`: 通信场景，用于常见的一对一通话或群聊，频道中的任何用户可以自由说话。
     */
    mode: SDK_MODE;
    /**
     * 直播场景中（[mode]{@link ClientConfig.mode} 为 `"live"` 时）的用户角色。
     *
     * 用户角色确定用户在 SDK 层的权限，包含是否可以发布和订阅音视频轨道、是否可以推流到 CDN。用户角色有 `"host"`（主播）和 `"audience"`（观众）。主播既可发布轨道，也可订阅轨道；观众不能进行 {@link publish} 操作。直播场景中的用户角色默认为观众。如需发布音视频，必须将角色角色为主播。
     *
     * 在创建客户端之后，你可以随时调用 {@link setClientRole} 来改变用户角色。
     */
    role?: ClientRole;
    /**
     * 用户角色的具体设置，包含用户级别。
     *
     * 用户级别确定用户在其角色权限范围内可以操作和享受到的服务级别。例如对于观众，选择接收低延时还是超低延时的视频流。不同的级别会影响计费。
     */
    clientRoleOptions?: ClientRoleOptions;
    /**
     * @ignore
     * HTTP 代理服务器域名。
     *
     * Agora Web SDK 还提供 [startProxyServer]{@link IAgoraRTCClient.startProxyServer} 方法支持云代理服务，详见使用云代理。
     */
    proxyServer?: string;
    /**
     * @ignore
     * TURN 服务器设置。
     *
     * Agora Web SDK 还提供 [startProxyServer]{@link IAgoraRTCClient.startProxyServer} 方法支持云代理服务，详见使用云代理。
     */
    turnServer?: TurnServerConfig;
    /**
     * @ignore
     * SDK 内 HTTP/HTTPS 请求的重试策略。
     *
     * 关于重试策略的详细信息请参考 [RetryConfiguration]{@link RetryConfiguration}。
     */
    httpRetryConfig?: RetryConfiguration;
    /**
     * @ignore
     * SDK 内 WebSocket 连接的重试策略。
     *
     * 关于重试策略的详细信息请参考 [RetryConfiguration]{@link RetryConfiguration}。
     */
    websocketRetryConfig?: RetryConfiguration;
}

/**
 * 用户角色。
 * - `"host"`: 直播场景中的主播，可以发布和订阅音视频轨道。
 * - `"audience"`: 直播场景中的观众，只能订阅，不能发布音视频轨道。
 * @public
 */
export declare type ClientRole = "audience" | "host";

/**
 * 用户角色具体设置，包含用户级别。
 *
 * 用于 {@link ClientConfig.clientRoleOptions} 或 [AgoraRTCClient.setClientRole]{@link IAgoraRTCClient.setClientRole} 方法。
 * @public
 */
export declare interface ClientRoleOptions {
    /**
     * 直播场景中的观众延时级别。
     *
     * > 注意事项：
     * > - 仅在用户角色设为 `"audience"` 时生效。
     * > - 不同的级别会影响计费。
     */
    level: AudienceLatencyLevelType;
    /**
     * @ignore
     * 设置角色实际延迟, 范围0-3000ms
     */
    delay?: number;
}

/**
 * 连接断开的原因。
 */
export declare enum ConnectionDisconnectedReason {
    /** 用户正常退出。 */
    LEAVE = "LEAVE",
    /** 网络异常，经过重试后不可恢复。 */
    NETWORK_ERROR = "NETWORK_ERROR",
    /** 服务端返回出现异常，通常是因为集成过程中参数有误。 */
    SERVER_ERROR = "SERVER_ERROR",
    /** 当前用户被踢出。 */
    UID_BANNED = "UID_BANNED",
    /** 当前 IP 被踢出。 */
    IP_BANNED = "IP_BANNED",
    /** 当前频道被禁用。 */
    CHANNEL_BANNED = "CHANNEL_BANNED",
    /**
     * @ignore
     */
    FALLBACK = "FALLBACK",
    /**
     * @ignore
     * license字段无上报
     */
    LICENSE_MISSING = "LICENSE_MISSING",
    /**
     * @ignore
     * license过期仍然登录
     */
    LICENSE_EXPIRED = "LICENSE_EXPIRED",
    /**
     * @ignore
     * license使用分钟数超过限制
     */
    LICENSE_MINUTES_EXCEEDED = "LICENSE_MINUTES_EXCEEDED",
    /**
     * @ignore
     * license使用时间段不合法
     */
    LICENSE_PERIOD_INVALID = "LICENSE_PERIOD_INVALID",
    /**
     * @ignore
     * 同一时间相同license存在不同设备
     */
    LICENSE_MULTIPLE_SDK_SERVICE = "LICENSE_MULTIPLE_SDK_SERVICE",
    /**
     * @ignore
     * license不合法
     */
    LICENSE_ILLEGAL = "LICENSE_ILLEGAL",
    /**
     * 当前用户的 Token 已过期。
     */
    TOKEN_EXPIRE = "TOKEN_EXPIRE"
}

/**
 * SDK 和声网服务器的连接状态，可以通过 [connectionState]{@link IAgoraRTCClient.connectionState} 获取。
 *
 * SDK 和服务器有以下 5 种连接状态:
 * - `"DISCONNECTED"`: 连接断开。该状态表示用户处于以下任一阶段：
 *   - 尚未通过 [join]{@link IAgoraRTCClient.join} 加入频道。
 *   - 已经通过 [leave]{@link IAgoraRTCClient.leave} 离开频道。
 *   - 被踢出频道或者连接失败等异常情况。
 * - `"CONNECTING"`: 正在连接中。当调用 [join]{@link IAgoraRTCClient.join} 时为此状态。
 * - `"CONNECTED"`: 已连接。该状态表示用户已经加入频道，可以在频道内发布或订阅媒体流。
 * - `"RECONNECTING"`: 正在重连中。因网络断开或切换而导致 SDK 与服务器的连接中断，SDK 会自动重连，此时连接状态变为 `"RECONNECTING"`。
 * - `"DISCONNECTING"`: 正在断开连接。在调用 [leave]{@link IAgoraRTCClient.leave} 的时候为此状态。
 * @public
 */
export declare type ConnectionState = "DISCONNECTED" | "CONNECTING" | "RECONNECTING" | "CONNECTED" | "DISCONNECTING";

/**
 * 约束对象，一般用于在 [[VideoEncoderConfiguration]] 中指定采集分辨率/帧率的范围。
 */
export declare interface ConstrainLong {
    /**
     * 采集设备最终输出的值下限。
     */
    min?: number;
    /**
     * 采集设备最终输出的值上限。
     */
    max?: number;
    /**
     * 期望采集设备最终输出的值，如果设备不支持指定的值，会尽量输出一个最靠近的值。
     */
    ideal?: number;
    /**
     * 严格指定采集设备最终输出的值，如果设备不支持指定的值，采集会失败。
     */
    exact?: number;
}

/**
 * 创建自定义音频轨道时的配置参数，用于 [AgoraRTC.createCustomAudioTrack]{@link IAgoraRTC.createCustomAudioTrack}。
 */
export declare interface CustomAudioTrackInitConfig {
    /**
     * 你自己维护的 [MediaStreamTrack](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack) 对象。
     */
    mediaStreamTrack: MediaStreamTrack;
    /**
     * 控制音频的编码配置。
     *
     * 你可以通过 [[AudioEncoderConfigurationPreset]] 传入 SDK 内置的编码配置；也可以通过传入一个 [[AudioEncoderConfiguration]] 来自定义音频编码配置。
     *
     * > Firefox 不支持设置音频编码码率。
     */
    encoderConfig?: AudioEncoderConfiguration | AudioEncoderConfigurationPreset;
}

/**
 * 创建自定义视频轨道时的配置参数，用于 [AgoraRTC.createCustomVideoTrack]{@link IAgoraRTC.createCustomVideoTrack}。
 */
export declare interface CustomVideoTrackInitConfig {
    /**
     * 这里填写您自己维护的 [MediaStreamTrack](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack) 对象
     */
    mediaStreamTrack: MediaStreamTrack;
    /**
     * **自从**
     * <br>&emsp;&emsp;&emsp;*4.17.1*
     *
     * 视频的分辨率宽。
     *
     * 支持传入 `number`，或一个约束对象，如 `{ max: 1280, min: 720 }`。
     *
     * 关于约束对象的详细说明可以参考 [ConstrainLong]{@link ConstrainLong}。
     */
    width?: number | ConstrainLong;
    /**
     * **自从**
     * <br>&emsp;&emsp;&emsp;*4.17.1*
     *
     * 视频的分辨率高。
     *
     * 支持传入 `number`，或一个约束对象，如 `{ max: 1280, min: 720 }`。
     *
     * 关于约束对象的详细说明可以参考 [ConstrainLong]{@link ConstrainLong}。
     */
    height?: number | ConstrainLong;
    /**
     * **自从**
     * <br>&emsp;&emsp;&emsp;*4.17.1*
     *
     * 视频帧率，单位为 fps。
     *
     * 支持传入 `number`，或一个约束对象，如 `{ max: 30, min: 5 }`。
     *
     * 关于约束对象的详细说明可以参考 [ConstrainLong]{@link ConstrainLong}。
     */
    frameRate?: number | ConstrainLong;
    /**
     * 指定发送这个视频轨道时的最小码率，单位为 Kbps。
     */
    bitrateMin?: number;
    /**
     * 指定发送这个视频轨道时的最大码率，单位为 Kbps。
     */
    bitrateMax?: number;
    /**
     * **自从**
     * <br>&emsp;&emsp;&emsp;*4.0.0*
     *
     * 传输优化模式。设置该值后，SDK 会自动调整码率配置以及使用不同的回退策略。
     * - `"detail"`: 清晰优先。
     *   - SDK 会自动根据你的采集分辨率和帧率设定一个最小码率。即使遭遇网络波动，发送码率也不会低于这个值，从而确保清晰的视频画面。
     *   - 大部分情况下，SDK 不会降低发送分辨率，但是可能会降低帧率。
     * - `"motion"`: 流畅优先。
     *   - SDK 不会启用最小码率策略。遭遇网络波动时，发送端会降低码率来确保接收端的视频画面不会出现中断和卡顿。
     *   - 大部分情况下，SDK 不会降低帧率，但是可能会降低发送分辨率。
     * - 留空: 默认优化策略，兼顾清晰和流畅，也就是说弱网条件下，帧率和分辨率都会被调整。
     *
     * > 注意事项：该方法只支持 Chrome 浏览器。
     */
    optimizationMode?: "motion" | "detail";
    /**
     * @ignore
     * **自从**
     * <br>&emsp;&emsp;&emsp;*4.18.0*
     *
     * SVC （可伸缩视频编码）配置。
     *
     * 你可以通过 {@link SVCConfigurationPreset} 传入 SDK 预设的 SVC 编码配置，也可以通过 {@link SVCConfiguration} 传入自定义的 SVC 编码配置。
     */
    scalabiltyMode?: SVCConfiguration | SVCConfigurationPreset;
}

/**
 * 音视频采集设备的信息。
 *
 * - 音频采集设备信息可通过 [onMicrophoneChanged]{@link onMicrophoneChanged} 获取。
 * - 视频采集设备信息可通过 [onCameraChanged]{@link onCameraChanged} 获取。
 * - 音频播放设备信息可通过 [onPlaybackDeviceChanged]{@link onPlaybackDeviceChanged} 获取。
 * @public
 */
export declare interface DeviceInfo {
    /**
     * 采集设备的插拔状态更新时间，UNIX 时间戳，单位为 ms。
     */
    updateAt: number;
    /**
     * SDK 首次检测到采集设备的时间，UNIX 时间戳，单位为 ms。
     */
    initAt: number;
    /**
     * 采集设备当前的插拔状态。
     */
    state: DeviceState;
    /**
     * 采集设备的设备信息，详见 [MediaDeviceInfo](https://developer.mozilla.org/en-US/docs/Web/API/MediaDeviceInfo)。
     */
    device: MediaDeviceInfo;
}

/**
 * 采集设备当前的插拔状态。
 * - `"ACTIVE"`: 该设备已经插入。
 * - `"INACTIVE"`: 该设备已经被拔出。
 * @public
 */
export declare type DeviceState = "ACTIVE" | "INACTIVE";

/**
 * 通过 {@link getElectronScreenSources} 获取的 Electron 下屏幕共享源信息。
 *
 * 详见 [Electron 官方文档](https://www.electronjs.org/docs/api/structures/desktop-capturer-source)。
 * @public
 */
export declare interface ElectronDesktopCapturerSource {
    /**
     * Electron 屏幕共享源的 ID。
     */
    id: string;
    /**
     * Electron 屏幕共享源的名称。
     */
    name: string;
    /**
     * Electron 屏幕共享源的快照。
     *
     * 详见 [ElectronNativeImage](http://electron.atom.io/docs/api/native-image)。
     */
    thumbnail: IElectronNativeImage;
}

/**
 * 加密方案，在调用 {@link setEncryptionConfig} 时使用。包含以下几种：
 * - `"aes-128-xts"`: 128 位 AES 加密，XTS 模式。
 * - `"aes-256-xts"`: 256 位 AES 加密，XTS 模式。
 * - `"aes-128-gcm"`: 128 位 AES 加密，GCM 模式。
 * - `"aes-256-gcm"`: 256 位 AES 加密，GCM 模式。
 * - `"aes-128-gcm2"`: 128 位 AES 加密，GCM 模式，加盐。
 * - `"aes-256-gcm2"`: 256 位 AES 加密，GCM 模式，加盐。
 * - `"aes-128-ecb"`: 128 位 AES 加密，ECB 模式。
 * - `"sm4-128-ecb"`: 128 位 SM4 加密，ECB 模式。
 * - `"none"`: 不加密。
 * @public
 */
export declare type EncryptionMode = "aes-128-xts" | "aes-256-xts" | "aes-128-ecb" | "sm4-128-ecb" | "aes-128-gcm" | "aes-256-gcm" | "aes-128-gcm2" | "aes-256-gcm2" | "none";

/**
 * **自从**
 * <br>&emsp;&emsp;&emsp;*4.18.0*
 *
 * 如果你需要更灵活地监听自动播放失败事件，推荐通过在 {@link IAgoraRTC.on} 方法中传入该回调来代替 {@link onAutoplayFailed}。
 *
 * ```javascript
 * AgoraRTC.on("autoplay-failed", (info) => {
 *   console.log("Autoplay failed!", info.state, info.device);
 * });
 * ```
 * @asMemberOf IAgoraRTC
 * @event
 */
declare function event_autoplay_failed(): void;

/**
 * @ignore
 *
 * 通过 [setBeautyEffect]{@link ILocalVideoTrack.setBeautyEffect} 开启美颜后，如果检测到美颜对设备性能消耗过大就会触发该事件。
 *
 * 你可以监听这个事件提示用户美颜过载，并关闭美颜。
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
 * **自从**
 * <br>&emsp;&emsp;&emsp;*4.18.0*
 *
 * 如果你需要更灵活地监听视频采集设备状态变化，推荐通过在 {@link IAgoraRTC.on} 方法中传入该回调来代替 {@link onCameraChanged}。
 *
 * ```javascript
 * AgoraRTC.on("camera-changed", (info) => {
 *   console.log("Camera changed!", info.state, info.device);
 * });
 * ```
 *
 * @param deviceInfo 设备信息，详见 {@link DeviceInfo}。
 * @asMemberOf IAgoraRTC
 * @event
 */
declare function event_camera_changed(deviceInfo: DeviceInfo): void;

/**
 * 跨频道媒体流转发事件回调。
 *
 * @param event 事件码，详见 {@link ChannelMediaRelayEvent}。
 * @asMemberOf IAgoraRTCClient
 * @event
 */
declare function event_channel_media_relay_event(event: ChannelMediaRelayEvent): void;

/**
 * 跨频道媒体流转发状态回调。
 *
 * 当跨频道媒体流转发状态发生改变时，SDK 会触发该回调，并报告当前的转发状态以及相关的错误信息。
 *
 * 回调会携带当前跨频道媒体流转发服务的状态 {@link ChannelMediaRelayState}，如果状态异常，相应的错误码可以通过 {@link ChannelMediaRelayError} 获取（比如 token 过期，重连失败等）。
 * @param state 跨频道媒体流转发服务的状态。
 * @param code 跨频道媒体流转发错误码。
 * @asMemberOf IAgoraRTCClient
 * @event
 */
declare function event_channel_media_relay_state(state: ChannelMediaRelayState, code: ChannelMediaRelayError): void;

/**
 * SDK 与服务器的连接状态发生改变回调。
 *
 * @param curState 当前的连接状态。
 * @param revState 之前的连接状态。
 * @param reason 如果 `curState` 为 `"DISCONNECTED"`，这里表示断开连接的原因。
 * @asMemberOf IAgoraRTCClient
 * @event
 */
declare function event_connection_state_change(curState: ConnectionState, revState: ConnectionState, reason?: ConnectionDisconnectedReason): void;

/**
 *
 * 视频截图上传服务的连接状态发生改变回调。
 *
 * ```javascript
 * client.on("content-inspect-connection-state-change", (preState, state) => {
 *   console.error(`Content Inspect Connection State Change: ${preState} -> ${state}` )
 * })
 * ```
 *
 * @param preState 之前的连接状态。
 * @param newState 新的连接状态。
 *
 * @asMemberOf IAgoraRTCClient
 * @event
 */
declare function event_content_inspect_connection_state_change(preState: InspectState, newState: InspectState): void;

/**
 *
 * 开启视频截图上传服务出错回调。
 *
 * @param error 抛出的错误。目前包括：
 *
 * | 错误码 |   错误消息 | 原因 |
 * |:-----:|:----------|:-------------|
 * |OPERATION_ABORTED|Content inspect was cancelled because it left the channel| 本地用户已经离开频道 |
 *
 * ```javascript
 * client.on("content-inspect-error", error => {
 *    console.error("Content Inspect Error:", error)
 *    error.code === "OPERATION_ABORTED" && client.disableContentInspect()
 * })
 * ```
 *
 * @asMemberOf IAgoraRTCClient
 * @event
 */
declare function event_content_inspect_error(error?: AgoraRTCError): void;

/**
 * 解密失败回调。
 *
 * 该回调表示用户在订阅过程中出现了解密失败，通常是由于和发布端设置的加密参数不一致导致的。详见 {@link setEncryptionConfig}。
 * @asMemberOf IAgoraRTCClient
 * @event
 */
declare function event_crypt_error(): void;

/**
 * SDK 监测到异常事件回调。
 *
 * 该回调报告频道内 SDK 监测出的异常事件。
 *
 * 异常事件不是错误，但是一般会引起通话质量问题。发生异常事件后，如果恢复正常，也会收到该回调。
 *
 * 每个异常事件都有对应的恢复事件。
 *
 * **异常事件**见下表：
 *
 * | 事件码 | 提示消息                   | 异常             |
 * | :----- | :------------------------- | :--------------- |
 * | 1001   | FRAMERATE_INPUT_TOO_LOW    | 视频采集帧率过低 |
 * | 1002   | FRAMERATE_SENT_TOO_LOW     | 视频发送帧率过低 |
 * | 1003   | SEND_VIDEO_BITRATE_TOO_LOW | 视频发送码率过低 |
 * | 1005   | RECV_VIDEO_DECODE_FAILED   | 接收视频解码失败 |
 * | 2001   | AUDIO_INPUT_LEVEL_TOO_LOW  | 发送音量过低     |
 * | 2002   | AUDIO_OUTPUT_LEVEL_TOO_LOW | 接收音量过低     |
 * | 2003   | SEND_AUDIO_BITRATE_TOO_LOW | 音频发送码率过低 |
 * | 2005   | RECV_AUDIO_DECODE_FAILED   | 接收音频解码失败 |
 *
 * **恢复事件**详见下表：
 *
 * | 事件码 | 提示消息                   | 恢复             |
 * | :----- | :------------------------- | :--------------- |
 * |3001   | FRAMERATE_INPUT_TOO_LOW_RECOVER    | 视频采集帧率恢复正常 |
 * |3002   | FRAMERATE_SENT_TOO_LOW_RECOVER     | 视频发送帧率恢复正常 |
 * |3003   | SEND_VIDEO_BITRATE_TOO_LOW_RECOVER | 视频发送码率恢复正常 |
 * |3005   | RECV_VIDEO_DECODE_FAILED_RECOVER   | 接收视频解码恢复正常 |
 * |4001   | AUDIO_INPUT_LEVEL_TOO_LOW_RECOVER  | 发送音量恢复正常     |
 * |4002   | AUDIO_OUTPUT_LEVEL_TOO_LOW_RECOVER | 接收音量恢复正常     |
 * |4003   | SEND_AUDIO_BITRATE_TOO_LOW_RECOVER | 音频发送码率恢复正常 |
 * |4005   | RECV_AUDIO_DECODE_FAILED_RECOVER   | 接收音频解码恢复正常 |
 *
 * @asMemberOf IAgoraRTCClient
 * @event
 */
declare function event_exception(event: {
    /**
     *  事件码，详细见上表。
     */
    code: number;
    /**
     * 提示消息。
     */
    msg: string;
    /**
     * 发生异常或者恢复异常的用户 ID。
     */
    uid: UID;
}): void;

/**
 * 首帧音频或视频解码时触发。
 *
 * @event
 * @asMemberOf IRemoteTrack
 */
declare function event_first_frame_decoded(): void;

/**
 * 第三方视频审核服务连接状态发生改变回调。
 *
 * ```javascript
 * client.on("image-moderation-connection-state-change", (curState, preState) => {
 * // image-moderation-connection-state-change: CONNECTING to CONNECTED
 * console.error(`image-moderation-connection-state-change: ${preState} to ${curState}`);
 * });
 * ```
 *
 * @param newState 新的连接状态。
 * @param preState 之前的连接状态。
 *
 * @asMemberOf IAgoraRTCClient
 * @event
 */
declare function event_image_moderation_connection_state_change(newState: ImageModerationConnectionState, preState: ImageModerationConnectionState): void;

/**
 * **自从**
 * <br>&emsp;&emsp;&emsp;*4.4.0*
 *
 * SDK 通过这个回调通知当前媒体流是否经云代理服务转发。触发时机如下：
 * - v4.10.0 之前：成功调用 [[publish]] 后。
 * - v4.10.0 及之后：成功调用 [[join]] 后。
 *
 * @param isUsingProxy 当前媒体流是否经云代理服务转发：
 * - `true`: 经云代理服务转发。
 * - `false`: 没有经云代理服务转发。
 * @asMemberOf IAgoraRTCClient
 * @event
 */
declare function event_is_using_cloud_proxy(isUsingProxy: boolean): void;

/**
 * **DEPRECATED**
 * 自 4.19.0 起废弃。SDK 不再使用代理保障连通性，因此不会再触发该回调。
 *
 * SDK 自动切换至 TCP/TLS 443 回调。
 *
 * 自 v4.11.0 起，如果调用 [[join]] 后 SDK 直接连接 SD-RTN™ 失败，SDK 会自动切换到 TCP/TLS 443 通道，从而保障 SDK 的连通性。
 *
 * @param proxyServer 切换后使用的服务器地址。
 * @asMemberOf IAgoraRTCClient
 * @event
 */
declare function event_join_fallback_to_proxy(proxyServer: string): void;

/**
 * 推流发生错误回调。
 *
 * 在调用 {@link startLiveStreaming} 成功开始推流后，推流中途发生错误时，会通过这个事件抛出。
 *
 * 你可以访问 `err.code` 来获取错误码字符串，下面列出可能出现的错误：
 * - `LIVE_STREAMING_INVALID_ARGUMENT`: 推流参数错误。
 * - `LIVE_STREAMING_INTERNAL_SERVER_ERROR`: 推流服务器内部错误。
 * - `LIVE_STREAMING_PUBLISH_STREAM_NOT_AUTHORIZED`: 推流 URL 被占用。
 * - `LIVE_STREAMING_TRANSCODING_NOT_SUPPORTED`: 在非转码推流中调用了转码参数。
 * - `LIVE_STREAMING_CDN_ERROR`: 推流的目标 CDN 出现错误导致推流失败。
 * - `LIVE_STREAMING_INVALID_RAW_STREAM`: 推流超时，请确认目标流是否存在。
 *
 * @param url 发生错误的直播推流地址。
 * @param err 详细的错误信息。
 * @asMemberOf IAgoraRTCClient
 * @event
 */
declare function event_live_streaming_error(url: string, err: AgoraRTCError): void;

/**
 * 推流发生警告回调。
 *
 * 在调用 {@link startLiveStreaming} 成功开始推流后，推流中途发生警告时，会通过这个事件抛出。
 *
 * 你可以访问 `err.code` 来获取警告码字符串，下面列举可能出现的警告：
 * - `LIVE_STREAMING_WARN_STREAM_NUM_REACH_LIMIT`: 推流超过 10 路流。
 * - `LIVE_STREAMING_WARN_FAILED_LOAD_IMAGE`: 推流中的背景图片或者水印地址无法拉取。
 * - `LIVE_STREAMING_WARN_FREQUENT_REQUEST`: 推流请求太频繁。
 *
 * @param url 发生警告的直播推流地址。
 * @param warning 详细的警告信息。
 * @asMemberOf IAgoraRTCClient
 * @event
 */
declare function event_live_streaming_warning(url: string, warning: AgoraRTCError): void;

/**
 * SDK 重新建立媒体连接（用于发布和订阅）结束的回调。
 *
 * @param uid 重新建立的媒体连接所对应的用户 ID。如果是本地 `uid` 说明是重新发布，如果是远端 `uid` 说明是重新订阅。
 * @asMemberOf IAgoraRTCClient
 * @event
 */
declare function event_media_reconnect_end(uid: UID): void;

/**
 * SDK 开始尝试重新建立媒体连接（用于发布和订阅）的回调。
 *
 * @param uid 重新建立的媒体连接所对应的用户 ID。如果是本地 `uid` 说明是重新发布，如果是远端 `uid` 说明是重新订阅。
 * @asMemberOf IAgoraRTCClient
 * @event
 */
declare function event_media_reconnect_start(uid: UID): void;

/**
 * **自从**
 * <br>&emsp;&emsp;&emsp;*4.18.0*
 *
 * 如果你需要更灵活地监听麦克风设备变化，推荐通过在 {@link IAgoraRTC.on} 方法中传入该回调来代替 {@link onMicrophoneChanged}。
 *
 * ```javascript
 * AgoraRTC.on("microphone-changed", (info) => {
 *   console.log("Microphone changed!", info.state, info.device);
 * });
 * ```
 *
 * @param deviceInfo 设备信息，详见 {@link DeviceInfo}。
 * @asMemberOf IAgoraRTC
 * @event
 */
declare function event_microphone_changed(deviceInfo: DeviceInfo): void;

/**
 * 网络上下行质量报告回调。
 *
 * 用户加入频道后，SDK 会每 2 秒触发一次该回调，报告本地用户当前的上行和下行网络质量。
 *
 * > 我们推荐使用此回调来展示你的网络状态。
 *
 * @param stats 网络质量。
 * @asMemberOf IAgoraRTCClient
 * @event
 */
declare function event_network_quality(stats: NetworkQuality): void;

/**
 * **自从**
 * <br>&emsp;&emsp;&emsp;*4.18.0*
 *
 * 如果你需要更灵活地监听音频播放设备变化，推荐通过在 {@link IAgoraRTC.on} 方法中传入该回调来代替 {@link onPlaybackDeviceChanged}。
 *
 * ```javascript
 * AgoraRTC.on("playback-device-changed", (info) => {
 *   console.log("Playback device changed!", info.state, info.device);
 * });
 * ```
 *
 * @param deviceInfo 设备信息，详见 {@link DeviceInfo}。
 * @asMemberOf IAgoraRTC
 * @event
 */
declare function event_playback_device_changed(deviceInfo: DeviceInfo): void;

/**
 * **自从**
 * <br>&emsp;&emsp;&emsp;*4.11.0*
 *
 * 如果开启了单频道支持 128 位主播的功能，该回调会在调用 [[join]] 时触发，返回当前频道内发布音频和视频轨道的用户。
 *
 * > 注意事项：
 * > - 频道内所有用户必须都使用整数型用户 ID（`uid`），`published-user-list` 才会触发。
 * > - `published-user-list` 对 [AgoraRTCClient.on("user-joined")]{@link event_user_joined} 和 [AgoraRTCClient.on("user-published")]{@link event_user_published} 有以下影响：
 * >   - 如果监听了 `published-user-list`，已经在 `published-user-list` 中返回的用户不会再通过 `user-joined` 和 `user-published` 重复返回。
 * >   - 如果没有监听 `published-user-list`，`user-joined` 和 `user-published` 会正常触发。
 *
 * @param users 远端用户对象。
 *
 * @asMemberOf IAgoraRTCClient
 * @event
 */
declare function event_published_user_list(users: IAgoraRTCRemoteUser): void;

/**
 * **自从**
 * <br>&emsp;&emsp;&emsp;*4.18.0*
 *
 * 如果你需要更灵活地监听触发 CSP 规则事件，推荐通过在 {@link IAgoraRTC.on} 方法中传入该回调来代替 {@link onSecurityPolicyViolation}。
 *
 * ```javascript
 * AgoraRTC.on("security-policy-violation", (info) => {
 *   console.log("Security policy violation!", info.state, info.device);
 * });
 * ```
 *
 * @asMemberOf IAgoraRTC
 * @event
 */
declare function event_security_policy_violation(): void;

/**
 * 当 [BufferSourceAudioTrack]{@link IBufferSourceAudioTrack} 的音频数据源处理状态变化时，会触发此事件。
 *
 * @param currentState 当前音频数据处理状态：
 * - `"stopped"`: 音频源数据处理停止。可能是因为数据处理完毕，也可能是手动触发了停止。
 * - `"paused"`: 音频源数据暂停处理。
 * - `"playing"`: 音频源数据正在处理。
 *
 * @event
 * @asMemberOf IBufferSourceAudioTrack
 */
declare function event_source_state_change(currentState: AudioSourceState): void;

/**
 * 订阅的音视频流回退为音频流或恢复为音视频流回调。
 *
 * 如果在 {@link setStreamFallbackOption} 中将 `fallbackType` 设为 2，当下行网络环境不理想、仅接收远端音频流时，或当下行网络改善、恢复订阅音视频流时，会触发该回调。
 * @param uid 远端流对应的用户 ID。
 * @param isFallbackOrRecover 订阅流是回退还是恢复：
 * - `"fallback"`: 从音视频流回退为纯音频流。
 * - `"recover"`: 从音频流恢复为音视频。
 * @asMemberOf IAgoraRTCClient
 * @event
 */
declare function event_stream_fallback(uid: UID, isFallbackOrRecover: "fallback" | "recover"): void;

/**
 * 订阅的视频流类型发生改变回调。
 *
 * 视频流类型改变指视频大流（高码率、高分辨率）变为视频小流（低码率、低分辨率），或视频小流变为视频大流。
 * @param uid 远端流对应的用户 ID。
 * @param streamType 改变后的视频流类型:
 * - 0: 视频大流，即高码率、高分辨率的视频流。
 * - 1: 视频小流，即低码率、低分辨率的视频流。
 * @asMemberOf IAgoraRTCClient
 * @event
 */
declare function event_stream_type_changed(uid: UID, streamType: RemoteStreamType): void;

/**
 * Token 已过期回调。
 *
 * 在 token 过期后，会收到该回调。
 *
 * 一般情况下，在收到该消息之后，应向服务端重新申请 token，并调用 {@link join} 方法传入新的 token 重新加入频道。
 *
 * ``` javascript
 * client.on("token-privilege-did-expire", async () => {
 *   // 重新申请 token 后
 *   await client.join(<APPID>, <CHANNEL NAME>, <NEW TOKEN>);
 * });
 * ```
 *
 * @asMemberOf IAgoraRTCClient
 * @event
 */
declare function event_token_privilege_did_expire(): void;

/**
 * Token 即将过期回调。
 *
 * 在 token 过期前 30 秒，会收到该回调。
 *
 * 在收到该回调之后，应向服务端重新申请 token，并调用 {@link renewToken} 方法传入新的 token。
 *
 * ``` javascript
 * client.on("token-privilege-will-expire", async function(){
 *   // 重新申请 token 后
 *   await client.renewToken(token);
 * });
 * ```
 * @asMemberOf IAgoraRTCClient
 * @event
 */
declare function event_token_privilege_will_expire(): void;

/**
 * 音频或视频轨道被终止，终止的原因可能是：
 * - 摄像头被拔出
 * - 麦克风被拔出
 * - 用户主动停止了屏幕共享
 * - 用户主动关闭了底层的 `MediaStreamTrack`
 * - 媒体设备故障
 * - 正在使用中的媒体设备的权限被收回
 *
 * @event
 * @asMemberOf ILocalTrack
 */
declare function event_track_ended(): void;

/**
 * 当前轨道的 `RTCRtpTransceiver` 实例更新回调。
 *
 * @param transceiver 新的 `RTCRtpTransceiver` 实例。
 * @param type 当前轨道所属视频流的类型。详见 {@link StreamType}。
 *
 * @event
 * @asMemberOf ILocalTrack
 */
declare function event_transceiver_updated(transceiver: RTCRtpTransceiver, type?: StreamType): void;

/**
 * 当前轨道的 `RTCRtpTransceiver` 实例更新回调。
 *
 * @param transceiver 新的 `RTCRtpTransceiver` 实例。
 *
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
 * 该回调用于提示用户状态变化。
 *
 * 在大部分情况下，你只需要监听 [user-published]{@link IAgoraRTCClient.event_user_published} 和 [user-unpublished]{@link IAgoraRTCClient.event_user_unpublished} 就可以完成订阅、取消订阅、展示远端用户是否打开了摄像头和麦克风等工作，无需特别关注实际用户状态的变化，SDK 会自动处理用户状态变化。
 *
 * > 即使用户状态表示该用户的音视频流是活跃的，不一定意味着该用户可订阅。是否可订阅的唯一标志是收到 [user-published]{@link IAgoraRTCClient.event_user_published} 事件。
 *
 * @param uid 发生状态变化的用户 ID。
 * @param msg 当前用户状态。其中，`"enable-local-video"` 和 `"disable-local-video"` 仅当和 Agora RTC Native SDK 互通时会触发。
 * @asMemberOf IAgoraRTCClient
 * @event
 */
declare function event_user_info_updated(uid: UID, msg: "mute-audio" | "mute-video" | "enable-local-video" | "unmute-audio" | "unmute-video" | "disable-local-video"): void;

/**
 * 远端用户或主播加入频道回调。
 *
 * - 通信场景下，该回调提示有远端用户加入了频道，并返回新加入用户的 ID；如果加入之前，已经有其他用户在频道中了，新加入的用户也会收到这些已有用户加入频道的回调。
 * - 直播场景下，该回调提示有主播加入了频道，并返回该主播的 ID。如果在加入之前，已经有主播在频道中了，新加入的用户也会收到已有主播加入频道的回调。声网建议连麦主播不超过 17 人。
 *
 * 该回调在以下情况下会被触发：
 * - 通信场景的远端用户/直播场景的远端主播调用 {@link join} 方法加入频道。
 * - 直播场景的远端观众加入频道后调用 {@link setClientRole} 将用户角色改变为主播。
 * - 通信场景的远端用户/直播场景的远端主播网络中断后重新加入频道。
 *
 * @param user 加入频道的用户信息。
 * @asMemberOf IAgoraRTCClient
 * @event
 */
declare function event_user_joined(user: IAgoraRTCRemoteUser): void;

/**
 * 远端用户离线回调。
 *
 * 该回调通知 app 有远端用户离线，离线包括以下情况：
 * - 正常离开：用户会收到类似“再见”的消息，接收此消息后，判断对方离开频道。
 * - 超时掉线：在 20 秒内，用户没有收到对方的任何数据包，则判定为对方掉线。在网络较差的情况下，有可能会误报。
 * - 用户角色从主播变为观众。
 *
 * > 在直播场景中，只有角色为主播的用户会触发该回调。
 * @param user 离线的用户信息。
 * @param reason 用户离线的原因。
 * - `"Quit"`: 用户调用了 {@link leave} 主动离开频道。
 * - `"ServerTimeOut"`: 因过长时间收不到对方数据包，超时掉线。注意：由于 SDK 使用的是不可靠通道，也有可能对方主动离开本方没收到对方离开消息而误判为超时掉线。
 * - `"BecomeAudience"`: 用户角色从主播切换为观众。
 * @asMemberOf IAgoraRTCClient
 * @event
 */
declare function event_user_left(user: IAgoraRTCRemoteUser, reason: string): void;

/**
 * 该回调通知远端用户发布了新的音频轨道或者视频轨道。
 *
 * 你可以在该回调中订阅并播放远端用户的音视频轨道。详见 {@link subscribe} 和 [RemoteTrack.play]{@link IRemoteTrack.play}。
 *
 * > 如果用户加入频道时频道内已经有其他用户的音视频轨道，也会收到该回调报告已经存在的远端轨道。
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
 * @param user 远端用户信息。
 * @param mediaType 远端用户发布的媒体类型。
 * - `"audio"`: 远端用户发布了音频轨道。
 * - `"video"`: 远端用户发布了视频轨道。
 * - `"datachannel"`: 预留参数。
 * @param config 预留参数。
 *
 * @asMemberOf IAgoraRTCClient
 * @event
 */
declare function event_user_published(user: IAgoraRTCRemoteUser, mediaType: "audio" | "video" | "datachannel", config?: IDataChannelConfig): void;

/**
 * 该回调通知远端用户取消发布了音频或视频轨道。
 *
 * @param user 远端用户信息。
 * @param mediaType 远端用户取消发布的媒体类型。
 * - `"audio"`: 远端用户取消发布了音频轨道。
 * - `"video"`: 远端用户取消发布了视频轨道。
 * - `"datachannel"`: 预留参数。
 * @param config 预留参数。
 * @asMemberOf IAgoraRTCClient
 * @event
 */
declare function event_user_unpublished(user: IAgoraRTCRemoteUser, mediaType: "audio" | "video" | "datachannel", config?: IDataChannelConfig): void;

/**
 * **自从**
 * <br>&emsp;&emsp;&emsp;*4.8.0*
 *
 * 提示 HTML `<video>` 标签的可见状态和不可见原因。SDK 每 30 秒触发一次该事件。
 *
 * 调用 `localVideoTrack.play` 后 SDK 会创建 [HTML `<video>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video) 标签用于播放视频轨道。当 `localVideoTrack.isPlaying` 为 `true` 却看不到图像时，你可通过此事件来进行问题排查。
 *
 * @param data `<video>` 标签的可见状态信息。
 * @asMemberOf ILocalVideoTrack
 * @event
 */
declare function event_video_element_visible_status(data?: CheckVideoVisibleResult): void;

/**
 * **自从**
 * <br>&emsp;&emsp;&emsp;*4.8.0*
 *
 * 提示 HTML `<video>` 标签的可见状态和不可见原因。SDK 每 30 秒触发一次该事件。
 *
 * 调用 `remoteVideoTrack.play` 后 SDK 会创建 [HTML `<video>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video) 标签用于播放视频轨道。当 `remoteVideoTrack.isPlaying` 为 `true` 却看不到图像时，你可通过此事件来进行问题排查。
 *
 * @param data `<video>` 标签的可见状态信息。
 * @asMemberOf IRemoteVideoTrack
 * @event
 */
declare function event_video_element_visible_status_2(data?: CheckVideoVisibleResult): void;

/**
 * 报告频道内正在说话的本地和远端用户及其音量的回调。
 *
 * 默认禁用。可以通过 {@link enableAudioVolumeIndicator} 方法开启；开启后，无论频道内是否有人说话，都会每两秒返回提示音量。
 *
 * 音量范围为 0 到 100 之间。通常在列表中音量大于 60 的用户为持续说话的人。
 *
 * ``` javascript
 * client.on("volume-indicator", function(result){
 *     result.forEach(function(volume, index){
 *     console.log(`${index} UID ${volume.uid} Level ${volume.level}`);
 *   });
 * });
 * ```
 *
 * @param result 包含以下属性：
 * - level：音量，范围是 0 到 100。
 * - uid：说话者的用户 ID。
 *
 * @asMemberOf IAgoraRTCClient
 * @event
 */
declare function event_volume_indicator(result: {
    /**
     * 音量，范围是 0 到 100。
     */
    level: number;
    /**
     * 说话者的用户 ID。
     */
    uid: UID;
}[]): void;

/**
 * 自定义事件上报的参数，用于 [AgoraRTCClient.sendCustomReportMessage]{@link IAgoraRTCClient.sendCustomReportMessage}。
 */
export declare interface EventCustomReportParams {
    /**
     * 该条上报的信息的 ID。
     */
    reportId: string;
    category: string;
    /**
     * 该条上报的信息的事件名。
     */
    event: string;
    /**
     * 该条上报的信息的标签。
     */
    label: string;
    /**
     * 该条上报的信息携带的值。
     */
    value: number;
}

/**
 * `EventEmitter` 类提供了定义、触发和处理事件的方式。
 */
declare class EventEmitter {
    private _events;
    /**
     * 指定一个事件名，获取当前所有监听这个事件的回调函数。
     *
     * @param event - 事件名称。
     */
    getListeners(event: string): Function[];
    /**
     * 监听一个指定的事件，当事件触发时会调用传入的回调函数。
     *
     * @param event - 指定事件的名称。
     * @param listener - 传入的回调函数。
     */
    on(event: string, listener: Function): void;
    /**
     * 监听一个指定的事件，当事件触发时会调用传入的回调函数。
     *
     * 当监听后事件第一次触发时，该监听和回调函数就会被立刻移除，也就是只监听一次指定事件。
     *
     * @param event - 指定事件的名称。
     * @param listener - 传入的回调函数。
     */
    once(event: string, listener: Function): void;
    /**
     * 取消一个指定事件的监听。
     *
     * @param event - 指定事件的名称。
     * @param listener - 监听事件时传入的回调函数。
     */
    off(event: string, listener: Function): void;
    /**
     * 指定一个事件，取消其所有的监听。
     *
     * @param event - 指定事件的名称，如果没有指定事件，则取消所有事件的所有监听。
     */
    removeAllListeners(event?: string): void;
    private _indexOfListener;
}

/**
 * Agora Web SDK 的入口。
 */
export declare interface IAgoraRTC extends EventEmitter {
    /**
     * Agora Web SDK 的版本信息。
     */
    VERSION: string;
    /**
     * **自从**
     * <br>&emsp;&emsp;&emsp;*4.18.0*
     *
     * @param event 事件名称。
     * @param listener 详见 {@link event_camera_changed}。
     */
    on(event: "camera-changed", listener: typeof event_camera_changed): void;
    /**
     * **自从**
     * <br>&emsp;&emsp;&emsp;*4.18.0*
     *
     * @param event 事件名称。
     * @param listener 详见 {@link event_microphone_changed}。
     */
    on(event: "microphone-changed", listener: typeof event_microphone_changed): void;
    /**
     * **自从**
     * <br>&emsp;&emsp;&emsp;*4.18.0*
     *
     * @param event 事件名称。
     * @param listener 详见 {@link event_playback_device_changed}。
     */
    on(event: "playback-device-changed", listener: typeof event_playback_device_changed): void;
    /**
     * **自从**
     * <br>&emsp;&emsp;&emsp;*4.18.0*
     *
     * @param event 事件名称。
     * @param listener 详见 {@link event_autoplay_failed}。
     */
    on(event: "autoplay-failed", listener: typeof event_autoplay_failed): void;
    /**
     * **自从**
     * <br>&emsp;&emsp;&emsp;*4.18.0*
     *
     * @param event 事件名称。
     * @param listener 详见 {@link event_security_policy_violation}。
     */
    on(event: "security-policy-violation", listener: typeof event_security_policy_violation): void;
    /**
     * 获取 Agora Web SDK 对当前浏览器支持的编解码格式。
     *
     * 调用该方法会返回声网服务与当前浏览器同时支持的编解码格式。目前而言，视频支持 VP8 及 H.264 格式，音频支持 OPUS 格式。
     *
     * > 注意事项：
     * > - 该方法支持所有浏览器。对于不支持 WebRTC 或无法识别的浏览器环境，编解码列表返回为空。
     * > - 返回的音视频编码为浏览器通过 SDP 声称的编码类型，为参考值。
     * > - 目前部分安卓手机 H.264 与其他平台 H.264 存在无法互通或单通问题，对于这部分机型推荐使用 VP8 编码格式。
     *
     * ```javascript
     * AgoraRTC.getSupportedCodec().then(result => {
     *  console.log(`Supported video codec: ${result.video.join(",")}`);
     *  console.log(`Supported audio codec: ${result.audio.join(",")}`);
     * });
     * ```
     * @returns  调用该方法会返回一个 `Promise` 对象，在 `.then(function(result){})` 回调中，`result` 包含以下属性：
     * - `video`: 数组类型，支持的视频编解码格式。可能含有 `"H264"`、`"VP8"` 两种取值，或为空数组。
     * - `audio`: 数组类型，支持的音频编解码格式。可能含有 `"OPUS"`，或为空数组。
     */
    getSupportedCodec(): Promise<{
        video: string[];
        audio: string[];
    }>;
    /**
     * 检查 Agora Web SDK 对正在使用的浏览器的适配情况。
     *
     * 该方法必须在创建客户端对象 {@link createClient} 之前调用。
     *
     * @returns 是否支持当前浏览器。
     * - `true`: 支持。
     * - `false`: 不支持。
     */
    checkSystemRequirements(): boolean;
    /**
     * 创建一个客户端对象用于通话/直播管理，通常来说这是使用 Agora Web SDK 的第一步。
     *
     * @param config - 客户端的配置，包括通话场景、编码格式等，默认使用 `vp8` 编码，`rtc` 通话场景。详见 {@link ClientConfig}。
     * @category Agora Core
     */
    createClient(config: ClientConfig): IAgoraRTCClient;
    /**
     * 创建一个自定义的音频轨道。
     *
     * 你可以使用这个方法将自己维护的 [MediaStreamTrack](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack) 转换成一个可以用于 SDK 的音频轨道。
     *
     * @param config 自定义音频的配置，详见 [[CustomAudioTrackInitConfig]]。
     * @category Local Track
     */
    createCustomAudioTrack(config: CustomAudioTrackInitConfig): ILocalAudioTrack;
    /**
     * 通过麦克风采集的音频创建一个音频轨道。
     *
     * @param config 麦克风采集音频的配置，包括采集设备、音频编码配置等，详见 {@link MicrophoneAudioTrackInitConfig}。
     * @category Local Track
     */
    createMicrophoneAudioTrack(config?: MicrophoneAudioTrackInitConfig): Promise<IMicrophoneAudioTrack>;
    /**
     * 通过音频文件或者 [AudioBuffer](https://developer.mozilla.org/zh-CN/docs/Web/API/AudioBuffer) 对象创建一个音频轨道。
     *
     * 该方法支持本地和在线音频文件。音频文件支持以下音频格式：
     * - MP3
     * - AAC
     * - 浏览器支持的其他音频格式
     *
     * @param config 通过该配置指定文件路径、缓存策略和编码配置。
     *
     * @returns 返回的音频轨道对象相对于普通的音频轨道对象增加了一些控制音频播放流程的方法。包括播放、暂停、跳转、实时播放状态获取等。
     * @category Local Track
     */
    createBufferSourceAudioTrack(config: BufferSourceAudioTrackInitConfig): Promise<IBufferSourceAudioTrack>;
    /**
     * 创建一个自定义的视频轨道。
     *
     * 你可以使用这个方法将自己维护的 [MediaStreamTrack](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack) 转换成一个可以用于 SDK 的视频轨道。
     *
     * @param config 自定义视频轨道的配置，详见 {@link CustomVideoTrackInitConfig}。
     * > 自 v4.17.1 起，自定义视频轨道配置 [config]{@link CustomVideoTrackInitConfig} 除了支持设置码率，还支持设置分辨率和帧率。
     * @category Local Track
     */
    createCustomVideoTrack(config: CustomVideoTrackInitConfig): ILocalVideoTrack;
    /**
     * 通过摄像头采集的视频创建一个视频轨道。
     *
     * @param config 采集视频的配置，包括采集设备、编码配置等。详见 {@link CameraVideoTrackInitConfig}。
     * @category Local Track
     */
    createCameraVideoTrack(config?: CameraVideoTrackInitConfig): Promise<ICameraVideoTrack>;
    /**
     * 同时创建麦克风音频轨道和摄像头视频轨道。
     *
     * 通过麦克风采集的音频创建一个音频轨道，同时通过摄像头采集的视频创建一个视频轨道。
     *
     * > 调用该方法和分别调用 {@link createMicrophoneAudioTrack} 以及 {@link createCameraVideoTrack} 的区别是：
     * > - 调用该方法会同时要求麦克风和摄像头的授权，用户只需授权一次。
     * > - 分别创建音频轨道和视频轨道需要用户分别对麦克风和摄像头进行授权，也就是说用户需要授权两次。
     * @param audioConfig 采集音频的配置，包括采集设备、编码配置等。
     * @param videoConfig 采集视频的配置，包括采集设备、编码配置等。
     * @category Local Track
     */
    createMicrophoneAndCameraTracks(audioConfig?: MicrophoneAudioTrackInitConfig, videoConfig?: CameraVideoTrackInitConfig): Promise<[IMicrophoneAudioTrack, ICameraVideoTrack]>;
    /**
     * 创建用于屏幕共享的视频轨道。
     *
     * @param config 屏幕共享的视频配置，包括编码配置、采集配置等。
     * @param withAudio 屏幕共享时是否同时分享**屏幕共享输入源**的音频。
     * - `enable`: 分享音频。
     * - `disable`: （默认）不分享音频。
     * - `auto`: 根据浏览器是否支持决定是否分享音频。
     * > 注意事项：
     * > - 该功能仅支持 Windows 和 macOS 平台下的 Chrome 浏览器 74 及以上版本。
     * > - Windows 平台支持在共享整个屏幕和共享 Chrome 标签页时分享音频，不支持在共享应用窗口时分享音频。macOS 平台仅支持在共享 Chrome 标签页时分享音频。
     * > - 设置了 `withAudio` 为 `enable` 后，还需要在屏幕共享的弹出框上，勾选**分享音频**才能真正生效。
     * @returns
     * - 如果 `withAudio` 设为 `enable`，返回包含屏幕共享视频轨道和一个音频轨道的列表。如果用户没有勾选**分享音频**，SDK 会抛出错误。
     * - 如果 `withAudio` 设为 `disable`，返回屏幕共享的视频轨道。
     * - 如果 `withAudio` 设为 `auto`，在支持屏幕共享音频的浏览器上 SDK 会默认尝试分享音频。
     *   - 如果用户勾选了**分享音频**，会返回包含屏幕共享视频轨道和一个音频轨道的列表。
     *   - 如果用户没有勾选**分享音频**，只返回屏幕共享视频轨道。
     * @category Local Track
     */
    createScreenVideoTrack(config: ScreenVideoTrackInitConfig, withAudio: "enable"): Promise<[ILocalVideoTrack, ILocalAudioTrack]>;
    /**
     * 创建用于屏幕共享的视频轨道。
     *
     * @param config 屏幕共享的视频配置，包括编码配置、采集配置等。
     * @param withAudio 屏幕共享时是否同时分享**屏幕共享输入源**的音频。
     * - `enable`: 分享音频。
     * - `disable`: （默认）不分享音频。
     * - `auto`: 根据浏览器是否支持决定是否分享音频。
     * > 注意事项：
     * > - 该功能仅支持 Windows 和 macOS 平台下的 Chrome 浏览器 74 及以上版本。
     * > - Windows 平台支持在共享整个屏幕和共享 Chrome 标签页时分享音频，不支持在共享应用窗口时分享音频。macOS 平台仅支持在共享 Chrome 标签页时分享音频。
     * > - 设置了 `withAudio` 为 `enable` 后，还需要在屏幕共享的弹出框上，勾选**分享音频**才能真正生效。
     * @returns
     * - 如果 `withAudio` 设为 `enable`，返回包含屏幕共享视频轨道和一个音频轨道的列表。如果用户没有勾选**分享音频**，SDK 会抛出错误。
     * - 如果 `withAudio` 设为 `disable`，返回屏幕共享的视频轨道。
     * - 如果 `withAudio` 设为 `auto`，在支持屏幕共享音频的浏览器上 SDK 会默认尝试分享音频。
     *   - 如果用户勾选了**分享音频**，会返回包含屏幕共享视频轨道和一个音频轨道的列表。
     *   - 如果用户没有勾选**分享音频**，只返回屏幕共享视频轨道。
     */
    createScreenVideoTrack(config: ScreenVideoTrackInitConfig, withAudio: "disable"): Promise<ILocalVideoTrack>;
    /**
     * 创建用于屏幕共享的视频轨道。
     *
     * @param config 屏幕共享的视频配置，包括编码配置、采集配置等。
     * @param withAudio 屏幕共享时是否同时分享**屏幕共享输入源**的音频。
     * - `enable`: 分享音频。
     * - `disable`: （默认）不分享音频。
     * - `auto`: 根据浏览器是否支持决定是否分享音频。
     * > 注意事项：
     * > - 该功能仅支持 Windows 和 macOS 平台下的 Chrome 浏览器 74 及以上版本。
     * > - Windows 平台支持在共享整个屏幕和共享 Chrome 标签页时分享音频，不支持在共享应用窗口时分享音频。macOS 平台仅支持在共享 Chrome 标签页时分享音频。
     * > - 设置了 `withAudio` 为 `enable` 后，还需要在屏幕共享的弹出框上，勾选**分享音频**才能真正生效。
     * @returns
     * - 如果 `withAudio` 设为 `enable`，返回包含屏幕共享视频轨道和一个音频轨道的列表。如果用户没有勾选**分享音频**，SDK 会抛出错误。
     * - 如果 `withAudio` 设为 `disable`，返回屏幕共享的视频轨道。
     * - 如果 `withAudio` 设为 `auto`，在支持屏幕共享音频的浏览器上 SDK 会默认尝试分享音频。
     *   - 如果用户勾选了**分享音频**，会返回包含屏幕共享视频轨道和一个音频轨道的列表。
     *   - 如果用户没有勾选**分享音频**，只返回屏幕共享视频轨道。
     */
    createScreenVideoTrack(config: ScreenVideoTrackInitConfig, withAudio?: "enable" | "disable" | "auto"): Promise<[ILocalVideoTrack, ILocalAudioTrack] | ILocalVideoTrack>;
    /**
     * 该方法枚举可用的媒体输入和输出设备，比如麦克风、摄像头、耳机等。
     * 调用成功后 SDK 会通过 [MediaDeviceInfo](https://developer.mozilla.org/en-US/docs/Web/API/MediaDeviceInfo) 对象返回可用的媒体设备。
     *
     * > 注意事项：
     * > - 调用本方法会暂时打开摄像头和麦克风以触发浏览器的媒体设备权限申请。在 Chrome 81+、Firefox、 Safari 等浏览器上，没有媒体设备权限时无法获取到准确的设备信息。
     * > - 即使是对于同一设备，SDK 返回的 [MediaDeviceInfo.deviceId](https://developer.mozilla.org/en-US/docs/Web/API/MediaDeviceInfo/deviceId) 也可能会发生变化，例如用户清除 Cookie 后，`deviceId` 就会被重置。因此，声网不建议基于 `deviceId` 开发业务逻辑。
     *
     * ```javascript
     * getDevices().then(devices => {
     *   console.log("first device id", devices[0].deviceId);
     * }).catch(e => {
     *   console.log("get devices error!", e);
     * });
     * ```
     * @param skipPermissionCheck 是否跳过权限检查。你可以通过将该参数设置成 `true` 来跳过媒体设备权限申请步骤，但是 SDK 无法保证可以通过本方法获取准确的媒体设备信息。
     * - `true`: 跳过权限检查。
     * - `false`:（默认）不跳过权限检查。
     * @category Media Devices
     */
    getDevices(skipPermissionCheck?: boolean): Promise<MediaDeviceInfo[]>;
    /**
     * 该方法枚举可用的音频输入设备，比如麦克风。
     *
     * 调用成功后 SDK 会通过 [MediaDeviceInfo](https://developer.mozilla.org/en-US/docs/Web/API/MediaDeviceInfo) 对象返回可用的音频输入设备。
     *
     * > 调用本方法会暂时打开麦克风以触发浏览器的媒体设备权限申请。在 Chrome 81+、Firefox、 Safari 等浏览器上，没有媒体设备权限时无法获取到准确的设备信息。
     *
     * @param skipPermissionCheck 是否跳过权限检查。你可以通过将该参数设置成 `true` 来跳过媒体设备权限申请步骤，但是 SDK 无法保证可以通过本方法获取准确的媒体设备信息。
     * - `true`: 跳过权限检查。
     * - `false`:（默认）不跳过权限检查。
     * @category Media Devices
     */
    getMicrophones(skipPermissionCheck?: boolean): Promise<MediaDeviceInfo[]>;
    /**
     * 该方法枚举可用的视频输入设备，比如摄像头。
     *
     * 调用成功后 SDK 会通过 [MediaDeviceInfo](https://developer.mozilla.org/en-US/docs/Web/API/MediaDeviceInfo) 对象返回可用的视频输入设备。
     *
     * > 调用本方法会暂时打开摄像头以触发浏览器的媒体设备权限申请。在 Chrome 81+、Firefox、 Safari 等浏览器上，没有媒体设备权限时无法获取到准确的设备信息。
     *
     * @param skipPermissionCheck 是否跳过权限检查。你可以通过将该参数设置成 `true` 来跳过媒体设备权限申请步骤，但是 SDK 无法保证可以通过本方法获取准确的媒体设备信息。
     * - `true`: 跳过权限检查。
     * - `false`:（默认）不跳过权限检查。
     * @category Media Devices
     */
    getCameras(skipPermissionCheck?: boolean): Promise<MediaDeviceInfo[]>;
    /**
     * **自从**
     * <br>&emsp;&emsp;&emsp;*4.1.0*
     *
     * 该方法枚举可用的音频播放设备，比如扬声器。
     *
     * 调用成功后 SDK 会通过 [MediaDeviceInfo](https://developer.mozilla.org/en-US/docs/Web/API/MediaDeviceInfo) 对象返回可用的音频播放设备。
     *
     * > - 该方法目前仅支持 Chrome 浏览器。
     * > - 调用本方法会暂时打开麦克风以触发浏览器的媒体设备权限申请。在 Chrome 81+ 上，没有媒体设备权限时无法获取到准确的设备信息。
     *
     * @param skipPermissionCheck 是否跳过权限检查。你可以通过将该参数设置成 `true` 来跳过媒体设备权限申请步骤，但是 SDK 无法保证可以通过本方法获取准确的媒体设备信息。
     * - `true`: 跳过权限检查。
     * - `false`:（默认）不跳过权限检查。
     * @category Media Devices
     */
    getPlaybackDevices(skipPermissionCheck?: boolean): Promise<MediaDeviceInfo[]>;
    /**
     * 在 Electron 环境下获取屏幕共享源。
     *
     * 调用成功后 SDK 会返回一组 {@link ElectronDesktopCapturerSource} 对象。
     *
     * > 如果你的 Electron 运行环境开启了 contextIsolation 配置，调用此方法会报错。你需要自己使用 contextBridge.exposeInMainWorld 来获取视频源 id。
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
     * @param type - 需要获取的共享源类型（窗口/应用/屏幕），详见 {@link ScreenSourceType}。如果为空则获取所有可以获取的共享源。
     * @public
     * @category Media Devices
     */
    getElectronScreenSources(type?: ScreenSourceType): Promise<ElectronDesktopCapturerSource[]>;
    /** @ignore
     * 用于设置appType,用于区分三方框架,默认值为 0
     */
    setAppType(type: AppType): void;
    /**
     * 设置 SDK 的日志输出级别。
     *
     * 选择一个级别，你就可以看到在该级别及该级别以上所有级别的日志信息。
     * @param level - SDK 日志输出级别。按照输出日志最全到最少排列：
     * - 0: DEBUG。输出所有的 SDK 日志。
     * - 1: INFO。输出 INFO、WARNING 和 ERROR 级别的日志。
     * - 2: WARNING。输出 WARNING 和 ERROR 级别的日志。
     * - 3: ERROR。输出 ERROR 级别的日志。
     * - 4: NONE。不输出日志。
     *
     * 例如，如果你输入代码 `AgoraRTC.setLogLevel(1);`，就可以看到 INFO，WARNING 和 ERROR 级别的日志信息。
     * @category Logger
     */
    setLogLevel(level: number): void;
    /**
     * 开启日志上传。开启后 SDK 的日志会上传到声网的服务器。
     *
     * 日志上传功能默认为关闭状态，如果你需要开启此功能，请确保在所有方法之前调用本方法。
     *
     * > 如果没有成功加入频道，则服务器上无法查看日志信息。
     * @category Logger
     */
    enableLogUpload(): void;
    /**
     * 关闭日志上传。
     *
     * 日志上传默认是关闭状态，如果你调用了开启日志上传（{@link enableLogUpload})，可以通过本方法停止上传日志。
     * @category Logger
     */
    disableLogUpload(): void;
    /**
     * 创建跨频道媒体流转发的配置对象。
     */
    createChannelMediaRelayConfiguration(): IChannelMediaRelayConfiguration;
    /**
     * 检测视频轨道是否活跃。
     *
     * SDK 通过检测指定时间范围内视频图像是否发生变动来判断视频轨道是否活跃。
     *
     * 声网建议通过此方法在开始通话前对视频输入设备进行可用性检测。你可以将摄像头采集到的视频轨道作为参数传入该方法，判断摄像头是否正常运行。
     *
     * > 注意事项：
     * > - 当视频轨道被 mute 时，会返回 `false`。
     * > - 不建议频繁调用此方法。
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
     * @param track 需要进行检测的本地或远端视频轨道。
     * @param timeout 视频轨道检测的超时时间，单位为毫秒，默认 5,000 毫秒。
     *
     * @returns 传入该方法的视频轨道中的图像是否发生了变动：
     * - `true`: 视频画面发生变动。对于摄像头视频轨道，说明视频采集设备采集到了画面。
     * - `false`: 视频画面未变动，说明视频采集设备异常或被完全遮挡，或视频轨道被 mute。
     */
    checkVideoTrackIsActive(track: ILocalVideoTrack | IRemoteVideoTrack, timeout?: number): Promise<boolean>;
    /**
     * 检测音频轨道是否活跃。
     *
     * SDK 通过检测指定时间范围内音量是否发生变化来判断音频轨道是否活跃。
     *
     * 声网建议通过此方法在开始通话前对音频输入设备进行可用性检测。你可以将麦克风采集到的音频轨道作为参数传入该方法，判断麦克风是否正常运行。
     *
     * > 注意事项：
     * > - 极为安静的环境下可能检测失败，所以声网建议你在使用此方法的时候提示用户发出声响。
     * > - 当音频轨道被 mute 时，会返回 `false`。
     * > - 不建议频繁调用此方法。
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
     * @param track 需要进行检测的本地或远端音频轨道。
     * @param timeout 音频轨道检测的超时时间，单位为毫秒，默认 5,000 毫秒。
     *
     * @returns 传入该方法的音频轨道中的音量大小是否发生了变化：
     * - `true`: 音量大小有变化。对于麦克风音频轨道，说明音频采集设备采集到了声音。
     * - `false`: 音量大小未变化，说明音频采集设备没有采集到声音，或自定义音频轨道中没有音量变化，或音频轨道被 mute。
     */
    checkAudioTrackIsActive(track: ILocalAudioTrack | IRemoteAudioTrack, timeout?: number): Promise<boolean>;
    /**
     * 视频采集设备状态变化回调。
     *
     * 该回调提示有摄像头被添加或移除。
     *
     * > 注意事项：当该回调提示有设备被添加时，如果该设备是虚拟设备，可能无法采集到音频或视频。
     *
     * ``` javascript
     * AgoraRTC.onCameraChanged = (info) => {
     *   console.log("camera changed!", info.state, info.device);
     * };
     * ```
     * **Parameters**
     *
     * - **deviceInfo**：设备信息，详见 {@link DeviceInfo}。
     * @category Global Callback
     */
    onCameraChanged?: (deviceInfo: DeviceInfo) => void;
    /**
     * 音频采集设备状态变化回调。
     *
     * 该回调提示有麦克风被添加或移除。
     *
     * > 注意事项：当该回调提示有设备被添加时，如果该设备是虚拟设备，可能无法采集到音频或视频。
     *
     * ``` javascript
     * AgoraRTC.onMicrophoneChanged = (info) => {
     *   console.log("microphone changed!", info.state, info.device);
     * };
     * ```
     * **Parameters**
     *
     * - **deviceInfo**：设备信息，详见 {@link DeviceInfo}。
     * @category Global Callback
     */
    onMicrophoneChanged?: (deviceInfo: DeviceInfo) => void;
    /**
     * **自从**
     * <br>&emsp;&emsp;&emsp;*4.1.0*
     *
     * 音频播放设备状态变化回调。
     *
     * 该回调提示有音频播放设备被添加或移除。
     *
     * ``` javascript
     * AgoraRTC.onPlaybackDeviceChanged = (info) => {
     *   console.log("speaker changed!", info.state, info.device);
     * };
     * ```
     * **Parameters**
     *
     * - **deviceInfo**：设备信息，详见 {@link DeviceInfo}。
     * @category Global Callback
     */
    onPlaybackDeviceChanged?: (deviceInfo: DeviceInfo) => void;
    /**
     * 音频轨道自动播放失败回调。
     *
     * **DEPRECATED**
     *
     * 自 4.6.0 起废弃，请改用 [[onAutoplayFailed]]。
     *
     * 该回调在音频轨道自动播放失败的时候触发。如果短时间内有多个音频轨道对象都调用了 `play`，SDK 会触发多次 `onAudioAutoplayFailed`。
     *
     * 音频自动播放失败是浏览器的[自动播放策略](https://developer.mozilla.org/en-US/docs/Web/Media/Autoplay_guide#Autoplay_and_autoplay_blocking)导致的，视频轨道的播放不受此影响。
     *
     * 在 Agora Web SDK 中，只要用户和页面发生过一次点击交互，就会自动解锁浏览器音频自动播放的限制，所以针对音频自动播放有两种解决方案：
     * - 如果不希望收到 `onAudioAutoplayFailed` 回调，就确保在调用 `RemoteAudioTrack.play` 和 `LocalAudioTrack.play` 之前用户已经和页面发生了点击交互。
     * - 如果无法保证在调用 `RemoteAudioTrack.play` 和 `LocalAudioTrack.play` 之前用户已经和页面发生点击交互，就监听 `onAudioAutoplayFailed` 回调，通过回调在页面上显示一个按钮引导用户点击。
     *
     * > 无论使用何种方案，只要浏览器启用了自动播放策略，都需要用户至少触发一次点击交互操作才能播放音频。随着用户使用某个页面的次数变多，浏览器会在这个页面上默认关闭自动播放策略，此时不需要任何交互也可以播放音频了，但是我们无法通过 JavaScript 去感知浏览器这个行为。
     *
     * 下面的示例代码演示了当检测到自动播放失败后的处理：在页面上动态显示一个按钮让用户点击。
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
     * > 需要注意的是，短时间内可能会有多个音频轨道对象都调用了 `play`，此时会触发多次 `onAudioAutoplayFailed`。示例代码中通过 `isAudioAutoplayFailed` 这个对象防止创建重复的按钮对象。
     *
     * @category Global Callback
     */
    onAudioAutoplayFailed?: () => void;
    /**
     * 音频或视频轨道自动播放失败回调。
     *
     * **自从**
     * <br>&emsp;&emsp;&emsp;*4.6.0*
     *
     * SDK 在音频或视频轨道自动播放失败时触发该回调。
     *
     * - 音频自动播放失败是由浏览器的[自动播放策略](https://developer.mozilla.org/en-US/docs/Web/Media/Autoplay_guide#Autoplay_and_autoplay_blocking)导致的。
     * - 在大部分浏览器中，纯视频不受到自动播放策略的限制，但是在低电量模式下的 iOS Safari 浏览器中以及开启自定义自动播放限制的 iOS `WKWebView` 中（如 iOS 微信浏览器），纯视频的自动播放也会受到限制。
     *
     * 在 Agora Web SDK 中，只要用户和页面发生过一次点击交互，就会自动解锁浏览器音频或视频的自动播放限制，所以针对自动播放有两种解决方案：
     * - 如果不希望收到 `onAutoplayFailed` 回调，就确保在调用 `RemoteTrack.play` 和 `LocalTrack.play` 之前用户已经和页面发生了点击交互。
     * - 如果无法保证在调用 `RemoteTrack.play` 和 `LocalTrack.play` 之前用户已经和页面发生点击交互，就监听 `onAutoplayFailed` 回调，通过回调在页面上显示一个按钮引导用户点击。
     *
     * > 无论使用何种方案，只要浏览器启用了自动播放策略，都需要用户至少触发一次点击交互操作才能播放音频或视频。随着用户使用某个页面的次数变多，浏览器会在这个页面上默认关闭自动播放策略，此时不需要任何交互也可以播放音频和视频了，但是我们无法通过 JavaScript 去感知浏览器这个行为。
     *
     * 下面的示例代码演示了当检测到自动播放失败后的处理：在页面上动态显示一个按钮让用户点击。
     *
     * ```javascript
     *  AgoraRTC.onAutoplayFailed = () => {
     *   const btn = document.createElement("button");
     *   btn.innerText = "Click me to resume the audio/video playback";
     *   btn.onClick = () => {
     *     btn.remove();
     *   };
     *   document.body.append(btn);
     * ```
     * > 由于自动播放失败后在用户通过手势点击恢复播放之前，`onAutoplayFailed` 只会触发一次，因此在业务代码中不需要像 `onAudioAutoplayFailed` 回调一样维护 `isAutoplayFailed` 状态。
     *
     * @category Global Callback
     * */
    onAutoplayFailed?: () => void;
    /**
     * **自从**
     * <br>&emsp;&emsp;&emsp;*4.15.0*
     *
     * 触发 CSP 规则回调。
     *
     * 当声网服务相关的资源加载或请求发送因为触发浏览器的 CSP（Content Security Policy，内容安全策略）规则而失败时，SDK 会触发该回调。
     * 收到该回调后，请及时调整你的 CSP 设置，确保能正常体验声网的服务。
     *
     * @category Global Callback
     */
    onSecurityPolicyViolation?: (event: SecurityPolicyViolationEvent) => void;
    /**
     * **自从**
     * <br>&emsp;&emsp;&emsp;*4.2.0*
     *
     * 设置访问区域。
     *
     * 该功能为高级设置，适用于有访问安全限制的场景。
     *
     * 默认情况下，SDK 会就近选择声网服务器进行连接。设置访问区域之后，SDK 只会连接到指定区域内的声网服务器。
     *
     * ```javascript
     * // 指定仅访问北美的服务器。
     * AgoraRTC.setArea({
     *   areaCode:"NORTH_AMERICA"
     * })
     * ```
     *
     * @param area 服务器的访问区域。区域码详见 {@link AREAS}。你可以设置 `areaCode` 参数指定单个访问区域。
     */
    setArea(area: AREAS[] | {
        areaCode: AREAS[];
        excludedArea?: AREAS;
    }): void;
    /**
     *
     * **自从**
     * <br>&emsp;&emsp;&emsp;*4.5.0*
     *
     * 对本地播放的音频启用回声消除。
     *
     * 在多个用户同时播放一个媒体文件的场景中，例如一起看电影，如果用户 A 在 Chrome 浏览器上通过 [HTMLMediaElement](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement) 使用扬声器播放媒体文件，扬声器播放的声音会和人声一起被 SDK 采集，因此其他用户会听到自己本地播放的媒体音频以及用户 A 发送的媒体音频，从而产生回声。针对这种情况，你可以调用 `processExternalMediaAEC` 方法传入 `HTMLMediaElement`，对本地播放的媒体进行回声消除，提升音频体验。
     *
     * ```javascript
     * <audio crossOrigin="anonymous" src="http://www.test.com/test.mp3" id="audioDom"></audio>
     * <script>
     *   const element = document.getElementById("audioDom");
     *   AgoraRTC.processExternalMediaAEC(element);
     * </script>
     * ```
     *
     * > 注意事项：如果本地播放的媒体元素的地址是跨域地址，必须设置 [HTMLMediaElement](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement) 中的 `crossOrigin` 属性为 `"anonymous"` 以允许跨域媒体被重采集。
     *
     * @param element 需要进行回声消除的媒体元素，详见 [HTMLMediaElement](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement)。
     */
    processExternalMediaAEC(element: HTMLMediaElement): void;
    /**
     * **自从**
     * <br>&emsp;&emsp;&emsp;*4.10.0*
     *
     * 注册插件。
     *
     * 声网当前支持以下插件：
     * - [虚拟背景插件](https://docs.agora.io/cn/Video/virtual_background_web_ng?platform=Web)
     * - [AI 降噪插件](https://docs.agora.io/cn/Video/noise_reduction_web_ng?platform=Web)
     * - [美颜插件](https://docs.agora.io/cn/Video/beauty_effect_web_ng?platform=Web)
     *
     * @param extensions 插件实例。
     */
    registerExtensions(extensions: IExtension<any>[]): void;
}

/**
 * 提供音视频通话的核心功能，比如加入频道、发布和订阅音视频轨道等。
 *
 * 你可以通过 [[createClient]] 创建一个 `AgoraRTCClient` 对象。一个 `AgoraRTCClient` 对象代表一个本地客户端。
 * @public
 */
export declare interface IAgoraRTCClient extends EventEmitter {
    /**
     * SDK 和声网服务器的连接状态。
     */
    readonly connectionState: ConnectionState;
    /**
     * 远端用户信息列表，包含频道中各个远端用户的用户 ID 和轨道信息。
     *
     * 如果本地用户没有加入频道，该列表为空。
     */
    readonly remoteUsers: IAgoraRTCRemoteUser[];
    /**
     * **自从**
     * <br>&emsp;&emsp;&emsp;*4.0.0*
     *
     * 保存当前正在发布的本地轨道对象列表。
     *
     * - 调用 [[publish]] 成功后，发布的轨道对象会自动添加到这个列表中。
     * - 调用 [[unpublish]] 成功后，取消发布的轨道对象会自动从这个列表中移除。
     */
    readonly localTracks: ILocalTrack[];
    /**
     * 本地用户的用户 ID。
     *
     * 如果本地用户没有加入频道，该属性值为 `undefined`。
     */
    readonly uid?: UID;
    /**
     * 当前加入的频道名称
     *
     * 如果本地用户没有加入频道，该属性值为 `undefined`。
     */
    readonly channelName?: string;
    /**
     * @ignore
     * 本地用户的datachannel
     *
     * 如果本地用户没有发布，该属性值为 `[]`。
     */
    readonly localDataChannels: ILocalDataChannel[];
    /**
     * @ignore
     * **自从**
     * <br>&emsp;&emsp;&emsp;*4.18.1*
     *
     * 当前加入的频道场景
     */
    readonly mode: SDK_MODE;
    /**
     * @ignore
     * **自从**
     * <br>&emsp;&emsp;&emsp;*4.18.1*
     *
     * 当前用户角色
     */
    readonly role: ClientRole;
    /**
     * @param event 事件名称。
     * @param listener 详见 [connection-state-change]{@link event_connection_state_change}。
     */
    on(event: "connection-state-change", listener: typeof event_connection_state_change): void;
    /**
     * @param event 事件名称。
     * @param listener 详见 [user-joined]{@link event_user_joined}。
     */
    on(event: "user-joined", listener: typeof event_user_joined): void;
    /**
     * @param event 事件名称。
     * @param listener 详见 [user-left]{@link event_user_left}。
     */
    on(event: "user-left", listener: typeof event_user_left): void;
    /**
     * @param event 事件名称。
     * @param listener 详见 [user-published]{@link event_user_published}。
     */
    on(event: "user-published", listener: typeof event_user_published): void;
    /**
     * @param event 事件名称。
     * @param listener 详见 [user-unpublished]{@link event_user_unpublished}。
     */
    on(event: "user-unpublished", listener: typeof event_user_unpublished): void;
    /**
     * @param event 事件名称。
     * @param listener 详见 [user-info-updated]{@link event_user_info_updated}。
     */
    on(event: "user-info-updated", listener: typeof event_user_info_updated): void;
    /**
     * @param event 事件名称。
     * @param listener 详见 [media-reconnect-start]{@link event_media_reconnect_start}。
     */
    on(event: "media-reconnect-start", listener: typeof event_media_reconnect_start): void;
    /**
     * @param event 事件名称。
     * @param listener 详见 [media-reconnect-end]{@link event_media_reconnect_end}。
     */
    on(event: "media-reconnect-end", listener: typeof event_media_reconnect_end): void;
    /**
     * @param event 事件名称。
     * @param listener 详见 [stream-type-changed]{@link event_stream_type_changed}。
     */
    on(event: "stream-type-changed", listener: typeof event_stream_type_changed): void;
    /**
     * @param event 事件名称。
     * @param listener 详见 [stream-fallback]{@link event_stream_fallback}。
     */
    on(event: "stream-fallback", listener: typeof event_stream_fallback): void;
    /**
     * @param event 事件名称。
     * @param listener 详见 [channel-media-relay-state]{@link event_channel_media_relay_state}。
     */
    on(event: "channel-media-relay-state", listener: typeof event_channel_media_relay_state): void;
    /**
     * @param event 事件名称。
     * @param listener 详见 [channel-media-relay-event]{@link event_channel_media_relay_event}。
     */
    on(event: "channel-media-relay-event", listener: typeof event_channel_media_relay_event): void;
    /**
     * @param event 事件名称。
     * @param listener 详见 [volume-indicator]{@link event_volume_indicator}。
     */
    on(event: "volume-indicator", listener: typeof event_volume_indicator): void;
    /**
     * @param event 事件名称。
     * @param listener 详见 [crypt-error]{@link event_crypt_error}。
     */
    on(event: "crypt-error", listener: typeof event_crypt_error): void;
    /**
     * @param event 事件名称。
     * @param listener 详见 [token-privilege-will-expire]{@link event_token_privilege_will_expire}。
     */
    on(event: "token-privilege-will-expire", listener: typeof event_token_privilege_will_expire): void;
    /**
     * @param event 事件名称。
     * @param listener 详见 [token-privilege-did-expire]{@link event_token_privilege_did_expire}。
     */
    on(event: "token-privilege-did-expire", listener: typeof event_token_privilege_did_expire): void;
    /**
     * @param event 事件名称。
     * @param listener 详见 [network-quality]{@link event_network_quality}。
     */
    on(event: "network-quality", listener: typeof event_network_quality): void;
    /**
     * @param event 事件名称。
     * @param listener 详见 [live-streaming-error]{@link event_live_streaming_error}。
     */
    on(event: "live-streaming-error", listener: typeof event_live_streaming_error): void;
    /**
     * @param event 事件名称。
     * @param listener 详见 [live-streaming-warning]{@link event_live_streaming_warning}。
     */
    on(event: "live-streaming-warning", listener: typeof event_live_streaming_warning): void;
    /**
     * @param event 事件名称。
     * @param listener 详见 [exception]{@link event_exception}。
     */
    on(event: "exception", listener: typeof event_exception): void;
    /**
     * @param event 事件名称。
     * @param listener 详见 [is-using-cloud-proxy]{@link event_is_using_cloud_proxy}。
     */
    on(event: "is-using-cloud-proxy", listener: typeof event_is_using_cloud_proxy): void;
    /**
     * **DEPRECATED**
     * 自 4.19.0 起废弃。
     *
     * @param event 事件名称。
     * @param listener 详见 [join-fallback-to-proxy]{@link event_join_fallback_to_proxy}。
     */
    on(event: "join-fallback-to-proxy", listener: typeof event_join_fallback_to_proxy): void;
    /**
     * @param event 事件名称。
     * @param listener 详见 [published-user-list]{@link event_published_user_list}。
     */
    on(event: "published-user-list", listener: typeof event_published_user_list): void;
    /**
     * @param event 事件名称。
     * @param listener 详见 [content-inspect-connection-state-change]{@link event_content_inspect_connection_state_change}。
     */
    on(event: "content-inspect-connection-state-change", listener: typeof event_content_inspect_connection_state_change): void;
    /**
     * @param event 事件名称。
     * @param listener 详见 [content-inspect-error]{@link event_content_inspect_error}。
     */
    on(event: "content-inspect-error", listener: typeof event_content_inspect_error): void;
    /**
     * 当指定的事件触发时，会调用传入的回调函数。
     *
     * @param event 事件名称。
     * @param listener 详见 [image-moderation-connection-state-change]{@link event_image_moderation_connection_state_change}。
     */
    on(event: "image-moderation-connection-state-change", listener: typeof event_image_moderation_connection_state_change): void;
    /**
     * 当指定的事件触发时，会调用传入的回调函数。
     * @param event 事件名称。
     * @param listener 回调函数。
     */
    on(event: string, listener: Function): void;
    /**
     * 加入频道。
     *
     * 该方法让用户加入通话频道，在同一个频道内的用户可以互相通话。
     *
     * 调用该方法加入频道时，本地会触发 [AgoraRTCClient.on("connection-state-change")]{@link IAgoraRTCClient.event_connection_state_change} 回调。
     *
     * 通信场景下的用户和直播场景下的主播加入频道后，远端会触发 [AgoraRTCClient.on("user-joined")]{@link IAgoraRTCClient.event_user_joined} 回调。
     *
     * @param appid 你的声网项目的 [App ID](https://docs.agora.io/cn/Agora%20Platform/terms?platform=All%20Platforms#appid)。
     *
     * @param token 用于鉴权的 token。
     *  - 如果你的项目没有开启 token 鉴权，这里填 `null`。
     *  - 安全要求不高: 你可以使用控制台生成的临时 token，详见[获取 RTC 临时 Token](https://docs.agora.io/cn/Agora%20Platform/get_appid_token?platform=All%20Platforms#rtc-temp-token)。
     *  - 安全要求高：传入从你的服务端获得的正式 token，详见[使用 Token 鉴权](https://docs.agora.io/cn/Video/token_server?platform=Web)。
     *
     * @param channel 标识通话的频道名称，长度在 64 字节以内的字符串。以下为支持的字符集范围（共 89 个字符）:
     *  - 26 个小写字母 a-z。
     *  - 26 个大写字母 A-Z。
     *  - 10 个数字 0-9。
     *  - 空格。
     *  - "!", "#", "$", "%", "&", "(", ")", "+", "-", ":", ";", "<", "=", ".", ">", "?", "@", "[", "]", "^", "_", "{", "}", "|", "~", ","。
     * @param uid 标识用户的 ID。整数或字符串，ASCII 字符，需保证唯一性。如果不指定或设为 `null`，服务器会自动分配一个整数型 uid 并在 Promise 中返回。
     * - 如果使用整数作为用户 ID，需为 32 位无符号整数。建议设置范围：0 到 (2<sup>32</sup>-1)。
     * - 如果使用字符串作为用户 ID，长度不超过 255 个字符。
     *
     * <div class="alert warning">为保证最佳的用户体验，声网强烈建议你不要使用字符串作为用户 ID。</div>
     *
     * > 注意事项：
     * > - 一个频道内的所有用户必须使用同样类型的 `uid`，即必须都为整数或都为字符串。
     * > - 使用字符串作为用户 ID 支持与 Native SDK 2.8 及以上版本互通，请确保 Native SDK 使用 User Account 加入频道。详见[使用 String 型的用户名](https://docs.agora.io/cn/faq/string)。
     * > - 为保证水晶球数据的准确性，建议自行指定 `uid` 并保证唯一性。
     *
     * @return Promise 对象，包含本地用户的 ID：
     * - 如果你使用整数型 uid 加入频道，则返回整数型 uid。
     * - 如果你使用字符串型 uid 加入频道，则返回字符串型 uid。
     * - 如果你不指定或设为 `null`，声网服务器自动分配一个整数型 uid 并返回。
     * @category Agora Core
     */
    join(appid: string, channel: string, token: string | null, uid?: UID | null): Promise<UID>;
    /**
     * 离开频道。
     *
     * 离开频道即挂断或退出通话。
     *
     * 调用该方法离开频道时，本地会触发 [AgoraRTCClient.on("connection-state-change")]{@link IAgoraRTCClient.event_connection_state_change} 回调。
     *
     * 通信场景下的用户和直播场景下的主播离开频道后，远端会触发 [AgoraRTCClient.on("user-left")]{@link IAgoraRTCClient.event_user_left} 回调。
     * @category Agora Core
     */
    leave(): Promise<void>;
    /**
     * 发布本地音视频轨道。
     *
     * 该方法将本地音视频轨道发布至频道中。
     *
     * 发布音视频轨道之后，远端会触发 [AgoraRTCClient.on("user-published")]{@link event_user_published} 回调。
     *
     * > 注意事项：
     * > - 直播场景中，调用该方法前，必须先调用 {@link setClientRole} 将用户角色设为主播。
     * > - 你可以多次调用该方法添加要发布的轨道。
     * > - 一个 `AgoraRTCClient` 对象可以发布多个音频轨道，SDK 会自动混音，将多个音频轨道合并为一个音频轨道。Safari 12 之前的版本不支持发布多个音频轨道。
     * > - 一个 `AgoraRTCClient` 对象**只能发布一个视频轨道**。如果你想要更换视频轨道，例如已经发布了一个摄像头视频轨道，想要切换为屏幕共享视频轨道，你必须先取消发布。
     *
     * @param tracks 通过 [AgoraRTC.createMicrophoneAudioTrack]{@link IAgoraRTC.createMicrophoneAudioTrack} / [AgoraRTC.createCameraTrack]{@link IAgoraRTC.createCameraVideoTrack} 或其他方法创建的本地 Track 对象。
     * @category Agora Core
     */
    publish(tracks: ILocalTrack | ILocalTrack[]): Promise<void>;
    /** @ignore */
    publish(config: IDataChannelConfig): Promise<ILocalDataChannel>;
    /** @ignore */
    publish(params: ILocalTrack | ILocalTrack[] | IDataChannelConfig): Promise<ILocalDataChannel | void>;
    /**
     * 取消发布本地音视频轨道。
     *
     * 取消发布音视频轨道之后，远端会触发 [AgoraRTCClient.on("user-unpublished")]{@link event_user_unpublished} 回调。
     *
     * > 注意事项：直播场景中，主播调用 [unpublish]{@link unpublish} 取消发布轨道之后，用户角色不会自动切换为观众。如需将用户角色切换为观众，必须调用 {@link setClientRole}。
     *
     * @param tracks 要取消发布的轨道。如果留空，会将所有发布过的音视频轨道取消发布。
     * @category Agora Core
     */
    unpublish(tracks?: ILocalTrack | ILocalTrack[]): Promise<void>;
    /** @ignore */
    unpublish(dataChannel?: ILocalDataChannel): Promise<void>;
    /** @ignore */
    unpublish(params?: ILocalTrack | ILocalTrack[] | ILocalDataChannel): Promise<void>;
    /**
     * 订阅远端用户的音视频轨道。
     *
     * ```javascript
     * await client.subscribe(user，"audio");
     * user.audioTrack.play();
     * ```
     *
     * @param user 远端用户对象。
     * @param mediaType 订阅的轨道媒体类型。
     * - `"video"`: 订阅指定用户发布的视频轨道。
     * - `"audio"`: 订阅指定用户发布的音频轨道。
     *
     * @returns 订阅的异步操作完成后，返回远端轨道对象，该对象也会在 [user.audioTrack]{@link IAgoraRTCRemoteUser.audioTrack} 和 [user.videoTrack]{@link IAgoraRTCRemoteUser.videoTrack} 上更新，
     * 之后直接调用 [audioTrack.play]{@link IRemoteAudioTrack.play} 或 [videoTrack.play]{@link IRemoteVideoTrack.play} 就可以播放了。
     * > 如果指定要订阅的音视频轨道不存在会抛出 `TRACK_IS_NOT_PUBLISHED` 错误。
     * @category Agora Core
     */
    subscribe(user: IAgoraRTCRemoteUser, mediaType: "video"): Promise<IRemoteVideoTrack>;
    /**
     * 订阅远端用户的音视频轨道。
     *
     * ```javascript
     * await client.subscribe(user，"audio");
     * user.audioTrack.play();
     * ```
     * @param user 远端用户对象。
     * @param mediaType 订阅的轨道媒体类型。
     * - `"video"`: 订阅指定用户发布的视频轨道。
     * - `"audio"`: 订阅指定用户发布的音频轨道。
     *
     * @returns 订阅的异步操作完成后，返回远端轨道对象，该对象也会在 [user.audioTrack]{@link IAgoraRTCRemoteUser.audioTrack} 和 [user.videoTrack]{@link IAgoraRTCRemoteUser.videoTrack} 上更新，
     * 之后直接调用 [audioTrack.play]{@link IRemoteAudioTrack.play} 或 [videoTrack.play]{@link IRemoteVideoTrack.play} 就可以播放了。
     * > 如果指定要订阅的音视频轨道不存在会抛出 `TRACK_IS_NOT_PUBLISHED` 错误。
     * @category Agora Core
     */
    subscribe(user: IAgoraRTCRemoteUser, mediaType: "audio"): Promise<IRemoteAudioTrack>;
    /**
     * @ignore
     * @param user
     * @param mediaType
     * @param channelId
     */
    subscribe(user: IAgoraRTCRemoteUser, mediaType: "datachannel", channelId: number): Promise<IRemoteDataChannel>;
    /**
     * 订阅远端用户的音视频轨道。
     *
     * ```javascript
     * await client.subscribe(user，"audio");
     * user.audioTrack.play();
     * ```
     * @param user 远端用户对象。
     * @param mediaType 订阅的轨道媒体类型。
     * - `"video"`: 订阅指定用户发布的视频轨道。
     * - `"audio"`: 订阅指定用户发布的音频轨道。
     * - `"datachannel"`: 预留参数。
     *
     * @returns 订阅的异步操作完成后，返回远端轨道对象，该对象也会在 [user.audioTrack]{@link IAgoraRTCRemoteUser.audioTrack} 和 [user.videoTrack]{@link IAgoraRTCRemoteUser.videoTrack} 上更新，
     * 之后直接调用 [audioTrack.play]{@link IRemoteAudioTrack.play} 或 [videoTrack.play]{@link IRemoteVideoTrack.play} 就可以播放了。
     * > 如果指定要订阅的音视频轨道不存在会抛出 `TRACK_IS_NOT_PUBLISHED` 错误。
     * @category Agora Core
     */
    subscribe(user: IAgoraRTCRemoteUser, mediaType: "video" | "audio" | "datachannel", channelId?: number): Promise<IRemoteTrack | IRemoteDataChannel>;
    /**
     * **自从**
     * <br>&emsp;&emsp;&emsp;*4.11.0*
     *
     * 批量订阅远端用户的音视频轨道。
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
     * @param subscribeList 订阅的远端用户列表。列表中的每一条都包含以下信息：
     * - `user`：远端用户对象，详见 [AgoraRTCRemoteUser]{@link IAgoraRTCRemoteUser}。
     * - `mediaType`：订阅的轨道媒体类型。
     *   - `"video"`: 订阅指定用户的视频轨道。
     *   - `"audio"`: 订阅指定用户的音频轨道。
     *
     * @returns 正常情况下，返回列表的长度与顺序和 `subscribeList` 一致。列表中的每一条都包含以下信息：
     * - `user`：远端用户对象，详见 [AgoraRTCRemoteUser]{@link IAgoraRTCRemoteUser}。
     * - `mediaType`：已订阅的轨道媒体类型。
     *   - `"video"`: 已订阅指定用户发布的视频轨道。
     *   - `"audio"`: 已订阅指定用户发布的音频轨道。
     * - `track`：远端轨道对象，详见 [RemoteTrack]{@link IRemoteTrack}。
     * - `error`：错误信息。如果对单个用户的音视频轨道订阅失败，会通过这个参数返回错误。
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
     * 取消订阅远端用户的音视频轨道。
     *
     * @param user 远端用户对象。
     * @param mediaType 取消订阅的轨道媒体类型。
     * - `"video"`: 仅取消订阅指定用户的视频轨道。
     * - `“audio”`: 仅取消订阅指定用户的音频轨道。
     * - 如不填，取消订阅该用户发布的所有轨道。
     * - `"datachannel"`: 预留参数。
     * @param channelId 预留参数。
     * @returns 如果指定的音视频轨道不存在会抛出 `TRACK_IS_NOT_SUBSCRIBED` 错误。
     * @category Agora Core
     */
    unsubscribe(user: IAgoraRTCRemoteUser, mediaType?: "video" | "audio" | "datachannel", channelId?: number): Promise<void>;
    /**
     * **自从**
     * <br>&emsp;&emsp;&emsp;*4.11.0*
     *
     * 批量取消订阅远端用户的音视频轨道。
     *
     * ```javascript
     * client.massUnsubscribe([{user:userA}, {user: userB}]);
     * ```
     * @param unsubscribeList 取消订阅的远端用户列表。列表中的每一条都包含以下信息：
     * - `user`：远端用户对象，详见 [AgoraRTCRemoteUser]{@link IAgoraRTCRemoteUser}。
     * - `mediaType`：取消订阅的轨道媒体类型。
     *   - `"video"`: 取消订阅指定用户的视频轨道。
     *   - `"audio"`: 取消订阅指定用户的音频轨道。
     *   - 如不填，取消订阅该用户发布的所有轨道。
     */
    massUnsubscribe(unsubscribeList: {
        user: IAgoraRTCRemoteUser;
        mediaType?: "audio" | "video";
    }[]): Promise<void>;
    /**
     * 设置小流视频属性。
     *
     * 如果你调用 {@link enableDualStream} 开启了双流模式，该方法设置小流的视频属性。
     *
     * 如果你不设置小流的视频属性，SDK 会根据你的视频流属性自动适配小流的视频属性。
     *
     * > 注意事项：
     * > - Firefox 上设置帧率不生效，浏览器会把帧率固定在 30 fps。
     * > - iOS Safari 上不支持设置 `LowStreamParameter.bitrate`，且小流分辨率需要与大流分辨率成比例。
     * > - 由于设备和浏览器的限制，部分浏览器设置视频分辨率可能不会生效，这种情况下浏览器会自动调整分辨率，计费也将按照实际分辨率计算。
     * @param streamParameter - 小流的视频属性。
     * @category Dual Stream
     */
    setLowStreamParameter(streamParameter: LowStreamParameter): void;
    /**
     * 开启双流模式。
     *
     * 该方法为本地流开启双流模式。双流为视频大流和视频小流：
     * - 视频大流指高分辨率、高码率的视频流。
     * - 视频小流指低分辨率、低码率的视频流。小流的视频属性默认值固定为分辨率（宽 × 高） 160 × 120，码率 50 Kbps，帧率 15 fps。如果你不想要使用默认的小流视频属性，可以调用 {@link setLowStreamParameter} 自定义小流参数，防止因小流码率过高而造成带宽压力。
     *
     * > 注意事项：
     * > - `enableDualStream` 对纯音频通话无效。
     * > - Android Chrome 上无法使用 H.264 编码发送大小流。
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
     * 关闭双流模式。
     * @category Dual Stream
     */
    disableDualStream(): Promise<void>;
    /**
     * 设置直播场景中（[mode]{@link ClientConfig.mode} 设为 `"live"`）的用户角色。
     *
     * - 用户角色 (role) 确定用户在 SDK 层的权限，包含是否可以发送流、是否可以接收流、是否可以推流到 CDN 等。用户角色有 `"host"`（主播）和 `"audience"`（观众）。主播既可发布轨道，也可订阅轨道；观众不能进行 {@link publish} 操作。直播场景中的用户角色默认为观众。如需发布音视频，必须先调用本方法切换角色为主播。
     * - 用户角色具体设置包含用户级别 (level)。用户级别确定用户在其权限范围内可以操作和享受到的服务级别。例如对于观众，选择接收低延时还是超低延时的视频流。不同的级别会影响计费。
     *
     * > 注意事项：
     * > - 通信场景（[mode]{@link ClientConfig.mode} 设为 `"rtc"`）无法使用本方法，默认所有用户都是 `"host"` 角色。
     * > - 如果在加入频道后调用该方法切换用户角色，远端会触发 [AgoraRTCClient.on("user-joined")]{@link event_user_joined} 或者 [AgoraRTCClient.on("user-left")]{@link event_user_left} 回调。
     * > - 如果已经调用了 {@link publish}，想要将用户角色切换为 `"audience"` 时，必须先调用 {@link unpublish} 取消发布后再调用本方法，否则会设置失败并抛出异常。
     *
     * @param role 用户角色。
     * @param options 用户具体设置，包含观众延时级别。
     */
    setClientRole(role: ClientRole, options?: ClientRoleOptions): Promise<void>;
    /**
     * **自从**
     * <br>&emsp;&emsp;&emsp;*4.18.0*
     *
     * 部署你的代理服务器。
     *
     * 该方法不能与 {@link startProxyServer} 同时调用，二者区别如下：
     * - `setProxyServer`：自定义代理，可以用于信令传输、日志上传、事件上报等，但不能用于媒体传输。
     * - `startProxyServer`：声网提供的云代理服务，可以传输媒体流、信令等，只需简单设置即可使用。详见[使用云代理服务](https://docs.agora.io/cn/video-call-4.x/cloud_proxy_web_ng?platform=Web)。
     *
     * > 注意事项：
     * > - 该方法必须在 {@link join} 之前调用。
     * > - 在使用 Firefox 浏览器时，跨运营商代理速度会比较慢。声网建议使用同运营商进行代理。如果必须使用跨运营商代理，则避免使用 Firefox 浏览器。
     *
     * @param proxyServer 你的代理服务器域名，ASCII 字符。
     * @category Proxy
     */
    setProxyServer(proxyServer: string): void;
    /**
     * @ignore
     * 部署 TURN 服务器。
     *
     * Agora Web SDK 还提供 {@link startProxyServer} 方法支持云代理服务。
     *
     * > 该方法必须在 {@link join} 之前调用。
     *
     * @param turnServer - TURN 服务器配置。
     * @category Proxy
     */
    setTurnServer(turnServer: TurnServerConfig): void;
    /**
     * 开启云代理服务。
     *
     * 该方法必须在加入频道前或离开频道后调用。
     *
     * 使用云代理服务还需要一些额外设置，详见[使用云代理服务](https://docs.agora.io/cn/Interactive%20Broadcast/cloud_proxy_web_ng?platform=Web)。
     *
     * @param mode 云代理模式：
     * - `3`: UDP 协议的云代理，即 Force UDP 云代理模式。在该模式下，SDK 始终通过 UDP 协议传输数据。
     * - `5`: TCP（加密）协议的云代理，即 Force TCP 云代理模式。在该模式下，SDK 始终通过 TLS 443 传输数据。
     *
     * > 注意事项：
     * > 自 v4.15.0 起，`mode` 的默认值为 `3`。
     *
     * @category Proxy
     */
    startProxyServer(mode?: number): void;
    /**
     * 关闭云代理服务。
     *
     * 该方法必须在加入频道前或离开频道后调用。
     * @category Proxy
     */
    stopProxyServer(): void;
    /**
     * 设置订阅特定远端用户的视频类型。
     *
     * 如果远端用户开启了双流模式，该用户会发送两路视频流（一路大流和一路小流）。你可以通过 `setRemoteVideoStreamType` 在接收端选择订阅该用户的大流还是小流。如不设置，默认订阅大流。
     *
     * > 该方法只可在发送端通过 {@link enableDualStream} 开启双流模式的情况下使用。
     * > 如果该方法和 {@link setStreamFallbackOption} 都调用了，实际订阅的视频流类型取决于在 {@link setStreamFallbackOption} 中设置的回退策略。
     *
     * @param uid 远端用户的 ID。
     * @param streamType 订阅的视频流类型，0 代表大流，1 代表小流，详见 {@link RemoteStreamType}。
     * @category Dual Stream
     */
    setRemoteVideoStreamType(uid: UID, streamType: RemoteStreamType): Promise<void>;
    /**
     * 设置订阅所有远端用户的视频类型。
     *
     * 如果远端用户开启了双流模式，本地用户调用 `subscribe` 后会直接订阅本方法中 `streamType` 参数所指定的流类型。如不设置，默认订阅大流。
     *
     * > - 建议在加入频道前调用 `setRemoteDefaultVideoStreamType`。
     * > - 如果你调用了 {@link setRemoteVideoStreamType} 指定某个用户的流类型，则以该调用为准。
     *
     * @param streamType 订阅的视频流类型，0 代表大流，1 代表小流，详见 {@link RemoteStreamType}。
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
     * 设置远端用户音视频流回退策略。
     *
     * 该方法用于设置在弱网情况下订阅音视频流的回退策略。网络不理想的情况下，为保证通话质量，可以选择自动订阅视频小流（低分辨率、低码率视频流）或者仅订阅音频流。
     *
     * 开启自动回退之后，当订阅流从视频大流回退为视频小流或从视频小流恢复为视频大流时，本地会触发
     * [AgoraRTCClient.on("stream-type-changed")]{@link event_stream_type_changed} 回调。当订阅流回退为音频流或从音频流恢复为音视频流时，本地会触发 [AgoraRTCClient.on("stream-fallback")]{@link event_stream_fallback} 回调。
     *
     * > 该方法仅在发送端[开启双流模式]{@link enableDualStream}后生效。
     *
     * @param uid 远端用户的 UID
     * @param fallbackType 回退策略选项，详见 {@link RemoteStreamFallbackType}。
     * @category Dual Stream
     */
    setStreamFallbackOption(uid: UID, fallbackType: RemoteStreamFallbackType): Promise<void>;
    /**
     * 设置加密方案。
     *
     * 该方法用于设置 SDK 内置的加密算法和密钥，开启内置加密功能。
     *
     * 如果该方法设置错误，在发布或者订阅时会触发 [AgoraRTCClient.on("crypt-error")]{@link event_crypt_error} 回调。
     *
     * > 注意事项：
     * > - 同一频道内的所有用户必须设置相同的加密模式、密钥和盐值才能进行互通。
     * > - 该方法必须在加入频道前调用，否则加密不生效。
     * > - 自 v4.7.0 起，用户离开频道后，SDK 会自动关闭加密。如需重新开启加密，你需要在用户再次加入频道前调用该方法。
     * > - 请勿在 CDN 推流场景中使用内置加密功能。
     *
     * @param encryptionMode 加密模式。
     * @param secret ASCII 字符。当用户设置的密码为弱密码时，SDK 会在控制台打印警告信息，提醒用户设置强密码，即密码必须包含大写字母、小写字母、数字和特殊字符，以及长度至少 8 个字符。由于浏览器加密算法限制，密钥长度不能超过 62 个字符。声网推荐你在服务端使用 OpenSSL 生成密钥，详见[媒体流加密](https://docs.agora.io/cn/Video/channel_encryption_web_ng?platform=Web)。
     * @param salt 盐值，仅当加密模式为 `"aes-128-gcm2"` 或 `"aes-256-gcm2"` 时有效。声网推荐你在服务端使用 OpenSSL 生成盐值，详见[媒体流加密](https://docs.agora.io/cn/Video/channel_encryption_web_ng?platform=Web)。
     */
    setEncryptionConfig(encryptionMode: EncryptionMode, secret: string, salt?: Uint8Array): void;
    /**
     * 更新 token。
     *
     * 如果启用了 token 机制，过一段时间后 token 会失效。当收到 [AgoraRTCClient.on("token-privilege-will-expire")]{@link event_token_privilege_will_expire} 回调时, 调用该方法传入新的 token，否则 SDK 会无法和服务器建立连接。
     * @param token 新的 token。
     */
    renewToken(token: string): Promise<void>;
    /**
     * 启用说话者音量提示。
     *
     * 该方法允许 SDK 定期报告正在说话的本地和远端用户及其音量。
     *
     * 启用音量提示后，无论频道中有没有人说话，SDK 都会每两秒触发 [AgoraRTCClient.on("volume-indicator")]{@link event_volume_indicator} 回调。
     *
     * > 如果本地用户离开频道后再加入频道，你需要重新调用 `enableAudioVolumeIndicator`。
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
     * 获取当前通话的统计信息。
     *
     * @returns 通话相关的统计信息。
     */
    getRTCStats(): AgoraRTCStats;
    /**
     * 设置直播推流转码的配置。
     *
     * 该方法用于旁路推流的视图布局及音频设置等。
     *
     * > 使用前请确保已[开通旁路推流](https://docs.agora.io/cn/Interactive%20Broadcast/cdn_streaming_web_ng?platform=Web#前提条件)。
     *
     * @param config 直播转码的设置，详见 {@link LiveStreamingTranscodingConfig}。
     * @category Live Streaming
     */
    setLiveTranscoding(config: LiveStreamingTranscodingConfig): Promise<void>;
    /**
     * 将本地流发布到 CDN。
     *
     * 详见[推流到 CDN](https://docs.agora.io/cn/Interactive%20Broadcast/cdn_streaming_web_ng)。
     *
     * > 注意事项：
     * > - 该方法每次只能增加一路旁路推流地址。
     * > - 移动端不支持推流到 CDN 功能。
     *
     * ```javascript
     * await client.setLiveTranscoding(config);
     * await client.startLiveStreaming("rtmp://xxxx", true);
     * ```
     * @param url 直播推流的地址，ASCII 字符。支持 RTMP 协议。
     * @param transcodingEnabled (可选) 是否启用直播转码。转码是指在旁路推流时对音视频流进行转码处理后，再推送到其他 RTMP 服务器，适用于频道内有多个主播，需要进行混流、合图的场景。如果设为 `true`，需要在调用该方法前先调用 [setLiveTranscoding]{@link IAgoraRTCClient.setLiveTranscoding}。
     * - `true`: 启用转码，需要在调用该方法前先调用 [setLiveTranscoding]{@link IAgoraRTCClient.setLiveTranscoding}。
     * - `false`: （默认）不启用转码，这种情况下需要保证当前用户正在发布。
     * @category Live Streaming
     */
    startLiveStreaming(url: string, transcodingEnabled?: boolean): Promise<void>;
    /**
     * 删除旁路推流地址。
     *
     * 该方法每次只能删除一路旁路推流地址。若需删除多路流，则需多次调用该方法。
     *
     * @param url - 待删除的推流地址。
     * @category Live Streaming
     */
    stopLiveStreaming(url: string): Promise<void>;
    /**
     * @ignore
     * > 注意事项：客户端输入在线媒体流功能即将停服。如果你尚未集成该功能，声网建议你不要使用。详见《部分服务下架计划》。
     *
     * 输入在线媒体流。
     *
     * 该方法通过在服务端拉取视频流并发送到频道中，将正在播出的视频输入到正在进行的直播中。
     * 可主要应用于赛事直播、多人看视频互动等直播场景。详见[输入在线媒体流](https://docs.agora.io/cn/Interactive%20Broadcast/inject_stream_web_ng?platform=Web)。
     *
     * 成功输入媒体流后，该流会出现在频道中，频道内所有用户都会收到 [AgoraRTCClient.on("user-published")]{@link event_user_published} 和 [AgoraRTCClient.on("user-joined")]{@link event_user_joined} 回调，
     * 其中 `uid` 为 666。
     *
     * 输入媒体流的状态会通过 [AgoraRTCClient.on("stream-inject-status")]{@link event_stream_inject_status} 通知。
     *
     * @param url 添加到直播中的视频流 HTTP/HTTPS 地址，ASCII 字符，字符串长度不得超过 1024 字节。支持 RTMP，HLS，HTTP-FLV 协议传输。
     * - 支持的音频编码格式：AAC。
     * - 支持的视频编码格式：H.264 (AVC)。
     * @param config 输入的在线媒体流的设置，详见 {@link InjectStreamConfig}。
     * @category Inject Stream
     */
    addInjectStreamUrl(url: string, config: InjectStreamConfig): Promise<void>;
    /**
     * @ignore
     * > 注意事项：客户端输入在线媒体流功能即将停服。如果你尚未集成该功能，声网建议你不要使用。详见《部分服务下架计划》。
     *
     * 删除输入的在线媒体流。
     *
     * 该方法从直播中删除通过 {@link addInjectStreamUrl} 输入的在线媒体流。
     *
     * 删除后频道內所有用户都会收到 [AgoraRTCClient.on("user-left")]{@link event_user_left} 和 [AgoraRTCClient.on("user-unpublished")]{@link event_user_unpublished} 回调。
     *
     * @category Inject Stream
     */
    removeInjectStreamUrl(): Promise<void>;
    /**
     * 开始跨频道媒体流转发。
     *
     * 调用该方法后，SDK 会触发以下回调：
     * - [AgoraRTCClient.on("channel-media-relay-state")]{@link event_channel_media_relay_state}，报告当前的跨频道媒体流转发状态和错误码。
     *   - 如果转发中途出现异常，该回调中 `state` 为 3，`code` 为错误码。你可以尝试再次调用本方法。
     * - [AgoraRTCClient.on("channel-media-relay-event")]{@link event_channel_media_relay_event}，报告跨频道媒体流转发相关的事件。
     *   - 如果跨频道服务开始向目标频道发送数据包，会触发回调，`code` 为 4.
     *
     * > 注意事项：
     * > - 跨频道媒体流转发功能需要联系 sales@agora.io 开通。
     * > - 该功能不支持 String 型 UID。
     * > - 请在成功加入频道后调用该方法。
     * > - 直播场景下，只有主播可以调用该方法。
     * > - 成功调用该方法后，若你想再次调用该方法，必须先调用 {@link stopChannelMediaRelay} 方法退出当前的转发状态。
     *
     * ```javascript
     * client.startChannelMediaRelay(config).then(() => {
     *   console.log("startChannelMediaRelay success");
     * }).catch(e => {
     *   console.log("startChannelMediaRelay failed", e);
     * })
     * ```
     * @param config - 跨频道媒体流转发参数配置，详见 [ChannelMediaRelayConfiguration]{@link IChannelMediaRelayConfiguration}。
     * @returns Promise 对象。当 Promise resolve 后，表示成功开启了跨频道服务。
     * @category Channel Media Relay
     */
    startChannelMediaRelay(config: IChannelMediaRelayConfiguration): Promise<void>;
    /**
     * 更新媒体流转发的目标频道。
     *
     * 成功开始跨频道转发媒体流后，如果你希望添加或删除媒体流转发的目标频道，可以调用该方法。
     *
     * > 注意事项：
     * > - 请在 {@link startChannelMediaRelay} 后调用该方法，更新媒体流转发的频道。
     * > - 跨频道媒体流转发最多支持 4 个目标频道。
     *
     * @param config - 跨频道媒体流转发参数配置，详见 [ChannelMediaRelayConfiguration]{@link IChannelMediaRelayConfiguration}。
     * @returns Promise 对象。当 Promise resolve 后，表示更新成功，否则更新失败。出错后跨频道媒体流转发状态会被重置，你需要调用 {@link startChannelMediaRelay} 重新开始跨频道媒体流转发。
     * @category Channel Media Relay
     */
    updateChannelMediaRelay(config: IChannelMediaRelayConfiguration): Promise<void>;
    /**
     * 停止跨频道媒体流转发。
     *
     * 一旦停止转发，用户会退出所有的目标频道。
     *
     * @returns Promise 对象。当 Promise resolve 后，表示成功停止了跨频道服务。
     * @category Channel Media Relay
     */
    stopChannelMediaRelay(): Promise<void>;
    /**
     * 自定义事件上报，用于将自定义的数据格式上报到声网的数据中心。
     *
     * > - 目前支持 5s 内最多上报 20 条事件。
     *
     * @param reports 上报的事件，允许一次上传多条事件。
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
     * **自从**
     * <br>&emsp;&emsp;&emsp;*4.1.0*
     *
     * 获取本地音频相关信息。
     *
     */
    getLocalAudioStats(): LocalAudioTrackStats;
    /**
     * **自从**
     * <br>&emsp;&emsp;&emsp;*4.1.0*
     *
     * 获取远端用户的音频相关信息。
     *
     * > Note: 统计信息需要在订阅远端流后进行计算，可能耗费 0-3 秒时间。你可以循环调用该方法。
     *
     */
    getRemoteAudioStats(): {
        [uid: string]: RemoteAudioTrackStats;
    };
    /**
     * **自从**
     * <br>&emsp;&emsp;&emsp;*4.2.0*
     *
     * 获取本地订阅的所有远端用户的上下行网络质量。
     *
     */
    getRemoteNetworkQuality(): {
        [uid: string]: NetworkQuality;
    };
    /**
     * 获取本地视频相关信息。
     *
     * > 注意事项：iOS 上无法获取到 `encodeDelay` 字段。
     *
     */
    getLocalVideoStats(): LocalVideoTrackStats;
    /**
     * **自从**
     * <br>&emsp;&emsp;&emsp;*4.1.0*
     *
     * 获取远端用户的视频统计信息。
     *
     * > Note: 统计信息需要在订阅远端流后进行计算，可能耗费 0-3 秒时间。你可以循环调用该方法。
     *
     */
    getRemoteVideoStats(): {
        [uid: string]: RemoteVideoTrackStats;
    };
    /**
     *
     * 开启视频截图上传。
     *
     * 开启视频截图上传后，SDK 会根据你在 [InspectConfiguration]{@link InspectConfiguration} 中设置的类型和频率，对本地用户发送的视频进行截图并上传。
     * 截图完成后，声网服务器会以 HTTPS 请求的形式，向你的服务器发送回调通知，并将所有截图发送至你指定的第三方云存储。
     *
     * > - 调用该方法前，请确保满足以下要求：
     * >   - 已经[联系技术支持](https://agora-ticket.agora.io/)开通声网视频截图上传服务。
     * >   - 本地用户已加入频道，本地视频轨道已经发布且正在播放。
     * > - SDK 目前支持的最高截图频率为 1000 毫秒/次。
     *
     * ```javascript
     * client.enableContentInspect({
     *   // 设置每 5000ms 对本地视频轨道截一次图
     *   interval:5000,
     *   // 设置第三方云存储地址的前缀
     *   ossFilePrefix:`${channelName}/${uid}`,
     *   // 设置附加信息，附加信息随截图一起发送给你的服务器
     *   extraInfo:"fromAgora",
     * })
     * ```
     *
     * @param inspectConfig 视频截图上传配置。
     */
    enableContentInspect(inspectConfig: InspectConfiguration): Promise<void>;
    /**
     *
     * 关闭视频截图上传。
     */
    disableContentInspect(): Promise<void>;
    /**
     * 关闭第三方视频审核服务。
     *
     * @param enabled 默认为 `false` 且只能设为 `false`。
     */
    setImageModeration(enabled: false): Promise<void>;
    /**
     * 开启和配置第三方视频审核服务。
     *
     * 调用该方法后，SDK 会触发 [image-moderation-connection-state-change]{@link event_image_moderation_connection_state_change} 回调，并且对本地用户发送的视频进行截图、发送给第三方服务商进行审核。
     *
     * > - 调用该方法前，请确保满足以下要求：
     * >   - 已经开通第三方视频审核服务。
     * >   - 本地用户已加入频道，本地视频轨道已经发布并且处于启用状态。
     *
     * @param enabled 默认为 `true` 且只能设为 `true`。
     * @param config 视频审核服务的配置。详见 {@link ImageModerationConfiguration}。
     */
    setImageModeration(enabled: true, config: ImageModerationConfiguration): Promise<void>;
    /**
     * @ignore
     */
    setLicense(license: string): void;
    /**
     *
     * **自从**
     * <br>&emsp;&emsp;&emsp;*4.16.0*
     *
     * 配置声网混合云或私有化平台的相关服务。
     *
     * 成功部署声网混合云或私有化平台并在内网终端集成 Agora Web SDK 后，你可以调用该方法设置访问节点和相关服务。
     * 联系 [sales@agora.io](mailto:sales@agora.io) 了解和部署声网混合云或声网私有化平台。
     *
     * > Note:
     * > - 使用混合云或私有化平台时，不支持开启云代理服务，因此该方法不能与 {@link startProxyServer} 一起调用。
     * > - 成功配置混合云或私有化平台后，SDK 如果直接连接 SD-RTN™ 失败，将不会自动切换到 TCP/TLS 443 通道，即不会再触发 `join-fallback-to-proxy` 回调。
     * > - 由于 [Chrome 已知问题](https://bugs.chromium.org/p/chromium/issues/detail?id=1290390)，使用该接口过程中 Chrome 控制台可能会误报错误信息提示，开发者可以忽略。
     *
     * ```javascript
     * client.setLocalAccessPointsV2({
     *   accessPoints: {
     *     serverList:["192.168.1.1","192.168.2.2"],
     *     domain: 'test.agora.io'
     *   },
     *   log:{
     *      hostname:"abc.com",
     *      port: 3000
     *   },
     *   report:{}
     * })
     * ```
     *
     * @param config 混合云或私有化平台的配置参数。详见 {@link LocalAccessPointConfig}。
     */
    setLocalAccessPointsV2(config: LocalAccessPointConfig): void;
}

/**
 * AgoraSDK 的错误码对象
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
 * 频道内的远端用户信息，可以通过 [AgoraRTCClient.remoteUsers]{@link IAgoraRTCClient.remoteUsers} 或者 [AgoraRTCClient.on("user-joined")]{@link IAgoraRTCClient.event_user_joined} 等事件获取。
 *
 * 该对象描述了频道内远端用户的当前状态，包括远端用户 ID、远端是否发布了音频或视频等。
 *
 * 如果检测到远端用户已经发布，可以将这个对象传入 [AgoraRTCClient.subscribe]{@link subscribe} 中发起订阅，订阅成功后可以通过本对象的 [audioTrack]{@link IAgoraRTCRemoteUser.audioTrack} 或者 [videoTrack]{@link IAgoraRTCRemoteUser.videoTrack} 字段获取远端音视频轨道对象用于播放。
 * @public
 */
export declare interface IAgoraRTCRemoteUser {
    /**
     * 远端用户的用户 ID。
     */
    uid: UID;
    /**
     * 如果成功订阅了远端用户的音频，这里会保存远端的音频轨道对象。
     */
    audioTrack?: IRemoteAudioTrack;
    /**
     * 如果成功订阅了远端用户的视频，这里会保存远端的视频轨道对象。
     */
    videoTrack?: IRemoteVideoTrack;
    /**
     * 远端当前是否在发送音频。
     * - `true`: 远端用户在发送音频。
     * - `false`: 远端用户没有在发送音频。
     */
    hasAudio: boolean;
    /**
     * 远端当前是否在发送视频。
     * - `true`: 远端用户在发送视频。
     * - `false`: 远端用户没有在发送视频。
     */
    hasVideo: boolean;
    /**
     * @ignore
     */
    dataChannels?: IRemoteDataChannel[];
}

/**
 * 直接通过音频数据源创建的音频轨道，继承于 [LocalAudioTrack]{@link ILocalAudioTrack}, 在此之上提供了控制音频数据处理流程的功能（开始/暂停/跳转等等）。
 *
 * 可以通过 [AgoraRTC.createBufferSourceAudioTrack]{@link IAgoraRTC.createBufferSourceAudioTrack} 来获取。
 */
export declare interface IBufferSourceAudioTrack extends ILocalAudioTrack {
    /**
     * 创建时指定的 [source]{@link BufferSourceAudioTrackInitConfig.source} 值。
     */
    source: string | File | AudioBuffer | null;
    /**
     * 当前音频数据源的处理状态（开始/暂停/停止）。
     */
    currentState: AudioSourceState;
    /**
     * 音频总时长，单位为秒。
     */
    duration: number;
    /**
     * **自从**
     * <br>&emsp;&emsp;&emsp;*4.18.0*
     *
     * 当前音频文件的播放速度。取值范围为 [50,400]，其中：
     * - `50`: 0.5 倍速。
     * - `100`: （默认）原始速度。
     * - `400`: 4 倍速。
     */
    playbackSpeed: number;
    /**
     * @param event 事件名称。
     * @param listener 详见 [source-state-change]{@link event_source_state_change}。
     */
    on(event: "source-state-change", listener: typeof event_source_state_change): void;
    /**
     * 当指定的事件触发时，会调用传入的回调函数。
     * @param event 事件名称。
     * @param listener 回调函数。
     */
    on(event: string, listener: Function): void;
    /**
     * 获取当前的音频处理的进度，单位为秒。
     *
     * @returns 当前音频处理的进度。
     */
    getCurrentTime(): number;
    /**
     * 开始处理音频数据源。
     *
     * > 开始处理音频数据源说明我们已经将音频数据送入 SDK 的处理节点。如果此时该音频轨道已发布，远端可以听到该音源的声音。
     * > 只有在调用 [[play]] 之后，音频数据才会送入声卡，此时本地才能听到该音源的声音。
     *
     * @param options 音频数据源处理的相关设置，包括是否需要循环播放/开始播放的位置。详见 [[AudioSourceOptions]]。
     */
    startProcessAudioBuffer(options?: AudioSourceOptions): void;
    /**
     * 暂停处理音频数据。
     */
    pauseProcessAudioBuffer(): void;
    /**
     * 跳转到指定时间。
     *
     * @param time 指定的音频时间，单位为秒。
     */
    seekAudioBuffer(time: number): void;
    /**
     * 恢复被暂停的音频数据处理。
     */
    resumeProcessAudioBuffer(): void;
    /**
     * 停止处理音频数据。
     */
    stopProcessAudioBuffer(): void;
    /**
     * **自从**
     * <br>&emsp;&emsp;&emsp;*4.18.0*
     *
     * 设置当前音频文件的播放速度。
     *
     * 在加入频道前和加入频道后，你都可以调用该方法。
     *
     * @param speed 播放速度。取值范围为 [50,400]，其中：
     * - `50`: 0.5 倍速。
     * - `100`: （默认）原始速度。
     * - `400`: 4 倍速。
     */
    setAudioBufferPlaybackSpeed(speed: number): void;
}

/**
 * 本地摄像头视频轨道，继承于 [LocalVideoTrack]{@link ILocalVideoTrack}，并在此基础上提供了更换采集设备/调整编码参数的功能。
 *
 * 可以通过 [AgoraRTC.createCameraVideoTrack]{@link IAgoraRTC.createCameraVideoTrack} 来获取。
 */
export declare interface ICameraVideoTrack extends ILocalVideoTrack {
    /**
     * 设置负责采集视频数据的摄像头设备。
     *
     * > 在发布前和发布后均可调用此方法。
     *
     * @param deviceId 设备 ID，支持通过以下方式传入：
     * - 传入字符串：传入通过 [AgoraRTC.getCameras]{@link IAgoraRTC.getCameras} 获取的 `deviceId`。
     * - 传入对象：自 4.19.0 起，你可以传入一个包含 `facingMode` 或 `deviceId` 的对象，但只能指定其中一个属性的值。其中 `deviceId` 通过 [AgoraRTC.getCameras]{@link IAgoraRTC.getCameras} 获取，`facingMode` 支持设为以下值：
     *   - `"environment"`: 使用后置摄像头。
     *   - `"user"`: 使用前置摄像头。
     */
    setDevice(deviceId: string | RequiredOnlyOneOf<{
        facingMode: VideoFacingModeEnum;
        deviceId: string;
    }>): Promise<void>;
    /**
     * **自从**
     * <br>&emsp;&emsp;&emsp;*4.0.0*
     *
     * 启用/禁用该轨道。
     *
     * 轨道禁用后，播放和发布都将被停止。
     *
     * > - 禁用轨道不会触发 [LocalTrack.on("track-ended")]{@link event_track_ended} 事件。
     * > - 如果该轨道已发布，禁用轨道后，远端会触发 [user-unpublished]{@link IAgoraRTCClient.event_user_unpublished} 事件。重新启用后，远端会触发 [user-published]{@link IAgoraRTCClient.event_user_published} 事件。
     * > - `setEnabled` 和 `setMuted` 不能同时调用。
     *
     * @param enabled 是否启用该轨道:
     * - `true`: 启用该轨道.
     * - `false`: 禁用该轨道.
     */
    setEnabled(enabled: boolean): Promise<void>;
    /**
     * **自从**
     * <br>&emsp;&emsp;&emsp;*4.19.0*
     *
     * 复制当前的视频轨道对象，生成一个新的视频轨道。
     *
     * 在视频会议、在线教育等场景中，你可以用该方法实现同一视频流的两路显示，并为每路显示设置不同的分辨率、帧率、码率等参数。
     *
     * @param config 新生成视频轨道的编码配置。你可以通过 [[VideoEncoderConfiguration]] 传入 SDK 内置的编码配置；也可以通过传入一个 [[VideoEncoderConfigurationPreset]] 来自定义视频编码配置。
     * @param cloneTrack 是否克隆当前轨道。默认为 `true`。
     * @returns 新生成的视频轨道。
     */
    clone(config?: VideoEncoderConfiguration | VideoEncoderConfigurationPreset, cloneTrack?: boolean): ICameraVideoTrack;
}

/**
 * 跨频道媒体流转发的配置。
 *
 * 在调用 [startChannelMediaRelay]{@link IAgoraRTCClient.startChannelMediaRelay} 和 [updateChannelMediaRelay]{@link IAgoraRTCClient.updateChannelMediaRelay} 时，通过该接口设置跨频道媒体流转发的具体信息。
 *
 * ```javascript
 * const configuration = AgoraRTC.createChannelMediaRelayConfiguration();
 * configuration.setSrcChannelInfo({ channelName: "test", token: "xxx", uid: 12345 });
 * configuration.addDestChannelInfo({ channelName: "test2", token: "xxx", uid: 23456 });
 * ```
 */
export declare interface IChannelMediaRelayConfiguration {
    /**
     * 设置源频道信息。
     *
     * ```javascript
     * const config = AgoraRTC.createChannelMediaRelayConfiguration();
     * config.setSrcChannelInfo({ channelName: "test", token: "xxx", uid: 123456 });
     * ```
     * @param info - 频道信息，详见 [ChannelMediaRelayInfo]{@link ChannelMediaRelayInfo}。
     */
    setSrcChannelInfo(info: ChannelMediaRelayInfo): void;
    /**
     * 添加目标频道信息。
     *
     * 如果你想将流转发到多个目标频道，可以多次调用该方法。该方法支持最多设置 4 个目标频道。
     *
     * ```javascript
     * const config = AgoraRTC.createChannelMediaRelayConfiguration();
     * config.addDestChannelInfo({ channelName: "test2", token: "xxx", uid: 23456 });
     * config.addDestChannelInfo({ channelName: "test3", token: "xxx", uid: 23457 });
     * ```
     *
     * @param info - 频道信息，详见 [ChannelMediaRelayInfo]{@link ChannelMediaRelayInfo}。
     */
    addDestChannelInfo(info: ChannelMediaRelayInfo): void;
    /**
     * 删除通过 {@link addDestChannelInfo} 添加的目标频道。
     *
     * @param channelName - 待删除的目标频道名。
     */
    removeDestChannelInfo(channelName: string): void;
}

/** @ignore */
export declare interface IDataChannel extends EventEmitter {
    readonly id: number;
    readonly maxRetransmits: number | null;
    readonly ordered: boolean;
    readonly readyState: RTCDataChannelState;
    readonly metadata: string;
    getChannelId(): number;
    getConfig(): IDataChannelConfig;
}

/** @ignore */
export declare interface IDataChannelConfig {
    id: number;
    /**
     * 表示通过 RTCDataChannel 的信息的到达顺序需要和发送顺序一致 (true), 或者到达顺序不需要和发送顺序一致 (false). 默认：true.
     */
    ordered: boolean;
    /**
     * 0~512
     */
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
 * 基础本地音频轨道，提供了本地音频轨道的主要功能。
 *
 * 可以通过 [AgoraRTC.createCustomAudioTrack]{@link IAgoraRTC.createCustomAudioTrack} 来获取。
 *
 * - 通过麦克风采集到的本地音频轨道对象 [MicrophoneAudioTrack]{@link IMicrophoneAudioTrack} 继承于此接口，并在本接口的基础上提供了一些麦克风独有的功能。
 * - 通过音频文件获取到的本地音频轨道对象 [BufferSourceAudioTrack]{@link IBufferSourceAudioTrack} 继承于此接口，并在本接口的基础上提供了一些音频文件独有的功能。
 */
export declare interface ILocalAudioTrack extends ILocalTrack {
    /**
     * 设置本地音频轨道的音量。
     * @param volume 音量值，范围 [0, 1000], 0 代表静音，100 代表原始音量。100 以上会使用 WebAudio 进行音量增益。如果本地音频轨道已经发布，修改音量会影响远端听到的音量大小。
     */
    setVolume(volume: number): void;
    /**
     * 获取本地音频轨道的音量等级。
     *
     * @returns 音量等级值，范围 [0, 1]，1 代表理论最大音量。通常该值大于 0.6 代表用户在持续说话。
     */
    getVolumeLevel(): number;
    /**
     * 设置原始音频数据（PCM）回调。
     *
     * 设置成功后，SDK 会不断地将本地音频轨道的音频帧以 [AudioBuffer](https://developer.mozilla.org/en-US/docs/Web/API/AudioBuffer) 的形式通过回调返回。
     *
     * > 你可以通过 `frameSize` 来设置每次回调中音频帧的大小。该设置也会影响回调的间隔，`frameSize` 越大，每次回调的音频数据越多，回调间隔越长。
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
     * @param audioFrameCallback 用于接收 [AudioBuffer](https://developer.mozilla.org/en-US/docs/Web/API/AudioBuffer) 的回调函数。设为 `null` 后，SDK 就会停止获取音频原始数据。
     * @param frameSize 每次回调的 `AudioBuffer` 中每个声道包含的采样数据个数，只能设为下列值：256, 512, 1024, 2048, 4096, 8192, 16384。默认为 4096。
     */
    setAudioFrameCallback(audioFrameCallback: null | ((buffer: AudioBuffer) => void), frameSize?: number): void;
    /**
     * 播放本地音频轨道。
     *
     * > 播放音频时 SDK 不会创建任何 DOM 元素，所以无需像视频一样提供 DOM 元素。
     */
    play(): void;
    /**
     * **自从**
     * <br>&emsp;&emsp;&emsp;*4.1.0*
     *
     * > 注意事项：
     * > - 自 v4.7.0 起，该方法不再生效。请改用 [IRemoteAudioTrack.setPlaybackDevice]{@link IRemoteAudioTrack.setPlaybackDevice}。
     * > - 该方法只支持桌面端的 Chrome 浏览器，其他浏览器调用将会抛出 `NOT_SUPPORTED` 错误。
     *
     * 设置本地播放远端音频流的设备（扬声器）。
     *
     * @param deviceId 设备 ID，可以通过 [[getPlaybackDevices]] 方法获取。
     */
    setPlaybackDevice(deviceId: string): Promise<void>;
    /**
     * 获取本地音频轨道的质量相关信息。
     *
     * **DEPRECATED**
     * 自 v4.1.0 起废弃，请使用 [AgoraRTCClient.getLocalVideoStats]{@link IAgoraRTCClient.getLocalVideoStats} 和 [AgoraRTCClient.getLocalAudioStats]{@link IAgoraRTCClient.getLocalAudioStats}。
     */
    getStats(): LocalAudioTrackStats;
    /**
     * **自从**
     * <br>&emsp;&emsp;&emsp;*4.10.0*
     *
     * 将 `Processor` 注入本地音频轨道。
     * @param processor `Processor` 实例。每个插件均有对应类型的 `Processor`。
     *
     * @returns `Processor` 实例。
     */
    pipe(processor: IAudioProcessor): IAudioProcessor;
    /**
     * **自从**
     * <br>&emsp;&emsp;&emsp;*4.10.0*
     *
     * 取消本地音频轨道上注入的 `Processor`。
     */
    unpipe(): void;
    /**
     * **自从**
     * <br>&emsp;&emsp;&emsp;*4.10.0*
     *
     * 本地音频轨道上当前媒体处理链路的最终节点。
     */
    processorDestination: IAudioProcessor;
}

/** @ignore */
export declare interface ILocalDataChannel extends IDataChannel {
    send(data: ArrayBuffer): void;
}

/**
 * `LocalTrack` 为本地轨道的基础类，为音频轨道 [LocalAudioTrack]{@link ILocalAudioTrack} 和视频轨道 [LocalVideoTrack]{@link ILocalVideoTrack} 提供一些公共的方法。
 *
 */
export declare interface ILocalTrack extends ITrack {
    /**
     * @param event 事件名称。
     * @param listener 详见 [track-ended]{@link event_track_ended}。
     */
    on(event: "track-ended", listener: typeof event_track_ended): void;
    /**
     * 添加事件监听器。
     * @param event 事件名称。
     * @param listener 详见 [transceiver-updated]{@link event_transceiver_updated}。
     */
    on(event: "transceiver-updated", listener: typeof event_transceiver_updated): void;
    /**
     * **自从**
     * <br>&emsp;&emsp;&emsp;*4.0.0*
     *
     * 启用/禁用该轨道。
     *
     * 轨道禁用后，播放和发布都将被停止。
     *
     * > - 禁用轨道不会触发 [LocalTrack.on("track-ended")]{@link event_track_ended} 事件。
     * > - 如果该轨道已发布，禁用轨道后，远端会触发 [user-unpublished]{@link IAgoraRTCClient.event_user_unpublished} 事件。重新启用后，远端会触发 [user-published]{@link IAgoraRTCClient.event_user_published} 事件。
     * > - `setEnabled` 和 `setMuted` 不能同时调用。
     *
     * @param enabled 是否启用该轨道:
     * - `true`: 启用该轨道。
     * - `false`: 禁用该轨道。
     */
    setEnabled(enabled: boolean): Promise<void>;
    /**
     * **DEPRECATED**
     * 自 v4.1.0 起废弃，请使用 [AgoraRTCClient.getLocalVideoStats]{@link IAgoraRTCClient.getLocalVideoStats} 和 [AgoraRTCClient.getLocalAudioStats]{@link IAgoraRTCClient.getLocalAudioStats}。
     *
     * 获取本地轨道相关信息。
     *
     * > 注意事项：获取本地视频轨道数据时，iOS 上无法获取到 `encodeDelay` 字段。
     */
    getStats(): LocalVideoTrackStats | LocalAudioTrackStats;
    /**
     * 获取本地轨道的来源描述。
     *
     * @return 可能返回以下值：
     * - 如果是通过 `createMicrophoneAudioTrack` 或 `createCameraVideoTrack` 创建的轨道，返回 [MediaDeviceInfo.label](https://developer.mozilla.org/en-US/docs/Web/API/MediaDeviceInfo/label) 字段。
     * - 如果是通过 `createScreenVideoTrack` 创建的轨道，返回屏幕共享的 `sourceId`。
     * - 如果是 `createCustomAudioTrack` 或 `createCustomVideoTrack` 创建的轨道，返回 [MediaStreamTrack.label](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack/label) 字段。
     */
    getTrackLabel(): string;
    /**
     * 发送或暂停发送该轨道的媒体数据。
     *
     * **自从**
     * <br>&emsp;&emsp;&emsp;*4.6.0*
     *
     * 如果该轨道已发布，调用 `setMuted(true)` 后，远端会触发 [user-unpublished]{@link IAgoraRTCClient.event_user_unpublished} 事件。再调用 `setMuted(false)` 后，远端会触发 [user-published]{@link IAgoraRTCClient.event_user_published} 事件。
     *
     * > - 与 {@link setEnabled} 相比，调用该方法响应速度更快且不影响视频采集状态，详见 [setEnabled 和 setMuted 有什么区别？](https://docs.agora.io/cn/Interactive%20Broadcast/faq/differences_between_setenabled_and_setmuted)。
     * > - `setEnabled` 和 `setMuted` 不能同时调用。
     *
     * @param muted 是否发送该轨道的媒体数据:
     * - `true`: 暂停发送该轨道的媒体数据。
     * - `false`: 恢复发送该轨道的媒体数据。
     */
    setMuted(muted: boolean): Promise<void>;
    /**
     * 关闭本地轨道，并释放相关采集设备。
     *
     * 一旦本地轨道被关闭，就无法再次使用。如需再次使用本地轨道，需要重新创建。
     */
    close(): void;
    /**
     * 本地媒体轨道当前的静音状态。
     */
    muted: boolean;
    /**
     * 本地轨道当前的启用状态。
     */
    enabled: boolean;
}

/**
 * `LocalVideoTrack` 为本地视频轨道的基础类，提供了本地视频轨道的主要功能。
 *
 * 你可以通过 [AgoraRTC.createCustomVideoTrack]{@link IAgoraRTC.createCustomVideoTrack} 或者 [AgoraRTC.createScreenVideoTrack]{@link IAgoraRTC.createScreenVideoTrack} 来获取 `LocalVideoTrack`。
 *
 * 通过摄像头采集到的本地视频轨道对象 [CameraVideoTrack]{@link ICameraVideoTrack} 继承于此接口，并在本接口的基础上提供了一些摄像头独有的功能。
 */
export declare interface ILocalVideoTrack extends ILocalTrack {
    /**
     * @param event 事件名称。
     * @param listener 详见 [track-ended]{@link event_track_ended}。
     */
    on(event: "track-ended", listener: typeof event_track_ended): void;
    /**
     * @param event 事件名称。
     * @param listener 详见 [video-element-visible-status]{@link event_video_element_visible_status}。
     */
    on(event: "video-element-visible-status", listener: typeof event_video_element_visible_status): void;
    /**
     * 添加事件监听器。
     * @param event 事件名称。
     * @param listener 详见 [transceiver-updated]{@link event_transceiver_updated}。
     */
    on(event: "transceiver-updated", listener: typeof event_transceiver_updated): void;
    /**
     * 在页面上播放本地视频轨道。
     *
     * @param element 指定一个 DOM 元素，SDK 将在这个元素下创建 `<video>` 元素播放视频轨道，支持 2 种类型：
     * - `string`: 指定该 DOM 元素的 ID 值。
     * - `HTMLElement`: 直接传入一个 DOM 元素对象。
     * @param config 设置播放参数（镜像/显示模式）。详见 [[VideoPlayerConfig]]。对于本地视频轨道，镜像模式默认开启。
     */
    play(element: string | HTMLElement, config?: VideoPlayerConfig): void;
    /**
     * 获取本地视频轨道的相关信息。
     *
     * **DEPRECATED**
     * 自 v4.1.0 起废弃，请使用 [AgoraRTCClient.getLocalVideoStats]{@link IAgoraRTCClient.getLocalVideoStats} 和 [AgoraRTCClient.getLocalAudioStats]{@link IAgoraRTCClient.getLocalAudioStats}。
     *
     */
    getStats(): LocalVideoTrackStats;
    /**
     * **自从**
     * <br>&emsp;&emsp;&emsp;*4.19.0*
     *
     * 复制当前的视频轨道对象，生成一个新的视频轨道。
     *
     * 在视频会议、在线教育等场景中，你可以用该方法实现同一视频流的两路显示，并为每路显示设置不同的分辨率、帧率、码率等参数。
     *
     * @param config 新生成视频轨道的编码配置。你可以通过 [[VideoEncoderConfiguration]] 传入 SDK 内置的编码配置；也可以通过传入一个 [[VideoEncoderConfigurationPreset]] 来自定义视频编码配置。
     * @param cloneTrack 是否克隆当前轨道。默认为 `true`。
     * @returns 新生成的视频轨道。
     */
    clone(config?: VideoEncoderConfiguration | VideoEncoderConfigurationPreset, cloneTrack?: boolean): ILocalVideoTrack;
    /**
     * @ignore
     *
     * 开启或关闭美颜。
     *
     * > 注意事项：
     * > - 该功能是 SDK 内置的美颜功能，将逐步停止更新。你可以改用升级的美颜插件，详见[使用美颜插件](https://docs.agora.io/cn/Video/beauty_effect_web_ng?platform=Web)。
     * > - 该方法支持以下浏览器：
     * >  - Safari 12 及以上版本。
     * >  - Chrome 65 及以上版本。
     * >  - Firefox 70.0.1 及以上版本。
     * > - 该功能不支持移动端设备。
     * > - 如果开启了双流模式，美颜选项仅对大流生效。
     *
     * @param enabled 是否开启本地美颜功能：
     * - `true`: 开启本地美颜。
     * - `false`: 关闭本地美颜。
     * @param options 美颜效果选项。详见 [[BeautyEffectOptions]]。
     */
    setBeautyEffect(enabled: boolean, options?: BeautyEffectOptions): Promise<void>;
    /**
     * **自从**
     * <br>&emsp;&emsp;&emsp;*4.1.0*
     *
     * 获取当前渲染的视频帧数据。
     *
     * > 只有在播放后才能调用此方法，如果没有调用 [[play]] 则返回空数据。
     *
     * @returns 存储了 RGBA 数据的 `ImageData` 对象。该对象为浏览器原生对象，详见 [ImageData](https://developer.mozilla.org/zh-CN/docs/Web/API/ImageData)。
     */
    getCurrentFrameData(): ImageData;
    /**
     * @ignore
     */
    getCurrentFrameImage(imageType: string, quality: number): Promise<ImageTypedData>;
    /**
     * **自从**
     * <br>&emsp;&emsp;&emsp;*4.2.0*
     *
     * 设置视频传输优化模式。
     *
     * 你可以在视频通话、视频直播或屏幕共享过程中调用此方法动态调整视频的传输优化模式。例如你想要把屏幕共享内容从演示文稿切换为视频时，你可以将传输优化模式从 `"detail"` 切换为 `"motion"`，确保视频画面在网络波动时不会出现卡顿。
     *
     * > 注意事项：该方法只支持 Chrome 浏览器。
     *
     * @param mode 视频传输优化模式：
     * - `"balanced"`: 使用默认的传输优化模式：
     *   - 对于屏幕共享视频流，SDK 默认的优化策略为清晰优先。
     *   - 对于其他视频流，SDK 默认的优化策略为兼顾清晰和流畅，弱网条件下，帧率和分辨率都会被调整。
     * - `"detail"`: 清晰优先。
     *   - SDK 会自动根据你的采集分辨率和帧率设定一个最小码率。即使遭遇网络波动，发送码率也不会低于这个值，从而确保清晰的视频画面。
     *   - 大部分情况下，SDK 不会降低发送分辨率，但是可能会降低帧率。
     * - `"motion"`: 流畅优先。
     *   - SDK 不会启用最小码率策略。遭遇网络波动时，发送端会降低码率来确保接收端的视频画面不会出现中断和卡顿。
     *   - 大部分情况下，SDK 不会降低帧率，但是可能会降低发送分辨率。
     */
    setOptimizationMode(mode: "balanced" | "motion" | "detail"): Promise<void>;
    /**
     * * **自从**
     * <br>&emsp;&emsp;&emsp;*4.8.0*
     *
     * 获取 HTML `<video>` 标签的可见状态和不可见原因。
     *
     * 调用 `localVideoTrack.play` 后 SDK 会创建 [HTML `<video>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video) 标签用于播放视频轨道。当 `localVideoTrack.isPlaying` 为 `true` 却看不到图像时，你可调用该方法进行问题排查。
     *
     * @returns [[CheckVideoVisibleResult]] 对象。如果该方法返回 `undefined`，可能为以下原因：
     * - `localVideoTrack.isPlaying` 为 `false`。
     * - `<video>` 标签不存在。
     * - `<video>` 标签不是通过 `play` 方法调用产生的。
     */
    getVideoElementVisibleStatus(): CheckVideoVisibleResult | undefined;
    /**
     * **自从**
     * <br>&emsp;&emsp;&emsp;*4.10.0*
     *
     * 将 `Processor` 注入本地视频轨道。
     * @param processor `Processor` 实例。每个插件均有对应类型的 `Processor`。
     *
     * @returns `Processor` 实例。
     */
    pipe(processor: IBaseProcessor): IBaseProcessor;
    /**
     * **自从**
     * <br>&emsp;&emsp;&emsp;*4.10.0*
     *
     * 取消本地视频轨道上注入的 `Processor`。
     */
    unpipe(): void;
    /**
     * **自从**
     * <br>&emsp;&emsp;&emsp;*4.10.0*
     *
     * 本地视频轨道上当前媒体处理链路的最终节点。
     */
    processorDestination: IBaseProcessor;
    /**
     * **自从**
     * <br>&emsp;&emsp;&emsp;*4.17.0*
     *
     * 替换本地视频轨道。
     *
     * 该方法在本地视频流发布前或发布后都可以调用：
     * - 在发流前调用，新的视频轨道会在本地播放。
     * - 在发流后调用，远端会接收到新的视频轨道。
     *
     * 新的视频轨道可以通过 {@link ILocalVideoTrack.getMediaStreamTrack} 或者 `mediaStream.getVideoTracks` 方法获取。你可以选择是否停止被替换的视频轨道。
     *
     * > 注意事项：
     * > - 支持 Chrome 65+，Safari 以及最新版 Firefox 浏览器。
     * > - 部分移动设备上该方法可能不生效。
     * > - 建议在相同类型、相同编码配置的视频轨道之间进行替换，原因如下：
     * >   - 如果视频轨道类型不同，例如用 `ScreenVideoTrack` 对象替换 `CameraVideoTrack` 对象，由于 `CameraVideoTrack` 默认开启镜像（详见 {@link VideoPlayerConfig.mirror}），会导致画面发生镜像翻转。
     * >   - 如果编码配置（`encoderConfig`）不同，可能导致实际发送的分辨率或帧率不准。
     * > - 订阅端无法知悉视频轨道被替换。
     * > - 如果需要切换媒体输入设备，推荐使用 {@link ICameraVideoTrack.setDevice} 方法。
     *
     * **示例代码**
     * ```javascript
     * // 原有的本地视频轨道
     * const localVideoTrack = await AgoraRTC.createCameraVideoTrack();
     * // 获取新的视频轨道（方式一）
     * const newTrack = localVideoTrack.getMediaStreamTrack();
     * // 获取新的视频轨道（方式二）
     * const newTrack = await navigator.mediaDevices.getUserMedia({audio: true, video: true}).then(mediaStream => mediaStream.getVideoTracks()[0]);
     * // 替换本地视频轨道，并且停止原有的视频轨道
     * await localVideoTrack.replaceTrack(newTrack, true);
     * ```
     *
     * @param track 新的视频轨道。需要传入一个 [MediaStreamTrack](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack) 对象。
     * @param stopOldTrack 是否停止原有的视频轨道：
     * - 停止原有的视频轨道。
     * - 保留原有的视频轨道。
     */
    replaceTrack(track: MediaStreamTrack, stopOldTrack: boolean): Promise<void>;
    /**
     * 设置视频的编码参数，包括分辨率、帧率、码率。
     *
     * @param config 你可以传入 SDK 预设的视频编码配置 [[VideoEncoderConfigurationPreset]]，也可以传入自定义的 [[VideoEncoderConfiguration]] 对象。
     */
    setEncoderConfiguration(config: VideoEncoderConfiguration | VideoEncoderConfigurationPreset): Promise<void>;
}

/**
 * 视频审核服务的配置。用于 {@link setImageModeration} 方法。
 */
declare interface ImageModerationConfiguration {
    /**
     * 视频截图的间隔 (ms)，最小值为 `1000`。
     */
    interval: number;
}

/**
 * SDK 与第三方视频审核服务之间的连接状态。
 */
declare enum ImageModerationConnectionState {
    /** SDK 正在连接该服务。 */
    CONNECTING = "CONNECTING",
    /** SDK 正在重新连接该服务。 */
    RECONNECTING = "RECONNECTING",
    /** SDK 已连接该服务。 */
    CONNECTED = "CONNECTED",
    /** SDK 断开与该服务的连接。 */
    CLOSED = "CLOSED"
}

export declare interface ImageTypedData {
    buffer: Uint8Array;
    width: number;
    height: number;
}

/**
 * 本地麦克风音频轨道，继承于 [LocalAudioTrack]{@link ILocalAudioTrack}，在此之上提供了更换采集设备的功能。
 *
 * 可以通过 [AgoraRTC.createMicrophoneAudioTrack]{@link IAgoraRTC.createMicrophoneAudioTrack} 来获取。
 */
export declare interface IMicrophoneAudioTrack extends ILocalAudioTrack {
    /**
     * 设置负责采集音频数据的麦克风设备。
     *
     * > 在发布前和发布后均可调用此方法。
     *
     * @param deviceId 指定设备的设备 Id，可以通过 [AgoraRTC.getMicrophones]{@link IAgoraRTC.getMicrophones} 获取。
     */
    setDevice(deviceId: string): Promise<void>;
    /**
     * **自从**
     * <br>&emsp;&emsp;&emsp;*4.0.0*
     *
     * 启用/禁用该轨道。
     *
     * 轨道禁用后，播放和发布都将被停止。
     *
     * > - 禁用轨道不会触发 [LocalTrack.on("track-ended")]{@link event_track_ended} 事件。
     * > - 如果该轨道已发布，禁用轨道后，远端会触发 [user-unpublished]{@link IAgoraRTCClient.event_user_unpublished} 事件。重新启用后，远端会触发 [user-published]{@link IAgoraRTCClient.event_user_published} 事件。
     * > - `setEnabled` 和 `setMuted` 不能同时调用。
     *
     * @param enabled 是否启用该轨道:
     * - `true`: 启用该轨道.
     * - `false`: 禁用该轨道.
     */
    setEnabled(enabled: boolean): Promise<void>;
}

/**
 * @ignore
 * 外部输入的音视频流的配置，用于 [AgoraRTCClient.addInjectStreamUrl]{@link IAgoraRTCClient.addInjectStreamUrl}。
 *
 */
export declare interface InjectStreamConfig {
    /**
     * 输入在线媒体流的音频音量，正整数，100 表示原始音量
     */
    audioVolume?: number;
    /**
     * 输入在线媒体流的音频码率，正整数。单位为 Kbps，默认值为 48。
     */
    audioBitrate?: number;
    /**
     * 输入在线媒体流的音频声道数，支持 1 或者 2，默认为 1。
     */
    audioChannels?: number;
    /**
     * 输入在线媒体流的音频采样率，能设置以下枚举值:
     * - `32000`: 32 kHz。
     * - `44100`: （默认）44.1 kHz。
     * - `48000`: 48 kHz。
     *
     * > 建议目前采用默认值，不要自行设置。
     */
    audioSampleRate?: number;
    /**
     * 输入在线媒体流的视频源高度，默认值为 0，即保留视频源原始高度。
     */
    height?: number;
    /**
     * 输入在线媒体流的视频源宽度，默认值为 0，即保留视频源原始宽度。
     */
    width?: number;
    /**
     * 输入在线媒体流的视频源码率，正整数。单位为 Kbps，默认值为 400。
     */
    videoBitrate?: number;
    /**
     * 输入在线媒体流的视频源帧率，正整数。单位为 fps，默认值为 15。
     */
    videoFramerate?: number;
    /**
     * 输入在线媒体流的视频源 GOP，正整数。单位为帧，默认值为 30。
     */
    /** @EN
     * The video GOP of the injected stream in frames.
     *
     * A positive integer. The default value is 30.
     */
    videoGop?: number;
}

/**
 * 视频截图上传配置，用于 [enableContentInspect]{@link IAgoraRTCClient.enableContentInspect}。
 * @public
 */
export declare interface InspectConfiguration {
    /**
     * 视频截图的间隔（ms），最小值为 `1000`。如果设置的值小于 `1000`，SDK 会自动改为 `1000`。
     */
    interval: number;
    /**
     * 第三方云存储的地址前缀。
     */
    ossFilePrefix?: string;
    /**
     * 附加信息，最大长度为 1024 字节。
     *
     * SDK 会将附加信息和截图一起上传至声网服务器；截图完成后，声网服务器会将附加信息随回调通知一起发送给你的服务器。
     */
    extraInfo?: string;
    /**
     * 功能类型。
     *
     * 使用视频截图上传时，你需要设为 `supervise`。SDK 会对本地用户发送的视频进行截图，并将截图上传到你的第三方云存储。
     */
    inspectType?: ("supervise" | "moderation")[];
}

/**
 * 视频截图上传服务的连接状态。
 */
declare enum InspectState {
    /** SDK 正在连接该服务。 */
    CONNECTING = "CONNECTING",
    /** SDK 正在重新连接该服务。 */
    RECONNECTING = "RECONNECTING",
    /** SDK 已连接该服务。 */
    CONNECTED = "CONNECTED",
    /** SDK 断开与该服务的连接。 */
    CLOSED = "CLOSED"
}

/**
 * 远端音频轨道，调用 [subscribe]{@link IAgoraRTCClient.subscribe} 后通过 [AgoraRTCRemoteUser.audioTrack]{@link IAgoraRTCRemoteUser.audioTrack} 对象获取
 */
export declare interface IRemoteAudioTrack extends IRemoteTrack {
    /**
     * 获取远端音频轨道相关信息。
     *
     * **不推荐使用** 请使用 [AgoraRTCClient.getRemoteAudioStats]{@link IAgoraRTCClient.getRemoteAudioStats} 获取远端音频轨道相关信息。
     *
     * @return 一个 [[RemoteAudioTrackStats]] 对象。
     */
    getStats(): RemoteAudioTrackStats;
    /**
     * 播放远端音频轨道。
     *
     * > 播放音频时 SDK 不会创建任何 DOM 元素，所以无需像视频一样提供 DOM 元素。
     */
    play(): void;
    /**
     * **自从**
     * <br>&emsp;&emsp;&emsp;*4.1.0*
     *
     * 设置音频播放设备，比如扬声器。
     *
     * > 该方法只支持桌面端的 Chrome 浏览器，其他浏览器调用将会抛出 `NOT_SUPPORTED` 错误。
     * @param deviceId 设备 ID，可以通过 [[getPlaybackDevices]] 方法获取。
     */
    setPlaybackDevice(deviceId: string): Promise<void>;
    /**
     * 设置原始音频数据（PCM）回调。
     *
     * 设置成功后，SDK 会不断地将远端音频轨道的音频帧以 [AudioBuffer](https://developer.mozilla.org/en-US/docs/Web/API/AudioBuffer) 的形式通过回调返回。
     *
     * > 你可以通过 `frameSize` 来设置每次回调中音频帧的大小。该设置也会影响回调的间隔，`frameSize` 越大，每次回调的音频数据越多，回调间隔越长。
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
     * @param audioFrameCallback 用于接收 [AudioBuffer](https://developer.mozilla.org/en-US/docs/Web/API/AudioBuffer) 的回调函数。设为 `null` 后，SDK 就会停止获取音频原始数据。
     * @param frameSize 每次回调的 `AudioBuffer` 中每个声道包含的采样数据个数，只能设为下列值：256, 512, 1024, 2048, 4096, 8192, 16384。默认为 4096。
     */
    setAudioFrameCallback(audioFrameCallback: null | ((buffer: AudioBuffer) => void), frameSize?: number): void;
    /**
     * 设置远端音频轨道的播放音量
     * @param volume 音量值，范围 [0, 100]，0 代表静音，100 代表原始音量。
     */
    setVolume(volume: number): void;
    /**
     * 获取远端音频轨道的音量等级。
     *
     * @returns 音量等级值，范围 [0, 1]，1 代表理论最大音量。通常该值大于 0.6 代表用户在持续说话。
     */
    getVolumeLevel(): number;
    /**
     * **自从**
     * <br>&emsp;&emsp;&emsp;*4.13.0*
     *
     * 将 `Processor` 注入远端音频轨道。
     *
     * @param processor `Processor` 实例。每个插件均有对应类型的 `Processor`。
     *
     * @returns `Processor` 实例。
     */
    pipe(processor: IAudioProcessor): IAudioProcessor;
    /**
     * **自从**
     * <br>&emsp;&emsp;&emsp;*4.13.0*
     *
     * 取消远端音频轨道上注入的 `Processor`。
     */
    unpipe(): void;
    /**
     * **自从**
     * <br>&emsp;&emsp;&emsp;*4.13.0*
     *
     * 远端音频轨道上当前媒体处理链路的最终节点。
     */
    processorDestination: IAudioProcessor;
}

/** @ignore */
export declare interface IRemoteDataChannel extends IDataChannel {
}

/**
 * 远端轨道对象的基础类，为远端音频轨道 [RemoteAudioTrack]{@link IRemoteAudioTrack} 和远端视频轨道 [RemoteVideoTrack]{@link IRemoteVideoTrack} 提供一些公共的方法。
 */
export declare interface IRemoteTrack extends ITrack {
    /**
     * @param event 事件名称。
     * @param listener 详见 [first-frame-decoded]{@link event_first_frame_decoded}。
     */
    on(event: "first-frame-decoded", listener: typeof event_first_frame_decoded): void;
    /**
     * 添加事件监听器。
     * @param event 事件名称。
     * @param listener 详见 [transceiver-updated-2]{@link event_transceiver_updated_2}。
     */
    on(event: "transceiver-updated", listener: typeof event_transceiver_updated_2): void;
    /**
     * 获取发布远端轨道的远端用户 ID。
     *
     * @return 远端轨道对应的 `uid`。
     */
    getUserId(): UID;
    /**
     * 获取远端轨道相关信息。
     *
     * **DEPRECATED**
     *
     * 自 v4.1.0 起废弃，请使用 [AgoraRTCClient.getRemoteVideoStats]{@link IAgoraRTCClient.getRemoteVideoStats} 和 [AgoraRTCClient.getRemoteAudioStats]{@link IAgoraRTCClient.getRemoteAudioStats}。
     * @return [[RemoteAudioTrackStats]] 或 [[RemoteVideoTrackStats]] 对象。
     */
    getStats(): RemoteAudioTrackStats | RemoteVideoTrackStats;
}

/**
 * 远端视频轨道。
 *
 * 调用 [subscribe]{@link IAgoraRTCClient.subscribe} 后通过 [AgoraRTCRemoteUser.videoTrack]{@link IAgoraRTCRemoteUser.videoTrack} 对象获取。
 */
export declare interface IRemoteVideoTrack extends IRemoteTrack {
    /**
     * @param event 事件名称。
     * @param listener 详见 [first-frame-decoded]{@link event_first_frame_decoded}。
     */
    on(event: "first-frame-decoded", listener: typeof event_first_frame_decoded): void;
    /**
     * @param event 事件名称。
     * @param listener 详见 [video-element-visible-status]{@link event_video_element_visible_status_2}。
     */
    on(event: "video-element-visible-status", listener: typeof event_video_element_visible_status_2): void;
    /**
     * 添加事件监听器。
     * @param event 事件名称。
     * @param listener 详见 [transceiver-updated-2]{@link event_transceiver_updated_2}。
     */
    on(event: "transceiver-updated", listener: typeof event_transceiver_updated_2): void;
    /**
     * 获取远端视频轨道相关信息。
     *
     * **不推荐使用** 请使用 [AgoraRTCClient.getRemoteVideoStats]{@link IAgoraRTCClient.getRemoteVideoStats} 获取远端视频轨道相关信息。
     *
     * @return 一个 [[RemoteVideoTrackStats]] 对象。
     */
    getStats(): RemoteVideoTrackStats;
    /**
     * 在页面上播放本地视频轨道。
     * @param element 指定一个 DOM 元素，SDK 将在这个元素下创建 `<video>` 元素播放视频轨道，支持 2 种类型：
     * - `string`: 指定该 DOM 元素的 ID 值。
     * - `HTMLElement`: 直接传入一个 DOM 元素对象。
     * @param config 设置播放参数（镜像/显示模式）。详见 [[VideoPlayerConfig]]。对于本地视频轨道，镜像模式默认开启。
     */
    play(element: string | HTMLElement, config?: VideoPlayerConfig): void;
    /**
     * **自从**
     * <br>&emsp;&emsp;&emsp;*4.1.0*
     *
     * 获取当前渲染的视频帧数据。
     *
     * > 只有在播放后才能调用此方法，如果没有调用 [[play]] 则返回空数据。
     *
     * @returns 存储了 RGBA 数据的 `ImageData` 对象。该对象为浏览器原生对象，详见 [ImageData](https://developer.mozilla.org/zh-CN/docs/Web/API/ImageData)。
     */
    getCurrentFrameData(): ImageData;
    /**
     * * **自从**
     * <br>&emsp;&emsp;&emsp;*4.8.0*
     *
     * 获取 HTML `<video>` 标签的可见状态和不可见原因。
     *
     * 调用 `remoteVideoTrack.play` 后 SDK 会创建 [HTML `<video>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video) 标签用于播放视频轨道。当 `remoteVideoTrack.isPlaying` 为 `true` 却看不到图像时，你可调用该方法进行问题排查。
     *
     * @return [[CheckVideoVisibleResult]] 对象。如果该方法返回 `undefined`，可能为以下原因：
     * - `localRemoteTrack.isPlaying` 为 `false`。
     * - `<video>` 标签不存在。
     * - `<video>` 标签不是通过 `play` 方法调用产生的。
     */
    getVideoElementVisibleStatus(): CheckVideoVisibleResult | undefined;
    /**
     * **自从**
     * <br>&emsp;&emsp;&emsp;*4.13.0*
     *
     * 将 `Processor` 注入远端视频轨道。
     *
     * @param processor `Processor` 实例。每个插件均有对应类型的 `Processor`。
     *
     * @returns `Processor` 实例。
     */
    pipe(processor: IBaseProcessor): IBaseProcessor;
    /**
     * **自从**
     * <br>&emsp;&emsp;&emsp;*4.13.0*
     *
     * 取消远端视频轨道上注入的 `Processor`。
     */
    unpipe(): void;
    /**
     * **自从**
     * <br>&emsp;&emsp;&emsp;*4.13.0*
     *
     * 远端视频轨道上当前媒体处理链路的最终节点。
     */
    processorDestination: IBaseProcessor;
}

/**
 * @ignore
 */
export declare interface ITrack extends EventEmitter {
    /**
     * 媒体轨道的类型：
     * - `"audio"`: 音频轨道。
     * - `"video"`: 视频轨道。
     */
    trackMediaType: "audio" | "video";
    /**
     * 媒体轨道是否正在页面上播放。
     * - `true`: 媒体轨道正在页面上播放。
     * - `false`: 媒体轨道没有在页面上播放。
     */
    isPlaying: boolean;
    /**
     * 获取由 SDK 生成的对于媒体轨道来说的唯一 ID。
     *
     * @return 媒体轨道 ID。
     */
    getTrackId(): string;
    /**
     * 获取浏览器原生的 [MediaStreamTrack](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack) 对象。
     *
     * @return 一个 [MediaStreamTrack](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack) 对象。
     */
    getMediaStreamTrack(): MediaStreamTrack;
    /**
     * 获取当前轨道的 [RTCRtpTransceiver](https://developer.mozilla.org/en-US/docs/Web/API/RTCRtpTransceiver) 实例。
     *
     * 该方法目前主要用于视频流的端到端加密（Beta）。
     *
     * > 如果 SDK 发生断线重连，当前轨道对应的 `RTCRtpTransceiver` 实例可能会发生变化。你可以通过当前轨道的 "transceiver-updated" {@link event_transceiver_updated} 事件来获取新的 `RTCRtpTransceiver` 实例。
     *
     * @param type 视频流的类型。详见 {@link StreamType}。
     * @returns 当前轨道的 `RTCRtpTransceiver` 实例。
     */
    getRTCRtpTransceiver(type?: StreamType): RTCRtpTransceiver | undefined;
    /**
     * 在页面上播放媒体轨道。
     *
     * @param element 指定一个 DOM 元素，SDK 将在这个元素下创建 `<video>` 元素播放视频轨道，支持 2 种类型：
     * - `string`: 指定该 DOM 元素的 ID 值。
     * - `HTMLElement`: 直接传入一个 DOM 元素对象。
     */
    play(element?: string | HTMLElement): void;
    /**
     * 停止播放。
     */
    stop(): void;
}

/**
 * 管理 CDN 直播推流转码的接口，在调用 [AgoraRTCClient]{@link IAgoraRTCClient.setLiveTranscoding} 时使用。
 * @public
 */
export declare interface LiveStreamingTranscodingConfig {
    /**
     * 用于直播推流的输出音频的码率，单位为 Kbps。
     *
     * 正整数，默认值为 48，最大值为 128。
     */
    audioBitrate?: number;
    /**
     * 用于直播推流的输出音频的声道数。
     *
     * 建议取 1 或 2。 3、4、5 需要特殊播放器支持：
     * - 1:（默认值）单声道
     * - 2: 双声道
     * - 3: 三声道
     * - 4: 四声道
     * - 5: 五声道
     */
    audioChannels?: 1 | 2 | 3 | 4 | 5;
    /**
     * 用于直播推流的输出音频的采样率。
     *
     * - 32000: 音频采样率 32 kHz。
     * - 44100: 音频采样率 44.1 kHz。
     * - 48000: （默认值）音频采样率 48 kHz。
     */
    audioSampleRate?: 32000 | 44100 | 48000;
    /**
     * 背景色。
     *
     * 默认 0x000000，必须是 16 进制格式。
     */
    backgroundColor?: number;
    /**
     * 推流视频的总高度，默认值 360，单位为像素。
     * - 如果推视频流，`height` 值不得低于 64，否则声网会调整为 64。
     * - 如果推音频流，请将 `width` 和 `height` 设为 0。
     */
    height?: number;
    /**
     * 推流视频的总宽度，默认值 640，单位为像素。
     *
     * - 如果推视频流，`width` 值不得低于 64，否则声网会调整为 64。
     * - 如果推音频流，请将 `width` 和 `height` 设为 0。
     */
    width?: number;
    /**
     * @ignore
     * 低延时模式。
     *
     * **DEPRECATED**
     *
     * 已废弃，不推荐使用。
     * - `true`: 低延时，不保证画质。
     * - `false`: （默认值）高延时，保证画质。
     */
    lowLatency?: boolean;
    /**
     * 用于直播推流的输出视频的码率，单位为 Kbps，默认值 400。
     */
    videoBitrate?: number;
    /**
     * 用于直播推流的输出视频的编码规格。
     *
     * 可以设置为 `66`、`77` 或 `100`。如果设置其他值，声网会统一设为默认值 `100`。
     * - `66`: Baseline 级别的视频编码规格，一般用于低阶或需要额外容错的应用，比如视频通话、手机视频等。
     * - `77`: Main 级别的视频编码规格，一般用于主流消费类电子产品，如 MP4、便携的视频播放器、PSP 和 iPad 等。
     * - `100`:（默认）High 级别的视频编码规格，一般用于广播及视频碟片存储，高清电视。
     */
    videoCodecProfile?: 66 | 77 | 100;
    /**
     * 用于直播推流的输出视频的帧率，单位为 fps，默认值 15。
     *
     * 声网会将高于 30 的帧率设置改为 30。
     */
    videoFrameRate?: number;
    /**
     * 用于直播推流的输出视频的 GOP，单位为帧，默认值 30。
     */
    videoGop?: number;
    /**
     * **DEPRECATED**
     *
     * 用于给直播推流的视频添加水印。
     *
     * 推荐使用 [LiveStreamingTranscodingConfig.watermark]{@link LiveStreamingTranscodingConfig.watermark} 为直播推流的视频添加水印。
     *
     * > 目前推流后台只支持添加一张水印图片
     */
    images?: LiveStreamingTranscodingImage[];
    /**
     * 用于给直播推流的视频添加水印。
     *
     */
    watermark?: LiveStreamingTranscodingImage;
    /**
     * 用于给直播推流的视频添加背景图片。
     *
     */
    backgroundImage?: LiveStreamingTranscodingImage;
    /**
     * 用于管理参与直播推流的视频合图的用户。
     *
     * 最多支持 17 人同时转码合图。
     */
    transcodingUsers?: LiveStreamingTranscodingUser[];
    /**
     * 用户自定义的发送到旁路推流客户端的信息，用于填充 H264/H265 视频中 SEI 帧内容。长度限制：4096字节。关于 SEI 的详细信息，详见 [SEI 帧相关问题](https://docs.agora.io/cn/faq/sei)。
     */
    userConfigExtraInfo?: string;
}

/**
 * 在配置 [LiveStreamingTranscodingConfig]{@link LiveStreamingTranscodingConfig} 时用于添加水印和背景图片。
 * @public
 */
export declare interface LiveStreamingTranscodingImage {
    /**
     * 图片的地址，仅支持在线 PNG 文件。
     */
    url: string;
    /**
     * 图片左上角和视频帧左上角之间的水平距离。
     *
     * 默认值为 `0`，单位为像素。
     */
    x?: number;
    /**
     * 图片左上角和视频帧左上角之间的垂直距离。
     *
     * 默认值为 `0`，单位为像素。
     */
    y?: number;
    /**
     * 图片的宽度。
     *
     * 默认值为 160，单位为像素。
     */
    width?: number;
    /**
     * 图片的高度。
     *
     * 默认值为 160，单位为像素。
     */
    height?: number;
    /**
     * 图片的透明度。
     *
     * 取值范围为 [0.0,1.0]:
     * - 0.0: 图片完全透明。
     * - 1.0: （默认）图片完全不透明。
     */
    alpha?: number;
}

/**
 * 在配置 [LiveStreamingTranscodingConfig]{@link LiveStreamingTranscodingConfig} 时用于管理参与 CDN 直播的视频转码合图的用户。
 * @public
 */
export declare interface LiveStreamingTranscodingUser {
    /**
     * 直播视频上用户视频的透明度, 取值范围为 [0.0,1.0]。
     *
     * - 0.0: 该区域图像完全透明。
     * - 1.0:（默认值）该区域图像完全不透明。
     */
    alpha?: number;
    /**
     * 视频帧高度，默认值 640。
     */
    height?: number;
    /**
     * 直播推流的用户 ID。
     */
    uid: UID;
    /**
     * 视频帧宽度，默认值 360。
     */
    width?: number;
    /**
     * 视频帧左上角的横轴位置，默认值为 0。
     */
    x?: number;
    /**
     * 视频帧左上角的纵轴位置，默认值为 0。
     */
    y?: number;
    /**
     * 直播视频上用户视频帧的图层编号。
     *
     * 整数，取值范围为 [0,100]:
     * - 最小值为 0（默认值），表示该区域图像位于最下层。
     * - 最大值为 100，表示该区域图像位于最上层。
     */
    zOrder?: number;
    /**
     * 直播音频所在声道。取值范围为 [0, 5]，默认值为 0。
     * - 0：（推荐）默认混音设置，最多支持双声道，与主播端上行音频相关
     * - 1：对应主播的音频，推流中位于 FL 声道。如果主播上行为双声道，会先把多声道混音成单声道
     * - 2：对应主播的音频，推流中位于 FC 声道。如果主播上行为双声道，会先把多声道混音成单声道
     * - 3：对应主播的音频，推流中位于 FR 声道。如果主播上行为双声道，会先把多声道混音成单声道
     * - 4：对应主播的音频，推流中位于 BL 声道。如果主播上行为双声道，会先把多声道混音成单声道
     * - 5：对应主播的音频，推流中位于 BR 声道。如果主播上行为双声道，会先把多声道混音成单声道
     */
    audioChannel?: number;
}

/**
 * 混合云/私有化平台的配置参数。用于 {@link setLocalAccessPointsV2} 方法。
 *
 * - `accessPoints`：访问节点，包含以下属性：
 *   - `serverList`：IP 地址列表或 hostname（主机名，用于指定 SDK 访问的 Agora SD-RTN™ 边缘节点）列表。
 *   - `domain`：域名。如果传入的 `serverList` 为 IP 地址列表，SDK 会拼接传入的 IP 地址和 `domain` 生成 hostname 列表。此时 `domain` 用于指定 SDK 接入 Agora SD-RTN™ 的网关。
 *   - `port`：（可选）端口号。如果传入，端口号会和 hostname 拼在一起。
 * - `log`：（可选）日志上传服务。包含可选属性 `hostname` 和 `port`。如果要设置日志上传服务，请确保你已经调用 {@link enableLogUpload} 开启 SDK 的日志上传功能。
 * - `report`：（可选）事件上报服务。默认关闭。包含可选属性 `hostname` 和 `port`。
 * - `cds`：预留参数，暂不支持。
 *
 * 可选属性如果不填，将使用对应的默认值：
 *
 *   |属性|默认值|
 *   |:----:|:----:|
 *   |`log.hostname`| `accessPoints` 所包含的 hostname 列表中的第一个|
 *   |`log.port`|6444|
 *   |`report.hostname`| `accessPoints` 所包含的 hostname 列表中的前两个|
 *   |`report.port`|6443|
 *   |`accessPoints.port`|443|
 *
 *
 * ```javascript
 * client.setLocalAccessPointsV2({
 *   accessPoints: {
 *     serverList:["192.168.1.1","192.168.2.2"],
 *     domain: 'test.agora.io'
 *   },
 *   // 必须先调用 enableLogUpload，下面的日志服务设置才生效
 *   log:{
 *      hostname:"abc.com",
 *      port: 3000
 *   },
 *   // 开启事件上报服务且使用默认值
 *   report:{}
 * })
 * ```
 *
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

/**
 * 本地音频轨道的基本信息，可以通过 [AgoraRTCClient.getLocalAudioStats]{@link IAgoraRTCClient.getLocalAudioStats} 获取。
 * @public
 */
export declare interface LocalAudioTrackStats {
    /**
     * 音频的编码格式。
     *
     * - `"opus"`: 音频编码格式为 OPUS。
     * - `"aac"`: 音频编码格式为 AAC。
     * - `"pcmu"`: 预留参数，暂不支持。
     * - `"pcma"`: 预留参数，暂不支持。
     * - `"g722"`: 预留参数，暂不支持。
     *
     * > Firefox 上无法获取该值。
     */
    codecType?: "opus" | "aac" | "PCMU" | "PCMA" | "G722";
    /**
     * 发送的音频音量等级，范围为 [0,32767]。
     *
     * > 该值通过 WebRTC-Stats 获取，不能确保实时性。如果你想获取当前实时的音量等级，调用 [LocalAudioTrack.getVolumeLevel]{@link ILocalAudioTrack.getVolumeLevel}。
     */
    sendVolumeLevel: number;
    /**
     * 发送的音频码率 (bps)。
     */
    sendBitrate: number;
    /**
     * 发送的音频总字节数 (bytes)。
     */
    sendBytes: number;
    /**
     * 发送的音频总包数。
     */
    sendPackets: number;
    /**
     * 发送的音频总丢包数。
     *
     * > Safari 上无法获取该值。
     */
    sendPacketsLost: number;
    /**
     * 发送音频数据包的抖动 (ms)。
     */
    sendJitterMs: number;
    /**
     * 发送音频数据包的往返时延 (ms)。
     */
    sendRttMs: number;
    /**
     * 发送的音频 400ms 内的丢包率。
     */
    currentPacketLossRate: number;
}

/**
 * 本地视频轨道的基本信息，可以通过 [AgoraRTCClient.getLocalVideoStats]{@link IAgoraRTCClient.getLocalVideoStats} 获取。
 * @public
 */
export declare interface LocalVideoTrackStats {
    /**
     * 视频编码格式。
     *
     * - `"H264"`: 视频编码格式为 H.264。
     * - `"H265"`: 视频编码格式为 H.265。
     * - `"VP8"`: 视频编码格式为 VP8。
     * - `"VP9"`: (Beta) 视频编码格式为 VP9。
     * - `"AV1X"`: 预留参数，暂不支持。
     * - `"AV1"`: 预留参数，暂不支持。
     *
     * > Firefox 上无法获取该值。
     */
    codecType?: "H264" | "H265" | "VP8" | "VP9" | "AV1X" | "AV1";
    /**
     * 发送的视频总字节数 (bytes)。
     */
    sendBytes: number;
    /**
     * 视频发送帧率（fps）。
     *
     * > Firefox 上无法获取该值。
     */
    sendFrameRate?: number;
    /**
     * 视频采集帧率（fps）。
     *
     * > Safari 和 Firefox 上无法获取该值。
     */
    captureFrameRate?: number;
    /**
     * 发送的视频总包数。
     */
    sendPackets: number;
    /**
     * 发送的视频总丢包数。
     *
     * > - Safari 上无法获取该值。
     * > - Firefox 上该字段不准确。
     */
    sendPacketsLost: number;
    /**
     * 发送视频数据包的抖动 (ms)。
     */
    sendJitterMs: number;
    /**
     * 发送视频数据包的往返时延 (ms)。
     */
    sendRttMs: number;
    /**
     * 视频发送的分辨率高度。
     */
    sendResolutionHeight: number;
    /**
     * 视频发送的分辨率宽度。
     */
    sendResolutionWidth: number;
    /**
     * 视频采集的分辨率高度。
     */
    captureResolutionHeight: number;
    /**
     * 视频采集的分辨率宽度。
     */
    captureResolutionWidth: number;
    /**
     * 视频编码延迟（ms）。
     */
    encodeDelay?: number;
    /**
     * 视频发送码率 (bps)。
     */
    sendBitrate: number;
    /**
     * 视频目标发送码率 (bps)，即 {@link VideoEncoderConfiguration} 中设置的码率。
     */
    targetSendBitrate: number;
    /**
     * 视频总时长，单位为秒。
     */
    totalDuration: number;
    /**
     * 视频总卡顿时长，单位为秒。
     */
    totalFreezeTime: number;
    /**
     * 发送的视频 400ms 内的丢包率。
     */
    currentPacketLossRate: number;
}

/**
 * 小流的视频属性，用于 [setLowStreamParameter]{@link IAgoraRTCClient.setLowStreamParameter}。
 * @public
 */
export declare interface LowStreamParameter {
    /**
     * 小流视频的分辨率宽。
     *
     * 可以传入一个 `number`，或一个约束对象，如 `{ max: 1280, min: 720 }`。
     *
     * 关于约束对象的详细说明可以参考 [ConstrainLong]{@link ConstrainLong}。
     */
    width: ConstrainULong;
    /**
     * 小流视频的分辨率高。
     *
     * 可以传入一个 `number`，或一个约束对象，如 `{ max: 720, min: 480 }`。
     *
     * 关于约束对象的详细说明可以参考 [ConstrainLong]{@link ConstrainLong}。
     */
    height: ConstrainULong;
    /**
     * 小流视频的帧率。
     *
     * 可以传入一个 `number`，或一个约束对象，如 `{ max: 30, min: 5 }`。
     *
     * 关于约束对象的详细说明可以参考 [ConstrainLong]{@link ConstrainLong}。
     */
    framerate?: ConstrainULong;
    /**
     * 小流视频的码率，单位为 Kbps。
     */
    bitrate?: number;
}

/**
 * 创建麦克风音频流时的配置对象，用于 [AgoraRTC.createMicrophoneAudioTrack]{@link IAgoraRTC.createMicrophoneAudioTrack}。
 */
export declare interface MicrophoneAudioTrackInitConfig {
    /**
     * 控制音频的编码配置。
     *
     * 你可以通过 [[AudioEncoderConfigurationPreset]] 传入 SDK 内置的编码配置；也可以通过传入一个 [[AudioEncoderConfiguration]] 来自定义音频编码配置。
     *
     * > Firefox 不支持设置音频编码码率。
     */
    encoderConfig?: AudioEncoderConfiguration | AudioEncoderConfigurationPreset;
    /**
     * 是否开启回声消除：
     * - `true`: 开启回声消除。
     * - `false`: 不开启回声消除。
     */
    AEC?: boolean;
    /**
     * 是否开启自动增益：
     * - `true`: 开启自动增益。
     * - `false`: 不开启自动增益。
     */
    AGC?: boolean;
    /**
     * 是否开启噪声抑制：
     * - `true`: 开启噪声抑制。
     * - `false`: 不开启噪声抑制。
     */
    ANS?: boolean;
    /**
     * @ignore
     */
    DTX?: boolean;
    /**
     * 指定麦克风的设备 ID。
     *
     * 你可以通过 [AgoraRTC.getMicrophones]{@link IAgoraRTC.getMicrophones} 来获取当前的麦克风设备列表。
     */
    microphoneId?: string;
    /**
     * @ignore
     * 指定是否音频不路由通过WebAudio
     */
    bypassWebAudio?: boolean;
}

/**
 * 上下行 last mile 网络质量。
 *
 * last mile 是指设备到声网边缘服务器的网络连接。
 *
 * - 本地用户加入频道后，SDK 会每两秒触发一次 [AgoraRTCClient.on("network-quality")]{@link IAgoraRTCClient.event_network_quality} 回调报告本地用户的上下行网络质量。
 * - 可以调用 [AgoraRTCClient.getRemoteNetworkQuality]{@link IAgoraRTCClient.getRemoteNetworkQuality} 方法获取本地订阅的所有远端主播的上下行网络质量。
 *
 * > 该接口报告的网络质量是一个相对值，仅供参考。
 * @public
 */
export declare interface NetworkQuality {
    /**
     * 上行网络质量。
     *
     * 基于上行发送码率、上行丢包率、平均往返时延和网络抖动计算。
     *
     *  - 0: 质量未知。
     *  - 1: 质量极好。
     *  - 2: 用户主观感觉和极好差不多，但码率可能略低于极好。
     *  - 3: 用户主观感受有瑕疵但不影响沟通。
     *  - 4: 勉强能沟通但不顺畅。
     *  - 5: 网络质量非常差，基本不能沟通。
     *  - 6: 网络连接断开，完全无法沟通。
     */
    uplinkNetworkQuality: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    /**
     * 下行网络质量。
     *
     * 基于下行发送码率、下行丢包率、平均往返时延和网络抖动计算。
     *
     *  - 0：质量未知。
     *  - 1：质量极好。
     *  - 2：用户主观感觉和极好差不多，但码率可能略低于极好。
     *  - 3：用户主观感受有瑕疵但不影响沟通。
     *  - 4：勉强能沟通但不顺畅。
     *  - 5：网络质量非常差，基本不能沟通。
     *  - 6: 网络连接断开，完全无法沟通。
     */
    downlinkNetworkQuality: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

/**
 * 远端音频轨道的统计数据，包括连接、传输等基本信息，可以通过 [AgoraRTCClient.getRemoteAudioStats]{@link IAgoraRTCClient.getRemoteAudioStats} 获取。
 * @public
 */
export declare interface RemoteAudioTrackStats {
    /**
     * 传输延迟（ms)。
     *
     * 从远端发送音频到本地接收音频的延迟。
     */
    transportDelay: number;
    /**
     * 音频的编码格式。
     *
     * - `"opus"`: 音频编码格式为 OPUS。
     * - `"aac"`: 音频编码格式为 AAC。
     * - `"pcmu"`: 预留参数，暂不支持。
     * - `"pcma"`: 预留参数，暂不支持。
     * - `"g722"`: 预留参数，暂不支持。
     *
     * > Firefox 上无法获取该值。
     */
    codecType?: "opus" | "aac" | "PCMU" | "PCMA" | "G722";
    /**
     * 音频端到端延迟（ms）。
     *
     * 从远端采集音频到本地播放音频的延迟。该延迟不包括发送端编码和接收端解码的时间。
     */
    end2EndDelay: number;
    /**
     * 接收的音频码率（bps）。
     */
    receiveBitrate: number;
    /**
     * 接收的音频音量等级，范围为 [0,32767]。
     *
     * > 该值通过 WebRTC-Stats 获取，不能确保实时性。如果你想获取当前实时的音量等级，调用 [RemoteAudioTrack.getVolumeLevel]{@link IRemoteAudioTrack.getVolumeLevel}。
     */
    receiveLevel: number;
    /**
     * 接收的音频总字节数。
     */
    receiveBytes: number;
    /**
     * 接收音频延迟 (ms)。
     *
     * 从发送到接收端播放音频的延迟时间。
     *
     * > Safari 和 Firefox 上该字段不准确。
     */
    receiveDelay: number;
    /**
     * 接收的音频总包数。
     */
    receivePackets: number;
    /**
     * 接收的音频总丢包数。
     */
    receivePacketsLost: number;
    /**
     * 接收的音频总丢包率。
     */
    packetLossRate: number;
    /**
     * 接收的音频400ms内的丢包率。
     */
    currentPacketLossRate: number;
    /**
     * 接收的音频总时长，单位为秒。
     */
    totalDuration: number;
    /**
     * 接收的音频总卡顿时长，单位为秒。
     */
    totalFreezeTime: number;
    /**
     * 接收的音频卡顿率。
     */
    freezeRate: number;
    /**
     * 远端发布音频时长
     * 如果为 -1，说明暂时还无法获取发布时长
     */
    publishDuration: number;
}

/**
 * 远端视频流的回退类型，用于 [setStreamFallbackOption]{@link IAgoraRTCClient.setStreamFallbackOption}。
 * @public
 */
export declare enum RemoteStreamFallbackType {
    /** 0: 关闭回退策略，弱网时不对音视频流作回退处理。 */
    DISABLE = 0,
    /** 1:（默认）网络条件较差的情况下，SDK 将自动订阅视频小流。 */
    LOW_STREAM = 1,
    /** 2: 网络较弱时，先尝试订阅视频小流。如果网络环境无法显示视频，则再回退到订阅纯音频流。 */
    AUDIO_ONLY = 2
}

/**
 * 远端视频流的大小类型，可以在 [setRemoteVideoStreamType]{@link IAgoraRTCClient.setRemoteVideoStreamType} 里使用。
 * @public
 */
export declare enum RemoteStreamType {
    /** 0: 高分辨率、高码率的视频大流。 */
    HIGH_STREAM = 0,
    /** 1: 低分辨率、低码率的视频小流。 */
    LOW_STREAM = 1
}

/**
 * 远端视频轨道的统计数据，包括连接、传输等基本信息，可以通过 [AgoraRTCClient.getRemoteVideoStats]{@link IAgoraRTCClient.getRemoteVideoStats} 获取。
 * @public
 */
export declare interface RemoteVideoTrackStats {
    /**
     * 传输延迟（ms)。
     *
     * 从远端发送视频到本地接收视频的延迟。
     */
    transportDelay: number;
    /**
     * 视频编码格式。
     *
     * - `"H264"`: 视频编码格式为 H.264。
     * - `"H265"`: 视频编码格式为 H.265。
     * - `"VP8"`: 视频编码格式为 VP8。
     * - `"VP9"`: (Beta) 视频编码格式为 VP9。
     * - `"AV1X"`: 视频编码格式为 AV1，在 Chrome M96 版本之前。
     * - `"AV1"`: 视频编码格式为 AV1。
     *
     * > Firefox 上无法获取该值。
     */
    codecType?: "H264" | "H265" | "VP8" | "VP9" | "AV1X" | "AV1";
    /**
     * 视频端到端延迟（ms）。
     *
     * 从远端采集视频到本地播放视频的延迟。该延迟不包括发送端编码和接收端解码的时间。
     */
    end2EndDelay: number;
    /**
     * 接收的视频码率（bps）。
     */
    receiveBitrate: number;
    /**
     * 接收视频延迟 (ms)。
     *
     * 从发送到接收端播放视频的延迟时间。
     *
     * > Safari 和 Firefox 上该字段不准确。
     */
    receiveDelay: number;
    /**
     * 接收的视频总字节数。
     */
    receiveBytes: number;
    /**
     * 视频解码帧率（fps）。
     */
    decodeFrameRate?: number;
    /**
     * 视频接收帧率（fps）。
     */
    receiveFrameRate?: number;
    /**
     * 视频渲染帧率（fps）。
     */
    renderFrameRate?: number;
    /**
     * 接收的视频总包数。
     */
    receivePackets: number;
    /**
     * 接收的视频总丢包数。
     */
    receivePacketsLost: number;
    /**
     * 接收的视频丢包率。
     */
    packetLossRate: number;
    /**
     * 接收的视频在400ms内的丢包率。
     */
    currentPacketLossRate: number;
    /**
     * 接收的视频分辨率高度。
     */
    receiveResolutionHeight: number;
    /**
     * 接收的视频分辨率宽度。
     */
    receiveResolutionWidth: number;
    /**
     * 接收的视频总时长，单位为秒。
     */
    totalDuration: number;
    /**
     * 接收的视频总卡顿时长，单位为秒。
     */
    totalFreezeTime: number;
    /**
     * 接收的视频卡顿率。
     */
    freezeRate: number;
    /**
     * 远端发布视频时长
     * 如果为 -1，说明暂时还无法获取发布时长
     */
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
 * 控制 SDK 重连策略，用于 [createClient]{@link createClient} 时传入的客户端配置。
 *
 * SDK 的重连策略如下:
 * - `timeout` 为连接出现错误开始到下次重试的等待时间，默认为 500 ms。
 * - 当请求第一次出现错误时，等待 `timeout` 时间后再次重试。
 * - 当再次重试仍然出现错误时，更新 `timeout` 的值，设 `timeoutFactor` 为更新系数，令 `timeout` = `timeoutFactor` × `timeout`，等待新的 `timeout` 时间后再次重试。
 * - `maxRetryTimeout` 为 `timeout` 可能更新到的最大值，每次 `timeout` 更新时，如果大于这个值，都会被强制设置为这个值。默认是 10000 ms，也就是最多等待 10 秒后重试。
 * - `maxRetryCount` 为可连续重试的最大次数，当重试次数超过这个值后还是错误，就会停止重试直接抛出错误，默认为 `Infinity`，也就是会无限重试。
 *
 * 你可以通过改动这 4 个参数自定义重连策略。
 */
declare interface RetryConfiguration {
    /**
     * 重试间隔时间，默认值 500，单位 ms。
     */
    timeout: number;
    /**
     * 重试间隔时间更新系数。
     *
     * 默认值 1.5。每次重试后，都会将 {@link timeout} 乘以该值更新重试间隔时间。
     */
    timeoutFactor: number;
    /**
     * 允许最大的重试次数。
     *
     * 如果连续失败重试超过该值就会停止重试，触发相应的错误。默认值为 `Infinity`，也就是无限重试。
     */
    maxRetryCount: number;
    /**
     * 允许最大的重试间隔时间。
     *
     * 该值指定重试间隔时间 {@link timeout} 的上限。每次 `timeout` 更新时，如果大于这个值，都会被强制设置为这个值。默认为 10000 ms，也就是最多等待 10 秒后重试。
     */
    maxRetryTimeout: number;
}

/**
 * SDK 预设的 [[VideoEncoderConfiguration]] 配置。
 *
 * 你可以在 [AgoraRTC.createScreenVideoTrack]{@link IAgoraRTC.createScreenVideoTrack} 方法中传入以下预设值来控制屏幕共享视频编码配置。
 *
 * 下表列出了 SDK 所有预设的屏幕共享视频属性配置。
 *
 * | 视频属性 | 分辨率（宽×高） | 帧率（fps） |
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
 * 屏幕共享源的类型。
 * - `"screen"`: 共享屏幕。
 * - `"application"`: 共享某一个 app 的所有窗口。
 * - `"window"`: 共享某一个 app 的某一个窗口。
 * @public
 */
export declare type ScreenSourceType = "screen" | "window" | "application";

/**
 * 创建屏幕共享视频轨道时的配置对象，用于 [AgoraRTC.createScreenVideoTrack]{@link IAgoraRTC.createScreenVideoTrack}。
 */
export declare interface ScreenVideoTrackInitConfig {
    /**
     * 控制屏幕共享视频的编码配置。
     *
     * 你可以通过 [[ScreenEncoderConfigurationPreset]] 传入 SDK 内置的编码配置；也可以通过传入一个 [[VideoEncoderConfiguration]] 来自定义视频编码配置。
     */
    encoderConfig?: VideoEncoderConfiguration | ScreenEncoderConfigurationPreset;
    /**
     * 使用 Electron 屏幕共享时，传入 `sourceId`。
     */
    electronScreenSourceId?: string;
    /**
     * 使用 Chrome 浏览器插件进行屏幕共享时，传入插件的 ID。
     */
    extensionId?: string;
    /**
     * **DEPRECATED**
     *
     * 自 v4.17.1 起废弃，请改用 {@link displaySurface}。
     *
     * 屏幕共享源的类型。
     */
    screenSourceType?: ScreenSourceType;
    /**
     * **自从**
     * <br>&emsp;&emsp;&emsp;*4.0.0*
     *
     * 传输优化模式。设置该值后，SDK 会自动调整码率配置以及使用不同的回退策略。
     * - `"motion"`: 流畅优先。
     *   - SDK 不会启用最小码率策略。遭遇网络波动时，发送端会降低码率来确保接收端的视频画面不会出现中断和卡顿。
     *   - 大部分情况下，SDK 不会降低帧率，但是可能会降低发送分辨率。
     * - `"detail"`: （默认）清晰优先。
     *   - SDK 会自动根据你的采集分辨率和帧率设定一个最小码率。即使遭遇网络波动，发送码率也不会低于这个值，从而确保清晰的视频画面。
     *   - 大部分情况下，SDK 不会降低发送分辨率，但是可能会降低帧率。
     *
     * > 注意事项：该方法只支持 Chrome 浏览器。
     */
    optimizationMode?: "motion" | "detail";
    /**
     * @ignore
     *
     * **自从**
     * <br>&emsp;&emsp;&emsp;*4.18.0*
     *
     * SVC （可伸缩视频编码）配置。
     *
     * 你可以通过 {@link SVCConfigurationPreset} 传入 SDK 预设的 SVC 编码配置，也可以通过 {@link SVCConfiguration} 传入自定义的 SVC 编码配置。
     */
    scalabiltyMode?: SVCConfiguration | SVCConfigurationPreset;
    /**
     * **自从**
     * <br>&emsp;&emsp;&emsp;*4.17.1*
     *
     * 默认选中的共享内容类型，支持设为标签页、应用窗口（如下图）、或屏幕。详见 [displaySurface](https://developer.chrome.com/docs/web-platform/screen-sharing-controls/#displaySurface)。
     *
     * ![](https://wd.imgix.net/image/vvhSqZboQoZZN9wBvoXq72wzGAf1/AaQIUrKKCvoNuaBjvGOM.png?auto=format&w=1600)
     *
     * > 注意事项：该属性仅支持 Chrome 107 及以上版本、Edge 107 及以上版本。
     *
     */
    displaySurface?: "browser" | "window" | "monitor";
    /**
     * **自从**
     * <br>&emsp;&emsp;&emsp;*4.17.1*
     *
     * 是否允许用户共享当前标签页：
     * - `"include"`：（默认）允许用户共享当前标签页。
     * - `"exclude"`：禁止用户共享当前标签页。
     *
     * 详见 [selfBrowserSurface](https://developer.chrome.com/docs/web-platform/screen-sharing-controls/#selfBrowserSurface)。
     *
     * > 注意事项：
     * > - Chrome 107 上该属性的默认值为 `"exclude"`，但 SDK 为保证兼容性将默认值改为了 `"include"`，以免用户升级到 Chrome 107 后无法共享当前标签页。
     * > - 该属性仅支持 Chrome 107 及以上版本、Edge 107 及以上版本。
     */
    selfBrowserSurface?: "include" | "exclude";
    /**
     * **自从**
     * <br>&emsp;&emsp;&emsp;*4.17.1*
     *
     * 是否允许用户动态切换共享的标签页：
     * - `"include"`：（默认）允许用户动态切换共享的标签页。
     * - `"exclude"`：禁止用户动态切换共享的标签页。
     *
     * 详见 [surfaceSwitching](https://developer.chrome.com/docs/web-platform/screen-sharing-controls/#surfaceSwitching)。
     *
     * > 注意事项：该属性仅支持 Chrome 107 及以上版本、Edge 107 及以上版本。
     */
    surfaceSwitching?: "include" | "exclude";
    /**
     * **自从**
     * <br>&emsp;&emsp;&emsp;*4.17.1*
     *
     * 是否允许采集系统音频：
     * - `"include"`：（默认）允许采集系统音频。
     * - `"exclude"`：禁止采集系统音频。
     *
     * 详见 [systemAudio](https://developer.chrome.com/docs/web-platform/screen-sharing-controls/#systemAudio)。
     *
     * > 注意事项：该属性仅支持 Windows 设备上的 Chrome 105 及以上版本、Edge 105 及以上版本。
     */
    systemAudio?: "include" | "exclude";
}

/**
 * @ignore
 */
export declare type SDK_AUDIO_CODEC = "opus" | "pcma" | "pcmu" | "g722";

/**
 * 浏览器使用的编码格式，有以下两种选择：
 * - `"vp8"`: 浏览器使用 VP8 编码。
 * - `"h264"`: 浏览器使用 H.264 编码。
 * - `"h265"`: 浏览器使用 H.265 编码。
 * - `"vp9"`: (Beta) 浏览器使用 VP9 编码。
 * - `"av1"`: 预留，暂不可用。
 *
 * > Safari 12.1 之前版本不支持 VP8 编码。
 * @public
 */
export declare type SDK_CODEC = "h264" | "h265" | "vp8" | "vp9" | "av1";

/**
 * 频道场景。
 *
 * Agora Web SDK 需知道 app 的使用场景（例如通信模式或直播模式），从而使用不同的优化手段。
 *
 * 声网频道支持以下场景:
 * - `"live"`: 直播场景，有主播和观众两种用户角色，可以通过 [setClientRole]{@link IAgoraRTCClient.setClientRole} 方法设置主播和观众的角色。主播可以收发音视频流，而观众只能接收音视频流，无法发送。
 * - `"rtc"`: 通信场景，用于常见的一对一通话或群聊，频道中的任何用户可以自由说话。
 * @public
 */
export declare type SDK_MODE = "live" | "rtc";

declare enum StreamType {
    /** 0: 高分辨率、高码率的视频大流。 */
    HIGH_STREAM = 0,
    /** 1: 低分辨率、低码率的视频小流。 */
    LOW_STREAM = 1
}

declare const SUPPORT_SCREEN_ENCODER_CONFIG_LIST: Record<string, VideoEncoderConfiguration>;

declare const SUPPORT_SVC_CONFIG_LIST: Record<string, SVCConfiguration>;

declare const SUPPORT_VIDEO_ENCODER_CONFIG_LIST: Record<string, VideoEncoderConfiguration>;

/**
 * @ignore
 * **自从**
 * <br>&emsp;&emsp;&emsp;*4.18.0*
 *
 * 自定义的 SVC 编码配置。
 *
 * 你可以在以下方法中传入 `SVCConfiguration` 来控制本地视频的 SVC 编码配置：
 * - [AgoraRTC.createCameraVideoTrack]{@link IAgoraRTC.createCameraVideoTrack}
 * - [AgoraRTC.createCustomVideoTrack]{@link IAgoraRTC.createCustomVideoTrack}
 * - [AgoraRTC.createScreenVideoTrack]{@link IAgoraRTC.createScreenVideoTrack}
 */
export declare interface SVCConfiguration {
    /**
     * SVC 空域层数。
     */
    numSpatialLayers: 1 | 2 | 3;
    /**
     * SVC 时域层数。
     */
    numTemporalLayers: 1 | 3;
}

/**
 * @ignore
 *
 * **自从**
 * <br>&emsp;&emsp;&emsp;*4.18.0*
 *
 * SDK 预设的 SVC 编码配置：
 * - `"1SL1TL"`: 空域层数为 1，时域层数为 1。
 * - `"3SL3TL"`: 空域层数为 3，时域层数为 3。
 * - `"2SL3TL"`: 空域层数为 2，时域层数为 3。
 *
 * 你可以在以下方法中传入这些预设值，来控制本地视频的 SVC 编码配置：
 * - [AgoraRTC.createCameraVideoTrack]{@link IAgoraRTC.createCameraVideoTrack}
 * - [AgoraRTC.createCustomVideoTrack]{@link IAgoraRTC.createCustomVideoTrack}
 * - [AgoraRTC.createScreenVideoTrack]{@link IAgoraRTC.createScreenVideoTrack}
 *
 */
export declare type SVCConfigurationPreset = keyof typeof SUPPORT_SVC_CONFIG_LIST;

/**
 * @ignore
 * TURN 服务器配置，在调用 [setTurnServer]{@link IAgoraRTCClient.setTurnServer} 时使用。
 * @public
 */
export declare interface TurnServerConfig {
    /**
     * TURN 服务器 URL 地址，ASCII 字符。
     */
    turnServerURL: string;
    /**
     * 在 TURN 服务器上使用的密码，ASCII 字符。
     */
    password: string;
    /**
     * 想要添加的 UDP 端口。
     */
    udpport?: number;
    /**
     * 在 TURN 服务器上注册并使用的用户名，ASCII 字符。
     */
    username: string;
    /**
     * 是否启用强制中转：
     * - `true`: 强制所有流由 TURN 服务器进行中转。
     * - `false`: （默认）不强制所有流由 TURN 服务器进行中转。
     */
    forceturn?: boolean;
    /**
     * 想要添加的 TCP 端口。
     */
    tcpport?: number;
    security?: boolean;
}

/**
 * 用于标识用户的 ID。同一频道中每个用户都具有唯一的 ID，且数据类型相同。
 *
 * 为保证最佳的用户体验，声网强烈建议你不要使用字符串作为用户 ID。详见 {@link join} 方法中的说明。
 * @public
 */
export declare type UID = number | string;

/**
 * 定义视频编码参数的配置对象。
 *
 * 你可以在 [AgoraRTC.createCameraVideoTrack]{@link IAgoraRTC.createCameraVideoTrack} 或者 [AgoraRTC.createScreenVideoTrack]{@link IAgoraRTC.createScreenVideoTrack} 方法中传入自定义的视频编码配置。
 *
 * SDK 提供了一些预设视频编码配置，详见 [[VideoEncoderConfigurationPreset]]。
 *
 * > 受操作系统、浏览器影响，实际的码率可能会和设置的取值范围不同。我们建议将码率设置在 100 Kbps 到 5000 Kbps 之间。
 *
 * @public
 */
export declare interface VideoEncoderConfiguration {
    /**
     * 视频的分辨率宽。
     *
     * 支持传入 `number`，或一个约束对象，如 `{ max: 1280, min: 720 }`。
     *
     * 关于约束对象的详细说明可以参考 [ConstrainLong]{@link ConstrainLong}。
     */
    width?: number | ConstrainLong;
    /**
     * 视频的分辨率高。
     *
     * 支持传入 `number`，或一个约束对象，如 `{ max: 1280, min: 720 }`。
     *
     * 关于约束对象的详细说明可以参考 [ConstrainLong]{@link ConstrainLong}。
     */
    height?: number | ConstrainLong;
    /**
     * 视频帧率，单位为 fps。
     *
     * 支持传入 `number`，或一个约束对象，如 `{ max: 30, min: 5 }`。
     *
     * 关于约束对象的详细说明可以参考 [ConstrainLong]{@link ConstrainLong}。
     */
    frameRate?: number | ConstrainLong;
    /**
     * 传输过程中的最小码率，单位为 Kbps。
     */
    bitrateMin?: number;
    /**
     * 传输过程中的最大码率，单位为 Kbps。
     */
    bitrateMax?: number;
    /**
     * @ignore
     */
    scaleResolutionDownBy?: number;
}

/**
 * SDK 预设的 [[VideoEncoderConfiguration]] 配置。
 *
 * 你可以在 [AgoraRTC.createCameraVideoTrack]{@link IAgoraRTC.createCameraVideoTrack} 方法中传入预设的视频编码配置。
 *
 * 下表列出了 SDK 所有内置的视频属性配置，SDK 默认使用 `"480p_1"`。
 *
 * | 视频属性 | 分辨率（宽×高） | 帧率（fps） | 码率（Kbps） | Chrome | Firefox | Safari |
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
 * @public
 */
export declare type VideoEncoderConfigurationPreset = keyof typeof SUPPORT_VIDEO_ENCODER_CONFIG_LIST;

/**
 * 视频轨道的播放配置。用于 [LocalVideoTrack.play]{@link ILocalVideoTrack.play}。
 */
export declare interface VideoPlayerConfig {
    /**
     * 设置是否开启镜像模式：
     * - `true`: 开启镜像模式。
     * - `false`: 关闭镜像模式。
     *
     * > 注意事项：
     * > - 对于本地视频轨道，镜像模式默认开启。
     * > - 对于远端视频轨道，镜像模式默认关闭。
     */
    mirror?: boolean;
    /**
     * 设置视频播放时的显示模式：
     * - `"cover"`: 优先保证视窗被填满。视频尺寸等比缩放，直至整个视窗被视频填满。如果视频长宽与显示窗口不同，则视频流会按照显示视窗的比例进行周边裁剪或图像拉伸后填满视窗。可以参考 CSS 属性中 `object-fit` 的 `cover` 选项。
     * - `"contain"`: 优先保证视频内容全部显示。视频尺寸等比缩放，直至视频窗口的一边与视窗边框对齐。如果视频尺寸与显示视窗尺寸不一致，在保持长宽比的前提下，将视频进行缩放后填满视窗，缩放后的视频四周会有一圈黑边。可以参考 CSS 属性中 `object-fit` 的 `contain` 选项。
     * - `"fill"`: 保证视窗被填满的同时保证视频内容全部显示，但是不保证视频尺寸比例不变。视频的宽高会被拉伸至和视窗尺寸一致。可以参考 CSS 属性中 `object-fit` 的 `fill` 选项。
     *
     * > 注意事项：
     * > - 播放由摄像头采集的本地视频轨道，默认使用 cover 模式；播放用于屏幕共享的视频轨道，默认使用 contain 模式。
     * > - 对于远端视频轨道，因为不知道轨道的类型，默认使用 cover 模式。
     */
    fit?: "cover" | "contain" | "fill";
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

export { }
