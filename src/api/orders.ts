import apiClient from './axios'
import type { ApiResponse, PaginatedResponse, Order } from '@/types'

export const ordersApi = {
    create: (data: {
        shipping_address: object
        coupon_code?: string
    }) =>
        apiClient.post<ApiResponse<Order>>('/orders/', data),

    list: (params?: { page?: number; per_page?: number }) =>
        apiClient.get<PaginatedResponse<Order>>('/orders/', { params }),

    getById: (id: string) =>
        apiClient.get<ApiResponse<Order>>(`/orders/${id}`),

    // Admin
    listAll: (params?: { status?: string; page?: number }) =>
        apiClient.get<PaginatedResponse<Order>>('/orders/admin', { params }),

    updateStatus: (id: string, data: { status: string; tracking_id?: string }) =>
        apiClient.put<ApiResponse<Order>>(`/orders/${id}/status`, data),

    // Payment
    submitProof: (data: { order_id: string; upi_reference: string }) =>
        apiClient.post('/payments/submit-proof', data),

    confirmPayment: (paymentId: string) =>
        apiClient.put(`/payments/${paymentId}/confirm`),
}
