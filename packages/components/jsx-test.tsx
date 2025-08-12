import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from './Button/Button.vue'

describe('JSX Support Test', () => {
  test('JSX syntax works correctly', () => {
    const wrapper = mount(
      () => (
        <Button type="primary" size="large">
          Test Button
        </Button>
      ),
      {
        global: {
          stubs: ['ErIcon']
        }
      }
    )
    
    expect(wrapper.find('.er-button').exists()).toBe(true)
    expect(wrapper.text()).toBe('Test Button')
  })
})
