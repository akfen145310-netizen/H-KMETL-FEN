/**
 * Dönüştürücü Yetkili Doğrulama Servisi
 * Dönüştürücü modülünü yalnızca yetkili eğitimcilerin ve yöneticilerin
 * kullanabilmesi için şifreleme ve oturum kontrolü sağlar.
 */

const STORAGE_KEY_AUTH_PASS = 'hikmetli_converter_admin_pass';
const STORAGE_KEY_AUTH_SESSION = 'hikmetli_converter_auth_session';

// Varsayılan yetkili şifresi
export const DEFAULT_ADMIN_PASSWORD = 'hikmet1453';

/**
 * Mevcut geçerli yetkili şifresini getirir.
 */
export function getAuthorizedPassword(): string {
  try {
    const customPass = localStorage.getItem(STORAGE_KEY_AUTH_PASS);
    if (customPass && customPass.trim()) {
      return customPass.trim();
    }
  } catch (e) {
    console.error('Password read error:', e);
  }
  return DEFAULT_ADMIN_PASSWORD;
}

/**
 * Kullanıcının dönüştürücü için yetkili oturumu olup olmadığını kontrol eder.
 */
export function isConverterAuthenticated(): boolean {
  try {
    const sessionToken = sessionStorage.getItem(STORAGE_KEY_AUTH_SESSION);
    if (!sessionToken) return false;

    // Basit token doğrulaması (oturum anahtarı kontrolü)
    const expectedToken = btoa(`auth_${getAuthorizedPassword()}`);
    return sessionToken === expectedToken;
  } catch (e) {
    console.error('Auth check error:', e);
    return false;
  }
}

/**
 * Girilen şifreyi doğrular ve geçerliyse oturumu başlatır.
 */
export function loginConverter(passwordAttempt: string): boolean {
  try {
    const currentPass = getAuthorizedPassword();
    if (passwordAttempt.trim() === currentPass) {
      const token = btoa(`auth_${currentPass}`);
      sessionStorage.setItem(STORAGE_KEY_AUTH_SESSION, token);
      return true;
    }
    return false;
  } catch (e) {
    console.error('Login error:', e);
    return false;
  }
}

/**
 * Yetkili oturumunu kapatır ve dönüştürücüyü kilitler.
 */
export function logoutConverter(): void {
  try {
    sessionStorage.removeItem(STORAGE_KEY_AUTH_SESSION);
  } catch (e) {
    console.error('Logout error:', e);
  }
}

/**
 * Yetkili şifresini değiştirir.
 */
export function updateConverterPassword(
  oldPass: string,
  newPass: string
): { success: boolean; message: string } {
  try {
    const currentPass = getAuthorizedPassword();
    if (oldPass.trim() !== currentPass) {
      return { success: false, message: 'Mevcut yetkili şifresi hatalı.' };
    }

    if (!newPass || newPass.trim().length < 4) {
      return { success: false, message: 'Yeni şifre en az 4 karakterden oluşmalıdır.' };
    }

    localStorage.setItem(STORAGE_KEY_AUTH_PASS, newPass.trim());
    // Yeni token ile oturumu tazele
    const token = btoa(`auth_${newPass.trim()}`);
    sessionStorage.setItem(STORAGE_KEY_AUTH_SESSION, token);

    return { success: true, message: 'Yetkili şifresi başarıyla güncellendi.' };
  } catch (e) {
    return { success: false, message: 'Şifre güncellenirken bir hata oluştu.' };
  }
}

/**
 * Şifreyi fabrika varsayılanına (`hikmet1453`) sıfırlar.
 */
export function resetConverterPasswordToDefault(): void {
  try {
    localStorage.removeItem(STORAGE_KEY_AUTH_PASS);
    logoutConverter();
  } catch (e) {
    console.error('Reset error:', e);
  }
}
