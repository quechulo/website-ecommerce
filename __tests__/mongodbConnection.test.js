import { connectDatabase } from "../db/db-utils";
import { MongoClient } from "mongodb";

describe("DB connection", () => {
  it("test products database", async () => {
    try {
      const client = await connectDatabase();
      const db = client.db('products');
      expect(true).toBe(true); // Test passed if connection is successful
      client.close()
    } catch (error) {
      throw error;
    } 
  });

  it("test info database", async () => {
    try {
      const client = await connectDatabase();
      const db = client.db('info');
      expect(true).toBe(true); // Test passed if connection is successful
      client.close()
    } catch (error) {
      throw error;
    } 
  });

  it("test users database", async () => {
    try {
      const client = await connectDatabase();
      const db = client.db('users');
      expect(true).toBe(true); // Test passed if connection is successful
      client.close()
    } catch (error) {
      throw error;
    } 
  });
});
