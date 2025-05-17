import { localStorageService } from 'utils/localStorage'
import { useGetCurrentUserQuery } from 'api/extendedApi'
import {User} from "../../types/users";

export const useCurrentUser = (): {
  user?: User
  isLoading: boolean
  isError: boolean
  refetch: () => void
} => {
  const isAuthenticated = localStorageService.isAuthenticated()
  const { data: user, isLoading, isError, refetch } = useGetCurrentUserQuery({}, { skip: !isAuthenticated })

  return { user, isLoading, isError, refetch }
}