import { Component } from '@angular/core';
import { Post } from '../interfaces';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  readonly MAX_CHARS_PER_LINE: number = 250;
  posts: Post[];

  constructor (private blogService: BlogService) {
    this.loadPosts();
  }

  loadPosts() {
    this.blogService.getPosts().subscribe(posts => this.posts = posts as any);
  }

  getDisplayableLine(text: string): string {
    // keep only the first #MAX_CHARS_PER_LINE characters
    const trimmedText = text.slice(0, this.MAX_CHARS_PER_LINE);
    let trimmedTextArray = trimmedText.split(" ");

    // remove last word as it may not appear entire
    trimmedTextArray.splice(trimmedTextArray.length - 1, 1);
    return trimmedTextArray.join(" ") + "...";
  }

}
