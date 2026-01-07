import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';

import RepoItem from '../components/RepoItem';
import './Tab1.css';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Repositorios</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Repositorios</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          <RepoItem
            name="android-repo"
            imageUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Android_robot.svg/1745px-Android_robot.svg.png"
          />

          <RepoItem
            name="ios-repo"
            imageUrl="https://pluspng.com/img-png/logo-apple-ios-png-apple-ios-image-4085-apple-ios-logo-png-256.png"
          />

          <RepoItem
            name="ionic-repo"
            imageUrl="data:image/png;base64,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"
          />
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
