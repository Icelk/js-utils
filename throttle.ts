let instances: { [name: string]: { backlog: (() => void)[]; inTimeout: boolean } } = {}

/**
 * Throttles calling `callback` to every `interval` milliseconds.
 * If this is called more than once in the hang period, only the latest callback is called.
 *
 * If it's called once, which calls the callback, and then once again, it waits `interval` before
 * calling `callback` again.
 */
export default function throttle(name: string, interval: number, callback: () => void) {
    if (instances[name] === undefined) {
        instances[name] = {
            backlog: [],
            inTimeout: false,
        }
    }

    let instance = instances[name]

    if (instance.inTimeout) {
        instance.backlog.push(callback)
        return
    }

    callback()

    instance.inTimeout = true
    setTimeout(() => {
        instance.inTimeout = false
        let item = instance.backlog.pop()

        if (item !== undefined) {
            instance.backlog.length = 0
            item()
        }
    }, interval)
}
