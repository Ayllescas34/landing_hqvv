'use client'

/**
 * Stub that replaces @monaco-editor/react to avoid Monaco's SSR crash
 * with React 19 + React Compiler in @payloadcms/ui@3.85.1.
 * Renders a styled textarea that satisfies Payload admin's code/JSON fields.
 */
import React, { useRef, useEffect } from 'react'

interface EditorProps {
  value?: string
  defaultValue?: string
  onChange?: (value: string | undefined, event?: unknown) => void
  onMount?: (editor: MockEditor, monaco: MockMonaco) => void
  language?: string
  theme?: string
  height?: string | number
  options?: Record<string, unknown>
  loading?: React.ReactNode
  // allow any other prop
  [key: string]: unknown
}

interface MockModel {
  getOptions: () => { config: Record<string, unknown>; tabSize: number }
  getValue: () => string
  getLineCount: () => number
  uri: { toString: () => string; scheme: string }
}

interface MockEditor {
  getValue: () => string
  setValue: (v: string) => void
  getModel: () => MockModel
  focus: () => void
  dispose: () => void
  layout: () => void
  onDidChangeModelContent: (cb: (e: unknown) => void) => { dispose: () => void }
  addCommand: (keybinding: number, handler: () => void) => void
}

interface MockMonaco {
  editor: { EditorOption: Record<string, unknown>; getEditors: () => MockEditor[] }
  languages: { register: (cfg: unknown) => void; setMonarchTokensProvider: (id: string, def: unknown) => void }
  KeyMod: Record<string, number>
  KeyCode: Record<string, number>
}

function buildMockEditor(ref: React.RefObject<HTMLTextAreaElement>): MockEditor {
  const mockModel: MockModel = {
    getOptions: () => ({ config: {}, tabSize: 2 }),
    getValue: () => ref.current?.value ?? '',
    getLineCount: () => (ref.current?.value ?? '').split('\n').length,
    uri: { toString: () => 'inmemory://model/1', scheme: 'inmemory' },
  }
  return {
    getValue: () => ref.current?.value ?? '',
    setValue: (v) => { if (ref.current) ref.current.value = v },
    getModel: () => mockModel,
    focus: () => ref.current?.focus(),
    dispose: () => {},
    layout: () => {},
    onDidChangeModelContent: () => ({ dispose: () => {} }),
    addCommand: () => {},
  }
}

const MOCK_MONACO: MockMonaco = {
  editor: { EditorOption: {}, getEditors: () => [] },
  languages: { register: () => {}, setMonarchTokensProvider: () => {} },
  KeyMod: { CtrlCmd: 2048, Shift: 1024, Alt: 512 },
  KeyCode: { KeyS: 49, KeyZ: 56, KeyY: 55, Enter: 3, Tab: 2 },
}

export default function MonacoEditorStub({
  value,
  defaultValue,
  onChange,
  onMount,
  height = 200,
}: EditorProps) {
  const ref = useRef<HTMLTextAreaElement>(null)
  const mounted = useRef(false)

  useEffect(() => {
    if (!mounted.current && onMount) {
      mounted.current = true
      try {
        onMount(buildMockEditor(ref), MOCK_MONACO)
      } catch {
        // ignore errors from onMount — admin keeps working
      }
    }
  }, [onMount])

  const px = typeof height === 'number' ? `${Math.max(120, height)}px` : height

  return (
    <textarea
      ref={ref}
      defaultValue={defaultValue ?? value ?? ''}
      onChange={(e) => onChange?.(e.target.value, {})}
      spellCheck={false}
      style={{
        width: '100%',
        minHeight: px,
        fontFamily: '"Cascadia Code","Fira Code","JetBrains Mono","Monaco","Consolas",monospace',
        fontSize: '13px',
        lineHeight: 1.6,
        padding: '12px',
        background: '#1e1e1e',
        color: '#d4d4d4',
        border: '1px solid #404040',
        borderRadius: '4px',
        resize: 'vertical',
        outline: 'none',
        boxSizing: 'border-box',
      }}
    />
  )
}
