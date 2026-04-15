/*
|--------------------------------------------------------------------------
| Limiter file
|--------------------------------------------------------------------------
|
| Rate limiting middleware definitions. Import and apply these
| on routes in start/routes.ts.
|
*/

import limiter from '@adonisjs/limiter/services/main'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

const generateLimiter = limiter.allowRequests(5).every('10 minutes')
const imageLimiter = limiter.allowRequests(10).every('1 hour')

export async function throttleGenerate(ctx: HttpContext, next: NextFn) {
  await generateLimiter.throttle(`generate_${ctx.request.ip()}`, ctx)
  return next()
}

export async function throttleImage(ctx: HttpContext, next: NextFn) {
  await imageLimiter.throttle(`poem_image_${ctx.request.ip()}`, ctx)
  return next()
}
