import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../shared/http.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {

  form = this.fb.group({
    id: ['', [Validators.required, Validators.minLength(15)]],
    summ: ['', [Validators.required]],
    currency: ['', [Validators.required]],
    name: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    time: ['', [Validators.required]],
  })

  id: AbstractControl = this.form.controls.id
  summ: AbstractControl = this.form.controls.summ
  currency: AbstractControl = this.form.controls.currency
  name: AbstractControl = this.form.controls.name
  lastName: AbstractControl = this.form.controls.lastName
  time: AbstractControl = this.form.controls.time

  constructor(private httpService: HttpService, private fb: FormBuilder) {

   }

   private createControls(): void {
    this.id.setValue('dfkhgvtbv203971')
    this.summ.setValue('20')
    this.currency.setValue('UAH')
    this.name.setValue('Иван')
    this.lastName.setValue('Иванов')
    this.time.setValue('2021-01-01 20:17:59')
   }

  ngOnInit(): void {
    this.createControls()
  }

  onSubmit(): void {
    this.httpService.createData(this.form.value)
  }

}
