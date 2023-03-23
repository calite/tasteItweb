import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RandomComponent } from './pages/random/random.component';
import { SearchComponent } from './pages/search/search.component';
import { MyBookComponent } from './pages/my-book/my-book.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';

const routes : Routes = [
    {
        path : '',
        component: HomeComponent,
        pathMatch: 'full'
    },
    {
        path : 'search',
        component: SearchComponent,
    },
    {
        path : 'random',
        component: RandomComponent,
    },
    {
        path : 'mybook',
        component: MyBookComponent,
    },
    {
        path: '**',
        redirectTo: ''
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot( routes )
    ],
    exports: [
        RouterModule
    ],
})
export class AppRoutingModule{}