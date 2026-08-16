import { usersAllInfo } from "./UsersDB";

const productsWitoutReviews = [
    { 
        id: 1, 
        name: 'Citra Hops',
        unitMetrics: 'per 100g',
        price: 5.99,
        shortDescription: 'Ideal for IPAs and Pale Ales',
        image: '/images/products/citra_hops.jpg',
        description: [
            'Citra is one of the most sought-after and recognizable hop varieties in the world of craft brewing, famous for its bright and multifaceted citrus aroma. Developed in the USA, this variety is ideal for IPAs, Pale Ales, and other styles where a distinct fruity profile is desired.',
            'Citra boasts a high alpha acid content, making it excellent for both bitterness and intense aroma. It imparts notes of grapefruit, lime, passion fruit, lychee, and melon to beer, creating a unique tropical bouquet.',
            'Our T-90 pellets are hermetically sealed to preserve freshness and maximum aromatics.'
        ],
        technicalSpecifications: [
            {label: 'Origin', value: 'USA'},
            {label: 'Type', value: 'Aroma (Dual-Purpose)'},
            {label: 'Alpha Acids', value: '11.0% - 13.0%'},
            {label: 'Beta Acids', value: '3.0% - 4.5%'},
            {label: 'Aroma Profile', value: 'Grapefruit, Lime, Passion Fruit, Lychee, Melon'},
            {label: 'Usage', value: 'Late Kettle Addition, Dry Hopping'},
            {label: 'Recommended Beer Styles', value: 'IPA, Double IPA, Pale Ale, American Wheat'},
        ],
        latestReviews: [
            {
                id: 1,
                userId: 1,
                rating: 5,          
                title: 'Explosive Citrus Aroma!',          
                comment: 'Used Citra for my latest NEIPA, and the aroma is absolutely incredible. Poured hazy, with intense notes of grapefruit and passion fruit. A must-have for any hop-forward beer!',
            },
            {
                id: 2,
                userId: 2,
                rating: 5,          
                title: 'Great for Beginners',          
                comment: `When I was just starting to brew, this was the yeast recommended to me, and I have no regrets. It's very forgiving with temperature and handles many beginner mistakes.`,
            },
            {
                id: 3,
                userId: 3,
                rating: 5,          
                title: 'Perfect Citrus!',          
                comment: 'The beer always turns out great. A must-have for any hop-forward beer!',
            },
        ]
    },
    { 
        id: 2, 
        name: 'Maris Otter Pale Malt',
        price: 2.50,
        shortDescription: 'Perfect for traditional ales',
        image: '/images/products/maris_otter_malt.jpg'
    }
];


export const productsAllInfo = productsWitoutReviews.map(product => {
    return {
        ...product,
        // Пересобираем отзывы внутри каждого товара
        latestReviews: product.latestReviews?.map(review => {
            // Ищем пользователя в базе по его ID (приводим к строке для безопасности)
            const user = usersAllInfo.find(u => String(u.id) === String(review.userId));
            
            return {
                ...review,
                // Автоматически подставляем имя и фото, если пользователь найден
                userName: user ? user.name : "Anonymous User",
                userImage: user ? user.image : "/images/avatars/default-avatar.png"
            };
        })
    };
});