import type { IAgoraRTCClient } from 'agora-rtc-sdk-ng';
import type { IAgoraRTCRemoteUser } from 'agora-rtc-sdk-ng';
import type { IRemoteAudioTrack } from 'agora-rtc-sdk-ng';
import type { IRemoteVideoTrack } from 'agora-rtc-sdk-ng';
import type { RemoteAudioTrackStats } from 'agora-rtc-sdk-ng';
import type { RemoteVideoTrackStats } from 'agora-rtc-sdk-ng';

declare class BaseLiveVideoPlayer extends EventEmitter<LiveVideoEvent> {
    client: IAgoraRTCClient;
    host?: IAgoraRTCRemoteUser;
    protected options: IPlayerOptions;
    protected element: HTMLVideoElement;
    protected state: LiveVideoState;
    protected videoState: MediaState;
    protected audioState: MediaState;
    protected pendingRemoteUsers: IAgoraRTCRemoteUser[];
    protected videoTrack?: IRemoteVideoTrack;
    protected audioTrack?: IRemoteAudioTrack;
    protected audioDefer?: Deferred<void>;
    protected videoDefer?: Deferred<void>;
    constructor(options: IPlayerOptions);
    private onAutoplayFailed;
    private setState;
    private setVideoState;
    private setAudioState;
    private createElement;
    private join;
    private reset;
    private recreate;
    setVolume(volume: number): number;
    getVolume(): number;
    protected playAudio(): Promise<void>;
    protected playVideo(): Promise<void>;
    private pauseAudio;
    private pauseVideo;
    protected playRemoteUser(user: IAgoraRTCRemoteUser | undefined): Promise<void>;
    protected onUserJoined: (user: IAgoraRTCRemoteUser) => Promise<void>;
    private onUserLeft;
    private onUserUnpublished;
    private onUserPublished;
    private bindEvents;
    private unbindEvent;
    protected _retry(): Promise<boolean>;
    protected _pause(stop?: boolean): Promise<void>;
    protected _play(): Promise<void>;
    protected _switch(url: string): Promise<void>;
    protected create(): Promise<void>;
    getStats(): {
        video: RemoteVideoTrackStats | undefined;
        audio: RemoteAudioTrackStats | undefined;
    } | undefined;
    protected _destroy(): Promise<void>;
}

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

/**
 * `EventEmitter` 类提供了定义、触发和处理事件的方式。
 */
/**@en
 * The `EventEmitter` class provides a way to define, emit, and handle events.
 */
declare class EventEmitter<E extends string> {
    private _events;
    /**
     * @public
     * 指定一个事件名，获取当前所有监听这个事件的回调函数。
     *
     * @param event - 事件名称。
     */
    /**@en
     * Gets all the listeners for a specified event.
     *
     * @param event The event name.
     */
    getListeners(event: E): Function[];
    /**
     * @public
     * 监听一个指定的事件，当事件触发时会调用传入的回调函数。
     *
     * @param event - 指定事件的名称。
     * @param listener - 传入的回调函数。
     */
    /**@en
     * Listens for a specified event.
     *
     * When the specified event happens, the SDK triggers the callback that you pass.
     * @param event The event name.
     * @param listener The callback to trigger.
     */
    on(event: E, listener: Function): void;
    /**
     * @public
     * 监听一个指定的事件，当事件触发时会调用传入的回调函数。
     *
     * 当监听后事件第一次触发时，该监听和回调函数就会被立刻移除，也就是只监听一次指定事件。
     *
     * @param event - 指定事件的名称。
     * @param listener - 传入的回调函数。
     */
    /**@en
     * Listens for a specified event once.
     *
     * When the specified event happens, the SDK triggers the callback that you pass and then removes the listener.
     * @param event The event name.
     * @param listener The callback to trigger.
     */
    once(event: E, listener: Function): void;
    /**
     * @public
     * 取消一个指定事件的监听。
     *
     * @param event - 指定事件的名称。
     * @param listener - 监听事件时传入的回调函数。
     */
    /**@en
     * Removes the listener for a specified event.
     *
     * @param event The event name.
     * @param listener The callback that corresponds to the event listener.
     */
    off(event: E, listener: Function): void;
    /**
     * @public
     * 指定一个事件，取消其所有的监听。
     *
     * @param event - 指定事件的名称，如果没有指定事件，则取消所有事件的所有监听。
     */
    /**@en
     * Removes all listeners for a specified event.
     *
     * @param event The event name. If left empty, all listeners for all events are removed.
     */
    removeAllListeners(event?: E): void;
}

export declare interface IPlayerOptions {
    url: string;
    id: string | HTMLVideoElement;
    width?: number;
    height?: number;
    aspectRatio?: number;
}

export declare enum LiveVideoEvent {
    AUTOPLAY_PREVENTED = "autoplay_was_prevented",
    STATE_CHANGED = "state_changed",
    VIDEO_STATE_CHANGED = "video_state_changed",
    AUDIO_STATE_CHANGED = "audio_state_changed",
    HOST_CHANGED = "host_changed",
    USER_STATE_CHANGED = "user_state_changed",
    ERROR = "error"
}

export declare class LiveVideoPlayer extends BaseLiveVideoPlayer {
    private playDefer;
    private pauseDefer;
    private retryDefer;
    private switchDefer;
    playState: VideoPlayState;
    get isPlaying(): boolean;
    get isPaused(): boolean;
    get isStopped(): boolean;
    protected playRemoteUser(user: IAgoraRTCRemoteUser | undefined): Promise<void>;
    constructor(options: IPlayerOptions);
    play(): Promise<void>;
    pause(stop?: boolean): Promise<void>;
    retry(): Promise<void>;
    switchURL(url: string): Promise<void>;
    destroy(): void;
}

export declare enum LiveVideoState {
    CREATING = "creating",
    CREATED = "created",
    CONNECTING = "connecting",
    CONNECTED = "connected",
    CONNECT_FAILED = "connect-failed",
    DESTROYED = "destroyed"
}

export declare enum MediaState {
    PLAYING = "playing",
    PAUSED = "paused",
    STOPPED = "stopped",
    EMPTY = "empty"
}

export declare enum UserState {
    JOINED = "joined",
    LEFT = "left",
    UNPUBLISHED = "unpublished",
    PUBLISHED = "published"
}

declare enum VideoPlayState {
    WILL_PLAY = "will_play",
    PLAYING = "playing",
    PAUSED = "paused",
    STOPPED = "stopped"
}

export { }
