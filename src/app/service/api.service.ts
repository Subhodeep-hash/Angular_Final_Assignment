import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import courses from '../_files/courses.json'

interface Courese {
  id : Number;
  title : String;
  price : Number;
  description : String;
  category : String;
  image : String;
  rating : {
    rate : Number;
    count : Number
  };
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  courses:Courese[]=courses;
  

  getProduct(){
    console.log(courses);
    return this.courses;
    
  }
}
