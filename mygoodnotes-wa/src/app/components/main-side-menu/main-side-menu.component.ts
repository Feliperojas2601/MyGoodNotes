import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TreeNode } from 'primeng/api/public_api';
import { TreeModule } from 'primeng/tree';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContextMenuModule } from 'primeng/contextmenu';
import { InputTextModule } from 'primeng/inputtext';
import { MenuItem } from 'primeng/api';
import { BookService } from '../../services/book.service';
import { ImageService } from '../../services/image.service';
import { NoteService } from '../../services/note.service';

@Component({
  selector: 'app-main-side-menu',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TreeModule,
    ButtonModule,
    DialogModule,
    ContextMenuModule,
    InputTextModule,
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
  public menu: MenuItem[] = [];
  public selectedNode!: TreeNode;

  constructor(
    private bookService: BookService,
    private noteService: NoteService,
    private imageService: ImageService,
  ) {}

  ngOnInit() {
    this.loadMenu();
    this.bookService.getBooks().subscribe({
      next: (books) => {
        console.log(books);
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  public loadMenu() {
    this.menu = [
      {
        label: 'Create',
        icon: 'pi pi-plus',
        items: [
          {
            label: 'Book',
            command: () => this.showCreateDialog(),
            icon: 'pi pi-book'
          },
          {
            label: 'Note',
            command: () => this.showEditDialog(),
            icon: 'pi pi-file', 
            disabled: this.selectedNode === undefined || this.selectedNode === null
          }
        ]
      },
      {
        label: 'Edit',
        icon: 'pi pi-pencil',
        items: [
          {
            label: 'Book',
            command: () => this.showCreateDialog(),
            icon: 'pi pi-book', 
            disabled: this.selectedNode === undefined || this.selectedNode === null
          },
          {
            label: 'Note',
            command: () => this.showCreateDialog(),
            icon: 'pi pi-file', 
            disabled: this.selectedNode === undefined || this.selectedNode === null
          },
        ]
      },
    ];
  }

  public showCreateDialog() {
    this.creationMode = true;
    this.showDialog = true;
    this.newBookTitle = '';
  }

  public showEditDialog() {
    this.creationMode = false;
    this.showDialog = true;
  }
  
  public createBook() {
    this.showDialog = false;
    this.bookService.createBook(this.newBookTitle).subscribe({
      next: (book) => {
        console.log(book);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  public updateBook() {
    this.showDialog = false;
    this.bookService.updateBook(this.selectedNode.data.id, this.newBookTitle).subscribe({
      next: (book) => {
        console.log(book);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
} 
