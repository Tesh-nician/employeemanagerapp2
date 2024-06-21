import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
// import { provideHttpClient } from '@angular/common/http'; voorlopig niet nodig
import { CommonModule } from '@angular/common'; //JDR: did vervangt import in een app module



@Component({
  selector: 'app-root',
  standalone: true,
  providers: [],

  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit{
  title = 'employeemanagerapp'
  public employees: Employee[]= [];
  public editEmployee: Employee = {} as Employee; //maakt een lege Employee object aan, anders krijg je type null not assignable
  public deleteEmployee: Employee = {} as Employee;  //maakt een lege Employee object aan, anders krijg je type null not assignable
  public employee: Employee = {} as Employee; //maakt een lege Employee object aan

  constructor (private employeeService: EmployeeService) {}
  
  ngOnInit() {
    this.getEmployees()
    
  }


  public onOpenModal(employee: Employee | null, mode: string): void {  // | null toegevoegd zodat null een mogelijke type is.  
    this.employee = {} as Employee; // JDR: toegevoegd om geen null object te krijgen in de modal/html. Misschien geeft dit een probleem???
    if (employee !== null) {

    const container = document.getElementById('main-container');
    if (container) {
      const button = document.createElement('button');
      button.type = 'button';
      button.style.display = 'none';
      button.setAttribute('data-toggle', 'modal');
      if (mode === 'add') {
        button.setAttribute('data-target', '#addEmployeeModal');
        this.employee = {} as Employee; // JDR: toegevoegd om geen null object te krijgen in de modal/html. Misschien geeft dit een probleem???
      }
      if (mode === 'edit') {
        this.employee = employee;
        button.setAttribute('data-target', '#updateEmployeeModal');
      }
      if (mode === 'delete') {
        this.employee = employee;
        button.setAttribute('data-target', '#deleteEmployeeModal');
      }
      container.appendChild(button);
      button.click();
    }
  }
  }
    

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
      }, 
      (error: HttpErrorResponse) => {
        if (error.message === null) {
          alert("An error occurred while fetching employees.");
        } else {
          alert(error.message);
        }
      }
    );
  }


  public searchEmployees(key: string): void {
    const results: Employee[] = [];
    for (const employee of this.employees) {
      if (employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(employee);
      }
    }
    this.employees = results;
    if (results.length === 0 || !key) {
      this.getEmployees();
    }
  }


  
public onAddEmployee(addForm: any): void {
  if (addForm) {
    const addFormElement = document.getElementById('add-employee-form');
    if (addFormElement) {
      addFormElement.click();
    }
    this.employeeService.addEmployee(addForm.value).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }
}
      

  public onUpdateEmployee(employee: Employee): void {
    this.employeeService.updateEmployee(employee).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteEmployee(employeeId: number): void {
    this.employeeService.deleteEmployee(employeeId).subscribe(
      (response: void) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
 

}
  

   

