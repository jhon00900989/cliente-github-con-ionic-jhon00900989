import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useState } from "react";
import axios from "axios";
import { ResourceService } from "../services/resourceService";

export default function EditDelete() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");

  const update = async () => {
    setMsg("");
    if (!id) return setMsg("Debe ingresar el ID.");

    try {
      const data = await ResourceService.update(Number(id), { name });
      setMsg(`Actualizado OK (ID ${data.id}).`);
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        setMsg(err.response?.data?.message || err.message || "Error en PUT.");
      } else {
        setMsg("Error inesperado en PUT.");
      }
    }
  };

  const remove = async () => {
    setMsg("");
    if (!id) return setMsg("Debe ingresar el ID.");

    try {
      await ResourceService.remove(Number(id));
      setMsg("Eliminado OK.");
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        setMsg(err.response?.data?.message || err.message || "Error en DELETE.");
      } else {
        setMsg("Error inesperado en DELETE.");
      }
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>PUT y DELETE</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonItem>
          <IonInput
            label="ID"
            labelPlacement="stacked"
            type="number"
            value={id}
            onIonInput={(e) => setId(e.detail.value ?? "")}
          />
        </IonItem>

        <IonItem>
          <IonInput
            label="Nombre"
            labelPlacement="stacked"
            value={name}
            onIonInput={(e) => setName(e.detail.value ?? "")}
          />
        </IonItem>

        <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
          <IonButton onClick={update}>Actualizar (PUT)</IonButton>
          <IonButton color="danger" onClick={remove}>
            Eliminar (DELETE)
          </IonButton>
        </div>

        {msg && (
          <IonText>
            <p style={{ marginTop: 12 }}>{msg}</p>
          </IonText>
        )}
      </IonContent>
    </IonPage>
  );
}
