import React, { useState } from 'react';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToolbar,
  IonInput,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { RepositoryItem } from '../interfaces/RepositoryItem';
import { createRepository } from '../services/GithubService';
import './Tab2.css';

const Tab2: React.FC = () => {
  const history = useHistory();

  const [repoFormData, setRepoFormData] = useState<RepositoryItem>({
    name: '',
    description: '',
    imageUrl: null,
    owner: null,
    language: null,
  });

  const saveRepo = async () => {
    if (!repoFormData.name?.trim()) {
      alert('El nombre del repositorio es obligatorio');
      return;
    }

    try {
      await createRepository(repoFormData);
      history.push('/tab1');
    } catch (error) {
      console.error('Error al crear el repositorio:', error);
      alert('Error al crear el repositorio');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Formulario de repositorio</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Formulario de repositorio</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="form-container">
          <IonInput
            className="form-field"
            label="Nombre del repositorio"
            labelPlacement="floating"
            fill="outline"
            placeholder="android-project"
            value={repoFormData.name}
            onIonChange={(e) =>
              setRepoFormData((prev) => ({
                ...prev,
                name: e.detail.value ?? '',
              }))
            }
          />

          <IonTextarea
            className="form-field"
            label="Descripción del repositorio"
            labelPlacement="floating"
            fill="outline"
            placeholder="Descripción del repositorio"
            value={repoFormData.description ?? ''}
            onIonChange={(e) =>
              setRepoFormData((prev) => ({
                ...prev,
                description: e.detail.value ?? '',
              }))
            }
            rows={6}
            autoGrow
          />

          <IonButton expand="block" className="form-field" onClick={saveRepo}>
            Guardar
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
