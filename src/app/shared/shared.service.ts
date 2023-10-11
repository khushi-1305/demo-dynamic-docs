import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  private repoUrl: Subject<string> = new BehaviorSubject<string>('simptel/docs.simptel.com');

  getRepoUrl(){
    return this.repoUrl.asObservable();
  }

  saveRepoUrl(data:string) {
    this.repoUrl.next(data);
  }
}
