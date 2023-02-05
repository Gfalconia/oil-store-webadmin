import { Component, OnInit, Inject } from '@angular/core';
import { Product } from './product';
import { AddProductService } from '../add-product.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  id: number,
  title: string;
  description: string;
  price: number;
  image: string;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {

  products: Product[];
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;

  displayedColumns: string[] = ['id', 'title', 'description', 'price', 'edit', 'delete'];

  constructor(private addProductService: AddProductService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.get();
  }

  add(title: string, description: string, price: number): void {
    this.addProductService.addProduct({ title, description, price } as Product)
      .subscribe(response => {
      });

  }

  get(): void {
    this.addProductService.getProduct()
    .subscribe(products => this.products = products);
  }

  delete(product: Product): void {
    this.products = this.products.filter(h => h !== product);
    this.addProductService.deleteProduct(product.id).subscribe();
  }

edit() {
  
}

uploadImage(id = 15, image = 'https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg') {
  this.addProductService.uploadImage(({ id, image } as Product)).subscribe();
}

openDialog(id, title, description, image, price): void {
  console.log(this.addProductService.getImage(id).subscribe());
  const dialogRef = this.dialog.open(EditDialog, {
    data: {id, title, description, image, price}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log(result);
    this.update(result.id, result.title, result.description, result.price);
    this.get();
    });
  }

  update(id: number, title: string, description: string, price: number): void {
    title = title.trim();
    if (!title) { return; }
    this.addProductService.updateProduct({id, title, description, price } as Product)
      .subscribe();
  }
}

@Component({
  selector: 'edit-dialog',
  templateUrl: 'edit-dialog.html',
})

export class EditDialog {

  constructor(
    public dialogRef: MatDialogRef<EditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}