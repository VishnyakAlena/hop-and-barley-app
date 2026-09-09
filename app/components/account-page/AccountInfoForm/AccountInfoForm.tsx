'use client'

import { signOut } from 'next-auth/react';
import './AccountInfoFormStyle.css'
import { useAppDispatch, useAppSelector } from '@/app/store/storeHooks';
import { clearUserProfile, updateUserFields } from '@/app/store/slices/userSlice';
import { useActionState, useEffect } from 'react';
import { validateAndSaveProfileAction } from '@/app/server-actions/validateAndSaveProfileAction';

const initialState = {
    success: false,
    errors: {},
    data: undefined
};

export default function AccountInfoForm() {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user.currentUser);

    const [state, formAction, isPending] = useActionState(validateAndSaveProfileAction, initialState);

    useEffect(() => {
        if (state.success && state.data) {
            dispatch(updateUserFields({
                name: state.data.full_name,
                phone: state.data.phone,
                city: state.data.city,
                address: state.data.address
            }));
        }
}, [state.success, state.data, dispatch]);

    const handleLogout = () => {
        dispatch(clearUserProfile()); 
        signOut({ callbackUrl: '/login' }); 
    };

    return (
        <div>
            <div className="account-form-container">
            <h2 className="account-form-title">Personal Info</h2>
            <form id="account-info-form" action={formAction}>
                <div className="checkout-form-group">
                    <label htmlFor="acc-full-name">Full Name</label>
                    <input 
                        type="text" 
                        id="acc-full-name" 
                        name="full_name" 
                        className="Input" 
                        placeholder="Value" 
                        defaultValue={user?.name || ""} 
                    />
                    {state.errors?.full_name && <span className="text-grey-500 text-sm mt-1">{state.errors.full_name}</span>}
                </div>
                <div className="checkout-form-group">
                    <label htmlFor="acc-phone">Phone number</label>
                    <input 
                        type="tel" 
                        id="acc-phone" 
                        name="phone" 
                        className="Input" 
                        placeholder="Value"
                        defaultValue={user?.phone || ""}  
                    />
                    {state.errors?.phone && <span className="text-grey-500 text-sm mt-1">{state.errors.phone}</span>}
                </div>
                <div className="checkout-form-group">
                    <label htmlFor="acc-email">Email</label>
                    <input 
                        type="email" 
                        id="acc-email" 
                        name="email" 
                        className="Input" 
                        placeholder="example@mail.com" 
                        defaultValue={user?.email || ""} 
                        readOnly
                    />
                </div>
                <div className="checkout-form-group">
                    <label htmlFor="acc-city">City</label>
                    <input 
                        type="text" 
                        id="acc-city" 
                        name="city" 
                        className="Input" 
                        placeholder="Value" 
                        defaultValue={user?.city || ""} 
                    />
                    {state.errors?.city && <span className="text-grey-500 text-sm mt-1">{state.errors.city}</span>}
                </div>
                <div className="checkout-form-group">
                    <label htmlFor="acc-address">Shipping address</label>
                    <textarea 
                        id="acc-address" 
                        name="address" 
                        className="Textarea" 
                        placeholder="Value" 
                        rows={3} 
                        defaultValue={user?.address || ""}
                    ></textarea>
                    {state.errors?.address && <span className="text-grey-500 text-sm mt-1">{state.errors.address}</span>}
                </div>
                {state.success && !isPending && (
                    <div className="form-success-message" style={{ color: '#2e7d32', backgroundColor: '#edf7ed', padding: '10px', borderRadius: '4px',  textAlign: 'center', fontSize: '14px' }}>
                        Profile updated successfully!
                    </div>
                )}
                <button type="submit" className="button button--primary button--full-width" disabled={isPending}>
                    {isPending ? "Saving..." : "Save"}
                </button>
                <button className="button button--secondary button--full-width" onClick={handleLogout}>Logout</button>
            </form>
            </div>
        </div>
    )
}