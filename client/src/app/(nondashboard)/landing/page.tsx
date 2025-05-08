import React from 'react'
import { HeroSection } from './herosection'
import { FeaturesSection } from './featuressection'
import { DiscoverSection } from './discover'
import { CallToActionSection } from './calltoactionSection'
import { Footer } from './footer'

const Landing = () => {
    return (
        <div>
            <HeroSection />
            <FeaturesSection />
            <DiscoverSection />
            <CallToActionSection/>
            <Footer/>
        </div>
    )
}

export default Landing