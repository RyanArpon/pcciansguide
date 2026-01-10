import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/base.component';
import { LocationsService } from 'src/app/services/locations.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResult extends BaseComponent implements OnInit {
  pageTitle: string = 'All Locations';
  locations: any = []

  constructor(private locationsService: LocationsService) {
    super();
  }

  ngOnInit(): void {
    this.locationsService.getQuestions().pipe(takeUntil(this.stop$)).subscribe(data => {
      this.locations = data;
    });
  }
}
