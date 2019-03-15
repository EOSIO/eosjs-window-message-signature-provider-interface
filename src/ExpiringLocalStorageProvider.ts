export class ExpiringLocalStorageProvider {
  public set(variable: string, value: any, expiryMs: number) {
    const data = {
      value,
      expiresAt: new Date().getTime() + expiryMs,
    }
    window.localStorage.setItem(variable, JSON.stringify(data))
  }

  public get(variable: string): any {
    const val = window.localStorage.getItem(variable) || ''
    if (!val) {
      return null
    }
    const data = JSON.parse(val)
    if (data && data.expiresAt && data.expiresAt > new Date().getTime()) {
      return data.value
    } else {
      window.localStorage.removeItem(variable)
    }
    return null
  }

  public remove(variable: string) {
    window.localStorage.removeItem(variable)
  }
}
