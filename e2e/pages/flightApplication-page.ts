import { by } from 'protractor';

export class LoginPages {

	public static applicationName: string;
	public static testcaseID: string;
	public static readonly loginLink = by.xpath(`//span[text() = 'Log in']`);
	public static readonly username = by.id(`login_email`);
	public static readonly passWord = by.id(`login_password`);
	public static readonly submitBtn = by.linkText('Log in');
	public static readonly loggedIn = by.id('user-text');
	public static readonly SignOff = by.xpath(`//button[text() = 'Log out']`);

}