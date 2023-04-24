import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {PhotoLookupFacade} from "../../data/photo-lookup-facade.service";
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {PhotoSearchParams} from "../../entities/photoSearchParams";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search.component.html',
})
export class SearchComponent {

  readonly #photoLookup = inject(PhotoLookupFacade).query;
  readonly #INIT_ID = '';
  readonly #INIT_ALBUMID = '';

  protected readonly searchForm: FormGroup = new FormGroup({
    id: new FormControl(this.#INIT_ID, {nonNullable: true, validators: [Validators.pattern('^[1-9][0-9]?$|^100$')]}),
  albumId: new FormControl(this.#INIT_ALBUMID, {
    nonNullable: true,
    validators: [Validators.pattern('^[1-9]?$|^10$')]
})
  });

    submit(){
      const {valid, value} = this.searchForm;
      if (valid){
        this.#photoLookup.runQuery(value as PhotoSearchParams);
      }
    }

    cancelForm(){
      this.#photoLookup.reset();
    }
}
