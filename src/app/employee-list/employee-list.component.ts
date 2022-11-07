import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Employee } from '../data/employee';
import { DataService } from '../data/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateFormGroupArgs } from "@progress/kendo-angular-grid";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  @Input()
  employee!: Employee;

  @Output() updateEmployeeList: EventEmitter<boolean> = new EventEmitter<boolean>();

  allEmployeeDetails: Employee[] | any;
  public formGroup: FormGroup | undefined;

  constructor(private dataService: DataService,private route:ActivatedRoute, private router: Router, private formBuilder: FormBuilder) {
    this.createFormGroup = this.createFormGroup.bind(this);
  }

  /** Fetched list of employees using getAllEmployees() method in ngOnInit() */
  ngOnInit(): void {
    this.allEmployeeDetails = this.dataService.getAllEmployees();
  }

  public createFormGroup(args: CreateFormGroupArgs): FormGroup {
    const item = args.isNew ? new Employee() : args.dataItem;

    this.formGroup = this.formBuilder.group({
      employeeId: item.employeeId,
      firstName: [item.firstName, Validators.required],
      lastName: [item.email, Validators.required],
      email: [
        item.email,
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
        ]),
      ],
      contactNumber: [
        item.contactNumber,
        Validators.compose([
          Validators.required,
          Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"),
        ]),
      ]
    });

    return this.formGroup;
  }
}
