import {Component, OnInit} from '@angular/core';
import {Post} from '../post';
import {PostService} from '../post.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  // @ts-ignore
  post: Post = new Post();

  constructor(private postService: PostService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.savePost();
  }

  savePost() {
    this.postService.createPost(this.post).subscribe(data => {
        this.goToPostList();
      },
      error => console.log(error));
  }
  goToPostList() {
    this.router.navigate(['posts']);
  }
}
