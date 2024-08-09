import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MatIcon} from "@angular/material/icon";
import {MatFormField} from "@angular/material/form-field";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {NgClass, NgForOf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIconButton} from "@angular/material/button";
import {FileUploadService} from "../../services/file-upload.service";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [
    MatIcon,
    MatFormField,
    MatCardActions,
    MatCardContent,
    MatCardSubtitle,
    MatCardTitle,
    NgForOf,
    MatCardHeader,
    MatCard,
    NgClass,
    ReactiveFormsModule,
    MatIconButton,
    FormsModule,
    MatInput
  ],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.scss'
})
export class ChatbotComponent {
  messages: any[] = [];
  userInput: string = '';
  @Input() public display: string;
  @ViewChild('messageContainer') private messageContainer: ElementRef;
  private canSendMessage = true;

  constructor(private http: HttpClient, private fileupload: FileUploadService) {
    this.messages.push({
      type: 'bot',
      text: 'Welcome to your city\'s chatbot'
    })
  }

  public onClickEnter(event: any): void {
    event.preventDefault();
    console.log(this.userInput)
    this.sendMessage();
  }

  sendMessage() {
    this.messages.push({
      type: 'user',
      text: this.userInput
    })
    this.fileupload.chatbot({ question: this.userInput }).subscribe(response => {
      this.messages.push({
        type: 'bot',
        text: response.result
      })
    });
    this.userInput = '';
  }
}
