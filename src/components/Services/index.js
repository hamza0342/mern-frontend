import React from 'react';
import {ServicesContainer, ServicesCard, ServicesWrapper, ServicesH1, ServicesH2, ServicesIcon, ServicesP} from './ServiceElements';
import Icon1 from '../../images/structural.jpg'
import Icon2 from '../../images/consulting.jpg'
import Icon3 from '../../images/viz.jpg'

const Services = () => {
    return (
        <ServicesContainer id="services">
            <ServicesH1>
                Our Services
            </ServicesH1>
            <ServicesWrapper>
                <ServicesCard>
                    <ServicesIcon src={Icon1} />
                        <ServicesH2>BIM Modelling</ServicesH2>
                        <ServicesP>Our BIM modelling services include Architectural, Structural, MEP, LOD, and Clash detection services.</ServicesP>

                    
                </ServicesCard>
                <ServicesCard>
                    <ServicesIcon src={Icon2} />
                        <ServicesH2>BIM Consulting Services</ServicesH2>
                        <ServicesP>Our BIM consulting services include BIM documentation, BIM implementation and BIM execution plan. </ServicesP>

                    
                </ServicesCard>
                <ServicesCard>
                    <ServicesIcon src={Icon3} />
                        <ServicesH2>3D Visualization</ServicesH2>
                        <ServicesP>Pur 3D Visualization services include 3D visualization services using 3DS max and also 360 tours. </ServicesP>

                    
                </ServicesCard>

            </ServicesWrapper>
        </ServicesContainer>
    )
}

export default Services
