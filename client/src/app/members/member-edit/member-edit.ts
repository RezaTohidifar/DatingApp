import { ChangeDetectorRef, Component, HostListener, inject, OnInit, ViewChild } from '@angular/core';
import { Members } from '../../_services/members';
import { Account } from '../../_services/account';
import { Member } from '../../_models/Member';
import { TabsModule } from "ngx-bootstrap/tabs";
import { FormsModule, NgForm } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { MemberUpdate } from '../../_models/MemberUpdate';
import { PhotoEditor } from "../photo-editor/photo-editor";

@Component({
  selector: 'app-member-edit',
  imports: [TabsModule, FormsModule, PhotoEditor],
  templateUrl: './member-edit.html',
  styleUrl: './member-edit.css',
})
export class MemberEdit implements OnInit {
    @ViewChild('editForm') editForm? : NgForm ;
    @HostListener('window:beforeunload',[`$event`]) notify($event:any) {
      if(this.editForm?.dirty) {
        $event.returnValue = true
      }
    }
    private memberService = inject(Members)
    private accountService = inject(Account)
    private cdRef = inject(ChangeDetectorRef);
    user? : Member
    images: string[] = [];
    taoster = inject(ToastrService)

  selectedImage: string = '';
  showModal: boolean = false;

    ngOnInit(): void {
        this.getMemberInfo()
        
    }
    
    getMemberInfo() {
        const username  = this.accountService.currentUser();
        if  (!username) return;
        return this.memberService.getMember(username.userName).subscribe({
          next : user => {this.user = user;
          this.cdRef.detectChanges();},
          error : e => console.log(e)
        })
      }

    updateMember() {
        this.memberService.updateMemberInfo(this.editForm?.value).subscribe({
          next : _ => {
            this.taoster.success('Profile Updated Successfuly');
            this.editForm?.reset(this.user);
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
