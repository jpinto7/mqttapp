import { Component } from '@angular/core';
import { LoadingController, NavController, ToastController } from 'ionic-angular';
import { MQTTService } from "../../services/mqtt.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public mqttService: MQTTService,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController) {}

  onSubmit(f: NgForm) {
    const {
      hostname,
      port
    } = f.value;
    const loading = this.loadingCtrl.create({
      content: 'Conectando al servidor MQTT...'
    });
    loading.present();
    this.mqttService.connectMQTT(hostname, port, () => {
      loading.dismiss();
      const toast = this.toastCtrl.create({
        message: 'Conectado al servidor MQTT',
        position: 'top',
        duration: 3000,
      });
      toast.present();
    });
  }

  onDisconnect() {
    if (this.mqttService.client && this.mqttService.client.connected) {
      this.mqttService.client.end(false, () => {
        const toast = this.toastCtrl.create({
          message: 'Desconexión del servidor MQTT',
          position: 'top',
          duration: 3000,
        });
        toast.present();
      });
    }
  }
}
