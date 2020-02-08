import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CategorySubcategoryService } from '../../../service/category-subcategory.service';
import { ProductService } from '../../../service/product.service';
import { productModel } from '../../../model/product';
import { categoryDataModel, subcategoryDataModel } from '../../../model/category-subcategory';

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
  categoryDetails: categoryDataModel[] = [];

  subcategory = new subcategoryDataModel();
  subcategoryDetails: subcategoryDataModel[] = [];

  constructor(private router: Router,
    private productService: ProductService,
    private toastr: ToastrService,
    private categoryService: CategorySubcategoryService,
    private modalService: NgbModal
  ) {
    this.productList();
    // this.categoryList();
    this.active_deactive_CategoryList();
  }

  ngOnInit() {
  }

  // Display

  productList() {
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
    // data show in model use this line and store the data in user and display in ui
    this.modalService.open(content, { backdropClass: 'light-blue-backdrop' });
    // this.viewData = JSON.parse(localStorage.getItem('Register')) || [];

  }

  onEdit(id: number) {

    let strError = '';

    if (!this.product.cid) {
      strError += strError = '- Please select category';
    }
    else
      if (!this.product.sid) {
        strError += strError = '' ? '' : '<br/>';
        strError += '- Please select subcategory';
      }


    if (!this.product.productname) {
      strError += strError = '' ? '' : '<br/>';
      strError += '- Please enter productname';
    }
    else {
      if (!this.validateProductname(this.product.productname)) {
        strError += strError = '' ? '' : '<br/>';
        strError += strError = '- Product name should only contain alphabets & number';
      }
    }

    if (!this.product.price) {
      strError += strError = '' ? '' : '<br/>';
      strError += strError = '- Please enter price';
    }
    else {
      if (!this.validateprice(this.product.price)) {
        strError += strError = '' ? '' : '<br/>';
        strError += strError = '- Price should be in numbers';
      }
    }

    if (!this.product.description) {
      strError += strError = '' ? '' : '<br/>';
      strError += '- Please enter description';
    }
    else {
      if (!this.validateProductname(this.product.description)) {
        strError += strError = '' ? '' : '<br/>';
        strError += strError = '- Description  should only contain alphabets & number';
      }
    }

    if (!this.product.image) {
      strError += strError = '' ? '' : '<br/>';
      strError += '- Please select image';
    }

    if (!this.product.date) {
      strError += strError = '' ? '' : '<br/>';
      strError += '- Please select date';
    }

    if (strError !== '') {
      this.toastr.warning(strError, 'Warning', {
        disableTimeOut: false,
        timeOut: 2000,
        enableHtml: true,
        progressBar: true,
        closeButton: true,
      });
      return false;
    }



    this.productService.updateProduct(id, this.product).subscribe((data: any) => {
      if (data.Status.code === 0) {
        // alert('Product updated sucesfully');
        this.toastr.success('Product updated sucesfully', 'Successful', {
          disableTimeOut: false
        });
      }
      else {
        // alert("Not Matched");
        this.toastr.warning('Please fill the remaining fields', 'Warning', {
          disableTimeOut: false,
          timeOut: 2000
        });
      }

      // this.product = new productModel();
      this.productList();
    }, (err) => {
    });
  }



  productnameValidation() {
    let isValid = false;
    if (!this.validateProductname(this.product.productname)) {
      isValid = true;
    }
    ;

    if (isValid) {
      this.toastr.warning('Please enter productname correctly', 'Warning', {
        disableTimeOut: false,
        timeOut: 2000
      });
    }

  }

  validateProductname(productnameField) {
    const reg = /^[A-Za-z0-9]+$/;
    return reg.test(productnameField) == false ? false : true;
  }

  priceValidation() {
    let isValid = false;
    if (!this.validateprice(this.product.price)) {
      isValid = true;
    };

    if (isValid) {
      this.toastr.warning('Please enter price correctly', 'Warning', {
        disableTimeOut: false,
        timeOut: 2000
      });
    }

  }
  validateprice(priceField) {
    const reg = /^[0-9]+$/;
    return reg.test(priceField) === false ? false : true;
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


  categoryList() {
    this.categoryService.categoryList().subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.CategoryList) {
          this.categoryDetails = data.CategoryList;

        }
      }
    }, (err) => {

      console.log(this.categoryDetails);
    });
  }

  active_deactive_CategoryList() {
    this.categoryService.active_CategoryList().subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.CategoryList_ActiveDeactive) {
          this.categoryDetails = data.CategoryList_ActiveDeactive;

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
    this.categoryService.subcategoryList(catid).subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.SubcategoryList) {
          this.subcategoryDetails = data.SubcategoryList;
        }
      }
    }, (err) => {

      console.log(this.subcategoryDetails);
    });
  }


  // Image to Base64

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

  
  changeStatus(id: number) {
    // console.log(id);
    this.productService.changeStatus(id).subscribe(data => {
      this.productList();
    });
  }

  addnewProduct() {
    this.router.navigate(['/admin/product/addproduct']);
  }
}
