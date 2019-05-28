import {
  instanceOfResponseEnvelope,
  packEnvelope,
  SignatureProviderInterface,
  SignatureProviderInterfaceParams,
  SignatureProviderRequestEnvelope,
  unpackEnvelope,
} from 'eosjs-signature-provider-interface'

import { ExpiringLocalStorageProvider } from './ExpiringLocalStorageProvider'

export class SignatureProvider extends SignatureProviderInterface {
  private localStorage: ExpiringLocalStorageProvider
  private expiryMs: number

  constructor(params: SignatureProviderInterfaceParams) {
    super(params)
    this.localStorage = new ExpiringLocalStorageProvider()
    this.expiryMs = 100 * 60 * 1000 // Cache for 100 minutes
    window.addEventListener('message', this.onWindowMessage)
  }

  protected sendRequest(requestEnvelope: SignatureProviderRequestEnvelope): void {
    const packedRequestEnvelope = packEnvelope(requestEnvelope)
    // TODO: Allow '*' origin if on a development env, and only tighten down to declaredDomain if on production env.
    window.postMessage(packedRequestEnvelope, requestEnvelope.declaredDomain)
  }

  public getCachedKeys(): string[] {
    const keys = this.localStorage.get('publicKeys')
    return keys || []
  }

  public setCachedKeys(keys: string[]): void {
    this.localStorage.set('publicKeys', keys, this.expiryMs)
  }

  public clearCachedKeys(): void {
    this.localStorage.remove('publicKeys')
  }

  public cleanUp(): void {
    window.removeEventListener('message', this.onWindowMessage)
  }

  private onWindowMessage = (event: MessageEvent) => {
    const packedResponseEnvelope = event.data as string

    let responseEnvelope
    try {
      responseEnvelope = unpackEnvelope(packedResponseEnvelope)
    } catch (e) {
      // Data coming over message event was from some other source; ignore it
      return
    }

    if (!instanceOfResponseEnvelope(responseEnvelope)) { return }

    this.handleResponse(responseEnvelope)
  }
}
