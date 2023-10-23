import { BadRequestException, Body, Controller, Post, Get, Param, Put, UseGuards, NotFoundException } from '@nestjs/common';
import { MaintenanceRequest } from '@suiteportal/api-interfaces';
import { MaintenanceRequestService } from './maintenance-request.service';
import { AuthGuard } from '../auth.guard';

@Controller('maintenance-requests')
export class MaintenanceRequestController {

  constructor(
    private readonly maintenanceRequestService: MaintenanceRequestService,
  ) {
    //
  }

  @Post('/')
  public async createMaintenanceRequest(
    @Body() maintenanceRequest: MaintenanceRequest,
  ) {
    if (!maintenanceRequest?.summary) {
      throw new BadRequestException('Must provide a valid summary');
    }
    if (!maintenanceRequest?.serviceType) {
      throw new BadRequestException('Must provide a valid Service Type');
    }
    return await this.maintenanceRequestService.createMaintenanceRequest(maintenanceRequest);
  }

  @Get('/:id')
  public async getMaintenanceRequest(
    @Param('id') id: string,
  ) {
    if (!id) {
      throw new BadRequestException('No id provided');
    }

    const response = await this.maintenanceRequestService.getMaintenanceRequest(id);

    if (!response) {
      throw new NotFoundException('No relevant record in collection.')
    }

    return response
  }

  ///Protecting the routes only authorized user (admin) can access with auth guards

  @Get('/')
  @UseGuards(AuthGuard)
  public async getAllOpenMaintenanceRequest() {
    return await this.maintenanceRequestService.getAllOpenMaintenanceRequest();
  }

  @Put('/:id/close')
  @UseGuards(AuthGuard)
  public async closeMaintenanceRequest(
    @Param('id') id: string
  ) {
    if (!id) {
      throw new BadRequestException('No id provided');
    }

    const request = await this.maintenanceRequestService.getMaintenanceRequest(id)

    if (!request) {
      throw new NotFoundException('Cannot close record that does not exist in collection.')
    }

    await this.maintenanceRequestService.closeMaintenanceRequest(id);

    //returning updated list of open requests on success to update value on front end

    return await this.getAllOpenMaintenanceRequest()
  }
}
