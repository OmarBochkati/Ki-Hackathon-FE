import { Routes } from '@angular/router';
import { StarterComponent } from './starter/starter.component';
import {DocumentsComponent} from "./documents/documents.component";
import {ListDocumentsComponent} from "./list-documents/list-documents.component";
import {ProcessdocumentsComponent} from "./processdocuments/processdocuments.component";

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
    component: ListDocumentsComponent,
    data: {
      title: 'Documents',
    },
  },
  {
    path: 'add-documents',
    component: DocumentsComponent,
    data: {
      title: 'Add Documents',
    },
  },
  {
    path: 'process-documents/:id',
    component: ProcessdocumentsComponent,
    data: {
      title: 'Process Documents',
    },
  },
];
