import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchTypeComponent } from './components/search-type/search-type.component';
import { HomeComponent } from './components/home/home.component';
import { QuickSearchComponent } from './components/quick-search/quick-search.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { LocationComponent } from './components/location/location.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'search-type', component: SearchTypeComponent },
  { path: 'quick-search', component: QuickSearchComponent },
  { path: 'search-result', component: SearchResultComponent },
  { path: 'location', component: LocationComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default route
  { path: '**', component: HomeComponent } // Wildcard route for unmatched URLs
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
