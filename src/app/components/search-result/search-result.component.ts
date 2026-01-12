import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/base.component';
import { LocationsService } from 'src/app/services/locations.service';
import { filter, takeUntil } from 'rxjs/operators';
import { ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResult extends BaseComponent implements OnInit {
  pageTitle: string = 'All Locations';
  locations: any = [];
  displayedColumns: string[] = ['name'];
  params: ParamMap;
  isAll: number = 1;
  length: number = 10;
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];

  constructor(
    private locationsService: LocationsService,
    private route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params: ParamMap) => {
      this.params = params;

      let isAll = this.params.get('isAll');

      if (isAll === null) {
        this.getAllLocations(0, this.pageSize);
        return;
      }

      this.isAll = this.params.get('isAll') ? Number(this.params.get('isAll')) : 0;

      if (this.isAll) {
        this.getAllLocations(0, this.pageSize);
      } else {
        this.getQuickSearch(0, this.pageSize);
      }
    });
  }

  getAllLocations(startIndex: number, endIndex: number): void {
    this.locationsService.getQuestions().pipe(takeUntil(this.stop$)).subscribe(data => {
      this.length = data.length;
      this.locations = data.slice(startIndex, endIndex);
    });
  }

  getQuickSearch(startIndex: number, endIndex: number): void {
    const keyword = this.params.get('keyword');

    this.pageTitle = `Search Result for "${keyword}"`;

    this.locationsService.getQuestions().pipe(takeUntil(this.stop$)).subscribe(data => {
      const filteredData = data.filter(item => {
        if (item.name.toUpperCase().includes(keyword.toUpperCase())) {
          return item;
        }
      });

      this.length = filteredData.length;
      this.locations = filteredData.slice(startIndex, endIndex);
    });
  }

  handlePageEvent(event: any): any {
    this.pageSize = event.pageSize;

    const pageNumber = event.pageIndex + 1;
    const startIndex = event.pageIndex === 0 ? 0 : (pageNumber * this.pageSize) - this.pageSize;
    const endIndex = pageNumber * this.pageSize;

    if (this.isAll) {
      this.getAllLocations(startIndex, endIndex);
    } else {
      this.getQuickSearch(startIndex, endIndex);
    }
  }
}
