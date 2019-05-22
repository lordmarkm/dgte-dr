import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';

export class ObfuscationHttpInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // encrypt request if necessary
    if (this.isClarifiable(req)) {
      req = req.clone({
        body: {
          data: this.encrypt(req)
        }
      });
    }

    // listen for response and decrypt if necessary
    return next.handle(req).pipe(map((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        if (this.isObfuscated(event)) {
          event = event.clone({body: this.decrypt(event)});
        }
      }
      return event;
    }));
  }

  isObfuscated(event) {
    const obfuscatedHeader = event.headers.get('obfuscated');
    return obfuscatedHeader === 'true';
  }

  isClarifiable(req) {
    const clarifiableHeader = req.headers.get('Clarify');
    return clarifiableHeader === 'true';
  }

  decrypt(req) {
    const data = req.body.data;
    const keyForJs = req.headers.get('Obfuscation-Key');
    const key = CryptoJS.enc.Base64.parse(keyForJs);
    const decryptedData = CryptoJS.AES.decrypt(data, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    const decryptedText = decryptedData.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedText);
  }

  encrypt(event) {
    const data = JSON.stringify(event.body);
    const key2 = CryptoJS.lib.WordArray.random(16);
    const iv = CryptoJS.lib.WordArray.random(16);
    const encrypted = CryptoJS.AES.encrypt(data, key2, { iv: iv });
    const cipherData = iv.toString(CryptoJS.enc.Base64) + ':' + encrypted.ciphertext.toString() + ':' + key2.toString(CryptoJS.enc.Base64);

    return cipherData;
  }
}
