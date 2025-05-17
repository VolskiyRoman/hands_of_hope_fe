import {localStorageService} from 'utils/localStorage'

export const logoutAction = () => {
  localStorageService.logout()
}