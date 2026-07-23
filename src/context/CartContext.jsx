import { createContext, useContext, useEffect, useReducer, useCallback } from 'react'

const CartContext = createContext(null)

const STORAGE_KEY = 'soulnuts_cart'

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.find(
        (i) => i.id === action.payload.id && i.weightLabel === action.payload.weightLabel
      )
      if (existing) {
        return state.map((i) =>
          i.id === action.payload.id && i.weightLabel === action.payload.weightLabel
            ? { ...i, qty: i.qty + 1 }
            : i
        )
      }
      return [...state, { ...action.payload, qty: 1 }]
    }

    case 'REMOVE_ITEM':
      return state.filter(
        (i) => !(i.id === action.payload.id && i.weightLabel === action.payload.weightLabel)
      )

    case 'UPDATE_QTY': {
      if (action.payload.qty <= 0) {
        return state.filter(
          (i) => !(i.id === action.payload.id && i.weightLabel === action.payload.weightLabel)
        )
      }
      return state.map((i) =>
        i.id === action.payload.id && i.weightLabel === action.payload.weightLabel
          ? { ...i, qty: action.payload.qty }
          : i
      )
    }

    case 'CLEAR_CART':
      return []

    case 'HYDRATE':
      return action.payload

    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, [], () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  // Persist cart to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
    } catch {
      // localStorage might be unavailable in some contexts
    }
  }, [cart])

  const addItem = useCallback((product, weightLabel, price) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        name: product.name,
        colorKey: product.colorKey,
        price: price ?? product.price,
        weightLabel: weightLabel ?? product.unit,
        unit: product.unit,
      },
    })
  }, [])

  const removeItem = useCallback((id, weightLabel) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id, weightLabel } })
  }, [])

  const updateQty = useCallback((id, weightLabel, qty) => {
    dispatch({ type: 'UPDATE_QTY', payload: { id, weightLabel, qty } })
  }, [])

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' })
  }, [])

  const itemCount = cart.reduce((sum, i) => sum + i.qty, 0)
  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0)

  return (
    <CartContext.Provider
      value={{ cart, addItem, removeItem, updateQty, clearCart, itemCount, subtotal }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
