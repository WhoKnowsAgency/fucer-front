export default function ({ $axios }) {
  $axios.onError((error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      let msj = error.response.data.error.message.replace("Bad Request:", "");
      if (process.env.NODE_ENV !== "production") {
        console.log("AXIOS Error (response):", msj);
      }
      return Promise.reject(msj);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
      return Promise.reject(
        "No nos pudimos comunicar con el servidor, compruebe su conexión a internet."
      );
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
  });
}
