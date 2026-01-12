import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/base.component';

@Component({
  selector: 'quick-search',
  templateUrl: './quick-search.component.html',
  styleUrls: ['./quick-search.component.css']
})
export class QuickSearchComponent extends BaseComponent implements OnInit {
  searchForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      'keyword': new FormControl('')
    });
  }

  onSubmit(): void {
    this.router.navigate(['/search-result'], {
      queryParams: {
        isAll: 0,
        keyword: this.searchForm.get('keyword').value
      }
    });
  }
}
