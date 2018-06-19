import { Component, OnInit, ElementRef, Input, ViewChild, Output, EventEmitter, ViewChildren, AfterViewInit, OnDestroy} from '@angular/core';
import { EventService } from '../event.service';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-ofers',
  templateUrl: './list-ofers.component.html',
  styleUrls: ['./list-ofers.component.scss']
})
export class ListOfersComponent implements OnInit, OnDestroy {

  listOfers: any[] = [];
    
  constructor(private CmsService: ApiService, private event: EventService, private route: ActivatedRoute, private _route: Router) {   
      this.event.onSearchOfers.subscribe(filtr=>this.filtrResponse(filtr))
  }

  ngOnInit() {
      
      this.CmsService.get(`mbopn/getOfers.php`).subscribe(
        response => {
            console.log(response)
            if(response != 0) this.listOfers = response;
        }
      )
  }
    

  ngOnDestroy(){
     // this.event.onSearchOfers.unsubscribe();
  }
    
  filtrResponse(filtr){
      console.log("filtr", filtr)
  } 
}
