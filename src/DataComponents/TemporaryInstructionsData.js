import React, {Component} from 'react';

import '../Components/InstructionsPanel';
//import InstructionsPanel from "../Components/InstructionsPanel";

const InstructionsData = {

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
                            Enter also your thoughts about the "Power” you think you have as a stakeholder. Some stakeholders have more power to influence decision making than others. Enter for each stakeholder a value between 0 (zero power) to 5 (very influential). When you are done, click on “Go To … Proposals” and follow the instructions.
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
                            A <b>stakeholder</b> is someone who has a stake in an issue. Stakeholders are are people who make
                            or influence decisions and those who are affected by the decisions. Add all the stakeholders
                            that you can think of below. Discuss all entries in your team.
                        </p>
                        <p>
                            Enter also your thoughts about the "<b>Power</b>” of individual stakeholders. Some stakeholders have
                            more power to influence decision making than others. Enter for each stakeholder a value between
                            0 (zero power) to 5 (very influential). When you are done, click on “Go To … Proposals” and follow
                            the instructions.
                        </p>
                        <p>
                            Keep the following in mind:
                        </p>

                        <ul>
                            <li>
                                If proposals of a particular stakeholder seem to contradict each other, divide this
                                stakeholder
                                into two or more stakeholders that are more specifically defined. Simply click on “New”
                                and enter new information or copy and paste.
                            </li>
                            <li>
                                Make sure that all proposals address all the components of the wicked problem that need
                                to
                                be
                                addressed. Of course, if specific stakeholders do not care about specific proposals or
                                proposal
                                components, do not include those.
                            </li>
                            <li>
                                Are there any gaps in your stakeholder analysis? Did you forget any stakeholders? Add
                                them
                                to your analysis.
                            </li>
                            <li>
                                Should there be more proposals? Add them as well.
                            </li>
                            <li>
                                Are the reasons convincing? Clarify them.
                            </li>
                            <li>
                                At any point, you can click on the “Visualize” tab to check the completeness of your work.
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
                            If you think a stakeholder might pursue different proposals, write each in its own field.
                            But be careful: Proposals of one stakeholder must not contradict each other. If you have
                            contradicting proposals, you need to divide the stakeholder in two more specifically
                            defined stakeholders, each holding one of these proposals.
                        </p>

                        <p>
                            Note that one stakeholder can have several proposals, and there might be several reasons
                            for the same proposal. Each individual item should be in one cell.
                        </p>
                        <p>
                            When you are done, click on “Go To … Reasons” and follow the instructions.
                        </p>

                    </div>
            },
            Proposalsdelib: {
                title:
                    <div>
                        What would you <b>propose</b> should be done?
                    </div>,
                body:
                    <div>
                        <p>
                            A <b>Proposal</b> is a statement that describes what should be done to solve the problem.
                            Write down what you propose should be done.
                        </p>
                        <p>
                            If you have different proposals, write each in its own field.
                        </p>
                        <p>
                            When you are done, click on “Go To … Reasons” and follow the instructions.
                        </p>

                    </div>

            },
            Reasons: {
                title:
                    <div>
                        <b>Why</b> would this stakeholder propose what you think they propose?
                    </div>,
                body:
                    <div>
                        <p>
                            Enter reasons for each proposal. Each reason should be in one
                            cell.
                        </p>
                        <p>
                            When you are done, click on “Go To … Interests” and follow the instructions.
                        </p>
                    </div>
            },
            Reasonsdelib: {
                title:
                    <div>
                        <b>Why</b> do you propose this? What are your reasons?
                    </div>,
                body:
                    <div>
                        <p>
                            Enter reasons for each proposal. Each reason should be in one
                            cell.
                        </p>
                        <p>
                            When you are done, click on “Go To … Interests” and follow the instructions.
                        </p>
                    </div>


            },
            Interests: {
                title:
                    <div>
                        Needs, desires, goals, values
                    </div>,
                body:
                    <div>
                        <p>
                            What are the needs and desires that stakeholders
                            want to see fulfilled, the goals they are pursuing, and the values that motivate them?
                            What do they want? Enter only concepts such as “privacy,” “safety,” or very short
                            descriptions. Generate these concepts and descriptions from the Reasons. The reasons
                            should always be formulated as complete sentences that justify what the stakeholder
                            proposes should be done. The Interests, by contrast, reduce these reasons to just
                            one idea. Interests are more general abstractions from the Reasons. The formulation
                            of interests is important because it will be used later for a visualization that
                            will support your work on the symphysis proposal.
                        </p>
                    </div>
            },
            Interestsdelib: {
                title:
                    <div>
                        Needs, desires, goals, values
                    </div>,
                body:
                    <div>
                        <p>
                            What are the needs and desires that you
                            want to see fulfilled, your goals, values, and interests that motivate you?
                            Looking at the reasons that you provided for your proposals, can you reduce them
                            to just one word or phrase such as “privacy,” “safety,” or "acceptance of my identity."
                        </p>
                        <p>
                            The reasons
                            should always be formulated as complete sentences that justify what you
                            propose should be done. The Interests, by contrast, reduce these reasons to just
                            one idea. Interests are more general abstractions from the Reasons. The formulation
                            of interests is important because it will be used later for a visualization that
                            will support your work on the symphysis proposal.
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
                                If you have rather complex proposals, you will see that stakeholders will like certain
                                <b>components</b> of such a proposal but not others. To get a more precise understanding of
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
                            A <b>stakeholder</b> is someone who has a stake in an issue. Stakeholders are people who
                            make or
                            influence decisions and those who are affected by the decisions. Add all the stakeholders
                            that you
                            can think of below. When you are listing the stakeholders, also think about who the
                            stakeholders interact with. These additional people could also be listed as stakeholders.
                        </p>
                        <p>
                            When you are done, click on “Go To … Proposals” and follow the instructions.
                        </p>

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
                            A proposal needs to specify <b>who</b> should do something (do not
                            use the passive form; say who should act), whether
                            it <b>needs</b> (obligated), <b>may</b> (permitted), or <b>must not</b> (forbidden) be done,
                            and it may specify <b>under which conditions</b> it should be done
                            (when, where, how, and in which circumstances). If you think a stakeholder might pursue
                            different proposals, write
                            each in its own field. But be careful: Proposals of one stakeholder must not contradict each
                            other.
                            If you have contradicting proposals, you need to divide the stakeholder in two more
                            specifically
                            defined stakeholders, each holding one of these proposals.
                        </p>
                        <p>
                            Note that one stakeholder can have several proposals,
                            and there might be several reasons for the same proposal. Each individual item should be in
                            one
                            cell.
                        </p>
                        <p>
                            When you are done, click on “Go To … Reasons” and follow the instructions.
                        </p>

                    </div>
            },
            Reasons: {
                title:
                    <div>
                        <b>Why</b> would this stakeholder propose what you think they propose?
                    </div>,
                body:
                    <div>
                        <p>
                            Enter reasons for each proposal. Each reason should be in one
                            cell. Check the completeness of your stakeholder analysis with
                            its <a rel="noopener noreferrer" target="_blank" href="/my_stakeholders/visualize/">visualization</a>.
                        </p>
                    </div>

            },
            Interests: {
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
                            "active" that should be taken into account. Click <a rel="noopener noreferrer" target="_blank"  href="/team_stakeholders/clarifications">here</a> if you would like to change the list of stakeholders.
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
                            When you use this page to present your project, make sure that you "select" your final version of each of the items on the respective pages so that they show up here.
                        </p>

                        <ul>
                            <p>
                                At the end, make sure that the following points are realized:
                            </p>
                            <li>
                                Update your problem formulation on the <a rel="noopener noreferrer" target="_blank" href="/problem">problem page</a>  so that it fits to your <a target="_blank" href="/symphysis_stakeholders/proposals">symphysis proposal</a> The more you learn about your wicked problem, the more your understanding of this problem will change. Moreover, you will probably move with your symphysis proposal
                                into a certain direction that might, at the end, no longer fit to your original problem description. Since your audience can understand your symphysis proposal only if they see your understanding of the problem, it is important that you revise your problem formulation
                                so that it matches to your proposal and its justification.

                            </li>
                            <li>Check whether the <a rel="noopener noreferrer" target="_blank"  href="/symphysis_stakeholders/stakeholders/"> Set of stakeholders</a> that should be taken into account should be changed based on your updated problem formulation. If you change the problem, some people might no longer have a “stake” in it, or
                                you might need to consider new stakeholders.</li>
                            <li>In presentations, give your your audience time to check whether the list of stakeholders is appropriate for your problem.
                            </li>

                        </ul>

                    </div>
            },
            Justifications: {
                title:
                    <div>
                        Justify your proposal to solve the problem
                    </div>,
                body:
                    <div>


                        <p>
                            Your symphysis proposal provides much detail: provisions that you crafted to satisfy many different stakeholder interests. To communicate your proposal to others it is important to explain how each of its components is justified, for example, because it satisfies a particular interest. Do the following:
                            <ul>
                                <li>Divide your symphysis proposal into its smallest possible components and copy each of them into a box below.
                                </li>
                                <li>Reformulate each component so that it forms a complete sentence which describes one thing that should be done. Each component should be comprehensible on its own, without knowing what the other components say.
                                </li>
                                <li><ul>
                                    Each component should be justified by an argument map.
                                    <li>Use an argument visualization software such as  <a rel="noopener noreferrer" target="_blank"  href="http://agora.gatech.edu">AGORA</a>
                                        &nbsp; or <a rel="noopener noreferrer" target="_blank"  href="https://www.mindmup.com/tutorials/argument-visualization.html">MindMup</a></li>
                                    <li>Copy a component into the “conclusion” text box of your argument mapping tool</li>
                                    <li>Then provide reasons that justify this components / conclusion, reasons for these reasons, and so on.
                                    </li>
                                    <li>If it turns out that you have difficulties to justify a particular component, consider changing it. You cannot propose something that you cannot justify with a strong and convincing argument.</li>
                                    <li>If you change the formulation of your conclusion on an argument map, don’t forget to change also the corresponding formulations on the Reflect! platform.
                                    </li>

                                </ul></li>
                                <li>All components of your symphysis proposal need to be covered. Assign each to a member of your team who creates the corresponding argument maps. Enter their names under “Author.”
                                </li>
                                <li>Enter a link to each argument map in the "Resource URL" box below. If an argument map cannot be linked, create a pdf of it, upload it to a repository where it can be shared, such as Google Drive, and insert the URL here.</li>
                                <li>Make sure that these URLs are not shared outside of your team without the permission of its author.
                                </li>
                                <li>Each argument map that a team member creates should be checked by two other team members. Provide constructive feedback so that your team as a whole creates something of high quality</li>
                            </ul>
                        </p>
                        <p>
                            For an example how to divide a symphysis proposal into its components,
                            check <a rel="noopener noreferrer" target="_blank" href="http://reflect.gatech.edu/dividing-a-symphysis-proposal-into-components/">this</a> out.
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
                            Click <a rel="noopener noreferrer" target="_blank" href="/symphysis_stakeholders/stakeholders/">here</a> if your
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


};

export default InstructionsData;
