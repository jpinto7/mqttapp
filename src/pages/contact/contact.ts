import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Chart } from 'chart.js';
import { MQTTService } from "../../services/mqtt.service";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  @ViewChild('lineCanvas') lineCanvas;
  lineChart: any;
  lineChartData = [];

  constructor(
    public navCtrl: NavController,
    public mqttService: MQTTService) {
    if (this.mqttService.client && this.mqttService.client.connected) {
      this.mqttService.client.subscribe('humidity');
      this.mqttService.client.on('message', (topic, message) => {
        console.log(message);
        if (topic == 'humidity') {
          this.updateChart(message);
        }
      });
    }
  }

  ionViewDidLoad() {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: "Humedad (%)",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192, 1)",
            pointBackgroundColor: "#fffff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.lineChartData,
            spanGaps: false,
          }
        ]
      },
      options: {
        responsive: true,
        scaleShowValues: true,
        scales: {
          yAxes: [{
            ticks: {
              suggestedMin: 0,
              suggestedMax: 100,
              stepSize: 10,
              beginAtZero: true
            }
          }],
          xAxes: [{
            type: 'time',
            time: {
              unit: 'second'
            },
            ticks: {
              autoSkip: false
            }
          }]
        }
      }
    });
  }

  updateChart(data) {
    this.lineChart.data.labels.push(new Date());
    this.lineChartData.push(data);
    this.lineChart.update();
  }
}
