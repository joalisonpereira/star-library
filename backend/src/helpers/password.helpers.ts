import { compareSync, hashSync } from 'bcrypt';

export class PasswordHelper {
  static hash(value: string) {
    return hashSync(value, 10);
  }

  static compare(password: string, hashPassword: string) {
    return compareSync(password.toString(), hashPassword.toString());
  }
}
