import { Request } from '@adonisjs/core/http'

import type { Device } from '#services/device_service'
import DeviceService from '#services/device_service'

declare module '@adonisjs/core/http' {
  export interface Request {
    device?: Device
  }
}

Request.getter('device', function (this: Request) {
  try {
    return DeviceService.getDevice(this)
  } catch (error) {}
})
