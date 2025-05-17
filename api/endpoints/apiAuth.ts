import { AUTH } from 'api'
import { AuthRequest, LoginResponse } from 'api/types/auth'
import { TagTypes } from 'utils/rtk-tags'
import type { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

export const apiAuth = {
    endpoints: (builder: EndpointBuilder<any, any, any>) => ({
        login: builder.mutation<LoginResponse, AuthRequest>({
            query: (body) => ({
                url: AUTH.login(),
                method: 'POST',
                body
            }),
            invalidatesTags: [TagTypes.CURRENT_USER]
        }),
        register: builder.mutation<LoginResponse, AuthRequest>({
            query: (body) => ({
                url: AUTH.register(),
                method: 'POST',
                body
            }),
            invalidatesTags: [TagTypes.CURRENT_USER]
        })
    })
}
