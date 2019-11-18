import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { catchError, map } from "rxjs/operators";



// Set the http options
const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json"})
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  /**
   * Function to handle error when the server return an error
   *
   * @param error
   */
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
     
      console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code. The response body may contain clues as to what went wrong,
      console.log(error)
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError(error);
  }

  /**
   * Function to extract the data when the server return some
   *
   * @param res
   */
  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  /**
   * Function to GET what you want
   *
   * @param url
   */
  public getPublishers(url: string): Observable<any> {
    //return this.http.get(url);
    // Call the http GET
    return this.http.get(url+"/items", httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }


  public getTemplate(url: string): Observable<any> {
    //return this.http.get(url);
    // Call the http GET
    return this.http.get(url+"/template", httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }


   /**
   * Function to GET what you want
   *
   * @param url
   */
  public update(url: string,action:string,dataObject:any): Observable<any> {
    //return this.http.get(url);
    // Call the http GET
    if(action=="template"){
      return this.http.post(url+"/"+action+"/template",{"template": dataObject}, httpOptions).pipe(
        map(this.extractData),
        catchError(this.handleError)
      );
    } 
    else if(action=="mails"){
    
  
      return this.http.post(url+"/"+action+"/"+dataObject._id,dataObject.mails, httpOptions).pipe(
        map(this.extractData),
        catchError(this.handleError)
      );
    }
    else if(action=="publishercolor"){
      return this.http.post(url+"/"+action+"/"+dataObject._id,{color:dataObject.color}, httpOptions).pipe(
        map(this.extractData),
        catchError(this.handleError)
      );
    }
    else if(action=="bookcolor"){
      return this.http.post(url+"/"+action+"/"+dataObject._id,{color:dataObject.color,isbn13:dataObject.isbn13}, httpOptions).pipe(
        map(this.extractData),
        catchError(this.handleError)
      );
    }
    else{
  
      return this.http.get(url+"/"+action+"/"+dataObject._id, httpOptions).pipe(
        map(this.extractData),
        catchError(this.handleError)
      );
    }
  }

 /**
   * Function to POST what you want
   *
   * @param url
   * @param data
   */
 public sendMail(url: string,data:any): Observable<any> {
   console.log("")
   console.log("sendMail:")
   console.log(url)
   console.log(data)
    return this.http.post(url,data, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
 }


}
