import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { HomeComponent } from './recipe/pages/home/home.component';
import { RandomComponent } from './recipe/pages/random/random.component';
import { SearchComponent } from './recipe/pages/search/search.component';
import { MyBookComponent } from './user/pages/my-book/my-book.component';
import { MyProfileComponent } from './user/pages/my-profile/my-profile.component';

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
        RouterModule.forRoot( routes ),
    ],
    exports: [
        RouterModule
    ],
})
export class AppRoutingModule{}