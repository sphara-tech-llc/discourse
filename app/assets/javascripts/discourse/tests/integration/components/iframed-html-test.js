import componentTest, {
  setupRenderingTest,
} from "discourse/tests/helpers/component-test";
import {
  discourseModule,
  queryAll,
} from "discourse/tests/helpers/qunit-helpers";

discourseModule("Integration | Component | iframed-html", function (hooks) {
  setupRenderingTest(hooks);

  componentTest("appends the html into the iframe", {
    template: `{{iframed-html html="<h1 id='find-me'>hello</h1>" className='this-is-an-iframe'}}`,

    async test(assert) {
      const iframe = queryAll("iframe.this-is-an-iframe");
      assert.equal(iframe.length, 1, "inserts an iframe");

      assert.ok(
        iframe[0].classList.contains("this-is-an-iframe"),
        "Adds className to the iframes classList"
      );

      assert.equal(
        iframe[0].contentWindow.document.body.querySelectorAll("#find-me")
          .length,
        1,
        "inserts the passed in html into the iframe"
      );
    },
  });
});
