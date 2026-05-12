/**
 * Compatibility shim: @next/env v16 dropped the default export that Payload
 * v3 expects. This preload script patches the module cache so that
 * `import nextEnvImport from '@next/env'` resolves to the named exports
 * object instead of `undefined`.
 *
 * Usage: tsx --require ./scripts/patch-next-env.cjs scripts/seed.ts
 */
'use strict';

const Module = require('module');
const originalLoad = Module._load;

Module._load = function (request, parent, isMain) {
  const result = originalLoad.apply(this, arguments);
  if (
    request === '@next/env' &&
    result &&
    result.loadEnvConfig &&
    !result.default
  ) {
    result.default = result;
  }
  return result;
};
