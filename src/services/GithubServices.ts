import axios from 'axios';
import { RepositoryItem } from '../interfaces/RepositoryItem';
import { UserInfo } from '../interfaces/Userinfo';

/**
 * Obtener repositorios del usuario autenticado
 * @returns 
 */

const GITHUB_API_URL = import.meta.env.VITE_GITHUB_API_URL;
const GITHUB_API_TOKEN = `Bearer ${import.meta.env.VITE_GITHUB_API_TOKEN}`

export const fetchRepositories = async (): Promise<RepositoryItem[]> => {
  try {
    const response = await axios.get(`${GITHUB_API_URL}/user/repos`, {
      headers: {
        Authorization: `Bearer ${GITHUB_API_TOKEN}`,
        Accept: 'application/vnd.github+json',
      },
      params: {
        per_page: 100,
        sort: 'created',
        direction: 'desc',
        affiliation: 'owner',
      },
    });

    const reposData: RepositoryItem[] = response.data.map((repo: any) => ({
      name: repo.name,
      owner: repo.owner? repo.owner.login : null,
      description: repo.description ? repo.description: null,
      imageUrl: repo.owner? repo.owner.avatar_url : null,
      language: repo.language ? repo.language: null
    }));

    return reposData;
  } catch (error) {
    console.error('Error fetching repositories:', error);
    return [];
  }
};


export const createRepository = async (repo: RepositoryItem): Promise<void> => {
  try {
    const response = await axios.post(`${GITHUB_API_URL}/user/repos`,repo, {
        headers: {
          Authorization: GITHUB_API_TOKEN,
        },
      });

    console.log("Repository creado:", response.data);
  } catch (error) {
    console.error("Error creando repository:", error);
  }
};

/**
 * Obtener información del usuario autenticado
 * @returns 
 */


export const getUserInfo = async (): Promise<UserInfo | null> => {
  try {
    const response = await axios.get(`${GITHUB_API_URL}/user`, {
      headers: {
        Authorization: GITHUB_API_TOKEN,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    return null;
  }
};
