/**
 * Gives all headings a copy button to copy the URI to the current page and the anchor.
 *
 * See the following snippet on how to change the behaviour per page.
 *
 * ```html
 * <meta name="permalinks" content="not-titles"> <!-- content: disabled|enabled|not-titles -->
 * ```
 *
 * Place this in your `<head>`.
 *
 * - `disable`: no copy buttons
 * - `enable`: on all levels of headings
 * - `not-titles`: not on `<h1>`, but all other
 *
 * # Styling
 *
 * This is the styling from [icelk.dev](https://icelk.dev/)
 *
 * ```css
 * .share-button {
 *     width: 0.75em;
 *     padding-left: 0.5rem;
 *     opacity: 0.8;
 *
 *     transition: opacity ease-out 75ms;
 *
 *     cursor: pointer;
 * }
 * .share-button.pressed {
 *     opacity: 0.4;
 * }
 * .share-button:active {
 *     opacity: 0.6;
 * }
 * ```
 */
const initCopyHeading = () => {
    // Only enable on
    let metaEnabled = document.querySelector("meta[name='permalinks']")
    let content = metaEnabled?.getAttribute("content")
    if (content !== "enabled" && content !== "not-titles") {
        return
    }

    let queryString = content === "not-titles" ? "h2, h3, h4, h5, h6" : "h1, h2, h3, h4, h5, h6"

    document.querySelectorAll(queryString).forEach((heading) => {
        let id = heading.getAttribute("id")
        if (id !== undefined) {
            let linkButton = document.createElement("span")
            linkButton.title = "Copy permalink"
            linkButton.innerHTML =
                '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">\
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />\
            </svg>'
            let linkSVG = linkButton.firstElementChild
            linkButton.onclick = () => {
                let link = `${document.location.href.split("#")[0]}#${id}`
                navigator.clipboard.writeText(link)
                linkSVG.classList.add("pressed")
                setTimeout(() => linkSVG.classList.remove("pressed"), 150)
            }
            linkSVG.classList.add("share-button")
            heading.appendChild(linkButton)
        }
    })
}
