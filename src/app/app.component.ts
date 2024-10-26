import { Component } from '@angular/core';
import { DashboardComponent } from '@app/layout/dashboard/dashboard.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DashboardComponent],
  template: '<app-dashboard></app-dashboard>'
})
export class AppComponent {

}
