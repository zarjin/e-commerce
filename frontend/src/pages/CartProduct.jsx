import React, { useContext } from 'react'
import { CartContext } from '../context/CartContext'

export default function CartProduct() {
  const { CartData } = useContext(CartContext)
  console.log(CartData)
  return <>{<h1>{CartData.length}</h1>}</>
}
