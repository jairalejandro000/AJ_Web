import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Serie } from 'src/app/models/serie';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { confirmMessage, errorMessage } from 'src/app/functions/alerts';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent implements OnInit {
  series: Serie[];
  @ViewChild('seriesPaginator', {static : true}) seriesPaginator: MatPaginator;
  @ViewChild(MatSort, {static : true}) seriesSort: MatSort;
  seriesColumns: string[] = ['name', 'description', 
  'seasons', 'score'];
  dataSource: any;
  serieForm: FormGroup;
  serie: Serie;

  constructor(private userService: UserService,
    private authService: AuthService,
    private fb: FormBuilder) { 
      this.buildForm();
    }

  ngOnInit(): void {
    this.authService.verifyToken();
    this.getSeriesData();
  }
  getSeriesData(): void{
    this.userService.getSeries().subscribe((data) => {
      this.series = data.Series;
      console.log(this.series);
      this.setData(this.series);
    });
  }
  setData(data): void {
    this.dataSource = new MatTableDataSource();
    this.dataSource.data = data;
    this.dataSource.paginator = this.seriesPaginator;
    this.dataSource.sort = this.seriesSort;
  }
  setForm(serie):void {
    this.serie = serie;
    this.serieForm.patchValue(this.serie);
  }
  a(): void {
    console.log("sdfsdf");
    this.serie = null;
    /*this.serie.name = this.serieForm.get('name').value;
    this.serie.description = this.serieForm.get('description').value;
    this.serie.seasons = this.serieForm.get('seasons').value;
    this.serie.score = this.serieForm.get('score').value;
    console.log(this.serie);
    //this.serie.token = this.serieForm.get('token').value;*/
  }
  b(): void{
    console.log("asdasd");
    /*this.serie.name = this.serieForm.get('name').value;
    this.serie.description = this.serieForm.get('description').value;
    this.serie.seasons = this.serieForm.get('seasons').value;
    this.serie.score = this.serieForm.get('score').value;
    console.log(this.serie);
    //this.serie.token = this.serieForm.get('token').value;*/
  }
  clearForm(): void {
    this.serie = null;
    this.serieForm.reset();
  }
  buildForm(): void {
    this.serieForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.minLength(1), 
        Validators.maxLength(10)
      ]],
      description: ['', [
        Validators.required,
        Validators.minLength(1), 
        Validators.maxLength(20)
      ]],
      seasons: ['', [
        Validators.required,
        Validators.minLength(1), 
        Validators.maxLength(2)
      ]],
      score: ['', [
        Validators.required,
        Validators.minLength(1), 
        Validators.maxLength(2)
      ]],
      token: ['']
    });
  }
}

