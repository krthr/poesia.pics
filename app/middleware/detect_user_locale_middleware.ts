import { I18n } from '@adonisjs/i18n'
import i18nManager from '@adonisjs/i18n/services/main'
import type { NextFn } from '@adonisjs/core/types/http'
import { type HttpContext, RequestValidator } from '@adonisjs/core/http'

/**
 * The "DetectUserLocaleMiddleware" middleware uses i18n service to share
 * a request specific i18n object with the HTTP Context
 */
export default class DetectUserLocaleMiddleware {
  /**
   * Using i18n for validation messages. Applicable to only
   * "request.validateUsing" method calls
   */
  static {
    RequestValidator.messagesProvider = (ctx) => {
      return ctx.i18n.createMessagesProvider()
    }
  }

  /**
   * Resolves the user's locale. Checks the session first (set by
   * the language toggle), then falls back to Accept-Language header.
   * The resolved locale is persisted to the session for subsequent
   * requests.
   */
  protected getRequestLocale(ctx: HttpContext): string {
    const sessionLocale = ctx.session.get('locale') as string | undefined
    if (sessionLocale && i18nManager.supportedLocales().includes(sessionLocale)) {
      return sessionLocale
    }

    const userLanguages = ctx.request.languages()
    const detected = i18nManager.getSupportedLocaleFor(userLanguages)
    return detected || i18nManager.defaultLocale
  }

  async handle(ctx: HttpContext, next: NextFn) {
    const language = this.getRequestLocale(ctx)

    ctx.session.put('locale', language)

    ctx.i18n = i18nManager.locale(language)

    /**
     * Binding I18n class to the request specific instance of it.
     * Doing so will allow IoC container to resolve an instance
     * of request specific i18n object when I18n class is
     * injected somewhere.
     */
    ctx.containerResolver.bindValue(I18n, ctx.i18n)

    /**
     * Sharing request specific instance of i18n with edge
     * templates.
     *
     * Remove the following block of code, if you are not using
     * edge templates.
     */
    if ('view' in ctx) {
      ctx.view.share({ i18n: ctx.i18n })
    }

    return next()
  }
}

/**
 * Notify TypeScript about i18n property
 */
declare module '@adonisjs/core/http' {
  export interface HttpContext {
    i18n: I18n
  }
}