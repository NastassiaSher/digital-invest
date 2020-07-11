import {getStatusText, InMemoryDbService, RequestInfo, ResponseOptions, STATUS} from 'angular-in-memory-web-api';
import {from, Observable, of} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import {Injectable} from '@angular/core';


@Injectable()
export class MockedDataService implements InMemoryDbService {

  createDb() {
    return of({});
  }

  get(reqInfo: RequestInfo) {
    // need headers so casting reqInfo to any; see https://github.com/angular/in-memory-web-api/issues/156
    const rq: any = reqInfo as any;
    const url: string = rq.url;
    const headers = rq.req.headers;

    if (reqInfo.apiBase !== 'api/') {
      return null;
    }

    if (url === '/api/getProjectsList') {
      return this.responseFromJson(reqInfo, 'projectsListResponse');
    }

    return this.statusOnlyResponse(reqInfo, STATUS.NOT_FOUND);
  }

  post(reqInfo: RequestInfo) {
    // need body so casting reqInfo to any
    const rq: any = reqInfo as any;
    const url: string = rq.url;
    const body = rq.req.body;

    if (reqInfo.apiBase !== 'api/') {
      return null;
    }
  }

  private statusOnlyResponse(reqInfo: RequestInfo, status: number): Observable<any> {
    return reqInfo.utils.createResponse$(() => {
      return this.finishOptions({
        status: status
      }, reqInfo);
    });
  }

  private responseFromJson(reqInfo: RequestInfo, responseId: string): Observable<any> {
    const jsonUrl = `../assets/json-responses/${responseId}.json`;

    return from(fetch(jsonUrl))
      .pipe(
        mergeMap(response => response.json()),
        mergeMap((response) => {
          let results: any;
          results = response;

          return reqInfo.utils.createResponse$(() => {
            return this.finishOptions({
              body: results,
              status: STATUS.OK
            }, reqInfo);
          });
        })
      );
  }

  private finishOptions(options: ResponseOptions, {headers, url}: RequestInfo) {
    options.statusText = getStatusText(options.status);
    options.headers = headers;
    options.url = url;
    return options;
  }

}
