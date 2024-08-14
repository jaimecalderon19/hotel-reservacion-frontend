
import { renderSuspended } from '@nuxt/test-utils/runtime'
import { it, expect, describe, vi } from 'vitest'

import HotelBookingModal from '../../components/HotelBookingModal.vue';

describe('HotelBookingModal', () => {
    it('renders correctly when open', () => {
        const { getByText } = render(HotelBookingModal, {
            props: {
                isOpen: true,
                reservation: { hotel: 'Hilton', date: '2024-08-10' }
            }
        });

        expect(getByText('Reservation Details')).toBeInTheDocument();
        expect(getByText('Find Your Perfect Hotel')).toBeInTheDocument();
    });
    it('can render some component', async () => {
        await renderSuspended(HotelBookingModal)
        expect(screen.getByText('This is an auto-imported component')).toBeTruthy()
    })



    it('emits close event with correct value when hideModal is called', async () => {
        const emit = vi.fn();

        const wrapper = await renderSuspended(HotelBookingModal, {
            props: {
                isOpen: true,
                reservation: { hotel: 'Hilton', date: '2024-08-10' }
            },
            global: {
                mocks: {
                    $emit: emit
                }
            }
        });

        const closeButton = wrapper.getByText('Close Modal');
        await fireEvent.click(closeButton);

        expect(emit).toHaveBeenCalledWith('close', true);
    });
});
