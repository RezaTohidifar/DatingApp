import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Members } from '../../_services/members';
import { Member } from '../../_models/Member';
import { MemberCard } from "../member-card/member-card";

@Component({
  selector: 'app-member-list',
  imports: [MemberCard],
  standalone : true,
  templateUrl: './member-list.html',
  styleUrl: './member-list.css',
})
export class MemberList implements OnInit {
  private memberList = inject(Members);
  private cdRef = inject(ChangeDetectorRef);
  members : Member[] = [];
  ngOnInit(): void {
      this.loadMembers();
  }

  loadMembers() {
    this.memberList.getMembers().subscribe({
      next: members => {
        this.members = members;
        this.cdRef.detectChanges(); // Force change detection
      }
    });
  }
}
