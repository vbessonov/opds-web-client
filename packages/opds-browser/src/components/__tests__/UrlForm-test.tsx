jest.dontMock("../UrlForm");

import * as React from "react";
import * as ReactDOM from "react-dom";
import * as TestUtils from "react-addons-test-utils";

import UrlForm from "../UrlForm";

describe("UrlForm", () => {
  it("shows the form with bootstrap classes", () => {
    let navigate = jest.genMockFunction();
    let form = TestUtils.renderIntoDocument(
      <UrlForm navigate={navigate} />
    );

    let formNode = TestUtils.findRenderedDOMComponentWithTag(form, "form");
    let input = TestUtils.findRenderedDOMComponentWithTag(form, "input");
    let button = TestUtils.findRenderedDOMComponentWithTag(form, "button");

    expect(formNode.getAttribute("class")).toContain("form-inline");
    expect(input).toBeTruthy();
    expect(input.getAttribute("class")).toContain("form-control");
    expect(button).toBeTruthy();
    expect(button.getAttribute("class").split(" ")).toContain("btn");
  });

  it("fetches the url", () => {
    let navigate = jest.genMockFunction();
    let urlForm = TestUtils.renderIntoDocument(
      <UrlForm navigate={navigate} />
    );

    let form = TestUtils.findRenderedDOMComponentWithTag(urlForm, "form");
    let input = TestUtils.findRenderedDOMComponentWithTag(urlForm, "input");

    input["value"] = "some url";
    TestUtils.Simulate.submit(form);

    expect(navigate.mock.calls.length).toEqual(1);
    expect(navigate.mock.calls[0][0]).toEqual("some url");
  });
});