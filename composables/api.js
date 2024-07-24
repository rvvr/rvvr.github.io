export const api = (() => {
  const call = async (cb, method, [req, body, opts]) => {
    try {
      const res = await cb(req, {
        method,
        body,
        baseURL: useRuntimeConfig().public.apiURL,
        headers: {
          Authorization: `Bearer ${useUserStore().token}`,
        },
        // onResponseError({ request, response, options }) {
        // useNuxtApp().$toast.error('API error')
        // },
        ...opts,
      })
      return res
    } catch (e) {
      return e
    }
  }

  return {
    post: (...args) => call($fetch, 'post', args),
    get: (...args) => call($fetch, 'get', args),
    lazyPost: (...args) => call(useLazyFetch, 'post', args),
    lazyGet: (...args) => call(useLazyFetch, 'get', args),
  }
})()
