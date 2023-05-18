import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Route, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Attraction } from '../@models/attraction.model';

interface PublicAPI {
  id: number;
  county: string;
  url: string;
  createdAt: Date;
  updateAt?: Date;
}

interface District {
  id: number;
  county: string;
  district: string;
}

@Component({
  selector: 'app-attraction',
  templateUrl: './attraction.component.html',
  styleUrls: ['./attraction.component.css'],
})
export class AttractionComponent implements OnInit {
  totalPages = 0;
  currentPage = 1;
  itemsPerPage = 8;
  prev = '上一頁';
  next = '下一頁';
  barPath = '../assets/images/台北101.png';
  viewPath = '../assets/images/台南card.png';
  id = 0;
  randomAttraction!: Attraction;
  attractionList: Attraction[] = [];
  attractionAllList: Attraction[] = [];
  selectedAttractionList: Attraction[] = [];
  selectedDistrictList: Attraction[] = [];
  selectedAddressList: Attraction[] = [];
  apiList: PublicAPI[] = [];
  districtList: District[] = [];
  isLoading = false;
  selectedDistrict = '';
  selectedCounty = '';
  countyEng = '';
  keyword = '';
  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}
  ngOnInit(): void {
    // this.getAllAPI();
    this.getAllAPICounty();
    this.getAllDistrict();
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 2 seconds */
      this.spinner.hide();
      this.onShowRandomAttraction();
    }, 2000);
  }

  getAllAPI() {
    const url = 'http://localhost:8080/publicApi/all';
    this.http.get<PublicAPI[]>(url).subscribe(
      (data) => {
        console.log('抓資料中...');
      },
      (error) => {
        console.error('oops');
        console.error(error);
      }
    );
  }

  getAllAPICounty() {
    const url = 'http://localhost:8080/publicApi/allAPI';
    this.http.get<PublicAPI[]>(url).subscribe(
      (data) => {
        this.apiList = data;
        console.log('目前資料:', data);
        console.log('apiList=', this.apiList);
      },
      (error) => {
        console.error('oops');
        console.error(error);
      }
    );
  }

  getAllDistrict() {
    //清空陣列
    while (this.districtList.length) {
      this.districtList.pop();
    }
    // console.log('county=', this.selectedCounty);
    // this.getCountyEng();
    // console.log('countyEng=', this.countyEng);
    // const url = `http://localhost:8080/api/district/${this.countyEng}/all`;
    const url = `http://localhost:8080/api/district/Tainan/all`;
    this.http.get<District[]>(url).subscribe(
      (data) => {
        let distList: District[] = [];
        distList = data;
        // console.log('目前資料:', data);
        for (let dist of distList) {
          // console.log('目前資料:', dist);
          // if (dist.county === this.selectedCounty) {
          this.districtList.push(dist);
          // }
        }
        // console.log('districtList=', this.districtList);
      },
      (error) => {
        console.error('oops');
        console.error(error);
      }
    );
  }
  getCountyEng() {
    switch (this.selectedCounty) {
      case '臺北市':
        this.countyEng = 'Taipei';
        break;
      case '新北市':
        this.countyEng = 'NewTaipei';
        break;
      case '高雄市':
        this.countyEng = 'Kaohsiung';
        break;
      case '臺南市':
        this.countyEng = 'Tainan';
        break;
    }
    /*
    { name: "基隆市", value: "Keelung" },
  { name: "臺北市", value: "Taipei" },
  { name: "新北市", value: "NewTaipei" },
  { name: "宜蘭縣", value: "YilanCounty" },
  { name: "桃園市", value: "Taoyuan" },
  { name: "臺中市", value: "Taichung" },
  { name: "新竹市", value: "Hsinchu" },
  { name: "新竹縣", value: "HsinchuCounty" },
  { name: "苗栗縣", value: "MiaoliCounty" },
  { name: "彰化縣", value: "ChanghuaCounty" },
  { name: "南投縣", value: "NantouCounty" },
  { name: "雲林縣", value: "YunlinCounty" },
  { name: "嘉義縣", value: "ChiayiCounty" },
  { name: "嘉義市", value: "Chiayi" },
  { name: "臺南市", value: "Tainan" },
  { name: "高雄市", value: "Kaohsiung" },
  { name: "屏東縣", value: "PingtungCounty" },
  { name: "花蓮縣", value: "HualienCounty" },
  { name: "臺東縣", value: "TaitungCounty" },
  { name: "金門縣", value: "KinmenCounty" },
  { name: "澎湖縣", value: "PenghuCounty" },
  { name: "連江縣", value: "LienchiangCounty" }, */
  }
  getAllAttraction() {
    this.spinner.show();
    // this.isLoading = true;
    const url = `http://localhost:8080/api/attraction/all/${this.countyEng}`;
    //清空陣列
    while (this.selectedAttractionList.length) {
      this.selectedAttractionList.pop();
    }
    this.http.get<Attraction[]>(url).subscribe(
      (data) => {
        this.attractionAllList = data;
        console.log('目前資料:', data);
        console.log('attractionList=', this.attractionList);
        this.attractionAllList.forEach((attraction) => {
          if (attraction.district == this.selectedDistrict) {
            this.selectedAttractionList.push(attraction);
          }
        });
        console.log('selectedAttractionList=', this.selectedAttractionList);
        this.totalPages = this.calculateTotalPages(
          this.selectedAttractionList.length,
          10
        );
        this.spinner.hide();
        // this.isLoading = false;
      },
      (error) => {
        console.error('oops');
        console.error(error);
      }
    );
  }

  // getAttraction(e: any) {
  //   console.log('e=', e.target.value);
  //   this.spinner.show();
  //   this.isLoading = true;
  //   this.selectedDistrict = e.target.value;
  //   console.log('this.selectedDistrict=', this.selectedDistrict);
  //   //清空陣列
  //   while (this.attractionAllList.length) {
  //     this.attractionAllList.pop();
  //   }
  //   const url = 'http://localhost:8080/api/attraction/all';
  //   this.http.get<Attraction[]>(url).subscribe(
  //     (data) => {
  //       this.attractionList = data;
  //       for (let attraction of this.attractionList) {
  //         if (attraction.district == this.selectedDistrict) {
  //           this.attractionAllList.push(attraction);
  //         }
  //       }
  //       this.spinner.hide();
  //       this.isLoading = false;
  //       this.selectedDistrict = '';
  //     },
  //     (error) => {
  //       console.error('oops');
  //       console.error(error);
  //     }
  //   );
  // }

  onGoShowComponent(id: number) {
    const option: NavigationExtras = {
      queryParams: {
        county: this.selectedCounty,
        district: this.selectedDistrict,
        id: id,
      },
    };
    this.router.navigate(['../attraction'], option);
  }

  calculateTotalPages(totalItems: number, itemsPerPage: number): number {
    console.log('total=', totalItems, ',items=', itemsPerPage);
    console.log('totalpage=', Math.ceil(totalItems / itemsPerPage));
    return Math.ceil(totalItems / itemsPerPage);
  }

  onShowRandomAttraction() {
    // console.log('length=',this.attractionAllList.length)
    for (let i = 1; i <= this.itemsPerPage; i++) {
      this.id = Math.floor(Math.random() * 535) + 1;
      const url = 'http://localhost:8080/api/attraction/' + this.id;
      this.http.get<Attraction>(url).subscribe(
        (data) => {
          this.selectedAttractionList.push(data);
        },
        (error) => {
          console.error('oops');
          console.error(error);
        }
      );
    }
  }

  onSearchAttraction(keyword: string) {
    console.log('keyword=', keyword);
    this.spinner.show();
    const url = `http://localhost:8080/api/attraction/all`;
    //清空陣列
    while (this.selectedAttractionList.length) {
      this.selectedAttractionList.pop();
    }
    while (this.selectedAddressList.length) {
      this.selectedAddressList.pop();
    }
    while (this.selectedDistrictList.length) {
      this.selectedDistrictList.pop();
    }
    this.http.get<Attraction[]>(url).subscribe(
      (data) => {
        this.attractionAllList = data;
        this.attractionAllList.forEach((attraction) => {
          if (attraction.name.includes(keyword)) {
            this.selectedAttractionList.push(attraction);
          } else if (attraction.district.includes(keyword)) {
            this.selectedDistrictList.push(attraction);
          } else if (attraction.address.includes(keyword)) {
            this.selectedAddressList.push(attraction);
          }
        });
        this.selectedDistrictList.forEach((dist) => {
          this.selectedAttractionList.push(dist);
        });
        this.selectedAddressList.forEach((address) => {
          this.selectedAttractionList.push(address);
        });
        console.log(
          'keyword selectedAttractionList=',
          this.selectedAttractionList
        );
        this.totalPages = this.calculateTotalPages(
          this.selectedAttractionList.length,
          10
        );
        this.spinner.hide();
        if (this.selectedAttractionList.length == 0) {
          alert('查無資料，請重新查詢');
        }
        this.keyword = '';
      },
      (error) => {
        console.error('oops');
        console.error(error);
      }
    );
  }
}
