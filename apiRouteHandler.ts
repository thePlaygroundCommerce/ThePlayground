export const apiRouteHandlerAdapter = async ({
    method = "GET",
    url = "",
    payload,
  }: {  
    method: string;
    url: string | URL | Request;
    payload?: any;
  }) => {
    let response;
  
    try {
      response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: method != "GET" ? JSON.stringify(payload) : undefined,
      })
        .then((data) => data.json())
        .then((data) => {
          return data
        })
        .catch((err) => {throw err});
    } catch (error) {
      console.error(`Error from endpoint: ${url} : ${error}`);
    }
    return response;
  };
  