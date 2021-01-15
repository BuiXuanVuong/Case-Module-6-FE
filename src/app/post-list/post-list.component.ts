import { Component, OnInit } from '@angular/core';
import {PostService} from '../post.service';
import {Router} from '@angular/router';
import {Post} from '../post';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  // @ts-ignore
  posts: Post[];
  constructor(private postSevice: PostService,
              private router: Router) { }

  ngOnInit(): void {
    this.getPosts();
  }

  private getPosts() {
    this.postSevice.getPostsList().subscribe(data => {
      this.posts = data;
    });
  }

}
