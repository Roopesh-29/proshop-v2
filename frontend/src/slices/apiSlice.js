import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react'
import { logout } from './authSlice'

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://proshop-v2-1be7.onrender.com',
  credentials: 'include',
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
