import { Injectable, Output, EventEmitter } from '@angular/core';
import { ToastService } from './typescripts/pro'

@Injectable()
export class EventService {
    
  @Output() onSearchOfers: EventEmitter<any> = new EventEmitter<any>();    

  constructor(private toastrService: ToastService) {}


  wyswietlInfo(typ, tresc){
    switch(typ){
        case 'info': this.toastrService.info(tresc); break;
        case 'success': this.toastrService.success(tresc); break;
        case 'error': this.toastrService.error(tresc); break;
    }
  }
    
  klepsydraStart(){
    document.getElementById('klepsydra').style.display = 'block';
  }

  klepsydraStop(){
      document.getElementById('klepsydra').style.display = 'none';
  }
    
  searchOfers(oferta){
      this.onSearchOfers.emit(oferta);
  }    
}