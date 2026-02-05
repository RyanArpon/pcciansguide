import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/base.component';
import { LocationsService } from 'src/app/services/locations.service';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent extends BaseComponent implements OnInit {
  params: ParamMap;
  bannerUrl: string = '';
  directionUrl: string = `${environment.apiBaseUrl}/images/directions/1.jpg`;
  name: string = '';
  building: string = '';
  floor: string = '';
  type: string = '';
  description: string = '';
  momento: SafeResourceUrl = '';

  constructor(
    private locationsService: LocationsService,
    private route: ActivatedRoute,
    private location: Location,
    private sanitizer: DomSanitizer
  ) {
    super();
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params: ParamMap) => {
      this.params = params;

      let locationId = this.params.get('id');

      let location = this.locationsService.locations.filter(item => {
        if (item.id === locationId) {
          return item;
        }
      });

      if (location.length === 0) {
        this.locationsService.getLocations().pipe(takeUntil(this.stop$)).subscribe(data => {
          this.locationsService.locations = data;
          this.populateData();
        });
      } else {
        this.populateData();
      }
    });
  }

  populateData(): void {
    let locationId = this.params.get('id');

    let location = this.locationsService.locations.find(item => {
      if (item.id === locationId) {
        return item;
      }
    });

    this.bannerUrl = `${environment.apiBaseUrl}/images/banners/${location.id}.jpg`;
    this.name = location.name;
    this.building = location.building;
    this.floor = location.floor;
    this.type = location.type;
    this.description = location.description;
    this.momento = this.sanitizer.bypassSecurityTrustResourceUrl(location.momento);
  }

  back(): void {
    this.location.back();
  }
}
