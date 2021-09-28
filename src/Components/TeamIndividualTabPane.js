import React from "react";
import TeamMemberDropdownSelectorWithData from "../DataComponents/TeamMemberDropdownSelectorWithData";
import ReflectRoutes from "./ReflectRoutes";
import VisualizeStakeholdersWithRightClickData from "../DataComponents/VisualizeStakeholderWithRightClickData";
import {getDisplayName} from "./HiddenRouteReporter";

import _ from 'lodash';

class TeamIndividualTabPane  extends React.Component {

    constructor(props) {

        super(props);
        this.state = {};
        this.classObject = this.props.classObject;
    }

    selectTeamMember(info) {
       this.setState({selectedTeamMember: info});
    }


    render() {

        console.log(this.props.instructions);
        let instructions = {Stakeholders: {title: "Each individual stakeholders is shown below.", body: ""},
            Proposals: {title:"Each individual proposals is shown below.", body: ""},
            Reasons: {title:"Each individual reason is shown below.", body: ""},
            Interests: {title:"Each individual interest is shown below.", body: ""}};

        // console.log("TeamIndividualTabPane");
        // console.log("this.classObject.props.user");
        // console.log(this.classObject.props.user);
        // console.log("this.state.selectedTeamMember");
        // console.log(this.state.selectedTeamMember);
        // console.log("this.classObject");
        // console.log(this.classObject);
        // console.log("this.props.classInfo");
        // console.log(this.props.classInfo);

        let currentTeamId = _.has(this.classObject, "props.user.currentTeamId") ? this.classObject.props.user.currentTeamId : -1;
        //this.classObject.props.user.currentTeamId
        let currentProblemId = _.has(this.classObject, "props.user.currentTeam.currentProblem.id") ? this.classObject.props.user.currentTeam.currentProblem.id : -1;
        //this.props.classInfo.currentProblem.id
        return <div>

            {
               currentTeamId !== -1 ?
                <TeamMemberDropdownSelectorWithData
                    controlId="TeamMemberDrop"
                    teamId={currentTeamId}
                    onSelect={(e) => {
                        console.log("user picked!!!!!!!!!!!!!!!!!!!!!!!!")
                        this.selectTeamMember(e);
                    }}
                    selected={this.state.selectedTeamMember ? this.state.selectedTeamMember.id : null}
                    active={this.classObject.props.location.pathname.includes(ReflectRoutes.stakeholderAnalysis.individualAnalyses.url)
                    }
                />
                :
                   <div>No team assigned</div>
            }

            {
                this.state.selectedTeamMember && this.state.selectedTeamMember.user && currentProblemId !== -1 && currentTeamId !== -1 ?

                    <VisualizeStakeholdersWithRightClickData userId={this.state.selectedTeamMember.id}
                                                             d3TreeId={"individualStakeholderAnalysisWithRightClick"}
                                                             instructions={instructions}
                                                             problemId={currentProblemId}
                                                             teamId={currentTeamId}
                                                             teamQuery={false}
                                                             step={"individual"}
                                                             powerEnabled={false}
                                                             userEnabled={false}
                                                             weightEnabled={false}
                                                             readOnlyMode={true}
                                                             showClarificationsTab={this.classObject.props.showClarificationsTab}
                                                             active={this.classObject.props.location.pathname.includes(ReflectRoutes.stakeholderAnalysis.individualAnalyses.url)}
                    />

                    : <div>Could not render the selected information</div>
            }
        </div>
    }
}

TeamIndividualTabPane.displayName = `TeamIndividualTabPane(${getDisplayName(TeamIndividualTabPane)})`;

export default TeamIndividualTabPane;
