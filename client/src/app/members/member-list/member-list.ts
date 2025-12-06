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
  memberList = inject(Members);
  private cdRef = inject(ChangeDetectorRef);
  ngOnInit(): void {
    console.log(this.memberList.members().length);
    if (this.memberList.members().length === 0) this.loadMembers();
  }

  loadMembers() {
    this.memberList.getMembers();
  }
}
