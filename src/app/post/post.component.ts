import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Post } from '../interfaces';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {

  post: Post;

  readonly EMPTY_POST: Post = {
    id: null,
    title: "Post Not Found",
    body: "We are sorry, but we could not find the post requested",
    comments: [],
    userId: null
  }

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService
  ) { 
    this.loadPost();
  }

  loadPost() {
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      this.blogService.getPost(id).subscribe(post => {
        this.post = (post.length === 1) ? this.post = post[0] : this.EMPTY_POST;
      });
    });
  }

  addComment(body: string) {
    const comment = {
      email: environment.commentEmail,
      postId: this.post.id,
      id: this.post.comments?.length || 0,
      name: environment.commentName,
      body
    };
    this.blogService.addComment(this.post, comment).subscribe(_ => {
      this.loadPost();
    });    
  }
}
