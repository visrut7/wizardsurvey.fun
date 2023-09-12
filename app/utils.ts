import * as crypto from 'crypto'

export function getClientIP(request: Request): string | undefined {
  const headers = request.headers
  const xForwardedFor = headers.get('x-forwarded-for')

  if (xForwardedFor) {
    const ipList = xForwardedFor.split(',')
    return ipList[0].trim()
  } else {
    if ((request as any).connection === undefined) {
      return 'undefined'
    }
    return (request as any).connection.remoteAddress
  }
}

export function createHash(data: string): string {
  const sha256 = crypto.createHmac('sha256', process.env.SALT!)
  const ipHash = sha256.update(data!)
  const ipHashDigest = ipHash.digest('hex')
  return ipHashDigest
}
