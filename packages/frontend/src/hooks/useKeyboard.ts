import { useEffect } from 'react'

interface KeyboardHandlers {
  [key: string]: (e: KeyboardEvent) => void
}

export function useKeyboard(handlers: KeyboardHandlers) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Build the key combination string
      const parts: string[] = []
      if (e.ctrlKey) parts.push('ctrl')
      if (e.shiftKey) parts.push('shift')
      if (e.altKey) parts.push('alt')

      // Get the actual key
      const key = e.key.toLowerCase()
      if (!['control', 'shift', 'alt'].includes(key)) {
        parts.push(key)
      }

      const combination = parts.join('+')

      // Find and execute matching handler
      if (handlers[combination]) {
        e.preventDefault()
        handlers[combination](e)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handlers])
}

// Common hotkey combinations
export const HOTKEYS = {
  NEW_ESTIMATE: 'ctrl+n',
  OPEN_ESTIMATE: 'ctrl+o',
  SAVE_ESTIMATE: 'ctrl+s',
  OPEN_SETTINGS: 'ctrl+,',
  CLOSE_DIALOG: 'escape',

  SCREEN_JOB_DETAILS: 'f5',
  SCREEN_TAKEOFF: 'f6',
  SCREEN_CLOSEOUT: 'f7',

  ADD_ITEM: 'ctrl+a',
  ADD_ASSEMBLY: 'ctrl+shift+a',
  REPLACE_ITEM: 'ctrl+r',
  DUPLICATE_ROW: 'ctrl+d',
  DELETE_ROW: 'delete',

  TOGGLE_AUDIT_TRAIL: 'ctrl+shift+t',
  SWITCH_EXTENSIONS: 'ctrl+shift+e',

  CREATE_TEMP_ITEM: 'ctrl+t',
  SAVE_TEMP_TO_PERMANENT: 'ctrl+shift+s',
  COPY_TAKEOFF: 'ctrl+shift+c',
} as const
