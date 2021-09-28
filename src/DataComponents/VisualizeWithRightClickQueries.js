import {gql, graphql} from "react-apollo";
import ReflectSchema from "./ReflectSchema";




const StakeholdersQuery = gql`
query stakeholdersByUserId($userId:Int!, $step:String!) {
  userById(id:$userId) {
    ...UserMembers
    stakeholdersByUserId(condition:{step:$step}) {
      totalCount
      nodes {
        ...StakeholderMembers
        user: userByUserId {
           ...UserMembers
        }
      }
    }
  }
}
${ReflectSchema.user}
${ReflectSchema.stakeholder}
`;

//
// {
//     "userId": 374
// }


const TeamStakeholdersQuery = gql`
query stakeholdersByUsersTeam($userId:Int!, $step:String!){
  
  userById(id:$userId) {
    ...UserMembers
    currentTeam {
      ...TeamMembers
      stakeholdersByTeamId(condition:{step:$step}) {
        totalCount
        nodes {
          ...StakeholderMembers       
          user: userByUserId {
            ...UserMembers
          }
        }
      }
    }
  }
  
}
${ReflectSchema.user}
${ReflectSchema.team}
${ReflectSchema.stakeholder}
`;



const InterestsQuery = gql`
query interestsByReasonId($reasonId:Int!) {
  
  reasonById(id:$reasonId) {
    id
    interestsByReasonId {
      totalCount
      nodes {
        ...InterestMembers
        user: userByUserId {
           ...UserMembers
        }
        knowledgeReference : knowledgeReferencesByInterestId {
            nodes { 
                ...KnowledgeReferenceMembers
             }
        }
      }
    }
  }
}
${ReflectSchema.user}
${ReflectSchema.interest}
${ReflectSchema.knowledgeReference}
`;


const CreateInterestMutation =  gql`
mutation createInterest($createInterestInput:CreateInterestInput!)
{
  createInterest(input:$createInterestInput) {
    interest {
      ...InterestMembers
      user: userByUserId {
        ...UserMembers
      }
    }   
  } 
}
${ReflectSchema.user}
${ReflectSchema.interest}
`;

const UpdateInterestMutation = gql`
mutation updateInterestById($updateInterestByIdInput:UpdateInterestByIdInput!)
{
  updateInterestById(input:$updateInterestByIdInput) {

    interest {
        ...InterestMembers
        user: userByUserId {
            ...UserMembers
        }
    }

  }
}
${ReflectSchema.user}
${ReflectSchema.interest}
`;


const DeleteInterestMutation = gql`
mutation deleteInterestById($deleteInterestByIdInput:DeleteInterestByIdInput!)
{
  deleteInterestById(input:$deleteInterestByIdInput) {

    deletedInterestId

  }
}
`;


// ======== for proposals ======================

const StakeholderProposalQuery = gql`
query stakeholderProposalByStakeholderId($stakeholderId:Int!)
{
  stakeholderById(id:$stakeholderId) {
    ...StakeholderMembers
    stakeholderProposalsByStakeholderId(condition:{isOwner:true}) {
      totalCount
      nodes {
        ...StakeholderProposalMembers
        proposalByProposalId {
          ...ProposalMembers
          user: userByUserId {
            ...UserMembers
          }
          knowledgeReference : knowledgeReferencesByProposalId {
            nodes { 
                ...KnowledgeReferenceMembers
             }
          }
        }       
      }
    }
    
  }

}
${ReflectSchema.user}
${ReflectSchema.stakeholder}
${ReflectSchema.stakeholderProposal}
${ReflectSchema.proposal}
${ReflectSchema.knowledgeReference}
`;



const CreateProposalMutation =  gql`
mutation createProposal($createProposalInput:CreateProposalInput!)
{
  createProposal(input:$createProposalInput) {
    proposal {
      nodeId
      id
      userId
      problemId
      proposalText
      ranking
      weight
      isActive
      hasComponents      
    }   
  } 
}
`;


const CreateStakeholderProposalMutation = gql`
mutation createStakeholderProposal($createStakeholderProposalInput:CreateStakeholderProposalInput!)
{
  createStakeholderProposal(input:$createStakeholderProposalInput) {
    stakeholderProposal {
      ...StakeholderProposalMembers
      proposalByProposalId{
        ...ProposalMembers
        user: userByUserId {
          ...UserMembers
        }
      }
      stakeholderByStakeholderId {
        ...StakeholderMembers
      }
      
    }
    
  }
}
${ReflectSchema.user}
${ReflectSchema.stakeholder}
${ReflectSchema.stakeholderProposal}
${ReflectSchema.proposal}
`;



const DeleteStakeholderProposalMutation = gql`
mutation deleteStakeholderProposalByProposalIdAndStakeholderId($deleteStakeholderProposalByProposalIdAndStakeholderIdInput:DeleteStakeholderProposalByProposalIdAndStakeholderIdInput!)
{
  deleteStakeholderProposalByProposalIdAndStakeholderId(input:$deleteStakeholderProposalByProposalIdAndStakeholderIdInput)
  {
    deletedStakeholderProposalId
  }
}
`;



const UpdateStakeholderProposalMutation = gql`
mutation updateStakeholderProposalByIdAndStakeholderId($updateStakeholderProposalByProposalIdAndStakeholderIdInput:UpdateStakeholderProposalByProposalIdAndStakeholderIdInput!)
{
  updateStakeholderProposalByProposalIdAndStakeholderId(input:$updateStakeholderProposalByProposalIdAndStakeholderIdInput)
  {
    stakeholderProposal {
      ...StakeholderProposalMembers
      user: userByUserId {
         ...UserMembers
      }
    }
  }
}
${ReflectSchema.user}
${ReflectSchema.stakeholderProposal}
`;



const UpdateProposalMutation = gql`
mutation updateProposalById($updateProposalByIdInput:UpdateProposalByIdInput!)
{
  updateProposalById(input:$updateProposalByIdInput) {
    proposal {
      ...ProposalMembers
      user: userByUserId {
         ...UserMembers
       }
    }

  }
}
${ReflectSchema.user}
${ReflectSchema.proposal}
`;


// ======== for Reasons ======================

const ReasonsQuery = gql`
query reasonsByProposalId($proposalId:Int!) {
  proposalById(id:$proposalId) {
    ...ProposalMembers
    reasonsByProposalId {
      totalCount
      nodes {
        ...ReasonMembers
        user: userByUserId {
           ...UserMembers
        }
        knowledgeReference : knowledgeReferencesByReasonId {
            nodes { 
                ...KnowledgeReferenceMembers
             }
          }
      }
    }
  }
}
${ReflectSchema.user}
${ReflectSchema.proposal}
${ReflectSchema.reason}
${ReflectSchema.knowledgeReference}

`;

const CreateReasonMutation =  gql`
mutation createReason($createReasonInput:CreateReasonInput!)
{
  createReason(input:$createReasonInput) {
    reason {
      ...ReasonMembers
      user: userByUserId {
         ...UserMembers
      }
    }   
  } 
}
${ReflectSchema.user}
${ReflectSchema.reason}
`;


const DeleteReasonMutation = gql`
mutation deleteReasonById($deleteReasonByIdInput:DeleteReasonByIdInput!)
{
  deleteReasonById(input:$deleteReasonByIdInput) {

    deletedReasonId

  }
}
`;


const UpdateReasonMutation = gql`
mutation updateReasonById($updateReasonByIdInput:UpdateReasonByIdInput!)
{
  updateReasonById(input:$updateReasonByIdInput) {

    reason {
        ...ReasonMembers
        user: userByUserId {
           ...UserMembers
        }
    }

  }
}
${ReflectSchema.user}
${ReflectSchema.reason}
`;


//====== for stakeholders =====

const CreateStakeholderMutation = gql`
mutation createStakeholder($createStakeholderInput:CreateStakeholderInput!)
{
  createStakeholder(input:$createStakeholderInput) {
    stakeholder {
        ...StakeholderMembers
        user: userByUserId {
           ...UserMembers
        }
    }
  }
}
${ReflectSchema.user}
${ReflectSchema.stakeholder}
`;

const DeleteStakeholderMutation = gql`
mutation deleteStakeholderById($deleteStakeholderByIdInput:DeleteStakeholderByIdInput!)
{
  deleteStakeholderById(input:$deleteStakeholderByIdInput) {

    deletedStakeholderId

  }
}
`;



const UpdateStakeholderMutation = gql`
mutation updateStakeholderById($updateStakeholderByIdInput:UpdateStakeholderByIdInput!)
{
  updateStakeholderById(input:$updateStakeholderByIdInput) {

    stakeholder {
        ...StakeholderMembers
        user: userByUserId {
           ...UserMembers
        }
    }

  }
}
${ReflectSchema.user}
${ReflectSchema.stakeholder}
`;



const OnlyProposalsQuery = gql`
query allProposals($teamId:Int!, $problemId:Int!, $step:String!){
  
    allProposals(condition:{teamId: $teamId, problemId:$problemId, step:$step}) {
      
      nodes {     
        ...ProposalMembers
        user: userByUserId {
            ...UserMembers
        }
    
      }
      
    }
}
${ReflectSchema.proposal}
${ReflectSchema.user}
`;



export {CreateProposalMutation, OnlyProposalsQuery, UpdateProposalMutation,  StakeholdersQuery, TeamStakeholdersQuery, InterestsQuery, CreateInterestMutation, UpdateInterestMutation, DeleteInterestMutation,
    StakeholderProposalQuery, CreateStakeholderProposalMutation, UpdateStakeholderProposalMutation, DeleteStakeholderProposalMutation,
    ReasonsQuery, CreateReasonMutation, UpdateReasonMutation, DeleteReasonMutation, CreateStakeholderMutation, UpdateStakeholderMutation,
    DeleteStakeholderMutation
}
