import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {

  createForm: FormGroup | undefined;
  dynamicFormArray: any;

  constructor(
    private httpClient: HttpClient,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.createForm = this.formBuilder.group({});
    this.httpClient.get('/assets/dynamicFormData.json').subscribe(data => {
      this.dynamicFormArray = data;
      console.log('DATA:>', data);
      this.createFormControl();
    });
  }

  // tslint:disable-next-line:typedef
  createFormControl() {
    this.dynamicFormArray.forEach((data: any) => {
      if (data.Required === true) {
        // @ts-ignore
        this.createForm.addControl(data.Id, new FormControl('', Validators.required));
      } else {
        // @ts-ignore
        this.createForm.addControl(data.Id, new FormControl(''));
      }
    });
  }

  // tslint:disable-next-line:typedef
  save() {
    // @ts-ignore
    console.log('SAVE_DATA>', this.createForm.value);
  }

}
