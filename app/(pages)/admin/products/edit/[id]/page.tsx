import ProductAddEditForm from "@/app/components/admin-page/ProductAddForm/ProductAddEditForm";

interface EditPageProps {
    params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: EditPageProps) {
    // Разворачиваем параметры роута в Next.js 15
    const { id } = await params; 

    return (
        <div className="admin-content">
            <ProductAddEditForm productId={id} />
        </div>
    );
}