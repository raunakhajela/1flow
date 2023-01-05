declare global {
  interface Window {
    readImageFile(filePath: string): Promise<Uint8Array>;
    readListAvatar(filePath: string): Promise<Uint8Array>;
    startExpress(): Promise<number>;
    getMagicLink(timeout?: number): Promise<string>;
    setElectronStoreKey(key: string, value: any): Promise<void>;
    getElectronStoreKey(key: string): Promise<any>;
    listenElectronStore(callback: (config: Record<string, any>) => void): Promise<void>;
    getCurrentVersion(): Promise<string>;

    onUpdateAvailable(callback: (version: string) => void);
    applyUpdate(): void;
  }
}
