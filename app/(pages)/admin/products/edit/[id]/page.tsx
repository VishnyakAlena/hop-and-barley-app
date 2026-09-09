import ProductAddEditForm from "@/app/components/admin-page/ProductAddForm/ProductAddEditForm";

interface EditPageProps {
    params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: EditPageProps) {

    const { id } = await params; 

    return (
        <div className="admin-content">
            <ProductAddEditForm productId={id} />
        </div>
    );
}