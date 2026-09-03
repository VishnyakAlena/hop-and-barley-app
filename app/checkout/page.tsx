import CheckoutForm from '../components/CheckoutForm/CheckoutForm'
import './checkoutStyle.css'

export default function CheckoutPage() {

    return (
        <main className="checkout-page-wrapper">
            <div className="container">
                <div className="checkout-container">
                    <h1 className="checkout-title">Order Details</h1>
                    <CheckoutForm />
                </div>
            </div>
        </main>
    )
}