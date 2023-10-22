import { Injectable } from '@nestjs/common';
import { MaintenanceRequest } from '@suiteportal/api-interfaces';
import * as low from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';
import * as nanoid from 'nanoid';

export interface MaintenanceRequestDB extends MaintenanceRequest {
  id: string;
  submittedAt: Date;
}

export interface MaintenanceRequestData {
  requests: MaintenanceRequestDB[];
}

const adapter = new FileSync<MaintenanceRequestDB>('./db/maint-requests.json')
const db = low(adapter)

db.defaults({ requests: [] }).write();

@Injectable()
export class MaintenanceRequestDao {

  private get collection(): any {
    return db.get('requests');
  }

  constructor() {
    //
  }

  async insertNewRequest(maintenanceRequest: MaintenanceRequest) {
    const id = { id: nanoid.nanoid(10) };

    //by default every successfully submitted request should be open

    await this.collection
      .push({
        ...id,
        ...maintenanceRequest,
        isOpen: true,
        submittedAt: new Date()
      })
      .write()
    return id;
  }

  async getMaintenanceRequest(id: string): Promise<MaintenanceRequestDB> {
    const mainReq = await this.collection.find({ id }).value();
    if (!id) {
        throw new Error('No id provided');
      }

    if (!mainReq) {
      throw new Error('No relevant record in collection.')
    }

    return mainReq
  }

  async getAllOpenMaintenanceRequest(): Promise<MaintenanceRequestDB[]>{
    return await this.collection.filter(req => req.isOpen === true).value()
  }

  async closeMaintenanceRequest (id: string) {
    if (!id) {
      throw new Error('No id provided');
    }

    const mainReq = await this.collection.find({ id }).value();

    if (!mainReq) {
      throw new Error('Cannot close record that does not exist in collection.')
    }

    await this.collection.find({ id }).assign({isOpen: false}).write()

    const list = await this.collection.filter(req => req.isOpen === true).value()

    return {data: list}
  }
}
