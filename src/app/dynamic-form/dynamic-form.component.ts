import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {

  createForm: FormGroup;
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


  createFormControl() {
    this.dynamicFormArray.forEach((data: any) => {
      if (data.Required === true) {
        this.createForm.addControl(data.Id, new FormControl('', Validators.required));
      } else {
        this.createForm.addControl(data.Id, new FormControl(''));
      }
    });
  }

  save() {
    console.log('SAVE_DATA>', this.createForm.value);
  }

}
