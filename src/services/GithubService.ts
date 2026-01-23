import githubApi from "./githubApi";

export interface GitHubUser {
  login: string;
  name?: string | null;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  description?: string | null;
  html_url: string;
  owner: { login: string };
  updated_at: string;
}

export interface CreateRepoPayload {
  name: string;
  description?: string;
  private?: boolean;
}

export interface UpdateRepoPayload {
  name?: string;        // OJO: renombrar repo cambia el "repo" en la URL futura
  description?: string;
  homepage?: string;
  private?: boolean;
  has_issues?: boolean;
  has_projects?: boolean;
  has_wiki?: boolean;
}

export const GitHubService = {
  // GET /user
  getMe: async () => {
    const { data } = await githubApi.get<GitHubUser>("/user");
    return data;
  },

  // GET /user/repos
  getMyRepos: async () => {
    const { data } = await githubApi.get<GitHubRepo[]>("/user/repos");
    return data;
  },

  // POST /user/repos
  createRepo: async (payload: CreateRepoPayload) => {
    const { data } = await githubApi.post<GitHubRepo>("/user/repos", payload);
    return data;
  },

  // “PUT” (realmente GitHub usa PATCH) /repos/{owner}/{repo}
  // Para cumplir el enunciado, puedes llamarlo putUpdateRepo() aunque envía PATCH.
  putUpdateRepo: async (owner: string, repo: string, payload: UpdateRepoPayload) => {
    const { data } = await githubApi.patch<GitHubRepo>(`/repos/${owner}/${repo}`, payload);
    return data;
  },

  // DELETE /repos/{owner}/{repo}
  deleteRepo: async (owner: string, repo: string) => {
    await githubApi.delete(`/repos/${owner}/${repo}`);
    return true;
  },
};
