// appwrite.js
import { Client, TablesDB } from 'appwrite';
import Constants from 'expo-constants';

const client = new Client();

client
  .setEndpoint(Constants.expoConfig?.extra?.APPWRITE_ENDPOINT) // Your Appwrite endpoint
  .setProject(Constants.expoConfig?.extra?.APPWRITE_PROJECT_ID);             // Your Project ID

export const databases = new TablesDB(client);