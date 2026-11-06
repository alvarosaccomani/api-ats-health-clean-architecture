export interface RolEntity {
    rol_uuid: string;
    rol_name: string;
    rol_createdat: Date;
    rol_updatedat: Date;
}

export type RolUpdateData = Pick<RolEntity, 'rol_name'>;
