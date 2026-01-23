import {
  IonAlert,
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonLoading,
  IonModal,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
  IonToggle,
  IonToast,
  IonRefresher,
  IonRefresherContent,
} from "@ionic/react";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { GitHubRepo, GitHubService } from "../services/githubService";

const Repos: React.FC = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [error, setError] = useState("");

  // Crear repo modal
  const [createOpen, setCreateOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newPrivate, setNewPrivate] = useState(false);

  // Edit modal
  const [editOpen, setEditOpen] = useState(false);
  const [editRepo, setEditRepo] = useState<GitHubRepo | null>(null);
  const [editName, setEditName] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editPrivate, setEditPrivate] = useState(false);

  // Delete confirm
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<GitHubRepo | null>(null);

  const hasToken = useMemo(() => !!localStorage.getItem("gh_token"), []);

  const loadRepos = async () => {
    setError("");
    setLoading(true);
    try {
      const data = await GitHubService.getMyRepos();
      setRepos(data);
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || err.message || "Error al cargar repos.");
      } else {
        setError("Error inesperado al cargar repos.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!hasToken) {
      window.location.href = "/login";
      return;
    }
    loadRepos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreate = async () => {
    setLoading(true);
    setError("");
    try {
      await GitHubService.createRepo({
        name: newName.trim(),
        description: newDesc.trim() || undefined,
        private: newPrivate,
      });
      setToastMsg("Repositorio creado.");
      setCreateOpen(false);
      setNewName("");
      setNewDesc("");
      setNewPrivate(false);
      await loadRepos();
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || err.message || "Error al crear repo.");
      } else {
        setError("Error inesperado al crear repo.");
      }
    } finally {
      setLoading(false);
    }
  };

  const openEdit = (repo: GitHubRepo) => {
    setEditRepo(repo);
    setEditName(repo.name);
    setEditDesc(repo.description ?? "");
    setEditPrivate(repo.private);
    setEditOpen(true);
  };

  const handleEdit = async () => {
    if (!editRepo) return;
    setLoading(true);
    setError("");
    try {
      // “PUT” requerido por enunciado, pero GitHub actualiza con PATCH (implementado en servicio).
      await GitHubService.putUpdateRepo(editRepo.owner.login, editRepo.name, {
        name: editName.trim(),
        description: editDesc.trim() || null,
        private: editPrivate,
      });
      setToastMsg("Repositorio actualizado.");
      setEditOpen(false);
      setEditRepo(null);
      await loadRepos();
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || err.message || "Error al editar repo.");
      } else {
        setError("Error inesperado al editar repo.");
      }
    } finally {
      setLoading(false);
    }
  };

  const openDelete = (repo: GitHubRepo) => {
    setDeleteTarget(repo);
    setDeleteConfirmOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setLoading(true);
    setError("");
    try {
      await GitHubService.deleteRepo(deleteTarget.owner.login, deleteTarget.name);
      setToastMsg("Repositorio eliminado.");
      setDeleteConfirmOpen(false);
      setDeleteTarget(null);
      await loadRepos();
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || err.message || "Error al eliminar repo.");
      } else {
        setError("Error inesperado al eliminar repo.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mis Repositorios</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonLoading isOpen={loading} message="Procesando..." />

        <IonRefresher
          slot="fixed"
          onIonRefresh={async (ev) => {
            await loadRepos();
            ev.detail.complete();
          }}
        >
          <IonRefresherContent />
        </IonRefresher>

        <IonButton expand="block" onClick={() => setCreateOpen(true)}>
          Crear repositorio (POST)
        </IonButton>

        {error && (
          <IonText color="danger">
            <p style={{ marginTop: 10 }}>{error}</p>
          </IonText>
        )}

        <IonList>
          {repos.map((r) => (
            <IonItemSliding key={r.id}>
              <IonItem button detail onClick={() => window.open(r.html_url, "_blank")}>
                <IonLabel>
                  <h2>{r.name} {r.private ? "(private)" : ""}</h2>
                  <p>{r.description || "Sin descripción"}</p>
                  <p style={{ fontSize: 12 }}>Owner: {r.owner.login}</p>
                </IonLabel>
              </IonItem>

              {/* Opciones del sliding (Edit/Delete) */}
              <IonItemOptions side="end">
                <IonItemOption
                  color="primary"
                  onClick={() => openEdit(r)}
                >
                  Editar
                </IonItemOption>
                <IonItemOption
                  color="danger"
                  onClick={() => openDelete(r)}
                >
                  Eliminar
                </IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          ))}
        </IonList>

        {/* Modal Crear */}
        <IonModal isOpen={createOpen} onDidDismiss={() => setCreateOpen(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Crear repositorio</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonItem>
              <IonInput
                label="Nombre"
                labelPlacement="stacked"
                value={newName}
                onIonInput={(e) => setNewName(e.detail.value ?? "")}
              />
            </IonItem>

            <IonItem>
              <IonInput
                label="Descripción"
                labelPlacement="stacked"
                value={newDesc}
                onIonInput={(e) => setNewDesc(e.detail.value ?? "")}
              />
            </IonItem>

            <IonItem>
              <IonLabel>Privado</IonLabel>
              <IonToggle checked={newPrivate} onIonChange={(e) => setNewPrivate(e.detail.checked)} />
            </IonItem>

            <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
              <IonButton
                onClick={handleCreate}
                disabled={!newName.trim()}
              >
                Crear
              </IonButton>
              <IonButton
                fill="outline"
                color="medium"
                onClick={() => setCreateOpen(false)}
              >
                Cancelar
              </IonButton>
            </div>
          </IonContent>
        </IonModal>

        {/* Modal Editar */}
        <IonModal isOpen={editOpen} onDidDismiss={() => setEditOpen(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Editar repositorio</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonText>
              <p style={{ marginTop: 0 }}>
                Repo actual: <strong>{editRepo?.full_name}</strong>
              </p>
            </IonText>

            <IonItem>
              <IonInput
                label="Nombre"
                labelPlacement="stacked"
                value={editName}
                onIonInput={(e) => setEditName(e.detail.value ?? "")}
              />
            </IonItem>

            <IonItem>
              <IonInput
                label="Descripción"
                labelPlacement="stacked"
                value={editDesc}
                onIonInput={(e) => setEditDesc(e.detail.value ?? "")}
              />
            </IonItem>

            <IonItem>
              <IonLabel>Privado</IonLabel>
              <IonToggle checked={editPrivate} onIonChange={(e) => setEditPrivate(e.detail.checked)} />
            </IonItem>

            <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
              <IonButton onClick={handleEdit} disabled={!editName.trim()}>
                Guardar
              </IonButton>
              <IonButton fill="outline" color="medium" onClick={() => setEditOpen(false)}>
                Cancelar
              </IonButton>
            </div>
          </IonContent>
        </IonModal>

        {/* Confirm Delete */}
        <IonAlert
          isOpen={deleteConfirmOpen}
          header="Eliminar repositorio"
          message={`¿Seguro que deseas eliminar ${deleteTarget?.full_name}?`}
          buttons={[
            { text: "Cancelar", role: "cancel", handler: () => setDeleteConfirmOpen(false) },
            { text: "Eliminar", role: "destructive", handler: handleDelete },
          ]}
          onDidDismiss={() => setDeleteConfirmOpen(false)}
        />

        <IonToast
          isOpen={!!toastMsg}
          message={toastMsg}
          duration={1500}
          onDidDismiss={() => setToastMsg("")}
        />
      </IonContent>
    </IonPage>
  );
};

export default Repos;
