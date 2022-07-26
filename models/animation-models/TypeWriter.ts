type QueueItem = () => Promise<void>;

interface ReplaceStringConfig {
    instant?: boolean;
    start?: boolean;
}

export class Typewriter {
    private queue: QueueItem[] = [];
    private element: HTMLElement;
    private loop: boolean;
    private typingSpeed: number;
    private deletingSpeed: number;

    constructor(
        element: HTMLElement,
        { loop = false, typingSpeed = 50, deletingSpeed = 50 } = {},
    ) {
        this.element = element;
        this.loop = loop;
        this.typingSpeed = typingSpeed;
        this.deletingSpeed = deletingSpeed;
    }

    typeString(string: string) {
        this.addToQueue((resolve) => {
            let i = 0;
            const interval = setInterval(() => {
                this.element.append(string[i]);
                i++;
                if (i >= string.length) {
                    clearInterval(interval);
                    resolve();
                }
            }, this.typingSpeed);
        });

        return this;
    }

    // instead of deleting the typed string, replace it.
    async replaceString(
        str: string,
        { instant = true, start = false }: ReplaceStringConfig = {
            instant: true,
            start: false,
        },
    ) {
        this.queue = [];
        if (instant) {
            this.element.innerText = '';
        } else {
            this.deleteAll();
        }
        this.typeString(str);

        if (start) {
            await this.start();
        }

        return this;
    }

    deleteChars(number: number) {
        this.addToQueue((resolve) => {
            let i = 0;
            const interval = setInterval(() => {
                this.element.innerText = this.element.innerText.substring(
                    0,
                    this.element.innerText.length - 1,
                );
                i++;
                if (i >= number) {
                    clearInterval(interval);
                    resolve();
                }
            }, this.deletingSpeed);
        });

        return this;
    }

    deleteAll(deleteSpeed = this.deletingSpeed) {
        this.addToQueue((resolve) => {
            const interval = setInterval(() => {
                this.element.innerText = this.element.innerText.substring(
                    0,
                    this.element.innerText.length - 1,
                );
                if (this.element.innerText.length === 0) {
                    clearInterval(interval);
                    resolve();
                }
            }, deleteSpeed);
        });

        return this;
    }

    pauseFor(duration: number) {
        this.addToQueue((resolve) => {
            setTimeout(resolve, duration);
        });

        return this;
    }

    // can only be called internally
    private addToQueue(cb: (resolve: () => void) => void) {
        this.queue.push(() => new Promise(cb));
    }

    async start() {
        let cb = this.queue.shift();
        while (cb != null) {
            await cb();
            if (this.loop) this.queue.push(cb);
            cb = this.queue.shift();
        }

        return this;
    }
}
