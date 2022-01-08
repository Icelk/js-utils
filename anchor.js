/**
 * Uses the class `transition-highlight` to style.
 *
 * This is the styling from [icelk.dev](https://icelk.dev/)
 *
 * ```css
 * .transition-highlight {
 *     transition: ease 200ms;
 *     transition-property: background-color, padding;
 * }
 * .transition-highlight:focus-within {
 *     background-color: #a2c6d85f;
 *     border-radius: 0.2rem;
 *     padding: 0.4rem;
 * }
 * ```
 *
 * @param {HTMLElement} element
 */
const highlight = (element) => {
    // Add highlight
    element.classList.add("transition-highlight")
    // Make focusable
    element.tabIndex = -1
    element.focus({ preventScroll: true })
    element.addEventListener("focusout", (_) => {
        // Reset state
        element.removeAttribute("tabindex")
    })
}

/**
 * Enables smooth scrolling on all links on the page.
 * Will also highlight the target anchor, if any.
 */
const initSmoothScrolling = () => {
    document.querySelectorAll('a[href^="#"]').forEach((anchor_link) => {
        anchor_link.addEventListener("click", function (e) {
            e.preventDefault()

            let href = this.getAttribute("href")

            let anchor = document.getElementById(href.substring(1))

            history.replaceState({}, "", href)

            if (anchor !== null) {
                highlight(anchor)

                anchor.scrollIntoView({
                    behavior: "smooth",
                })
            }
        })
    })
}
/**
 * Hightlights the anchor after the `#` in the uri.
 */
const initHighlight = () => {
    const fragment = location.hash.substring(1)

    if (fragment === "") {
        return
    }

    const anchor = document.getElementById(fragment)

    if (anchor !== null) {
        highlight(anchor)
    }
}
