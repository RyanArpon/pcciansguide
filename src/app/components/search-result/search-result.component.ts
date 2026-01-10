import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/base.component';
import { LocationsService } from 'src/app/services/locations.service';
import { takeUntil } from 'rxjs/operators';
import { PageEvent } from '@angular/material';


@Component({
  selector: 'search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResult extends BaseComponent implements OnInit {
  pageTitle: string = 'All Locations';
  locations: any = [];
  displayedColumns: string[] = ['name'];

  length: number = 10;
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  // MatPaginator Output
  pageEvent: PageEvent;

  constructor(private locationsService: LocationsService) {
    super();
  }

  ngOnInit(): void {
    this.locationsService.getQuestions().pipe(takeUntil(this.stop$)).subscribe(data => {
      this.length = data.length;
      this.locations = data.slice(0, this.pageSize);
    });
  }

  handlePageEvent(event: any): any {
    console.log('_TEST', event);
  }
}
