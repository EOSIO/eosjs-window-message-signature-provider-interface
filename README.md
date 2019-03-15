# EOSJS Signature Provider for desktop browsers

A [SignatureProviderInterface](https://github.com/EOSIO/eosjs-signature-provider-interface) for communicating with an authenticator over the [Window Messaging API](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) using the [EOSIO Auth Transport Protocol](https://github.com/EOSIO/eosio-auth-transport-protocol-specification).

## Overview

When plugged into `eosjs`, this signature provider enables desktop web applications to route signing requests to a browser extension authenticator. Full instructions for `eosjs` can be found [here](https://github.com/EOSIO/eosjs).

## Installation

```bash
yarn add @blockone/eosjs-window-message-signature-provider-interface

```

## Basic Usage

```javascript
import { Api, JsonRpc } from "eosjs"
import { SignatureProvider } from "@blockone/eosjs-window-message-signature-provider-interface"

const rpc = new JsonRpc("RPC_ENDPOINT_HERE")
const signatureProvider = new SignatureProvider({
  declaredDomain: "YOUR_DOMAIN", // This domain must have a `chain-manifests.json` file at the root
  returnUrl: "YOUR_DOMAIN",
})
const api = new Api({
  rpc,
  signatureProvider,
})

api.transact(...)

```

## Links
- [SignatureProviderInterface](https://github.com/EOSIO/eosjs-signature-provider-interface)
- [Window Messaging API](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage)
- [EOSIO Auth Transport Protocol](https://github.com/EOSIO/eosio-auth-transport-protocol-specification)

## Contribution
Check out the [Contributing](https://github.com/EOSIO/eosjs-window-message-signature-provider-interface/blob/develop/CONTRIBUTING.md) guide and please adhere to the [Code of Conduct](https://github.com/EOSIO/eosjs-window-message-signature-provider-interface/blob/develop/CONTRIBUTING.md#conduct)

## License
[MIT licensed](https://github.com/EOSIO/eosjs-window-message-signature-provider-interface/blob/develop/LICENSE)
