import { Component } from '@angular/core';
import { LoaderService } from './core/services/loader.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'parents-assesment-app';
}
