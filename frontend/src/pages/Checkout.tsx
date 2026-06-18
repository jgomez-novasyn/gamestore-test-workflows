import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { api } from '../services/api';
import { showError, showSuccess } from '../utils/notifications';

const validate = (shippingAddress: string) => {
  const errors: { shippingAddress?: string } = {};
  if (!shippingAddress.trim()) {
    errors.shippingAddress = 'Shipping address is required';
  }
  return errors;
};

export const Checkout = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  // BUG: No form validation - just basic state
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [fieldErrors, setFieldErrors] = useState<{ shippingAddress?: string }>({});

  if (!cart || cart.items.length === 0) {
    return (
      <div className="container mx-auto p-4 text-center">
        <p>Your cart is empty.</p>
        <Link to="/products" className="text-blue-600">Go to Products</Link>
      </div>
    );
  }

  const total = cart.items.reduce((sum, item) => {
    return sum + parseFloat(item.product.price) * item.quantity;
  }, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validate(shippingAddress);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setLoading(true);

    try {
      // BUG: No confirmation step - order created immediately
      await api.orders.checkout({
        shippingAddress,
        paymentMethod
      });
      await clearCart();
      showSuccess('Order placed successfully!');
      navigate('/products');
    } catch (error) {
      showError('Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          {cart.items.map(item => (
            <div key={item.id} className="flex justify-between py-2 border-b">
              <span>{item.product.name} x {item.quantity}</span>
              <span>${(parseFloat(item.product.price) * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="flex justify-between font-bold text-xl mt-4">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">Payment Details</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Shipping Address</label>
              <textarea
                value={shippingAddress}
                onChange={e => { setShippingAddress(e.target.value); setFieldErrors(prev => ({ ...prev, shippingAddress: undefined })); }}
                className={`w-full p-2 border rounded ${fieldErrors.shippingAddress ? 'border-red-500' : ''}`}
                rows={3}
              />
              {fieldErrors.shippingAddress && <p className="text-red-600 text-sm mt-1">{fieldErrors.shippingAddress}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Payment Method</label>
              <select
                value={paymentMethod}
                onChange={e => setPaymentMethod(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="credit_card">Credit Card</option>
                <option value="debit_card">Debit Card</option>
                <option value="paypal">PayPal</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
            >
              {loading ? 'Processing...' : 'Place Order'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
