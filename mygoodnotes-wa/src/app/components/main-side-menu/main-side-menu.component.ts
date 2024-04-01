import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TreeNode } from 'primeng/api/public_api';
import { TreeModule } from 'primeng/tree';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-side-menu',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TreeModule,
    ButtonModule,
    DialogModule,
  ],
  templateUrl: './main-side-menu.component.html',
  styleUrl: './main-side-menu.component.css', 
  encapsulation: ViewEncapsulation.None,
})
export class MainSideMenuComponent implements OnInit {
  public books: TreeNode[] = []; 
  public showDialog: boolean = false;
  public creationMode: boolean = false;
  public newBookTitle: string = '';

  constructor() {}

  ngOnInit() {}

  public showCreateDialog() {
    this.creationMode = true;
    this.showDialog = true;
  }
  
  public createBook() {
    this.books.push({
      label: this.newBookTitle,
      children: []
    });
    this.showDialog = false;
  }

  public updateBook() {
    this.showDialog = false;
  }
} 
