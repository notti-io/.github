import { isValidHex } from './helpers'

export function getAccentColor() {
  if (!localStorage) return '#ffffff'
  const localStorageItem = localStorage.getItem('accent-color')
  if (!localStorageItem) return '#ffffff'
  if (!isValidHex(localStorageItem)) return '#ffffff'
  return localStorageItem
}

export function setAccentColor(color: string) {
  if (!localStorage) return
  if (!isValidHex(color)) return
  localStorage.setItem('accent-color', color)
}

export function getIsDebug() {
  if (!window) return false
  if (import.meta.env.DEV) return true
  return window.location.hash === '#debug'
}
