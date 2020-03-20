import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategorySubcategoryService } from '../../../service/category-subcategory.service';
import { ProductService } from '../../../service/product.service';
import { productModel, ImageListModel, ImageModel, UpdateImageListModel } from '../../../model/product';
import { categoryDataModel, subcategoryDataModel } from '../../../model/category-subcategory';
import { salesregisterModel, LocationModel } from '../../../model/sales';
import { SalesService } from '../../../service/sales.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {

  errorMessage = '';
  imageSrc: string = '';

  imageList: ImageListModel[] = [];
  imageModel: ImageModel[] = [];

  saleslocation = new LocationModel();
  saleslocationDetails: LocationModel[] = [];
  
  user = new salesregisterModel();

  tempImageList: UpdateImageListModel[] = [];
  updateImageList: UpdateImageListModel[] = [];
  
  product = new productModel();
  productDetails: productModel[] = [];

  category = new categoryDataModel();
  categoryDetails: categoryDataModel[] = [];

  subcategory = new subcategoryDataModel();
  subcategoryDetails: subcategoryDataModel[] = [];

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

  RoleJason = {
    ROle: [0, 1],
    Component: 'AddproductComponent'
  };

  constructor(private router: Router,
    private toastr: ToastrService,
    private salesService: SalesService,
    private productService: ProductService,
    private categoryService: CategorySubcategoryService) {
    // this.categoryList();
    this.active_CategoryList();
   this.Refresh_Location();
   }

  ngOnInit() {
    this.checkRole(this.RoleJason);
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

  addCategory() {
    this.categoryService.addCategory(this.category).subscribe((data: any) => {
      if (data.Status.code === 0) {
        // alert('Category added sucesfully');
        this.toastr.success('Category added succesfully', 'Successful', {
          disableTimeOut: false
        });
        this. active_CategoryList();
      }
      this.category = new categoryDataModel();
    }, (err) => {

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


  addSubcategory() {
    this.categoryService.addSubcategory(this.subcategory).subscribe((data: any) => {
      if (data.Status.code === 0) {
        // alert('Subcategory added sucesfully');
        this.toastr.success('Subcategory added sucesfully', 'Successful', {
          disableTimeOut: false
        });
        // this.subcategoryList(cid);
      }
      this.subcategory = new subcategoryDataModel();
    }, (err) => {

    });

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
      if (!this.validateProductdescription(this.product.description)) {
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
    this.product.createdby = this.user.id;
    console.log(this.product.createdby);

    this.product.imageList = this.imageList;
    this.product.imageListData = this.imageModel;

    this.productService.addProduct(this.product).subscribe((data: any) => {
      if (data.Status.code === 0) {
        // alert('Product added sucesfully');
        this.toastr.success('Product added sucesfully', 'Successful', {
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
    this.product.cid = null;
    this.product.sid = null;
    this.product.productname = null;
    this.product.price = null;
    this.product.description = null;
    this.product.image = null;
    this.product.date = null;

  this.product = new productModel();
    
 }


 viewProductForm() {
  this.router.navigate(['/sales/product/viewproduct']);
}


}
