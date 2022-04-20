import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  private defaultLang: string = localStorage.getItem('currentLang') || environment.defaultLang;
  private renderer: Renderer2;
  private currentLanguage = new BehaviorSubject<string>(this.defaultLang);

  currentLanguage$ = this.currentLanguage.asObservable();

  constructor(private translate: TranslateService, private rendererFactory: RendererFactory2) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    this.initLanguage();
  }

  changeLanguage() {
    this.defaultLang = this.defaultLang === 'en' ? 'ar' : 'en';
    localStorage.setItem('currentLang', this.defaultLang);

    this.translate.use(this.defaultLang);
    this.handleBasicLogic();
  }

  get isEnglish() {
    return this.translate.currentLang === 'en';
  }

  private initLanguage() {
    localStorage.setItem('currentLang', this.defaultLang);
    this.translate.use(this.defaultLang);
    this.translate.setDefaultLang(this.defaultLang);
    this.handleBasicLogic();
  }

  private handleBasicLogic() {
    if (this.defaultLang === 'ar') {
      this.renderer.addClass(document.body, 'rtl');
      this.renderer.setAttribute(document.body, 'dir', 'rtl');
      this.currentLanguage.next(this.defaultLang);
    } else {
      this.renderer.removeClass(document.body, 'rtl');
      this.renderer.setAttribute(document.body, 'dir', 'ltr');
      this.currentLanguage.next(this.defaultLang);
    }
  }
}
