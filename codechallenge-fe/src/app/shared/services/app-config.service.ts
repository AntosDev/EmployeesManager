import { Injectable } from '@angular/core';
import { HttpClient } from 'node_modules/@angular/common/http';
import { AppConfig } from '../models/app-config';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  public appConfig: AppConfig;
  constructor(private http: HttpClient) { }

	loadConfig(): Promise<any>{
    return this.http
      .get<AppConfig>('../../../assets/configuration/config.json')
      .toPromise()
      .then(config => {
        this.appConfig = config;
      });
  }
}

export const configFactory = (configService: AppConfigService) => {
  return (): Promise<any> => { 
    return configService.loadConfig(); 
  }
};
