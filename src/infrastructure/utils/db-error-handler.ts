interface TableInfo {
    name: string;
    gender: 'm' | 'f'; // m = masculino, f = femenino
}

export class DbErrorHandler {
    private static readonly TABLE_MAP: Record<string, TableInfo> = {
        'adr_addresses': { name: 'direcciones', gender: 'f' },
        'cmp_companies': { name: 'empresas', gender: 'f' },
        'cmpitm_companyitems': { name: 'rubros de empresa', gender: 'm' },
        'cus_customers': { name: 'clientes', gender: 'm' },
        'dmitm_detailsmodelsitems': { name: 'detalle de rubros de modelos', gender: 'm' },
        'dtp_datatypes': { name: 'tipos de datos', gender: 'm' },
        'gdmitm_groupdetailsmodelsitems': { name: 'detalle de rubros de grupos', gender: 'm' },
        'itm_items': { name: 'rubros', gender: 'm' },
        'mitm_modelsitems': { name: 'rubros de modelos', gender: 'm' },
        'mnu_menu': { name: 'menus', gender: 'm' },
        'per_permissions': { name: 'permisos', gender: 'm' },
        'pmt_paymentmethods': { name: 'metodos de pago', gender: 'm' },
        'remo_resourcesmodules': { name: 'modulos de recursos', gender: 'm' },
        'rety_resourcestypes': { name: 'tipos de recursos', gender: 'm' },
        'rol_roles': { name: 'roles', gender: 'm' },
        'rolper_rolespermissions': { name: 'permisos de roles', gender: 'm' },
        'rou_routes': { name: 'recorridos', gender: 'm' },
        'subp_subscriptionplans': { name: 'planes de suscripcion', gender: 'm' },
        'tact_typesactivities': { name: 'tipos de actividades', gender: 'm' },
        'twrk_typeworks': { name: 'tipos de trabajos', gender: 'm' },
        'usr_users': { name: 'usuarios', gender: 'm' },
        'usrrolcmp_usersrolescompanies': { name: 'usuarios roles empresas', gender: 'm' },
        'wrk_works': { name: 'trabajos', gender: 'm' },
        'wrka_workattachments': { name: 'adjuntos de trabajos', gender: 'm' },
        'wrkd_worksdetails': { name: 'detalles de trabajos', gender: 'm' },
        'wrks_workstates': { name: 'estados de trabajos', gender: 'm' },
    };

    public static handle(error: any): string {
        if (error.name === 'SequelizeForeignKeyConstraintError') {
            const detail = error.parent?.detail || error.parent?.message || "";
            const tableNameMatch = detail.match(/table "([^"]+)"|table `([^`]+)`/);
            const tableName = tableNameMatch ? (tableNameMatch[1] || tableNameMatch[2]) : null;

            const info = tableName ? this.TABLE_MAP[tableName] : null;

            if (info) {
                // Si es femenino 'f', usamos 'asociadas', si es masculino 'm', 'asociados'
                const suffix = info.gender === 'f' ? 'asociadas' : 'asociados';
                return `No se puede eliminar el registro porque tiene ${info.name} ${suffix}.`;
            }

            // Fallback si la tabla no está en nuestro mapa
            return "No se puede eliminar el registro porque tiene datos vinculados en otras tablas.";
        }

        return error.message || "Error inesperado en la base de datos.";
    }
}