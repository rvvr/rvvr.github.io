export const api = (() => {
  const call = (cb, method, [req, body, opts]) =>
    cb(req, {
      method,
      body,
      baseURL: 'https://game.demo.cryptobull.io/api/v1',
      // baseURL: useRuntimeConfig().public.apiURL,
      // headers: { Authorization: useAuth().strategy.token.get() },
      // onResponseError({ request, response, options }) {
      // },
      ...opts,
    })

  return {
    post: (...args) => call($fetch, 'post', args),
    get: (...args) => call($fetch, 'get', args),
    lazyPost: (...args) => call(useLazyFetch, 'post', args),
    lazyGet: (...args) => call(useLazyFetch, 'get', args),
  }
})()
