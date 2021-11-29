export interface Project {
  projectID: string;
  projectSecret: string;
  name: string;
  redirectURLs: string[];
  scope: string;
  createdAt: string;
  createdBy: string;
}
