import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

interface MaintenanceRequestList {
  data: Array<{ [k: string]: any }>
}

@Component({
  selector: 'sp-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'unitNumber', 'serviceType', 'summary', 'details', 'actions'];
  isLoading: boolean = true;
  requestList: any = [];
  headers = new HttpHeaders({ 'Authorization': "Bearer admin" });

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    /// imitating authorized access to protected API routes with bearer token to identify the role of user on request

    this.http.get<MaintenanceRequestList>('http://localhost:4200/api/maintenance-requests', { headers: this.headers }).subscribe({
      next: data => {
        this.requestList = data
        this.isLoading = false
        this.openSnackBar('Request Fetched Successfully!', 'Dismiss')
      },
      error: error => {
        this.isLoading = false
        this.openSnackBar(`Error: ${error.error.message}`, 'Dismiss')
      }
    })
  }

  editRequest(id: string) {
    //`http://localhost:4200/api/maintenance-requests/1/close`
    //`http://localhost:4200/api/maintenance-requests/${id}/close`
    this.http.put(`http://localhost:4200/api/maintenance-requests/${id}/close`, {}, { headers: this.headers }).subscribe({
      next: (data) => {
        //returning list of open maintenance requests to instantly update table data without page refresh
        this.requestList = data
        console.log(data)
        this.openSnackBar('Request Closed Successfully!', 'Confirm')
      },
      error: error => {
        this.openSnackBar(`Error: ${error.error.message}`, 'Confirm')
      }
    })
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
    // let currentUrl = this.router.url
    // let snackBarRef = this.snackBar.open(message, action);

    // snackBarRef.afterDismissed().subscribe(() => {
    //   if (action === 'Confirm') {
    //     this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    //       this.router.navigate([currentUrl]);
    //     });
    //   }
    // });
  }
}
