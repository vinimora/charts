import { Component } from '@angular/core';
import  {WeatherService} from './weather.service';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
chart= [];
  constructor(private _weather: WeatherService){}

  ngOnInit() {
    this._weather.daillyForecast()
    .subscribe(res => {

    let temp_max = res['list'].map(res => res.main.temp_max)
    let temp_min = res['list'].map(res => res.main.temp_min)
    let alldates = res['list'].map(res => res.dt)

    let weatherDates = []
    alldates.forEach((res) => {
      let jsdate = new Date(res * 1000)
      weatherDates.push(jsdate.toLocaleTimeString('pt-br', { year:'numeric',month:'short', day:'numeric'}))

    })

    this.chart = new Chart('canvas',{
      type:'line',
      data: {
        labels: weatherDates,
        datasets:[
          {
            label:'temperatura maxima °F',
            data: temp_max,
            backgroundColor:'red',
            borderColor:'red',
            fill:false
          },
          {
            label:'temperatura minima °F',
            data: temp_min,
            backgroundColor:'#ffcc00',
            borderColor: '#ffcc00',
            fill:false
          },
        ]
      },
      options:{
        legend:{
          display: false
        },
        scales:{
          xAxes:[{
            display:true
          }],
          yAxes:[{
            display: true
          }]
        }

      }
    })
  });
  }
}
