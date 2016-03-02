jest.dontMock("../Link");
jest.dontMock("../BookPreviewLink");

import * as React from "react";
import * as ReactDOM from "react-dom";
import * as TestUtils from "react-addons-test-utils";

import BookPreviewLink from "../BookPreviewLink";

let book = {
  id: "urn:librarysimplified.org/terms/id/3M%20ID/crrmnr9",
  url: "http://circulation.librarysimplified.org/works/3M/crrmnr9",
  title: "The Mayan Secrets",
  authors: ["Clive Cussler", "Thomas Perry"],
  summary: "&lt;b&gt;Sam and Remi Fargo race for treasure&#8212;and survival&#8212;in this lightning-paced new adventure from #1&lt;i&gt; New York Times&lt;/i&gt; bestselling author Clive Cussler.&lt;/b&gt;&lt;br /&gt;&lt;br /&gt;Husband-and-wife team Sam and Remi Fargo are in Mexico when they come upon a remarkable discovery&#8212;the mummified remainsof a man clutching an ancient sealed pot. Within the pot is a Mayan book larger than any known before.&lt;br /&gt;&lt;br /&gt;The book contains astonishing information about the Mayans, their cities, and about mankind itself. The secrets are so powerful that some people would do anything to possess them&#8212;as the Fargos are about to find out. Many men and women are going to die for that book.",
  imageUrl: "https://dlotdqc6pnwqb.cloudfront.net/3M/crrmnr9/cover.jpg",
  publisher: "Penguin Publishing Group"
};

let linkProps: BookPreviewLinkProps = {
  text: "test text",
  url: "http://circulation.librarysimplified.org/works/3M/crrmnr9",
  collectionUrl: "http://example.com/feed",
  book: book,
  className: "test class"
};

describe("BookPreviewLink", () => {
  let link;
  let setBook;
  let pathFor;

  beforeEach(() => {
    setBook = jest.genMockFunction();
    pathFor = jest.genMockFunction();
    pathFor.mockReturnValue("path");
    link = TestUtils.renderIntoDocument(
      <BookPreviewLink {...linkProps} setBook={setBook} pathFor={pathFor} />
    );
  });

  it("shows the link", () => {
    let element = TestUtils.findRenderedDOMComponentWithTag(link, "a");
    expect(element.textContent).toBe(linkProps.text);
    expect(element.className).toBe(linkProps.className);
  });

  it("calls pathFor on the collection and book urls", () => {
    let element = TestUtils.findRenderedDOMComponentWithTag(link, "a");
    expect(element.getAttribute("href")).toBe("path");
    expect(pathFor.mock.calls.length).toBe(1);
    expect(pathFor.mock.calls[0][0]).toBe(linkProps.collectionUrl);
    expect(pathFor.mock.calls[0][1]).toBe(linkProps.url);
  });

  it("shows the book preview if clicked normally", () => {
    let element = TestUtils.findRenderedDOMComponentWithTag(link, "a");
    TestUtils.Simulate.click(element);
    expect(setBook.mock.calls.length).toBe(1);
    expect(setBook.mock.calls[0][0]).toBe(linkProps.book);
  });

  it("does not show the book preview if clicked with alt, ctrl, cmd, or shift key", () => {
    let element = TestUtils.findRenderedDOMComponentWithTag(link, "a");
    ["altKey", "ctrlKey", "metaKey", "shiftKey"].forEach(key => {
      TestUtils.Simulate.click(element, { [key]: true });
      expect(setBook.mock.calls.length).toBe(0);
    });
  });
});