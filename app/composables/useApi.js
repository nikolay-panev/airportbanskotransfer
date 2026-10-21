export const useApi = () => {
  const config = useRuntimeConfig()

  const buildHeaders = (body, customHeaders = {}) => {
    const headers = {
      'Accept': 'application/json',
      ...customHeaders,
    }

    if (!('Content-Type' in headers)) {
      if (!(body instanceof FormData)) {
        headers['Content-Type'] = 'application/json'
      }
    }

    if (import.meta.client) {
      const token = localStorage.getItem('am-token')
      if (token) {
        headers['Authorization'] = `jwt ${token}`
      }
    }

    return headers
  }

  const post = async (url, postData, options = {}) => {
    const apiURL = config.public.apiBase + url
    try {
      const result = await $fetch(apiURL, {
        method: 'POST',
        body: postData,
        headers: buildHeaders(postData, options?.headers),
      })
      return result
    } catch (err) {
      console.error('API POST request failed:', err)
      throw err
    }
  }

  const get = async (url, queryData, options = {}) => {
    const apiURL = config.public.apiBase + url
    try {
      const result = await $fetch(apiURL, {
        method: 'GET',
        query: queryData,
        headers: buildHeaders(undefined, options?.headers),
      })
      return result 
    } catch (err) {
      console.error('API GET request failed:', err)
      throw err
    }
  }

  return {
    get,
    post,
  }
}