import { BaseApi } from 'api/_base.api'
import { apiAuth } from 'api/endpoints/apiAuth'
import { apiUsers } from 'api/endpoints/apiUsers'
import { apiHelpRequests } from "./endpoints/apiHelpRequests";
import {apiHelpReplies} from "./endpoints/apiHelpReplies";
import {apiChat} from "./endpoints/apiChat";

export const extendedApi = BaseApi.injectEndpoints({
  endpoints: builder => ({
    ...apiAuth.endpoints(builder),
    ...apiUsers.endpoints(builder),
    ...apiHelpRequests.endpoints(builder),
    ...apiHelpReplies.endpoints(builder),
    ...apiChat.endpoints(builder),
  }),
})
export const {
  // Auth
  useLoginMutation,
  useRegisterMutation,

  // Users
  useGetCurrentUserQuery,
  useUpdateUserMutation,

  // Help Requests
  useGetHelpRequestsQuery,
  useGetHelpRequestByIdQuery,
  useCreateHelpRequestMutation,
  useGetMyHelpActivityQuery,
  useUpdateHelpRequestMutation,
  usePatchHelpRequestMutation,
  useDeleteHelpRequestMutation,

  // Help Replies
  useCreateHelpReplyMutation,
  useGetHelpRepliesQuery,
  useGetHelpReplyByIdQuery,
  useUpdateHelpReplyMutation,
  usePatchHelpReplyMutation,
  useDeleteHelpReplyMutation,

  //chat
  useSendChatMessageMutation
} = extendedApi