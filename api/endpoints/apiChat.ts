import type { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import type { ChatRequest, ChatResponse } from 'api/types/chat';
import {CHAT} from "../index";


export const apiChat = {
  endpoints: (builder: EndpointBuilder<any, any, any>) => ({
    sendChatMessage: builder.mutation<ChatResponse, ChatRequest>({
      query: (body) => ({
        url: CHAT.send(),
        method: 'POST',
        body,
      }),
    }),
  }),
};
