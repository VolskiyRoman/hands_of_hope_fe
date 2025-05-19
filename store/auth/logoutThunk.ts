import { extendedApi } from 'api/extendedApi'
import { TagTypes } from 'utils/rtk-tags'
import {logoutAction} from "../../utils/auth";

export const logoutThunk = () => (dispatch: any) => {
  logoutAction()
  dispatch(extendedApi.util.resetApiState())
  dispatch(extendedApi.util.invalidateTags([{ type: TagTypes.CURRENT_USER }]))
}