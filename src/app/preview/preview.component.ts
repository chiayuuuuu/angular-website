import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Attraction } from '../@models/attraction.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';
@Component({
  selector: 'app-show',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css'],
})
export class PreviewComponent implements OnInit {
  id!: string | null;
  selectedDistrict!: string | null;
  selectedAttraction!: Attraction;
  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.queryParamMap.get('id');
    this.selectedDistrict = this.route.snapshot.queryParamMap.get('district');
    // this.spinner.show();
    // setTimeout(() => {
    //   /** spinner ends after 5 seconds */
    //   this.spinner.hide();
    // }, 5000);
    this.getAttractionById();
  }

  getAttractionById() {
    // this.spinner.show();
    const url = 'http://localhost:8080/api/attraction/' + this.id;
    this.http.get<Attraction>(url).subscribe(
      (data) => {
        this.selectedAttraction = data;
        console.log('目前資料:', data);
        console.log('selectedAttraction=', this.selectedAttraction);
        // this.spinner.hide();
      },
      (error) => {
        console.error('oops');
        console.error(error);
      }
    );
  }
  goBack() {
    // this.location.back();
    const option: NavigationExtras = {
      state: {
        district: this.selectedDistrict,
      },
    };
    this.router.navigate(['/admin'], option);
  }
}
