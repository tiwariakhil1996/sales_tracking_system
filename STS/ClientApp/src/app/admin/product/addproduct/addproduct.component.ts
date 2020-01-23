import { Component, OnInit } from '@angular/core';
import { productModel } from '../../../model/model';
import { Router } from '@angular/router';
import { CommonService } from '../../../service/common.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {

  errorMessage = '';
  imageSrc: string = '';

  product = new productModel();
  productDetails: productModel[] = [];

  constructor(private router: Router, private productService: CommonService) { }

  ngOnInit() {
  }

  submitForm(){
    this.productService.addProduct(this.product).subscribe((data: any) => {
      if (data.Status.code === 0) {
        alert('Product added sucesfully');
      }
      this.product = new productModel();
    }, (err) => {


    });
  }

  //Image to Base64

  handleInputChange(e) {
    var file = e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();

    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }

    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file)
  }

  _handleReaderLoaded(e) {
    let reader = e.target;
    this.imageSrc = reader.result;
    // console.log(this.imageSrc);
  }


//   handleFileInput(fileList: FileList) {
//     const preview = document.getElementById('photos-preview');
//     Array.from(fileList).forEach((file: File) => {
//         const reader = new FileReader();
//         reader.onload = () => {
//           var image = new Image();
//           image.src = String(reader.result);
//           image.height=100;
//           image.width=100;
//           preview.appendChild(image);
//         }
//         reader.readAsDataURL(file);
//     });
// }

  resetForm(){

  }


}
