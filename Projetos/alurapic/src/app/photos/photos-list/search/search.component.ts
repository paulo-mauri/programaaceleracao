import { debounceTime, filter } from 'rxjs/operators';
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Subject } from "rxjs";
import { OnDestroy } from '@angular/core';

@Component({
  selector:'ap-search',
  templateUrl:'./search.component.html'
})
export class SearchComponent implements OnInit, OnDestroy {

  @Output() onTyping = new EventEmitter<string>();
  @Input() value: string = '';
  debounce: Subject<string> = new Subject<string>();

  ngOnDestroy(): void {
    this.debounce.unsubscribe();
  }

  ngOnInit(): void {
    this.debounce
      .pipe(debounceTime(300))
      .subscribe(filter => this.onTyping.emit(filter));
  }
  onKeyUp(target: any) {
    const elemento = target as HTMLInputElement;
    return elemento.value;
  }
}
