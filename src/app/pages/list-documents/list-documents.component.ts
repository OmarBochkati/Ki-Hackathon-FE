import {Component, OnInit} from '@angular/core';
import {FileUploadService} from "../../services/file-upload.service";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {MatCard, MatCardContent, MatCardSubtitle, MatCardTitle} from "@angular/material/card";

@Component({
  selector: 'app-list-documents',
  standalone: true,
  imports: [
    MatButton,
    RouterLink,
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatCardSubtitle
  ],
  templateUrl: './list-documents.component.html',
  styleUrl: './list-documents.component.scss'
})
export class ListDocumentsComponent implements OnInit{
  files: any[] = [];

  constructor(private uploadService: FileUploadService) { }

  ngOnInit() {
    this.retrieveFiles();
  }

  retrieveFiles(): void {
    this.uploadService.getFiles().subscribe({
      next: (event: any) => {
        console.log(event)
        this.files = event
      },
      error: (err: any) => {
        const msg = 'Error requesting files';
      }
    });
  }
}
