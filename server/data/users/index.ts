'use strict';

//=============================================================================
export interface AuthToken 
{
    auth: string;
}

const _mockAuthToken: AuthToken = { auth: "de2c038a-6105-4722-9838-0cdb11eb6602" };


//=============================================================================
export interface User 
{
    userId: number;
    login:  string;
    name:   string;
}


export class UserService 
{
    login(login: string, password: string): Promise<{ authToken: AuthToken, user: User }> 
    {
        return mockSendResult(
        {
            authToken: _mockAuthToken,
            user: 
            {
                userId: 123,
                login:  "laurent@bigsool.com",
                name:   "Laurent Wozniak",
            },
        });
    }
}

//=============================================================================

export enum ParticipantRole
{
    OWNER           = "owner",
    ADMIN           = "admin",
    COLLABORATOR    = "collaborator",
    WORKPACKAGE     = "workpackage",
    GUEST           = "guest"
};

export enum ParticipantInvitationState 
{
    PENDING = "pending",
    ACTIVE  = "active"
};

export interface ProjectParticipant 
{
    email:      string;
    name:       string,
    company:    string,
    jobTitle:   string,
    projectId:  number;
    role:       ParticipantRole;
    state:      ParticipantInvitationState;
};


/**
 * 
 */
export class ProjectParticipantService 
{
    /**
     * 
     */
    getParticipants(authToken: string, projectId: number): Promise<ProjectParticipant[]> 
    {
        const mockAuthTokenString = _mockAuthToken.auth.toString();
        if (authToken !== mockAuthTokenString) { return Promise.reject(new Error()); }

        return mockSendResult(this._participantsMockStorage);
    }

    
    /**
     * 
     */
    async addParticipant(authToken: string, projectId: number, email: string, name: string, company: string, jobTitle: string, role: ParticipantRole): Promise<ProjectParticipant> 
    {
        const mockAuthTokenString = _mockAuthToken.auth.toString();

        if (authToken !== mockAuthTokenString) { throw new Error(); }
        const participant: ProjectParticipant = 
        {
            email:      email,
            name:       name,
            company:    company,
            jobTitle:   jobTitle,
            projectId:  projectId,
            role:       role,
            state:      ParticipantInvitationState.PENDING
        };
        await mockSendResult(null);
        this._participantsMockStorage.push(participant);
        return participant;
    }


    /**
     * 
     */
    private _participantsMockStorage: ProjectParticipant[] =
    [
        {
            email:      "laurent@bigsool.com",
            name:       "Laurent Wozniak",
            company:    "Bigsool",
            jobTitle:   "Maitre d'oeuvre",
            projectId:  34567,
            role:       ParticipantRole.OWNER,
            state:      ParticipantInvitationState.ACTIVE
        },
        {
            email:      "florian@bigsool.com",
            name:       "Florian Girardey",
            company:    "Bigsool",
            jobTitle:   "Maitre d'oeuvre",
            projectId:  34567,
            role:       ParticipantRole.COLLABORATOR,
            state:      ParticipantInvitationState.ACTIVE
        },
        {
            email:      "thomas@bigsool.com",
            name:       "Thomas Dubois",
            company:    "Bigsool",
            jobTitle:   "Maitre d'oeuvre",
            projectId:  34567,
            role:       ParticipantRole.COLLABORATOR,
            state:      ParticipantInvitationState.PENDING
        },
        {
            email:      "mic@mac.com",
            name:       "Mic Fast",
            company:    "Électricité Fast",
            jobTitle:   "Électricité",
            projectId:  34567,
            role:       ParticipantRole.WORKPACKAGE,
            state:      ParticipantInvitationState.ACTIVE
        },
        {
            email:      "rick@gallant.com",
            name:       "Eric Gallant",
            company:    "Peinture Gallant",
            jobTitle:   "Peinture",
            projectId:  34567,
            role:       ParticipantRole.WORKPACKAGE,
            state:      ParticipantInvitationState.ACTIVE
        },
        {
            email:      "gg@gg-plomberie.com",
            name:       "Guillaume Gonzales",
            company:    "Gonzales peinture",
            jobTitle:   "Plomberie",
            projectId:  34567,
            role:       ParticipantRole.WORKPACKAGE,
            state:      ParticipantInvitationState.ACTIVE
        },
        {
            email:      "info@cesar-btp.com",
            name:       "JF Cesar",
            company:    "Cesar BTP",
            jobTitle:   "Terrassement",
            projectId:  34567,
            role:       ParticipantRole.WORKPACKAGE,
            state:      ParticipantInvitationState.PENDING
        },
        {
            email:      "demo@archipad.Com",
            name:       "Fanny Marjorie",
            company:    "Archipad",
            jobTitle:   "Etanchéité",
            projectId:  34562,
            role:       ParticipantRole.WORKPACKAGE,
            state:      ParticipantInvitationState.ACTIVE
        }
    ];

}

//=============================================================================
function mockSendResult<T>(result: T): Promise<T> 
{
    return new Promise((resolve, reject) => 
    {
        setTimeout(() => result, 1000);
        resolve(result);
    });
}