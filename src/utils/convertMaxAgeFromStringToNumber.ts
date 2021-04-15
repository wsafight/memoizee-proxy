type maxAgeSource = string | number | undefined
type maxAgeResult = number | undefined

export default function
    convertMaxAgeFromStringToNumber(maxAge: maxAgeSource): maxAgeResult {
    if (!maxAge || typeof maxAge === 'number') {
        return maxAge as number | undefined
    }

    return 0
}