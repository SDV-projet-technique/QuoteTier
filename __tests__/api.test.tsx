/**
 * @jest-environment node
 */

import {
  POST as POSTAuthors,
  GET as GETAuthors,
} from "@/app/api/authors/route";
import {
  GET as GETAuthor,
  PUT as PUTAuthor,
} from "@/app/api/authors/[authorId]/route";
import { POST as POSTQuotes } from "@/app/api/quotes/route";
import {
  GET as GETQuote,
  PUT as PUTQuote,
  DELETE as DELETEQuote,
} from "@/app/api/quotes/[quoteId]/route";

describe("API", () => {
  it("create an author", async () => {
    const req = {
      json: async () => ({ name: "John Doe" }),
    };
    const response = await POSTAuthors(req as any);
    expect(response.status).toBe(201);
  });
  it("gets authors", async () => {
    const response = await GETAuthors();
    expect(response.status).toBe(200);
    const authors = await response.json();
    expect(authors.length).toBeGreaterThan(0);
    expect(authors[0].name).toBe("John Doe");
  });
  it("gets an author", async () => {
    const response = await GETAuthor({ params: { authorId: 1 } });
    expect(response.status).toBe(200);
    const author = await response.json();
    expect(author.name).toBe("John Doe");
  });
  it("updates an author", async () => {
    const req = { json: async () => ({ name: "Jane Doe" }) };
    const response = await PUTAuthor(req as any, { params: { authorId: 1 } });
    expect(response.status).toBe(200);
  });
  it("creates a quote", async () => {
    const req = {
      json: async () => ({
        text: "This is a test quote",
        authorId: 1,
      }),
    };
    const response = await POSTQuotes(req as any);
    expect(response.status).toBe(201);
  });
  it("gets a quote", async () => {
    const response = await GETQuote({ params: { quoteId: 1 } });
    expect(response.status).toBe(200);
    const quote = await response.json();
    expect(quote.text).toBe("This is a test quote");
  });
  it("updates a quote", async () => {
    const req = { json: async () => ({ text: "This is a test quote" }) };
    const response = await PUTQuote(req as any, { params: { quoteId: 1 } });
    expect(response.status).toBe(200);
  });
  it("deletes a quote", async () => {
    const response = await DELETEQuote({ params: { quoteId: 1 } });
    expect(response.status).toBe(200);
  });
});
