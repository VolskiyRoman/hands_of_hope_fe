import type { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { HELP_REQUESTS } from 'api'
import { HelpRequest, CreateHelpRequest, UpdateHelpRequest } from 'api/types/help'

export const apiHelpRequests = {
  endpoints: (builder: EndpointBuilder<any, any, any>) => ({
    // GET /help-requests/
    getHelpRequests: builder.query<{
      count: number
      next: string | null
      previous: string | null
      results: HelpRequest[]
    }, { page?: number }>({
      query: ({ page = 1 } = {}) => `${HELP_REQUESTS.list()}?page=${page}`,
    }),

    // GET /help-requests/{id}/
    getHelpRequestById: builder.query<HelpRequest, number>({
      query: (id) => HELP_REQUESTS.detail(id),
    }),

    // POST /help-requests/
    createHelpRequest: builder.mutation<HelpRequest, CreateHelpRequest>({
      query: (body) => ({
        url: HELP_REQUESTS.list(),
        method: 'POST',
        body,
      }),
    }),

    // PUT /help-requests/{id}/
    updateHelpRequest: builder.mutation<HelpRequest, { id: number; data: CreateHelpRequest }>({
      query: ({ id, data }) => ({
        url: HELP_REQUESTS.detail(id),
        method: 'PUT',
        body: data,
      }),
    }),

    // PATCH /help-requests/{id}/
    patchHelpRequest: builder.mutation<HelpRequest, { id: number; data: UpdateHelpRequest }>({
      query: ({ id, data }) => ({
        url: HELP_REQUESTS.detail(id),
        method: 'PATCH',
        body: data,
      }),
    }),

    // DELETE /help-requests/{id}/
    deleteHelpRequest: builder.mutation<void, number>({
      query: (id) => ({
        url: HELP_REQUESTS.detail(id),
        method: 'DELETE',
      }),
    }),
  }),
}
