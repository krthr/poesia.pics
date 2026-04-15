import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'home': { paramsTuple?: []; params?: {} }
    'generate.create': { paramsTuple?: []; params?: {} }
    'generate.store': { paramsTuple?: []; params?: {} }
    'poem.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'poem.image': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'uploads.poem': { paramsTuple: [ParamValue]; params: {'filename': ParamValue} }
    'lang.switch': { paramsTuple: [ParamValue]; params: {'code': ParamValue} }
    'new_account.create': { paramsTuple?: []; params?: {} }
    'new_account.store': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
    'session.store': { paramsTuple?: []; params?: {} }
    'session.destroy': { paramsTuple?: []; params?: {} }
    'admin.moods.index': { paramsTuple?: []; params?: {} }
    'admin.moods.create': { paramsTuple?: []; params?: {} }
    'admin.moods.store': { paramsTuple?: []; params?: {} }
    'admin.moods.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.moods.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.moods.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.voices.index': { paramsTuple?: []; params?: {} }
    'admin.voices.create': { paramsTuple?: []; params?: {} }
    'admin.voices.store': { paramsTuple?: []; params?: {} }
    'admin.voices.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.voices.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.voices.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.poems.index': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'home': { paramsTuple?: []; params?: {} }
    'generate.create': { paramsTuple?: []; params?: {} }
    'poem.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'poem.image': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'uploads.poem': { paramsTuple: [ParamValue]; params: {'filename': ParamValue} }
    'lang.switch': { paramsTuple: [ParamValue]; params: {'code': ParamValue} }
    'new_account.create': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
    'admin.moods.index': { paramsTuple?: []; params?: {} }
    'admin.moods.create': { paramsTuple?: []; params?: {} }
    'admin.moods.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.voices.index': { paramsTuple?: []; params?: {} }
    'admin.voices.create': { paramsTuple?: []; params?: {} }
    'admin.voices.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.poems.index': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'home': { paramsTuple?: []; params?: {} }
    'generate.create': { paramsTuple?: []; params?: {} }
    'poem.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'poem.image': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'uploads.poem': { paramsTuple: [ParamValue]; params: {'filename': ParamValue} }
    'lang.switch': { paramsTuple: [ParamValue]; params: {'code': ParamValue} }
    'new_account.create': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
    'admin.moods.index': { paramsTuple?: []; params?: {} }
    'admin.moods.create': { paramsTuple?: []; params?: {} }
    'admin.moods.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.voices.index': { paramsTuple?: []; params?: {} }
    'admin.voices.create': { paramsTuple?: []; params?: {} }
    'admin.voices.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.poems.index': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'generate.store': { paramsTuple?: []; params?: {} }
    'new_account.store': { paramsTuple?: []; params?: {} }
    'session.store': { paramsTuple?: []; params?: {} }
    'session.destroy': { paramsTuple?: []; params?: {} }
    'admin.moods.store': { paramsTuple?: []; params?: {} }
    'admin.voices.store': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'admin.moods.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.voices.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'admin.moods.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.voices.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}