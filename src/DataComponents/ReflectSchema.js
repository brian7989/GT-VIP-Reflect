import React, {Component} from 'react';


import {gql} from 'react-apollo';


class ReflectSchema extends Component {


    static teamRule = gql`
        fragment TeamRuleMembers on TeamRule {      
            nodeId
            id
            rule
            teamId            
        }
    `;

    static problem = gql`
        fragment ProblemMembers on Problem {
            nodeId
            id
            title
            description
            bibliographyUrl
            createdAt
            updatedAt
            touchedAt
            prevTouchedAt
        }
    `;


    static workplan = gql`
        fragment WorkplanMembers on Workplan {
            nodeId
            id
            name
            description
            tag
        }            
    `;


    static knowledgeReference = gql`
        fragment KnowledgeReferenceMembers on KnowledgeReference {
            nodeId
            id
            title
            abstract
            docUrl
            userId
            teamId
        }
    `;


    static phase = gql`
        fragment PhaseMembers on Phase {
            nodeId
            id
            name
            description
            dueDate
            order
        }
    `;

    static module = gql`
        fragment ModuleMembers on Module {
            nodeId
            id
            name
            description
            dueDate
            order
            hide
        }
        ${ReflectSchema.problem}
    `;

    /*
    static module = gql`
        fragment ModuleMembers on Module {
            nodeId
            id
            name
            description
            dueDate
            order
            currentProblem {
                ...ProblemMembers
            }
        }
        ${ReflectSchema.problem}
    `;
    */

    static reflectClass = gql`
        fragment ClassMembers on Class {
            nodeId
            id
            name 
            description
            semester
            currentModuleId
            currentPhaseId
            currentWorkplanId
            clientStateId
            currentProblemId          
            currentWorkplan {
                ...WorkplanMembers
            }
            currentPhase {
                ...PhaseMembers
            }
            currentModule {
                ...ModuleMembers
            }
            currentProblem {
                ...ProblemMembers
            }        
         }
        ${ReflectSchema.workplan}   
        ${ReflectSchema.phase}   
        ${ReflectSchema.module}
    `;

    static user = gql`
        fragment UserMembers on User {
            nodeId
            id
            username
            email
            role
            firstName
            middleName
            lastName
            fullName
            active 
            currentStakeholderId
            currentTeamId
            currentClassId
            termsConditionsSignoff
            institution
            status
            language
        }
    `;


    static teamUser = gql`
        fragment TeamUserMembers on TeamUser {
            nodeId
            teamId
            userId
        }
    `;


    static proposal = gql`
        fragment ProposalMembers on Proposal {
            nodeId
            id
            proposalText
            isActive
            ranking
            weight
            userId
            problemId
            step
            teamId
            parentProposalId
            proposalUrl
            note
            displayOrder
        }
    `;

    static teamMinimum = gql`
        fragment TeamMinimumMembers on Team {
            nodeId
            id
            name
            description
            selectedProblemId
            selectedSymphysisProposalId   
            classId  
            status      
        }
    `
    ;

    static team = gql`
        fragment TeamMembers on Team {
            ...TeamMinimumMembers
            selectedProblem: problemBySelectedProblemId {
                ...ProblemMembers
            }
            currentProblem: problemByCurrentProblemId {
                ...ProblemMembers
            }
            
            selectedSymphysisProposal: proposalBySelectedSymphysisProposalId {
                ...ProposalMembers
            }
            users: usersByTeamId {
                nodes {
                    ...UserMembers
                }
            }
            class: classByClassId {
                ...ClassMembers
            }
           
        }
        ${ReflectSchema.teamMinimum}
        ${ReflectSchema.user}
        ${ReflectSchema.proposal}
        ${ReflectSchema.reflectClass}

    `;



    static deepUser = gql`
        fragment DeepUserMembers on User {
            ...UserMembers
            currentTeam {
                ...TeamMembers
            }
            currentClass {
                ...ClassMembers
            }
        }
        ${ReflectSchema.user}
        ${ReflectSchema.team}
        ${ReflectSchema.reflectClass}
    `;


    static material = gql`
        fragment MaterialMembers on Material {
                nodeId
                id
                type
                item
                url
                order          
                teamId
                classId          
        }
    `;


    static stakeholder = gql`
        fragment StakeholderMembers on Stakeholder {
                nodeId
                id
                name
                isActive
                excludeFromSymphysis
                power
                problemId
                teamId
                userId
                step
        }
    `;




    static stakeholderProposal = gql`
        fragment StakeholderProposalMembers on StakeholderProposal {
            nodeId
            stakeholderId
            proposalId
            weight
            isOwner
        }
    `;

    static reason = gql`
        fragment ReasonMembers on Reason {
            nodeId
            id
            reasonText
            proposalId
            userId
            isActive
        }
    `;


    static interest = gql`
        fragment InterestMembers on Interest {
            nodeId
            id
            interestText
            salience
            isActive
            userId
            user: userByUserId {
                ...UserMembers
            }
            x
            y
            reasonId
        }
        ${ReflectSchema.user}
    `;

    static deepInterest = gql`
        fragment DeepInterestMembers on Interest {
                ...InterestMembers
          
        }
        ${ReflectSchema.interest}
    `;


    static deepReason = gql`
        fragment DeepReasonMembers on Reason {
            ...ReasonMembers
            interests: interestsByReasonId {
                nodes {
                    ...DeepInterestMembers
                }
            }
        }
        ${ReflectSchema.reason}
        ${ReflectSchema.deepInterest}
    `;


    static deepProposal = gql`
        fragment DeepProposalMembers on Proposal {
            ...ProposalMembers
            reasons: reasonsByProposalId {
                nodes {
                    ...DeepReasonMembers
                }
            }
        }
        ${ReflectSchema.proposal}
        ${ReflectSchema.deepReason}
    `;


    static deepOnProposalStakeholderProposal = gql`
        fragment DeepOnProposalStakeholderProposalMembers on StakeholderProposal {
            ...StakeholderProposalMembers
            proposal:proposalByProposalId {
                ...DeepProposalMembers                       
            }
        }
        ${ReflectSchema.stakeholderProposal}
        ${ReflectSchema.deepProposal}
    `;

    static deepStakeholder = gql`
        fragment DeepStakeholderMembers on Stakeholder {
                ...StakeholderMembers
                stakeholderProposals: stakeholderProposalsByStakeholderId(condition:{isOwner:true}) {
                    nodes {
                        ...DeepOnProposalStakeholderProposalMembers
                    }
                }
        }
        ${ReflectSchema.stakeholder}
        ${ReflectSchema.deepOnProposalStakeholderProposal}
    `;

    static argumentMapInfo = gql`
        fragment ArgumentMapInfo on ArgumentMap {
            nodeId,
            id,
            title,
            isActive
        }
        `;

    static argumentClaimInfo = gql`
        fragment ArgumentClaimInfo on ArgumentClaim {
            nodeId,
            id,
            description
        }
    `;

    static argumentReasoningInfo = gql `
        fragment ArgumentReasonInfo on ArgumentReason {
            nodeId,
            id,
            description
        }
    `;

    // static argumentReasonWrapperOnReason = gql `
    //     fragment ArgumentReasonWrapperOnReason on ArgumentReason {
    //         ...ArgumentReasonInfo
    //         argumentReasonWrappersByParentArgumentReasonId{
    //             nodes {
    //                 ...ArgumentReasonOnReasonWrapper
    //             }
    //         }
    //     }
    //     ${ReflectSchema.argumentReasoningInfo}
    //     ${ReflectSchema.argumentReasonWrappers}
    // `;

    static argumentReasonWrappers = gql `
        fragment ArgumentReasonOnReasonWrapper on ArgumentReasonWrapper {
            nodeId,
            id,
            argumentReasonsByArgumentReasonWrapperId {
                nodes {
                    ...ArgumentReasonInfo
                }
            }
        }
        ${ReflectSchema.argumentReasoningInfo}
    `;

    static argumentReasonWrapperOnClaim = gql `
        fragment ArgumentReasonWrapperOnClaim on ArgumentClaim {
            argumentReasonWrappersByParentArgumentClaimId{
                nodes{
                    ...ArgumentReasonOnReasonWrapper
                }
            }
        }
        ${ReflectSchema.argumentReasonWrappers}
    `;

    static argumentMapClaim = gql`
        fragment ArgumentMapClaim on ArgumentMap {
            ...ArgumentMapInfo
            argumentClaimsByArgumentMapId {
                nodes{
                    ...ArgumentClaimInfo
                  }
              }
        }
        ${ReflectSchema.argumentMapInfo}
        ${ReflectSchema.argumentClaimInfo}
    `;



}


export default ReflectSchema;
