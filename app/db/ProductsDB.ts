import { usersAllInfo } from "./UsersDB";

const productsWitoutUsersofReviews = [
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
        unitMetrics: 'per 100g',
        price: 2.50,
        shortDescription: 'Perfect for traditional ales',
        image: '/images/products/maris_otter_malt.jpg',
        description: [
            'Maris Otter Pale Malt is the cornerstone of British brewing heritage, a revered base malt prized by brewers worldwide for its exceptional quality and flavor.',
            'It provides a rich, slightly sweet, and biscuity malt backbone that is more complex than standard 2-row malts, with subtle nutty undertones that enhance any beer style. Perfect for creating authentic British ales such as Bitters, IPAs, Porters, and Stouts.',
            'Its excellent processing characteristics and high extract yield make it a reliable and efficient choice for both novice and experienced brewers.'
        ],
        technicalSpecifications: [
            {label: 'Origin', value: 'United Kingdom'},
            {label: 'Type', value: 'Base Malt'},
            {label: 'Color (°L)', value: '2.5 - 4.0 °L'},
            {label: 'Moisture', value: '4.0% max'},
            {label: 'Protein', value: '9.5% - 10.5%'},
            {label: 'Diastatic Power', value: '≈ 120 °L'},
            {label: 'Usage', value: 'Up to 100% of the grist'},
            {label: 'Recommended Beer Styles', value: 'English Pale Ale, ESB, Bitter, Porter, Stout, Mild Ale'},
        ],
        latestReviews: [
            {
                id: 1,
                userId: 4,
                rating: 5,          
                title: 'The Gold Standard!',          
                comment: 'Unbeatable flavor for my bitters. If you want to brew a real British ale, you have to start with this malt. Fantastic efficiency and a wonderful aroma during the mash. 10/10.',
            },
            {
                id: 2,
                userId: 5,
                rating: 5,          
                title: 'Incredibly Reliable and Flavorful',          
                comment: `I've been using this malt for years. It always crushes perfectly, gives predictable results, and lends a depth to the beer that you just can't find in other base malts. Perfect for porters.`,
            },
            {
                id: 3,
                userId: 6,
                rating: 4,          
                title: 'Adds Great Complexity',          
                comment: 'I usually use American 2-row, but decided to try Maris Otter for my pale ale. The difference is noticeable! It added pleasant biscuit notes. A bit more expensive, so 4 stars, but the flavor is a solid 5.',
            },
        ]
    },
    { 
        id: 3, 
        name: 'SafAle US-05 Dry Ale Yeast',
        unitMetrics: 'per 11.5g sachet',
        price: 3.25,
        shortDescription: 'Clean fermenting American ale yeast',
        image: '/images/products/safale_us05_yeast.jpg',
        description: [
            'SafAle US-05 is the most famous and popular American ale yeast in the world. This strain is renowned for its ability to produce clean, crisp beers with a neutral flavor profile, allowing the hop and malt character to shine through.',
            'With its high attenuation and high flocculation, US-05 is ideal for a wide range of American ale styles, from West Coast IPAs to American Pale Ales and Cream Ales. It forms a firm sediment, making racking and clarification easier.',
            'Reliable, easy to use, and available in a dry format, this yeast is the number one choice for brewers seeking consistent and predictable results.'
        ],
        technicalSpecifications: [
            {label: 'Origin', value: 'USA'},
            {label: 'Type', value: 'Dry Ale Yeast'},
            {label: 'Attenuation', value: '78-82%'},
            {label: 'Flocculation', value: 'Medium to High'},
            {label: 'Alcohol Tolerance', value: '9-11% ABV'},
            {label: 'Fermentation Temperature', value: '59-75°F (15-24°C)'},
            {label: 'Pitching Rate', value: '11.5g sachet for 5-6 gallons (20-23 L)'},
            {label: 'Recommended Beer Styles', value: 'American Pale Ale, American IPA, Brown Ale, Porter, Stout, American Wheat'},
        ],
        latestReviews: [
            {
                id: 1,
                userId: 7,
                rating: 5,          
                title: 'The Workhorse of My Brewery',          
                comment: `I use US-05 for almost 80% of my ales. Incredibly reliable yeast. Always starts fast, ferments clean, and drops out nicely. You can't go wrong with this strain.`,
            },
            {
                id: 2,
                userId: 8,
                rating: 5,          
                title: 'Clean & Crisp, Perfect for IPAs',          
                comment: `If you want your hops to be the star of your IPA, this is your yeast. No off-flavors, just pure, bright hop aroma. US-05 has never failed me.`,
            },
            {
                id: 3,
                userId: 9,
                rating: 5,          
                title: 'Great for Beginners',          
                comment: `When I was just starting to brew, this was the yeast recommended to me, and I have no regrets. It's very forgiving with temperature and handles many beginner mistakes. The beer always turns out great`,
            },
        ]
    },
    { 
        id: 4, 
        name: 'Cascade Hops',
        unitMetrics: 'per 100g',
        price: 7.49,
        shortDescription: 'Great for dry hopping',
        image: '/images/products/cascade_hops.jpg',
        description: [
            'Cascade is arguably the most famous hop in the American craft brewing revolution. Developed in Oregon, it has a unique floral and citrus character that defined the taste of the classic American Pale Ale.',
            'Its moderate bitterness and vibrant aroma, with notes of grapefruit, orange, and light floral undertones, make it incredibly versatile. Cascade is excellent for both bittering and late kettle additions or for dry hopping.',
            'This hop is a reliable choice for brewers looking to create a refreshing, balanced, and recognizable ale.'
        ],
        technicalSpecifications: [
            {label: 'Origin', value: 'USA'},
            {label: 'Type', value: 'Aroma (Dual-Purpose)'},
            {label: 'Alpha Acids', value: '4.5% - 7.0%'},
            {label: 'Beta Acids', value: '4.5% - 7.0%'},
            {label: 'Aroma Profile', value: 'Medium-intensity floral, citrus (grapefruit), and spicy notes.'},
            {label: 'Cohumulone', value: '33% - 40%'},
            {label: 'Total Oil', value: '0.8 - 1.5 mL/100g'},
            {label: 'Recommended Beer Styles', value: 'American Pale Ale, IPA, Porter, Barleywine, Witbier'},
        ],
        latestReviews: [
            {
                id: 1,
                userId: 10,
                rating: 5,          
                title: 'The Classic APA Hop',          
                comment: `If you're brewing an American Pale Ale, you simply have to use Cascade. It's a classic. Bright, citrusy, refreshing. Never fails. Opens up beautifully on the dry hop.`,
            },
            {
                id: 2,
                userId: 11,
                rating: 5,          
                title: 'My Go-To Aroma Hop',          
                comment: `I add Cascade to almost all of my light ales for aroma. It gives the beer that signature character everyone loves. The fresh harvest smells absolutely divine!`,
            },
            {
                id: 3,
                userId: 12,
                rating: 4,          
                title: 'Solid and Dependable',          
                comment: `A good, reliable hop. Not as "explosive" as Citra or Mosaic, but for a balanced beer, it's just what you need. Sometimes the alpha acids are on the lower end, so check the batch specs. Otherwise, excellent.`,
            },
        ]
    },
    { 
        id: 5, 
        name: 'Caramel Malt 60L',
        unitMetrics: 'per 1 lb',
        price: 3.00,
        shortDescription: 'Head retention in darker beers',
        image: '/images/products/caramel_malt.jpg',
        description: [
            'Caramel Malt 60L (also known as Crystal 60L) is a versatile specialty malt that is a secret weapon for many brewers to enhance beer color, flavor, and body. It imparts a beautiful copper-amber hue to the brew.',
            'The flavor of this malt is characterized by distinct notes of caramel, toffee, and light hints of toasted bread. It adds a pleasant sweetness to the beer that beautifully balances hop bitterness and also contributes to improved head retention.',
            'Caramel Malt 60L is ideal for a wide range of styles, from Pale Ales and Amber Ales to Porters and Stouts, adding complexity and depth.'
        ],
        technicalSpecifications: [
            {label: 'Origin', value: 'USA / Belgium'},
            {label: 'Type', value: 'Crystal/Caramel Malt'},
            {label: 'Color (°L)', value: '60 °L'},
            {label: 'Moisture', value: '5.0% max'},
            {label: 'Extract FG, Dry', value: '75%'},
            {label: 'Flavor Profile', value: 'Sweet, caramel, toffee, hints of toasted bread'},
            {label: 'Usage', value: 'Typically 3-15% of the grist'},
            {label: 'Recommended Beer Styles', value: 'Pale Ale, Amber Ale, IPA, Brown Ale, Porter, Stout, Scotch Ale'},
        ],
        latestReviews: [
            {
                id: 1,
                userId: 13,
                rating: 5,          
                title: 'The Classic APA Hop',          
                comment: `60L is my favorite caramel malt. It's not too light and not too dark. It provides the perfect balance of sweetness and caramel flavor for my Amber Ales. The color comes out just gorgeous.`
            },
            {
                id: 2,
                userId: 14,
                rating: 5,          
                title: 'Never Brew Without It',          
                comment: `I add a bit of C60 to almost every recipe. It improves head retention and gives the beer a finished quality that's hard to achieve otherwise. Works great in IPAs to balance the bitterness.`,
            },
            {
                id: 3,
                userId: 15,
                rating: 5,          
                title: 'Consistent and Reliable',          
                comment: `The quality of this malt is always top-notch. Consistent color, wonderful aroma when crushed. If a recipe calls for Crystal 60, this is the one I always reach for. Recommended.`,
            },
        ]
    },
    { 
        id: 6, 
        name: 'Saaz Hops',
        unitMetrics: 'per 100g',
        price: 4.75,
        shortDescription: 'Essential for Lagers',
        image: '/images/products/saaz_hops.jpg',
        description: [
            'Saaz is a noble hop, the heart and soul of classic Bohemian and Czech pilsners. Grown in the Žatec region of the Czech Republic, it possesses a delicate and refined aromatic profile that is unmistakable.',
            'Its aroma is characterized by soft, spicy, herbal, and floral notes. Saaz is primarily used for aroma rather than bitterness, as its alpha acid content is low. It imparts a classic European elegance and clean taste to the beer.',
            'If you aim to brew an authentic Czech pilsner, European lager, or Belgian ale, Saaz is an indispensable ingredient.'
        ],
        technicalSpecifications: [
            {label: 'Origin', value: 'Czech Republic'},
            {label: 'Type', value: 'Aroma'},
            {label: 'Alpha Acids', value: '2.0% - 5.0%'},
            {label: 'Beta Acids', value: '4.5% - 8.0%'},
            {label: 'Aroma Profile', value: 'Mild, pleasant, earthy, spicy, and floral.'},
            {label: 'Cohumulone', value: '23% - 28%'},
            {label: 'Total Oil', value: '0.4 - 1.0 mL/100g'},
            {label: 'Recommended Beer Styles', value: 'Bohemian Pilsner, German Pilsner, Light Lagers, Belgian Ales, Lambic'},
        ],
        latestReviews: [
            {
                id: 1,
                userId: 16,
                rating: 5,          
                title: 'The Only Choice for Pilsners',    
                comment: `Don't even think about brewing a Czech pilsner without Saaz. This hop *is* that flavor. Gentle, spicy, perfect. I always buy the fresh harvest; the aroma is just amazing.`
            },
            {
                id: 2,
                userId: 17,
                rating: 5,          
                title: 'Delicate and Refined',    
                comment: `I used it in a Belgian Saison, and it added a wonderful, subtle complexity. It doesn't overpower the yeast character but complements it. Very pleased with the result.`,
            },
            {
                id: 3,
                userId: 18,
                rating: 4,          
                title: 'Low Alpha, High Aroma',        
                comment: `You need to know what you're buying this hop for. It provides almost no bitterness, so it's not suitable for that. But for late-boil aroma, it's unparalleled. Docking one star only because you need to use quite a bit for a noticeable effect.`,
            },
        ]
    },
    { 
        id: 7, 
        name: 'Pilsner Malt',
        unitMetrics: 'per 1 lb',
        price: 2.20,
        shortDescription: 'Foundation for lagers and pilsners',
        image: '/images/products/pilsner_malt.jpg',
        description: [
            'Pilsner Malt is the lightest base malt, forming the foundation for classic German and Czech pilsners, as well as a multitude of other light lagers and ales. It is produced from high-quality two-row barley and undergoes gentle kilning at low temperatures.',
            'This malt imparts a very light, straw-like color and a clean, slightly sweet, grainy flavor to the beer. Its neutral character allows the aroma of hops and the work of the yeast to fully express themselves, making it an ideal base for beers where purity and crispness are paramount.',
            'Thanks to its high enzymatic activity, Pilsner Malt is excellent for mashes with a large proportion of unmalted grains'
        ],
        technicalSpecifications: [
            {label: 'Origin', value: 'Germany / Belgium'},
            {label: 'Type', value: 'Base Malt'},
            {label: 'Color (°L)', value: '1.5 - 2.1 °L'},
            {label: 'Moisture', value: '4.5% max'},
            {label: 'Protein', value: '10.0% - 11.5%'},
            {label: 'Diastatic Power', value: '> 100 °Lintner'},
            {label: 'Flavor Profile', value: 'Clean, light, sweet, grainy'},
            {label: 'Usage', value: 'Up to 100% of the grist'},
            {label: 'Recommended Beer Styles', value: 'Pilsner, Helles, Kolsch, Belgian Tripel, Light Lagers, Saison'},
        ],
        latestReviews: [
            {
                id: 1,
                userId: 19,
                rating: 5,          
                title: 'The Only Choice for Pilsners',    
                comment: `Don't even think about brewing a Czech pilsner without Saaz. This hop *is* that flavor. Gentle, spicy, perfect. I always buy the fresh harvest; the aroma is just amazing.`
            },
            {
                id: 2,
                userId: 20,
                rating: 5,          
                title: 'Delicate and Refined',    
                comment: `I used it in a Belgian Saison, and it added a wonderful, subtle complexity. It doesn't overpower the yeast character but complements it. Very pleased with the result.`,
            },
            {
                id: 3,
                userId: 21,
                rating: 4,          
                title: 'Low Alpha, High Aroma',        
                comment: `You need to know what you're buying this hop for. It provides almost no bitterness, so it's not suitable for that. But for late-boil aroma, it's unparalleled. Docking one star only because you need to use quite a bit for a noticeable effect.`,
            },
        ]
    },
    { 
        id: 8, 
        name: 'Imperial Organic Yeast A07',
        unitMetrics: 'per pouch',
        price: 8.99,
        shortDescription: 'American ales with citrus notes',
        image: '/images/products/imperial_yeast.jpg',
        description: [
            'Imperial Organic Yeast A07 "Flagship" is a versatile and extremely popular liquid yeast, known for its ability to create balanced ales with a light fruity character. This strain is a true workhorse and is perfect for most American beer styles.',
            `"Flagship" provides a clean fermentation with light ester notes of citrus and stone fruit that complement, rather than overpower, the hop and malt profile. It has good attenuation and moderate flocculation, leaving behind a soft and smooth mouthfeel.`,
            'Thanks to the high cell count per package (200 billion), this yeast does not require a starter for most standard batches of beer, making it a convenient and reliable choice.'
        ],
        technicalSpecifications: [
            {label: 'Strain Type', value: 'Ale'},
            {label: 'Flocculation', value: 'Medium'},
            {label: 'Attenuation', value: '73-77%'},
            {label: 'Temperature Range', value: '62-72°F (17-22°C)'},
            {label: 'Alcohol Tolerance', value: '10% ABV'},
            {label: 'Flavor Profile', value: 'Balanced, slightly fruity, hints of citrus and stone fruit.'},
            {label: 'Cell Count', value: '~200 Billion Cells'},
            {label: 'Recommended Beer Styles', value: 'American Pale Ale, IPA, Double IPA, Porter, Stout, Amber Ale'},
        ],
        latestReviews: [
            {
                id: 1,
                userId: 22,
                rating: 5,          
                title: 'My House Strain!',    
                comment: `I've tried many yeasts, but I always come back to A07. This is my "house" strain for all American ales. It's reliable, clean, and predictable. And the fact that you don't need a starter saves a ton of time!`
            },
            {
                id: 2,
                userId: 23,
                rating: 5,          
                title: 'Perfect for Hazy IPAs',    
                comment: `This yeast works great in NEIPAs. It leaves a bit of body and enhances the fruity notes of the hops, creating that "juicy" flavor. Highly recommend.`,
            },
            {
                id: 3,
                userId: 24,
                rating: 4,          
                title: 'Great, but temperature sensitive',    
                comment: `An excellent strain, it fermented my APA to perfection. The only thing is, try to keep the temperature at the lower end of the range. If it gets too warm, it can produce too many esters. But with proper control, the result is superb.`,
            },
        ]
    },
    { 
        id: 9, 
        name: 'Centennial Hops',
        unitMetrics: 'per 100g',
        price: 6.20,
        shortDescription: 'Often called "Super Cascade"',
        image: '/images/products/centennial_hops.jpg',
        description: [
            'Centennial is a classic American hop often referred to as "Super Cascade" due to its similar citrus profile but with a higher intensity and alpha acid content. It is one of the "Three Cs" (along with Cascade and Columbus) that defined the flavor of American IPAs.',
            `The aroma of Centennial is powerful, with bright notes of lemon, grapefruit, and pronounced floral undertones. Unlike Cascade, it is less spicy and more "clean" in its citrus expression. Thanks to its high alpha acid content, it is excellent for both bittering and creating an intense aroma.`,
            'This is an extremely versatile hop, perfect for American Pale Ales, IPAs, and Double IPAs, giving them a bright and recognizable character.'
        ],
        technicalSpecifications: [
            {label: 'Origin', value: 'USA'},
            {label: 'Type', value: 'Dual-Purpose'},
            {label: 'Alpha Acids', value: '9.0% - 11.5%'},
            {label: 'Beta Acids', value: '3.5% - 4.5%'},
            {label: 'Aroma Profile', value: 'Intense floral and citrus (lemon, grapefruit).'},
            {label: 'Cohumulone', value: '28% - 30%'},
            {label: 'Total Oil', value: '1.5 - 2.5 mL/100g'},
            {label: 'Recommended Beer Styles', value: 'All US Ale styles, especially IPA, Double IPA, and American Pale Ale.'},
        ],
        latestReviews: [
            {
                id: 1,
                userId: 25,
                rating: 5,          
                title: 'Super Cascade Indeed!',    
                comment: `The name says it all. It's like Cascade, but better. More citrus, more bitterness, more everything. Perfect for a single-hop IPA. One of my all-time favorite hops.`
            },
            {
                id: 2,
                userId: 26,
                rating: 5,          
                title: 'Clean Bitterness',   
                comment: `I use Centennial for the main bittering in my IPAs. It provides a very clean, smooth bitterness without the harshness that can sometimes come from other high-alpha varieties. And the whirlpool aroma is fantastic.`,
            },
            {
                id: 3,
                userId: 27,
                rating: 5,          
                title: 'A Classic for a Reason',    
                comment: `You can't go wrong with Centennial. It's a time-tested, reliable hop. Perfect for a classic West Coast IPA. Always delivers predictable and excellent results.`,
            },
        ]
    },
    { 
        id: 10, 
        name: 'Duo Citra Hops',
        unitMetrics: 'per 100g',
        price: 9.50,
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
        id: 11, 
        name: 'Centennial Hops 10kg',
        unitMetrics: 'per 10kg',
        price: 60,
        shortDescription: 'Often called "Super Cascade"',
        image: '/images/products/centennial_hops.jpg',
        description: [
            'Centennial is a classic American hop often referred to as "Super Cascade" due to its similar citrus profile but with a higher intensity and alpha acid content. It is one of the "Three Cs" (along with Cascade and Columbus) that defined the flavor of American IPAs.',
            `The aroma of Centennial is powerful, with bright notes of lemon, grapefruit, and pronounced floral undertones. Unlike Cascade, it is less spicy and more "clean" in its citrus expression. Thanks to its high alpha acid content, it is excellent for both bittering and creating an intense aroma.`,
            'This is an extremely versatile hop, perfect for American Pale Ales, IPAs, and Double IPAs, giving them a bright and recognizable character.'
        ],
        technicalSpecifications: [
            {label: 'Origin', value: 'USA'},
            {label: 'Type', value: 'Dual-Purpose'},
            {label: 'Alpha Acids', value: '9.0% - 11.5%'},
            {label: 'Beta Acids', value: '3.5% - 4.5%'},
            {label: 'Aroma Profile', value: 'Intense floral and citrus (lemon, grapefruit).'},
            {label: 'Cohumulone', value: '28% - 30%'},
            {label: 'Total Oil', value: '1.5 - 2.5 mL/100g'},
            {label: 'Recommended Beer Styles', value: 'All US Ale styles, especially IPA, Double IPA, and American Pale Ale.'},
        ],
        latestReviews: [
            {
                id: 1,
                userId: 25,
                rating: 5,          
                title: 'Super Cascade Indeed!',    
                comment: `The name says it all. It's like Cascade, but better. More citrus, more bitterness, more everything. Perfect for a single-hop IPA. One of my all-time favorite hops.`
            },
            {
                id: 2,
                userId: 26,
                rating: 5,          
                title: 'Clean Bitterness',   
                comment: `I use Centennial for the main bittering in my IPAs. It provides a very clean, smooth bitterness without the harshness that can sometimes come from other high-alpha varieties. And the whirlpool aroma is fantastic.`,
            },
            {
                id: 3,
                userId: 27,
                rating: 5,          
                title: 'A Classic for a Reason',    
                comment: `You can't go wrong with Centennial. It's a time-tested, reliable hop. Perfect for a classic West Coast IPA. Always delivers predictable and excellent results.`,
            },
        ]
    },
    { 
        id: 12, 
        name: 'Unmalted Wheat',
        unitMetrics: 'per 1 lb',
        price: 1.80,
        shortDescription: 'Often called "blanche"',
        image: '/images/products/unmalted_wheat.jpg',
        description: [
            'Unmalted wheat is the secret ingredient behind the classic hazy, refreshing character of Belgian Witbier. Unlike malted wheat, this is raw, unprocessed grain that imparts a unique texture and flavor to the beer.',
            `Using unmalted wheat provides the beer with its characteristic light haze, a smooth, silky body, and a subtle, bready-grainy flavor that doesn't overpower the delicate notes of coriander and orange peel. The high protein content of this grain also contributes to a dense and persistent head.`,
            'This ingredient is a must-have for any brewer aiming to recreate an authentic Belgian Witbier or to add complexity and body to other styles, such as Lambics.'
        ],
        technicalSpecifications: [
            {label: 'Origin', value: 'Belgium / USA'},
            {label: 'Type', value: 'Unmalted Adjunct'},
            {label: 'Color (°L)', value: '~2.0 °L'},
            {label: 'Moisture', value: '12% max'},
            {label: 'Protein', value: 'High (contributes to haze and head retention)'},
            {label: 'Flavor Profile', value: 'Neutral, subtle raw grain, bready'},
            {label: 'Usage', value: 'Typically 30-50% of the grist for Witbiers. Requires a cereal mash or a mash with high diastatic power malts (like Pilsner or 6-Row).'},
            {label: 'Recommended Beer Styles', value: 'Belgian Witbier, Lambic, Grand Cru, certain Saisons.'},
        ],
        latestReviews: [
            {
                id: 1,
                userId: 28,
                rating: 5,          
                title: 'The Key to a True Wit',    
                comment: `I tried brewing witbiers with malted wheat, and they were okay. But as soon as I added unmalted wheat, everything fell into place! That signature light haze, that smoothness. This is it!`
            },
            {
                id: 2,
                userId: 29,
                rating: 5,          
                title: `Don't Forget the Rice Hulls!`,   
                comment: `Great product, gives the beer a perfect body. A little tip: don't forget to add rice hulls to the mash! This wheat is very sticky and can completely clog your filter bed. With hulls, no problem at all`,
            },
            {
                id: 3,
                userId: 30,
                rating: 4,          
                title: 'Great result, tricky to work with',    
                comment: `The result exceeded expectations, the witbier turned out silky and delicious. But it's definitely trickier to work with than malt. You need a good mill and patience during sparging. But for an authentic taste, it's worth it.`,
            },
        ]
    },
    { 
        id: 13, 
        name: 'Mosaic Hops',
        unitMetrics: 'per 100g',
        price: 9.50,
        shortDescription: 'Mosaic is one of the most vibrant and multifaceted hops on the modern craft scene',
        image: '/images/products/mosaic_hops.jpg',
        description: [
            'Mosaic is one of the most vibrant and multifaceted hops on the modern craft scene. As a "daughter" of Simcoe, it inherited the best from its lineage and added a unique palette of aromas, making it a true aromatic bomb.',
            `The name "Mosaic" is fully justified: it creates a complex mosaic of flavors and aromas, including notes of tropical fruits (mango, guava), citrus (tangerine), berries (blueberry), stone fruits (peach), and even light pine and earthy undertones.`,
            'This hop is ideal for dry hopping in IPA and Pale Ale styles, where it can unleash its full potential, creating a juicy, vibrant, and unforgettable beer.'
        ],
        technicalSpecifications: [
            {label: 'Origin', value: 'USA'},
            {label: 'Type', value: 'Dual-Purpose'},
            {label: 'Alpha Acids', value: '11.5% - 13.5%'},
            {label: 'Beta Acids', value: '3.2% - 3.9%'},
            {label: 'Aroma Profile', value: 'Complex and multifaceted. Tropical fruit (mango, guava), citrus (tangerine), berry (blueberry), stone fruit (peach), pine, and earthy notes.'},
            {label: 'Cohumulone', value: '24% - 26%'},
            {label: 'Total Oil', value: '1.0 - 1.5 mL/100g'},
            {label: 'Recommended Beer Styles', value: 'IPA, Double IPA, Hazy/NEIPA, American Pale Ale, Session IPA.'},
        ],
        latestReviews: [
            {
                id: 1,
                userId: 31,
                rating: 5,          
                title: 'A Flavor Explosion!',  
                comment: `If you want to brew a Hazy IPA that smells like a tropical fruit basket, Mosaic is your choice. Added it on the dry hop, and the result exceeded all expectations. Incredible!`
            },
            {
                id: 2,
                userId: 32,
                rating: 5,          
                title: `So Complex and Delicious`,   
                comment: `This hop has it all! Every time I use it, I find new nuances—sometimes mango, sometimes blueberry, sometimes pine. It never gets old. Worth every penny.`,
            },
            {
                id: 3,
                userId: 33,
                rating: 5,          
                title: 'My Secret Weapon',    
                comment: `I love mixing Mosaic with Citra 1:1 for my DIPAs. They create the perfect tandem. Mosaic adds that "berry" complexity that Citra lacks. A true secret weapon.`,
            },
        ]
    },
    { 
        id: 14, 
        name: 'West Coast IPA - All-Grain Kit',
        unitMetrics: 'for 5 Gallons',
        price: 60.00,
        shortDescription: 'This kit contains all the necessary ingredients to create a bright, bitter, and incredibly aromatic IPA in the style of the US West Coast.',
        image: '/images/products/ipa_kit.jpg',
        description: [
            'Brew a craft brewing classic with our "West Coast IPA - All-Grain Kit"! This kit contains all the necessary ingredients to create a bright, bitter, and incredibly aromatic IPA in the style of the US West Coast.',
            `We've selected the perfect combination of malts to achieve a clean, dry body that serves as an excellent base for a hop explosion. The kit includes a powerful combination of Centennial, Simcoe, and Columbus hops, which provide a burst of citrus, pine, and resinous notes characteristic of this style.`,
            'This kit is your ticket to the world of true West Coast IPA. It comes with detailed step-by-step instructions to guide you through every stage, from mashing to bottling.'
        ],
        technicalSpecifications: [
            {label: 'Kit Type', value: 'All-Grain'},
            {label: 'Batch Size', value: '5 Gallons (19 Liters)'},
            {label: 'Estimated OG', value: '1.065'},
            {label: 'Estimated FG', value: '1.012'},
            {label: 'Estimated ABV', value: '6.9%'},
            {label: 'IBU', value: '65'},
            {label: 'Included Ingredients', value: '12 lbs Maris Otter Pale Malt <br /> 1 lb Caramel Malt 40L <br /> 0.5 lb Dextrin Malt <br /> 1 oz Columbus Hops (60 min) <br /> 1 oz Simcoe Hops (15 min) <br /> 1 oz Centennial Hops (5 min) <br /> 2 oz Centennial Hops (Dry Hop) <br />1 pack SafAle US-05 Dry Ale Yeast <br /> Whirlfloc Tablet, Priming Sugar, Step-by-step Instructions'},
        ],
        latestReviews: [
            {
                id: 1,
                userId: 34,
                rating: 5,          
                title: 'Authentic West Coast Flavor!',  
                comment: `This kit is the bomb! The beer turned out exactly how I love it: bitter, aromatic, with a powerful pine-citrus profile. The instructions are very clear. Will definitely buy again.`
            },
            {
                id: 2,
                userId: 35,
                rating: 5,          
                title: `Great Value and Quality`,   
                comment: `Excellent value for money. All ingredients are fresh, the malt is well-milled, and the hops are aromatic. Ended up with 5 gallons of excellent IPA. Much easier than sourcing everything separately.`,
            },
            {
                id: 3,
                userId: 36,
                rating: 4,          
                title: 'Awesome, but bitter!',    
                comment: `The kit is super, but be prepared for the bitterness! This is a real West Coast IPA, not a modern "smoothie". If you love the classics, you'll enjoy it. I might reduce the 60-minute hop addition slightly, but that's a matter of taste.`,
            },
        ]
    },
    { 
        id: 15, 
        name: 'Citra Hops 1kg',
        unitMetrics: 'per 1kg',
        price: 59.9,
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
        id: 16, 
        name: 'Maris Otter Pale Malt 1kg',
        unitMetrics: 'per 1kg',
        price: 25.00,
        shortDescription: 'Perfect for traditional ales',
        image: '/images/products/maris_otter_malt.jpg',
        description: [
            'Maris Otter Pale Malt is the cornerstone of British brewing heritage, a revered base malt prized by brewers worldwide for its exceptional quality and flavor.',
            'It provides a rich, slightly sweet, and biscuity malt backbone that is more complex than standard 2-row malts, with subtle nutty undertones that enhance any beer style. Perfect for creating authentic British ales such as Bitters, IPAs, Porters, and Stouts.',
            'Its excellent processing characteristics and high extract yield make it a reliable and efficient choice for both novice and experienced brewers.'
        ],
        technicalSpecifications: [
            {label: 'Origin', value: 'United Kingdom'},
            {label: 'Type', value: 'Base Malt'},
            {label: 'Color (°L)', value: '2.5 - 4.0 °L'},
            {label: 'Moisture', value: '4.0% max'},
            {label: 'Protein', value: '9.5% - 10.5%'},
            {label: 'Diastatic Power', value: '≈ 120 °L'},
            {label: 'Usage', value: 'Up to 100% of the grist'},
            {label: 'Recommended Beer Styles', value: 'English Pale Ale, ESB, Bitter, Porter, Stout, Mild Ale'},
        ],
        latestReviews: [
            {
                id: 1,
                userId: 4,
                rating: 5,          
                title: 'The Gold Standard!',          
                comment: 'Unbeatable flavor for my bitters. If you want to brew a real British ale, you have to start with this malt. Fantastic efficiency and a wonderful aroma during the mash. 10/10.',
            },
            {
                id: 2,
                userId: 5,
                rating: 5,          
                title: 'Incredibly Reliable and Flavorful',          
                comment: `I've been using this malt for years. It always crushes perfectly, gives predictable results, and lends a depth to the beer that you just can't find in other base malts. Perfect for porters.`,
            },
            {
                id: 3,
                userId: 6,
                rating: 4,          
                title: 'Adds Great Complexity',          
                comment: 'I usually use American 2-row, but decided to try Maris Otter for my pale ale. The difference is noticeable! It added pleasant biscuit notes. A bit more expensive, so 4 stars, but the flavor is a solid 5.',
            },
        ]
    },
    { 
        id: 17, 
        name: 'SafAle US-05 Dry Ale Yeast 10-sachet pack',
        unitMetrics: 'per 115g Pack (10 x 11.5g sachets) ',
        price: 32.5,
        shortDescription: 'Clean fermenting American ale yeast',
        image: '/images/products/safale_us05_yeast.jpg',
        description: [
            'SafAle US-05 is the most famous and popular American ale yeast in the world. This strain is renowned for its ability to produce clean, crisp beers with a neutral flavor profile, allowing the hop and malt character to shine through.',
            'With its high attenuation and high flocculation, US-05 is ideal for a wide range of American ale styles, from West Coast IPAs to American Pale Ales and Cream Ales. It forms a firm sediment, making racking and clarification easier.',
            'Reliable, easy to use, and available in a dry format, this yeast is the number one choice for brewers seeking consistent and predictable results.'
        ],
        technicalSpecifications: [
            {label: 'Origin', value: 'USA'},
            {label: 'Type', value: 'Dry Ale Yeast'},
            {label: 'Attenuation', value: '78-82%'},
            {label: 'Flocculation', value: 'Medium to High'},
            {label: 'Alcohol Tolerance', value: '9-11% ABV'},
            {label: 'Fermentation Temperature', value: '59-75°F (15-24°C)'},
            {label: 'Pitching Rate', value: '11.5g sachet for 5-6 gallons (20-23 L)'},
            {label: 'Recommended Beer Styles', value: 'American Pale Ale, American IPA, Brown Ale, Porter, Stout, American Wheat'},
        ],
        latestReviews: [
            {
                id: 1,
                userId: 7,
                rating: 5,          
                title: 'The Workhorse of My Brewery',          
                comment: `I use US-05 for almost 80% of my ales. Incredibly reliable yeast. Always starts fast, ferments clean, and drops out nicely. You can't go wrong with this strain.`,
            },
            {
                id: 2,
                userId: 8,
                rating: 5,          
                title: 'Clean & Crisp, Perfect for IPAs',          
                comment: `If you want your hops to be the star of your IPA, this is your yeast. No off-flavors, just pure, bright hop aroma. US-05 has never failed me.`,
            },
            {
                id: 3,
                userId: 9,
                rating: 5,          
                title: 'Great for Beginners',          
                comment: `When I was just starting to brew, this was the yeast recommended to me, and I have no regrets. It's very forgiving with temperature and handles many beginner mistakes. The beer always turns out great`,
            },
        ]
    },
    { 
        id: 18, 
        name: 'Cascade Hops 1kg',
        unitMetrics: 'per 1kg',
        price: 74.9,
        shortDescription: 'Great for dry hopping',
        image: '/images/products/cascade_hops.jpg',
        description: [
            'Cascade is arguably the most famous hop in the American craft brewing revolution. Developed in Oregon, it has a unique floral and citrus character that defined the taste of the classic American Pale Ale.',
            'Its moderate bitterness and vibrant aroma, with notes of grapefruit, orange, and light floral undertones, make it incredibly versatile. Cascade is excellent for both bittering and late kettle additions or for dry hopping.',
            'This hop is a reliable choice for brewers looking to create a refreshing, balanced, and recognizable ale.'
        ],
        technicalSpecifications: [
            {label: 'Origin', value: 'USA'},
            {label: 'Type', value: 'Aroma (Dual-Purpose)'},
            {label: 'Alpha Acids', value: '4.5% - 7.0%'},
            {label: 'Beta Acids', value: '4.5% - 7.0%'},
            {label: 'Aroma Profile', value: 'Medium-intensity floral, citrus (grapefruit), and spicy notes.'},
            {label: 'Cohumulone', value: '33% - 40%'},
            {label: 'Total Oil', value: '0.8 - 1.5 mL/100g'},
            {label: 'Recommended Beer Styles', value: 'American Pale Ale, IPA, Porter, Barleywine, Witbier'},
        ],
        latestReviews: [
            {
                id: 1,
                userId: 10,
                rating: 5,          
                title: 'The Classic APA Hop',          
                comment: `If you're brewing an American Pale Ale, you simply have to use Cascade. It's a classic. Bright, citrusy, refreshing. Never fails. Opens up beautifully on the dry hop.`,
            },
            {
                id: 2,
                userId: 11,
                rating: 5,          
                title: 'My Go-To Aroma Hop',          
                comment: `I add Cascade to almost all of my light ales for aroma. It gives the beer that signature character everyone loves. The fresh harvest smells absolutely divine!`,
            },
            {
                id: 3,
                userId: 12,
                rating: 4,          
                title: 'Solid and Dependable',          
                comment: `A good, reliable hop. Not as "explosive" as Citra or Mosaic, but for a balanced beer, it's just what you need. Sometimes the alpha acids are on the lower end, so check the batch specs. Otherwise, excellent.`,
            },
        ]
    },
    { 
        id: 19, 
        name: 'Caramel Malt 60L (Pack of 10)',
        unitMetrics: 'per 10 x 1 lb bags',
        price: 30.00,
        shortDescription: 'Head retention in darker beers',
        image: '/images/products/caramel_malt.jpg',
        description: [
            'Caramel Malt 60L (also known as Crystal 60L) is a versatile specialty malt that is a secret weapon for many brewers to enhance beer color, flavor, and body. It imparts a beautiful copper-amber hue to the brew.',
            'The flavor of this malt is characterized by distinct notes of caramel, toffee, and light hints of toasted bread. It adds a pleasant sweetness to the beer that beautifully balances hop bitterness and also contributes to improved head retention.',
            'Caramel Malt 60L is ideal for a wide range of styles, from Pale Ales and Amber Ales to Porters and Stouts, adding complexity and depth.'
        ],
        technicalSpecifications: [
            {label: 'Origin', value: 'USA / Belgium'},
            {label: 'Type', value: 'Crystal/Caramel Malt'},
            {label: 'Color (°L)', value: '60 °L'},
            {label: 'Moisture', value: '5.0% max'},
            {label: 'Extract FG, Dry', value: '75%'},
            {label: 'Flavor Profile', value: 'Sweet, caramel, toffee, hints of toasted bread'},
            {label: 'Usage', value: 'Typically 3-15% of the grist'},
            {label: 'Recommended Beer Styles', value: 'Pale Ale, Amber Ale, IPA, Brown Ale, Porter, Stout, Scotch Ale'},
        ],
        latestReviews: [
            {
                id: 1,
                userId: 13,
                rating: 5,          
                title: 'The Classic APA Hop',          
                comment: `60L is my favorite caramel malt. It's not too light and not too dark. It provides the perfect balance of sweetness and caramel flavor for my Amber Ales. The color comes out just gorgeous.`
            },
            {
                id: 2,
                userId: 14,
                rating: 5,          
                title: 'Never Brew Without It',          
                comment: `I add a bit of C60 to almost every recipe. It improves head retention and gives the beer a finished quality that's hard to achieve otherwise. Works great in IPAs to balance the bitterness.`,
            },
            {
                id: 3,
                userId: 15,
                rating: 5,          
                title: 'Consistent and Reliable',          
                comment: `The quality of this malt is always top-notch. Consistent color, wonderful aroma when crushed. If a recipe calls for Crystal 60, this is the one I always reach for. Recommended.`,
            },
        ]
    },
    { 
        id: 20, 
        name: 'Saaz Hops 1kg',
        unitMetrics: 'per 1kg',
        price: 47.5,
        shortDescription: 'Essential for Lagers',
        image: '/images/products/saaz_hops.jpg',
        description: [
            'Saaz is a noble hop, the heart and soul of classic Bohemian and Czech pilsners. Grown in the Žatec region of the Czech Republic, it possesses a delicate and refined aromatic profile that is unmistakable.',
            'Its aroma is characterized by soft, spicy, herbal, and floral notes. Saaz is primarily used for aroma rather than bitterness, as its alpha acid content is low. It imparts a classic European elegance and clean taste to the beer.',
            'If you aim to brew an authentic Czech pilsner, European lager, or Belgian ale, Saaz is an indispensable ingredient.'
        ],
        technicalSpecifications: [
            {label: 'Origin', value: 'Czech Republic'},
            {label: 'Type', value: 'Aroma'},
            {label: 'Alpha Acids', value: '2.0% - 5.0%'},
            {label: 'Beta Acids', value: '4.5% - 8.0%'},
            {label: 'Aroma Profile', value: 'Mild, pleasant, earthy, spicy, and floral.'},
            {label: 'Cohumulone', value: '23% - 28%'},
            {label: 'Total Oil', value: '0.4 - 1.0 mL/100g'},
            {label: 'Recommended Beer Styles', value: 'Bohemian Pilsner, German Pilsner, Light Lagers, Belgian Ales, Lambic'},
        ],
        latestReviews: [
            {
                id: 1,
                userId: 16,
                rating: 5,          
                title: 'The Only Choice for Pilsners',    
                comment: `Don't even think about brewing a Czech pilsner without Saaz. This hop *is* that flavor. Gentle, spicy, perfect. I always buy the fresh harvest; the aroma is just amazing.`
            },
            {
                id: 2,
                userId: 17,
                rating: 5,          
                title: 'Delicate and Refined',    
                comment: `I used it in a Belgian Saison, and it added a wonderful, subtle complexity. It doesn't overpower the yeast character but complements it. Very pleased with the result.`,
            },
            {
                id: 3,
                userId: 18,
                rating: 4,          
                title: 'Low Alpha, High Aroma',        
                comment: `You need to know what you're buying this hop for. It provides almost no bitterness, so it's not suitable for that. But for late-boil aroma, it's unparalleled. Docking one star only because you need to use quite a bit for a noticeable effect.`,
            },
        ]
    },
    { 
        id: 21, 
        name: 'Pilsner Malt (Pack of 10)',
        unitMetrics: 'per 10 x 1 lb bags',
        price: 22.0,
        shortDescription: 'Foundation for lagers and pilsners',
        image: '/images/products/pilsner_malt.jpg',
        description: [
            'Pilsner Malt is the lightest base malt, forming the foundation for classic German and Czech pilsners, as well as a multitude of other light lagers and ales. It is produced from high-quality two-row barley and undergoes gentle kilning at low temperatures.',
            'This malt imparts a very light, straw-like color and a clean, slightly sweet, grainy flavor to the beer. Its neutral character allows the aroma of hops and the work of the yeast to fully express themselves, making it an ideal base for beers where purity and crispness are paramount.',
            'Thanks to its high enzymatic activity, Pilsner Malt is excellent for mashes with a large proportion of unmalted grains'
        ],
        technicalSpecifications: [
            {label: 'Origin', value: 'Germany / Belgium'},
            {label: 'Type', value: 'Base Malt'},
            {label: 'Color (°L)', value: '1.5 - 2.1 °L'},
            {label: 'Moisture', value: '4.5% max'},
            {label: 'Protein', value: '10.0% - 11.5%'},
            {label: 'Diastatic Power', value: '> 100 °Lintner'},
            {label: 'Flavor Profile', value: 'Clean, light, sweet, grainy'},
            {label: 'Usage', value: 'Up to 100% of the grist'},
            {label: 'Recommended Beer Styles', value: 'Pilsner, Helles, Kolsch, Belgian Tripel, Light Lagers, Saison'},
        ],
        latestReviews: [
            {
                id: 1,
                userId: 19,
                rating: 5,          
                title: 'The Only Choice for Pilsners',    
                comment: `Don't even think about brewing a Czech pilsner without Saaz. This hop *is* that flavor. Gentle, spicy, perfect. I always buy the fresh harvest; the aroma is just amazing.`
            },
            {
                id: 2,
                userId: 20,
                rating: 5,          
                title: 'Delicate and Refined',    
                comment: `I used it in a Belgian Saison, and it added a wonderful, subtle complexity. It doesn't overpower the yeast character but complements it. Very pleased with the result.`,
            },
            {
                id: 3,
                userId: 21,
                rating: 4,          
                title: 'Low Alpha, High Aroma',        
                comment: `You need to know what you're buying this hop for. It provides almost no bitterness, so it's not suitable for that. But for late-boil aroma, it's unparalleled. Docking one star only because you need to use quite a bit for a noticeable effect.`,
            },
        ]
    },
    { 
        id: 22, 
        name: 'Imperial Organic Yeast A07 (Pack of 10)',
        unitMetrics: 'per 10-pouch pack',
        price: 89.9,
        shortDescription: 'American ales with citrus notes',
        image: '/images/products/imperial_yeast.jpg',
        description: [
            'Imperial Organic Yeast A07 "Flagship" is a versatile and extremely popular liquid yeast, known for its ability to create balanced ales with a light fruity character. This strain is a true workhorse and is perfect for most American beer styles.',
            `"Flagship" provides a clean fermentation with light ester notes of citrus and stone fruit that complement, rather than overpower, the hop and malt profile. It has good attenuation and moderate flocculation, leaving behind a soft and smooth mouthfeel.`,
            'Thanks to the high cell count per package (200 billion), this yeast does not require a starter for most standard batches of beer, making it a convenient and reliable choice.'
        ],
        technicalSpecifications: [
            {label: 'Strain Type', value: 'Ale'},
            {label: 'Flocculation', value: 'Medium'},
            {label: 'Attenuation', value: '73-77%'},
            {label: 'Temperature Range', value: '62-72°F (17-22°C)'},
            {label: 'Alcohol Tolerance', value: '10% ABV'},
            {label: 'Flavor Profile', value: 'Balanced, slightly fruity, hints of citrus and stone fruit.'},
            {label: 'Cell Count', value: '~200 Billion Cells'},
            {label: 'Recommended Beer Styles', value: 'American Pale Ale, IPA, Double IPA, Porter, Stout, Amber Ale'},
        ],
        latestReviews: [
            {
                id: 1,
                userId: 22,
                rating: 5,          
                title: 'My House Strain!',    
                comment: `I've tried many yeasts, but I always come back to A07. This is my "house" strain for all American ales. It's reliable, clean, and predictable. And the fact that you don't need a starter saves a ton of time!`
            },
            {
                id: 2,
                userId: 23,
                rating: 5,          
                title: 'Perfect for Hazy IPAs',    
                comment: `This yeast works great in NEIPAs. It leaves a bit of body and enhances the fruity notes of the hops, creating that "juicy" flavor. Highly recommend.`,
            },
            {
                id: 3,
                userId: 24,
                rating: 4,          
                title: 'Great, but temperature sensitive',    
                comment: `An excellent strain, it fermented my APA to perfection. The only thing is, try to keep the temperature at the lower end of the range. If it gets too warm, it can produce too many esters. But with proper control, the result is superb.`,
            },
        ]
    },
    { 
        id: 23, 
        name: 'Centennial Hops 1kg',
        unitMetrics: 'per 1kg',
        price: 62.0,
        shortDescription: 'Often called "Super Cascade"',
        image: '/images/products/centennial_hops.jpg',
        description: [
            'Centennial is a classic American hop often referred to as "Super Cascade" due to its similar citrus profile but with a higher intensity and alpha acid content. It is one of the "Three Cs" (along with Cascade and Columbus) that defined the flavor of American IPAs.',
            `The aroma of Centennial is powerful, with bright notes of lemon, grapefruit, and pronounced floral undertones. Unlike Cascade, it is less spicy and more "clean" in its citrus expression. Thanks to its high alpha acid content, it is excellent for both bittering and creating an intense aroma.`,
            'This is an extremely versatile hop, perfect for American Pale Ales, IPAs, and Double IPAs, giving them a bright and recognizable character.'
        ],
        technicalSpecifications: [
            {label: 'Origin', value: 'USA'},
            {label: 'Type', value: 'Dual-Purpose'},
            {label: 'Alpha Acids', value: '9.0% - 11.5%'},
            {label: 'Beta Acids', value: '3.5% - 4.5%'},
            {label: 'Aroma Profile', value: 'Intense floral and citrus (lemon, grapefruit).'},
            {label: 'Cohumulone', value: '28% - 30%'},
            {label: 'Total Oil', value: '1.5 - 2.5 mL/100g'},
            {label: 'Recommended Beer Styles', value: 'All US Ale styles, especially IPA, Double IPA, and American Pale Ale.'},
        ],
        latestReviews: [
            {
                id: 1,
                userId: 25,
                rating: 5,          
                title: 'Super Cascade Indeed!',    
                comment: `The name says it all. It's like Cascade, but better. More citrus, more bitterness, more everything. Perfect for a single-hop IPA. One of my all-time favorite hops.`
            },
            {
                id: 2,
                userId: 26,
                rating: 5,          
                title: 'Clean Bitterness',   
                comment: `I use Centennial for the main bittering in my IPAs. It provides a very clean, smooth bitterness without the harshness that can sometimes come from other high-alpha varieties. And the whirlpool aroma is fantastic.`,
            },
            {
                id: 3,
                userId: 27,
                rating: 5,          
                title: 'A Classic for a Reason',    
                comment: `You can't go wrong with Centennial. It's a time-tested, reliable hop. Perfect for a classic West Coast IPA. Always delivers predictable and excellent results.`,
            },
        ]
    },
    { 
        id: 24, 
        name: 'Duo Citra Hops 1kg',
        unitMetrics: 'per 1kg',
        price: 95.0,
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
        id: 25, 
        name: 'Centennial Hops 1kg',
        unitMetrics: 'per 1kg',
        price: 6.00,
        shortDescription: 'Often called "Super Cascade"',
        image: '/images/products/centennial_hops.jpg',
        description: [
            'Centennial is a classic American hop often referred to as "Super Cascade" due to its similar citrus profile but with a higher intensity and alpha acid content. It is one of the "Three Cs" (along with Cascade and Columbus) that defined the flavor of American IPAs.',
            `The aroma of Centennial is powerful, with bright notes of lemon, grapefruit, and pronounced floral undertones. Unlike Cascade, it is less spicy and more "clean" in its citrus expression. Thanks to its high alpha acid content, it is excellent for both bittering and creating an intense aroma.`,
            'This is an extremely versatile hop, perfect for American Pale Ales, IPAs, and Double IPAs, giving them a bright and recognizable character.'
        ],
        technicalSpecifications: [
            {label: 'Origin', value: 'USA'},
            {label: 'Type', value: 'Dual-Purpose'},
            {label: 'Alpha Acids', value: '9.0% - 11.5%'},
            {label: 'Beta Acids', value: '3.5% - 4.5%'},
            {label: 'Aroma Profile', value: 'Intense floral and citrus (lemon, grapefruit).'},
            {label: 'Cohumulone', value: '28% - 30%'},
            {label: 'Total Oil', value: '1.5 - 2.5 mL/100g'},
            {label: 'Recommended Beer Styles', value: 'All US Ale styles, especially IPA, Double IPA, and American Pale Ale.'},
        ],
        latestReviews: [
            {
                id: 1,
                userId: 25,
                rating: 5,          
                title: 'Super Cascade Indeed!',    
                comment: `The name says it all. It's like Cascade, but better. More citrus, more bitterness, more everything. Perfect for a single-hop IPA. One of my all-time favorite hops.`
            },
            {
                id: 2,
                userId: 26,
                rating: 5,          
                title: 'Clean Bitterness',   
                comment: `I use Centennial for the main bittering in my IPAs. It provides a very clean, smooth bitterness without the harshness that can sometimes come from other high-alpha varieties. And the whirlpool aroma is fantastic.`,
            },
            {
                id: 3,
                userId: 27,
                rating: 5,          
                title: 'A Classic for a Reason',    
                comment: `You can't go wrong with Centennial. It's a time-tested, reliable hop. Perfect for a classic West Coast IPA. Always delivers predictable and excellent results.`,
            },
        ]
    },
    { 
        id: 26, 
        name: 'Unmalted Wheat (Pack of 10)',
        unitMetrics: 'per 10 x 1 lb bags',
        price: 18.0,
        shortDescription: 'Often called "blanche"',
        image: '/images/products/unmalted_wheat.jpg',
        description: [
            'Unmalted wheat is the secret ingredient behind the classic hazy, refreshing character of Belgian Witbier. Unlike malted wheat, this is raw, unprocessed grain that imparts a unique texture and flavor to the beer.',
            `Using unmalted wheat provides the beer with its characteristic light haze, a smooth, silky body, and a subtle, bready-grainy flavor that doesn't overpower the delicate notes of coriander and orange peel. The high protein content of this grain also contributes to a dense and persistent head.`,
            'This ingredient is a must-have for any brewer aiming to recreate an authentic Belgian Witbier or to add complexity and body to other styles, such as Lambics.'
        ],
        technicalSpecifications: [
            {label: 'Origin', value: 'Belgium / USA'},
            {label: 'Type', value: 'Unmalted Adjunct'},
            {label: 'Color (°L)', value: '~2.0 °L'},
            {label: 'Moisture', value: '12% max'},
            {label: 'Protein', value: 'High (contributes to haze and head retention)'},
            {label: 'Flavor Profile', value: 'Neutral, subtle raw grain, bready'},
            {label: 'Usage', value: 'Typically 30-50% of the grist for Witbiers. Requires a cereal mash or a mash with high diastatic power malts (like Pilsner or 6-Row).'},
            {label: 'Recommended Beer Styles', value: 'Belgian Witbier, Lambic, Grand Cru, certain Saisons.'},
        ],
        latestReviews: [
            {
                id: 1,
                userId: 28,
                rating: 5,          
                title: 'The Key to a True Wit',    
                comment: `I tried brewing witbiers with malted wheat, and they were okay. But as soon as I added unmalted wheat, everything fell into place! That signature light haze, that smoothness. This is it!`
            },
            {
                id: 2,
                userId: 29,
                rating: 5,          
                title: `Don't Forget the Rice Hulls!`,   
                comment: `Great product, gives the beer a perfect body. A little tip: don't forget to add rice hulls to the mash! This wheat is very sticky and can completely clog your filter bed. With hulls, no problem at all`,
            },
            {
                id: 3,
                userId: 30,
                rating: 4,          
                title: 'Great result, tricky to work with',    
                comment: `The result exceeded expectations, the witbier turned out silky and delicious. But it's definitely trickier to work with than malt. You need a good mill and patience during sparging. But for an authentic taste, it's worth it.`,
            },
        ]
    },
    { 
        id: 27, 
        name: 'Mosaic Hops 1kg',
        unitMetrics: 'per 1kg',
        price: 95.0,
        shortDescription: 'Mosaic is one of the most vibrant and multifaceted hops on the modern craft scene',
        image: '/images/products/mosaic_hops.jpg',
        description: [
            'Mosaic is one of the most vibrant and multifaceted hops on the modern craft scene. As a "daughter" of Simcoe, it inherited the best from its lineage and added a unique palette of aromas, making it a true aromatic bomb.',
            `The name "Mosaic" is fully justified: it creates a complex mosaic of flavors and aromas, including notes of tropical fruits (mango, guava), citrus (tangerine), berries (blueberry), stone fruits (peach), and even light pine and earthy undertones.`,
            'This hop is ideal for dry hopping in IPA and Pale Ale styles, where it can unleash its full potential, creating a juicy, vibrant, and unforgettable beer.'
        ],
        technicalSpecifications: [
            {label: 'Origin', value: 'USA'},
            {label: 'Type', value: 'Dual-Purpose'},
            {label: 'Alpha Acids', value: '11.5% - 13.5%'},
            {label: 'Beta Acids', value: '3.2% - 3.9%'},
            {label: 'Aroma Profile', value: 'Complex and multifaceted. Tropical fruit (mango, guava), citrus (tangerine), berry (blueberry), stone fruit (peach), pine, and earthy notes.'},
            {label: 'Cohumulone', value: '24% - 26%'},
            {label: 'Total Oil', value: '1.0 - 1.5 mL/100g'},
            {label: 'Recommended Beer Styles', value: 'IPA, Double IPA, Hazy/NEIPA, American Pale Ale, Session IPA.'},
        ],
        latestReviews: [
            {
                id: 1,
                userId: 31,
                rating: 5,          
                title: 'A Flavor Explosion!',  
                comment: `If you want to brew a Hazy IPA that smells like a tropical fruit basket, Mosaic is your choice. Added it on the dry hop, and the result exceeded all expectations. Incredible!`
            },
            {
                id: 2,
                userId: 32,
                rating: 5,          
                title: `So Complex and Delicious`,   
                comment: `This hop has it all! Every time I use it, I find new nuances—sometimes mango, sometimes blueberry, sometimes pine. It never gets old. Worth every penny.`,
            },
            {
                id: 3,
                userId: 33,
                rating: 5,          
                title: 'My Secret Weapon',    
                comment: `I love mixing Mosaic with Citra 1:1 for my DIPAs. They create the perfect tandem. Mosaic adds that "berry" complexity that Citra lacks. A true secret weapon.`,
            },
        ]
    },
    { 
        id: 28, 
        name: 'West Coast IPA - All-Grain Kit (Pack of 10)',
        unitMetrics: 'for 10 x 5 Gallons',
        price: 600.00,
        shortDescription: 'This kit contains all the necessary ingredients to create a bright, bitter, and incredibly aromatic IPA in the style of the US West Coast.',
        image: '/images/products/ipa_kit.jpg',
        description: [
            'Brew a craft brewing classic with our "West Coast IPA - All-Grain Kit"! This kit contains all the necessary ingredients to create a bright, bitter, and incredibly aromatic IPA in the style of the US West Coast.',
            `We've selected the perfect combination of malts to achieve a clean, dry body that serves as an excellent base for a hop explosion. The kit includes a powerful combination of Centennial, Simcoe, and Columbus hops, which provide a burst of citrus, pine, and resinous notes characteristic of this style.`,
            'This kit is your ticket to the world of true West Coast IPA. It comes with detailed step-by-step instructions to guide you through every stage, from mashing to bottling.'
        ],
        technicalSpecifications: [
            {label: 'Kit Type', value: 'All-Grain'},
            {label: 'Batch Size', value: '5 Gallons (19 Liters)'},
            {label: 'Estimated OG', value: '1.065'},
            {label: 'Estimated FG', value: '1.012'},
            {label: 'Estimated ABV', value: '6.9%'},
            {label: 'IBU', value: '65'},
            {label: 'Included Ingredients', value: '12 lbs Maris Otter Pale Malt <br /> 1 lb Caramel Malt 40L <br /> 0.5 lb Dextrin Malt <br /> 1 oz Columbus Hops (60 min) <br /> 1 oz Simcoe Hops (15 min) <br /> 1 oz Centennial Hops (5 min) <br /> 2 oz Centennial Hops (Dry Hop) <br />1 pack SafAle US-05 Dry Ale Yeast <br /> Whirlfloc Tablet, Priming Sugar, Step-by-step Instructions'},
        ],
        latestReviews: [
            {
                id: 1,
                userId: 34,
                rating: 5,          
                title: 'Authentic West Coast Flavor!',  
                comment: `This kit is the bomb! The beer turned out exactly how I love it: bitter, aromatic, with a powerful pine-citrus profile. The instructions are very clear. Will definitely buy again.`
            },
            {
                id: 2,
                userId: 35,
                rating: 5,          
                title: `Great Value and Quality`,   
                comment: `Excellent value for money. All ingredients are fresh, the malt is well-milled, and the hops are aromatic. Ended up with 5 gallons of excellent IPA. Much easier than sourcing everything separately.`,
            },
            {
                id: 3,
                userId: 36,
                rating: 4,          
                title: 'Awesome, but bitter!',    
                comment: `The kit is super, but be prepared for the bitterness! This is a real West Coast IPA, not a modern "smoothie". If you love the classics, you'll enjoy it. I might reduce the 60-minute hop addition slightly, but that's a matter of taste.`,
            },
        ]
    },
];


export const productsAllInfo = productsWitoutUsersofReviews.map(product => {
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