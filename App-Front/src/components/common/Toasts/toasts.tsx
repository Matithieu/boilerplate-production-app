import { toast } from 'react-toastify'

import { formatMessage } from '../../../services/intl/intl'
import {
  LoginButton,
  QuotaExceededButton,
  SelectSubscriptionButton,
} from '../Buttons/AuthButtons'
import toastMessages from './toast.messages'

export function toastErrorConnect() {
  return toast.error(
    <LoginButton message={formatMessage(toastMessages.errorConnect)} />,
  )
}

export function toastErrorReconnect(text?: string) {
  return toast.error(
    <>
      <LoginButton message={formatMessage(toastMessages.errorReconnect)} />
      {text}
    </>,
  )
}

export function toastWarnSelectSubscription() {
  return toast.warn(
    <SelectSubscriptionButton
      message={formatMessage(toastMessages.warnSelectSubscription)}
    />,
  )
}

export function toastSuccessAlreadySubscribed() {
  return toast.success(formatMessage(toastMessages.successAlreadySubscribed))
}

export function toastErrorQuotaExceeded() {
  return toast.error(
    <QuotaExceededButton
      message={formatMessage(toastMessages.errorQuotaExceeded)}
    />,
  )
}
