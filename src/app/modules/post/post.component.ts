import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PostInterface} from '../../models/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() post: PostInterface = {} as PostInterface;

  @Output() delete: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  onDeletePost(event: Event) {
    event.preventDefault();
    this.delete.emit(this.post.id);
  }

}
