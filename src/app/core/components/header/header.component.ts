import { Component, OnInit } from '@angular/core';
import { TranslationService } from '../../services/translation/translation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isEnglish = null;
  collaped = false;

  constructor(public translateService: TranslationService) { }

  ngOnInit(): void { }
  
  changeLanguage() {
    this.translateService.changeLanguage();
  }
}
