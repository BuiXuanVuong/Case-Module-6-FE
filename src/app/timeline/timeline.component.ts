import { Component, OnInit } from '@angular/core';
import {Post} from '../post';
import {PostService} from '../post.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  // @ts-ignore
  posts: Post[];
  constructor(private postSerVice: PostService,
              private router: Router) { }

  ngOnInit(): void {
    this.getPosts();
  }

  // tslint:disable-next-line:typedef
  private getPosts() {
    this.postSerVice.getPostsList().subscribe(data => {
      this.posts = data;
    });
  }
}
