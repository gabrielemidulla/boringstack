import { err, withExternalErrorAliases, type ErrEntry } from '../core.js';

const betterAuth = <const Code extends string, const Entry extends ErrEntry>(
  code: Code,
  entry: Entry,
) =>
  withExternalErrorAliases(entry, {
    betterAuth: {
      codes: [code],
      messages: true,
    },
  });

export const authErrors = {
  userNotFound: betterAuth(
    'USER_NOT_FOUND',
    err(404, {
      en: 'User not found',
      it: 'Utente non trovato',
      de: 'Benutzer nicht gefunden',
      es: 'Usuario no encontrado',
      fr: 'Utilisateur introuvable',
    }),
  ),
  failedToCreateUser: betterAuth(
    'FAILED_TO_CREATE_USER',
    err(422, {
      en: 'Failed to create user',
      it: "Impossibile creare l'utente",
      de: 'Benutzer konnte nicht erstellt werden',
      es: 'No se pudo crear el usuario',
      fr: "Impossible de créer l'utilisateur",
    }),
  ),
  failedToCreateSession: betterAuth(
    'FAILED_TO_CREATE_SESSION',
    err(400, {
      en: 'Failed to create session',
      it: 'Impossibile creare la sessione',
      de: 'Sitzung konnte nicht erstellt werden',
      es: 'No se pudo crear la sesión',
      fr: 'Impossible de créer la session',
    }),
  ),
  failedToUpdateUser: betterAuth(
    'FAILED_TO_UPDATE_USER',
    err(500, {
      en: 'Failed to update user',
      it: "Impossibile aggiornare l'utente",
      de: 'Benutzer konnte nicht aktualisiert werden',
      es: 'No se pudo actualizar el usuario',
      fr: "Impossible de mettre à jour l'utilisateur",
    }),
  ),
  failedToGetSession: betterAuth(
    'FAILED_TO_GET_SESSION',
    err(500, {
      en: 'Failed to get session',
      it: 'Impossibile recuperare la sessione',
      de: 'Sitzung konnte nicht abgerufen werden',
      es: 'No se pudo obtener la sesión',
      fr: 'Impossible de récupérer la session',
    }),
  ),
  invalidPassword: betterAuth(
    'INVALID_PASSWORD',
    err(400, {
      en: 'Invalid password',
      it: 'Password non valida',
      de: 'Ungültiges Passwort',
      es: 'Contraseña no válida',
      fr: 'Mot de passe invalide',
    }),
  ),
  invalidEmail: betterAuth(
    'INVALID_EMAIL',
    err(400, {
      en: 'Invalid email',
      it: 'Email non valida',
      de: 'Ungültige E-Mail',
      es: 'Correo electrónico no válido',
      fr: 'E-mail invalide',
    }),
  ),
  invalidEmailOrPassword: betterAuth(
    'INVALID_EMAIL_OR_PASSWORD',
    err(401, {
      en: 'Invalid email or password',
      it: 'Email o password non validi',
      de: 'Ungültige E-Mail oder Passwort',
      es: 'Correo o contraseña no válidos',
      fr: 'E-mail ou mot de passe invalide',
    }),
  ),
  invalidUser: betterAuth(
    'INVALID_USER',
    err(400, {
      en: 'Invalid user',
      it: 'Utente non valido',
      de: 'Ungültiger Benutzer',
      es: 'Usuario no válido',
      fr: 'Utilisateur invalide',
    }),
  ),
  socialAccountAlreadyLinked: betterAuth(
    'SOCIAL_ACCOUNT_ALREADY_LINKED',
    err(409, {
      en: 'Social account already linked',
      it: 'Account social già collegato',
      de: 'Social-Konto bereits verknüpft',
      es: 'La cuenta social ya está vinculada',
      fr: 'Compte social déjà lié',
    }),
  ),
  providerNotFound: betterAuth(
    'PROVIDER_NOT_FOUND',
    err(404, {
      en: 'Provider not found',
      it: 'Provider non trovato',
      de: 'Anbieter nicht gefunden',
      es: 'Proveedor no encontrado',
      fr: 'Fournisseur introuvable',
    }),
  ),
  invalidToken: betterAuth(
    'INVALID_TOKEN',
    err(401, {
      en: 'Invalid token',
      it: 'Token non valido',
      de: 'Ungültiges Token',
      es: 'Token no válido',
      fr: 'Jeton invalide',
    }),
  ),
  tokenExpired: betterAuth(
    'TOKEN_EXPIRED',
    err(401, {
      en: 'Token expired',
      it: 'Token scaduto',
      de: 'Token abgelaufen',
      es: 'Token caducado',
      fr: 'Jeton expiré',
    }),
  ),
  idTokenNotSupported: betterAuth(
    'ID_TOKEN_NOT_SUPPORTED',
    err(400, {
      en: 'id_token not supported',
      it: 'id_token non supportato',
      de: 'id_token wird nicht unterstützt',
      es: 'id_token no compatible',
      fr: 'id_token non pris en charge',
    }),
  ),
  failedToGetUserInfo: betterAuth(
    'FAILED_TO_GET_USER_INFO',
    err(401, {
      en: 'Failed to get user info',
      it: 'Impossibile recuperare le informazioni utente',
      de: 'Benutzerinformationen konnten nicht abgerufen werden',
      es: 'No se pudo obtener la información del usuario',
      fr: "Impossible de récupérer les informations de l'utilisateur",
    }),
  ),
  userEmailNotFound: betterAuth(
    'USER_EMAIL_NOT_FOUND',
    err(401, {
      en: 'User email not found',
      it: 'Email utente non trovata',
      de: 'Benutzer-E-Mail nicht gefunden',
      es: 'Correo del usuario no encontrado',
      fr: "E-mail de l'utilisateur introuvable",
    }),
  ),
  emailNotVerified: betterAuth(
    'EMAIL_NOT_VERIFIED',
    err(403, {
      en: 'Email not verified',
      it: 'Email non verificata',
      de: 'E-Mail nicht verifiziert',
      es: 'Correo no verificado',
      fr: 'E-mail non vérifié',
    }),
  ),
  passwordTooShort: betterAuth(
    'PASSWORD_TOO_SHORT',
    err(400, {
      en: 'Password too short',
      it: 'Password troppo corta',
      de: 'Passwort zu kurz',
      es: 'Contraseña demasiado corta',
      fr: 'Mot de passe trop court',
    }),
  ),
  passwordTooLong: betterAuth(
    'PASSWORD_TOO_LONG',
    err(400, {
      en: 'Password too long',
      it: 'Password troppo lunga',
      de: 'Passwort zu lang',
      es: 'Contraseña demasiado larga',
      fr: 'Mot de passe trop long',
    }),
  ),
  userAlreadyExists: betterAuth(
    'USER_ALREADY_EXISTS',
    err(422, {
      en: 'User already exists.',
      it: "L'utente esiste già.",
      de: 'Benutzer existiert bereits.',
      es: 'El usuario ya existe.',
      fr: "L'utilisateur existe déjà.",
    }),
  ),
  userAlreadyExistsUseAnotherEmail: betterAuth(
    'USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL',
    err(422, {
      en: 'User already exists. Use another email.',
      it: "L'utente esiste già. Usa un'altra email.",
      de: 'Benutzer existiert bereits. Verwende eine andere E-Mail.',
      es: 'El usuario ya existe. Usa otro correo.',
      fr: "L'utilisateur existe déjà. Utilisez un autre e-mail.",
    }),
  ),
  emailCanNotBeUpdated: betterAuth(
    'EMAIL_CAN_NOT_BE_UPDATED',
    err(400, {
      en: 'Email can not be updated',
      it: "L'email non può essere aggiornata",
      de: 'E-Mail kann nicht aktualisiert werden',
      es: 'El correo no se puede actualizar',
      fr: "L'e-mail ne peut pas être mise à jour",
    }),
  ),
  changeEmailDisabled: betterAuth(
    'CHANGE_EMAIL_DISABLED',
    err(403, {
      en: 'Change email is disabled',
      it: 'La modifica email è disabilitata',
      de: 'E-Mail-Änderung ist deaktiviert',
      es: 'El cambio de correo está deshabilitado',
      fr: "Le changement d'e-mail est désactivé",
    }),
  ),
  credentialAccountNotFound: betterAuth(
    'CREDENTIAL_ACCOUNT_NOT_FOUND',
    err(404, {
      en: 'Credential account not found',
      it: 'Account con credenziali non trovato',
      de: 'Anmeldekonto nicht gefunden',
      es: 'Cuenta de credenciales no encontrada',
      fr: "Compte d'identifiants introuvable",
    }),
  ),
  sessionExpired: betterAuth(
    'SESSION_EXPIRED',
    err(401, {
      en: 'Session expired. Re-authenticate to perform this action.',
      it: 'Sessione scaduta. Autenticati di nuovo per eseguire questa azione.',
      de: 'Sitzung abgelaufen. Melde dich erneut an, um diese Aktion auszuführen.',
      es: 'Sesión caducada. Vuelve a autenticarte para realizar esta acción.',
      fr: 'Session expirée. Réauthentifiez-vous pour effectuer cette action.',
    }),
  ),
  failedToUnlinkLastAccount: betterAuth(
    'FAILED_TO_UNLINK_LAST_ACCOUNT',
    err(400, {
      en: "You can't unlink your last account",
      it: 'Non puoi scollegare il tuo ultimo account',
      de: 'Du kannst dein letztes Konto nicht trennen',
      es: 'No puedes desvincular tu última cuenta',
      fr: 'Vous ne pouvez pas dissocier votre dernier compte',
    }),
  ),
  accountNotFound: betterAuth(
    'ACCOUNT_NOT_FOUND',
    err(404, {
      en: 'Account not found',
      it: 'Account non trovato',
      de: 'Konto nicht gefunden',
      es: 'Cuenta no encontrada',
      fr: 'Compte introuvable',
    }),
  ),
  userAlreadyHasPassword: betterAuth(
    'USER_ALREADY_HAS_PASSWORD',
    err(400, {
      en: 'User already has a password. Provide that to delete the account.',
      it: "L'utente ha già una password. Forniscila per eliminare l'account.",
      de: 'Benutzer hat bereits ein Passwort. Gib es an, um das Konto zu löschen.',
      es: 'El usuario ya tiene contraseña. Proporciónala para eliminar la cuenta.',
      fr: "L'utilisateur a déjà un mot de passe. Fournissez-le pour supprimer le compte.",
    }),
  ),
  crossSiteNavigationLoginBlocked: betterAuth(
    'CROSS_SITE_NAVIGATION_LOGIN_BLOCKED',
    err(403, {
      en: 'Cross-site navigation login blocked. This request appears to be a CSRF attack.',
      it: 'Accesso da navigazione cross-site bloccato. La richiesta sembra un attacco CSRF.',
      de: 'Cross-Site-Navigation-Anmeldung blockiert. Diese Anfrage scheint ein CSRF-Angriff zu sein.',
      es: 'Inicio de sesión por navegación entre sitios bloqueado. La solicitud parece un ataque CSRF.',
      fr: 'Connexion par navigation intersites bloquée. Cette requête semble être une attaque CSRF.',
    }),
  ),
  verificationEmailNotEnabled: betterAuth(
    'VERIFICATION_EMAIL_NOT_ENABLED',
    err(400, {
      en: "Verification email isn't enabled",
      it: 'La email di verifica non è abilitata',
      de: 'Verifizierungs-E-Mail ist nicht aktiviert',
      es: 'El correo de verificación no está habilitado',
      fr: "L'e-mail de vérification n'est pas activé",
    }),
  ),
  emailAlreadyVerified: betterAuth(
    'EMAIL_ALREADY_VERIFIED',
    err(400, {
      en: 'Email is already verified',
      it: 'Email già verificata',
      de: 'E-Mail ist bereits verifiziert',
      es: 'El correo ya está verificado',
      fr: "L'e-mail est déjà vérifié",
    }),
  ),
  emailMismatch: betterAuth(
    'EMAIL_MISMATCH',
    err(400, {
      en: 'Email mismatch',
      it: 'Email non corrispondente',
      de: 'E-Mail stimmt nicht überein',
      es: 'El correo no coincide',
      fr: "L'e-mail ne correspond pas",
    }),
  ),
  sessionNotFresh: betterAuth(
    'SESSION_NOT_FRESH',
    err(401, {
      en: 'Session is not fresh',
      it: 'La sessione non è recente',
      de: 'Sitzung ist nicht aktuell',
      es: 'La sesión no es reciente',
      fr: "La session n'est pas récente",
    }),
  ),
  linkedAccountAlreadyExists: betterAuth(
    'LINKED_ACCOUNT_ALREADY_EXISTS',
    err(409, {
      en: 'Linked account already exists',
      it: 'Account collegato già esistente',
      de: 'Verknüpftes Konto existiert bereits',
      es: 'La cuenta vinculada ya existe',
      fr: 'Le compte lié existe déjà',
    }),
  ),
  invalidOrigin: betterAuth(
    'INVALID_ORIGIN',
    err(403, {
      en: 'Invalid origin',
      it: 'Origine non valida',
      de: 'Ungültiger Ursprung',
      es: 'Origen no válido',
      fr: 'Origine invalide',
    }),
  ),
  invalidCallbackUrl: betterAuth(
    'INVALID_CALLBACK_URL',
    err(400, {
      en: 'Invalid callbackURL',
      it: 'callbackURL non valido',
      de: 'Ungültige callbackURL',
      es: 'callbackURL no válida',
      fr: 'callbackURL invalide',
    }),
  ),
  invalidRedirectUrl: betterAuth(
    'INVALID_REDIRECT_URL',
    err(400, {
      en: 'Invalid redirectURL',
      it: 'redirectURL non valido',
      de: 'Ungültige redirectURL',
      es: 'redirectURL no válida',
      fr: 'redirectURL invalide',
    }),
  ),
  invalidErrorCallbackUrl: betterAuth(
    'INVALID_ERROR_CALLBACK_URL',
    err(400, {
      en: 'Invalid errorCallbackURL',
      it: 'errorCallbackURL non valido',
      de: 'Ungültige errorCallbackURL',
      es: 'errorCallbackURL no válida',
      fr: 'errorCallbackURL invalide',
    }),
  ),
  invalidNewUserCallbackUrl: betterAuth(
    'INVALID_NEW_USER_CALLBACK_URL',
    err(400, {
      en: 'Invalid newUserCallbackURL',
      it: 'newUserCallbackURL non valido',
      de: 'Ungültige newUserCallbackURL',
      es: 'newUserCallbackURL no válida',
      fr: 'newUserCallbackURL invalide',
    }),
  ),
  missingOrNullOrigin: betterAuth(
    'MISSING_OR_NULL_ORIGIN',
    err(403, {
      en: 'Missing or null Origin',
      it: 'Origin mancante o nullo',
      de: 'Origin fehlt oder ist null',
      es: 'Origin ausente o nulo',
      fr: 'Origin manquant ou nul',
    }),
  ),
  callbackUrlRequired: betterAuth(
    'CALLBACK_URL_REQUIRED',
    err(400, {
      en: 'callbackURL is required',
      it: 'callbackURL è obbligatorio',
      de: 'callbackURL ist erforderlich',
      es: 'callbackURL es obligatorio',
      fr: 'callbackURL est requis',
    }),
  ),
  failedToCreateVerification: betterAuth(
    'FAILED_TO_CREATE_VERIFICATION',
    err(500, {
      en: 'Unable to create verification',
      it: 'Impossibile creare la verifica',
      de: 'Verifizierung konnte nicht erstellt werden',
      es: 'No se pudo crear la verificación',
      fr: 'Impossible de créer la vérification',
    }),
  ),
  fieldNotAllowed: betterAuth(
    'FIELD_NOT_ALLOWED',
    err(400, {
      en: 'Field not allowed to be set',
      it: 'Campo non consentito',
      de: 'Feld darf nicht gesetzt werden',
      es: 'Campo no permitido',
      fr: 'Champ non autorisé',
    }),
  ),
  asyncValidationNotSupported: betterAuth(
    'ASYNC_VALIDATION_NOT_SUPPORTED',
    err(400, {
      en: 'Async validation is not supported',
      it: 'La validazione asincrona non è supportata',
      de: 'Asynchrone Validierung wird nicht unterstützt',
      es: 'La validación asíncrona no es compatible',
      fr: "La validation asynchrone n'est pas prise en charge",
    }),
  ),
  validationError: betterAuth(
    'VALIDATION_ERROR',
    err(400, {
      en: 'Validation Error',
      it: 'Errore di validazione',
      de: 'Validierungsfehler',
      es: 'Error de validación',
      fr: 'Erreur de validation',
    }),
  ),
  missingField: betterAuth(
    'MISSING_FIELD',
    err(400, {
      en: 'Field is required',
      it: 'Campo obbligatorio',
      de: 'Feld ist erforderlich',
      es: 'Campo obligatorio',
      fr: 'Champ requis',
    }),
  ),
  methodNotAllowedDeferSessionRequired: betterAuth(
    'METHOD_NOT_ALLOWED_DEFER_SESSION_REQUIRED',
    err(405, {
      en: 'POST method requires deferSessionRefresh to be enabled in session config',
      it: 'Il metodo POST richiede deferSessionRefresh abilitato nella configurazione della sessione',
      de: 'POST-Methode erfordert deferSessionRefresh in der Sitzungskonfiguration',
      es: 'El método POST requiere deferSessionRefresh en la configuración de sesión',
      fr: 'La méthode POST nécessite deferSessionRefresh dans la configuration de session',
    }),
  ),
  bodyMustBeAnObject: betterAuth(
    'BODY_MUST_BE_AN_OBJECT',
    err(400, {
      en: 'Body must be an object',
      it: 'Il body deve essere un oggetto',
      de: 'Body muss ein Objekt sein',
      es: 'El cuerpo debe ser un objeto',
      fr: 'Le corps doit être un objet',
    }),
  ),
  passwordAlreadySet: betterAuth(
    'PASSWORD_ALREADY_SET',
    err(400, {
      en: 'User already has a password set',
      it: "L'utente ha già una password impostata",
      de: 'Benutzer hat bereits ein Passwort gesetzt',
      es: 'El usuario ya tiene una contraseña establecida',
      fr: "L'utilisateur a déjà un mot de passe défini",
    }),
  ),
} as const;
