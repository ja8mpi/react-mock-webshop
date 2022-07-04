import React from 'react'

type Order = {
    id: number
    price: number
    items: []
}

type OrderProps = {
    orders: Order[]
}

function Order({ orders }: OrderProps) {
    return (
        <>
            {
                orders.map(({ id, price }: Order) => {
                    return (
                        <div key={id}>
                            {price}
                        </div>
                    )
                })
            }
        </>
    )
}

export default Order