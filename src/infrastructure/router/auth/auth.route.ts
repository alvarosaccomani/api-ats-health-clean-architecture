import { Express } from "express";
import { SequelizeAuthRepository } from "../../repository/auth/sequelize-auth.repository";
import { SequelizeRepository } from "../../repository/user/sequelize-user.repository";
import { AuthUseCase } from "../../../application/auth/auth-use-case";
import { UserUseCase } from "../../../application/user/user-use-case";
import { AuthController } from "../../controller/auth/auth.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureAuthRoutes(app: Express, socketAdapter: SocketAdapter) {
    const sequelizeAuthRepository = new SequelizeAuthRepository();
    const sequelizeUserRepository = new SequelizeRepository();
    
    const authUseCase = new AuthUseCase(sequelizeAuthRepository);
    const userUseCase = new UserUseCase(sequelizeUserRepository);
    
    const authCtrl = new AuthController(authUseCase, userUseCase);
    
    /**
     * @swagger
     * /login:
     *   post:
     *     summary: Iniciar sesión de usuario
     *     description: Autentica al usuario mediante credenciales (usuario/email y contraseña) y retorna el token JWT.
     *     tags:
     *       - Auth
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/LoginDto'
     *     responses:
     *       200:
     *         description: Inicio de sesión exitoso.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/AuthSuccessResponse'
     *       400:
     *         description: Credenciales incorrectas o error en la petición.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ErrorResponse'
     */
    app.post(`/${process.env.BASE_URL_API}/login`, authCtrl.loginCtrl);

    /**
     * @swagger
     * /register:
     *   post:
     *     summary: Registrar un nuevo usuario
     *     description: Crea un nuevo usuario en el sistema y en el Kernel Central federado.
     *     tags:
     *       - Auth
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/RegisterUserDto'
     *     responses:
     *       200:
     *         description: Usuario registrado con éxito.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: true
     *                 message:
     *                   type: string
     *                   example: "Usuario registrado con éxito de forma unificada."
     *                 data:
     *                   $ref: '#/components/schemas/UserEntity'
     *       400:
     *         description: Error en la validación o usuario existente.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ErrorResponse'
     */
    app.post(`/${process.env.BASE_URL_API}/register`, authCtrl.saveCtrl);

    /**
     * @swagger
     * /confirm-account:
     *   post:
     *     summary: Confirmar cuenta de usuario
     *     description: Confirma el correo electrónico del usuario mediante un token recibido.
     *     tags:
     *       - Auth
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/ConfirmAccountDto'
     *     responses:
     *       200:
     *         description: Cuenta confirmada con éxito.
     *       400:
     *         description: Token inválido o expirado.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ErrorResponse'
     */
    app.post(`/${process.env.BASE_URL_API}/confirm-account`, authCtrl.confirmCtrl);

    /**
     * @swagger
     * /forgot-password:
     *   post:
     *     summary: Solicitar recuperación de contraseña
     *     description: Envía un correo con token para reestablecer la contraseña si el email existe.
     *     tags:
     *       - Auth
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/ForgotPasswordDto'
     *     responses:
     *       200:
     *         description: Correo de recuperación enviado.
     *       400:
     *         description: Email no encontrado o inválido.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ErrorResponse'
     */
    app.post(`/${process.env.BASE_URL_API}/forgot-password`, authCtrl.forgotCtrl);

    /**
     * @swagger
     * /reset-password:
     *   post:
     *     summary: Restablecer contraseña
     *     description: Actualiza la contraseña utilizando el token de restablecimiento.
     *     tags:
     *       - Auth
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/ResetPasswordDto'
     *     responses:
     *       200:
     *         description: Contraseña restablecida con éxito.
     *       400:
     *         description: Token inválido o datos requeridos faltantes.
     *       500:
     *         description: Error interno del servidor.
     */
    app.post(`/${process.env.BASE_URL_API}/reset-password`, authCtrl.resetCtrl);

    /**
     * @swagger
     * /auth/sso/verify:
     *   post:
     *     summary: Verificar token SSO
     *     description: Valida el token emitido por el Kernel Central SSO y crea la sesión local.
     *     tags:
     *       - Auth
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/SSOVerifyDto'
     *     responses:
     *       200:
     *         description: Token verificado y sesión iniciada.
     *       400:
     *         description: Token SSO inválido o expirado.
     *       500:
     *         description: Error en el servicio SSO.
     */
    app.post(`/${process.env.BASE_URL_API}/auth/sso/verify`, authCtrl.verifySSOTokenCtrl);

    /**
     * @swagger
     * /auth/sso/config:
     *   get:
     *     summary: Obtener configuración SSO de la aplicación
     *     description: Retorna el modo de autenticación configurado (local o federado SSO).
     *     tags:
     *       - Auth
     *     responses:
     *       200:
     *         description: Configuración obtenida correctamente.
     */
    app.get(`/${process.env.BASE_URL_API}/auth/sso/config`, authCtrl.getAppConfigCtrl);

    /**
     * @swagger
     * /auth/sso/log-auth:
     *   post:
     *     summary: Registrar auditoría de autenticación
     *     description: Envía logs de inicio de sesión al servicio central de auditoría.
     *     tags:
     *       - Auth
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/SSOLogAuthDto'
     *     responses:
     *       200:
     *         description: Evento de autenticación registrado.
     *       500:
     *         description: Error al enviar log al servidor central.
     */
    app.post(`/${process.env.BASE_URL_API}/auth/sso/log-auth`, authCtrl.logAuthCtrl);
}

export default configureAuthRoutes;
