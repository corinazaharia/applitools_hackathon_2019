export default class LoginPage {
  open(...featureFlag) {
    browser.url(
      process.env.APP_VERSION === 'V2'
        ? '/hackathon' + process.env.APP_VERSION + '.html' + `${featureFlag}`
        : '/hackathon.html' + `${featureFlag}`
    );
    $('.auth-box-w').waitForDisplayed();
  }

  get usernameInput() {
    return $('#username');
  }
  get usernamePlaceholder() {
    return this.usernameInput.getAttribute('placeholder');
  }

  get passwordInput() {
    return $('#password');
  }

  get passwordPlaceholder() {
    return this.passwordInput.getAttribute('placeholder');
  }
  get loginButton() {
    return $('#log-in');
  }

  get rememberMeCheckBox() {
    return $('input[type="checkbox"]');
  }

  get fingerPrintIcon() {
    return $('.os-icon-fingerprint');
  }

  get userIcon() {
    return $('.os-icon-user-male-circle');
  }

  get socialMedia() {
    return $$('.buttons-w img');
  }

  get labels() {
    return $$('label');
  }

  get logo() {
    return $('.logo-w img');
  }

  loginTitle() {
    return $('h4.auth-header')
      .getText()
      .trim();
  }

  alert() {
    return $('.alert-warning').getText();
  }
  login(username: string, password: string) {
    this.usernameInput.setValue(username);
    this.passwordInput.setValue(password);
    this.loginButton.click();
  }
}
