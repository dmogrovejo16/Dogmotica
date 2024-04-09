import { Component } from '@angular/core';
import { Database, object, ref } from '@angular/fire/database';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  sala:any;
  cocina:any;
  habitacionBart:any;
  habitacionLisa:any;
  garaje:any;
  entrada:any;
  public buffer = 0.06;
  public progress = 0;
  constructor(private database:Database,private toastController: ToastController) {
    const route = ref(this.database, /*direccion a donde ir dentro de la base de datos */);
    object(route).subscribe(attributes => {
      const valores_db = attributes.snapshot.val();
      console.log(valores_db);
      this.sala=valores_db['sala'];
      this.garaje=valores_db['garaje'];
      this.habitacionBart=valores_db['habitacionBart'];
      this.habitacionLisa=valores_db['habitacionLisa'];
      this.entrada=valores_db['entrada'];
      this.cocina=valores_db['cocina'];
      this.cargarProgress();
      this.presentToastGood("Nuevos cambios han sido detectados");
    });
    
    
  }

  cargarProgress() {
    // Reiniciar el progreso
    this.progress = 0;

    // Incrementar el progreso gradualmente hasta 100%
    const interval = setInterval(() => {
      if (this.progress < 1) {
        this.progress += 0.1;
      } else {
        clearInterval(interval); // Detener el intervalo cuando alcanza 100%
      }
    }, 50);
  }

  async presentToastGood(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000, 
      position: 'bottom', 
      color: 'success', 
    });
    toast.present();
  }

}

  


