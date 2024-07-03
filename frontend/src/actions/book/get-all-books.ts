'use server';

import { FetchAdapter } from '@/adapter/fetch-adapter'
import { SearchParams } from '@/actions/search'

export async function getAllBooks({ page, pageSize, query }: SearchParams) {
  const params = new URLSearchParams({
    page,
    pageSize,
    query: query || ''
  })

  try {
    const httpAdapter = new FetchAdapter()
    console.log(`/books?${params.toString()}`)
    const response = await httpAdapter.get(`/books?${params.toString()}`, {
      cache: 'no-cache'
    })
    const data = await response.json()
    return data
  } catch (error) {
    return []
  }
}