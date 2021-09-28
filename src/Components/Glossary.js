import React, { Component } from 'react'



class Glossary extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div>
                <h1>Reflect! Glossary</h1>
                <h6>Terms in <i>italics</i> are defined in this glossary.</h6>
                <ul>
                    <li> <b>Action script:</b> We define an action script, by contrast to scripted user guidance, as a set of instructions that prescribe a “chunk” of activities—be it individual or group activities. These instructions are designed to support students to achieve a certain subgoal within a project. This chunk of activities is not determined in detail. Students are free to determine and perform activities within such a chunk as they see fit.
                    </li>
                    <li>
                        <b>Agenda:</b> Vaguely defined set of goals of a particular stakeholder, an overarching set of priorities stakeholders hold. It can be seen in the proposals they suggest and the stances they take. Agendas are important for creating a symphysis position because a stakeholder might compromise on proposals as long as a certain agenda can still be realized. It is not clear whether Agenda should be a software object or part of the language that describes what is going on in deliberation.

                    </li>
                    <li>
                        <b>Argument:</b> A a premise-conclusion sequence so that either one or more premises are intended to support a conclusion or a conclusion is intended to be justified by one or more premises. An argument can also be a connection of several of those premise-conclusion sequences if premises are justified by further premises, and so on. (Hoffmann, 2016 #11383). Arguments are used to justify proposals.

                    </li>

                </ul>

            </div>
        );
    }

}


export default Glossary;
