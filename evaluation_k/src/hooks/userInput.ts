import { useState } from 'react'

export interface HookInput {
  value: string,
  setValue(v: string): void,
  reset(): void,
  bind: {
    value: string,
    onChange(value: string): void
  }
}

export const useInput = (initialValue: string): HookInput => {
  const [value, setValue] = useState(initialValue)

  return {
    value,
    setValue,
    reset(): void {
      setValue(initialValue)
    },
    bind: {
      value,
      onChange(value: string): void {
        setValue(value)
      },
    },
  }
}

export interface HookInputNumber {
  value: number,
  setValue(v: number): void,
  reset(): void,
  bind: {
    value: number,
    onchange(value: number): void
  }
}

// export const useInputNumber = (initialValue: number): HookInputNumber => {
  // const [value, setValue] = useState(initialValue)
  // return {
  //   value,
  //   setValue,
  //   reset(): void {
  //     setValue(initialValue)
  //   },
  //   bind: {
  //     value,
  //     onChange(value: number): void {
  //       setValue(value)
  //     },
  //   },
  // }
  
// }