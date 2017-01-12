'use strict';

/**
 * Module dependencies.
 */

const url = require('url')

/**
 * Redirect inconsistent urls
 *
 * @param {Object} [options]
 * @return {Function}
 * @api public
 */

module.exports = function (options) {
  options = options || {}

  const www = options.www || false
  const trailingSlash = options.trailingSlash || false

  return (ctx, next) => {
    let modified = false
    const urlObj = url.parse(ctx.request.url)

    if (www && urlObj.hostname && !urlObj.hostname.startsWith('www.')) {
      urlObj.hostname = `www.${urlObj.hostname}`
      modified = true
    } else if (!www && urlObj.hostname && urlObj.hostname.startsWith('www.')) {
      urlObj.hostname = urlObj.hostname.slice(4)
      modified = true
    }

    if (trailingSlash && urlObj.pathname && !urlObj.pathname.slice(-1) === '/') {
      urlObj.pathname = `${urlObj.pathname}/`
      modified = true
    } else if (!trailingSlash && urlObj.pathname && urlObj.pathname.slice(-1) === '/') {
      urlObj.pathname = urlObj.pathname.slice(0, -1)
      modified = true
    }

    if (modified) {
      ctx.status = 301
      ctx.redirect(url.format(urlObj))
      return
    }

    return next()
  }
}
