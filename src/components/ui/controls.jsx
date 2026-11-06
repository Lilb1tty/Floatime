import * as React from 'react'
import * as SwitchPrimitive from '@radix-ui/react-switch'
import {clsx} from 'clsx'
import {twMerge} from 'tailwind-merge'
export function Switch({className,...props}) {return <SwitchPrimitive.Root className={twMerge(clsx('peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full bg-slate-300 transition-colors data-[state=checked]:bg-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500 disabled:opacity-50',className))} {...props}><SwitchPrimitive.Thumb className="block size-5 translate-x-0.5 rounded-full bg-white shadow transition-transform data-[state=checked]:translate-x-[22px]" /></SwitchPrimitive.Root>}
export function Button({className,...props}) {return <button className={twMerge(clsx('inline-flex items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2',className))} {...props}/>}
