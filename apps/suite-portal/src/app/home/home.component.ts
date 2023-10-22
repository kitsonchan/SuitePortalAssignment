import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ALL_SERVICE_TYPES, MaintenanceRequest } from '@suiteportal/api-interfaces';
import { Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface PostResponse {
  id: string
}

@Component({
  selector: 'pm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isLoading:boolean = false;
  message:string = ''

  serviceTypes = ALL_SERVICE_TYPES;

  constructor(private http: HttpClient) {
    //
  }

  ngOnInit(): void {
    //
  }

  maintenanceForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    unitNumber: new FormControl('', Validators.pattern('^[0-9]+$')),
    serviceType: new FormControl('', Validators.required),
    summary: new FormControl('', Validators.required),
    details: new FormControl('')
  })

  onSubmit() {
    this.isLoading = true
    // console.log(this.maintenanceForm.value);
    // console.log(this.maintenanceForm.valid);
    this.http.post<PostResponse>('http://localhost:4200/api/maintenance-requests', {
      name: this.maintenanceForm.value.name,
      email: this.maintenanceForm.value.email,
      unitNumber: this.maintenanceForm.value.unitNumber,
      serviceType: this.maintenanceForm.value.serviceType,
      summary: this.maintenanceForm.value.summary,
      details: this.maintenanceForm.value.details,
    }).subscribe({
      next: data => {
        this.message = 'Request Created Successfully!'
        this.isLoading = false
        console.log(data.id)
      },
      error: error => {
        this.message = 'Request Creation Failed.'
        this.isLoading = false
        console.error('Error:', error);
      }
    })
  }
}
