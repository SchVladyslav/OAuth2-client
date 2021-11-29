export class Environment {
  static production = false;
  static version = "v1.0.0";
  static apiHost = "http://localhost:5000/api";
  static projectSecret = "$2b$04$MFle1TA9AL/saAYE7Ar/fOST3gu91waXmpZJDUAHrsU0gT/8xAuDy";
  static projectID = "project1.oauth.app";
  static redirectURL = "https://google.com";
}

export const environment = new Environment();
