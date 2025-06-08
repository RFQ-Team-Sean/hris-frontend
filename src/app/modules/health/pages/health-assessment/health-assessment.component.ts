import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-health-assessment',
  templateUrl: './health-assessment.component.html',
  styleUrls: ['./health-assessment.component.scss'],
  host: { class: 'block' }
})
export class HealthAssessmentComponent implements OnInit {
  activeOption: 'audio' | 'face' | 'digital' | null = null;
  @ViewChild('videoElement') videoElement?: ElementRef<HTMLVideoElement>;
  videoStream?: MediaStream;

  constructor() { }

  ngOnInit(): void { }

  selectOption(option: 'audio' | 'face' | 'digital') {
    this.activeOption = option;
    if (option === 'face') {
      this.startWebcam();
    } else {
      this.stopWebcam();
    }
  }

  async startWebcam() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        this.videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (this.videoElement && this.videoElement.nativeElement) {
          this.videoElement.nativeElement.srcObject = this.videoStream;
          this.videoElement.nativeElement.play();
        }
      } catch (err) {
        alert('Unable to access webcam.');
      }
    }
  }

  stopWebcam() {
    if (this.videoStream) {
      this.videoStream.getTracks().forEach(track => track.stop());
      this.videoStream = undefined;
    }
  }
} 