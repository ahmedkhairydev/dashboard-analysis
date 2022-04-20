import { Component } from '@angular/core';
import { LoadingService } from './core/services/loading/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  show = false;

  constructor(private loading: LoadingService) { }

  ngOnInit(): void {
    this.loading.isLoading.subscribe(isLoading => {
      setTimeout(() => this.show = isLoading);
    });
  }
}
