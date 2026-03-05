import api from '../../lib/api';

export const contactService = {
    submit: async (formData: {
        name: string;
        email: string;
        phone?: string;
        subject?: string;
        message: string;
    }) => {
        const { data } = await api.post('/contact', formData);
        return data;
    }
};
