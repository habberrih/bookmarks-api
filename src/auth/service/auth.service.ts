import { Injectable } from '@nestjs/common';

@Injectable({})
export class AuthService {
  async login() {
    return 'I am logged in';
  }
  async signup() {
    return 'I am signed up';
  }
}
