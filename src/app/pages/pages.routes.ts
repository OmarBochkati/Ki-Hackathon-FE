import { Routes } from '@angular/router';
import { StarterComponent } from './starter/starter.component';
import {DocumentsComponent} from "./documents/documents.component";

export const PagesRoutes: Routes = [
  {
    path: '',
    component: StarterComponent,
    data: {
      title: 'Dashboard Page',
    },
  },
  {
    path: 'documents',
    component: DocumentsComponent,
    data: {
      title: 'Documents Page',
    },
  },
];
