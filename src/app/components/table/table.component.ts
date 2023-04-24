import {Component, inject, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {PhotoLookupFacade} from "../../data/photo-lookup-facade.service";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {Photo} from "../../entities/photo";
import {PageEvent} from "@angular/material/paginator";
import {map} from "rxjs";

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './table.component.html',
})
export class TableComponent {

    readonly lookupQuery = inject(PhotoLookupFacade).query;
    protected readonly displayedColumns = ["id","albumId","title","url"];
    readonly dataSource = new MatTableDataSource<Photo>();

  protected readonly photos$ = this.lookupQuery.data$.pipe(
      map((photos) => {
        this.dataSource.data = photos;
        return this.dataSource;
      })
  );

    onChange($event: PageEvent){
        const {pageSize, pageIndex} = $event;
        const lowerLimit = pageIndex * pageSize;
        const upperLimit = lowerLimit + pageSize;

        this.lookupQuery.data$.pipe(
          map((photos) => {
            this.dataSource.data = photos.filter(photo => {
              const photoId = parseInt(photo.id);
              return photoId < upperLimit && photoId > lowerLimit;
            })
          })
        )
    }
}
