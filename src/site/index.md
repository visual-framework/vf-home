---
subtitle: No homepage, yet.
date: 2018-08-22 12:24:50
layout: layouts/base.njk
---

<section class="vf-intro | embl-grid embl-grid--has-centered-content">
<div>
  <!-- empty -->
</div>
<div>
  <h1 class="vf-intro__heading vf-intro__heading--has-tag">{{ siteConfig.siteInformation.title | safe }} <a href="" class="vf-badge vf-badge--primary vf-badge--phases">alpha</a></h1>
  <p class="vf-lede">{{ siteConfig.siteInformation.short_description | safe }}</p>

  <p class="vf-intro__text">The Visual Framework (VF) is designed with the needs of life science websites and services. It goes beyond guidance for tables, graphs, data-heavy typography and focuses on being sane defaults and implements its CSS in a way that won't interfere with your existing components that use Bootstrap, Angular, or something else.</p>

</div>
</section>



<section class="vf-content | embl-grid embl-grid--has-centered-content">
<div>

## 🎫 What is this?

</div>
<div>


The VF 2.0 enables consistency and portability, it is extensible, modular and overridable; here to help and not get in the way.

- **Demo:** &nbsp;
[Online component library](https://visual-framework.github.io/vf-core)
&nbsp; § &nbsp; [Changelog](https://github.com/visual-framework/vf-core/blob/develop/docs/changelog/index.md)
- **Philosophy:** &nbsp;
[Aims of the VF 2.0](https://blogs.embl.org/communications/2018/09/12/faster-scientific-websites-through-reusability/)
&nbsp; § &nbsp; [Principles and Methods](https://dev.beta.embl.org/guidelines/visual-framework/principles-methods/)
- **Help out:** &nbsp;
[Contributing guide](https://github.com/visual-framework/vf-core/blob/develop/CONTRIBUTING.md)
&nbsp; § &nbsp; [Request a component](https://github.com/visual-framework/vf-core/issues/new?template=new-component-request.md)
&nbsp; § &nbsp; [Make a new component](https://visual-framework.github.io/vf-core/docs/guidelines.html)
- **Make it your own:** &nbsp;
[Clone the child theme template](https://github.com/khawkins98/vf-child-playground)

</div>
</section>

<section class="vf-content | embl-grid embl-grid--has-centered-content">
<div>

### ⏰ When will this be ready?

</div>
<div>


- This is a v2.0 that was imagined in 2017 and development began in the summer of 2018.
- As of February 2019 we're on alpha.3.
- We're hopeful a beta could be ready before summer 2018.

Watch the [releases](https://github.com/visual-framework/vf-core/releases) and let us know your feedback: [issues](https://github.com/visual-framework/vf-core/issues) or [email](mailto:ken.hawkins@embl.de).

</div>
</section>

<section class="vf-content | embl-grid embl-grid--has-centered-content">
<div>

### 🤔 Why a VF?

</div>
<div>


The Visual Framework address three major needs:

1. ⚗️🌳 Life sciences: We address common needs for [life science websites](https://www.ebi.ac.uk/services). The Visual Framework can be easily tailored to niche needs, but out of the box it's pleasant looking, but dry and serious to support focus, clarity and data.
1. 🏰 Share only what you need to: the Visual Framework is designed to work with other frameworks (both CSS, like Bootstrap, and JS, like React or Angular). This allows common components (and brand design) to be shared between sites without cross-contaminating into another framework. We mainly achieve this by:
   - Name spacing all selectors for CSS or JS (`vf-*`)
   - No CSS styling on HTML elements. We only attached to name spaced classes, that is:
      - ✅ `.vf-button {}`
      - 🚫 `.button {}`
      - 🚫 `button {}`
      - 🚫🙊🙉 `div.button {}`
   - 🖕 This necessarily requires a bit more class writing, but it ensures the Visual Framework won't break existing code.
   - BYOJS: Bring your own JavaScript. We've included only a minimal amount of JS in components and it's fully optional (just remove [the JavaScript selectors](https://github.com/visual-framework/vf-core/issues/115#issuecomment-455524131); i.e. `data-vf-js-tabs`). So if you'd rather use Angular or Bootstrap for your tabs, the Visual Framework won't get in the way.
1. 🌕🌜 Use a little or a lot:
   - A lot: The framework (and [child theme template](https://github.com/khawkins98/vf-child-playground)) will generate a monolithic `styles.css` and `script.js` that can be easily included, a la Bootstrap.
   - A little: Instead you can include `.scss` partials or per-component `.css` and `.js` files. You can do this through making a [child theme](https://github.com/khawkins98/vf-child-playground) or [npm installs](https://www.npmjs.com/org/visual-framework).

</div>
</section>

<section class="vf-content | embl-grid embl-grid--has-centered-content">
<div>

<!-- empty -->

</div>
<div>


## 🚧 ✍ Developing, contributing
</div>
</section>

<section class="vf-content | embl-grid embl-grid--has-centered-content">
<div>

### How do I make my own theme or customise components?

</div>
<div>

<a id="get-started"></a> [See the contributing guide](https://github.com/visual-framework/vf-core/blob/develop/docs)

### I have an idea or concern!

There are a few ways that we discuss and track ideas:

- ⁉ General: Slack at [embl-vf.slack.com](https://embl-vf.slack.com/messages) for general ideas and discussion
- ⚙️ Technical: [GitHub issues here](https://github.com/visual-framework/vf-ebi/issues) for implementing deeply technical and specific issues, like the Sass build process, browser bugs
- 🏢 E-mail: if you have a sweeping Big Idea™️, e-mail Ken Hawkins <ken.hawkins@embl.de>

</div>
</section>

<section class="vf-content | embl-grid embl-grid--has-centered-content">
<div>

## Versioning

</div>
<div>


[See the versioning guide in the changelog](https://github.com/visual-framework/vf-core/blob/develop/docs/changelog)

</div>
</section>

<section class="vf-content | embl-grid embl-grid--has-centered-content">
<div>

### v2.0 Releases

</div>
<div>



As the Visual Framework is in heavy, active development, we will have many `v2.0.0-alpha.X` releases. With new alphas planned on a monthly basis (last Thursday of each month).

</div>
</section>

<section class="vf-content | embl-grid embl-grid--has-centered-content">
<div>

## Local development

</div>
<div>



To use the Visual Framework your machine will require some software to be installed to start. [See the "Setting up" guide](https://github.com/visual-framework/vf-core/blob/develop/docs/contributing/setting-up.njk).

</div>
</section>
