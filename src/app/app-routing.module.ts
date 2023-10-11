import { Component, NgModule } from '@angular/core';
import { ROUTES, RouterModule, Routes } from '@angular/router';
import { GetStartedComponent } from './get-started/get-started.component';

const routes: Routes = [
  {
    path: 'getting-started',
    component: GetStartedComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'getting-started',
  },
  {
    path: '**',
    redirectTo: 'getting-started',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled',
      scrollOffset: [0, 64],
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
  providers: [
    // {
    //   provide: ROUTES,
    //   useFactory: () => {
    //     let dynamicRoutes: Routes = [];
    //     const tmpCmp = Component({template: ''})(class {});

    //     dynamicRoutes.push({
    //       path: 'authorization',
    //       component: tmpCmp
    //     })

    //     return [...routes, ...dynamicRoutes];
    //   },
    //   multi: true
    // }
  ]
})
export class AppRoutingModule { }
