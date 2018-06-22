import { Component, Input } from '@angular/core';

@Component({
  selector: 'bg-image-with-loader',
  templateUrl: 'bg-image-with-loader.html',
})
export class BgImageWithLoader {

  @Input() image: string = '';
  @Input() type: string = '';
  @Input() dummyImage: string = 'assets/imgs/human.jpg';
  @Input() loaderImage: string = 'assets/img/image-loader.svg';
  isLoaderTimeExpired: boolean = false;

  ngAfterViewInit() {
    setTimeout(() => {
      if (!this.image) {
        this.setImage();
      }
    }, 500)
    setTimeout(() => {
      this.setImage();
    }, 10000);
  }

  setImage() {
    if (this.type == 'pet') {
      this.loaderImage = 'assets/img/pet.png'
    } else if (this.type == 'exp') {
      this.loaderImage = 'assets/img/Experience_Default.png'
    } else {
      this.loaderImage = this.dummyImage;
    }
    this.isLoaderTimeExpired = true;
  }
}
