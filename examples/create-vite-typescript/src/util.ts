/*
 * Copyright 2025 Arkadip Bhattacharya
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


import * as crypto from "node:crypto";
import {Buffer} from "node:buffer";

export function jwt_encode(payload: Object, key: string): string {
  // Check key
  if (!key) {
    throw new Error('Require key');
  }

  // to create segments, all segments should be base64 string
  const segments: string[] = [];
  segments.push(base64urlEncode(JSON.stringify({ typ: 'JWT', alg: "HS256" })));
  segments.push(base64urlEncode(JSON.stringify(payload)));
  segments.push(sign(segments.join('.'), key, "sha256"));

  return segments.join('.');
}

function sign(input: string, key: string, method: string): string {
  return  base64urlEscape(crypto.createHmac(method, key).update(input).digest('base64'));
}

function base64urlEncode(str: string): string {
  return base64urlEscape(Buffer.from(str).toString('base64'));
}

function base64urlEscape(str: string): string {
  return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}
