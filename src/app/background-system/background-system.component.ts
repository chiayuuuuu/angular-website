import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Attraction } from '../@models/attraction.model';
import { NgForm } from '@angular/forms';

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
  selector: 'app-background-system',
  templateUrl: './background-system.component.html',
  styleUrls: ['./background-system.component.css'],
})
export class BackgroundSystemComponent implements OnInit {
  @ViewChild('ModifyForm') modifyForm!: NgForm;
  totalPages = 0;
  currentPage = 1;
  itemsPerPage = 8;
  prev = '上一頁';
  next = '下一頁';
  barPath = '../assets/images/台南風景.png';
  viewPath = '../assets/images/台南card.png';
  id = 0;
  countyEng = '';
  attractionList: Attraction[] = [];
  attractionAllList: Attraction[] = [];
  selectedAttractionList: Attraction[] = [];
  apiList: PublicAPI[] = [];
  districtList: District[] = [];
  isLoading = false;
  selectedCounty = '';
  selectedDistrict='';
  selectedAPI!: PublicAPI;
  isClickAddAPI = false;
  isClickAdd = false;
  isClickModifyApi = false;
  isClickModify = false;
  isClickShowAllApi = false;
  isClickShowAllAttraction = false;
  // isShow=false
  addCounty = '';
  addDistrict = '';
  selectedAttraction!: Attraction;
  selectedApi!: PublicAPI;
  dist:any
  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.dist = this.router.getCurrentNavigation();
  }
  ngOnInit(): void {
    console.log('dist=', this.dist);
    const state = this.dist.extras.state;
    // console.log('n=',this.dist.extras.state)
    if (state != undefined) {
      this.selectedDistrict = state['district'].toString();
      this.spinner.show();
      this.getAllAttraction();
      // console.log('dist=', this.dist);
      // console.log('now dist=', this.selectedDistrict);
    } else {
      this.selectedDistrict = '';
    }
    this.getAllAPIInfo();
    this.isClickShowAllApi = false;
    this.getAllDistrict();
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
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

  getAllAPIInfo() {
    this.turnOffAllClick();
    this.isClickShowAllApi = true;
    this.spinner.show();
    const url = 'http://localhost:8080/publicApi/allAPI';
    this.http.get<PublicAPI[]>(url).subscribe(
      (data) => {
        this.apiList = data;
        console.log('目前資料:', data);
        console.log('apiList=', this.apiList);
        this.isClickShowAllAttraction = false;
        this.spinner.hide();
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
    this.selectedCounty = '臺南市';
    console.log('county=', this.selectedCounty);
    this.getCountyEng();
    console.log('countyEng=', this.countyEng);
    const url = `http://localhost:8080/api/district/${this.countyEng}/all`;
    this.http.get<District[]>(url).subscribe(
      (data) => {
        let distList: District[] = [];
        distList = data;
        // console.log('目前資料:', data);
        for (let dist of distList) {
          // console.log('目前資料:', dist);
          if (dist.county === this.selectedCounty) {
            this.districtList.push(dist);
          }
        }
        // console.log('districtList=', this.districtList);
      },
      (error) => {
        console.error('oops');
        console.error(error);
      }
    );
  }

  getAllAttraction() {
    this.isClickShowAllApi = false;
    this.spinner.show();
    // this.isLoading = true;
    // this.isShow = true
    // const url = `http://localhost:8080/api/attraction/all/${this.countyEng}`;
    const url = `http://localhost:8080/api/attraction/all/`;

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
  }

  turnOffAllClick() {
    this.isClickAddAPI = false;
    this.isClickAdd = false;
    this.isClickModify = false;
    this.isClickModifyApi = false;
    this.isClickShowAllApi = false;
    this.isClickShowAllAttraction = false;
  }

  showAddAPIInfo() {
    this.turnOffAllClick();
    this.isClickAddAPI = true;
  }

  showAddInfo() {
    this.turnOffAllClick();
    this.isClickAdd = true;
    // this.isShow = false;
  }

  addPublicAPI(postData: { county: string; url: string }) {
    // this.isClickAddAPI = false;
    // this.turnOffAllClick();
    const url = 'http://localhost:8080/publicApi';
    this.http.post(url, postData).subscribe((d) => {
      console.log('新增成功, 結果是:', d);
      alert('新增成功！');
    });
  }

  showModifyAPIInfo(api: PublicAPI) {
    // this.turnOffAllClick();
    this.isClickModifyApi = true;
    this.selectedApi = api;
  }
  modifyAPI(postData: { id: number; county: string; district: string }) {
    // this.turnOffAllClick();
    // this.isClickModifyApi = true;
    const url = 'http://localhost:8080/publicApi';
    this.http.post(url, postData).subscribe((d) => {
      console.log('修改成功, 結果是:', d);
      alert('修改成功');
      this.isClickModifyApi = false;
    });
  }
  removeAPI(id: number) {
    let ans = confirm('確定要刪除嗎?');
    if (ans) {
      const url = 'http://localhost:8080/publicApi/' + id.toString();
      this.http.delete(url).subscribe(() => {
        console.log(
          '刪除成功, 刪的是:',
          this.apiList.filter((api) => api.id == id)
        );
        this.apiList = this.apiList.filter((api) => api.id !== id); // 符合filter裡的條件會留下，不符則濾掉
      });
    }
  }

  addAttraction(postData: Attraction) {
    // console.log('目前的form:',this.modifyForm.value)
    // console.log('是否合格輸入?',this.modifyForm.valid)
    this.isClickAdd = false;
    // console.log(postData);
    const url = 'http://localhost:8080/api/attraction';
    this.http.post(url, postData).subscribe((d) => {
      console.log('新增成功, 結果是:', d);
      alert('新增成功！');
    });
  }

  showModifyInfo(attraction: Attraction) {
    this.turnOffAllClick();
    this.selectedAttraction = attraction;
    this.isClickModify = true;
  }

  modifyAttraction(postData: Attraction) {
    // this.isClickModify = false;
    this.turnOffAllClick();
    // console.log(postData);
    const url = 'http://localhost:8080/api/attraction';
    this.http.post(url, postData).subscribe((d) => {
      console.log('修改成功, 結果是:', d);
      alert('修改成功');
    });
  }

  removeAttraction(id: number) {
    let ans = confirm('確定要刪除嗎?');
    if (ans) {
      const url = 'http://localhost:8080/api/attraction/' + id.toString();
      this.http.delete(url).subscribe(() => {
        console.log(
          '刪除成功, 刪的是:',
          // this.attractionAllList.filter((attraction) => attraction.id == id)
          this.selectedAttractionList.filter(
            (attraction) => attraction.id == id
          )
        );
        this.selectedAttractionList = this.selectedAttractionList.filter(
          (attraction) => attraction.id !== id
        ); // 符合filter裡的條件會留下，不符則濾掉
      });
    }
  }

  onGoPreviewComponent(id: number) {
    const option: NavigationExtras = {
      queryParams: {
        district: this.selectedDistrict,
        id: id,
      },
    };
    this.router.navigate(['/preview'], option);
  }

  calculateTotalPages(totalItems: number, itemsPerPage: number): number {
    console.log('total=', totalItems, ',items=', itemsPerPage);
    console.log('totalpage=', Math.ceil(totalItems / itemsPerPage));
    return Math.ceil(totalItems / itemsPerPage);
  }
}
