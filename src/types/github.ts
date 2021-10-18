export interface GithubRepo {
  description: string;
  forks: number;
  full_name: string;
  open_issues_count: number;
}

export interface StarGazers {
  login: string;
  html_url: string;
  avatar_url: string;
}
