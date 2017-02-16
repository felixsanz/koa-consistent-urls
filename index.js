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

module.exports = function consistentUrls(options) {
  options = options || {}

  const www = options.www || false
  const trailingSlash = options.trailingSlash || false

  return (ctx, next) => {
    const requestUrl = ctx.protocol + '://' + ctx.get('host') + ctx.originalUrl
    const urlObj = url.parse(requestUrl)

    let hostname
    if (www && urlObj.hostname && !urlObj.hostname.startsWith('www.')) {
      hostname = `www.${urlObj.hostname}`
    } else if (!www && urlObj.hostname && urlObj.hostname.startsWith('www.')) {
      hostname = urlObj.hostname.slice(4)
    }

    let pathname
    if (trailingSlash && urlObj.pathname && urlObj.pathname !== '/' && !urlObj.pathname.slice(-1) === '/') {
      pathname = `${urlObj.pathname}/`
    } else if (!trailingSlash && urlObj.pathname && urlObj.pathname !== '/' && urlObj.pathname.slice(-1) === '/') {
      pathname = urlObj.pathname.slice(0, -1)
    }

    if (hostname || pathname) {
      ctx.status = 301
      ctx.redirect(url.format({
        protocol: urlObj.protocol,
        auth: urlObj.auth,
        hostname: hostname || urlObj.hostname,
        port: urlObj.port,
        pathname: pathname || urlObj.pathname,
        search: urlObj.search,
      }))
      return
    }

    return next()
  }
}
