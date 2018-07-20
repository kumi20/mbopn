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
    search = {
      province: '',
      county: '',
      subject: '',
      category: '',
      city: '',
      school: '',
      employmentDimension: ''
  }; 
  page;    
    
  constructor(private CmsService: ApiService, private event: EventService, private route: ActivatedRoute, private _route: Router) {   
      this.event.onSearchOfers.subscribe(filtr=>this.filtrResponse(filtr))
  }

  ngOnInit() {
      
      this.route.params.subscribe(params => this.page = parseInt(params['page']));
      
      this.route.params.subscribe(params => this.search.category = params['category']);
      if (this.search.category === undefined ) this.search.category = '%';
        
      this.route.params.subscribe(params => this.search.city = params['city']);
      if (this.search.city === undefined ) this.search.city = '%';
      
      this.route.params.subscribe(params => this.search.county = params['county']);
      if (this.search.county === undefined ) this.search.county = '%';
      
      this.route.params.subscribe(params => this.search.employmentDimension = params['employmentDimension']);
      if (this.search.employmentDimension === undefined ) this.search.employmentDimension = '%';
      
      this.route.params.subscribe(params => this.search.province = params['province']);
      if (this.search.province === undefined ) this.search.province = '%';
      
      this.route.params.subscribe(params => this.search.school = params['school']);
      if (this.search.school === undefined ) this.search.school = '%';
      
      this.route.params.subscribe(params => this.search.subject = params['subject']);
      if (this.search.subject === undefined ) this.search.subject = '%';
        
      this.CmsService.post(`mbopn/getOfers.php`, this.search).subscribe(
        response => {
            if(response != 0) this.listOfers = response;
            this.event.setCountOferts(this.listOfers.length);
            if(this.search.city === '%') this.search.city = '';
        }
      )
  }
    

  ngOnDestroy(){
     // this.event.onSearchOfers.unsubscribe();
  }
    
  filtrResponse(filtr){
      
      if (filtr.category == '' || filtr.category == null || filtr.category == 'undefined') filtr.category = '%';
      if (filtr.city == '' || filtr.city == null || filtr.city == 'undefined') filtr.city = '%';
      if (filtr.county == '' || filtr.county == null || filtr.county == 'undefined') filtr.county = '%';
      if (filtr.employmentDimension == '' || filtr.employmentDimension == null || filtr.employmentDimension == 'undefined') filtr.employmentDimension = '%';
      if (filtr.province == '' || filtr.province == null || filtr.province == 'undefined') filtr.province = '%';
      if (filtr.school == '' || filtr.school == null || filtr.school == 'undefined') filtr.school = '%';
      if (filtr.subject == '' || filtr.subject == null || filtr.subject == 'undefined') filtr.subject = '%';
      
      this.listOfers.length = 0;
      
      this.CmsService.post(`mbopn/getOfers.php`, filtr).subscribe(
        response => {
            if(response != 0) this.listOfers = response;
            this.event.setCountOferts(this.listOfers.length);
            if(this.search.city === '%') this.search.city = '';
        }
      )
  }
    
  pageChanged(page){
    let url = document.location.hash;
    if (isNaN(this.page)) console.log('ta') ;
    else{
        let pageURL = 'page/'+this.page;
        url = url.replace(pageURL,''); 
    }
   
    url = url.replace('#','');
         
    url = 'page/'+page+url;
    url = url.replace(/%25/g,'%'); 
    url = '/'+url;  
    console.log(url)  
    this._route.navigate([url]);
    return page;
  }
}
