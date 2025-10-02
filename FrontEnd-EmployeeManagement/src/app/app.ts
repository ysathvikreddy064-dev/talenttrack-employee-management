import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html'
})
export class App implements OnInit {

  setTheme(theme: 'apple'|'amazon'|'samsung'|'netflix') {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('talenttrack-theme', theme);
  }

  ngOnInit(): void {
    const saved = localStorage.getItem('talenttrack-theme') as any;
    document.documentElement.setAttribute('data-theme', saved || 'amazon');
  }
}
