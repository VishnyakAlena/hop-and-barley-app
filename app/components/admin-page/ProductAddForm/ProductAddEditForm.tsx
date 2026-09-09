'use client'
import { useState, useEffect, ChangeEvent, useMemo, useActionState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { allProductsInfo } from '@/app/store/slices/addProductsReviewsSlice';
import { Iproduct } from '@/app/types';
import './ProductAddEditFormStyle.css';
import Image from 'next/image';
import { ProductActionResponse, saveProductAction } from '../../../server-actions/saveProductAction';
import { useAppDispatch } from '@/app/store/storeHooks';
import { addProduct, deleteProduct, toggleHideProduct, updateProduct } from '@/app/store/slices/productSlice';
import { useRouter } from 'next/navigation';
import { deleteProductAction } from '@/app/server-actions/deleteProductAction';
import { toggleHideProductAction } from '@/app/server-actions/hideProductAction';

interface ProductAddEditFormProps {
    productId?: string;
}

const initialState: ProductActionResponse = {
    success: false,
    errors: {},
    message: '',
    data: undefined
};

export default function ProductAddEditForm({ productId }: ProductAddEditFormProps) {
    const dispatch = useAppDispatch();
    const allProducts = useSelector(allProductsInfo);
    const formRef = useRef<HTMLFormElement>(null); 
    const router = useRouter();

    const editingProduct = productId 
        ? allProducts.find((p: Iproduct) => String(p.id) === String(productId))
        : null;

    const isEditMode = !!editingProduct;

    const descriptionText = editingProduct
    ? (Array.isArray(editingProduct.description) 
        ? editingProduct.description.join('\n\n') // Соединяем абзацы двойным переносом строки
        : editingProduct.description)
    : '';
    
    const availableCategories = useMemo<string[]>(() => {
        const allCategories = allProducts.map((product: any) => product.category);
        const validCategories = allCategories.filter((category: any) => !!category);
        return Array.from(new Set(validCategories)).sort() as string[];
    }, [allProducts]);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState<string>('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [base64Image, setBase64Image] = useState<string | null>(null);

    const boundAction = saveProductAction.bind(null, productId || null);
    const [state, formAction, isPending] = useActionState(boundAction, initialState);

    useEffect(() => {
        if (editingProduct) {
            setTitle(editingProduct.name || '');
            setDescription(descriptionText || '');
            setPrice(editingProduct.price ? String(editingProduct.price) : '');
            setCategory((editingProduct.category as string) || '');
            setImagePreview(editingProduct.image || null); 
        } else if (availableCategories.length > 0 && !category) {
            // Если это создание нового товара, ставим первую категорию по умолчанию
            setCategory(availableCategories[0]);
        }    
    }, [editingProduct, descriptionText,  availableCategories]);

    useEffect(() => {
        if (state.success && state.data) {
            if (isEditMode) {
                dispatch(updateProduct(state.data)); 
            } else {
                dispatch(addProduct(state.data)); 
            }
            alert(isEditMode ? 'Товар успешно обновлен!' : 'Товар успешно добавлен!');
            router.push('/admin/products');
        }
    }, [state.success, state.data, isEditMode, dispatch]);

    useEffect(() => {
        return () => {
            if (imagePreview && imagePreview.startsWith('blob:')) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (imagePreview && imagePreview.startsWith('blob:')) {
                URL.revokeObjectURL(imagePreview);
            }
            const objectUrl = URL.createObjectURL(file);
            setImagePreview(objectUrl);
            const reader = new FileReader();
            reader.onloadend = () => {
                setBase64Image(reader.result as string); 
            };
            reader.readAsDataURL(file);
        }
    };

    const handleHide = async () => {
        if (!productId) return; 

        try {
            const res = await toggleHideProductAction(productId);
            if (res.success) {
                dispatch(toggleHideProduct(productId));
                
                const willBeHidden = !editingProduct?.isHidden;
                alert(willBeHidden ? 'Товар скрыт из каталога!' : 'Товар снова отображается в каталоге!');
                
                router.push('/admin/products');
            }
        } catch (error) {
            console.error("Ошибка при скрытии товара:", error);
        }
    };

    const handleDelete = async () => {
    if (!productId) return;

    if (confirm('Are you sure you want to delete this product?')) {
        try {
            const res = await deleteProductAction(productId);
            
            if (res.success) {
                dispatch(deleteProduct(productId));
                alert('Товар успешно удален!');
                router.push('/admin/products');
            } else {
                alert('Ошибка при удалении товара на сервере');
            }
        } catch (error) {
            console.error("Ошибка удаления:", error);
            alert('Произошла ошибка при удалении');
        }
    }
};
    return (
        <div className="admin-form-layout">
            <div className="admin-form-upload-image">
                <h2 className="admin-form-section-title">Control</h2>
                <div className="image-upload-card">
                    <div className="image-upload-placeholder">
                        {imagePreview ? (
                            <img src={imagePreview} alt="Product preview" className="uploaded-image-preview" />
                        ) : (
                            <Image src="/images/Image-Preview.png" width={160} height={160} alt="Image-Preview" />
                        )}
                    </div>
                    <button 
                        type="button" 
                        className="button button--primary upload-btn" 
                        id="upload-image-btn"
                        onClick={() => document.getElementById('image-upload-input')?.click()}
                    >
                        {imagePreview ? 'Change Image' : 'Upload Image'}
                    </button>
                </div>
            </div>
            <div className="admin-form-shipping-information">
                <h2 className="admin-form-section-title">Shipping information</h2>
                <form id="product-form" ref={formRef} className="product-info-form" action={formAction}>
                    <input 
                        type="file" 
                        id="image-upload-input"
                        name="image_file" 
                        className="is-hidden" 
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    <input type="hidden" name="old_image" value={editingProduct?.image || ''} />
                    <input type="hidden" name="base64_image" value={base64Image || ''} />
                    <div className="checkout-form-group">
                        <label htmlFor="prod-title">Title</label>
                        <input 
                            type="text" 
                            id="prod-title" 
                            name="title"
                            className="Input" 
                            placeholder="Value"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        {state.errors?.title && (
                        <span className="text-gray-500 text-sm mt-1">
                            {state.errors.title}
                        </span>
                    )}
                    </div>
                    <div className="checkout-form-group">
                        <label htmlFor="prod-description">Description</label>
                        <textarea 
                            id="prod-description" 
                            name="description"
                            className="Textarea" 
                            placeholder="Value" 
                            rows={4}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                        {state.errors?.description && (
                            <span className="text-gray-500 text-sm mt-1">
                                {state.errors.description}
                            </span>
                        )}
                    </div>
                    <div className="checkout-form-group">
                        <label htmlFor="prod-price">Price</label>
                        <input 
                            type="text" 
                            step="0.01"
                            id="prod-price" 
                            className="Input"
                            name="price" 
                            placeholder="Value"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        {state.errors?.price && (
                            <span className="text-gray-500 text-sm mt-1">
                                {state.errors.price}
                            </span>
                        )}
                    </div>
                    <div className="checkout-form-group">
                        <label>Category</label>
                        <div className="category-tags">
                            <input type="hidden" name="category" value={category} />
                            {availableCategories.map((categoryName) => {
                                const isActive = categoryName === category;
                                return (
                                    <button 
                                        key={categoryName} 
                                        type="button" 
                                        className={`category-tag ${isActive ? 'active' : ''}`}
                                        onClick={() => setCategory(categoryName)}
                                    >
                                        {isActive && (
                                            <svg 
                                                className="category-icon-check" 
                                                width="16" 
                                                height="16" 
                                                viewBox="0 0 16 16" 
                                                fill="none" 
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path 
                                                    d="M13.3337 4L6.00033 11.3333L2.66699 8" 
                                                    stroke="currentColor" 
                                                    strokeWidth="1.6"     
                                                    strokeLinecap="round"  
                                                    strokeLinejoin="round" 
                                                />
                                            </svg>
                                        )}
                                        {categoryName}
                                    </button>
                                );
                            })}
                        </div>
                        {state.errors?.category && (
                            <span className="text-gray-500 text-sm mt-1">
                                {state.errors.category}
                            </span>
                        )}
                    </div>
                    {state.errors?.global && (
                        <div className="text-gray-500 text-center font-medium mt-2">
                            {state.errors.global}
                        </div>
                    )}
                </form>
            </div>
            <div className="admin-form-actions">
                <button 
                    type="button" 
                    className="button button--primary"
                    disabled={isPending}
                    onClick={() => formRef.current?.requestSubmit()}
                >
                    {isPending ? 'Saving...' : (isEditMode ? 'Save Changes' : 'Save')}
                </button>
                <button type="button" className="button button--secondary" onClick={handleHide} disabled={isPending}>
                    Hide
                </button>
                <button type="button" className="button button--secondary" onClick={handleDelete} disabled={isPending}>
                    Delete
                </button>
            </div>
        </div>
    );
}

