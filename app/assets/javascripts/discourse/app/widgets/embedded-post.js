import DecoratorHelper from "discourse/widgets/decorator-helper";
import DiscourseURL from "discourse/lib/url";
import PostCooked from "discourse/widgets/post-cooked";
import { createWidget } from "discourse/widgets/widget";
import { h } from "virtual-dom";
import hbs from "discourse/widgets/hbs-compiler";

createWidget("post-link-arrow", {
  tagName: "div.post-link-arrow",

  template: hbs`
    {{#if attrs.above}}
      <a class="post-info arrow" title={{i18n "topic.jump_reply_up"}}>
        {{d-icon "arrow-up"}}
      </a>
    {{else}}
      <a class="post-info arrow" title={{i18n "topic.jump_reply_down"}}>
        {{d-icon "arrow-down"}}
      </a>
    {{/if}}
  `,

  click() {
    DiscourseURL.routeTo(this.attrs.shareUrl);
  },
});

export default createWidget("embedded-post", {
  buildKey: (attrs) => `embedded-post-${attrs.id}`,

  html(attrs, state) {
    attrs.embeddedPost = true;
    return [
      h("div.reply", { attributes: { "data-post-id": attrs.id } }, [
        h("div.row", [
          this.attach("post-avatar", attrs),
          h("div.topic-body", [
            h("div.topic-meta-data", [
              this.attach("poster-name", attrs),
              this.attach("post-link-arrow", {
                above: state.above,
                shareUrl: attrs.shareUrl,
              }),
            ]),
            new PostCooked(attrs, new DecoratorHelper(this), this.currentUser),
          ]),
        ]),
      ]),
    ];
  },
});
