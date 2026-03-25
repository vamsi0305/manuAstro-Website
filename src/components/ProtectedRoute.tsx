import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'

function LoadingSpinner() {
    return (
        <div style={{
            display: 'flex', alignItems: 'center',
            justifyContent: 'center', minHeight: '100vh',
            background: 'var(--color-bg)'
        }}>
            <div style={{
                width: '48px', height: '48px',
                border: '4px solid rgba(201,151,42,0.15)',
                borderTop: '4px solid var(--color-gold)',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite'
            }} />
        </div>
    )
}

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, user, restoreAuth } = useAuthStore()
    const [ready, setReady] = useState(false)

    useEffect(() => {
        restoreAuth()
        const timer = window.setTimeout(() => setReady(true), 0)
        return () => window.clearTimeout(timer)
    }, [restoreAuth])

    if (!ready) {
        return <LoadingSpinner />
    }

    if (!isAuthenticated || !user) {
        return <Navigate to="/login" replace />
    }

    return <>{children}</>
}

export function AdminRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, user, restoreAuth } = useAuthStore()
    const [ready, setReady] = useState(false)

    useEffect(() => {
        restoreAuth()
        const timer = window.setTimeout(() => setReady(true), 0)
        return () => window.clearTimeout(timer)
    }, [restoreAuth])

    if (!ready) {
        return <LoadingSpinner />
    }

    if (!isAuthenticated || !user) {
        return <Navigate to="/login" replace />
    }

    if (!user.is_admin) {
        return <Navigate to="/dashboard" replace />
    }

    return <>{children}</>
}
