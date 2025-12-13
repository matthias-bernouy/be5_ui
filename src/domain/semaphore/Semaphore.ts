export default class Semaphore {
    private permits: number;
    private queue: (() => void)[] = [];

    constructor(initialPermits: number) {
        this.permits = initialPermits;
    }

    async acquire(): Promise<void> {
        if (this.permits > 0) {
            this.permits--;
            return Promise.resolve();
        }

        return new Promise<void>(resolve => {
            this.queue.push(resolve);
        });
    }

    release(): void {
        if (this.queue.length > 0) {
            const nextResolver = this.queue.shift();
            if (nextResolver) {
                nextResolver();
            }
        } else {
            this.permits++;
        }
    }
}
