export interface UserInfo {
  id: number;
  name: string;
  email: string;
  roles: string[];
  imageUrl: string | null;
  organizationId: number;
  isEmployee: boolean;
  shopId: number;
}

export interface LoginResponse {
  token: string;
  refresh: string;
  userInfo: UserInfo;
}
