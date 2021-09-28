import React, {Component} from 'react';
import {NavLink} from "react-router-dom";

const ReflectRoutes =  {
    homeRoute:{
        home:{
            url:
                "/",
            stateKeys:
                "home"
        }
    },
    teamMaterialsPage: {
        teamMaterials: {
            url:
                "/teamMaterials",
            stateKeys:
                "teamMaterialsPage"
        },
    },
    stakeholderAnalysis: {
        myAnalysis: {
            url:
                "/myAnalysis",
            stateKeys:
                "myAnalysis"
        },
        teamAnalysis: {
            url:
                "/teamAnalysis",
            stateKeys:
                "teamAnalysis"
        },
        individualAnalyses: {
            url:
                "/individualAnalyses",
            stateKeys:
                "individualAnalyses"
        },
        weights: {
            url:
                "/weights",
            stateKeys:
                "weights"
        },
        interestMap: {
            url:
            "/interest_map",
            stateKeys:
            "interestMap"
        },
        argumentMap: {
            url:
                "/argument_map",
            stateKeys:
                "argumentMap"
        }
    },
    problemStatement: {
        currentproblem : {
            url:
                "/current_problem",
            stateKeys:
                "currentproblem"
        },
        problemPanel : {
            url:
                "/problem",
            stateKeys:
                "problem"
        },
        problemtable : {
            url:
                "/problem_table",
            stateKeys:
                "problemtable"
        }
    },
    symphysisProposal: {
        stakeholders: {
            url:
                "/stakeholders",
            stateKeys:
                "stakeholders"
        },
        justifications : {
            url:
                "/justifications",
            stateKeys:
                "justifications"
        },
        interests: {
            url:
                "/interests",
            stateKeys:
                "interests"
        },
        proposalMap: {
            url:
                "/proposal_map",
            stateKeys:
                "proposalmap"
        },
        proposalWeights: {
            url:
                "/proposal_weights",
            stateKeys:
                "proposal_weights"
        },
        symphysisproposal: {
            url:
                "/symphysis_proposal",
            stateKeys:
                "symphysisproposal"
        }
    },
    workplanComponent: {
        workPlan: {
            url:
                "/workplan",
            stateKeys:
                "workplan"
        },
        landingPageWorkplan: {
            url:
                "/workplans",
            stateKeys:
                "workplans"
        }
    },
    projectSummary: {
        summary: {
            url:
                "/summary",
            stateKeys: "summary"
        }
    },
    user: {
        url:
            "/user",
        stateKeys:
            "user"

    },
    team: {

        url:
            "/team",
        stateKeys:
            "team"

    },
    registration: {
        url:
        "/registration",
        stateKeys:
        "registration"
    },
    newuser: {

        url:
            "/newUser",
        stateKeys:
            "newuser"

    },
    missing_expertise: {

        url:
            "/missing_expertise",
        stateKeys:
            "missing_expertise"

    },
    research_proposal: {

        url:
        "/research_proposal",
        stateKeys:
        "research_proposal"
    },
    glossary: {
        url:
            "/glossary",
        stateKeys:
            "glossary"

    },
    knowledgeBase:{
        url:
            "/knowledge_base",
        stateKeys:
            "knowledge_base"

    },
    teamInfo:{
        url:
            "/team_info",
        stateKeys:
            "team_info"
    },
    howTo:{
        url:
            "/how_to",
        stateKeys:
            "how_to"
    }


}

export default ReflectRoutes;
