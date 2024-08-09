import {Component, OnInit} from '@angular/core';
import {MatStep, MatStepLabel, MatStepper} from "@angular/material/stepper";
import {MatButton, MatFabButton} from "@angular/material/button";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {FileUploadService} from "../../services/file-upload.service";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatProgressBar} from "@angular/material/progress-bar";
import {AsyncPipe, NgClass, NgForOf, NgIf, NgStyle} from "@angular/common";
import {Observable} from "rxjs";
import {ChatbotComponent} from "../../components/chatbot/chatbot.component";
import {MatSuffix} from "@angular/material/form-field";

@Component({
  selector: 'app-processdocuments',
  standalone: true,
  imports: [
    MatStepper,
    MatStep,
    MatButton,
    RouterLink,
    MatStepLabel,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatCard,
    MatProgressSpinner,
    MatProgressBar,
    NgStyle,
    NgIf,
    AsyncPipe,
    NgForOf,
    MatFabButton,
    ChatbotComponent,
    NgClass,
    MatSuffix
  ],
  templateUrl: './processdocuments.component.html',
  styleUrl: './processdocuments.component.scss'
})
export class ProcessdocumentsComponent implements OnInit{
  step1Results : any = {}
  step2Results : any = {}
  showSpinner = false;
  step1End = false;
  step1start = false;
  showSpinner2 = false;
  step2End = false;
  step2start = false;
  requestId = ''
  step1Steps : any = []
  list1 = [
    'Text extraction from your documents...',
    'Classification of your documents...',
    'Labeling of your documents...',
    'Detection of the Townhall service that matches your request...',
  ]
  list2 = [
    'Checking the authenticity of your documents...',
    'Verifying that your documents are complete...',
  ]

  constructor(private uploadService: FileUploadService, private route : ActivatedRoute) {
    this.requestId = this.route.snapshot.params["id"];
    console.log(this.requestId)
  }

  ngOnInit() {
  }

  /*uploadFilesSimulator(index: number) {
    var timer = 0;
    this.step1Steps = Observable.from([[], ...this.list1])
        .mergeMap((x: any) => Observable.timer(timer++ * 1000).map((y: any) => x))
        .scan((acc: any, curr: any, seed: any) => {
          acc.push(curr);
          return acc;
        });
  }*/

  processFilesStep1(): void {
    this.showSpinner = true;
    this.step1start = true;
    this.step1End = false;
    this.uploadService.processFilesStep1(this.requestId).subscribe({
      next: (event: any) => {
        console.log(event)
        this.step1Results = event
        this.showSpinner = false;
        this.step1End = true;
      },
      error: (err: any) => {
        this.showSpinner = false;
        this.step1End = true;
        const msg = 'Error requesting files';
      }
    });
  }

  processFilesStep2() {
    this.showSpinner2 = true;
    this.step2start = true;
    this.step2End = false;
    let data = {
      service_name: this.step1Results.service_name,
      topic: this.step1Results.topic,
      doc_labels: this.step1Results.doc_labels,
    }
    this.uploadService.processFilesStep2(this.requestId, data).subscribe({
      next: (event: any) => {
        console.log(event)
        this.step2Results = event
        this.showSpinner2 = false;
        this.step2End = true;
      },
      error: (err: any) => {
        this.showSpinner2 = false;
        this.step2End = true;
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
