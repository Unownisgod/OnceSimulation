import { Component } from '@angular/core';
import { parse } from 'jest-editor-support';
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

  started = false;
  speed: number = 1;
  repeater: any;
  running: boolean = false;
  playerHasCustomCoupon = false

  customPlayerCoupon!: Coupon;
  winnerCoupon!: Coupon;
  playersCoupon!: Coupon;

  moneySpend: number = 0;
  moneyEarned: number = 0;
  balance: number = 0;
  date: Date = new Date();
    
  private play() {
    this.simulate();
    this.started = true
    this.repeater = setInterval(() => {
      this.simulate();
      console.log(this.playerHasCustomCoupon)
    }, 1000 / this.speed);
  }

  private simulate() {
      if (this.date.getDay() <= 4) {
          this.NormalCoupon();
      }
      else if (this.date.getDay() == 5) {
          this.FridayCoupon();
      }
      else {
          this.WeekendCoupon();
      }
      this.balance = this.moneyEarned - this.moneySpend;
      this.date.setDate(this.date.getDate() + 1);
  }

  private NormalCoupon() {
    this.moneySpend += 2;
    if (!this.playerHasCustomCoupon) {
      this.playersCoupon = this.GenerateNormalCoupon();
    }
    this.winnerCoupon = this.GenerateNormalCoupon();
    var coincidences = this.TestCoupon();
    this.moneyEarned += this.CheckNormalPrizes(coincidences.coincidences, coincidences.seriesCoincides);
  }

  private FridayCoupon() {
    this.moneySpend += 3;
    if (!this.playerHasCustomCoupon) {
      this.playersCoupon = this.GenerateFridayCoupon();
    }
    this.winnerCoupon = this.GenerateFridayCoupon();
    var coincidences = this.TestCoupon();
    this.moneyEarned += this.CheckFridayPrizes(coincidences.coincidences, coincidences.seriesCoincides);
  }

  private WeekendCoupon() {
    this.moneySpend += 2;
    if (!this.playerHasCustomCoupon) {
      this.playersCoupon = this.GenerateWeekendCoupon();
    }
    this.winnerCoupon = this.GenerateWeekendCoupon();
    var coincidences = this.TestCoupon();
    this.moneyEarned += this.CheckWeekendPrizes(coincidences.coincidences, coincidences.seriesCoincides)
  }

  GenerateNormalCoupon(): Coupon {
    var winnerCouponNumber = this.generateCouponNumber();
    var winnerCouponSeries = Math.floor(1+Math.random() * 50).toFixed();
    if (winnerCouponSeries.length < 3) {
      while (winnerCouponSeries.length < 3) {
        winnerCouponSeries = "0" + winnerCouponSeries
      }
    }
    return { number: winnerCouponNumber, series: winnerCouponSeries }
  }

  private generateCouponNumber() {
    var winnerCouponNumber = Math.floor(Math.random() * 99999).toFixed();
    if (winnerCouponNumber.length < 5) {
        while (winnerCouponNumber.length < 5) {
            winnerCouponNumber = "0" + winnerCouponNumber;
        }
    }
    return winnerCouponNumber;
  }

  GenerateFridayCoupon(): Coupon {
    var winnerCouponNumber = Math.floor(Math.random() * 99999).toFixed();
    if (winnerCouponNumber.length < 5) {
      while (winnerCouponNumber.length < 5) {
        winnerCouponNumber = "0" + winnerCouponNumber
      }
    }
    var winnerCouponSeries = Math.floor(1 + Math.random() * 135).toFixed();
    if (winnerCouponSeries.length < 3) {
      while (winnerCouponSeries.length < 3) {
        winnerCouponSeries = "0" + winnerCouponSeries
      }
    }
    return { number: winnerCouponNumber, series: winnerCouponSeries }
  }

  GenerateWeekendCoupon(): Coupon {
    var winnerCouponNumber = Math.floor(Math.random() * 99999).toFixed();
    if (winnerCouponNumber.length < 5) {
      while (winnerCouponNumber.length < 5) {
        winnerCouponNumber = "0" + winnerCouponNumber
      }
    }
    var winnerCouponSeries = Math.floor(1 + Math.random() * 55).toFixed();
    if (winnerCouponSeries.length < 3) {
      while (winnerCouponSeries.length < 3) {
        winnerCouponSeries = "0" + winnerCouponSeries
      }
    }
    return { number: winnerCouponNumber, series: winnerCouponSeries }
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
    if (this.date.getDay() >= 6) {
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
    }
    var seriesCoincides = this.playersCoupon.series == this.winnerCoupon.series
    return { coincidences, seriesCoincides }
  }

  CheckNormalPrizes(coincidences: number, seriesCoincides: boolean): number {
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

  CheckFridayPrizes(coincidences: number, seriesCoincides: boolean): number {
    switch (true) {
      case coincidences == 5 && seriesCoincides:
        return 6000000;
      case coincidences == 5:
        return 40000;
      case coincidences == 4:
        return 500;
      case coincidences == 3:
        return 50;
      case coincidences == 2:
        return 6;
      case coincidences == 1:
        return 3;
      default:
        return 0;
    }
  }

  CheckWeekendPrizes(coincidences: number, seriesCoincides: boolean): number {
    switch (true) {
      case coincidences == 5 && seriesCoincides:
        return 1500000;
      case coincidences == 5:
        return 20000;
      case coincidences == 4:
        return 200;
      case coincidences == 3:
        return 30;
      case coincidences == 2:
        return 4;
      case coincidences == 1:
        return 2;
      default:
        return 0;
    }
  }

  moreSpeed() {
    if (this.speed < 10) {
      clearInterval(this.repeater)
      this.speed += 0.25
      if (this.started) {
        this.play();
      }
    }
  }

  lessSpeed() {
    if (this.speed > 0.5) {
      clearInterval(this.repeater)
      this.speed -= 0.25
      if (this.started) {
        this.play();
      }
    }
  }

  pause() {
    this.running = false
    clearInterval(this.repeater)
  }

  continue() {
    this.running = true
    this.play();
  }

  updatePlayersCoupon() {
    this.playersCoupon.number = (document.getElementById("playersNumber") as HTMLInputElement).value
    if (this.playersCoupon.number.length < 5) {
      while (this.playersCoupon.number.length < 5) {
        this.playersCoupon.number = "0" + this.playersCoupon.number
      }
    }
    else if (this.playersCoupon.number.length > 5) {
      this.playersCoupon.number = this.playersCoupon.number.substring(0,5)
    }
    this.playersCoupon.series = (document.getElementById("playersSeries") as HTMLInputElement).value

    if (this.playersCoupon.series.length < 3) {
      while (this.playersCoupon.series.length < 3) {
        this.playersCoupon.series = "0" + this.playersCoupon.series
      }
    }
    else if (this.playersCoupon.series.length > 3) {
      this.playersCoupon.series = this.playersCoupon.series.substring(0, 3)
    }
    if (this.date.getDay() != 5 && Number.parseInt(this.playersCoupon.series) > 55) {
      this.playersCoupon.series = "55"
    }
    else if (this.date.getDay() == 5 && Number.parseInt(this.playersCoupon.series) > 135) {
      this.playersCoupon.series = "135"
    }

    console.log(this.playersCoupon)
  }
  title = 'OnceSimulation';
}
