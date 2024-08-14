import { it, expect } from 'vitest'

import { renderSuspended } from '@nuxt/test-utils/runtime'
import ComparisonHotelTable from '../../components/ComparisonHotelTable.vue'

it('can also render an app', async () => {
    const html = await renderSuspended(ComparisonHotelTable, { route: '/' })
    expect(html).toMatchInlineSnapshot(`
    "<thead>
        <tr class="bg-gray-100">
          <th
            v-for="hotel in hotels"
            :key="hotel.id"
            class="text-center text-sm sm:text-base px-4 py-2"
          >
            {{ hotel.name }}
          </th>
        </tr>
      </thead>"
  `)
})
