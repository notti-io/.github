import { isValidHex } from './helpers'

export function getAccentColor() {
  if (!localStorage) return '#5d00ff'
  const localStorageItem = localStorage.getItem('accent-color')
  if (!localStorageItem) return '#5d00ff'
  if (!isValidHex(localStorageItem)) return '#5d00ff'
  return localStorageItem
}

export function setAccentColor(color: string) {
  if (!localStorage) return
  if (!isValidHex(color)) return
  localStorage.setItem('accent-color', color)
}

export function getIsDebug() {
  if (!window) return false
  if (import.meta.env.DEV) {
    return window.location.hash !== '#debug'
  }
  return window.location.hash === '#debug'
}
