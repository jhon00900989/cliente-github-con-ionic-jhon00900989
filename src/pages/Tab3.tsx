import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import './Tab3.css';

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil de Usuario</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Perfil de Usuario</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonCard>
          <img
            alt="Jonathan Quishpe"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxu6rotIySGCM5SkVZZbwH2k9PeYovy3hn4Q&s"
          />

          <IonCardHeader>
            <IonCardTitle>Jonathan Quishpe</IonCardTitle>
            <IonCardSubtitle>jonathanQD250</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>
            Soy un estudiante de la carrera de Ingeniería en Sistemas de la Universidad UISEK. Me gusta aprender sobre desarrollo web y móvil, así como sobre nuevas tecnologías en el campo de la informática.
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
