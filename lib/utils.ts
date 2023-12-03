import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalizeOrg(str: string, separator = ' ') {
  const name = (value: string) => value.charAt(0).toUpperCase() + value.slice(1)

  return str.split(separator).map(name).join(' ')
}
