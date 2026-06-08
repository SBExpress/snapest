import { create } from 'zustand'

export interface LineItem {
  id: string
  itemNumber: string
  description: string
  quantity: number
  unit: string
  materialPrice: number
  laborLevel1Hours: number
  laborLevel2Hours: number
  laborLevel3Hours: number
  assemblyId?: string
  isTemporary?: boolean
  comments?: string
}

export interface EstimateHeader {
  id: string
  estimateNumber: string
  projectName: string
  customerGC: string
  address: string
  scopeSummary: string
  bidDueDate: string
  status: 'draft' | 'submitted' | 'won' | 'lost'
  createdAt: string
  modifiedAt: string
}

export interface Estimate {
  header: EstimateHeader
  lineItems: LineItem[]
  closeoutSettings: CloseoutSettings
}

export interface CloseoutSettings {
  laborLevel1Rate: number
  laborLevel2Rate: number
  laborLevel3Rate: number
  laborBurdenPercent: number
  salesTaxPercent: number
  taxCalculationMode: 'modeA' | 'modeB'
  materialOverheadPercent: number
  materialProfitPercent: number
  laborOverheadPercent: number
  laborProfitPercent: number
  applyOHPToAdditionalCosts: boolean
}

interface EstimateStore {
  currentEstimate: Estimate | null
  createEstimate: (header: EstimateHeader) => void
  updateHeader: (header: Partial<EstimateHeader>) => void
  addLineItem: (item: LineItem) => void
  updateLineItem: (id: string, item: Partial<LineItem>) => void
  deleteLineItem: (id: string) => void
  duplicateLineItem: (id: string) => void
  replaceLineItem: (id: string, newItem: LineItem) => void
  updateCloseoutSettings: (settings: Partial<CloseoutSettings>) => void
  clearEstimate: () => void
}

export const useEstimateStore = create<EstimateStore>((set) => ({
  currentEstimate: null,

  createEstimate: (header) => {
    set((state) => ({
      currentEstimate: {
        header,
        lineItems: [],
        closeoutSettings: {
          laborLevel1Rate: 0,
          laborLevel2Rate: 0,
          laborLevel3Rate: 0,
          laborBurdenPercent: 30,
          salesTaxPercent: 0,
          taxCalculationMode: 'modeA',
          materialOverheadPercent: 15,
          materialProfitPercent: 12,
          laborOverheadPercent: 15,
          laborProfitPercent: 12,
          applyOHPToAdditionalCosts: true,
        },
      },
    }))
  },

  updateHeader: (header) => {
    set((state) => {
      if (!state.currentEstimate) return state
      return {
        currentEstimate: {
          ...state.currentEstimate,
          header: {
            ...state.currentEstimate.header,
            ...header,
            modifiedAt: new Date().toISOString(),
          },
        },
      }
    })
  },

  addLineItem: (item) => {
    set((state) => {
      if (!state.currentEstimate) return state
      return {
        currentEstimate: {
          ...state.currentEstimate,
          lineItems: [...state.currentEstimate.lineItems, item],
        },
      }
    })
  },

  updateLineItem: (id, item) => {
    set((state) => {
      if (!state.currentEstimate) return state
      return {
        currentEstimate: {
          ...state.currentEstimate,
          lineItems: state.currentEstimate.lineItems.map((li) =>
            li.id === id ? { ...li, ...item } : li
          ),
        },
      }
    })
  },

  deleteLineItem: (id) => {
    set((state) => {
      if (!state.currentEstimate) return state
      return {
        currentEstimate: {
          ...state.currentEstimate,
          lineItems: state.currentEstimate.lineItems.filter((li) => li.id !== id),
        },
      }
    })
  },

  duplicateLineItem: (id) => {
    set((state) => {
      if (!state.currentEstimate) return state
      const itemToDuplicate = state.currentEstimate.lineItems.find((li) => li.id === id)
      if (!itemToDuplicate) return state
      const newItem = { ...itemToDuplicate, id: `${itemToDuplicate.id}-copy-${Date.now()}` }
      return {
        currentEstimate: {
          ...state.currentEstimate,
          lineItems: [...state.currentEstimate.lineItems, newItem],
        },
      }
    })
  },

  replaceLineItem: (id, newItem) => {
    set((state) => {
      if (!state.currentEstimate) return state
      const index = state.currentEstimate.lineItems.findIndex((li) => li.id === id)
      if (index === -1) return state
      const newLineItems = [...state.currentEstimate.lineItems]
      newLineItems[index] = newItem
      return {
        currentEstimate: {
          ...state.currentEstimate,
          lineItems: newLineItems,
        },
      }
    })
  },

  updateCloseoutSettings: (settings) => {
    set((state) => {
      if (!state.currentEstimate) return state
      return {
        currentEstimate: {
          ...state.currentEstimate,
          closeoutSettings: {
            ...state.currentEstimate.closeoutSettings,
            ...settings,
          },
        },
      }
    })
  },

  clearEstimate: () => {
    set(() => ({ currentEstimate: null }))
  },
}))
