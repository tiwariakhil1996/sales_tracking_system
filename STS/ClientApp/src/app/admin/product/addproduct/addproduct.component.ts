import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CategorySubcategoryService } from '../../../service/category-subcategory.service';
import { ProductService } from '../../../service/product.service';
import { productModel, ImageListModel, ImageModel, UpdateImageListModel } from '../../../model/product';
import { categoryDataModel, subcategoryDataModel } from '../../../model/category-subcategory';
import { registerModel } from '../../../model/admin';


// import {DomSanitizatio.nService} from '@angular/platform-browser';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {

  errorMessage = '';
  imageSrc: string = '';
  modalRef: BsModalRef;
  // myDate = new Date();
  imageList: ImageListModel[] = [];
  imageModel: ImageModel[] = [];

  tempImageList: UpdateImageListModel[] = [];
  updateImageList: UpdateImageListModel[] = [];

  currentDate = new Date();

  user = new registerModel();

  product = new productModel();
  productDetails: productModel[] = [];

  category = new categoryDataModel();
  categoryDetails: categoryDataModel[] = [];

  subcategory = new subcategoryDataModel();
  subcategoryDetails: subcategoryDataModel[] = [];

  RoleJason = {
    ROle: [0, 1],
    Component: 'AddproductComponent'
  };

  constructor(private router: Router,
    private toastr: ToastrService,
    private productService: ProductService,
    private modalServices: BsModalService,
    private modalService: NgbModal,
    private categoryService: CategorySubcategoryService) {

    this.active_CategoryList();

  }

  ngOnInit() {
    this.checkRole(this.RoleJason);
  }

  checkRole(RoleJason) {
    const result = JSON.parse(localStorage.getItem('adminLogin')) || [];
    if (this.RoleJason.Component === RoleJason.Component) {
      console.log(result);
      if (!this.RoleJason.ROle.includes(result.userType)) {
        this.router.navigate(['admin/login']);
      }
    }
  }


  // categoryList() {
  //   this.categoryService.categoryList().subscribe((data: any) => {
  //     if (data.Status.code === 0) {
  //       if (data.CategoryList) {
  //         this.categoryDetails = data.CategoryList;

  //       }
  //     }
  //   }, (err) => {

  //     console.log(this.categoryDetails);
  //   });
  // }

  active_CategoryList() {
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

  active_SubcategoryList() {
    this.categoryService.active_SubcategoryList().subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.SubcategoryList_ActiveDeactive) {
          this.categoryDetails = data.SubcategoryList_ActiveDeactive;

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

  submitForm() {

    let strError = '';

    if (!this.product.cid) {
      strError += strError = '- Please select category';
    } else
      if (!this.product.sid) {
        strError += strError = '' ? '' : '<br/>';
        strError += '- Please select subcategory';
      }


    if (!this.product.productname) {
      strError += strError = '' ? '' : '<br/>';
      strError += '- Please enter productname';
    } else {
      if (!this.validateProductname(this.product.productname)) {
        strError += strError = '' ? '' : '<br/>';
        strError += strError = '- Product name should only contain alphabets & number';
      }
    }

    if (!this.product.price) {
      strError += strError = '' ? '' : '<br/>';
      strError += strError = '- Please enter price';
    } else {
      if (!this.validateprice(this.product.price)) {
        strError += strError = '' ? '' : '<br/>';
        strError += strError = '- Price should be in numbers';
      }
    }

    if (!this.product.description) {
      strError += strError = '' ? '' : '<br/>';
      strError += '- Please enter description';
    } else {
      if (!this.validateDescription(this.product.description)) {
        strError += strError = '' ? '' : '<br/>';
        strError += strError = '- Description  should only contain alphabets & number';
      }
    }

    // if (!this.product.image) {
    //   strError += strError = '' ? '' : '<br/>';
    //   strError += '- Please select image';
    // }


    if (!this.product.imageList) {
      strError += strError = '' ? '' : '<br/>';
      strError += '- Please select image';
    }

    // if (!this.product.date) {
    //   strError += strError = '' ? '' : '<br/>';
    //   strError += '- Please select date';
    // }

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

    this.user = JSON.parse(localStorage.getItem('adminLogin')) || {};
    this.product.createdby = this.user.id;
    console.log(this.product.createdby);

    this.product.imageList = this.imageList;
    this.product.imageListData = this.imageModel;

    this.productService.addProduct(this.product).subscribe((data: any) => {
      if (data.Status.code === 0) {
        // alert('Product added sucesfully');
        this.toastr.success('Product added succesfully', 'Successful', {
          disableTimeOut: false
        });
        this.product = new productModel();
      } else {
        // alert("Not Matched");
        this.toastr.warning('Please fill the remaining fields', 'Warning', {
          disableTimeOut: false,
          timeOut: 2000
        });
      }


    }, (err) => {


    });
  }


  productnameValidation() {
    let isValid = false;
    if (!this.validateProductname(this.product.productname)) {
      isValid = true;
    }

    if (isValid) {
      this.toastr.warning('Please enter productname correctly', 'Warning', {
        disableTimeOut: false,
        timeOut: 2000
      });
    }

  }

  validateProductname(productnameField) {
    const reg = /^[A-Za-z0-9\s]+$/;
    return reg.test(productnameField) === false ? false : true;
  }

  priceValidation() {
    let isValid = false;
    if (!this.validateprice(this.product.price)) {
      isValid = true;
    }

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



  productDescription() {
    let isValid = false;
    if (!this.validateDescription(this.product.description)) {
      isValid = true;
    }

    if (isValid) {
      this.toastr.warning('Please enter productname correctly', 'Warning', {
        disableTimeOut: false,
        timeOut: 2000
      });
    }

  }

  validateDescription(productdescription) {
    // const reg = /^[A-Za-z0-9\s]+$/;
    const reg = /^[A-Za-z0-9\s!@#$%^&*(),.?":{}|<>]+$/;
    return reg.test(productdescription) === false ? false : true;
  }



  // Image to Base64

  // handleFileInput(fileList: FileList) {
  //   const preview = document.getElementById('photos-preview');
  //   Array.from(fileList).forEach((file: File) => {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       const image = new Image();
  //       image.src = String(reader.result);
  //       const imageDetail = String(reader.result).split(';base64,');
  //       this.product.image = imageDetail[1];
  //       this.product.ImageExtn = '.' + imageDetail[0].replace('data:image/', '');
  //       image.height = 100;
  //       image.width = 100;
  //       preview.appendChild(image);
  //     };
  //     reader.readAsDataURL(file);
  //     console.log(file);

  //   });
  // }

  handleFileInput(fileList: FileList) {
    this.imageList = [];
    this.imageModel = [];
    // const preview = document.getElementById('photos-preview');
    Array.from(fileList).forEach((file: File) => {
      const reader = new FileReader();
      reader.onload = () => {
        // const image = new Image();
        // image.src = String(reader.result);
        const imageDetail = String(reader.result).split(';base64,');
        // this.product.imageList = imageDetail[1];
        // this.image.ImageExtn = '.' + imageDetail[0].replace('data:image/', '');
        // image.height = 100;
        // image.width = 100;
        // preview.appendChild(image);
        this.tempImageList.push({ ImageId: 0, ImageData: String(reader.result) });
        this.imageList.push({ ImageExtn: '.' + imageDetail[0].replace('data:image/', ''), Image: '', ImageData: imageDetail[1] });
        this.imageModel.push({ Image: '' });

      };
      reader.readAsDataURL(file);
      console.log(file);
    });
  }

  resetForm() {
    this.product = new productModel();
  }


  viewProductForm() {
    this.router.navigate(['/admin/product/viewproduct']);
  }

}
