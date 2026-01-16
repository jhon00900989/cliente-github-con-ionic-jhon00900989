import { IonContent, IonHeader, IonPage,IonTitle, IonToolbar, IonTextarea, IonButton,} from '@ionic/react';
import { IonInput } from '@ionic/react'; 
import { useHistory } from 'react-router';
import React from 'react';
import './Tab2.css';
import { RepositoryItem } from '../interfaces/RepositoryItem';
import { createRepository } from '../services/GithubServices';

const Tab2: React.FC = () => {
  const history = useHistory();
  
  const repoFormData : RepositoryItem= {
    name: '',
    description: '',
    imageUrl: null,
    owner: null,
    language: null,
     
  };

  const setRepoName = (value: string) => {
    repoFormData.name = value;
  }

  const setDescription = (value: string) => {
    repoFormData.description = value;
  }

  const saveRepo = () => {
    console.log('Repositorio guardado:', repoFormData);
    if (repoFormData.name.trim() === '') {
      alert('El nombre del repositorio es obligatorio.');
      return;
    }

    createRepository(repoFormData).then(() => {
      history.push('/tab1');
    }).catch((error) => {
      console.error('Error al crear el repositorio:', error);
      alert('Hubo un error al crear el repositorio.');
    });
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
            label="Nombre del repositorio"
            labelPlacement="floating"
            fill="outline"
            placeholder="repositorio-de-ejemplo"
            className="form-field"
            value={repoFormData.name}
            onIonChange={e => setRepoName(e.detail.value!)}
          ></IonInput>

          <IonTextarea
            className="form-field"
            label="Descripción del repositorio"
            labelPlacement="floating"
            fill="outline"
            placeholder="Este es un repositorio de ejemplo."
            value={repoFormData.description}
            onIonChange={e => setDescription(e.detail.value!)}
            rows={6}
            autoGrow
           ></IonTextarea>
          <IonButton expand="block" className="form-field" onClick={saveRepo}>Guardar</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
