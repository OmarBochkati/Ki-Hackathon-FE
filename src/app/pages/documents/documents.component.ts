import {Component, ElementRef, ViewChild, ViewEncapsulation} from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import {ProgressComponent} from "../../components/progress/progress.component";
import {DndDirective} from "../../directive/dnd.directive";
import {NgForOf, NgIf, NgStyle} from "@angular/common";
import {FileUploadService} from "../../services/file-upload.service";
import {Observable} from "rxjs";
import {HttpEventType, HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-starter',
  templateUrl: './documents.component.html',
  standalone: true,
  imports: [MaterialModule, ProgressComponent, DndDirective, NgForOf, NgStyle, NgIf],
  styleUrls: ['./documents.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DocumentsComponent {
  @ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef;
  files: any[] = [];
  selectedFiles?: any;
  progressInfos: any[] = [];
  message: string[] = [];

  fileInfos?: Observable<any>;

  constructor(private uploadService: FileUploadService) { }


  /**
   * on file drop handler
   */
  onFileDropped($event: any) {
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(event: any) {
    let files = event?.target?.files

    this.progressInfos = [];
    this.selectedFiles = event.target.files;
    console.log(this.selectedFiles)
    this.prepareFilesList(files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    if (this.files[index].progress < 100) {
      console.log("Upload in progress.");
      return;
    }
    this.files.splice(index, 1);
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
    //this.fileDropEl.nativeElement.value = "";
    //this.uploadFilesSimulator(0);
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes: any, decimals = 2) {
    if (bytes === 0) {
      return "0 Bytes";
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  uploadFiles(): void {
    this.upload(this.selectedFiles!);
  }

  upload(files: any): void {
  console.log(files)
    if (files) {
      this.uploadService.upload(files).subscribe({
        next: (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            console.log(event)
            //this.files[idx].progress = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            console.log(event)
            const msg = 'Uploaded the file successfully';
            for (let i = 0; i < this.files.length; i++) {
              this.files[i].progress = 100;
            }
            this.message.push(msg);
            this.fileInfos = this.uploadService.getFiles();
          }
        },
        error: (err: any) => {
          const msg = 'Could not upload the file: ' + files;
          this.message.push(msg);
          this.fileInfos = this.uploadService.getFiles();
        }
      });
    }
  }
}
