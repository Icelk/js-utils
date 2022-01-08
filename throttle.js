/**
 * @type { {[name: string]: {backlog: Event[], inTimeout: boolean}} }
 */
let instances = {}

/**
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
