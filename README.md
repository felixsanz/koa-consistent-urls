# Koa Redirect Inconsistent

Redirect inconsistent urls middleware for koa.

- `www` vs `non-www`.
- Trailing slash vs no trailing slash.

## Example

```js
var consistentUrls = require('koa-consistent-urls')
var Koa = require('koa')

var app = new Koa()
app.use(consistentUrls({
  www: false,
  trailingSlash: false,
}))
```

## API

### app.use(require('koa-consistent-urls')(options))

Options are:

#### `www`

Whether or not to prepend the hostname with `www.`. Fix & redirect if the request url doesn't match.

`true`: Force `www.` on the hostname.

`false`: Remove `www.` from hostname.

Default: `false`.

#### `trailingSlash`

Whether or not to append a trailing slash (`/`) on the pathname. Fix & redirect if the request url doesn't match.

`true`: Force trailing slash (`/`) on the pathname.

`false`: Remove trailing slash (`/`) from pathname.

Default: `false`.

## Tests

`TODO`. Feel free to PR.
