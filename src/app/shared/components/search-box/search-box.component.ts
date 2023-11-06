import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subject, debounceTime, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  private subjectDebounce: Subject<string> = new Subject<string>(); 
  private debaunceSuscription?: Subscription;

  @Input()
  public placeholder: string = '';

  @Input()
  public initialValue: string = '';

  @Output()
  public onValue: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public onDebaunce: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    this.debaunceSuscription = this.subjectDebounce
      .pipe(
        debounceTime(300)
      )
      .subscribe(value => {
        this.onDebaunce.emit(value);
      });
  }

  ngOnDestroy(): void {
    this.debaunceSuscription?.unsubscribe();
    console.log('Destruido');
  }

  emitValue(value: string) : void {
    this.onValue.emit(value);
  }

  debounce(value: string) : void {
    this.subjectDebounce.next(value);
  }

}
