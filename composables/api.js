export const api = (() => {
  const call = (cb, method, [req, body, opts]) =>
    cb(req, {
      method,
      body,
      baseURL: useRuntimeConfig().public.apiURL,
      // headers: { Authorization: useAuth().strategy.token.get() },
      onResponseError({ request, response, options }) {
        // useNuxtApp().$toast.error('API error')
      },
      ...opts,
    })

  return {
    post: (...args) => call($fetch, 'post', args),
    get: (...args) => call($fetch, 'get', args),
    lazyPost: (...args) => call(useLazyFetch, 'post', args),
    lazyGet: (...args) => call(useLazyFetch, 'get', args),
  }
})()
