import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TitleSideMenuComponent } from './components/title-side-menu/title-side-menu.component';
import { MainSideMenuComponent } from './components/main-side-menu/main-side-menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    TitleSideMenuComponent,
    MainSideMenuComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {}
