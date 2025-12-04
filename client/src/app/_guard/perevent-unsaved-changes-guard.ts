import { CanDeactivateFn } from '@angular/router';
import { MemberEdit } from '../members/member-edit/member-edit';

export const pereventUnsavedChangesGuard: CanDeactivateFn<MemberEdit> = (component) => {
  if  (component.editForm?.dirty) {
    return confirm('Are You Sure?')
  }
  return true; 
};
