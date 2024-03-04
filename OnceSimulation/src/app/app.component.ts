import { Component } from '@angular/core';
interface Coupon {
  number: number
  series: number
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent {


  winnerCoupon!: Coupon;

  ngOnInit() {
    this.GenerateCoupon();
    console.log(this.winnerCoupon);
  }

  GenerateCoupon() {
    var winnerCouponNumber = Math.floor(Math.random() * 99999);
    var winnerCouponSeries = Math.floor(Math.random() * 50);
    this.winnerCoupon = { number: winnerCouponNumber, series: winnerCouponSeries }
  }


  title = 'OnceSimulation';
}
