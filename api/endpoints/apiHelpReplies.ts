// api/endpoints/apiHelpReplies.ts

import type { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { HelpReply, CreateHelpReply, UpdateHelpReply } from 'api/types/help'
import { HELP_REPLIES } from 'api'

export const apiHelpReplies = {
  endpoints: (builder: EndpointBuilder<any, any, any>) => ({
    // GET /help-replies/
    getHelpReplies: builder.query<HelpReply[], void>({
      query: () => HELP_REPLIES.list(),
    }),

    // GET /help-replies/{id}/
    getHelpReplyById: builder.query<HelpReply, number>({
      query: (id) => HELP_REPLIES.detail(id),
    }),

    // POST /help-replies/
    createHelpReply: builder.mutation<HelpReply, CreateHelpReply>({
      query: (body) => ({
        url: HELP_REPLIES.list(),
        method: 'POST',
        body,
      }),
    }),

    // PUT /help-replies/{id}/
    updateHelpReply: builder.mutation<HelpReply, { id: number; data: CreateHelpReply }>({
      query: ({ id, data }) => ({
        url: HELP_REPLIES.detail(id),
        method: 'PUT',
        body: data,
      }),
    }),

    // PATCH /help-replies/{id}/
    patchHelpReply: builder.mutation<HelpReply, { id: number; data: UpdateHelpReply }>({
      query: ({ id, data }) => ({
        url: HELP_REPLIES.detail(id),
        method: 'PATCH',
        body: data,
      }),
    }),

    // DELETE /help-replies/{id}/
    deleteHelpReply: builder.mutation<void, number>({
      query: (id) => ({
        url: HELP_REPLIES.detail(id),
        method: 'DELETE',
      }),
    }),
  }),
}
