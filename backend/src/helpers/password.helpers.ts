import { hash } from 'bcrypt';

export class PasswordHelper {
  static async hash(value: string) {
    return await hash(value, 10);
  }
}
