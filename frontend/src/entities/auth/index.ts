export class authController {
  private storage: Storage

  constructor() {
    this.storage = localStorage
  }

  getToken() {
    return this.storage.getItem('sesstionToken')
  }

  setToken(token: string) {
    return this.storage.setItem('sesstionToken', token)
  }

  clear() {
    this.storage.clear()
  }
}
