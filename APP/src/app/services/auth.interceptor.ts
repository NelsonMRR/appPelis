import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RestService } from "./rest.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(
        private restService:RestService
    ){

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authReq = req;
        const token = this.restService.getToken();
        if (token != null) {
            authReq = authReq.clone({
                setHeaders : {Authorization: `Bearer ${token}`}
            }) 
        }
        return next.handle(authReq)
    }
    
}

export const authInterceptorProviders = [
    {
        provide : HTTP_INTERCEPTORS,
        useClass : AuthInterceptor,
        multi : true
    }
]