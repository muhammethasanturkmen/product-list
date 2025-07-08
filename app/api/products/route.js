import products from '@/products.json';

export async function GET() {
    try {

      const response = await fetch('https://api.gold-api.com/price/XAU');
      const data = await response.json();
      const onsPrice = data.price;
      const gramPrice = onsPrice / 31.1035;

      const upgradeProducts = products.map(products => {
        const updatePrice = (products.popularityScore + 1) * products.weight * gramPrice
        return {
          ...products,
          dynamicPriceUsd: parseFloat(updatePrice.toFixed(2))
        }
      })
      return Response.json(upgradeProducts); 
    } catch (error) {
      return new Response(
        JSON.stringify({ error: 'Server error', details: error.message }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
}