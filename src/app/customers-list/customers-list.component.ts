import { Component, OnInit } from '@angular/core';
import { Customer } from '../shared/customer';
import { HttpService } from '../shared/http.service';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss']
})
export class CustomersListComponent implements OnInit {

  isEditPos: number | null = null
  isChanged = false
  private tempCustomer!: Customer

  constructor(public httpService: HttpService) {

   }

  ngOnInit(): void {
    this.httpService.getData()
  }

  editCustomer(i: number): void {
    this.tempCustomer = this.resetCustomer()
    this.isEditPos = i
  }

  cancelEdit(): void {
    this.isEditPos = null
    this.isChanged = false
  }

  saveCustomer(customer: Customer, i: number): void {
    const mergeCustomer: Customer = this.mergeCustomerProps<Customer>(customer, this.tempCustomer)
    this.httpService.updateData(mergeCustomer, i)
    this.isEditPos = null
    this.isChanged = false
  }

  private mergeCustomerProps<T>(original: T, temp: T): T {
    const result ={...original}

    Object.keys(temp).forEach(key => {
      if(temp[key as keyof T]) {
        result[key as keyof T] = temp[key as keyof T]
      }
    })
    
    return result
  }

  deleteCustomer(customer: Customer): void {
     this.httpService.deleteData(customer)
  }

  setValue(key: string, value: string, origin: string): void {
    const valueTrim = value.trim()

    if (valueTrim !== origin && valueTrim !==this.tempCustomer[key as keyof Customer]) {
      this.tempCustomer[key as keyof Customer] = valueTrim
      this.isChanged = true
    }
  }

  private resetCustomer = ():Customer => ({
    key: null,
    id: null,
    summ: null,
    currency: null,
    name: null,
    lastName: null,
    time: null,
  })
}
