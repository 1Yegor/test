const md5 = require("md5");
const password = "Valantis";
const date = new Date().toISOString().split("T")[0].replace(/-/g, "");
const authToken = md5(`${password}_${date}`);

export const getIds = async () => {
  const option = {
    action: "get_ids",
    params: { offset: 0 },
  };
  const url = "https://api.valantis.store:41000/";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Auth": authToken,
      },
      body: JSON.stringify(option),
    });
    if (!response.ok) {
      console.error("Failed to fetch ids from getIds", response.statusText);
      return;
    }
    const result = await response.json();
    return result.result;
  } catch (error) {
    console.error(error);
    return [];
  }
};


export const getItems = async (idArray, retries = 3) => {
  const option = {
    action: "get_items",
    params: { ids: idArray },
  };
  const url = "https://api.valantis.store:41000/";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Auth": authToken,
      },
      body: JSON.stringify(option),
    });

    if (!response.ok) {
      console.error("Failed to fetch items from getItems", response.statusText);
      if (retries > 0) {
        return await getItems(idArray, retries - 1);
      } else {
        throw new Error("Failed after multiple attempts");
      }
    }
    const result = await response.json();
    return result.result;
  } catch (error) {
    console.error(error);
    if (retries > 0) {
      return await getItems(idArray, retries - 1);
    } else {
      return [];
    }
  }
};

export const filterItems = async (params) => {
  const option = {
    action: "filter",
    params: params,
  };
  const url = `https://api.valantis.store:41000/`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Auth": authToken,
      },
      body: JSON.stringify(option),
    });
    if (!response.ok) {
      console.error(
        "Failed to fetch filtred items from filterItems",
        response.statusText
      );
      return;
    }
    const result = await response.json();
    return result.result;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getFields = async () => {
  const option = {
    action: "get_fields",
    params: { field: "price", offset: 0, limit: 10 },
  };
  const url = "https://api.valantis.store:41000/";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Auth": authToken,
      },
      body: JSON.stringify(option),
    });
    if (!response.ok) {
      console.error(
        "Failed to fetch getFields  from getFields",
        response.statusText
      );
      return;
    }
    const result = await response.json();
    return result.result;
  } catch (error) {
    console.error(error);
    return [];
  }
};
