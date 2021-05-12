type maxAgeSource = string | number | undefined

type timeUnit = 's' | 'm' | 'h' | 'd'

type convertNumberFromTimeUnit = (str: string) => number

const getNumberFromTime: Record<timeUnit, convertNumberFromTimeUnit> = {
  's': str => Number(str) * 1000,
  'm': str => Number(str) * 60 * 1000,
  'h': str => Number(str) * 60 * 60 * 1000,
  'd': str => Number(str) * 24 * 60 * 60 * 1000
}

export default function
  convertMaxAgeFromStringToNumber(maxAge: maxAgeSource): number {
  if (!maxAge) {
    return Infinity
  }

  if (typeof maxAge === 'number') {
    return maxAge as number
  }

  const str: timeUnit = maxAge[maxAge.length - 1] as timeUnit

  return getNumberFromTime[str](maxAge)
}