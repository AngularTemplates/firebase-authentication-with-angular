import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

export interface Animal {
  name: string;
  sound: string;
}

@Component({
  selector: 'app-supplier-name',
  templateUrl: './supplier-name.component.html',
  styleUrls: ['./supplier-name.component.scss']
})
export class SupplierNameComponent implements OnInit {
  constructor() {}
  animalControl;
  selectFormControl;
  animals: Animal[] = [
    { name: 'Dog', sound: 'Woof!' },
    { name: 'Cat', sound: 'Meow!' },
    { name: 'Cow', sound: 'Moo!' },
    { name: 'Fox', sound: 'Wa-pa-pa-pa-pa-pa-pow!' }
  ];
  ngOnInit() {
    this.animalControl = new FormControl('', [Validators.required]);
    this.selectFormControl = new FormControl('', Validators.required);
  }
}
