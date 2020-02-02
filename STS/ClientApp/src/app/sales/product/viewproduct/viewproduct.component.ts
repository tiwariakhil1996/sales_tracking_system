import { Component, OnInit } from '@angular/core';
import { productModel, categoryDataModel, subcategoryDataModel } from '../../../model/model';
import { CommonService } from '../../../service/common.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-viewproduct',
  templateUrl: './viewproduct.component.html',
  styleUrls: ['./viewproduct.component.css']
})
export class ViewproductComponent implements OnInit {

  imageSrc: string = '';
  modalRef: BsModalRef;

  product = new productModel();
  productDetails: productModel[] = [];

  
  category = new categoryDataModel();
  categoryDetails: categoryDataModel[]=[];

  subcategory = new subcategoryDataModel();
  subcategoryDetails: subcategoryDataModel[]=[];

  constructor(private router: Router, private productService: CommonService,   private modalService: NgbModal) {
    this.productList();
    this.categoryList();


  }
  ngOnInit() {
  }

  //Display

  productList(){
    this.productService.productList().subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.ProductList) {
          this.productDetails = data.ProductList;
        }
      }
    }, (err) => {

    });
  }

  
//Edit
openupdatemodal(content, item) {
  this.product = JSON.parse(JSON.stringify(item));
  // this.product = item;
  // data show in model use this line and store the data in user and display in ui
  this.modalService.open(content, { backdropClass: 'light-blue-backdrop' });
  // this.viewData = JSON.parse(localStorage.getItem('Register')) || [];

}

onEdit(id:number) {
  // this.product.image = this.imageSrc;
  this.productService.updateProduct(id, this.product).subscribe((data: any) => {
    if (data.Status.code === 0) {
      alert('Product updated sucesfully');
    }
    this.product = new productModel();
    this.productList();
  }, (err) => {
  });
}


categoryList() {
  this.productService.categoryList().subscribe((data: any) => {
    if (data.Status.code === 0) {
      if (data.CategoryList) {
        this.categoryDetails = data.CategoryList;
      
      }
    }
  }, (err) => {
    
    console.log(this.categoryDetails); 
  });
}


onCategoryChange(cid) {
  // this.subcategoryDetails = this.subcategoryDetails.filter(item => item.cid == cid);
  this.subcategoryList(cid);
}

subcategoryList(catid) {
  this.productService.subcategoryList(catid).subscribe((data: any) => {
    if (data.Status.code === 0) {
      if (data.SubcategoryList) {
        this.subcategoryDetails = data.SubcategoryList;
      }
    }
  }, (err) => {
    
    console.log(this.subcategoryDetails); 
  });
}

handleFileInput(fileList: FileList) {
  const preview = document.getElementById('photos-preview');
  Array.from(fileList).forEach((file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.src = String(reader.result);
      const imageDetail = String(reader.result).split(';base64,');
      this.product.image = imageDetail[1];
      this.product.ImageExtn = '.' + imageDetail[0].replace('data:image/', '');
      image.height = 100;
      image.width = 100;
      preview.appendChild(image);
    };
    reader.readAsDataURL(file);
    console.log(file);

  });
}

// Delete

onDelete(id: number) {
  if (confirm('Are you sure to delete this record ?') === true) {
    this.productService.deleteProduct(id).subscribe(data => {
      this.productService.productList();
      this.productList();
    });
  }
}
}
