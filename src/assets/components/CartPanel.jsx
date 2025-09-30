<aside id="cart-panel" className="cart-panel" aria-label="Shopping cart">
<h2>Cart</h2>
{cart.length===0 ? (
<div className="empty">Cart is empty</div>
) : (
<div>
<ul>
{cart.map(item=> (
<li key={item.id} className="cart-item">
<div className="ci-left">
<img src={item.image} alt={item.name} onError={e=> e.currentTarget.src='https://via.placeholder.com/64x64?text=No'} />
<div>
<div className="truncate small">{item.name}</div>
<div className="small">{currency(item.price)}</div>
</div>
</div>
<div className="ci-right">
<input aria-label={`Quantity for ${item.name}`} type="number" min={1} max={item.stock} value={item.qty} onChange={e=>updateQty(item.id, Number(e.target.value))} />
<button onClick={()=>removeItem(item.id)} aria-label={`Remove ${item.name}`}>Remove</button>
</div>
]
</li>
))}
</ul>
<div className="cart-footer">
<div>Subtotal: <strong>{currency(totals.subtotal)}</strong></div>
<div className="cart-actions">
<button onClick={emptyCart}>Empty cart</button>
</div>
</div>
</div>
)}
</aside>

