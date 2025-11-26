import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Members } from '../../_services/members';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from '../../_models/Member';
import { TabsModule } from 'ngx-bootstrap/tabs';

@Component({
  selector: 'app-member-detail',
  imports: [TabsModule],
  templateUrl: './member-detail.html',
  styleUrl: './member-detail.css',
})
export class MemberDetail implements OnInit {
  private memberService = inject(Members);
  router = inject(Router);
  private route = inject(ActivatedRoute)

  private cdRef = inject(ChangeDetectorRef);
  memberDetail?: Member;
  images: string[] = [];

  selectedImage: string = '';
  showModal: boolean = false;

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    const username = this.route.snapshot.paramMap.get('userName');
    if (!username) {

      this.router.navigateByUrl('/home');
      return;
    }
    this.memberService.getMember(username).subscribe({
      next: member => {
        this.memberDetail = member;
        if (this.memberDetail.photoUrl) {
          this.images = this.memberDetail.photos.map(z => z.url)
        }
        this.cdRef.detectChanges();
      }

    })
  }

  openImage(image: string) {
    this.selectedImage = image;
    this.showModal = true;
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.showModal = false;
  }

  nextImage() {
    const currentIndex = this.images.indexOf(this.selectedImage);
    const nextIndex = (currentIndex + 1) % this.images.length;
    this.selectedImage = this.images[nextIndex];
  }

  prevImage() {
    const currentIndex = this.images.indexOf(this.selectedImage);
    const prevIndex = (currentIndex - 1 + this.images.length) % this.images.length;
    this.selectedImage = this.images[prevIndex];
  }
}
