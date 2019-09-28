import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '@env/environment';
import { HttpHeaders } from '@angular/common/http';
import * as _ from 'lodash';
const moment = require('moment');

@Injectable()
export class TransactionService {
  private serviceUrl = 'txn';
  private entryUrl = 'entry';
  private urls = {
    //transactions
    SEARCH: `${environment.apiUrl}/${this.serviceUrl}`,
    FIND_BY_CODE: `${environment.apiUrl}/${this.serviceUrl}/find-by-code`,
    SAVE: `${environment.apiUrl}/${this.serviceUrl}`,
    SAVE_WITH_ENTRIES: `${environment.apiUrl}/${this.serviceUrl}/with-entries`,

    //entries
    FIND_ENTRIES_BY_TXN_CODE: `${environment.apiUrl}/${this.entryUrl}/find-by-transaction-code`,
  };

  constructor(private httpClient: HttpClient) {
  }

  public search(transactionSearch): Observable<any> {
    return this.httpClient.get(this.urls.SEARCH, { params: transactionSearch });
  }

  public findByCode(code: string) {
    return this.httpClient.get(this.urls.FIND_BY_CODE, { params: { code }});
  }

  public save(transaction): Observable<any> {
    return this.httpClient.post(this.urls.SAVE, transaction);
  }

  public saveTransactionWithEntries(transaction, entries): Observable<any> {
    const txnWithEntries = {
      transaction: _.cloneDeep(transaction),
      entries: _.cloneDeep(entries)
    };

    //Format the dates before submitting
    txnWithEntries.transaction.transactionDate = moment(txnWithEntries.transaction.transactionDate).format('YYYY-MMM-DD');
    txnWithEntries.entries.forEach(entry => {
        entry.entryDate = moment(entry.entryDate).format('YYYY-MMM-DD');
    });

    return this.httpClient.post(this.urls.SAVE_WITH_ENTRIES, txnWithEntries);
  }

  public findEntriesByTransactionCode(transactionCode: string) {
    return this.httpClient.get(this.urls.FIND_ENTRIES_BY_TXN_CODE, { params: { transactionCode }});
  }

}
