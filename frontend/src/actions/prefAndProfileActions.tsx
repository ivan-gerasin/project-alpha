import {Dispatch} from 'redux'

import {Action} from '../types/action'
import {actionCreator} from '../redux-utils/actionCreator'
import {IUserPreference, IUserPreferenceNickChanged, IUserPreferenceErrored, 
  IUserPreferenceInitiatedReq } from '../models/user'
import {operateUserDataRequest} from '../api/HttpClientInstance'

export enum PrefActionType {
  CHANGE_NICK = 'pref/CHANGE_NICK',
  CHANGE_EMAIL = 'pref/CHANGE_EMAIL',
  RETRIEVE_DATA= 'pref/RETRIEVE_DATA',
  REQUEST_FAILED = 'pref/REQUEST_FAILED',
  REQUEST_INITIATED = 'pref/REQUEST_INITIATED'
}

export interface IUserPreferenceGetData {
  nickname: string
  email: string
  error?: string
  init: boolean
  isLoading: boolean
}

export interface IUserPreferenceReceiveDataAfterChange {
  nickname: string
}

export const IUserPreferenceSentInquiry = {
  init: true,
  isLoading: true
}

export type initUserAction = Action<PrefActionType.REQUEST_INITIATED, IUserPreferenceInitiatedReq>
export type UpdateNicknameAction = Action<PrefActionType.CHANGE_NICK, IUserPreferenceNickChanged>
export type errorUserAction = Action<PrefActionType.REQUEST_FAILED, IUserPreferenceErrored>

export type PrefActions = UpdateNicknameAction | getUserAction | errorUserAction | initUserAction 
export type getUserAction = Action<PrefActionType.RETRIEVE_DATA, IUserPreference>

export const initiatedUserAction = actionCreator<PrefActionType.REQUEST_INITIATED, 
IUserPreferenceInitiatedReq>(PrefActionType.REQUEST_INITIATED)

export const postUserAction = actionCreator<PrefActionType.CHANGE_NICK, 
IUserPreferenceNickChanged>(PrefActionType.CHANGE_NICK)

export const getInqUserAction = actionCreator<PrefActionType.RETRIEVE_DATA, 
IUserPreference>(PrefActionType.RETRIEVE_DATA)

export const erroredUserAction = actionCreator<PrefActionType.REQUEST_FAILED, 
IUserPreferenceErrored>(PrefActionType.REQUEST_FAILED)

export const getMyData = () => async (dispatch:Dispatch< getUserAction | errorUserAction | 
  initUserAction >): Promise<void> => {

  try {
    dispatch(initiatedUserAction(IUserPreferenceSentInquiry))
    const result = await operateUserDataRequest.getPreferenceData()
    dispatch(getInqUserAction(result))
  } catch (error) {
    const destructuredError = {error}
    const destructuredMessage = JSON.parse(destructuredError.error.message)
    const [messageArrayFromDestructuredError] = destructuredMessage.errors
    dispatch(erroredUserAction({error: messageArrayFromDestructuredError.message}))
  }
}

export interface IUpdateNicknameActionPayload {
  oldNickname: string // old nickname is required to generate URL
  nickname: string
}

export const updateUserNickname = (payload: IUpdateNicknameActionPayload ) =>
async (dispatch:Dispatch<UpdateNicknameAction | errorUserAction | initUserAction>): Promise<void> => {

  try {
    dispatch(initiatedUserAction(IUserPreferenceSentInquiry))
    const result = await operateUserDataRequest.updateNickname(payload)
    dispatch(postUserAction(result))
  } catch (error) {
    const destructuredError = {error}
    const destructuredMessage = JSON.parse(destructuredError.error.message)
    const [messageArrayFromDestructuredError] = destructuredMessage.errors
    dispatch(erroredUserAction({error: messageArrayFromDestructuredError.message}))
  }
}