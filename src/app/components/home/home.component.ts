import { Component } from '@angular/core';
import {SearchComponent} from "../search/search.component";
import {TableComponent} from "../table/table.component";

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [
    SearchComponent,
    TableComponent],
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

}
