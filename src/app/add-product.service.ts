import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {Product} from './products/product';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AddProductService {
private productsUrl= 'http://127.0.0.1:3000/products';
private productsUploadImageUrl = 'http://127.0.0.1:3000/products/upload_image';
private getImageUrl = 'http://127.0.0.1:3000/product_image';

httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*'})
};

httpOptionsImageUpload = {
  headers: new HttpHeaders({ 'Content-Type' : 'multipart/form',
  'Accept' : 'application/json',
  'Access-Control-Allow-Origin': '*'})
};

private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    console.error(error); 
    return of(result as T);
  };
}
  constructor(private http: HttpClient) { }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.productsUrl, product, this.httpOptions)
      .pipe(
        catchError(this.handleError<Product>('addProduct')))
  }

  getProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl)
  }

  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(this.productsUrl + '/' + id, this.httpOptions).pipe(
      catchError(this.handleError<Product>('deleteProduct'))
    );
  }

  updateProduct(product: Product): Observable<any> {
    return this.http.put(this.productsUrl + '/' + product.id, product, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateProduct'))
    );
  }

  uploadImage(product: Product): Observable<any>  {
    console.log(product.image)
    return this.http.post(this.productsUploadImageUrl + '/' + product.id, product, this.httpOptions).pipe(
      catchError(this.handleError<Product>('uploadImage'))
    );
  }
  getImage(id) {
    return this.http.get<Product[]>(this.getImageUrl + '/' + id)
  }
}
