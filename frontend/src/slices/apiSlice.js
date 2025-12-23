import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react'
import { logout } from './authSlice'

const baseQuery = fetchBaseQuery({
  baseUrl:
    process.env.REACT_APP_API_URL || 'http://localhost:5000',
})

async function baseQueryWithAuth(args, api, extra) {
  const result = await baseQuery(args, api, extra)

  if (result.error && result.error.status === 401) {
    api.dispatch(logout())
  }

  return result
}

export const apiSlice = createApi({
  baseQuery: baseQueryWithAuth,
  tagTypes: ['Product', 'Order', 'User'],
  endpoints: () => ({}),
})
