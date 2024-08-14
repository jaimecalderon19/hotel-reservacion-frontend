import { renderSuspended } from '@nuxt/test-utils/runtime'
import { it, expect, describe, vi } from 'vitest'
import { render } from '@testing-library/vue';


import NotificationStatus from '../../components/NotificationStatus.vue';

describe('NotificationStatus', () => {
    it('renders success message correctly', () => {
        const { getByText } = render(ToastNotification, {
            props: { success: true, warning: false },
        });

        expect(getByText('Booking successful! Have a great day.')).toBeTruthy();
        expect(() => getByText('Oops, check your info again, please!')).toThrow();
    });

    it('renders nothing when both success and warning are false', () => {
        const { queryByText } = render(NotificationStatus, {
            props: { success: false, warning: false },
        });

        expect(queryByText('Booking successful! Have a great day.')).toBeNull();
        expect(queryByText('Oops, check your info again, please!')).toBeNull();
    });




})