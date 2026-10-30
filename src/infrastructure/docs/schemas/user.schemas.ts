/**
 * @openapi
 * components:
 *   schemas:
 *     UserEntity:
 *       type: object
 *       properties:
 *         usr_uuid:
 *           type: string
 *           format: uuid
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *         usr_name:
 *           type: string
 *           example: "John"
 *         usr_surname:
 *           type: string
 *           example: "Doe"
 *         usr_image:
 *           type: string
 *           example: "https://example.com/avatar.jpg"
 *         usr_email:
 *           type: string
 *           format: email
 *           example: "john.doe@example.com"
 *         usr_nick:
 *           type: string
 *           example: "johndoe"
 *         usr_bio:
 *           type: string
 *           example: "Software developer"
 *         usr_socket:
 *           type: string
 *           example: "socket_id_123"
 *         usr_online:
 *           type: boolean
 *           example: true
 *         usr_createdat:
 *           type: string
 *           format: date-time
 *           example: "2026-10-25T15:30:00-03:00"
 *         usr_updatedat:
 *           type: string
 *           format: date-time
 *           example: "2026-10-25T15:30:00-03:00"
 *
 *     UserInputDTO:
 *       type: object
 *       required:
 *         - usr_name
 *         - usr_surname
 *         - usr_password
 *         - usr_email
 *         - usr_nick
 *       properties:
 *         usr_name:
 *           type: string
 *           example: "John"
 *         usr_surname:
 *           type: string
 *           example: "Doe"
 *         usr_password:
 *           type: string
 *           format: password
 *           example: "StrongPassword123!"
 *         usr_image:
 *           type: string
 *           example: "https://example.com/avatar.jpg"
 *         usr_email:
 *           type: string
 *           format: email
 *           example: "john.doe@example.com"
 *         usr_nick:
 *           type: string
 *           example: "johndoe"
 *         usr_bio:
 *           type: string
 *           example: "Software developer"
 *         usr_socket:
 *           type: string
 *           example: "socket_id_123"
 *         usr_online:
 *           type: boolean
 *           example: false
 *
 *     UserUpdateDTO:
 *       type: object
 *       properties:
 *         usr_name:
 *           type: string
 *           example: "John"
 *         usr_surname:
 *           type: string
 *           example: "Doe"
 *         usr_password:
 *           type: string
 *           format: password
 *           example: "NewStrongPassword123!"
 *         usr_image:
 *           type: string
 *           example: "https://example.com/avatar.jpg"
 *         usr_email:
 *           type: string
 *           format: email
 *           example: "john.doe@example.com"
 *         usr_nick:
 *           type: string
 *           example: "johndoe"
 *         usr_bio:
 *           type: string
 *           example: "Updated bio"
 *         usr_socket:
 *           type: string
 *           example: "socket_id_123"
 *         usr_online:
 *           type: boolean
 *           example: true
 */
