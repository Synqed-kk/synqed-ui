import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import {
  PhotoCategoryPicker,
  type PhotoCategory,
} from '../src/components/photo-category-picker'

const meta: Meta = {
  title: 'Components/PhotoCategoryPicker',
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj

const estheticCategories: PhotoCategory[] = [
  { key: 'esthetic_skin', label: 'Skin condition', color: 'blue' },
  { key: 'esthetic_before', label: 'Before', color: 'slate' },
  { key: 'esthetic_after', label: 'After', color: 'green' },
  { key: 'esthetic_concern', label: 'Concern', color: 'amber' },
]

export const Single: Story = {
  render: () => {
    const [value, setValue] = useState<string | null>(null)
    return (
      <PhotoCategoryPicker
        mode="single"
        categories={estheticCategories}
        value={value}
        onChange={setValue}
      />
    )
  },
}

export const Filter: Story = {
  render: () => {
    const [value, setValue] = useState<string | null>(null)
    return (
      <PhotoCategoryPicker
        mode="filter"
        categories={estheticCategories}
        value={value}
        onChange={setValue}
        allLabel="All"
      />
    )
  },
}
