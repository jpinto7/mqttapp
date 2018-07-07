import { connect, Client } from 'mqtt';

export class MQTTService {
  client: Client;

  connectMQTT(hostname, port, cb) {
    this.client = connect(`mqtt:${hostname}`, {
      port
    });
    this.client.on('connect', () => {
      cb();
    });
  }
}
