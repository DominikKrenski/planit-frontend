import { Component, OnInit } from '@angular/core';
import { TagsService } from './tags.service'

@Component({
  selector: 'tags-list',
  templateUrl: './tags-list.component.html',
  styleUrls: ['./tags-list.component.css']
})
export class TagsListComponent implements OnInit {

  tags = [];

  currentUser = "";
  authToken = localStorage.getItem('currentUser');
  info = '';
  newName = '';

  getAuth() {
      return JSON.parse(localStorage.getItem('currentUser'));
  };  

  constructor(private tagsService:TagsService) {
    this.currentUser = this.getAuth();
  }

  ngOnInit() {
    if(this.getAuth()) {
      this.tagsService.getUsers((tags)=>{
        this.tags = tags;
      });
    }    
  };

  removeTag(tag) {
    this.tagsService.removeTag(tag.NAME);
    var index = this.tags.indexOf(tag);
    if (index > -1) {
      this.tags.splice(index, 1);
    }
  };
  
  isAdmin(roles) {
    for(var i=0; i<roles.length; i++) {
      if(roles[i].NAME=="ROLE_ADMIN") {
        return true;
      }
    }    
    return false;
  }

  createTag = {
    "NAME": "",
    "IS_ACCEPTED": false
  }
  newTag(valid, createTag) {
    if(valid) {
      this.tagsService.newTag(createTag);
      this.tags.push({
        "NAME": createTag.NAME,
        "IS_ACCEPTED": createTag.IS_ACCEPTED
      });
    }
  }
  acceptTag(tag) {
      this.tagsService.acceptTag(tag.NAME);
      tag.IS_ACCEPTED = true;
  }
  changeName(name, tag) {
    // dorobić do api edit name
    tag.NAME = name;
  }
}
