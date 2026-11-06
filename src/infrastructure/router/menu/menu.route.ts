import { Express } from "express";
import { SequelizeMenuRepository } from "../../repository/menu/sequelize-menu.repository";
import { MenuUseCase } from "../../../application/menu/menu-use-case";
import { MenuController } from "../../controller/menu/menu.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

function configureMenuRoutes(app: Express) {
    const sequelizeMenuRepository = new SequelizeMenuRepository();
    const menuUseCase = new MenuUseCase(sequelizeMenuRepository);
    const menuCtrl = new MenuController(menuUseCase);

    const basePrefix = process.env.BASE_URL_API || 'api';

    /**
     * @swagger
     * /api/menus:
     *   get:
     *     summary: Obtener lista completa de menús
     *     tags: [Menus]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Menús retornados.
     */
    app.get(`/${basePrefix}/menus`, authMiddleware, menuCtrl.getAllCtrl);

    /**
     * @swagger
     * /api/menu-tree:
     *   get:
     *     summary: Obtener estructura jerárquica de menús (árbol)
     *     tags: [Menus]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Árbol de navegación retornado.
     */
    app.get(`/${basePrefix}/menu-tree`, authMiddleware, menuCtrl.getMenuItemsCtrl);

    /**
     * @swagger
     * /api/menu-dashboard:
     *   get:
     *     summary: Obtener accesos y atajos del dashboard
     *     tags: [Menus]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Ítems del dashboard retornados.
     */
    app.get(`/${basePrefix}/menu-dashboard`, authMiddleware, menuCtrl.getDashboardItemsCtrl);

    /**
     * @swagger
     * /api/menu/{mnu_uuid}:
     *   get:
     *     summary: Obtener detalle de ítem de menú por ID
     *     tags: [Menus]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: mnu_uuid
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Menú retornado.
     */
    app.get(`/${basePrefix}/menu/:mnu_uuid`, authMiddleware, menuCtrl.getDetailCtrl);

    /**
     * @swagger
     * /api/menu:
     *   post:
     *     summary: Crear nuevo ítem de menú
     *     tags: [Menus]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/MenuEntity'
     *     responses:
     *       201:
     *         description: Menú creado.
     */
    app.post(`/${basePrefix}/menu`, authMiddleware, menuCtrl.insertCtrl);

    /**
     * @swagger
     * /api/menu/{mnu_uuid}:
     *   put:
     *     summary: Actualizar ítem de menú
     *     tags: [Menus]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: mnu_uuid
     *         required: true
     *         schema:
     *           type: string
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/MenuEntity'
     *     responses:
     *       200:
     *         description: Menú actualizado.
     */
    app.put(`/${basePrefix}/menu/:mnu_uuid`, authMiddleware, menuCtrl.updateCtrl);

    /**
     * @swagger
     * /api/menu/{mnu_uuid}:
     *   delete:
     *     summary: Eliminar ítem de menú
     *     tags: [Menus]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: mnu_uuid
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Menú eliminado.
     */
    app.delete(`/${basePrefix}/menu/:mnu_uuid`, authMiddleware, menuCtrl.deleteCtrl);
}

export default configureMenuRoutes;
