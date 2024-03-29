import { Product_Images_ListModel, paginationModel } from './../../../model/product';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CategorySubcategoryService } from '../../../service/category-subcategory.service';
import { ProductService } from '../../../service/product.service';
import { categoryDataModel, subcategoryDataModel } from '../../../model/category-subcategory';
import { registerModel } from '../../../model/admin';
import { ImageListModel, UpdateImageListModel, ImageModel, productListModel } from '../../../model/product';


@Component({
  selector: 'app-viewproduct',
  templateUrl: './viewproduct.component.html',
  styleUrls: ['./viewproduct.component.css']
})
export class ViewproductComponent implements OnInit {

  imageSrc: string = '';
  modalRef: BsModalRef;

  user = new registerModel();

  imageList: ImageListModel[] = [];

  imageModel: ImageModel[] = [];

  tempImageList: UpdateImageListModel[] = [];
  updateImageList: UpdateImageListModel[] = [];

  // RowCount: number;
  // pageSize: number = 6;

  // totalPageList: paginationModel[] = [];

  product = new productListModel();
  productDetails: productListModel[] = [];

  product_image = new Product_Images_ListModel();
  product_imageDetails: Product_Images_ListModel[] = [];

  category = new categoryDataModel();
  categoryDetails: categoryDataModel[] = [];

  subcategory = new subcategoryDataModel();
  subcategoryDetails: subcategoryDataModel[] = [];

  search_: any;
  // public imageUrl = "http://localhost:44317/Documents/Images/Product/";

  // Pagination
  RowCount: number;
  pageSize: number = 5;
  totalPageList: paginationModel[] = [];
  totalPageSize: number;
  pagesize: any;
  currentPageIndex: number = 0;
  pageOfItems: Array<any>;

  // Authentication
  RoleJason = {
    ROle: [0, 1],
    Component: 'ViewproductComponent'
  };

  constructor(private router: Router,
    private productService: ProductService,
    private toastr: ToastrService,
    private categoryService: CategorySubcategoryService,
    private modalService: NgbModal,
    private modalServices: BsModalService
  ) {
    // this.productList();
    // this.categoryList();
    this.active_deactive_CategoryList();

    const item = { pageIndex: 0 };
    this.productList(item);
  }

  ngOnInit() {
    this.checkRole(this.RoleJason);
  }

  checkRole(RoleJason) {
    const result = JSON.parse(localStorage.getItem('adminLogin')) || [];
    if (this.RoleJason.Component === RoleJason.Component) {
      // console.log(result);
      if (!this.RoleJason.ROle.includes(result.userType)) {
        this.router.navigate(['admin/login']);
      }
    }
  }

  // Display

  // productList() {
  //   this.productService.productList().subscribe((data: any) => {
  //     if (data.Status.code === 0) {
  //       if (data.ProductList) {
  //         this.productDetails = data.ProductList;
  //       }
  //     }
  //   }, (err) => {

  //   });
  // }

  // productList() {
  //   this.user = JSON.parse(localStorage.getItem('adminLogin')) || {};
  //   this.product.userid = this.user.id;
  //   // console.log(this.product.userid);

  //   this.productService.each_admin_ProductList(this.product).subscribe((data: any) => {
  //     if (data.Status.code === 0) {
  //       if (data.each_admin_ProductList) {
  //         this.productDetails = data.each_admin_ProductList;
  //         // console.log(this.productDetails);

  //       }
  //     }
  //   }, (err) => {

  //   });
  // }
  onsearch() {
    const item = { pageIndex: 0 };
    this.productList(item);
  }

  productList(item) {
    this.user = JSON.parse(localStorage.getItem('adminLogin')) || {};
    this.product.userid = this.user.id;

    this.product.pageIndex = item.pageIndex;
    this.product.pageSize = this.pageSize;

    this.product.search = this.search_;

    this.productService.each_admin_ProductList(this.product).subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.each_admin_ProductList) {
          this.productDetails = data.each_admin_ProductList;

        }
        if (data.RowCount) {
          this.RowCount = data.RowCount;
        }
        this.totalPageSize = Math.ceil(this.RowCount / this.pageSize);
        // console.log(totalPageSize);

        this.totalPageList = [];
        for (var i = 0; i < this.totalPageSize; i++) {
          this.totalPageList.push({ pageSize: i + 1, pageIndex: i })

        }
      }
    }, (err) => {

    });

  }


  // Edit
  openupdatemodal(content, item) {
    this.product = JSON.parse(JSON.stringify(item));
    // data show in model use this line and store the data in user and display in ui
    this.modalService.open(content, { backdropClass: 'light-blue-backdrop' });
    // this.viewData = JSON.parse(localStorage.getItem('Register')) || [];

  }


  open_image_modal(images, item) {
    this.product = JSON.parse(JSON.stringify(item));
    this.modalService.open(images, { size: 'xl', backdropClass: 'light-blue-backdrop' });
  }



  onEdit(id: number) {

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

    if (!this.product.imageList) {
      strError += strError = '' ? '' : '<br/>';
      strError += '- Please select image, atleast one image must be selected';
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
    this.product.modifiedby = this.user.id;
    // console.log(this.product.modifiedby);

    this.product.imageList = this.imageList;
    this.product.imageListData = this.imageModel;

    // console.log(this.product);

    this.productService.updateProduct(id, this.product).subscribe((data: any) => {
      if (data.Status.code === 0) {
        // alert('Product updated sucesfully');
        this.toastr.success('Product updated sucesfully', 'Successful', {
          disableTimeOut: false
        });
        // this.modalService.close('Modal Closed');
        // this.modalRef.hide();
        this.modalService.dismissAll();
        // this.modalService.dismissAll();
        // this.modal.dismiss('Cross click');
      } else {
        // alert("Not Matched");
        this.toastr.warning('Please fill the remaining fields', 'Warning', {
          disableTimeOut: false,
          timeOut: 2000
        });
      }


      // this.product = new productModel();
      // this.productList();
      const item = { pageIndex: 0 };
      this.productList(item);

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



  // Delete

  onDelete(id: number) {
    // if (confirm('Are you sure to delete this record ?') === true) {
    this.productService.deleteProduct(id).subscribe(data => {
      this.productService.productList();
      // this.productList();
      const item = { pageIndex: 0 };
      this.productList(item);
    });
    // }
    this.toastr.success('Product deleted Successful', 'Successful', {
      disableTimeOut: false,
      timeOut: 2000
    });
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

  active_deactive_CategoryList() {
    this.categoryService.active_CategoryList().subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.CategoryList_ActiveDeactive) {
          this.categoryDetails = data.CategoryList_ActiveDeactive;

        }
      }
    }, (err) => {

      // console.log(this.categoryDetails);
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

      // console.log(this.subcategoryDetails);
    });
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
  //     // console.log(file);

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

  changeStatus(id: number) {
    // console.log(id);
    this.productService.changeStatus(id).subscribe(data => {
      // this.productList();
      const item = { pageIndex: 0 };
      this.productList(item);
    });
  }

  addnewProduct() {
    this.router.navigate(['/admin/product/addproduct']);
  }

  view_product_Images(id) {
    // this.router.navigate(['/admin/product/product-images']);
    this.product_Images_List(id)
  }
  product_Images_List(id) {
    this.productService.product_Images_List(id).subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.Product_Images_List) {
          this.product_imageDetails = data.Product_Images_List;
          // console.log(this.product_imageDetails);
        }
      }
    }, (err) => {
    });
  }

  DeleteImage(id: number) {
    // if (confirm('Are you sure to delete this record ?') === true) {
    this.productService.DeleteImage(id).subscribe(data => {
      // this.product_Images_List(id)
    });
    // }
    this.toastr.success('Image deleted Successful', 'Successful', {
      disableTimeOut: false,
      timeOut: 2000
    });
  }


}

