import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: any[] = []; // Array to store users

  constructor(private apiService: ApiService) {}

  async ngOnInit() {
    try {
      const response = await this.apiService.getUsers();
      this.users = response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }
}
