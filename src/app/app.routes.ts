import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'feature-table',
        loadComponent: () => import('./module/feature-table/feature-table.component').then(c => c.FeatureTableComponent),
    },
    {
        path: 'tree-structure',
        loadComponent: () => import('./module/tree-structure/tree-structure.component').then(c => c.TreeStructureComponent),
    }, 
    {
        path: 'dropdowns',
        loadComponent: () => import('./module/dropdowns/dropdowns.component').then(c => c.DropdownsComponent),
    },
    {
        path: '**',
        redirectTo: 'feature-table',
        pathMatch: 'prefix'
    }
];
