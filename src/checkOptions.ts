import { invariant } from "./utils/inveriant";
import { MemoizeOptions } from "./interface";

/**
 * Check the current configuration, if there is a problem, throw an exception
 * @param options
 */
export default function checkOptionsThenThrowError(options: MemoizeOptions) {
  invariant(
    typeof options?.max === 'number' && options.max <= 0,
    'The current options "max" must be positive'
  )

  invariant(
    typeof options?.maxAge === 'number' && options.maxAge <= 0,
    'The current options "maxAge" must be positive'
  )

  invariant(
    typeof options?.maxAge === 'number' && typeof options?.max === 'number',
    'options maxAge and max cannot exist at the same time'
  )

  invariant(
    typeof options?.max === 'number' && options?.refCounter === true,
    'options max and refCounter cannot exist at the same time'
  )

  invariant(
    typeof options?.maxAge === 'number' && options?.refCounter === true,
    'options maxAge and refCounter cannot exist at the same time'
  )
}