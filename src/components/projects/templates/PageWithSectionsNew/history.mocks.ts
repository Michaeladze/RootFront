import { IRequestPath } from '../../../../types/projects.types';
import { usersMocks } from '../../organisms/FindUsers/users.mocks';

export const historyMocks: IRequestPath[] = [
  {
    actArea: 'actArea',
    pathId: 'pathId,',
    stepId: 'stepId1',
    activityId: 'activityId',
    activityText: 'activityText',
    agent: 'agent',
    agentName: 'agentName',
    user: [usersMocks[usersMocks.length - 1]],
    statusId: 'statusId',
    statusText: 'statusText',
    criticality: '0',
    date: Date.now(),
    comment: 'Комментарий к элементу'
  },
  {
    actArea: 'actArea',
    pathId: 'pathId,',
    stepId: 'stepId2',
    activityId: 'activityId',
    activityText: 'activityText',
    agent: 'agent',
    agentName: 'agentName',
    user: [usersMocks[0]],
    statusId: 'statusId',
    statusText: 'statusText',
    criticality: '1',
    date: Date.now(),
    comment: 'Комментарий к элементу'
  },
  {
    actArea: 'actArea',
    pathId: 'pathId,',
    stepId: 'stepId3',
    activityId: 'activityId',
    activityText: 'activityText',
    agent: 'agent',
    agentName: 'agentName',
    user: [usersMocks[3]],
    statusId: 'statusId',
    statusText: 'statusText',
    criticality: '2',
    date: Date.now(),
    comment: 'Комментарий к элементу'
  },
  {
    actArea: 'actArea',
    pathId: 'pathId,',
    stepId: 'stepId4',
    activityId: 'activityId',
    activityText: 'activityText',
    agent: 'agent',
    agentName: 'agentName',
    user: [usersMocks[4]],
    statusId: 'statusId',
    statusText: 'statusText',
    criticality: '3',
    date: Date.now(),
    comment: 'Комментарий к элементу'
  }
];
