export type PermissionModel = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

export interface GroupModel {
  id: string;
  name: string;
  permissions: PermissionModel[];
}
