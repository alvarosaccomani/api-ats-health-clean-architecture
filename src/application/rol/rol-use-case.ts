import { RolRepository } from "../../domain/rol/rol.repository";
import { RolValue } from "../../domain/rol/rol.value";
import { TimezoneConverter } from "../../infrastructure/utils/TimezoneConverter";

export class RolUseCase {
    constructor(
        private readonly rolRepository: RolRepository
    ) {
        this.getRoles = this.getRoles.bind(this);
        this.getDetailRol = this.getDetailRol.bind(this);
        this.createRol = this.createRol.bind(this);
        this.updateRol = this.updateRol.bind(this);
        this.deleteRol = this.deleteRol.bind(this);
        this.findRolByName = this.findRolByName.bind(this);
    }

    public async getRoles(options?: { transaction?: any }) {
        try {
            const roles = await this.rolRepository.getRoles(options);
            if (!roles) {
                throw new Error('No hay roles.');
            }
            return roles.map(rol => ({
                rol_uuid: rol.rol_uuid,
                rol_name: rol.rol_name,
                rol_createdat: TimezoneConverter.toIsoStringInTimezone(rol.rol_createdat, 'America/Buenos_Aires'),
                rol_updatedat: TimezoneConverter.toIsoStringInTimezone(rol.rol_updatedat, 'America/Buenos_Aires'),
            }));
        } catch (error: any) {
            console.error('Error en getRoles (use case):', error.message);
            throw error;
        }
    }

    public async getDetailRol(rol_uuid: string, options?: { transaction?: any }) {
        try {
            const rol = await this.rolRepository.findRolById(rol_uuid, options);
            if (!rol) {
                throw new Error(`No hay rol con el Id: ${rol_uuid}`);
            }
            return {
                rol_uuid: rol.rol_uuid,
                rol_name: rol.rol_name,
                rol_createdat: TimezoneConverter.toIsoStringInTimezone(rol.rol_createdat, 'America/Buenos_Aires'),
                rol_updatedat: TimezoneConverter.toIsoStringInTimezone(rol.rol_updatedat, 'America/Buenos_Aires'),
            };
        } catch (error: any) {
            console.error('Error en getDetailRol (use case):', error.message);
            throw error;
        }
    }
    
    public async createRol({ rol_uuid, rol_name }: { rol_uuid?: string; rol_name: string }, options?: { transaction?: any }) {
        try {
            const rolValue = new RolValue({ rol_uuid, rol_name });
            const rolCreated = await this.rolRepository.createRol(rolValue, options);
            if (!rolCreated) {
                throw new Error(`No se pudo insertar el rol.`);
            }
            return {
                rol_uuid: rolCreated.rol_uuid,
                rol_name: rolCreated.rol_name,
                rol_createdat: TimezoneConverter.toIsoStringInTimezone(rolCreated.rol_createdat, 'America/Buenos_Aires'),
                rol_updatedat: TimezoneConverter.toIsoStringInTimezone(rolCreated.rol_updatedat, 'America/Buenos_Aires'),
            };
        } catch (error: any) {
            console.error('Error en createRol (use case):', error.message);
            throw error;
        }
    }

    public async updateRol(rol_uuid: string, { rol_name }: { rol_name: string }, options?: { transaction?: any }) {
        try {
            const rolUpdated = await this.rolRepository.updateRol(rol_uuid, { rol_name }, options);
            if (!rolUpdated) {
                throw new Error(`No se pudo actualizar el rol.`);
            }
            return {
                rol_uuid: rolUpdated.rol_uuid,
                rol_name: rolUpdated.rol_name,
                rol_createdat: TimezoneConverter.toIsoStringInTimezone(rolUpdated.rol_createdat, 'America/Buenos_Aires'),
                rol_updatedat: TimezoneConverter.toIsoStringInTimezone(rolUpdated.rol_updatedat, 'America/Buenos_Aires'),
            };
        } catch (error: any) {
            console.error('Error en updateRol (use case):', error.message);
            throw error;
        }
    }

    public async deleteRol(rol_uuid: string, options?: { transaction?: any }) {
        try {
            const rolDeleted = await this.rolRepository.deleteRol(rol_uuid, options);
            if (!rolDeleted) {
                throw new Error(`No se pudo eliminar el rol.`);
            }
            return {
                rol_uuid: rolDeleted.rol_uuid,
                rol_name: rolDeleted.rol_name,
                rol_createdat: TimezoneConverter.toIsoStringInTimezone(rolDeleted.rol_createdat, 'America/Buenos_Aires'),
                rol_updatedat: TimezoneConverter.toIsoStringInTimezone(rolDeleted.rol_updatedat, 'America/Buenos_Aires'),
            };
        } catch (error: any) {
            console.error('Error en deleteRol (use case):', error.message);
            throw error;
        }
    }

    public async findRolByName(rol_name: string, excludeUuid?: string | null, options?: { transaction?: any }) {
        try {
            const rol = await this.rolRepository.findRolByName(rol_name, excludeUuid, options);
            return rol;
        } catch (error: any) {
            console.error('Error en findRolByName (use case):', error.message);
            throw error;
        }
    }
}
