export interface IcreatedOrg {
    id: string;
    name: string;
    organizationUniqueName: string;
    invitation: string;
    created: string;
    created_by: string;
    created_at: string;
    alias: string;
    membersCount: number;
}

export interface ICreateOrgModalProps {
    isOpen: boolean;
    closeModal(): void;
} 

export interface IgetOrg {
    alias: string;
    created: string;
    created_at: string;
    created_by: string;
    id: string;
    invitation: string;
    membersCount: number;
    modified: string;
    modified_at: string;
    name: string;
}