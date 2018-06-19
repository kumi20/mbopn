import { Component, OnInit, ViewChild } from '@angular/core';
import { EventService } from '../event.service';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
    
  @ViewChild('provinceSelect') provinceSelect;    
  @ViewChild('countySelect') countySelect;  
  @ViewChild('type') type;    
  @ViewChild('subjectSelect') subjectSelect;   

  province: any = [];  
  county: any = [];
  subject: any = [];  
  category = [{value: '', label: '-- wybierz --'}, {value: 1, label: 'ogólnokształcące'}, {value: '2', label: 'zawodowe'}];
  school: any = [];    
  search = {
      province: '',
      county: '',
      subject: '',
      category: '',
      city: '',
      school: '',
      employmentDimension: ''
  }; 
  count: string = '';    
  showMore: boolean = false;
  employmentDimension = [{value: '', label: '-- wybierz --'}, {value: 1, label: 'wakat'}, {value: 2, label: 'zastępstwo'}];    
    
    
  constructor(private CmsService: ApiService, private event: EventService, private route: ActivatedRoute, private _route: Router) { }

  ngOnInit() {
      this.event.klepsydraStart();
      this.CmsService.get(`mbopn/getListWojewodztwa.php`).subscribe(
        response =>{
            
            response.forEach(el=>{
                this.province.push({value: el.teryt, label: el.nazwa});
            })
            this.provinceSelect.updateOptionsList();
            this.event.klepsydraStop();
        },
        error =>{
            this.event.wyswietlInfo('error', 'Błąd pobierania województ');
            this.event.klepsydraStop();
        }
      )
      
      this.CmsService.get(`mbopn/countOfert.php`).subscribe(
          response=>{
              this.count = response[0].count;
          });
      this.getListType();
  }
    
  getListType(){
      this.CmsService.get(`mbopn/getListTyp.php`).subscribe(
        response =>{
            response.forEach(el=>{
                this.school.push({value: el.id, label: el.nazwa});
            }); 
            this.type.updateOptionsList();
        },
        error =>{
            this.event.wyswietlInfo('error', 'Błąd pobierania typów szkół');
        }  
      )
  }    
    
  selectedProvince(event){
      this.county.length = 0;
      this.county.push({value: '', label: '-- wybierz --'});
      this.event.klepsydraStart();
      this.CmsService.get(`mbopn/getListPowiaty.php?teryt=${event.value}`).subscribe(
        response =>{
            response.forEach(el=>{
                this.county.push({value: el.teryt, label: el.nazwa});
            });
            this.countySelect.updateOptionsList();
            this.event.klepsydraStop();
        },
        error =>{
            this.event.klepsydraStop();
            this.event.wyswietlInfo('error', 'Błąd pobierania powiatów');
        }
      )
  }    

    searchOfert(){
        this.event.searchOfers(this.search);
    }
    
    showMoreSearch(){
        this.showMore = true;
        document.getElementById('readMore').style.opacity = '1';
        document.getElementById('readMore').style.height = '250px';
    }
    
    hideMoreSearch(){
        this.showMore = false;
        document.getElementById('readMore').style.opacity = '0';
        document.getElementById('readMore').style.height = '0px';
    }
    
    selectedSubject(event){
        this.subject.length = 0;
        this.CmsService.get(`mbopn/getPrzedmioty.php?id=${event.value}`).subscribe(
            response =>{
                response.forEach(el=>{
                    this.subject.push({value: el.id, label: el.nazwa});
                });
                this.subjectSelect.updateOptionsList();
            },
            error =>{
                this.event.wyswietlInfo('error', 'Błąd pobierania przedmiotów')
            }
        )
        
    }
}
