import * as SecureStore from "expo-secure-store";

export const savePhoneNumber = async (number: string): Promise<void> => {
  try {
    await SecureStore.setItemAsync("phoneNumber", number);
    console.log("Phone number saved securely");
  } catch (error) {
    console.error("Failed to save the phone number", error);
  }
};

export const getPhoneNumber = async (): Promise<string | null> => {
  try {
    return await SecureStore.getItemAsync("phoneNumber");
  } catch (error) {
    console.error("Failed to get the phone number", error);
    return null;
  }
};

export const saveToken = async (token: string): Promise<void> => {
  try {
    await SecureStore.setItemAsync("token", token);
    console.log("Phone number saved securely");
  } catch (error) {
    console.error("Failed to save the phone number", error);
  }
};

export const getToken = async (): Promise<string | null> => {
  try {
    return await SecureStore.getItemAsync("token");
  } catch (error) {
    console.error("Failed to get the phone number", error);
    return null;
  }
};

export const deleteToken = async (): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync("token");
    console.log("Token deleted successfully");
  } catch (error) {
    console.error("Failed to delete the token", error);
  }
};

export const saveItem = async (key: string, value: string): Promise<void> => {
  try {
    await SecureStore.setItemAsync(key, value);
    console.log("Item saved securely");
  } catch (error) {
    console.error("Failed to save the item", error);
  }
};

export const getItem = async (key: string): Promise<string | null> => {
  try {
    const value = await SecureStore.getItemAsync(key);
    console.log("Item retrieved securely");
    return value;
  } catch (error) {
    console.error("Failed to retrieve the item", error);
    return null;
  }
};
