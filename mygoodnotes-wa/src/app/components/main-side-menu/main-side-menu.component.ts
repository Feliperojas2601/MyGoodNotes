import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TreeNode } from 'primeng/api/public_api';
import { TreeModule } from 'primeng/tree';

@Component({
  selector: 'app-main-side-menu',
  standalone: true,
  imports: [
    TreeModule,
  ],
  templateUrl: './main-side-menu.component.html',
  styleUrl: './main-side-menu.component.css', 
  encapsulation: ViewEncapsulation.None,
})
export class MainSideMenuComponent implements OnInit {
  public books: TreeNode[] = []; 

  constructor() {}

  ngOnInit() {
    this.books = [
      {
        label: 'Books',
        icon: 'pi pi-book',
        children: [
          {
            label: 'Fiction',
          }
        ],
      }, 
      {
        label: 'Notebooks',
        icon: 'pi pi-book',
      }
    ];
  }
} 
