export enum Action {
    MANAGE = 'manage',
    CREATE = 'create',
    READ = 'read',
    UPDATE = 'update',
    DELETE = 'delete',
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
    Subject.BRANCH,
    Subject.DEPARTMENT,
    // Subject.MEMBER,
  ]
  
  export const actions = [
    Action.MANAGE,
    Action.CREATE,
    Action.READ,
    Action.UPDATE,
    Action.DELETE,
  ]
  ///?