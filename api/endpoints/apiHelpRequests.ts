import type {EndpointBuilder} from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import {HELP_REQUESTS} from 'api'
import {HelpRequest, CreateHelpRequest, UpdateHelpRequest} from 'api/types/help'
import {TagTypes} from "../../utils/rtk-tags";

export const apiHelpRequests = {
  endpoints: (builder: EndpointBuilder<any, any, any>) => ({
    // GET /help-requests/
    getHelpRequests: builder.query<{
      count: number
      next: string | null
      previous: string | null
      results: HelpRequest[]
    }, { page?: number }>({
      query: ({page = 1} = {}) => `${HELP_REQUESTS.list()}?page=${page}`,
      providesTags: [TagTypes.HELP_REQUESTS]
    }),

    // GET /help-requests/{id}/
    getHelpRequestById: builder.query<HelpRequest, number>({
      query: (id) => HELP_REQUESTS.detail(id),
      providesTags: [TagTypes.HELP_REQUESTS]
    }),

    // POST /help-requests/
    createHelpRequest: builder.mutation<HelpRequest, CreateHelpRequest>({
      query: (body) => ({
        url: HELP_REQUESTS.list(),
        method: 'POST',
        body,
      }),
      invalidatesTags: [TagTypes.HELP_REQUESTS]
    }),

    // PUT /help-requests/{id}/
    updateHelpRequest: builder.mutation<HelpRequest, { id: number; data: CreateHelpRequest }>({
      query: ({id, data}) => ({
        url: HELP_REQUESTS.detail(id),
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: [TagTypes.HELP_REQUESTS]
    }),

    // PATCH /help-requests/{id}/
    patchHelpRequest: builder.mutation<HelpRequest, { id: number; data: UpdateHelpRequest }>({
      query: ({id, data}) => ({
        url: HELP_REQUESTS.detail(id),
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: [TagTypes.HELP_REQUESTS]
    }),

    // DELETE /help-requests/{id}/
    deleteHelpRequest: builder.mutation<void, number>({
      query: (id) => ({
        url: HELP_REQUESTS.detail(id),
        method: 'DELETE',
      }),
      invalidatesTags: [TagTypes.HELP_REQUESTS]
    }),

    // GET /help-request/my_activity/
    getMyHelpActivity: builder.query<{ results: HelpRequest[] }, void>({
      query: () => `${HELP_REQUESTS.list()}my_activity/`,
      providesTags: [TagTypes.HELP_REQUESTS]
    }),
  }),
}
