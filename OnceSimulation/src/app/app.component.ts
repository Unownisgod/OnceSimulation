import { Component } from '@angular/core';
interface Coupon {
  number: string
  series: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent {

  winnerCoupon!: Coupon;
  playersCoupon!: Coupon;
  moneyEarned!: number;

  ngOnInit() {
    this.playersCoupon = {number: "48652", series: "40"}
    this.GenerateCoupon();
    console.log(this.winnerCoupon);
    var coincidences = this.TestCoupon();
    this.moneyEarned = this.CheckPrizes(coincidences.coincidences, coincidences.seriesCoincides)
  }

  GenerateCoupon() {
    var winnerCouponNumber = Math.floor(Math.random() * 99999).toFixed();
    if (winnerCouponNumber.length < 5) {
      while (winnerCouponNumber.length < 5) {
         winnerCouponNumber = "0"+winnerCouponNumber
      }
    }
    var winnerCouponSeries = Math.floor(Math.random() * 50).toFixed();
    if (winnerCouponSeries.length < 3) {
      while (winnerCouponSeries.length < 3) {
        winnerCouponSeries = "0" + winnerCouponSeries
      }
    }
    this.winnerCoupon = { number: winnerCouponNumber, series: winnerCouponSeries }
  }

  TestCoupon(): { coincidences: number, seriesCoincides: boolean } {
    var coincidences = 0
    for (let i = 0; i < 5; i++) {
      if (this.winnerCoupon.number.charAt(i) == this.playersCoupon.number.charAt(i)) {
        coincidences++;
      }
      else {
        break
      }
    }
    var reverseCoincidences = 0;
    for (let i = 0; i > 5; i++) {
      if (this.winnerCoupon.number.charAt(i) == this.playersCoupon.number.charAt(i)) {
        reverseCoincidences++;
      }
      else {
        break
      }
    }
    if (coincidences < reverseCoincidences) {
      coincidences = reverseCoincidences;
    }
    var seriesCoincides = this.playersCoupon.series == this.winnerCoupon.series
    console.log(coincidences + ", " + seriesCoincides)
    return { coincidences, seriesCoincides }
  }

  CheckPrizes(coincidences: number, seriesCoincides: boolean): number {
    switch (true) {
      case coincidences == 5 && seriesCoincides:
        return 500000;
      case coincidences == 5:
        return 35000;
      case coincidences == 4:
        return 250;
      case coincidences == 3:
        return 25;
      case coincidences == 2:
        return 6;
      case coincidences == 1:
        return 2;
      default:
        return 0;
    }
  }
  
  title = 'OnceSimulation';
}
