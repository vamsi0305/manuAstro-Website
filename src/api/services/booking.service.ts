import api from '../../lib/api';

export const bookingService = {
    createBooking: async (bookingData: {
        service_type: string;
        name: string;
        email: string;
        phone: string;
        date: string;
        time_slot: string;
        message?: string;
    }) => {
        const { data } = await api.post('/bookings', bookingData);
        return data;
    },

    getMyBookings: async () => {
        const { data } = await api.get('/bookings/my');
        return data;
    }
};
