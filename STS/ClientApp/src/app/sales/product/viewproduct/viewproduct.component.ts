import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BsModalRef } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CategorySubcategoryService } from '../../../service/category-subcategory.service';
import { ProductService } from '../../../service/product.service';
import { productModel, productListModel, ImageListModel, ImageModel, Product_Images_ListModel, UpdateImageListModel, paginationModel } from '../../../model/product';
import { categoryDataModel, subcategoryDataModel } from '../../../model/category-subcategory';
import { salesregisterModel, LocationModel } from '../../../model/sales';
import { SalesService } from '../../../service/sales.service';

@Component({
  selector: 'app-viewproduct',
  templateUrl: './viewproduct.component.html',
  styleUrls: ['./viewproduct.component.css']
})
export class ViewproductComponent implements OnInit {

  imageSrc: string = '';
  modalRef: BsModalRef;

  user = new salesregisterModel();

  saleslocation = new LocationModel();
  saleslocationDetails: LocationModel[] = [];

  imageList: ImageListModel[] = [];

  imageModel: ImageModel[] = [];

  tempImageList: UpdateImageListModel[] = [];
  updateImageList: UpdateImageListModel[] = [];

  product_image = new Product_Images_ListModel();
  product_imageDetails: Product_Images_ListModel[] = [];

  product = new productListModel();
  productDetails: productListModel[] = [];


  category = new categoryDataModel();
  categoryDetails: categoryDataModel[] = [];

  subcategory = new subcategoryDataModel();
  subcategoryDetails: subcategoryDataModel[] = [];

  search_ : any;

  // Pagination
  RowCount: number;
  pageSize: number = 5;
  totalPageList: paginationModel[] = [];
  totalPageSize: number;
  pagesize: any;
  currentPageIndex: number = 0;
  pageOfItems: Array<any>;

  latitude: number;
  longitude: number;
  zoom: number;
  address: string;

  private geoCoder;


  location: Coordinates;
  lat: any;
  lng: any;

  centerlat: any;
  centerlng: any;
  geocoder: any;

  // Authentication
  RoleJason = {
    ROle: [0, 1],
    Component: 'ViewproductComponent'
  };

  constructor(private router: Router,
    private toastr: ToastrService,
    private productService: ProductService,
    private modalService: NgbModal,
    private salesService: SalesService,
    private categoryService: CategorySubcategoryService) {
    // this.productList();
    // this.categoryList();
    this.active_deactive_CategoryList();



  }
  ngOnInit() {
    this.checkRole(this.RoleJason);


    const item = { pageIndex: 0 };
    this.productList(item);

    this.Refresh_Location();
  }

  Refresh_Location() {
    navigator.geolocation.getCurrentPosition(position => {
      this.location = position.coords;
      this.centerlat = this.location.latitude;
      this.centerlng = this.location.longitude;

      this.lat = this.location.latitude;
      this.lng = this.location.longitude;

      console.log(this.lat);
      console.log(this.lng);

      this.geocoder = new google.maps.Geocoder();
      this.Refresh_Sales_Location();
    });

  }

  Refresh_Sales_Location() {
   this.user = JSON.parse(localStorage.getItem('salesLogin')) || {};
   this.saleslocation.userid = this.user.id;
   this.saleslocation.latitude = this.lat;
   this.saleslocation.longitude = this.lng;

   this.salesService.Refresh_Sales_Location(this.saleslocation).subscribe((data: any) => {
   }, (err) => {

   });
 }

  checkRole(RoleJason) {
    const result = JSON.parse(localStorage.getItem('salesLogin')) || [];
    if (this.RoleJason.Component === RoleJason.Component) {
      console.log(result);
      if (!this.RoleJason.ROle.includes(result.userType)) {
        this.router.navigate(['sales/login']);
      }
    }
  }

  // Display

  // productList(){
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
  //   this.user = JSON.parse(localStorage.getItem('salesLogin')) || {};
  //   this.product.userid = this.user.id;
  //   console.log(this.product.userid);

  //   this.productService.each_sales_ProductList(this.product).subscribe((data: any) => {
  //     if (data.Status.code === 0) {
  //       if (data.each_sales_ProductList) {
  //         this.productDetails = data.each_sales_ProductList;
  //         console.log(this.productDetails);

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
    this.user = JSON.parse(localStorage.getItem('salesLogin')) || {};
    this.product.userid = this.user.id;

    this.product.pageIndex = item.pageIndex;
    this.product.pageSize = this.pageSize;

    this.product.search = this.search_;
    
    this.productService.each_sales_ProductList(this.product).subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.each_sales_ProductList) {
          this.productDetails = data.each_sales_ProductList;

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


  // Edit
  openupdatemodal(content, item) {
    this.product = JSON.parse(JSON.stringify(item));
    // this.product = item;
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
      if (!this.validateProductdescription(this.product.description)) {
        strError += strError = '' ? '' : '<br/>';
        strError += strError = '- Description  should only contain alphabets & number';
      }
    }

    if (!this.product.imageList) {
      strError += strError = '' ? '' : '<br/>';
      strError += '- Please select image, atleast one image must be selected';
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

    this.user = JSON.parse(localStorage.getItem('salesLogin')) || {};
    this.product.modifiedby = this.user.id;
    console.log(this.product.modifiedby);

    this.product.imageList = this.imageList;
    this.product.imageListData = this.imageModel;

    this.productService.updateProduct(id, this.product).subscribe((data: any) => {
      if (data.Status.code === 0) {
        // alert('Product updated sucesfully');
        this.toastr.success('Product updated sucesfully', 'Successful', {
          disableTimeOut: false
        });
      } else {
        // alert("Not Matched");
        this.toastr.warning('Please fill the remaining fields', 'Warning', {
          disableTimeOut: false,
          timeOut: 2000
        });
        this.modalService.dismissAll();
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

  descriptionValidation() {
    let isValid = false;
    if (!this.validateProductdescription(this.product.description)) {
      isValid = true;
    }


    if (isValid) {
      this.toastr.warning('Please enter product description correctly', 'Warning', {
        disableTimeOut: false,
        timeOut: 2000
      });
    }

  }

  validateProductdescription(productdescriptionField) {
    // const reg = /^[A-Za-z0-9\s!@#$%^&*(),.?":{}|<>]+$/;
    const reg = /^[A-Za-z0-9\s!@#$%^&*(),.?":{}|<>]+$/;
    return reg.test(productdescriptionField) === false ? false : true;
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

  // Delete

  onDelete(id: number) {
    // if (confirm('Are you sure to delete this record ?') === true) {
    this.productService.deleteProduct(id).subscribe(data => {
      // this.productService.productList();
      // this.productList();
      const item = { pageIndex: 0 };
      this.productList(item);
    });
    // }
    this.toastr.success('Product is deleted Successful', 'Successful', {
      disableTimeOut: false,
      timeOut: 2000
    });
  }

  changeStatus(id: number) {
    console.log(id);
    this.productService.changeStatus(id).subscribe(data => {
      this.categoryList();
    });
  }

  addnewProduct() {
    this.router.navigate(['/sales/product/addproduct']);
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
          console.log(this.product_imageDetails);
        }
      }
    }, (err) => {
    });
  }


  DeleteImage(id: number) {
    // if (confirm('Are you sure to delete this record ?') === true) {
    this.productService.DeleteImage(id).subscribe(data => {
      this.product_Images_List(id)
    });
    // }
    this.toastr.success('Image deleted Successful', 'Successful', {
      disableTimeOut: false,
      timeOut: 2000
    });
  }


}
