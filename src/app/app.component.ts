import { Component, OnInit } from '@angular/core';
import { EventService } from './event.service'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'app';
    
    constructor(private toastrService: EventService, private route: ActivatedRoute) {}
    
    ngOnInit(){
        this.route.params.subscribe(params => console.log(params));
    }
    
    test(){
        this.toastrService.wyswietlInfo('success', 'test error');
    }
    
}
