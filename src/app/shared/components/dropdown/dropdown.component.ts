import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { Observable } from 'rxjs';
import { LookUp } from 'src/app/core/interfaces/data';

type bindValue = 'id' | 'text';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {

  @Input() formGroup!: FormGroup;
  @Input() controlName!: string;
  @Input() options!: Observable<LookUp[]>;
  @Input() label!: string;
  @Input() appearance: MatFormFieldAppearance = 'fill';
  @Input() bindValue: bindValue = 'id';

  constructor() { }

  ngOnInit(): void { }

}
