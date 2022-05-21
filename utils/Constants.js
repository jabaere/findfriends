export const API_URL = process.env.API_URL || "https://backendforfriends.herokuapp.com"//"http://localhost:1337"
export const IMAGE_URLS = process.env.IMAGE_URLS || "http://localhost:1337/api/announcements?populate=*"

export const MAGIC_PUBLICK_KEY = process.env.MAGIC_PUBLICK_KEY || 'pk_live_FA530A07D18CCA00'

export const MAGIC_SECRET_KEY = process.env.MAGIC_SECRET_KEY 


export const AUTH_KEY = process.env.AUTH_KEY || '72fc632689b02aa3acd85acdeffe6d9b0392a2c3a93e2bfd4abc3a25ebd595e1ccbc989ec6413553b8fa86a4302935f0d02fbd1ae09e9297d2839a3bda426748268e26d3702e489b0757ed714908c5cd7626b30afc119c3a5439646cadb1c00e964f0446ee1bea617794a70d6e3cb7301b55a995ae5487df17b633c1bbd9c763'

//.AUTH_KEY || '28b213be73a53483ad36c0144a5870011abc9b6b42002446de982b4434429f9ac2011aa9436a159490f19101478603cf9e327a45bdcb480db8f64581de06b63b7a72bd69e2354ab42833ef022791b738e96ad6c4cf30b5da701d1c8df755f0a9608e8888c623b63ba5af660fb16ede133c2b96ddf8f28281acb719eb0aa19dba'

/**
  @param {any} image 
 */
 export const fromImageToUrl = (image) => {
    if (!image) {
      return "/vercel.svg"; //Or default image here
    }
    if (image.url.indexOf("/") === 0) {
      //It's a relative url, add API URL
      return `${API_URL}${image.url}`;
    }
  
    return image.url;
};

