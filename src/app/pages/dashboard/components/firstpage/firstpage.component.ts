import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../../service/UserService.service';
import { AuthService } from '../../../../auth/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-firstpage',
  templateUrl: './firstpage.component.html',
  styleUrls: ['./firstpage.component.scss'],
})
export class FirstpageComponent implements OnInit {
  users: (User & { isEditing?: boolean })[] = [];
  newUser: User = {
    id: '',
    username: '',
    email: '',
    password: '',
    role: 'user',
  };
  
  isAdding: boolean = false;
  currentEditId: string | null = null;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.userService.getUsers().subscribe({
      next: (data) =>
        (this.users = data.map((user) => ({ ...user, isEditing: false }))),
      error: (err) => console.error('Error fetching users:', err),
    });
  }

  editUser(user: User & { isEditing?: boolean }) {
    if (this.currentEditId !== null) {
      console.log( this.currentEditId + " is ready to edit ");
      return;
    }
    this.currentEditId = user.id || null;
    user.isEditing = true;
  }

  saveEdit(user: User & { isEditing?: boolean }) {
    if (!user.id) {
      console.error('User ID is missing');
      return;
    }

    this.userService.updateUser(user).subscribe({
      next: () => {
        user.isEditing = false;
        this.currentEditId = null;
        this.fetchUsers();
      },
      error: (err) => console.error('Error updating user:', err),
    });
  }

  cancelEdit(user: User & { isEditing?: boolean }) {
    this.currentEditId = null;
    user.isEditing = false;
    this.fetchUsers();
  }

  deleteUser(id: string) {
    this.userService.deleteUser(id).subscribe({
      next: () => this.fetchUsers(),
      error: (err) => console.error('Error deleting user:', err),
    });
  }

  addUser() {
    if (this.newUser.username && this.newUser.email && this.newUser.password) {
      const userToAdd = { ...this.newUser };

      this.userService.addUser(userToAdd).subscribe({
        next: () => {
          this.fetchUsers();
          this.newUser = {
            id: '',
            username: '',
            email: '',
            password: '',
            role: 'user',
          };
          this.isAdding = false;
        },
        error: (err) => console.error('Error adding user:', err),
      });
    }
  }

  logoutUser() {
    this.authService.logout().subscribe({
      next: () => this.router.navigate(['/auth/login']),
      error: (err) => console.error('Logout failed:', err),
    });
  }
}
