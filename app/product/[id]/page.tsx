import ProductPageComponent from "@/app/components/ProductPageComponent/ProductPageComponent";
import { Iproduct, IReviewFull } from "@/app/types";
import Image from 'next/image'
import './productPageStyle.css'

interface IParams {
    params: Promise<{
        id: string
    }>
}

export default async function ProductPage({ params }: IParams) {
    const { id } = await params
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/productInfo/${id}`, {
            next: { 
                // revalidate: 60 * 60,
                revalidate: 0,
            }
        });
    const data:Iproduct = await response.json() 
    return (
        <section>
            <ProductPageComponent product={data}/>
            <section className="reviews-section container">
                            <h2 className="reviews-title">Latest reviews</h2>
                            <div className="reviews-grid">
                                {data.latestReviews?.map((review: IReviewFull) => (
                                    <div className="review-card">
                                        <div className="review-rating">
                                            {/* 1. Генерируем ЗАКРАШЕННЫЕ звёзды */}
                                            {[...Array(review.rating)].map((_, index) => (
                                                <svg className="star-icon star-icon--filled" viewBox="0 0 24 24" width="18" height="18">
                                                    <path d="M12 2a1 1 0 0 1 .93.64l2.28 4.93 5.38.45a1 1 0 0 1 .57 1.74l-4 3.65 1.19 5.3a1 1 0 0 1-1.49 1.08L12 17.15l-4.86 2.64a1 1 0 0 1-1.49-1.08l1.19-5.3-4-3.65a1 1 0 0 1 .57-1.74l5.38-.45 2.28-4.93A1 1 0 0 1 12 2z" />
                                                    </svg>
                                                ))}

                                            {/* 2. Генерируем ПУСТЫЕ (контурные) звёзды до 5 штук */}
                                            {[...Array(5 - review.rating)].map((_, index) => (
                                                <svg className="star-icon star-icon--empty" viewBox="0 0 24 24" width="18" height="18">
                                                    <path 
                                                        d="M12 2a1 1 0 0 1 .93.64l2.28 4.93 5.38.45a1 1 0 0 1 .57 1.74l-4 3.65 1.19 5.3a1 1 0 0 1-1.49 1.08L12 17.15l-4.86 2.64a1 1 0 0 1-1.49-1.08l1.19-5.3-4-3.65a1 1 0 0 1 .57-1.74l5.38-.45 2.28-4.93A1 1 0 0 1 12 2z" 
                                                        fill="none"
                                                        stroke="#ffb100"
                                                        strokeWidth="2"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            ))}
                                        </div>
                                        <div className="review-body">
                                            <h4 className="review-heading">{review.title}</h4>
                                            <p className="review-text">{review.comment}</p>
                                        </div>
                                        <div className="review-author">
                                            <Image src={review.userImage} alt={review.userName} width={40} height={40} className="author-avatar" />
                                            <span className="author-name">{review.userName}</span>
                                        </div>

                                    </div>
                                ))}
                            </div>
                        </section>
        </section>
    )
}