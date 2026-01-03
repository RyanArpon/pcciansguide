import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchTypeComponent } from './components/search-type/search-type.component';
import { HomeComponent } from './components/home/home.component';
import { QuickSearchComponent } from './components/quick-search/quick-search.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'search-type', component: SearchTypeComponent },
  { path: 'quick-search', component: QuickSearchComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default route
  { path: '**', component: HomeComponent } // Wildcard route for unmatched URLs
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
