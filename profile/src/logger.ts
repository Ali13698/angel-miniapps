export const Logger = {
    log: (...args: any[]) => {
        console.log('[Angel]', ...args);
    },
    error: (...args: any[]) => {
        console.error('[Angel Error]', ...args);
    },
    warn: (...args: any[]) => {
        console.warn('[Angel Warn]', ...args);
    }
};
