import axios from 'axios';
import { TextbookListing, ListingUpdate } from '../types/textbook';

const API_BASE = 'http://127.0.0.1:8000/api';

// GET all listings
export async function getTextbooks(): Promise<TextbookListing[]> {
  const res = await axios.get(`${API_BASE}/listings`);
  console.log("API response:", res.data);
  return res.data;
}

// GET a single listing by ID
export async function getTextbook(listing_id: number): Promise<TextbookListing> {
  const res = await axios.get(`${API_BASE}/listings/${listing_id}`);
  return res.data;
}

// CREATE a new listing
export async function createTextbook(listing: ListingUpdate): Promise<TextbookListing> {
  const res = await axios.post(`${API_BASE}/listings`, listing);
  return res.data;
}
