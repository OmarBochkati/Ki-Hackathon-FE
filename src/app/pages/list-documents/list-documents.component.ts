import {Component, OnInit} from '@angular/core';
import {FileUploadService} from "../../services/file-upload.service";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {MatButton, MatFabButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {MatCard, MatCardContent, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {ChatbotComponent} from "../../components/chatbot/chatbot.component";
import {MatSuffix} from "@angular/material/form-field";
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-list-documents',
  standalone: true,
  imports: [
    MatButton,
    RouterLink,
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatCardSubtitle,
    ChatbotComponent,
    MatFabButton,
    MatSuffix,
    NgIf,
    NgClass
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


  private readonly botIconPath = './assets/bot.png';
  private readonly chatIconPath = './assets/chat.png';

  public isOpen = false;
  public iconSrc = this.botIconPath;
  public iconState = 'default';


  public onChangeChatState(): void {
    this.isOpen = !this.isOpen;
    this.iconState = (this.iconState === 'default' ? 'rotated' : 'default');

    if (this.isOpen) this.iconSrc = this.chatIconPath;
    else this.iconSrc = this.botIconPath;
  }
}
