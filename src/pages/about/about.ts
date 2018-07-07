import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { NgForm } from "@angular/forms";
import { MQTTService } from "../../services/mqtt.service";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(
    public navCtrl: NavController,
    public mqttService: MQTTService,
    private toastCtrl: ToastController) {
    if (this.mqttService.client && this.mqttService.client.connected) {
      this.mqttService.client.subscribe('servomotor');
      this.mqttService.client.on('message', (topic, message) => {
        if (topic == 'servomotor') {
          const toast = this.toastCtrl.create({
            message: `Ángulo del servomotor: ${message}°`,
            position: 'top',
            duration: 3000
          });
          toast.present();
        }
      });
    }
  }

  onSubmit(f: NgForm) {
    const { angle } = f.value;
    if (this.mqttService.client.connected) {
      this.mqttService.client.publish('servomotor', angle);
    }
  }

}
