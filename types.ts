export interface InitType {
  app_id: string;
  user_id?: string;
  email?: string;
  name?: string;
  [key: string]: any;
}

export interface GistSettings {
  app_id: string;
}