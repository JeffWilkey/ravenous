const env = require('../environment.json');
const apiBaseUrl = 'https://api.yelp.com/v3'
const corsAnywhere = 'https://cors-anywhere.herokuapp.com';
const apiKey = env.apiKey;

const Yelp = {
  search(term, location, sortBy) {
    return fetch(`${corsAnywhere}/${apiBaseUrl}/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    }).then(response => {
      return response.json()
    }).then(jsonResponse => {
      if (jsonResponse.businesses) {
        return jsonResponse.businesses.map(business => {
          return {
            id: business.id,
            imageSrc: business.image_url,
            name: business.name,
            address: business.location.address1,
            city: business.location.city,
            state: business.location.state,
            zipCode: business.location.zip_code,
            category: business.categories[0].title,
            rating: business.rating,
            reviewCount: business.review_count
          }
        })
      } 
    })
  }
}

export default Yelp;