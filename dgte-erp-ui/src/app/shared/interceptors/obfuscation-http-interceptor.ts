// import { Injectable, Injector } from '@angular/core';
// import {
//   HttpEvent,
//   HttpInterceptor,
//   HttpHandler,
//   HttpRequest,
//   HttpResponse
// } from '@angular/common/http';
// import { Observable } from 'rxjs/Rx';
// import 'rxjs/add/observable/throw';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/map';
// import * as CryptoJS from 'crypto-js';
//
// export class ObfuscationHttpInterceptor implements HttpInterceptor {
//
//   constructor() {}
//
//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     //send the newly created request
//     return next.handle(req).map(event => {
//       if (event instanceof HttpResponse && this.isObfuscated(event)) {
//         event = event.clone({ body: this.decrypt(event) });
//       } else if (event instanceof HttpRequest && this.isClarifiable(event)) {
//         event = event.clone({ body: this.encrypt(event) });
//       }
//       return event;
//     });
//   }
//
//   isObfuscated(event) {
//     let obfuscatedHeader = event.headers.get('Obfuscated');
//     console.log('obfuscatedHeader=' + obfuscatedHeader);
//     return obfuscatedHeader === 'true';
//   }
//
//   isClarifiable(event) {
//     let clarifiableHeader = event.headers.get('Clarify');
//     console.log('obfuscatedHeader=' + clarifiableHeader);
//     return clarifiableHeader === 'true';
//   }
//
//   decrypt(event) {
//     let data = event.body.data;
//     let keyForJs = event.headers.get('Obfuscation-Key');
//
//     var key = CryptoJS.enc.Base64.parse(keyForJs);
//
//     var decryptedData = CryptoJS.AES.decrypt(data, key, {
//         mode: CryptoJS.mode.ECB,
//         padding: CryptoJS.pad.Pkcs7
//     });
//     var decryptedText = decryptedData.toString(CryptoJS.enc.Utf8);
//     return JSON.parse(decryptedText);
//   }
//
//   encrypt(event) {
//     let data = JSON.stringify(event.body);
//     let key2 = CryptoJS.lib.WordArray.random(16);
//     let iv = CryptoJS.lib.WordArray.random(16);
//     let encrypted = CryptoJS.AES.encrypt(data, key2, { iv: iv });
//     let cipherData = iv.toString(CryptoJS.enc.Base64) + ":" + encrypted.ciphertext.toString() + ":" + key2.toString(CryptoJS.enc.Base64);
//     return cipherData;
//   }
//
// }
