import React, {Component} from 'react';

const InstructionsData = {

    Team_Overview: {
        title:
            <div>
                Team page
            </div>,
        body:
            <div>
                <p>
                    Here you find basic information about your team.
                </p>
            </div>
    },
    Team_Members: {
        title:
            <div>
                Team members
            </div>,
        body:
            <div>
                <p>
                    These are the members of your team:
                </p>
            </div>
    },
    Team_Rules: {
        title:
            <div>
                Commitments
            </div>,
        body:
            <div>
                <p>
                    Enter rules that describe the work ethics you agree upon. Think about the worst team
                    experience you ever had. Formulate rules so that this does not happen again. If you experience
                    problems later,
                    talk about them, and add further rules.
                </p>
            </div>
    },
    Team_WickedProblemFormulation: {
        title:
            <div>
                Instructions
            </div>,
        body:
            <div>
                <p>
                    It is important to address the problem on a level that is both adequate and feasible for your team.
                    Below you have the option to enter either a “more specific problem formulation” if you think
                    the problem should be
                    addressed on a more narrow level, or a “more general problem formulation” if
                    you think it should be addressed with a broader scope.
                </p>
                <p>
                    For example, a project on “Robotic caregivers and the elderly” might be divided into several
                    sub-problems: “Robots in nursery homes,” “Robots that only send an alarm in certain circumstances,”
                    “Robots that are firmly installed for particular purposes, e.g. to help with taking a bath.” Write
                    down those possibilities so that you can debate in your team whether you should just work on one of
                    those sub-problems.
                </p>
                <p>
                    On the other hand, you might think that the problem “Robotic caregivers and the elderly” should
                    better be discussed on a more general level such as: “Given that certain populations in the world
                    are rapidly aging, especially in the United States, Western Europe, and Japan, what can be done to
                    address the health care needs of a rising number of elderly?”
                </p>
                <p>
                    A problem formulation should always end with a question mark. But it should NEITHER be a question
                    that can be answered by “yes” or “no,” NOR a question that offers only alternatives to act (“should
                    this or that be done?”).
                </p>
                <p>
                    After the question mark, describe a particular setting that you imagine for your team. A setting
                    should be something like this:
                </p>

                <p style={{marginLeft: '1em'}}>

                    “Imagine you are a task force that is charged with drafting a law that regulates [whatever your
                    problem is]. What should such a law include? The task includes to take into account the broadest
                    variety of possible proposals--based on a stakeholder analysis--and then to develop what seems
                    to be
                    the most convincing proposal.”

                </p>
                <p>

                    In the introduction of your problem description, it might be important that you describe the status
                    quo. What exactly is the situation right now? This is important because any suggestion for how to
                    solve the problem needs to refer to a specific status of the problem.

                </p>
            </div>
    },

    Team_ResearchAssignments: {
        title:
            <div>
                Divide labor for studying stakeholders more deeply
            </div>,
        body:
            <div>
                <p>
                    Which stakeholders are farthest apart according to your stakeholder analysis? That is, among which
                    stakeholders can the greatest conflicts be expected? These stakeholders need to be better
                    understood.
                    What are their motives, interests, worldviews, and values? In order to figure out which stakeholders
                    should be studied more closely, click here to see a “Stakeholder map” which has been created based
                    on
                    the weights you entered earlier (not yet available). On this graphical representation, all the
                    stakeholders you identified are arranged according to how close they are to each other.
                </p>
                <p>
                    Identify those stakeholders that are farthest apart and important enough to be studied in more
                    detail.
                    Divide the labor so that each team member studies one stakeholder more thoroughly before the next
                    team meeting.
                </p>

            </div>
    },

    StakeholderAnalysis: {

        Team: {

            clarifications: {
                title:
                    <div>Clarify your position </div>,
                body:
                    <div>
                        <p> As someone who is affected by any decision, or as someone who affects decisions, you are a “stakeholder.”
                            Click on “+New” below and enter a term that best describes you as a stakeholder (e.g., “Citizen,” or: “Citizen with an interest in …”).
                        </p>

                        <p>
                            After adding a stakeholder, add one or more proposals. What do you think this stakeholder would propose should be done?
                        </p>

                        Keep the following in mind:
                        <ul>
                            <li>When you write proposals, make sure that all components of the wicked problem are addressed. Enter for each component of the problem one distinct proposals.
                            </li>
                            <li>Should there be more proposals? Add them as well.
                            </li>

                        </ul>

                    </div>
            },

            Stakeholders: {
                title:
                    <div>
                        Identify stakeholders in your team
                    </div>,
                body:
                    <div>

                        <p>
                            A <b>stakeholder</b> is someone who has a stake in an issue, a particular interest, and who either affects or is affected by decisions on this issue. Add all the stakeholders that you can think of below. Discuss all entries in your team.
                        </p>
                        <p>
                            To <b>add more stakeholders</b>, hover over a stakeholder and select “Add Stakeholders” from the menu.
                        </p>
                        <p>
                            <b>After adding a stakeholder</b>, add one or more proposals. What do you think this stakeholder would propose should be done? After that: reasons for these proposals.
                        </p>
                        <p>
                            For the <b>entire stakeholder analysis</b>, keep the following in mind:
                        </p>


                        <ul>
                            <li>
                                If proposals of a particular stakeholder seem to contradict each other, divide this stakeholder into two or more stakeholders that are more specifically defined. Simply click on “New” and enter new information or copy and paste.
                            </li>
                            <li>
                                Are there any gaps in your stakeholder analysis? Are all components of your wicked problem addressed? Did you forget any stakeholders?
                            </li>
                            <li>
                                Are there any gaps in your stakeholder analysis? Did you forget any stakeholders? Add
                                them
                                to your analysis.
                            </li>
                            <li>
                                Should there be more proposals?
                            </li>
                            <li>
                                Are the reasons convincing? Clarify them.
                            </li>
                            <li>
                                Are all proposals justified by reasons, and are the reasons convincing? Clarify them.
                            </li>
                            <li>
                                If texts in the visualization overlap, take this as an indication that your text entries are too long. Cut them into pieces or shorten them.
                            </li>
                        </ul>

                    </div>
            },
            Proposals: {
                title:
                    <div>
                        What would this stakeholder <b>propose</b> should be done?
                    </div>,
                body:
                    <div>
                        <p>
                            A <b>Proposal</b> is a statement that describes what should be done to solve the problem.
                            Write down for each stakeholder what this stakeholder would propose should be done. But
                            do not mention the stakeholder in your formulation because later proposals will be
                            assessed by all stakeholders. Do not write “The elderly propose that robotic devices
                            must not be used for their care unless ...,” but: “Robotic devices may not be used for
                            caring for the elderly unless ...”.
                        </p>
                        <p>
                            Formulate many short proposals instead of one large one. Focus just on the proposal;
                            reasons will be added later. Proposals of one stakeholder must not contradict each other.
                            If you have contradicting proposals, you need to divide the
                            stakeholder in two more specifically defined stakeholders, each holding one of these proposals.
                        </p>

                        <p>
                            After adding proposals, add reasons for each proposal.
                        </p>
                    </div>
            },
            Reasons: {
                title:
                    <div>
                        <b>Why</b> would a stakeholder propose what they propose?
                    </div>,
                body:
                    <div>
                        <p>
                            Enter reasons for each proposal.
                        </p>
                        <p>
                            After you are done, add interests and values that can be assumed to motivate the reasons.
                        </p>
                    </div>


            },
            Interests: {

                title:
                    <div>
                        <p>Interests, values, and goals</p>
                    </div>,
                body:
                    <div>
                        <p>
                            What are the needs and desires that stakeholders want to see fulfilled, the goals
                            they are pursuing, and the values that motivate them? What do they want? Enter only
                            single concepts such as “privacy,” “safety,” or very short descriptions. Generate these
                            concepts and descriptions from the reasons.
                        </p>

                        <p>
                            The reasons should always be formulated as complete sentences that justify what the stakeholder
                            proposes should be done. The Interests and values, by contrast, reduce these reasons to just one
                            idea. Interests and values are more general abstractions from the reasons. The formulation of
                            interests and values is important because it will be used later for a visualization that will
                            support your work on the symphysis proposal.
                        </p>
                    </div>
            },
            TeamIndividualAnalysis: {
                title:
                    <div>
                        Analyses of team members
                    </div>,
                body:
                    <div>
                        <p>
                            Below you have access to the all the stakeholder analyses that each member of your team
                            developed.
                        </p>
                    </div>
            },
            Weighting: {
                title:
                    <div>
                        How much does each stakeholder like or dislike every proposal?
                    </div>,
                body:
                    <div>
                        <p>
                            In order to determine how much each stakeholder would favor or disfavor each proposal,
                            enter weights in the table below (from +3 “strongly support” to -3 “strongly disapprove”).
                            The Reflect! platform will later use these weights to create graphical representations of
                            all stakeholders and proposals.
                        </p>
                        <p>
                            You will have controversies in your team about the weights. These controversies are
                            important to improve your work. They can have two different reasons. Understanding
                            them should lead to specific changes in your stakeholder analysis. Go back and realize those
                            changes.
                        </p>
                        <ol>
                            <li>
                                If you have rather complex proposals, you will see that stakeholders will like certain <b>components</b> of such a proposal but not others. To get a more precise understanding of
                                this situation, the proposals that you formulated earlier need to be divided into their
                                smallest possible components so that it becomes clear what exactly each stakeholder
                                favors or disfavors. Go back to your Stakeholder Analysis and refine it accordingly
                                by adding new rows for proposals and breaking proposals into parts.
                            </li>
                            <li>
                                Controversies can also be caused by the fact that you don’t yet have a shared understanding
                                about who the stakeholders really are, what exactly it is they are proposing, and what your
                                understanding of the wicked problem is. It is important that you discuss all these questions.
                                You need to develop a shared understanding. Use the discussion about the weights to achieve
                                this, and use your insights to revise the problem formulation and the stakeholder analysis
                                as needed. Keep in particular the following in mind:
                            </li>
                        </ol>
                        <div style={{marginLeft: '1em'}}>
                            <ul>
                                <li>
                                    It is often important to narrow down the wicked problem and to focus only on one specific
                                    formulation of the problem. For example, stakeholders might think about geoengineering
                                    differently depending on the question whether this intervention into the climate is done
                                    by spraying sulfates into the stratosphere, putting iron into the ocean, or planting trees.
                                    You need to discuss in your team how to specify the problem so that you can agree on the
                                    weights.
                                </li>
                                <li>
                                    Refine your descriptions of the stakeholders so that you can agree on the weights a
                                    particular stakeholder would assign to a particular proposal.
                                </li>
                                <li>
                                    If you have two proposals for one stakeholder that contradict each other, then you need
                                    to divide this stakeholder into two more specifically defined stakeholders. Nobody will
                                    propose contradictory things.
                                </li>
                                <li>
                                    Sometimes the proposals need to be refined.
                                </li>
                                <li>
                                    When you discuss the weights, you will frequently talk about specific reasons why a
                                    stakeholder might favor or reject a particular proposal. If so, go back to the Stakeholder
                                    Analysis Table and add them there.
                                </li>
                            </ul>
                        </div>
                    </div>
            },
            Justifications: {
                title:
                    <div>
                        TODO
                    </div>,
                body:
                    <div>
                        <p>
                            TODO
                        </p>
                    </div>
            },
            PresentationJustifications: {
                title:
                    <div>
                        TODO
                    </div>,
                body:
                    <div>
                        <p>
                            TODO
                        </p>
                    </div>
            },

        },

        Individual: {

            Stakeholders: {
                title:
                    <div>
                        Identify stakeholders
                    </div>,
                body:
                    <div>
                        <p>
                            A <b>stakeholder</b> is someone who has or should have a particular interest in the outcome of a decision and who either affects or is affected by this decision. Stakeholders have a stake in the issue. Add all the stakeholders that you can think of below. When you are listing the stakeholders, also think about who the stakeholders interact with. These additional people might also be stakeholders.
                        </p>

                        <p>
                            To <b>add more stakeholders</b>, hover over a stakeholder and select “Add Stakeholders” from the menu.

                        </p>

                        <p>
                            <b>After adding a stakeholder</b>, add one or more proposals. What do you think this stakeholder would propose should be done? After that: reasons for these proposals.

                        </p>

                        <p>
                            For the <b>entire stakeholder analysis</b>, keep the following in mind:
                        </p>


                        <ul>
                            <li>If proposals of a particular stakeholder seem to contradict each other, divide this stakeholder into two or more stakeholders that are more specifically defined. Simply click on “New” and enter new information or copy and paste.</li>
                            <li>Are there any gaps in your stakeholder analysis? Are all components of your wicked problem addressed? Did you forget any stakeholders?</li>
                            <li>Should there be more proposals?</li>
                            <li>Are all proposals justified by reasons, and are the reasons convincing? Clarify them.</li>
                            <li>If texts in the visualization overlap, take this as an indication that your text entries are too long. Cut them into pieces or shorten them.</li>

                        </ul>

                    </div>
            },
            Proposals: {
                title:
                    <div>
                        What would this stakeholder <b>propose</b> should be done?
                    </div>,
                body:
                    <div>
                        <p>
                            A <b>Proposal</b> is a statement that
                            describes what should be done to solve the problem. Write down for each stakeholder what
                            this
                            stakeholder would propose should be done.
                        </p>

                        <p>
                            Formulate many short proposals instead of one large one. Focus just on the proposal;
                            reasons will be added later. Proposals of one stakeholder must not contradict each other.
                            If you have contradicting proposals, you need to divide the
                            stakeholder in two more specifically defined stakeholders, each holding one of these proposals.
                        </p>

                        <p>
                            After adding proposals, add reasons for each proposal
                        </p>

                    </div>
            },
            Reasons: {

                title:
                    <div>
                        <b>Why</b> would a stakeholder propose what they propose?
                    </div>,
                body:
                    <div>
                        <p>
                            Enter reasons for each proposal.
                        </p>
                        <p>
                            After you are done, add interests and values that can be assumed to motivate the reasons.
                        </p>
                    </div>

            },
            Interests: {
                title:
                    <div>
                        <p>Interests, values, and goals</p>
                    </div>,
                body:
                    <div>
                        <p>
                            What are the needs and desires that stakeholders want to see fulfilled, the goals
                            they are pursuing, and the values that motivate them? What do they want? Enter only
                            single concepts such as “privacy,” “safety,” or very short descriptions. Generate these
                            concepts and descriptions from the reasons.
                        </p>

                        <p>
                            The reasons should always be formulated as complete sentences that justify what the stakeholder
                            proposes should be done. The Interests and values, by contrast, reduce these reasons to just one
                            idea. Interests and values are more general abstractions from the reasons. The formulation of
                            interests and values is important because it will be used later for a visualization that will
                            support your work on the symphysis proposal.
                        </p>
                    </div>
            },
            TeamIndividualAnalysis: {
                title:
                    <div>
                        NOT USED
                    </div>,
                body:
                    <div>
                        <p>
                            NOT USED
                        </p>
                    </div>
            },
            Weighting: {
                title:
                    <div>
                        NOT USED
                    </div>,
                body:
                    <div>
                        <p>
                            NOT USED
                        </p>
                    </div>
            },
            Justifications: {
                title:
                    <div>
                        TODO
                    </div>,
                body:
                    <div>
                        <p>
                            TODO
                        </p>
                    </div>
            },
            PresentationJustifications: {
                title:
                    <div>
                        TODO
                    </div>,
                body:
                    <div>
                        <p>
                            TODO
                        </p>
                    </div>
            },


        },


        Symphysis: {

            Stakeholders: {
                title:
                    <div>
                        Which of your stakeholders are still relevant?
                    </div>,
                body:
                    <div>
                        <p>
                            Depending on your most recent problem formulation, make sure that all those stakeholders are
                            "active" that should be taken into account. Click <a target="_blank" href="/team_stakeholders/stakeholders">here</a> if you would like to change the list of stakeholders.
                        </p>

                    </div>
            },
            Proposals: {
                title:
                    <div>
                        Work here on your Symphysis Proposal
                    </div>,
                body:
                    <div>
                        <p>
                            Start here with formulating a series of drafts for possible symphysis proposals. At any time,
                            you can change the selection of the draft you think is best. Whatever you select will be used
                            later for assessment from the stakeholders’ points of view.
                        </p>
                        <p>
                            You should consider to divide the labor on the symphysis proposal by doing further individual
                            research. Don’t forget to update the Knowledge Base and the various tables if you do further
                            research.
                        </p>

                        <p>For suggestions on how to develop a symphysis proposal: <a target="_blank" href="http://reflect.gatech.edu/how-to-develop-a-symphysis-proposal/">read these suggestions</a>.</p>

                    </div>
            },
            Reasons: {
                title:
                    <div>
                        NA
                    </div>,
                body:
                    <div>
                        <p>
                            NA
                        </p>
                    </div>


            },
            Interests: {
                title:
                    <div>
                        NA
                    </div>,
                body:
                    <div>
                        <p>
                            NA
                        </p>
                    </div>
            },
            TeamIndividualAnalysis: {
                title:
                    <div>
                        NA
                    </div>,
                body:
                    <div>
                        <p>
                            NA
                        </p>
                    </div>
            },
            Weighting: {
                title:
                    <div>
                        How much does each stakeholder like or dislike the final proposal?
                    </div>,
                body:
                    <div>
                        <p>
                            If all weights are positive or neutral, proceed to the next step. If not, continue working on this
                            problem (divide labor into individual homework or sub-teams as you see fit). If you think there is
                            fundamental disagreement, distinguish two alternative proposals and formulate them so that one group
                            of stakeholders could agree on one proposal, and another one on the other.
                        </p>
                    </div>
            },
            projectSummary: {
                title:
                    <div>
                        Instructions
                    </div>,
                body:
                    <div>

                        <p>
                            When you use this page to present your project, make sure that you "select" your final version of each of the items on the respective pages so that they show up here. Also, before you go into the details of the stakeholder analysis, allow your audience to check whether the list of stakeholders is appropriate for your problem.
                        </p>

                        <ul>
                            <p>
                                At the end, make sure that the following points are realized:
                            </p>
                            <li>
                                Update your problem formulation on the <a target="_blank" href="/problem">problem page</a>  so that it fits to your <a href="/symphysis_stakeholders/proposals">symphysis proposal</a> The more you learn about your wicked problem, the more your understanding of this problem will change. Moreover, you will probably move with your symphysis proposal
                                into a certain direction that might, at the end, no longer fit to your original problem description. Since your audience can understand your symphysis proposal only if they see your understanding of the problem, it is important that you revise your problem formulation
                                so that it matches to your proposal and its justification.

                            </li>
                            <li>Check whether the <a target="_blank" href="/symphysis_stakeholders/stakeholders/"> Set of stakeholders</a> that should be taken into account should be changed based on your updated problem formulation. If you change the problem, some people might no longer have a “stake” in it, or
                                you might need to consider new stakeholders.</li>
                            <li>In presentations, give your your audience time to check whether the list of stakeholders is appropriate for your problem.
                            </li>

                        </ul>


                    </div>
            },
            Justifications: {
                title:
                    <div>
                        Justify the components of your symphysis proposal
                    </div>,
                body:
                    <div>


                        <p>
                            Your symphysis proposal provides much detail: provisions that you crafted to satisfy various stakeholder interests. To communicate your proposal to others it is important to explain how each of its components is justified, for example, because it satisfies a particular interest.
                        </p>
                        <ul>
                            <li>All components of your symphysis proposal need to be justified. Assign each component to a member of your team. Select their names from the list under “Author.”</li>
                            <li>Create your justifications outside of the Reflect! platform, for example with an argument mapping software such as  <a href="http://agora.gatech.edu">AGORA</a>
                                &nbsp; or <a target="_blank" href="https://www.mindmup.com/tutorials/argument-visualization.html">MindMup</a></li>
                            <li>If it turns out that you have difficulties to justify a particular component, consider changing it. You cannot propose something that you cannot justify with a strong and convincing argument.</li>
                            <li>If you change the formulation of your conclusion on an argument map, don’t forget to change also the corresponding formulations on the Reflect! platform.</li>
                            <li>Enter a link to each justification in the table below under "Justification."</li>
                            <li>Each justification that a team member creates should be checked by two other team members. Provide constructive feedback so that your team as a whole creates something of high quality</li>
                        </ul>

                    </div>



                        },

                        JustificationsAdditionalConsiderations: {

                        title:
                        <div>Additional Considerations</div>,



                    body:

                        <div>
<p>
Your symphysis proposal needs to be formulated so that each individual stakeholder can agree
to it (weights need to be either positive or neutral). This is the criterion for success.
However, there are often good arguments that the agreement of certain stakeholders is less
important than that of others. For example, if the problem is how to regulate technologies
that are designed to catch criminals, then these criminals are stakeholders who would certainly
not agree to the use of these technologies. Similarly, police officers might not agree to
policies that limit how they may treat people, or certain people may find fewer job opportunities
based on regulations that otherwise promise huge benefits for society as a whole. In these cases,
use the box “Considerations” and provide a justification why you take the interests
of particular not, or less, into account.
</p>
<p>
Use the box also for other considerations that are needed to make your proposal plausible.
For example, if there are controversies about important facts, or certain information is
not available, discuss these points here. Your arguments, however, including those about
controversial facts or missing information, should always be part of your justifications
in the argument maps.
</p>

</div>
},
PresentationJustifications: {
title:
<div>
Presentation Instructions
</div>,
body:
<div>


<p>
<b>Update your problem formulation</b>
</p>
<p>
The more you learn about your wicked problem, the more your understanding of this
problem will change. Moreover, you will probably move with your symphysis proposal
into a certain direction that might, at the end, no longer fit to your original
problem description. Since your audience can understand your symphysis proposal
only if they see your understanding of the problem, it is important that you
revise your problem formulation so that it matches to your proposal and its justification.
</p>
<p>
<b>Update your list of stakeholders</b>
</p>
<p>
Click <a target="_blank" href="/symphysis_stakeholders/stakeholders/">here</a> if your
updated problem formulation changes the set of stakeholders that should be taken into account.
</p>
<p>
<b>Additional considerations</b>
</p>
<p>
Your symphysis proposal needs to be formulated so that each individual stakeholder can agree
to it (weights need to be either positive or neutral). This is the criterion for success.
However, there are often good arguments that the agreement of certain stakeholders is less
important than that of others. For example, if the problem is how to regulate technologies
that are designed to catch criminals, then these criminals are stakeholders who would certainly
not agree to the use of these technologies. Similarly, police officers might not agree to
policies that limit how they may treat people, or certain people may find fewer job opportunities
based on regulations that otherwise promise huge benefits for society as a whole. In these cases,
use the box “Considerations” and provide a justification why you take the interests
of particular not, or less, into account.
</p>
<p>
Use the box also for other considerations that are needed to make your proposal plausible.
For example, if there are controversies about important facts, or certain information is
not available, discuss these points here. Your arguments, however, including those about
controversial facts or missing information, should always be part of your justifications
in the argument maps.
</p>
<p>
<b>Note</b>
</p>
<p>
Make sure that you "select" the "problem," the "stakeholders," and your "symphysis proposal"
on the respective pages so that they show up here for your presentation.
</p>

</div>
},

}


},
ProposalComponents: {

Instructions: {
title: <div>Proposal Components</div>,
body: <div>
<p>Note:</p>
<ul>
<li>Each of your proposal components must be a complete and grammatically correct statement.</li>
<li>For suggestions on how to develop a symphysis proposal: read these <a  target="_blank" href="https://reflect.gatech.edu/how-to-develop-a-symphysis-proposal/">suggestions</a>.</li>
<li>Enter URLs for “References” and “Justifications.”</li>
<li>To change the sequence in which the components are displayed change the numbers under “Order.”</li>
<li>Deactivate the checkmarks for those components that you do not want to use.</li>
</ul>
</div>
}

},

    ResearchProposalComponents: {

        Instructions: {
            title: <div>Proposal Components</div>,
            body: <div>
                <p>Note:</p>
                <ul>
                    <li>To change the sequence in which the components are displayed change the numbers under “Order.”</li>
                    <li>Deactivate the checkmarks for those components that you do not want to use.</li>
                </ul>
            </div>
        }

    },

BatchUploads : {
Instructions : {
title: <div>AtchBay Uploadyay Instructionsyay</div>,
body: <div>
<ul>
<li>Usernamesyay ustmay otnay ontaincay anyay emptyay acespay.</li>
<li>Use the batch upload to create <b>accounts for users</b> (students or project members) and <b>teams</b> to which these users belong. You can do this for every “class” (project) that you “own.”
</li>
<li>If you see an error message after the upload, correct the errors in the file and try again.
</li>

<li>
When you see the “Success!” message, the Reflect! platform creates the teams and user accounts. Each user will get an email from the system with a link to activate their account.
</li>

<li>
Keep in mind that each class (project) works along the same Work plan. If you want that individual teams work according to a different work plan, you need to create first a class (project) for them.
</li>

<li>
You can only upload <b>csv</b> files (you can do that multiple times if you want to create further accounts or teams later). For each student or project participant, the csv sheet needs to contain the following columns (the wording must be exactly the same, but the cells in the columns middle name, institution, and password can remain empty. Use only lower case for the headings):
<ul>
<li>first_name
</li>
<li>middle_name</li>
<li>last_name</li>
<li>username</li>
<li>email</li>
<li>institution</li>
<li>password</li>
<li>team</li>
<li>force_team_assignment
</li>
<li>problem_id

</li>
</ul>
</li>

</ul>

<ul>
<li>
Enter for each user the corresponding data but <b>note</b>:
<ul>
<li>
Enter a <b>password</b> only if you want to prepare generic user accounts in advance, for example for workshops, without contacting the users by email. In all other cases: The users should create their own passwords in reaction to the email that they will get from the system.
</li>
<li>Under <b>“force_team_assignment,”</b> enter a “0” if you create a new user account, but a “1” if you want to “force” an already existing user account into a different or new team.
</li>
<li>
Under <b>"problem id"</b> enter the code number that is mentioned at <a target="_blank" href="http://reflect.gatech.edu/wicked-problems/">http://reflect.gatech.edu/wicked-problems/</a> for wicked problems on which teams can work.
<ul>
<li>Make sure that each team member gets the same problem_id.</li>
<li>Contact <a target="_blank" href="mailto:michael.hoffmann@pubpolicy.gatech.edu?Subject= problem%20description%20code" target="_top">michael.hoffmann@pubpolicy.gatech.edu</a> if you want to get your own problem description uploaded to the system.</li>
<li>At this point, you can then send your own problem description that we will upload to the system.</li>
</ul>
</li>
</ul>

</li>
</ul>

</div>

}
}


};

export default InstructionsData;
