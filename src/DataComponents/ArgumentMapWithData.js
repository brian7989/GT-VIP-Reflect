import ArgumentMap from "../Components/ArgumentMap.js";
import ReflectSchema from "./ReflectSchema";

import { gql, graphql, compose } from "react-apollo";
import Configuration from "./Configuration";
import PropTypes from "prop-types";

const ArgumentClaimQuery = gql`
    query($mapId:Int!) {
        argumentMapById(id:$mapId) {
            ...ArgumentMapClaim
        }
    }
    ${ReflectSchema.argumentMapClaim}
    `;

const ArgumentReasonWrapperQuery = gql`
    query ($argumentClaimId: Int!) {
        argumentClaimById(id: $argumentClaimId) {
            ...ArgumentClaimInfo
            ...ArgumentReasonWrapperOnClaim
        }
    }
    ${ReflectSchema.argumentReasonWrapperOnClaim}
    ${ReflectSchema.argumentClaimInfo}
`;

const ArgumentMapWithData = compose(
    graphql(ArgumentClaimQuery, {
        name: 'ArgumentClaimQuery',
        options:({mapId}) => ({
            pollInterval: Configuration.pollIntervalMS,
            variables: {mapId: mapId},
        }),
        props: ({ownProps, ArgumentClaimQuery:  {loading, error, argumentMapById, refetch}}) => ({
            loading: loading,
            argumentClaim: (error || !argumentMapById || !argumentMapById.argumentClaimsByArgumentMapId ) ? []
                :(() => {
                    return argumentMapById.argumentClaimsByArgumentMapId.nodes[0];
                })(),
            refetch: () => {
                return refetch();
            }
        }),
    }),
    graphql(ArgumentReasonWrapperQuery, {
        name: 'ArgumentReasonWrapperQuery',
        options:({argumentClaim}) => ({
            pollInterval: Configuration.pollIntervalMS,
            variables: {argumentClaimId: argumentClaim.id},
        }),
        props: ({ownProps, ArgumentReasonWrapperQuery:  {loading, error, argumentClaimById, refetch}}) => ({
            loading: loading,
            reasonWrappersOnClaim: (error || loading || !argumentClaimById || 
                !argumentClaimById.argumentReasonWrappersByParentArgumentClaimId ) ? []
                :(() => {
                    let ret = argumentClaimById.argumentReasonWrappersByParentArgumentClaimId.nodes.map(
                        (d) => {
                            return {
                                wrapperId: d.id,
                            };
                        },
                        []
                    );
                    return ret;

                })(),
            refetch: () => {
                return refetch();
            }
        }),
    })
)(ArgumentMap);

export default ArgumentMapWithData;
