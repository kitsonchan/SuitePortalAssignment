/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Test, TestingModule } from '@nestjs/testing';
import { MaintenanceRequestController } from './maintenance-request.controller';
import { MaintenanceRequestService } from './maintenance-request.service';
import { MaintenanceRequest, ServiceType } from '@suiteportal/api-interfaces';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('MaintenanceRequestController', () => {
  let controller: MaintenanceRequestController;

  let mockService: MaintenanceRequestService;

  beforeEach(async () => {
    mockService = {} as any;

    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpClientTestingModule],
      controllers: [MaintenanceRequestController],
      providers: [
        { provide: MaintenanceRequestService, useValue: mockService },
      ]
    }).compile();

    controller = module.get<MaintenanceRequestController>(MaintenanceRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call dao when getting a maintenance request by id', async () => {
    mockService.getMaintenanceRequest = jest.fn().mockResolvedValue({ id: '1', summary: 'test' });

    const result = await controller.getMaintenanceRequest('1');

    expect(mockService.getMaintenanceRequest).toHaveBeenCalled();
    expect(result).toEqual({ id: '1', summary: 'test'});
  });

  it('should throw BadRequestException when id is provided in get request by id API', async () => {
    await expect(controller.getMaintenanceRequest(null)).rejects.toThrowError(new BadRequestException('No id provided'))
  });

  it('should throw NotFoundException when record does not exist in collection when calling get request by id API',async () => {
    mockService.getMaintenanceRequest = jest.fn().mockResolvedValue(undefined);

    await expect(controller.getMaintenanceRequest('1')).rejects.toThrowError(new NotFoundException('No relevant record in collection.'))
    expect(mockService.getMaintenanceRequest).toHaveBeenCalled()
  })

  it('should return a list of open maintenance requests', async () => {
    mockService.getAllOpenMaintenanceRequest = jest.fn().mockResolvedValue([{ id: '1', summary: 'test' }]);

    const result = await controller.getAllOpenMaintenanceRequest();

    expect(mockService.getAllOpenMaintenanceRequest).toHaveBeenCalled();
    expect(result).toEqual([{ id: '1', summary: 'test'}]);
  });

  it('should successfully create maintenance request', async () => {
    const param:MaintenanceRequest = {
      name: 'Ben',
      email: 'ben@hot.com',
      unitNumber: '114',
      serviceType: ServiceType.General,
      summary: 'summary test',
      details: 'details test',
    }
    const id = {id: 10}

    mockService.createMaintenanceRequest = jest.fn().mockResolvedValue(id);

    const result = await controller.createMaintenanceRequest(param);

    expect(mockService.createMaintenanceRequest).toHaveBeenCalled();
    expect(result).toEqual(id);
  })

  it('should fail to create maintenance request with missing fields', async () => {
    const param:MaintenanceRequest = {
      name: null,
      email: 'ben@hot.com',
      unitNumber: '114',
      serviceType: ServiceType.General,
      summary: 'summary test',
      details: 'details test',
    }

    mockService.createMaintenanceRequest = jest.fn().mockResolvedValue(new BadRequestException('Must provide a valid Name'));

    await expect(controller.createMaintenanceRequest(param)).rejects.toThrowError(new BadRequestException('Must provide a valid Name'))
  })

  //close request
  //1. Look for valid id (array with only the targeted item for testing)
  //2. search if targeted open request exist in collection and update isOpen status to false
  //3. upon successful update operation return the whole updated list (should return empty array with no open request)

  it('should close open request successfully', async () => {
    const id = {id: 1}

    mockService.closeMaintenanceRequest = jest.fn().mockResolvedValue(id);
    mockService.getMaintenanceRequest = jest.fn().mockResolvedValue(id);
    mockService.getAllOpenMaintenanceRequest = jest.fn().mockResolvedValue([]);

    const result = await controller.closeMaintenanceRequest('1')

    expect(mockService.closeMaintenanceRequest).toHaveBeenCalled()
    expect(result).toEqual([])
  })

  it('should fail to close open request with no id provided', async () => {
    await expect(controller.closeMaintenanceRequest(null)).rejects.toThrowError(new BadRequestException('No id provided'))
  })

  it('should throw NotFoundException when record does not exist in collection in close request API', async () => {
    mockService.getMaintenanceRequest = jest.fn().mockResolvedValue(undefined);

    await expect(controller.closeMaintenanceRequest('1')).rejects.toThrowError(new NotFoundException('Cannot close record that does not exist in collection.'))
    expect(mockService.getMaintenanceRequest).toHaveBeenCalled()
  })
});
