import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from './base/toolbar/toolbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ToolbarComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {}
