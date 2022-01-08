/**
 * @type { {[name: string]: {backlog: Event[], inTimeout: boolean}} }
 */
let instances = {}

/**
 * Throttles calling `callback` to every `interval` milliseconds.
 * If more than one event is supplied in the hang period, only the last is emitted.
 * If a event is emitted in the hang period, that is given to `callback` after the timeout.
 *
 * @param {Event} ev
 * @param {string} name
 * @param {number} interval
 * @param {(Event) => void} callback
 */
function throttle(ev, name, interval, callback) {
    if (instances[name] === undefined) {
        instances[name] = {
            backlog: [],
            inTimeout: false,
        }
    }

    let instance = instances[name]

    if (instance.inTimeout) {
        instance.backlog.push(ev)
        return
    }

    callback(ev)

    instance.inTimeout = true
    setTimeout(() => {
        instance.inTimeout = false
        let item = instance.backlog.pop()

        if (item !== undefined) {
            instance.backlog.length = 0
            callback(item)
        }
    }, interval)
}
