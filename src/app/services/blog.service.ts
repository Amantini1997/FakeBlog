import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comment, Post } from '../interfaces';
 
@Injectable({
  providedIn:'root'
})
export class BlogService {
 
  constructor (private http: HttpClient) { }
 
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(environment.server + '/posts');
  }

  getPost(id: string): Observable<Post[]> {
    return this.http.get<Post[]>(environment.server + '/posts?id=' + id); 
  }
 
  addPost(post: Post): Observable<Post> {
    const headers = { 'content-type': 'application/json' }; 
    const body = JSON.stringify(post);
    return this.http.post(environment.server + '/posts', body, {'headers':headers}) as any;
  }

  addComment(post: Post, comment: Comment): Observable<Post> {
    const headers = { 'content-type': 'application/json' };
    post.comments = [...post.comments, comment];
    const body = JSON.stringify(post);
    return this.http.put(environment.server + '/posts/' + post.id, body, {'headers':headers}) as any;
  } 
}