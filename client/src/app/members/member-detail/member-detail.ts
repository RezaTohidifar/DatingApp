import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Members } from '../../_services/members';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from '../../_models/Member';

@Component({
  selector: 'app-member-detail',
  imports: [],
  templateUrl: './member-detail.html',
  styleUrl: './member-detail.css',
})
export class MemberDetail implements OnInit {
  private memberService = inject(Members);
  router = inject(Router);
  private route = inject(ActivatedRoute)

  private cdRef = inject(ChangeDetectorRef);
  memberDetail?: Member;

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
        this.cdRef.detectChanges()
      }

    })
  }


}
