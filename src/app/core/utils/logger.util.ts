import { environment } from '../../../environments/environment';

export function logDev(message: string, ...data: any[]) {
  if (!environment.production) {
    console.log(`[DEV] ${message}`, ...data);
  }
}
