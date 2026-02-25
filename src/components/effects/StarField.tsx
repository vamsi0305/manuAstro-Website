import { useEffect, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import type { ISourceOptions } from '@tsparticles/engine'

const particleOptions: ISourceOptions = {
    id: 'starfield',
    background: { color: { value: 'transparent' } },
    fpsLimit: 60,
    interactivity: {
        events: {
            onHover: { enable: true, mode: 'grab' },
        },
        modes: {
            grab: { distance: 140, links: { opacity: 0.3 } },
        },
    },
    particles: {
        number: { value: 120, density: { enable: true } },
        color: { value: '#ffffff' },
        shape: { type: 'circle' },
        opacity: {
            value: { min: 0.1, max: 0.6 },
            animation: { enable: true, speed: 0.5 },
        },
        size: {
            value: { min: 0.5, max: 2 },
            animation: { enable: true, speed: 2 },
        },
        links: { enable: false },
        move: {
            enable: true,
            speed: { min: 0.2, max: 0.5 },
            direction: 'none',
            random: true,
            straight: false,
            outModes: { default: 'out' },
        },
    },
    detectRetina: true,
}

export default function StarField() {
    const [init, setInit] = useState(false)

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine)
        }).then(() => setInit(true))
    }, [])

    if (!init) return null

    return (
        <Particles
            id="tsparticles"
            options={particleOptions}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                pointerEvents: 'none',
            }}
        />
    )
}
