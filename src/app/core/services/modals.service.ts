import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteUserModalComponent } from 'src/app/components/ui/modals/delete-user-modal/delete-user-modal.component';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class ModalsService {
  constructor(private users: UsersService, private modalService: NgbModal) {}

  opendDeletUserModal(userId: string, callback: () => void) {
    const modalRef = this.modalService.open(DeleteUserModalComponent);

    modalRef.result.then(
      (result) => {},
      (reason) => {
        // Case on delete confirm
        this.users.distroy(userId).subscribe(() => callback())
      }
    );
  }
}
