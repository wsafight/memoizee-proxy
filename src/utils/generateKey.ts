const generateKeyError = new Error("Can't generate key from function argument")

// Generate key value according to parameters
export function generateKey(argument: any[]): string {

  try{
    return `${Array.from(argument).join(',')}`
  }catch(_) {
    throw generateKeyError
  }
}