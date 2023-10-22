import { Injectable } from '@nestjs/common';
import { MaintenanceRequest } from '@suiteportal/api-interfaces';
import { MaintenanceRequestDao, MaintenanceRequestData, MaintenanceRequestDB } from './maintenance-request.dao';

@Injectable()
export class MaintenanceRequestService {

  constructor(
    private readonly maintReqDao: MaintenanceRequestDao,
  ) {
    //
  }

  async createMaintenanceRequest(maintenanceRequest: MaintenanceRequest) {
    return await this.maintReqDao.insertNewRequest(maintenanceRequest);
  }

  async getMaintenanceRequest(id: string): Promise<MaintenanceRequestDB> {
    if (!id) {
      throw new Error('No id provided');
    }

    return await this.maintReqDao.getMaintenanceRequest(id);
  }

  async getAllOpenMaintenanceRequest(): Promise<MaintenanceRequestDB[]> {
    return await this.maintReqDao.getAllOpenMaintenanceRequest();
  }

  async closeMaintenanceRequest(id: string) {
      return await this.maintReqDao.closeMaintenanceRequest(id);
  }
}
