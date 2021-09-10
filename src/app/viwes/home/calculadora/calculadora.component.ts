import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css']
})
export class CalculadoraComponent implements OnInit {
  readonly ROOT_URL = 'https://sistema.uniso.br/rest/api/calculador';
  resultado = '0';
  ultimo='';
  
  posts: Observable<Post[]>;
 
  constructor(private https: HttpClient){
    this.posts = this.getPosts();
  }

  getPosts(){
    return this.https.get<Post[]>(this.ROOT_URL + '/get')
  }
  


  public Calcular(v:string){
    

    if (v !=='C' && v !=='=' && v !== 'back'){
      this.ultimo = this.ultimo + v;
      this.resultado=this.ultimo;
    }

    if (v=='C'){
      this.resultado='0';
      this.ultimo='';
    }
    
    if (v=='=' && this.ultimo !== '' ){
      this.resultado=eval(this.ultimo);
      this.ultimo=this.resultado;
    }
    if (v== 'back'){
      this.ultimo=this.ultimo.substring(0, this.ultimo.length-1);
      this.resultado=this.ultimo;
    }

  }
  ngOnInit(): void {
    this.getPosts();
  }

}

