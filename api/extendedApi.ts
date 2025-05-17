import { BaseApi } from 'api/_base.api'
import { apiAuth } from 'api/endpoints/apiAuth'
import { apiUsers } from 'api/endpoints/apiUsers'

export const extendedApi = BaseApi.injectEndpoints({
  endpoints: builder => ({
    ...apiAuth.endpoints(builder),
    ...apiUsers.endpoints(builder),
  }),
})
export const {
  useLoginMutation,
  useRegisterMutation,

  useGetCurrentUserQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = extendedApi
