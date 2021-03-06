import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppStateWithIngreso } from '../ingreso-egreso.reducer';

import { IngresoEgreso } from '../../models/ingreso-egreso.model';

import { ChartDataset } from 'chart.js';


@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.css']
})
export class EstadisticaComponent implements OnInit {

  ingresos: number = 0;
  egresos: number = 0;

  totalIngresos: number = 0;
  totalEgresos: number = 0;

  public doughnutChartLabels: string[] = [ 'Ingresos', 'Egresos' ];
  public doughnutChartData: ChartDataset[] = [];

  constructor(private store: Store<AppStateWithIngreso>) {
    
  }

  ngOnInit(): void {
    this.store.select('ingresosEgresos')
      .subscribe(({ items }) => this.generarEstadistica(items));
  }

  generarEstadistica(items: IngresoEgreso[]) {
    
    this.initValues();

    for(const item of items) {

      if(item.tipo === 'ingreso') {
        this.totalIngresos += item.monto;
        this.ingresos ++;
      } else {
        this.totalEgresos += item.monto;
        this.egresos ++;
      }
    }

    this.doughnutChartData = [{ data: [this.totalIngresos, this.totalEgresos] }];

  }

  initValues() {
    this.ingresos = 0;
    this.egresos = 0;  
    this.totalIngresos = 0;
    this.totalEgresos = 0;
  }

}
