import 'vue3-aplayer';
import type { Ref } from 'vue';

// 扩展APlayerInstance类型
declare module 'vue3-aplayer' {
  interface APlayerInstance {
    load: (music: MusicItem) => void;
    play: () => Promise<void>;
    pause: () => void;
    toggle: () => void;
    muted: boolean;
    volume: number;
    currentTime: number;
    duration: number;
    percent: number;
    playlist: MusicItem[];
    currentIndex: number;
    next: () => void;
    prev: () => void;
    on(event: string, callback: Function): void;
    off(event: string, callback: Function): void;
    destroy(): void;
  }
}

// 补充Ref类型
export declare type APlayerRef = Ref<InstanceType<typeof APlayer>>;