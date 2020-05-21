const makeHint = (href, rel, as, crossorigin, type) => {
  let link = document.createElement("link");
  const existingLink = document.querySelector(`link[href="${href}"]`);
  if (existingLink) {
    if (existingLink.getAttribute(rel)) return
  }
  link.setAttribute("rel", rel);
  link.setAttribute("href", href);
  crossorigin && link.setAttribute("crossorigin", crossorigin);
  type && link.setAttribute("type", type);
  as && link.setAttribute("as", as);
  document.head.appendChild(link);
  return href;
}

let hasBeenPrerendered = [];
let hasBeenPrefetched = [];
const allowedRels = ['preload', 'prerender', 'subresource', 'prefetch', 'preconnect', 'dns-prefetch']

function preloadResource(href, rel, as, crossorigin, type) {
  if (!rel) {
    rel = 'prerender'
  }
  if (!crossorigin) {
    crossorigin = false
  }
  if (!allowedRels.includes(rel)) {
    throw new Error('preloadResource: you have not entered a valid preload relative. Only the following are allowed: \'preload\',\'prefetch\',\'prerender\',\'subresource\',\'prefetch\',\'preconnect\',\'dns-prefetch\' ')
  }
  if (!href) {
    throw new Error('preloadResource: you must specify an href')
  }
  if (rel === "prefetch" || rel === "preload") {
    if (!as) {
      throw new Error('preloadResource: you must specify what "as" type resource this is when preloading or prefetching. Read - https://medium.com/reloading/preload-prefetch-and-priorities-in-chrome-776165961bbf')
    }
  }

  makeHint(href, rel, as, crossorigin, type);
}

module.exports = preloadResource
