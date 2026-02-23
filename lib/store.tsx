'use client'

import { createContext, useContext, useReducer, ReactNode } from 'react'
import { CartItem, Product, Color } from '@/types'

export interface StoreState {
  cart: CartItem[]
  recentlyViewed: Product[]
}

type StoreAction =
  | { type: 'ADD_TO_CART'; payload: { product: Product; quantity: number; size: string; color: Color } }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_CART_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'ADD_TO_RECENTLY_VIEWED'; payload: Product }

const StoreContext = createContext<{
  state: StoreState
  dispatch: (action: StoreAction) => void
} | undefined>(undefined)

const initialState: StoreState = {
  cart: [],
  recentlyViewed: [],
}

function storeReducer(state: StoreState, action: StoreAction): StoreState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product, quantity, size, color } = action.payload
      const id = `${product.id}-${size}-${color.name}`
      
      const existingItem = state.cart.find(item => item.id === id)
      
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + quantity } : item
          ),
        }
      }
      
      return {
        ...state,
        cart: [
          ...state.cart,
          {
            id,
            product,
            quantity,
            selectedSize: size,
            selectedColor: color,
          },
        ],
      }
    }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload),
      }

    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart
          .map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: action.payload.quantity }
              : item
          )
          .filter(item => item.quantity > 0),
      }

    case 'CLEAR_CART':
      return {
        ...state,
        cart: [],
      }

    case 'ADD_TO_RECENTLY_VIEWED': {
      const filtered = state.recentlyViewed.filter(p => p.id !== action.payload.id)
      return {
        ...state,
        recentlyViewed: [action.payload, ...filtered].slice(0, 5),
      }
    }

    default:
      return state
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(storeReducer, initialState)

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const context = useContext(StoreContext)
  if (context === undefined) {
    throw new Error('useStore must be used within StoreProvider')
  }
  return context
}

export function useCart() {
  const { state, dispatch } = useStore()
  return {
    items: state.cart,
    addItem: (product: Product, quantity: number, size: string, color: Color) =>
      dispatch({ type: 'ADD_TO_CART', payload: { product, quantity, size, color } }),
    removeItem: (id: string) => dispatch({ type: 'REMOVE_FROM_CART', payload: id }),
    updateQuantity: (id: string, quantity: number) =>
      dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { id, quantity } }),
    clear: () => dispatch({ type: 'CLEAR_CART' }),
  }
}

export function useRecentlyViewed() {
  const { state, dispatch } = useStore()
  return {
    products: state.recentlyViewed,
    add: (product: Product) =>
      dispatch({ type: 'ADD_TO_RECENTLY_VIEWED', payload: product }),
  }
}
