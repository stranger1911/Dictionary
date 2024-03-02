import { Component } from '@angular/core';
import { DictionaryService } from './dictionary.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'dictionaryProject';
  userData:string='';
  word: string = '';
  meaning: string = '';
  audio: string = '';
  sourceUlr: string = '';
  fetchData: boolean = false;
  spinner: boolean = false;
  noMatch: boolean = false;
  partOfSpeech: string = '';
  meaning1: string = '';
  partOfSpeech1: string = '';
  meaning2: string = '';
  partOfSpeech2: string = '';


  constructor(private dictionaryService: DictionaryService) { }

  searchData(data: any) {
    this.spinner = true;
    setTimeout(() => {
      this.dictionaryService.getWordMeaning(data.value).subscribe((result: any) => {
        // console.log(result)
        if (result) {
          this.partOfSpeech1 = '';
          this.meaning1 = '';
          this.partOfSpeech2 = '';
          this.meaning2 = '';
          this.fetchData = true;
          this.spinner = false;
          // console.log(result)
          this.word = result[0].word
          this.userData = data.value;
          this.partOfSpeech = result[0].meanings[0].partOfSpeech
          this.meaning = result[0].meanings[0].definitions[0].definition
          if(result[0].meanings[1] && result[0].word==data.value){
            this.partOfSpeech1 = result[0].meanings[1].partOfSpeech
          this.meaning1 = result[0].meanings[1].definitions[0].definition
          }
          if (result[0].meanings[2] && result[0].word==data.value) {
            this.partOfSpeech2 = result[0].meanings[2].partOfSpeech
            this.meaning2 = result[0].meanings[2].definitions[0].definition
          }
          this.audio = result[0].phonetics[0].audio;
          this.sourceUlr = result[0].sourceUrls
        }
      },
        error => {
          this.spinner = false;
          this.noMatch = true;
          this.fetchData = false;
          this.word = data.value;
        })
    }, 500);
  }
}