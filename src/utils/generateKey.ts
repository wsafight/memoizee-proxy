const generateKeyError = new Error("Can't generate key from function argument")

// Generate key value according to parameters
export function generateKey(argument: any[]): string {

  const params = Array.from(argument).join(',')

  try{
    return `${params}`
  }catch(_) {
    throw generateKeyError
  }
}