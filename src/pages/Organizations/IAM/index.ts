export enum Action {
    MANAGE = 'manage',
    ADD = 'add',
    ACCEPT = 'accept',
    MODIFY = 'modify',
    VIEW = 'view',
    
  }
  
  export enum Subject {
    ALL = 'all',
    ORGANIZATION = 'organization',
    BRANCH = 'branch',
    DEPARTMENT = 'department',
    MEMBER = 'member',
  }
  
  export const subjects = [
    // Subject.ALL,
    // Subject.ORGANIZATION,
    Subject.MEMBER,
    Subject.BRANCH,
    Subject.DEPARTMENT,
    
  ]
  
  export const actions = [
    Action.MANAGE,
    Action.ADD,
    Action.ACCEPT,
    Action.MODIFY,
    Action.VIEW,
  
  ]
